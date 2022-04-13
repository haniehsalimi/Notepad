//variable

const btn = document.querySelector("#search-btn")
const input = document.querySelector("#note")
const inputvalue = document.querySelector("#note").value
const list = document.querySelector('#list');
document.querySelector(".d-flex2").addEventListener('click', removeNote);


//addeventlistener


btn.addEventListener("click", show)
document.addEventListener('DOMContentLoaded', localStorageOnload)

//functions

function show(e) {

    e.preventDefault()
    const txt = input.value;
    if (txt === "") {
        alert("you must write something");
    } else {
        var li = document.createElement("li");
        li.textContent = txt;
        list.appendChild(li);
        input.value = "";
    }

    const removebtn = document.createElement("a");
    removebtn.classList = 'remove';
    removebtn.textContent = "X";
    li.appendChild(removebtn);
    savetols(txt);

}


function savetols(note) {
    let notes = gettols();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes))

}

function gettols() {
    let notes;
    let getFromLS = localStorage.getItem('notes');
    if (getFromLS === null) {
        notes = []
    } else {
        notes = JSON.parse(getFromLS)
    }

    return notes
}

function removeNote(e) {
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove()
    }
    removetols(e.target.parentElement.textContent)


    function removetols(noteContent) {
        let notedelete = noteContent.substring(0, noteContent.length - 1)
        let notefromls = gettols()
        notefromls.forEach(function(note, index) {
            if (note === notedelete) {
                notefromls.splice(index, 1)
            }
        })
        localStorage.setItem('notes', JSON.stringify(notefromls))
    }

}


function localStorageOnload() {
    let notes = gettols();
    notes.forEach(function(note) {
        let removebtn = document.createElement("a");
        removebtn.textContent = "X";
        removebtn.classList = 'remove';
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(note))
        li.appendChild(removebtn);
        list.appendChild(li);

    })
}