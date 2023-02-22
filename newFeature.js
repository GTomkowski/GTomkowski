const submitBtn = document.getElementById("submit-btn")
const addBtn = document.getElementById('add-btn')

const form = document.getElementById("column-1")
const card = document.getElementById("column-2")

const formHidden = localStorage.getItem('formHidden') === 'true';

// wywolana jest metoda getItem na obiekcie local storage
// nastepnie ta metoda pobiera wartosc odpowiadajaca kluczowi 

// strict equality operator w JS porownuje wartosc z boolean true

// jesli ta wartosc jest rowna prawdzie, zwracana jest prawda ktora przypisana jest do zmiennej formHidden

if (formHidden) { // jesli formHidden rowne jest prawdzie, form sie chowa, karta sie pojawia // jesli byloby na odwrot, to 
    form.classList.add('d-none')
    card.classList.remove('d-none')
} else {
    form.classList.remove('d-none')
    card.classList.add('d-none')
    
}

function formToggle() {
    form.classList.toggle('d-none');
    card.classList.toggle('d-none');
    localStorage.setIten('formHidden', form.classList.contains('d-none'))
}

submitBtn.addEventListener('click')