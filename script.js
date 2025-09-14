const birthday = document.getElementById("birthday");
const countdown = document.getElementById("countdown");

let currentTime = 0;

function updateTime() {
    if (currentTime == 0) {
        return;
    };

    if (Math.random() < 0.250) {
        const newBirthday = birthday.value;
        const formattedBirthday = new Date(newBirthday);
        const rightNow = Date.now();

        const diff = Math.floor((formattedBirthday - rightNow) / 1000);

        if (diff <= 0) {
            currentTime = 0;
        };
    };

    currentTime -= 1;

    let ownTime = currentTime;

    const days = Math.floor(ownTime / 86400)
    ownTime = ownTime % 86400;
    let hours = Math.floor(ownTime / 3600);
    ownTime = ownTime % 3600;
    let minutes = Math.floor(ownTime / 60);
    ownTime = ownTime % 60;
    let seconds = Math.floor(ownTime);

    if (seconds < 10) {
        seconds = "0" + seconds;
    };
    
    if (minutes < 10) {
        minutes = "0" + minutes;
    };

    if (hours < 10) {
        hours = "0" + hours;
    };

    if (currentTime == 0) {
        countdown.innerText = `0:00:00:00`;
        alert("🎉🎉HAPPY BIRTHDAY🎉🎉");

        clearInterval(updateCounter);

        return;
    };

    const formattedTime = `${days}:${hours}:${minutes}:${seconds}`;

    countdown.innerText = formattedTime;
};

let updateCounter = setInterval(updateTime, 1000);

function setBirthday() {
    const newBirthday = birthday.value;
    const formattedBirthday = new Date(newBirthday);
    const rightNow = Date.now();

    const diff = Math.floor((formattedBirthday - rightNow) / 1000);

    if (diff <= 0) {
        currentTime = 0;
        alert("Make sure you selected the correct year");
        return;
    };

    updateCounter = setInterval(updateTime, 1000);

    currentTime = diff;
};

birthday.addEventListener("change", setBirthday);