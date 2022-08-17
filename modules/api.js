const URl = "https://api.github.com/";
const USER_PER_PAGE = 20;

export class Api {
    async loadUsers(searchValue, page = 1, sortType, order, userPerPage = 20) {
        if (searchValue && page && sortType && order && userPerPage) {
            console.log(
                "Searched Value: УСЛОВИИИИИИИИЯЯЯЯЯЯ ВСЕЕЕЕЕЕЕЕ" + searchValue
            );
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
                "Searched Value БЕЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗЗ УСЛОВВВВВВВВИИИИИИИИИИИИИИИИИИЙ!!!!!!!!!!!: " +
                    searchValue
            );
            console.log(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&sort=${sortType}&order=${order}`
            );
            return await fetch(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&sort=${sortType}&order=${order}`
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
