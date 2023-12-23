const playButton = document.getElementById('play');
const startButton = document.getElementById('start');
const reloadButton = document.getElementById('reload');
const closeButton = document.getElementById('close');
const userConsole = document.getElementById('consoleout');

const workArea = document.getElementById('work');
const animArea = document.getElementById('anim');

var square1;
var square2;

let traveldistance = 0;
let moveStep = 1;
let lognumber = 1;
var fastsavefirst = true;

// Initial movement speed and directions
let direction1 = [Math.floor(Math.random() * 3) + 1, 3];
let direction2 = [Math.floor(Math.random() * 3) + 1, 3];

// this function is used to sernd messgae to server, with out localstorage
function fastsave(message) {
	if (fastsavefirst) {
		fastsavefirst = false;
		fetch('servefastsave.php', { method: 'POST' })
			.then(response => response.text())
			.then(data => console.log('Data was cleared from fast save file.'))
			.catch(error => console.error('Error:', error));
	}
	fetch('fastsave.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message)
	})
		.then(response => response.text())
		.then(data => { })
		.catch(error => console.error('Error:', error));
}

function createNewLog(message) {
	let now = new Date();
	let localDateTime = now.toLocaleString();
	var newLog = { key: lognumber, action: message, time: localDateTime };
	console.log(newLog);
	return newLog;
}

function userlog(message) {
	var constempvar = userConsole.textContent;
	var tempstr = `${lognumber}.${message}\n` + constempvar;
	userConsole.textContent = tempstr;

	// Отримання існуючих даних з LocalStorage
	var existingData = localStorage.getItem('userLogs');
	var logs = existingData ? JSON.parse(existingData) : [];

	// Додавання нового запису до масиву
	var newLog = createNewLog(message);
	logs.push(newLog);

	// Зберігання оновленого масиву назад у LocalStorage
	localStorage.setItem('userLogs', JSON.stringify(logs));

	fastsave(newLog);

	lognumber += 1;
}

// Функція для відправки даних на сервер
function onePullSave() {
	const storageData = localStorage.getItem('userLogs');

	fetch('onePullSave.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: storageData
	})
		.then(response => response.text())
		.then(data => {
			console.log(data);
			localStorage.clear(); // Очистити LocalStorage після відправлення
		})
		.catch(error => console.error('Error:', error));
}
function createSquare(id, color) {
    let square = document.getElementById(id);
    if (!square) {
        square = document.createElement('div');
        square.id = id;
        square.style.position = 'absolute';
        square.style.width = '15px';
        square.style.height = '15px';
        square.style.backgroundColor = color;
        animArea.appendChild(square);
    }

    // Встановлення випадкової горизонтальної координати
    const maxX = animArea.clientWidth - 15;
    const startY = id === 'square1' ? 0 : animArea.clientHeight - 30;
    const startX = Math.floor(Math.random() * maxX);
    square.style.left = `${startX}px`;
    square.style.top = `${startY}px`;

    return square;
}

function moveSquare(circle, dx, dy) {
	const currentLeft = parseInt(circle.style.left, 10);
	const currentTop = parseInt(circle.style.top, 10);
	const newLeft = currentLeft + dx;
	const newTop = currentTop + dy;
	var circlecolour = circle.style.backgroundColor;
	// Check for wall collisions
	const rightEdge = animArea.clientWidth - 30;
	const bottomEdge = animArea.clientHeight - 30;

	// If a circle touches a wall, reverse its direction
	if (newLeft < 0 || newLeft > rightEdge) {
		dx = -dx;
		if (circlecolour == 'green') {
			userlog('Green square toched right or left wall.');
		}
		else {
			userlog('Orange square toched right or left wall.');
		}
	}
	if (newTop < 0 || newTop > bottomEdge) {
		dy = -dy;
		if (circlecolour == 'green') {
			userlog('Green square toched top or bottom wall.');
		}
		else {
			userlog('Orange square toched top or bottom wall.');
		}
	}

	circle.style.left = `${newLeft}px`;
	circle.style.top = `${newTop}px`;

	return [dx, dy];
}

// Animation function
function animate() {
	direction1 = moveSquare(square1, ...direction1);
	direction2 = moveSquare(square2, ...direction2);
	traveldistance += 1;
	if (traveldistance % 100 === 0) {
		userlog('Distance squares traveled: ' + traveldistance);
	}
	// Check for collision between circles
	const square1Rect = square1.getBoundingClientRect();
	const square2Rect = square2.getBoundingClientRect();

	if (square1Rect.right > square2Rect.left && square1Rect.left < square2Rect.left &&
		square1Rect.bottom > square2Rect.top && square1Rect.top < square2Rect.bottom) {
		userlog('Collision detected.');
		userlog('Green square is on the left side of Orange square.');
		direction1[0] = -direction1[0]; // Змінюємо горизонтальний напрямок
		direction2[0] = -direction2[0]; // Змінюємо горизонтальний напрямок
	}
	// Перевірка зіткнення справа
	else if (square1Rect.left < square2Rect.right && square1Rect.right > square2Rect.right &&
		square1Rect.bottom > square2Rect.top && square1Rect.top < square2Rect.bottom) {
		userlog('Collision detected.');
		userlog('Green square is on the right side of Orange square.');
		direction1[0] = -direction1[0]; // Змінюємо горизонтальний напрямок
		direction2[0] = -direction2[0]; // Змінюємо горизонтальний напрямок
	}
	// Перевірка зіткнення зверху
	else if (square1Rect.bottom > square2Rect.top && square1Rect.top < square2Rect.top &&
		square1Rect.right > square2Rect.left && square1Rect.left < square2Rect.right) {
		userlog('Collision detected.');
		userlog('Green square is above Orange square.');
		direction1[1] = -direction1[1]; // Змінюємо вертикальний напрямок
		direction2[1] = -direction2[1]; // Змінюємо вертикальний напрямок
	}
	// Перевірка зіткнення знизу
	else if (square1Rect.top < square2Rect.bottom && square1Rect.bottom > square2Rect.bottom &&
		square1Rect.right > square2Rect.left && square1Rect.left < square2Rect.right) {
		userlog('Collision detected.');
		userlog('Green square is below Orange square.');
		direction1[1] = -direction1[1]; // Змінюємо вертикальний напрямок
		direction2[1] = -direction2[1]; // Змінюємо вертикальний напрямок
	}

	const halfHeight = animArea.clientHeight / 2;
	var cricle1top = square1.offsetTop + 15;
	var cricle2top = square2.offsetTop + 15;
	var cricle1bottom = square1.offsetTop - 15;
	var cricle2bottom = square2.offsetTop - 15;
    const bothInTopHalf = cricle1top < halfHeight && cricle2top < halfHeight;
    const bothInBottomHalf = cricle1bottom > halfHeight && cricle2bottom > halfHeight;

    if (bothInTopHalf || bothInBottomHalf) {
		userlog('Both squares are in top half.');
		userlog('squares have treveled ' + traveldistance + ' pixels in total.');
		startButton.disabled = false;
        return;
    }
	else if(bothInBottomHalf){
		userlog('Both squares are in bottom half.');
		userlog('squares have treveled ' + traveldistance + ' pixels in total.');
		startButton.disabled = false;
		return;
	}
	requestAnimationFrame(animate);
}

// Toggle 'work' area
playButton.addEventListener('click', function () {
	workArea.style.display = 'inline';
	startButton.style.display = 'inline';
	closeButton.style.display = 'inline';
	this.style.display = 'none';
	userlog('Play button clicked.');
});

startButton.addEventListener('click', function () {
	this.disabled = true;
	square1 = createSquare('square1', 'green');
	square2 = createSquare('square2', 'orange');
	animate(); // Start the animation
	userlog('Start button clicked.');
});

// reloadButton.addEventListener('click', function () {
//     square1 = createCircle('square1', 'green');
//     square2 = createCircle('square2', 'Orange');
//     this.style.display = 'none';
//     startButton.style.display = 'inline';
//     startButton.disabled = false;
// });

// Close and hide 'work' area
closeButton.addEventListener('click', function () {
	workArea.style.display = 'none';
	playButton.style.display = 'inline';
	this.style.display = 'none';
	onePullSave();
});