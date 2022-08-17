const URl = "https://api.github.com/";
const USER_PER_PAGE = 20;

export class Api {
    async loadUsers(searchValue, page = 1, sortType, order, userPerPage = 20) {
        if (searchValue && page && order && userPerPage) {
            console.log("Searched: УСЛОВИЯ ВСЕ кроме сортировки" + searchValue);
            console.log(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&order=${order}`
            );
            return await fetch(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&order=${order}`
            ).then((res) => {
                return res;
            });
        } else if (searchValue && page && sortType && userPerPage) {
            console.log("Searched : УСЛОВИЯ ВСЕ кроме ордера" + searchValue);
            console.log(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&sort=${sortType}`
            );
            return await fetch(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&sort=${sortType}`
            ).then((res) => {
                return res;
            });
        } else if (searchValue && page && order && sortType && userPerPage) {
            console.log("Searched : УСЛОВИЯ ВСЕЕЕЕЕЕ" + searchValue);
            console.log(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&sort=${sortType}&order=${order}`
            );
            return await fetch(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&sort=${sortType}&order=${order}`
            ).then((res) => {
                return res;
            });
        } else {
            console.log(
                "Searched  без условий сортировки сортировки и ордера :" +
                    searchValue
            );
            console.log(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}`
            );
            return await fetch(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}`
            ).then((res) => {
                return res;
            });
        }
    }

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
