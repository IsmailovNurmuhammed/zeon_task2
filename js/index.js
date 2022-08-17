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

// ----------------------------------
const createDataList2 = (list) => {
    const block = createElement("div", ["user-block"]);
    const listTag = createElement("ul", ["user-list"]);
    list.forEach((item) => {
        const el = createElement("li", ["user-list-item"]);
        el.innerHTML = `<a href="${item.html_url}">${
            item.login ? item.login : item.name
        } </a>`;
        listTag.append(el);
    });
    block.append(listTag);

    return block.innerHTML;
};

// * Functions //

let content = createElement("div", ["container"]);
let userPage = createElement("div", ["user__page"]);
let userItem = createElement("div", ["user__item"]);

function showUser() {
    let user;
    (keys = Object.keys(localStorage)), (i = keys.length);
    while (i--) {
        user = JSON.parse(localStorage.getItem(keys[i]));
        console.log(JSON.parse(localStorage.getItem(keys[i])));
    }
    loadUserRepos(user.login);
    userItem.innerHTML = `
    <h1 class="user__item_title">
        User info
    </h1>
    <div class="user__item_head">
    <div class="user__item_img"><img src="${user.avatar_url}" alt="user__item_img"></div>
    <div class="user__item_about">
        <div class="user__item_name">
            <span>${user.login}</span>
        </div>
        <div class="user__item_link">
            <a href="${user.html_url}">Link to gitHub</a>
        </div>
    </div>
    <div class="add__favourites">
            <span class="add__favourites_btn">ADD</span>
    </div>
    </div>

    `;
    console.log(user.login);
    userPage.append(userItem);
    document.body.append(content);
}
content.append(userPage);
let reposTitle = createElement("div", ["user__item_info"]);
reposTitle.textContent = "Repositories";
content.append(reposTitle);
// API //
async function loadUserRepos(login) {
    showLoader(true);
    return await fetch(`https://api.github.com/users/${login}/repos`)
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            createDataList(data);
            showLoader(false);
            return data;
        });
}
// * API //
showUser();
