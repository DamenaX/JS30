const displayTimeText = document.querySelector(".display__time-left");
const displayEndTimeText = document.querySelector(".display__end-time");
const controls = document.querySelector(".timer__controls");
const customeField = document.querySelector("#custom input");
let timeCounter = null;


function timer(seconds) {
    timeCounter && clearInterval(timeCounter);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTime(seconds);
    displayEndTime(seconds);

    timeCounter = setInterval(() => {
        const timeLeft = Math.round((then - Date.now()) / 1000);
        if (timeLeft <= 0) clearInterval(timeCounter);
        displayTime(timeLeft);
    }, 1000)
}

function displayTime(seconds) {
    const time = formatTime(seconds);
    displayTimeText.textContent = `${time[0]}:${(time[1] < 10) ? "0" : ""}${time[1]}:${(time[2] < 10) ? "0" : ""}${time[2]}`;
}

function displayEndTime(seconds) {
    const time = formatTime(seconds);
    time[0] += new Date().getHours() - 12;
    time[1] += new Date().getMinutes();
    time[2] += new Date().getSeconds();
    displayEndTimeText.textContent = `${time[0]}:${(time[1] < 10) ? "0" : ""}${time[1]}:${(time[2] < 10) ? "0" : ""}${time[2]}`;
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    seconds = seconds % 60;
    return [hours, minutes, seconds];
}


controls.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const time = e.target.dataset.time;
        timer(time);
    }
})

customeField.addEventListener("input", (e) => {
        const minutes = e.target.value;
        timer(minutes * 60);
})