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
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=56.8165&lon=-5.1121&units=metric&appid=${apiKey}`;


async function apiFetch() {
	try {
        const resp = await fetch(url);
        if(resp.ok) {
            const data = await resp.json();
            displayTodays(data);
        }
        else{
            throw Error(await resp.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}



function displayTodays(data){
	let threeDay = data.daily;
	forecastMe(threeDay);
	let weather = data.current;
	let info = weather.weather[0];
	const temp = Math.round(weather.temp);
	const description = info.description;
		
	const sliced = description.split(" ");
	for (let i=0; i < sliced.length; i++){
		sliced[i] = sliced[i][0].toUpperCase() + sliced[i].substr(1);
	}
	const today = document.createElement('div');
    const weatherUrl = `<img src="https://openweathermap.org/img/wn/${info.icon}@2x.png" alt="${info.main}">`
    today.innerHTML = `${weatherUrl} <p>${temp}&deg;C - ${sliced.join(" ")} </p>`;
	weatherHolder.appendChild(today);
}

function forecastMe(weather){
	weatherHolder.textContent = "Today's Weather";
	const forecastHolder = document.querySelector("#forecast-holder");
	forecastHolder.textContent = "Three-day Forecast"
	for (let i = 0; i < 3; i++) {
		const element = weather[i];
		const weath = element.weather[0]
		let max = Math.round(element.temp.max);
		let min = Math.round(element.temp.min);
		let icon = weath.icon;
		let desc = weath.description;
		let main = weath.main;
		
		const threeDayForecast =  document.createElement("div");
		const sliced = desc.split(" ");
		for (let i=0; i < sliced.length; i++){
			sliced[i] = sliced[i][0].toUpperCase() + sliced[i].substr(1);
		}
		let description = sliced.join(" ");
	
		const weatherUrl = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${main}">`
		threeDayForecast.innerHTML = `${weatherUrl}<p> High:${max}&deg;C | Low:${min}&deg;C</p>  ${description} `;
		forecastHolder.appendChild(threeDayForecast)
	}

}




//API MEMBER FETCH


const members = document.querySelector('#members');
const memberList = "https://elenalaree.github.io/wdd230/chamber/data/members.json";

async function memberFetch() {
    try {
        const response = await fetch(memberList);
        if(response.ok) {
            const info = await response.json();
			console.log(page)
			if(page == "directory.html"){
				printMembers(info)
			}
			if(page == "index.html"){
				adListings(info)
			}

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
	console.log(data)
	list.forEach(card => {
		let memberCard = document.createElement('section');
		memberCard.setAttribute("class", "mem-card")
        let shopName = document.createElement('h2');
        let storeFront =  document.createElement('img');
        let membershipLvl = document.createElement('h4');
		let address = document.createElement('h4');
        let phone = document.createElement('h4');
		let web = document.createElement('a');
		let type =document.createElement("h4");

		let name = card.name;
		let businessType = card.businesstype;
		let location = card.address;
		let image = card.image;
		let membership = card.membership;
		let phoneNumber = card.phonenumber;
		let website = card.websiteurl;

		shopName.textContent = name;
		address.textContent = location;
		storeFront.setAttribute('src', image);
		storeFront.setAttribute('alt', `${name} Storefront`);
		storeFront.setAttribute('loading', "lazy");

		membershipLvl.textContent = membership;
		phone.textContent = phoneNumber;
		web.setAttribute("href", website);
		web.textContent = `${name} Wizsite`
		type.textContent = businessType;

		memberCard.appendChild(shopName);
		memberCard.appendChild(address);
		memberCard.appendChild(type);
		memberCard.appendChild(web);
		memberCard.appendChild(phone);
		memberCard.appendChild(membershipLvl);
		memberCard.appendChild(storeFront);

		members.appendChild(memberCard);
	});
}

function adListings(data) {
	let members = data.members
	let silverGold = [];
	let used = []
	members.forEach(member => {
		let lvl = member.membership;
		if (lvl == "Silver" || lvl == "Gold"){
			silverGold.push(member)
		}
	});
	while(silverGold.length > 3)
	{
		var j = Math.floor(Math.random() * (silverGold.length));
		used.push(silverGold[j]);
		silverGold.splice(j, 1); 
	}
	used.forEach(shop => {
		const sponsor = document.querySelector(".sponsor");
		const adCard = document.createElement("div");
        let shopName = document.createElement('h2');
		let address = document.createElement('h4');
        let phone = document.createElement('h4');
		let web = document.createElement('a');
		let type =document.createElement("h4");

		const name = shop.name;
		const location = shop.address;
		const number = shop.phonenumber;
		const website = shop.websiteurl;
		const businessType = shop.businesstype;
		phone.textContent = number;
		shopName.textContent = name;
		address.textContent = location;
		web.setAttribute("href", website);
		web.textContent = `${name} Wizsite`
		type.textContent = businessType;

		adCard.appendChild(shopName);
		adCard.appendChild(address)
		adCard.appendChild(type);
		adCard.appendChild(web);
		adCard.appendChild(phone);

		sponsor.appendChild(adCard);
		
	});

}

if (page == "directory.html"){
	memberFetch()
	const gridButton = document.querySelector("#grid");
	const display = document.querySelector("#members");
	const icon = document.querySelector("#icon");
	const icon2 = document.querySelector("#icon2")
	
	gridButton.addEventListener("click", () => {
		if(display.classList == "list"){
			display.classList.add("grid");
			display.classList.remove("list");
			icon.classList.add("fa-table-list")
			icon.classList.remove("fa-grip-vertical");
			icon2.classList.remove("fa-grip-vertical");
		} else {
			display.classList.add("list");
			display.classList.remove("grid");
			icon.classList.remove("fa-table-list")
			icon.classList.add("fa-grip-vertical");
			icon2.classList.add("fa-grip-vertical");
		}
		});
	}

function displayPopUp(){
	let day = Date(dt).toString();
	let weekday = day[0]+day[1]+day[2];
	if(weekday == "Mon" || weekday == "Tue" || weekday == "Wed"){
		bruce.classList.remove("hidden");
		bruce.classList.add("shown")
	}
}

if (page == "index.html"){
	apiFetch();
	memberFetch();
	const hulk = document.getElementById("banner");
	const bruce = document.getElementById("bruce");
	displayPopUp();
	hulk.addEventListener("click", () => {
		bruce.classList.remove("shown")
		bruce.classList.add("hidden");
	});
}

