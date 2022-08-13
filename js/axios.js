// const searchInput = document.querySelector("#search-input");

async function getApi() {
    axios
        .get("https://api.github.com/users/octocat")
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            console.log("end");
        });
}
getApi();
