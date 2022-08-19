const preloader = document.querySelector(".preloader");

// Functions //

const createElement = (elementTag, elementClass = []) => {
    const element = document.createElement(elementTag);
    if (elementClass) {
        for (const className in elementClass) {
            element.classList.add(elementClass[className]);
        }
    }
    return element;
};
const showLoader = (isLoad) => {
    if (isLoad) {
        preloader.classList.remove("preloader_hidden");
    } else {
        preloader.classList.add("preloader_hidden");
    }
};
const createDataList = (list) => {
    const block = createElement("div", ["user__item_repos-list"]);
    const listTag = createElement("ul", ["repos__list"]);
    list.forEach((item) => {
        const el = createElement("li", ["repos__list_item"]);
        el.innerHTML = `<a href="${item.html_url}">${
            item.login ? item.login : item.name
        } </a> <a href="${item.html_url}">Go to GITHUB</a>`;
        listTag.append(el);
    });
    block.append(listTag);

    return content.append(block);
};

function showUser() {
    let userItem = createElement("div", ["user__item"]);
    let user;
    (keys = Object.keys(localStorage)), (i = keys.length);
    while (i--) {
        user = JSON.parse(localStorage.getItem(keys[i]));
    }
    loadUserRepos(user.login);

    const userItemTitle = createElement("h1", ["user__item_title"]);
    userItemTitle.textContent = "User info";
    const userItemHead = createElement("div", ["user__item_head"]);
    const userItemHeadImg = createElement("div", ["user__item_img"]);
    const userItemHeadAvatar = createElement("img");
    userItemHeadAvatar.src = user.avatar_url;
    const userItemAbout = createElement("div", ["user__item_about"]);
    const userItemName = createElement("div", ["user__item_name"]);
    const userItemNameSpan = createElement("span");
    userItemNameSpan.textContent = user.login;
    const userItemLink = createElement("div", ["user__item_link"]);
    const userItemLinkHref = createElement("a");
    userItemLinkHref.textContent = "Link to Github";
    userItemLinkHref.href = user.html_url;
    const userItemAdd = createElement("div", ["add__favourites"]);
    const userItemAddBtn = createElement("span", ["add__favourites_btn"]);
    userItemAddBtn.textContent = "ADD";

    userItemHead.append(userItemHeadImg, userItemAbout, userItemAdd);
    userItemHeadImg.append(userItemHeadAvatar);
    userItemAbout.append(userItemName, userItemLink);
    userItemName.append(userItemNameSpan);
    userItemLink.append(userItemLinkHref);
    userItemAdd.append(userItemAddBtn);
    userItem.append(userItemHead);

    let favouritesList = JSON.parse(localStorage.getItem("favourites"));

    if (favouritesList.find((o) => o.login === user.login)) {
        userItemAddBtn.textContent = "Remove";
        userItemAddBtn.classList.add("active");
    } else {
        userItemAddBtn.textContent = "ADD";
    }

    userItemAdd.addEventListener("click", (event) => {
        event.preventDefault();
        userItemAddBtn.classList.toggle("active");
        userItemAddBtn.classList.contains("active")
            ? (userItemAddBtn.textContent = "Remove")
            : (userItemAddBtn.textContent = "Add");

        favouritesList = JSON.parse(localStorage.getItem("favourites"));
        if (!favouritesList.find((o) => o.login === user.login)) {
            favouritesList.push(user);
            localStorage.setItem("favourites", JSON.stringify(favouritesList));
            favouritesCounter.textContent = favouritesList.length;
        } else {
            let indexOfitemToDelete = favouritesList.indexOf(
                favouritesList.find((o) => o.login === user.login)
            );
            favouritesList.splice(indexOfitemToDelete, 1);
            localStorage.setItem("favourites", JSON.stringify(favouritesList));
            favouritesCounter.textContent = favouritesList.length;
        }
    });
    userPage.append(userItem);
    document.body.append(content);
}
// * Functions //

let favouritesArr = JSON.parse(localStorage.getItem("favourites"));
let favouritesCount = favouritesArr.length;
let favouritesCounter = createElement("span");
favouritesCounter.textContent = favouritesArr.length;
let favouritesNav = document.querySelector(".favorites");
favouritesNav.append(favouritesCounter);

let content = createElement("div", ["container"]);
let userPage = createElement("div", ["user__page"]);
content.append(userPage);
let reposTitle = createElement("div", ["user__item_info"]);
// reposTitle.textContent = "Repositories";
content.append(reposTitle);

// API //
async function loadUserRepos(login) {
    showLoader(true);
    return await fetch(`https://api.github.com/users/${login}/repos`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            data.length === 0
                ? (reposTitle.textContent = "User not have repos")
                : (reposTitle.textContent = "Repositories");
            content.append(reposTitle);
            createDataList(data);
            showLoader(false);
            return data;
        });
}
// * API //
showUser();
