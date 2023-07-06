const page = window.location.pathname.split("/").pop();
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

const dt = Date.now();
var last_date = JSON.parse(localStorage.getItem("date")) || "";

function convert(milliseconds){
	if(last_date != ""){
	let days = Math.floor(milliseconds/86400000);
	return days}
	else{
		return 0;
	}
}

function visited(){
	const welcome = document.getElementById("message");
	if(last_date == ""){
		console.log("Welcome")
		welcome.textContent = "Welcome! Let us know if you have any questions!"
	}
	localStorage.setItem('date', dt)
	var time_since = dt-last_date 
	var conv_time = convert(time_since)
	if (conv_time < 1 && last_date != ""){
		welcome.textContent = "Be back soon! Awesome!"
		console.log("Wow")
	}
	else if(conv_time == 1){
		welcome.textContent = `You last visited ${conv_time} day ago!`
	}
	else if (conv_time > 1){
		welcome.textContent = `You last visited ${conv_time} days ago!`
	}
	console.log(conv_time)
}

if (page == "discover.html"){
visited()
}
// API calls

//weather
const weatherHolder = document.querySelector('#weather-holder');

const apiKey = "42bd6e08d7e2ce3a0832c24d332bfd1e";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=56.81&lon=-5.105&units=metric&appid=${apiKey}`;


async function apiFetch() {
	try {
        const resp = await fetch(url);
        if(resp.ok) {
            const data = await resp.json();
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

if (page == "index.html"){
	apiFetch();
	}

//API MEMBER FETCH


const members = document.querySelector('#members');
const memberList = "https://www.elenalaree.github.io/wdd230/chamber/data/members.json";

async function memberFetch() {
    try {
        const response = await fetch(memberList);
        if(response.ok) {
            const info = await response.json();
            console.log(info);
            displayResults(info)
        }
        else{
            throw Error(await resp.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

if (page == "directory.html"){
	memberFetch();
	}