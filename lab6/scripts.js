let userscont = document.getElementById('userscont');
let getdatabut = document.getElementById('getdata');
var body = document.querySelector('body');

getdatabut.addEventListener('click', () => {
    userscont.style.display = 'block';
        fetch('https://randomuser.me/api')
        .then(response => response.json())
        .then(data => {
            let user = data.results[0];
            let usercont = document.createElement('div');
            usercont.className = 'userinfocont';
            usercont.innerHTML = `
                <img src="${user.picture.large}" alt="User image">
                <span class="username">${user.name.first} ${user.name.last}</span>
                <span class="useremail">${user.email}</span>
                <span class="usercity">${user.location.city}</span>
                <span class="userpostmail">${user.location.postcode}</span>
            `;
            document.querySelector('#userscont').appendChild(usercont);
        });
});