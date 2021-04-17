var second = document.getElementsByClassName("clockwise-s")[0];
var minute = document.getElementsByClassName("clockwise-m")[0];
var hour = document.getElementsByClassName("clockwise-h")[0];
var navItem = [...document.getElementsByClassName("navbar__item")];
var appItem = [...document.getElementsByClassName("app__content-item")];
var activeAlarm = [...document.getElementsByClassName("alarm__item-btn")];
var listAlarm = [...document.getElementsByClassName("alarm__item")];
setInterval(runClock, 1000);
navItemHandle();
document.getElementsByClassName("alarm__btn-back")[0].onclick = addAlarm;
document.getElementsByClassName("alarm__add-btn")[0].onclick = addAlarm;
document.getElementsByClassName("note__btn-back")[0].onclick = addNote;
document.getElementsByClassName("note__menu-add")[0].onclick = addNote;
activeAlarm.forEach((element, id) => {
    element.onclick = () => {
        if (listAlarm[id].classList.contains("alarm--actived")) listAlarm[id].classList.remove("alarm--actived");
        else listAlarm[id].classList.add("alarm--actived");
    }
})

function addNote() {
    let listAlr = document.getElementsByClassName("note-wrap")[0];
    let noteForm = document.getElementsByClassName("note__form-wrap")[0];
    if (listAlr.style.display != "none") {
        listAlr.style.display = "none";
        noteForm.style.display = "block";
    } else {
        listAlr.style.display = "block";
        noteForm.style.display = "none";
    }
}

function addAlarm() {
    let alarmList = document.getElementsByClassName("alarm-wrap")[0];
    let alarmForm = document.getElementsByClassName("alarm__form-wrap")[0];
    if (alarmList.style.display != "none") {
        alarmList.style.display = "none";
        alarmForm.style.display = "block";
    } else {
        alarmList.style.display = "block";
        alarmForm.style.display = "none";

    }
}

function logIn() {
    var login = document.getElementsByClassName("form__login")[0];
    var appDetail = document.getElementsByClassName("app__detail")[0];
    if (login.style.display != "none") {
        login.style.display = "none";
        appDetail.style.display = "block";
        navItem[0].classList.add("actived");
        appItem[0].style.display = "block";
    } else {
        login.style.display = "block";
        appDetail.style.display = "none";
        navItem.forEach((element) => {
            element.classList.remove("actived");
        });
        appItem.forEach((element) => {
            element.style.display = "none";
        });

    }

}

function runClock() {
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    $(".clock-time").text(time.toLocaleTimeString());
    $(".clock-date").text(time.toDateString());
    document.querySelector(":root").style.setProperty('--angleSecond', s * 6 + "deg");
    second.style.animation = "none";
    second.style.animation = "clockSecondHandle 60s linear infinite";
    document.querySelector(":root").style.setProperty('--angleMinute', (m * 6 + 0.1 * s) + "deg");
    minute.style.animation = "none";
    minute.style.animation = "clockMinuteHandle 3600s linear infinite";
    document.querySelector(":root").style.setProperty('--angleHour', (h * 30 + 0.5 * m) + "deg");
    hour.style.animation = "none";
    hour.style.animation = "clockHourHandle 43200s linear infinite";
}

function navItemHandle() {
    var navItem = [...document.getElementsByClassName("navbar__item")];
    var appItem = document.getElementsByClassName("app__content-item");
    navItem[0].classList.add("actived");
    navItem.forEach((element, id) => {
        element.onclick = () => {
            navItem.forEach((item, index) => {
                if (item.classList.contains("actived")) {
                    item.classList.remove("actived");
                    appItem[index].style.display = "none";
                }
            });
            element.classList.add("actived");
            appItem[id].style.display = "block";
        }
    });
}