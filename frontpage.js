function getSecret(event) {
    const div = document.getElementById('container');
    event.preventDefault()
    if(localStorage.getItem('user') == undefined){
        div.insertAdjacentHTML(
            'beforeend',
            `<span style="background-color: red"> No token. Log in first.</code>`,
        );
        return;
    }
    var paramField = document.getElementById("paramField").value;
    var payload = {
        paramField: paramField
    };
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    fetch("http://localhost:8080/getSecret", //"https://gaprepservice.azurewebsites.net/createUser"
        {
            method: "POST",
            body: payload,
            headers:{'content-type': 'application/json',
                'Authorization': 'Bearer ' + inMemoryToken }
        })
        .then(function (res) { // the response to the fetch call itself
            div.insertAdjacentHTML(
                'beforeend',
                `<span style="background-color: red">` + res.status + `</code>`,
            );
            return res.json();
        })
        .then(function (data) { // the data, provided by server response
            div.insertAdjacentHTML(
                'beforeend',
                `<span style="background-color: green">` + JSON.stringify(data) + `</code>`,
            );
        })
}