const URl = "https://api.github.com/";
const USER_PER_PAGE = 20;

export class Api {
    async loadUsers(searchValue, page = 1, sortType, order, userPerPage = 20) {
        if (searchValue && page && order && sortType && userPerPage) {
            return await fetch(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&sort=${sortType}&order=${order}`
            ).then((res) => {
                return res;
            });
        } else if (searchValue && page && userPerPage && sortType) {
            return await fetch(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&sort=${sortType}`
            ).then((res) => {
                return res;
            });
        } else if (searchValue && page && userPerPage && order) {
            return await fetch(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}&order=${order}`
            ).then((res) => {
                return res;
            });
        } else {
            return await fetch(
                `${URl}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}`
            ).then((res) => {
                return res;
            });
        }
    }
}
