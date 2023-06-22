const input = document.getElementById("favchap");
const button = document.querySelector('button');
const list = document.getElementById("list");
const chapterArray = getChapterList() || [];
chapterArray.forEach(chapter => {
    displayList(chapter)
});


button.addEventListener('click', () => {
    if (input.value != '') {
        displayList(input.value);
        chapterArray.push(input.value);
        setChapterList();
        input.value = '';
        input.focus();


    }
    else {
        return 'Please type a book and chapter number.'
    }
});

function displayList(item){
        const li = document.createElement('li');
        const yeet = document.createElement('button');
        li.textContent = item;
        yeet.textContent = 'X';
        yeet.classList.add('delete');
        li.append(yeet);
        list.append(li);
        yeet.addEventListener('click', () => {
            list.removeChild(li);
            yeetChapter(li.textContent);
            input.focus();
        })
};

function setChapterList(){
    localStorage.setItem('myFavList', JSON.stringify(chapterArray));
};


function getChapterList(){
    return JSON.parse(localStorage.getItem('myFavList'));
}

function yeetChapter(){
    chapter = chapter.slice(0, chapter.length - 1);
    chapterArray = chapterArray.filter((item) => item !== chapter);
    setChapterList();
}






