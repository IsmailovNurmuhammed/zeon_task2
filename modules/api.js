const URl = "https://api.github.com/";
// const USER_PER_PAGE = 20;

export class Api {
    async loadUsers(
        searchValue,
        page,
        sortType = "",
        order = "desc",
        userPerPage = 20
    ) {
        return await fetch(
            `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&sort=${sortType}&order=${order}`
        ).then((res) => res);
    }
    async changePage(page) {}

    async loadUserData(login) {
        console.log(login);
        const urls = [
            `https://api.github.com/users/${login}/following`,
            `https://api.github.com/users/${login}/followers`,
            `https://api.github.com/users/${login}/repos`,
        ];
        const requests = urls.map((url) => fetch(url));
        return await Promise.all(requests).then((responses) =>
            Promise.all(responses.map((r) => r.json()))
        );
    }
}
