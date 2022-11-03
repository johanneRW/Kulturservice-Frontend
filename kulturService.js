
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

function getFutureEvents(event) {
    const div = document.getElementById('container');
    event.preventDefault()
    if (localStorage.getItem('user') == undefined) {
        div.insertAdjacentHTML(
            'beforeend',
            `<span style="background-color: red"> No token. Log in first.</code>`,
        );
        return;
    }

    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    fetch("http://localhost:8080/getFutureEvents",
        {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + inMemoryToken
            }
        })
        .then(function (res) { // the response to the fetch call itself
            if (res.status != 200) {
                div.insertAdjacentHTML(
                    'beforeend',
                    `<span style="background-color: red">` + res.status + `</code>`,
                );
            }
            return res.json();
        })
        .then(function (data) { // the data, provided by server response
            if (data == null || data.length==0) {
                div.insertAdjacentHTML(
                    'beforeend',
                    `<span style="background-color: yellow"> Fandt ingen kommende events</code>`,
                );
            } else {
                data.forEach(event => {
                    
                div.insertAdjacentHTML(
                    'beforeend',
                    `<h4>`+event.bandName +'</h4> <h5>'+event.venue.venueName+': '+event.eventDate+'</h5> <br>',
                );
            })}
        })
}

function logout(event) {
    event.preventDefault()
    const div = document.getElementById('container');
    localStorage.removeItem('user')
    div.insertAdjacentHTML(
        'beforeend',
        `<span style="background-color: green">You have logged out.</code>`,
    );
}
