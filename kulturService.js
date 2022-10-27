
function signup(event) {
    const div = document.getElementById('container');
    event.preventDefault()
    console.log("signup kaldt")
    var nameField = document.getElementById("nameField").value;
    var passwordFieldSignup = document.getElementById("passwordFieldSignup").value;
    var payload = {
        username: nameField,
        password: passwordFieldSignup
    };
    payload = JSON.stringify(payload)
    console.log(payload)
    fetch("http://localhost:8080/signup",
        {
            method: "POST",
            body: payload,
            headers:{'content-type': 'application/json'}
        })
        .then(function (res) {
            div.insertAdjacentHTML(
                'beforeend',
                `<span style="background-color: red">` + JSON.stringify(res) + `</code>`,
            );
            return res.json();
        })
        .then(function (data) {
            div.insertAdjacentHTML(
                'beforeend',
                `<span style="background-color: green">` + JSON.stringify(data) + `</code>`,
            );
        })
}

function login(event) {
    const div = document.getElementById('container');
    event.preventDefault()
    const usernameField = document.getElementById("usernameField").value;
    const passwordField = document.getElementById("passwordField").value;
    let payload = {
        username: usernameField,
        password: passwordField
    };
    payload = JSON.stringify(payload)
    fetch("http://localhost:8080/login",
        {
            method: "POST",
            body: payload,
            headers:{'content-type': 'application/json'}
        })
        .then(function (res) {
            div.insertAdjacentHTML(
                'beforeend',
                `<span style="background-color: red">` + JSON.stringify(res) + `</code>`,
            );
            return res.json();  // = JWT token
        })
        .then(function (res) {
            localStorage.setItem('user', JSON.stringify(res));
            div.insertAdjacentHTML(
                'beforeend',
                `<span style="background-color: green">` + JSON.stringify(res) + `</code>`,
            );
        })
}

// function getSecret(event) {
//     const div = document.getElementById('container');
//     event.preventDefault()
//     if(localStorage.getItem('user') == undefined){
//         div.insertAdjacentHTML(
//             'beforeend',
//             `<span style="background-color: red"> No token. Log in first.</code>`,
//         );
//         return;
//     }
//     var paramField = document.getElementById("paramField").value;
//     var payload = {
//         paramField: paramField
//     };
//     const localstorage_user = JSON.parse(localStorage.getItem('user'))
//     const inMemoryToken = localstorage_user.token
//     fetch("http://localhost:8080/getSecret", //"https://gaprepservice.azurewebsites.net/createUser"
//         {
//             method: "POST",
//             body: payload,
//             headers:{'content-type': 'application/json',
//                 'Authorization': 'Bearer ' + inMemoryToken }
//         })
//         .then(function (res) { // the response to the fetch call itself
//             div.insertAdjacentHTML(
//                 'beforeend',
//                 `<span style="background-color: red">` + res.status + `</code>`,
//             );
//             return res.json();
//         })
//         .then(function (data) { // the data, provided by server response
//             div.insertAdjacentHTML(
//                 'beforeend',
//                 `<span style="background-color: green">` + JSON.stringify(data) + `</code>`,
//             );
//         })
// }

function logout(event) {
    event.preventDefault()
    const div = document.getElementById('container');
    localStorage.removeItem('user')
    div.insertAdjacentHTML(
        'beforeend',
        `<span style="background-color: green">You have logged out.</code>`,
    );
}
