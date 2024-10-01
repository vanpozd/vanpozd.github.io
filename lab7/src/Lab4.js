import React from 'react';
import App from './App';

function Lab4() {
    return (
        <div>
            <h2>Поздняков Іван Андрійович</h2>
            <h3>Освіта:</h3>
            <p>Народився у місті Донецьк.</p>
            <p>Дата народження: 14.02.2005</p>
            <p id="schoolparagraph">Навчався у школі №3 "Сузірʼя", після чого останні 3 класи закінчував у технічному ліцеї НТУУ
                "КПІ" імені Ігоря
                Сікорського.</p>
            <div>
                <h3 class="hobbycaption">Хоббі:</h3>
                <ul>
                    <li>Спорт</li>
                    <li>Проектування та збирання РЕА</li>
                    <li>Компʼютерні ігри</li>
                </ul>
            </div>
            <div>
                <h3>Улюблені фільми:</h3>
                <ol>
                    <li>Острів проклятих</li>
                    <li>Месники: Війна нескінченності</li>
                    <li>Початок</li>
                </ol>
            </div>
            <h3>Київ</h3>
            <map name="imagemap">
                <area shape="rect" coords="0,0,1080,600" href="https://kyivcity.gov.ua/" alt="Kyiv site"></area>
            </map>
            <img src="kyivimg.png" alt="Kyiv image" class="kyivimg" width="1080" height="600" usemap="#imagemap"></img>
            <div class="buttonscont">
                <button id="addbutton">Додати</button>
                <button id="zoominbutton">Збільшити</button>
                <button id="zoomoutbutton">Зменшити</button>
                <button id="deletebutton">Видалити</button>
            </div>
            <a href=''>Завдання 2</a>
        </div>
    );
}

export default Header;
