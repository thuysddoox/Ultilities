var apiSource = "/assets/json-server/data.json";

function getData() {
    fetch(apiSource)
        .then(response => response.json())
        .then(callback)
        .catch(err => alert(err));
}

function renderAlarm(data) {
    let listAlarm = document.querySelector(".alarm__list")
    let html = data.alarm.map(item =>
        ``
    );
}