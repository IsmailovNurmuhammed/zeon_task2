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

        this.selectedSort = this.view.sort.value;
        this.selectedOrder = this.view.order.value;

        this.view.sort.addEventListener("change", () => {
            this.selectedSort = this.view.sort.value;
            this.getUsers();
        });
        this.view.order.addEventListener("change", () => {
            this.selectedOrder = this.view.order.value;
            this.getUsers();
        });
        this.view.perPage.addEventListener("change", () => {
            this.getUsers();
        });

        this.view.paginationNext.addEventListener("click", () => {
            this.loadNextPage();
        });
        this.view.paginationPrev.addEventListener("click", () => {
            this.loadPrevPage();
        });
        this.view.paginationInput.addEventListener("change", () => {
            if (this.view.paginationInput.value >= this.maxPage) {
                this.setCurrentPage(this.maxPage);
                this.getUsers();
            } else if (this.view.paginationInput.value < 1) {
                this.setCurrentPage(1);
                this.getUsers();
            } else {
                this.setCurrentPage(parseInt(this.view.paginationInput.value));
                this.getUsers();
            }
        });
        // Auto fetch in empty input //
        this.firstFetch = Math.random().toString(36).slice(-2);
        this.getUsers();
        // * Auto fetch in empty input //
    }

    getUsers() {
        this.userString = this.view.search.value;
        if (this.view.search.value) {
            this.view.setCounterMessage("");
            this.clearUsers();
            this.usersRequest(this.userString);
        } else if (this.userString === "") {
            this.userString = this.firstFetch;
            this.view.setCounterMessage("");
            this.clearUsers();
            this.usersRequest(this.userString);
        } else {
            this.clearUsers();
            this.view.setCounterMessage("Enter your request");
        }
    }

    loadNextPage() {
        if (this.maxPage === this.currentPage) {
            this.currentPage = this.maxPage;
        } else {
            this.setCurrentPage(this.currentPage + 1);
            this.getUsers();
        }
    }
    loadPrevPage() {
        if (
            this.currentPage > 1 &&
            this.view.search.value === "" &&
            this.firstFetch
        ) {
            this.setCurrentPage(this.currentPage - 1);
            this.getUsers();
        } else if (this.currentPage > 1 && this.view.search.value !== "") {
            this.setCurrentPage(this.currentPage - 1);
            this.getUsers(this.view.search.value);
        } else {
            this.currentPage = 1;
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
                    this.selectedSort,
                    this.selectedOrder,
                    this.view.perPage.value
                )
                .then((res) => {
                    if (res.ok) {
                        res.json().then((res) => {
                            users = res.items;
                            totalCount = res.total_count;
                            message = this.log.counterMessage(totalCount);
                            this.setUsersCount(res.total_count);
                            this.setMaxPageCount();
                            this.view.paginationInput.placeholder =
                                this.maxPage;

                            this.view.setCounterMessage(message);
                            users.forEach((user) => this.view.createUser(user));
                        });
                    } else {
                        this.view.errorMessageText.textContent =
                            "HTTP Error: " + res.status;
                        this.view.app.append(this.view.errorBlock);
                    }
                });
        } catch (e) {
            //обработка ошибок и вывод в консоль
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
