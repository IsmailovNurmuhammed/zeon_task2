export class Search {
    setCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
    }
    setUsersCount(count) {
        this.usersCount = count;
    }
    setMaxPageCount() {
        this.maxPage = Math.ceil(this.usersCount / this.view.perPage.value);
    }

    constructor(view, api, log) {
        this.view = view;
        this.api = api;
        this.log = log;

        this.view.showLoader(true);

        this.userString;

        this.view.search.addEventListener(
            "keyup",
            this.debounce(this.getUsers.bind(this), 1000)
        );
        this.currentPage = 1;
        this.usersCount = 0;
        this.maxPage = 0;

        this.view.sort.addEventListener("change", () => {
            console.log("sort Change");
            this.getUsers();
        });
        this.view.order.addEventListener("change", () => {
            console.log("order Change");
            this.getUsers();
        });
        this.view.perPage.addEventListener("change", () => {
            console.log("perPage change");
            this.getUsers();
        });

        this.view.paginationNext.addEventListener("click", () => {
            this.loadNextPage();
        });
        this.view.paginationPrev.addEventListener("click", () => {
            this.loadPrevPage();
        });
        this.view.paginationInput.addEventListener("change", () => {
            console.log(
                "PaginationInput Value: " + this.view.paginationInput.value
            );
            if (this.view.paginationInput.value >= this.maxPage) {
                this.setCurrentPage(this.maxPage);
                this.getUsers();
                console.log("Pagiantion page:   " + this.currentPage);
            } else if (this.view.paginationInput.value < 1) {
                this.setCurrentPage(1);
                this.getUsers();
                console.log("Pagiantion page:   " + this.currentPage);
            } else {
                this.setCurrentPage(parseInt(this.view.paginationInput.value));
                this.getUsers();
                console.log("Pagiantion page:   " + this.currentPage);
                console.log(this.currentPage);
            }
        });
        // Auto fetch in empty input //
        this.firstFetch = Math.random().toString(36).slice(-2);
        this.getUsers();
        // * Auto fetch in empty input //
    }

    getUsers() {
        this.userString = this.view.search.value;
        console.log("Auto fetch value: " + this.firstFetch);
        console.log("user String: " + this.userString);
        if (this.view.search.value) {
            console.log("User fetch: " + this.userString);
            console.log("Pagiantion page: " + this.currentPage);
            this.view.setCounterMessage("");
            this.clearUsers();
            this.usersRequest(this.userString);
        } else if (this.userString === "") {
            this.userString = this.firstFetch;
            console.log("Auto fetch: " + this.firstFetch);
            console.log("Pagiantion page: " + this.currentPage);
            this.view.setCounterMessage("");
            this.clearUsers();
            this.usersRequest(this.userString);
        } else {
            // this.view.toggleLoadMoreBtn(false);
            console.log("not");
            this.clearUsers();
            this.view.setCounterMessage("Enter your request");
        }
    }

    loadNextPage() {
        if (this.maxPage === this.currentPage) {
            console.log(this.currentPage);
            this.currentPage = this.maxPage;
        } else {
            this.setCurrentPage(this.currentPage + 1);
            this.getUsers();
            console.log("Chanded number of page: " + this.currentPage);
        }
    }
    loadPrevPage() {
        if (
            this.currentPage > 1 &&
            this.view.search.value === "" &&
            this.firstFetch
        ) {
            this.setCurrentPage(this.currentPage - 1);
            console.log("Pagiantion page less: " + this.currentPage);
            this.getUsers();
            console.log("Pagiantion page: " + this.currentPage);
        } else if (this.currentPage > 1 && this.view.search.value !== "") {
            this.setCurrentPage(this.currentPage - 1);
            this.getUsers(this.view.search.value);
            console.log("Pagiantion page: " + this.maxPage);
        } else {
            this.currentPage = 1;
            console.log("No page less than 1: " + this.currentPage);
        }
    }

    async usersRequest(searchValue) {
        let totalCount;
        let users;
        let message;
        try {
            this.view.showLoader(true);
            await this.api
                .loadUsers(
                    searchValue,
                    this.currentPage,
                    this.view.sort.value,
                    this.view.order.value,
                    this.view.perPage.value
                )
                .then((res) => {
                    if (res.ok) {
                        res.json().then((res) => {
                            console.log(res);
                            users = res.items;
                            totalCount = res.total_count;
                            message = this.log.counterMessage(totalCount);
                            this.setUsersCount(res.total_count);
                            this.setMaxPageCount();
                            this.view.paginationInput.placeholder =
                                this.maxPage;
                            console.log(
                                "Max available value of page: " + this.maxPage
                            );
                            this.view.setCounterMessage(message);

                            users.forEach((user) => this.view.createUser(user));
                        });
                    } else {
                        console.log("Error:" + res.status);
                        this.view.errorMessageText.textContent =
                            "HTTP Error: " + res.status;
                        this.view.app.append(this.view.errorBlock);
                    }
                });
        } catch (e) {
            //обработка ошибок и вывод в консоль
            console.log("Error:" + e);
            this.view.errorMessageText.textContent = e;
            this.view.app.append(this.view.errorBlock);
        } finally {
            this.view.showLoader(false);
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
