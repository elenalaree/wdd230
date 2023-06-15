const input = document.getElementById("favchap");
const button = document.querySelector('button');
const list = document.getElementById("list");


button.addEventListener('click', () => {
    if (input.value != '') {
        const li = document.createElement('li');
        const yeet = document.createElement('button');
        li.textContent = input.value;
        yeet.textContent = 'X'
        li.append(yeet);
        list.append(li);
        yeet.addEventListener('click', () => {
            list.removeChild(li);
            input.focus();
        })
        input.focus();
        input.value = '';
    }
    else {
        return 'Please type a book and chapter number.'
    }
});


