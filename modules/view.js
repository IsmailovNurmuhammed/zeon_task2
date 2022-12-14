export class View {
    constructor(api, search) {
        this.app = document.getElementById("app");
        this.api = api;
        this.search = search;

        if (localStorage.getItem("favourites") === null) {
            localStorage.setItem("favourites", "[]");
        }
        this.favouritesArr = JSON.parse(localStorage.getItem("favourites"));
        this.favouritesCount = this.favouritesArr.length;
        this.favouritesCounter = this.createElement("span");
        this.favouritesCounter.textContent = this.favouritesArr.length;
        this.favouritesNav = document.querySelector(".favorites");
        this.favouritesNav.append(this.favouritesCounter);

        // pagination items block //
        this.paginationWrapper = this.createElement("div", [
            "pagination__items",
            "container",
        ]);
        this.paginationPrev = this.createElement("div", ["pagination__item"]);
        this.paginationNext = this.createElement("div", ["pagination__item"]);
        this.paginationInput = this.createElement("input", [
            "pagination__item",
            "pagination__item_input",
        ]);
        this.paginationPrev.textContent = "<< Prev";
        this.paginationNext.textContent = "Next >>";

        this.currentPageNumber = this.createElement("div", ["current__page"]);
        this.paginationWrapper.append(
            this.paginationPrev,
            this.currentPageNumber,
            this.paginationInput,
            this.paginationNext
        );
        // *  pagination items block //

        // results counter block //
        this.resultsBlock = this.createElement("div", ["results", "container"]);
        this.searchCounter = this.createElement("span", ["results__title"]);
        this.resultsBlock.append(this.searchCounter);
        // * results counter block //

        //  search block //

        //1 Search Item
        this.search = this.createElement("input");
        this.search.placeholder = "Search...";
        this.searchH2 = this.createElement("h2");
        this.searchLabel = this.createElement("label");
        this.searchItem = this.createElement("div", ["search__item"]);

        this.searchH2.textContent = "Search for github users";
        this.searchLabel.append(this.searchH2, this.search);
        this.searchItem.append(this.searchLabel);
        //2 sort Item
        this.sort = this.createElement("select");
        this.sortSelect1 = this.createElement("option");
        this.sortSelect1.textContent = "sort";
        this.sortSelect1.value = "";
        this.sortSelect1.disabled = "disabled";
        this.sortSelect1.selected = "selected";
        this.sortSelect2 = this.createElement("option");
        this.sortSelect2.textContent = "joined";
        this.sortSelect2.value = "joined";
        this.sortSelect3 = this.createElement("option");
        this.sortSelect3.textContent = "followers";
        this.sortSelect3.value = "followers";

        this.sort.append(this.sortSelect1);
        this.sort.append(this.sortSelect2);
        this.sort.append(this.sortSelect3);

        this.sortlabel = this.createElement("label");
        this.sortItem = this.createElement("div", ["search__item"]);

        this.sortlabel.append("Sort", this.sort);
        this.sortItem.append(this.sortlabel);
        //3 order Item
        this.order = this.createElement("select");
        this.orderSelect1 = this.createElement("option");
        this.orderSelect1.textContent = "order";
        this.orderSelect1.value = "";
        this.orderSelect1.selected = "selected";
        this.orderSelect1.disabled = "disabled";
        this.orderSelect2 = this.createElement("option");
        this.orderSelect2.textContent = "asc";
        this.orderSelect2.value = "asc";
        this.orderSelect3 = this.createElement("option");
        this.orderSelect3.textContent = "desc";
        this.orderSelect3.value = "desc";

        this.orderLabel = this.createElement("label");
        this.orderItem = this.createElement("div", ["search__item"]);

        this.order.append(this.orderSelect1);
        this.order.append(this.orderSelect2);
        this.order.append(this.orderSelect3);

        this.orderLabel.append("order", this.order);
        this.orderItem.append(this.orderLabel);
        //4 Search Item
        this.perPage = this.createElement("input");
        this.perPage.placeholder = "max: 100";
        this.perPage.type = "number";
        this.perPage.max = 100;
        this.perPage.min = 10;
        this.perPage.value = 20;
        this.perPageLabel = this.createElement("label");
        this.perPageItem = this.createElement("div", ["search__item"]);

        this.perPageLabel.append("per page", this.perPage);
        this.perPageItem.append(this.perPageLabel);

        this.searchBlock = this.createElement("div", [
            "search__wrapper",
            "container",
        ]);

        this.searchLine = this.createElement("div", ["search"]);
        this.searchLine.append(
            this.searchItem,
            this.sortItem,
            this.orderItem,
            this.perPageItem
        );
        this.searchBlock.append(this.searchLine);
        // * search block //

        // Error message //
        this.errorBlock = this.createElement("div", ["error__block"]);
        this.errorMessage = this.createElement("div", ["error__message"]);
        this.errorMessageText = this.createElement("div", [
            "error__message_text",
        ]);
        this.errorBtn = this.createElement("div", ["error__btn"]);
        this.errorBlock.append(this.errorMessage);
        this.errorMessage.append(this.errorBtn);
        this.errorMessage.append(this.errorMessageText);
        // * Error message //

        // Content //
        this.contetntWrapper = this.createElement("main", [
            "content__wrapper",
            "container",
        ]);
        this.content = this.createElement("div", ["content"]);
        this.usersBlock = this.createElement("div", ["users"]);

        this.contetntWrapper.append(this.content);
        this.content.append(this.usersBlock);

        this.app.append(this.searchBlock);
        this.app.append(this.resultsBlock);
        this.app.append(this.contetntWrapper);
        this.app.append(this.paginationWrapper);
        // * Content //

        // Preloader //
        this.preloader = document.querySelector(".preloader");
        // * Preloader //

        this.errorBtn.addEventListener("click", () => {
            this.errorBlock.remove();
        });
    }

    createElement(elementTag, elementClass = []) {
        const element = document.createElement(elementTag);
        if (elementClass) {
            for (const className in elementClass) {
                element.classList.add(elementClass[className]);
            }
        }
        return element;
    }
    createUser(userData) {
        if (localStorage.getItem("favourites") === null) {
            localStorage.setItem("favourites", "[]");
        }
        let favouritesList = JSON.parse(localStorage.getItem("favourites"));

        const userElement = this.createElement("div", ["user__card"]);
        const imgBlock = this.createElement("div", ["user__card_img"]);
        const userImg = this.createElement("img");
        userImg.src = userData.avatar_url;

        const nameBlock = this.createElement("div", ["user__card_name"]);
        nameBlock.textContent = userData.login;

        const userLinkBlock = this.createElement("a", ["user__card_git"]);
        userLinkBlock.href = userData.html_url;
        userLinkBlock.textContent = "User Git";

        const userCardInfo = this.createElement("div", ["user__card_info"]);
        const userCardRepos = this.createElement("div", ["user__card_repos"]);
        const userShowRepos = this.createElement("a");
        userShowRepos.href = "#";
        userShowRepos.textContent = "Show repos";

        const favouriteBtn = this.createElement("div", ["user__card_add"]);
        favouriteBtn.textContent = "ADD";

        userCardRepos.append(userShowRepos);
        imgBlock.append(userImg);
        userElement.append(imgBlock, nameBlock, userLinkBlock);
        userCardInfo.append(userCardRepos);
        userElement.append(userCardInfo);
        userCardInfo.append(favouriteBtn);

        if (favouritesList.find((o) => o.login === userData.login)) {
            favouriteBtn.textContent = "Remove";
            favouriteBtn.classList.add("active");
        } else {
            favouriteBtn.textContent = "ADD";
        }

        userCardRepos.addEventListener("click", () => {
            this.showUserRepos(userData);
            window.location.href = "/userPage.html";
        });

        favouriteBtn.addEventListener("click", () => {
            favouriteBtn.classList.toggle("active");
            favouriteBtn.classList.contains("active")
                ? (favouriteBtn.textContent = "remove")
                : (favouriteBtn.textContent = "ADD");

            let newData = {
                login: userData.login,
                avatar_url: userData.avatar_url,
                html_url: userData.html_url,
                repos_url: userData.repos_url,
            };
            let favouritesArr = JSON.parse(localStorage.getItem("favourites"));

            if (!favouritesArr.find((o) => o.login === userData.login)) {
                favouritesArr.push(newData);
                this.favouritesCounter.textContent = favouritesArr.length;
            } else {
                let indexOfitemToDelete = favouritesArr.indexOf(
                    favouritesArr.find((o) => o.login === userData.login)
                );
                favouritesArr.splice(indexOfitemToDelete, 1);
                this.favouritesCounter.textContent = favouritesArr.length;
            }
            localStorage.setItem("favourites", JSON.stringify(favouritesArr));
        });
        this.usersBlock.append(userElement);
    }
    showUserRepos(userLogin) {
        localStorage.setItem(userLogin, JSON.stringify(userLogin));
    }

    showLoader(isLoad) {
        if (isLoad) {
            this.preloader.classList.remove("preloader_hidden");
        } else {
            this.preloader.classList.add("preloader_hidden");
        }
    }
    setCounterMessage(countInfo) {
        this.searchCounter.textContent = countInfo;
    }
}
