const submitBtn = document.getElementById("submit-btn")
const addBtn = document.getElementById('add-btn')

const form = document.getElementById("column-1")
const card = document.getElementById("column-2")

const formHidden = localStorage.getItem('formHidden') === 'true';

if (formHidden) {
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