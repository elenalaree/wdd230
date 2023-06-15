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