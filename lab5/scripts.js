const sendbutton = document.getElementById('sendbutton');
const data = document.getElementById('data');
const name = document.getElementById('name');
const tel = document.getElementById('tel');
const idcard = document.getElementById('idcard');
const birth = document.getElementById('birth');
const email = document.getElementById('email');

document.addEventListener('DOMContentLoaded', () => {
    if ((localStorage.getItem('name') !== null) || (localStorage.getItem('tel') !== null) || (localStorage.getItem('idcard') !== null) || (localStorage.getItem('birth') !== null) || (localStorage.getItem('email') !== null)) {
        data.innerHTML = `ПІБ: ${localStorage.getItem('name')} <br> Телефон: ${localStorage.getItem('tel')} <br> ID-card: ${localStorage.getItem('idcard')} <br> Дата народження: ${localStorage.getItem('birth')} <br> Електронна пошта: ${localStorage.getItem('email')}`;
    }
    else {
        data.innerHTML = 'Дані відсутні';
    }
});

sendbutton.addEventListener('click', () => {
    if (/.+ .\..\.$/.test(name.value)) {
        localStorage.setItem('name', name.value);
    } else {
        alert('Некоректно введене ПІБ');
    }
    if (/\d{10}$/.test(tel.value)) {
        localStorage.setItem('tel', tel.value);
    } else {
        alert('Некоректно введений телефон');
    }
    if (/[A-Za-z]{2}[0-9]{6}$/.test(idcard.value)) {
        localStorage.setItem('idcard', idcard.value);
    } else {
        alert('Некоректно введений ID-card');
    }
    if (birth.value === '') {
        alert('Введіть дату народження');
    } else {
        localStorage.setItem('birth', birth.value);
    }
    if (/^[a-z0-9_%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email.value)) {
        localStorage.setItem('email', email.value);
    } else {
        alert('Некоректно введена електронна пошта');
    }
});