export class Search {
    setCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
    }

    setUsersCount(count) {
        this.usersCount = count;
    }

    constructor(view, api, log) {
        this.view = view;
        this.api = api;
        this.log = log;

        this.view.search.addEventListener(
            "keyup",
            this.debounce(this.loadUsers.bind(this), 1000)
        );
        // this.view.loadMoreBtn.addEventListener('click', this.loadMoreUsers.bind(this));
        this.currentPage = 1;
        this.usersCount = 0;
    }

    loadUsers() {
        this.setCurrentPage(1);
        if (this.view.search.value) {
            this.view.setCounterMessage("");
            this.clearUsers();
            this.usersRequest(this.view.search.value);
        } else {
            // this.view.toggleLoadMoreBtn(false);
            this.clearUsers();
            this.view.setCounterMessage("Введите запрос");
        }
    }

    loadMoreUsers() {
        this.setCurrentPage(this.currentPage + 1);
        this.usersRequest(this.view.search.value);
    }

    async usersRequest(searchValue) {
        let totalCount;
        let users;
        let message;
        try {
            await this.api
                .loadUsers(searchValue, this.currentPage)
                .then((res) => {
                    res.json().then((res) => {
                        console.log(res);
                        users = res.items;
                        totalCount = res.total_count;
                        message = this.log.counterMessage(totalCount);
                        this.setUsersCount(this.usersCount + res.items.length);
                        this.view.setCounterMessage(message);
                        // this.view.toggleLoadMoreBtn(
                        //     totalCount > 20 && this.currentPage !== totalCount
                        // );
                        users.forEach((user) => this.view.createUser(user));
                    });
                });
        } catch (e) {
            //обработка ошибок и вывод в консоль
            console.log("Error:" + e);
        }
    }

    clearUsers() {
        this.view.usersBlock.innerHTML = "";
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this,
                args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}
