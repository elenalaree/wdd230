const baseURL = "https://elenalaree.github.io/wdd230/";
const linksURL = "https://elenalaree.github.io/wdd230/data/links.json";

async function getLinks(){
    const resp = await fetch(linksURL);
    const data = await resp.json();
    displayLinks(data)
}

getLinks();
const linkBox = document.getElementById("link-box");
function displayLinks(weeks){
    const weekArray = weeks.weeks
    
    for (let i = 0; i < weekArray.length; i++) {
        const weekList = document.createElement('li');
        let week = weekArray[i];
        let weekName = `${week.week}: `;
        let links =  week.links;
        weekList.textContent = weekName;
        for (let j = 0; j < links.length; j++) {
            const linkEl = document.createElement('a');
            const link = links[j];
            const url = link.url;
            const title = `${link.title} | `;
            linkEl.setAttribute("href", url);
            linkEl.textContent = title;
            weekList.appendChild(linkEl);
        }
        const element = weekArray[i];
        linkBox.appendChild(weekList);
    }
}