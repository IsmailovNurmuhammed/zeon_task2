let favouritesArr = JSON.parse(localStorage.getItem("favourites"));
console.log(favouritesArr);

const createElement = (elementTag, elementClass = []) => {
    const element = document.createElement(elementTag);
    if (elementClass) {
        for (const className in elementClass) {
            element.classList.add(elementClass[className]);
        }
    }
    return element;
};
const showUserInfo = async (userLogin) => {
    await fetch(`https://api.github.com/users/${userLogin}`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            console.log(res);
            localStorage.setItem(
                res,
                JSON.stringify(res)
            )((window.location.href = "/userPage.html"));
        });
};
const clearPage = () => {
    content.innerHTML = "";
};
const pageName = createElement("h1", ["favourites__title"]);

const createFavouritesList = (list) => {
    const block = createElement("div", ["favourites__list"]);

    list.forEach((item) => {
        console.log(item);
        const user = createElement("div", ["favourite__user"]);
        const userImg = createElement("div", ["favourite__user_img"]);
        const avatar = createElement("img");
        avatar.src = item.avatar_url;
        const userInfoBlock = createElement("div", ["favourite__user_info"]);
        const userInfoTop = createElement("div", ["favourite__user_top"]);
        const userInfoName = createElement("div", ["favourite__user_name"]);
        userInfoName.textContent = item.login;
        const userInfoFavourite = createElement("div", [
            "favourite__user_favourite",
        ]);
        userInfoFavourite.textContent = "Remove";
        const userInfoBottom = createElement("div", ["favourite__user_bottom"]);
        const userInfoGit = createElement("a", ["favourite__user_git"]);
        userInfoGit.textContent = "link to gitHub";
        userInfoGit.href = item.html_url;
        const userInfoLink = createElement("div", ["favourite__user_link"]);
        userInfoLink.textContent = "Show repos";

        user.append(userImg);
        userImg.append(avatar);
        user.append(userInfoBlock);
        userInfoBlock.append(userInfoTop, userInfoBottom);
        userInfoTop.append(userInfoName, userInfoFavourite);
        userInfoBottom.append(userInfoGit, userInfoLink);

        userInfoLink.addEventListener("click", () => {
            showUserInfo(item.login);
        });
        userInfoFavourite.addEventListener("click", () => {
            let favouritesList = JSON.parse(localStorage.getItem("favourites"));

            userInfoFavourite.classList.toggle("active");
            userInfoFavourite.classList.contains("active")
                ? (userInfoFavourite.textContent = "ADD")
                : (userInfoFavourite.textContent = "Remove");

            console.log(!favouritesList.find((o) => o.login === item.login));

            if (!favouritesList.find((o) => o.login === item.login)) {
                console.log("if");
                favouritesList.push(item);
                localStorage.setItem(
                    "favourites",
                    JSON.stringify(favouritesList)
                );
                clearPage();
                createFavouritesList(favouritesList);
            } else {
                console.log("else");
                let indexOfitemToDelete = favouritesList.indexOf(
                    favouritesList.find((o) => o.login === item.login)
                );
                favouritesList.splice(indexOfitemToDelete, 1);
                localStorage.setItem(
                    "favourites",
                    JSON.stringify(favouritesList)
                );
                console.log(favouritesList);
                clearPage();
                createFavouritesList(favouritesList);
            }
        });

        block.append(user);
    });
    pageName.textContent = "Favourites";
    content.append(pageName);
    content.append(block);
    document.body.append(content);
};
let content = createElement("div", ["container"]);

createFavouritesList(favouritesArr);
