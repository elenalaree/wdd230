
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

function toggleDark() {
	var links = document.getElementsByTagName('link');
	if (links.length == 5) {

		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		document.head.appendChild(link);
		link.href = 'styles/dark.css';
	}
	else {
		var dark = links[5];
		dark.remove();
	}
}

document.getElementById("mode").onclick = function checkClick() {
	toggleDark();
}

// Get year code
const d = new Date();
const yearBox = document.getElementById("year");
yearBox.textContent = d.getFullYear()

// date modified code
var modified = document.getElementById("lastModified");
modified.textContent = document.lastModified;

const ratingValue = document.getElementById("ratingValue");
const range = document.getElementById("pageRating");

// Rating event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    ratingValue.innerHTML = range.value;
}