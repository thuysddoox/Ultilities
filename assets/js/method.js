var second = document.getElementsByClassName("clockwise-s")[0];
var minute = document.getElementsByClassName("clockwise-m")[0];
var hour = document.getElementsByClassName("clockwise-h")[0];
var navItem = [...document.getElementsByClassName("navbar__item")];
var appItem = [...document.getElementsByClassName("app__content-item")];

setInterval(runClock, 1000);
navItemHandle();
activedAlarm();
document.getElementsByClassName("alarm__btn-back")[0].onclick = addAlarm;
document.getElementsByClassName("alarm__add-btn")[0].onclick = addAlarm;
document.getElementsByClassName("note__btn-back")[0].onclick = addNote;
document.getElementsByClassName("note__menu-add")[0].onclick = addNote;

function activedAlarm() {
    var activeAlarm = [...document.getElementsByClassName("alarm__item-btn")];
    var listAlarm = [...document.getElementsByClassName("alarm__item")];
    activeAlarm.forEach((element, id) => {
        element.onclick = () => {
            if (listAlarm[id].classList.contains("alarm--actived")) listAlarm[id].classList.remove("alarm--actived");
            else listAlarm[id].classList.add("alarm--actived");
        }
    });
}


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
        let time = new Date();
        time = (time.getHours() / 10 < 1 ? `0${time.getHours()}` : time.getHours()) + ':' + (time.getMinutes() / 10 >= 1 ? time.getMinutes() : `0${time.getMinutes()}`);
        document.querySelector('#alarm__time').value = time;
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

/*CREATE NEW ITEM */

/*Create new note */

document.querySelector('.note__btn-save').onclick = renderNote;

function createNewNote() {
    let title = document.getElementById('note__title').value;
    let content = document.getElementById('note__content').value;
    let date = new Date().toLocaleDateString();
    return { title, content, date };
}
// update note 
function updateNote(noteItem) {
    let updatedNote = createNewNote();
    noteItem.querySelector('.note__item-heading').innerText = updatedNote.title;
    noteItem.querySelector('.note__item-text').innerText = updatedNote.content;
    let time = new Date().toLocaleDateString();
    noteItem.querySelector('.note__item-date').insertAdjacentHTML('beforeend', `<p style = "color:rgb(247 173 37); font-style:italic; font-size: 0.9rem;margin:2px 0px">last updated: ${time}</p>`);
}

function renderNote(callback) {
    let note = createNewNote();
    let list = document.querySelector('.note__list');
    let newNote =
        ` <div class="note__item">
                    <h2 class="note__item-heading">${note.title}</h2>
                    <div class="note__item-content">
                        <div class="note__item-date">${note.date}</div>
                        <div class="note__item-text">${note.content}</div>
                    </div>
                    <div class="btn-group-item btn-group-note">
                        <button class="btn-edit">Edit</button>
                        <button class="btn-del">Delete</button>
                    </div>
            </div>`;
    list.insertAdjacentHTML('beforeend', newNote);
    document.querySelector('.note__form-wrap').style.display = 'none';
    document.querySelector('.note-wrap').style.display = 'block';
    document.querySelector('.note__menu-count').innerText = document.getElementsByClassName('note__item').length + " ghi chú";
    document.getElementById('note__title').value = '';
    document.getElementById('note__content').value = '';
}

// create new alarm
document.querySelector('.alarm__btn-save').onclick = function() {
    let alarm = createNewAlarm();
    renderAlarm(alarm);
    document.querySelector('#alarm__note').value = '';
    [...document.getElementsByClassName('dayWeek')].forEach((item) => item.checked = false)

}
document.querySelector('.alarm__btn-back').onclick = backAlarm;
// choose ring
[...document.querySelectorAll('.alarm__ring-item')]
.forEach((item, id, list) => item.onclick = function() {
    list.forEach(ele => ele.classList.remove('actived'));
    this.classList.toggle('actived');
});


[...document.getElementsByClassName('dayWeek')][7].onclick = function() {
    if (this.checked) {
        this.checked = true;
        [...document.getElementsByClassName('dayWeek')].forEach(item => item.checked = true);
    } else {
        this.checked = false;
        [...document.getElementsByClassName('dayWeek')].forEach(item => item.checked = false);
    }
}

function createNewAlarm() {
    let day = {
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: '',
        alldays: ''
    }
    let time = document.querySelector('#alarm__time').value;
    let note = document.querySelector('#alarm__note').value || '....';
    let chooseDay = [...document.getElementsByClassName('dayWeek')].filter(function(item) {
        if (item.checked) {
            day[item.value] = 'day--actived';
            return item.value;
        }
    });
    if (day['alldays'] == 'day--actived')
        for (let d in day) day[d] = 'day--actived';
    return { time, note, day }
}
//update alarm
function updateAlarm(alarm) {
    let newAlrm = createNewAlarm();
    // update infor
    alarm.querySelector('.alarm__item-time span').innerText = newAlrm.time;
    alarm.querySelector('.alarm__time-note').innerText = newAlrm.note;
    let id = 0;
    let dayLst = [...alarm.querySelectorAll('.alarm__time-day-item')];
    for (let i in newAlrm.day) {
        if (newAlrm.day[i] == 'day--actived' && id < 7)
            if (!dayLst[id].classList.contains('day--actived')) dayLst[id].classList.add('day--actived');
        id++;
    }
    if (newAlrm.day['alldays'] == 'day--actived')
        dayLst.forEach(function(item) {
            if (!item.classList.contains('day--actived')) item.classList.add('day--actived');
        });
}


function renderAlarm(alarm) {
    let html = ` <div class="alarm__item">
    <div class="alarm__item-info">
        <h2 class="alarm__item-time">
         <span>${alarm.time}</span>
            <div class="btn-group-item btn-group-alarm">
                <button class="btn-edit">Edit</button>
                <button class="btn-del">Delete</button>
            </div>
        </h2>
        <div class="alarm__time-note">${alarm.note}</div>
        <ul class="alarm__time-day-list">
            <li class="alarm__time-day-item ${alarm.day.Monday}">Mon</li>
            <li class="alarm__time-day-item ${alarm.day.Tuesday}">Tue</li>
            <li class="alarm__time-day-item ${alarm.day.Wednesday}">Wed</li>
            <li class="alarm__time-day-item ${alarm.day.Thursday}">Thur</li>
            <li class="alarm__time-day-item ${alarm.day.Friday}">Fri</li>
            <li class="alarm__time-day-item ${alarm.day.Saturday}">Sat</li>
            <li class="alarm__time-day-item ${alarm.day.Sunday}">Sun</li>
        </ul>
    </div>
    <div class="alarm__item-btn">
        <div class="alarm__item-btn-node"></div>
    </div>
</div>`
    document.querySelector('.alarm__list').insertAdjacentHTML('beforeend', html);
    // activedAlarm();
    activedAlarm();
    backAlarm();
}

function backAlarm() {
    let form = document.querySelector('.alarm__form-wrap');
    let list = document.querySelector('.alarm-wrap')
    if (list.style.display != 'none') {
        list.style.display = 'none';
        form.style.display = 'block';
    } else {
        list.style.display = 'block';
        form.style.display = 'none';
    }
}

// EDIT ITEM

// EDIT ALARM
showBtnAlr();
showBtnNote()

function showBtnAlr() {
    document.querySelector('.alarm__edit-btn').onclick = function() {
        this.classList.toggle('actived');
        if (this.classList.contains('actived')) {
            document.querySelectorAll('.alarm__item-info .btn-group-item')
                .forEach(ele => ele.style.display = 'inline-block');
        } else {
            document.querySelectorAll('.alarm__item-info .btn-group-item')
                .forEach(ele => ele.style.display = 'none');
        }
    }
};

function showBtnNote() {
    document.querySelector('.note__menu-edit').onclick = function() {
        this.classList.toggle('actived');
        if (this.classList.contains('actived')) {
            document.querySelectorAll('.note__item .btn-group-item')
                .forEach(ele => ele.style.display = 'inline-block');
        } else {
            document.querySelectorAll('.note__item .btn-group-item')
                .forEach(ele => ele.style.display = 'none');
        }
    }
};

document.querySelectorAll('.alarm__item-info .btn-edit').forEach(showInforAlrm);

function showInforAlrm(btn, id) {
    let alarms = [...document.querySelectorAll('.alarm__item')];
    btn.onclick = function() {
        addAlarm();
        document.querySelector('#alarm__time').value = alarms[id].querySelector('.alarm__item-time span').innerText;
        document.querySelector('#alarm__note').value = alarms[id].querySelector('.alarm__time-note').innerText;
        let dayWk = [...document.getElementsByClassName('dayWeek')];
        alarms[id].querySelectorAll('.alarm__time-day-item').forEach(
            function(item, id) {
                if (item.classList.contains('day--actived')) dayWk[id].checked = true;
            });
        document.querySelector('.alarm__btn-save').onclick = function() {
            updateAlarm(alarms[id]);
            activedAlarm();
            backAlarm();
        }
    }
    document.querySelector('#alarm__note').value = '';
    [...document.getElementsByClassName('dayWeek')].forEach((item) => item.checked = false)

}

// UPDATE NOTE ITEM
document.querySelectorAll('.note__item .btn-edit').forEach(showInforNote);

function showInforNote(btn, id) {
    let noteList = document.querySelectorAll('.note__item');
    btn.onclick = function() {
        // display infor in form create note
        document.getElementById('note__title').value =
            noteList[id].querySelector('.note__item-heading').innerText;
        document.getElementById('note__content').value =
            noteList[id].querySelector('.note__item-text').innerText;
        addNote();
        document.querySelector('.note__btn-save').onclick = function() {
            updateNote(noteList[id]);
            document.querySelector('.note__form-wrap').style.display = 'none';
            document.querySelector('.note-wrap').style.display = 'block';
        }
    }

    document.getElementById('note__title').value = '';
    document.getElementById('note__content').value = '';
}


// DELETE ITEM


//Delete note

document.querySelectorAll('.note__item .btn-del').forEach(deleteNote);

function deleteNote(btn, id) {
    let noteList = document.querySelectorAll('.note__item');
    btn.onclick = function() {
        console.log(document.querySelectorAll('.note__item')[id]);
        noteList[id].remove();
    }
}

//Delete alarm

document.querySelectorAll('.alarm__item-info .btn-del').forEach(deleteAlarm);

function deleteAlarm(btn, id) {
    let alarmList = document.querySelectorAll('.alarm__item');
    btn.onclick = function() {
        console.log(document.querySelectorAll('.alarm__item')[id]);
        alarmList[id].remove();
    }
}