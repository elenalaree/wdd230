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
const memberList = "https://elenalaree.github.io/wdd230/chamber/data/members.json";

async function memberFetch() {
    try {
        const response = await fetch(memberList);
        if(response.ok) {
            const info = await response.json();
            printMembers(info)
        }
        else{
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function printMembers(data){
	const list = data.members;
	console.log(list)
	list.forEach(card => {
		let memberCard = document.createElement('section');
		memberCard.setAttribute("class", "card")
        let shopName = document.createElement('h2');
        let storeFront =  document.createElement('img');
        let membershipLvl = document.createElement('h4');
        let phone = document.createElement('h4');
		let web = document.createElement('a');
		let type =document.createElement("h4");

		let name = card.name;
		let businessType = card.businesstype;
		let image = card.image;
		let membership = card.membership;
		let phoneNumber = card.phonenumber;
		let website = card.websiteurl;
		console.log(website)
		shopName.textContent = name;
		storeFront.setAttribute('src', image);
		storeFront.setAttribute('alt', `${name} Storefront`);
		storeFront.setAttribute('loading', "lazy");

		membershipLvl.textContent = membership;
		phone.textContent = phoneNumber;
		web.setAttribute("href", website);
		web.textContent = `${name} Wizsite`
		type.textContent = businessType;

		memberCard.appendChild(shopName);
		memberCard.appendChild(type);
		memberCard.appendChild(phone);
		memberCard.appendChild(web);
		memberCard.appendChild(membershipLvl);
		memberCard.appendChild(storeFront);

		members.appendChild(memberCard);
	});
}

if (page == "directory.html"){
	memberFetch();
	}