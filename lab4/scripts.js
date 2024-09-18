	// Task 1
	let schoolelem = document.getElementById("schoolparagraph");
	let hobbyelem = document.querySelector("h3.hobbycaption");

	schoolelem.addEventListener("click", function () {
		let randomColorBack = getRandomColor();
		let randomColor = getRandomColor();
		schoolelem.style.backgroundColor = randomColorBack;
		schoolelem.style.color = randomColor;
	});

	hobbyelem.addEventListener("click", function () {
		let randomColorBack = getRandomColor();
		let randomColor = getRandomColor();
		hobbyelem.style.backgroundColor = randomColorBack;
		hobbyelem.style.color = randomColor;
	});

	function getRandomColor() {
		let letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	// Task 2
	let addbutton = document.getElementById("addbutton");
	let zoominbutton = document.getElementById("zoominbutton");
	let zoomoutbutton = document.getElementById("zoomoutbutton");
	let deletebutton = document.getElementById("deletebutton");

	let img = document.querySelector("img.kyivimg");

	addbutton.addEventListener("click", function () {
		let newarea = document.createElement("area");
		newarea.setAttribute("shape", "rect");
		newarea.setAttribute("coords", "0,0,1080,600");
		newarea.setAttribute("href", "https://kyivcity.gov.ua/");
		newarea.setAttribute("alt", "Kyiv site");
		document.querySelector("map[name='imagemap']").appendChild(newarea);
		img.width = 1080;
		img.height = 600;
	});

	zoominbutton.addEventListener("click", function () {
		img.width += 100;
		img.height += 100;
	});

	zoomoutbutton.addEventListener("click", function () {
		img.width -= 100;
		img.height -= 100;
	});

	deletebutton.addEventListener("click", function () {
		let lastarea = document.querySelector("map[name='imagemap'] area:last-child");
		img.width = 0;
		img.height = 0;
		lastarea.remove();
	});