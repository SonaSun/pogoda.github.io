let selCountry = document.querySelector('select[name=country]');
let selCity = document.querySelector('select[name=city]');

let cityCode;
let cntv = list[selCountry.value];

let cityOptionInit = () => {
    if (localStorage.getItem('cityCode')) {
        cityCode = localStorage.getItem('cityCode');
        let cv = localStorage.getItem('cv');
        cntv = list[cv];
        selCountry.value = cv;
        for (let key in cntv) {
            selCity.innerHTML += `<option value="${cntv[key]}">${key}</option>`;
        }
        selCity.value = cityCode;
    }
    else {
        cv = selCountry.value;
        localStorage.setItem('cv', cv);
        for (let key in cntv) {
            selCity.innerHTML += `<option value="${cntv[key]}">${key}</option>`;
        }
        cityCode = selCity.value;
    }
}
cityOptionInit();

selCountry.onchange = () => {
    selCity.innerHTML = ' ';
    cntv = list[selCountry.value];
    for (let key in cntv) {
        selCity.innerHTML += `<option value="${cntv[key]}">${key}</option>`;
    }
    cityCode = selCity.value;
    cv = selCountry.value;
    localStorage.setItem('cv', cv);
    getCurrentWeather();
}

selCity.onchange = () => {
    cityCode = selCity.value;
    getCurrentWeather();
}

let getCurrentWeather = () => {
    localStorage.setItem('cityCode', cityCode);
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=87baafad9a4fb7eed5550969f5ab2bd3`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            document.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" width="50" height="50">`;
            document.querySelector('.temp').innerHTML = `Температура: ${Math.round(data.main.temp - 273.15)}&degC`;
            document.querySelector('.humidity').textContent = `Влажность: ${data.main.humidity} %`;
            document.querySelector('.wind').textContent = `Скорость ветра: ${data.wind.speed} м/с`;
            document.querySelector('.pressure').textContent = `Атмосферное давление: ${data.main.pressure} гПа`;
        });
}

window.onload = getCurrentWeather();