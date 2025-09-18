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

    if (days == 0 && hours == 0) {
        const formattedTime = `${minutes}:${seconds}`;
        countdown.innerText = formattedTime;

        return;
    }

    if (days == 0) {
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        countdown.innerText = formattedTime;

        return;
    }

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

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        alert("Something went wrong getting your location");
    };
};

function getWeather(pos) {
    let setBirthday = birthday.value;

    if (setBirthday == "") {
        alert("You did not set a birthday.")
        return;
    };

    const currentYear = setBirthday.substring(0,4);
    const dayMonth = setBirthday.substring(5);
    // Past 5 years (not including next one)
    const birthdays = [`${currentYear - 1}-${dayMonth}`, `${currentYear - 2}-${dayMonth}`, `${currentYear - 3}-${dayMonth}`, `${currentYear - 4}-${dayMonth}`, `${currentYear - 5}-${dayMonth}`];
    const pastWeather = [];

    const url = `https://historical-forecast-api.open-meteo.com/v1/forecast`;
    
    for (let i = 0; i < birthdays.length; i++) {
        const query = `latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&start_date=${birthdays[i]}&end_date=${birthdays[i]}&hourly=temperature_2m,precipitation&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;

        fetch(`${url}?${query}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(json => pastWeather.push(json))
        .then(stuff =>{
            if (pastWeather.length == 5) {
                dispalyWeather(pastWeather)
                return;
            }
        });
    };
};

function dispalyWeather(weather) {
    const average = array => array.reduce((a, b) => a + b) / array.length;

    const avergeTemps = [];
    const averagePerciptation = [];

    for (let i = 0; i < weather.length; i++) {
        const precipitation = weather[i]["hourly"]["precipitation"];
        const temps = weather[i]["hourly"]["temperature_2m"];

        let precipitationAvg = average(precipitation);
        let tempAvg = average(temps);

        avergeTemps.push(tempAvg);
        averagePerciptation.push(precipitationAvg);
    };

    console.log(averagePerciptation);
    console.log(avergeTemps);

    // create graphs
};

document.getElementById("getWeather").addEventListener("click", getLocation)