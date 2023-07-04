const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait =  document.createElement('img');
        let birth = document.createElement('h4');
        let yearsServed = document.createElement('h4');
        let codename =  `${prophet.name} ${prophet.lastname}`;
        fullName.textContent = `${codename}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${codename}`);
        portrait.setAttribute('loading', "lazy");
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        birth.textContent = `Birth Date: ${prophet.birthdate}`
        yearsServed.textContent = `Served ${prophet.length} years`

        card.appendChild(fullName);
        card.appendChild(birth);
        card.appendChild(yearsServed)
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}

getProphetData();