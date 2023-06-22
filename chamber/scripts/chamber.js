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
visited()