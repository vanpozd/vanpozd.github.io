document.addEventListener("DOMContentLoaded", function () {
    // change text blocks 1 n 6
    var block1 = document.getElementById("Block6text");
    var block2 = document.getElementById("Block1text");
    var text1 = block1.textContent;
    var text2 = block2.textContent;
    block1.textContent = text2;
    block2.textContent = text1;

    // right pentagon square
    var sideofpen = 5;
    var height = 4;
    var answer = ((sideofpen * height) / 2) * 5
    var block3penanswer = document.getElementById("pentagsquare");
    block3penanswer.textContent = answer;

    // HTML cont. changer
    const containerList = document.getElementById("containerList");
    const textEditor = document.getElementById("textEditor");
    const saveButton = document.getElementById("saveButton");
    const clearButton = document.getElementById("clearButton");

    containerList.addEventListener("dblclick", (event) => {
        if (event.target.tagName === "LI") {
            // Отримайте індекс контейнера з атрибуту data-container
            const containerIndex = event.target.getAttribute("data-container");
            const selectedContainer = document.getElementById(`Block${containerIndex}text`);

            // Перевірте, чи контейнер містить тільки текстовий вузол
            const isTextContainer = selectedContainer.childNodes.length === 1 &&
                selectedContainer.firstChild.nodeType === Node.TEXT_NODE;

            if (isTextContainer) {
                textEditor.value = selectedContainer.textContent;
                saveButton.addEventListener("click", () => {
                    selectedContainer.textContent = textEditor.value;
                    localStorage.setItem(`Block${containerIndex}text`, textEditor.value);
                });

                clearButton.addEventListener("click", () => {
                    localStorage.removeItem(`Block${containerIndex}text`);
                    const originalText = localStorage.getItem(`Block${containerIndex}text`);
                    selectedContainer.textContent = originalText || "";
                });
            }
        }
    });
});
// check triangle
function checkTriangle() {
    const sideA = parseFloat(document.getElementById("sideA").value);
    const sideB = parseFloat(document.getElementById("sideB").value);
    const sideC = parseFloat(document.getElementById("sideC").value);

    if (sideA + sideB > sideC && sideB + sideC > sideA && sideC + sideA > sideB) {
        alert("Трикутник можливий!");
    } else {
        alert("Трикутник неможливий!");
    }

    const triangleData = {
        sideA,
        sideB,
        sideC
    };
    document.cookie = `triangleData=${JSON.stringify(triangleData)}`;

    document.getElementById("triangleForm").reset();
}

document.getElementById("checkTriangle").addEventListener("click", checkTriangle);

const cookies = document.cookie;
if (cookies.includes("triangleData")) {
    const storedData = JSON.parse(cookies.split("triangleData=")[1].split(";")[0]);
    alert("Збережені дані з cookies: " + JSON.stringify(storedData));
    document.cookie = "triangleData=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

// uppercase changer
const contentBlock = document.getElementById("Block4text");
const uppercaseFirstLettersCheckbox = document.getElementById("uppercaseFirstLettersCheckbox");

function setUppercaseFirstLetters() {
    const text = contentBlock.textContent;
    const words = text.split(" ");
    const modifiedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    contentBlock.textContent = modifiedWords.join(" ");
}

if (localStorage.getItem("uppercaseFirstLetters") === "true") {
    uppercaseFirstLettersCheckbox.checked = true;
    setUppercaseFirstLetters();
}

document.getElementById("saveSettingsButton").addEventListener("click", function () {
    if (uppercaseFirstLettersCheckbox.checked) {
        setUppercaseFirstLetters();
        localStorage.setItem("uppercaseFirstLetters", "true");
    } else {
        contentBlock.textContent = contentBlock.textContent.toLowerCase();
        localStorage.setItem("uppercaseFirstLetters", "false");
    }
    alert("Налаштування збережено!");
});

