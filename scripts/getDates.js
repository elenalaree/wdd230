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

function toggleDark(){
	var links = document.getElementsByTagName('link');
	if (links.length == 4 ){ 
	
	var link = document.createElement("link");
	link.type= "text/css";
	link.rel = "stylesheet";
	document.head.appendChild(link);
	link.href = 'styles/dark.css';
	}
	else{
		var dark = links[4];
		dark.remove();
	}
}

document.getElementById("mode").onclick = function checkClick(){
	toggleDark();
}

const visits = document.getElementById("visits");

function visitCounter(){
	var visit_tally = JSON.parse(localStorage.getItem("tally")) || 0;
	visit_tally ++
	localStorage.setItem("tally", visit_tally)
	visits.textContent = visit_tally
}
visitCounter()