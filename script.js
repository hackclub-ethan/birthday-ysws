const birthday = document.getElementById("birthday");
const countdown = document.getElementById("countdown");
const prompt = document.getElementById("aiPrompt");
const generate = document.getElementById("generate");
const response = document.getElementById("response");

let currentTime = 0;

function updateTime() {
    if (Math.random() < 0.05) {
        const newBirthday = birthday.value;
        const formattedBirthday = new Date(newBirthday);
        const rightNow = Date.now();

        const diff = Math.floor((formattedBirthday - rightNow) / 1000);

        if (diff <= 0) {
            currentTime = 0;
        };
    };

    if (currentTime == 0) {
        countdown.innerText = `0:00:00:00`;
        alert("🎉🎉HAPPY BIRTHDAY🎉🎉");

        clearInterval(updateCounter);

        return;
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

    const formattedTime = `${days}:${hours}:${minutes}:${seconds}`;

    countdown.innerText = formattedTime;
};

let updateCounter;

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

function displayResonse(text) {
    const index = text.indexOf("</think>");
    const final = text.substring(index + 8).trim();

    response.innerText = final;
}

function aiPrompt() {
    const promptText = prompt.value;

    const finalPrompt = "It is the users birthday. Wish them a happy birthday. This is a prompt from the user: " + promptText;

    fetch("https://ai.hackclub.com/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "messages": [
                {
                    "role": "user",
                    "content": finalPrompt
                }
            ]
        })
    })
    .then(res => res.json())
    .then(text => displayResonse(text["choices"][0]["message"]["content"]));
};

generate.addEventListener("click", aiPrompt);