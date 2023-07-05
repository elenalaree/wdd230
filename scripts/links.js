const baseURL = "https://elenalaree.github.io/wdd230/";
const linksURL = "https://elenalaree.github.io/wdd230/data/links.json";

async function getLinks(){
    const resp = await fetch(linksURL);
    const data = await resp.json();
    console.log(data)
}

getLinks();