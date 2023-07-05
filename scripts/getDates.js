// Get year code
const d = new Date();
const yearBox = document.getElementById("year");
yearBox.textContent = d.getFullYear()

// date modified code
var modified = document.getElementById("lastModified");
modified.textContent = document.lastModified;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

function toggleDark() {
	var links = document.getElementsByTagName('link');
	if (links.length == 4) {

		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		document.head.appendChild(link);
		link.href = 'styles/dark.css';
	}
	else {
		var dark = links[4];
		dark.remove();
	}
}

document.getElementById("mode").onclick = function checkClick() {
	toggleDark();
}

const visits = document.getElementById("visits");

function visitCounter() {
	var visit_tally = JSON.parse(localStorage.getItem("tally")) || 0;
	visit_tally++
	localStorage.setItem("tally", visit_tally)
	visits.textContent = visit_tally
}
visitCounter()


//weather js

const weatherHolder = document.querySelector('#weather');

const apiKey = "42bd6e08d7e2ce3a0832c24d332bfd1e";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=29.37&lon=-100.89&units=imperial&appid=${apiKey}`;

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
    const weather = data.weather[0];
	const temp = Math.round(data.main.temp);
	const description = weather.description;
	const sliced = description.split(" ")
	for (let i=0; i < sliced.length; i++){
		sliced[i] = sliced[i][0].toUpperCase() + sliced[i].substr(1)
	}
	
    const weatherUrl = `<img src="https://openweathermap.org/img/w/${weather.icon}.png" alt="${weather.main}">`
    weatherHolder.innerHTML = `${weatherUrl} ${temp}&deg;F - ${sliced.join(" ")} `;
}

apiFetch();