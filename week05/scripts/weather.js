const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const apiKey = "42bd6e08d7e2ce3a0832c24d332bfd1e";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.63&units=imperial&appid=${apiKey}`;

async function apiFetch() {
    try {
        const resp = await fetch(url);
        if(resp.ok) {
            const data = await resp.json();
            console.log(data);
            displayResults(data)
        }
        else{
            throw Error(await resp.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function displayResults(data){
    const weather = data.weather[0]
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const weatherUrl = `https://openweathermap.org/img/w/${weather.icon}.png`
    weatherIcon.setAttribute('src', weatherUrl );
    weatherIcon.setAttribute('alt', weather.main);
    captionDesc.textContent = `${weather.description}`;
}

apiFetch();
