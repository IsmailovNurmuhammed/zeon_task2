// let userInfo = localStorage.getItem();
// userInfo = JSON.parse(userInfo);
// document.body.append(userInfo);

for (let user in localStorage) {
    console.log(user);
    document.body.append(JSON.parse(user));
}
