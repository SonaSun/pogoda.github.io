
let getDayContainer = () => {
    let containerBig = document.querySelector('.container-big');
    let line_head = ' ';
    for(let i = 0; i < 5; i++) {
        let out_cell = ' ';
        for(let i = 0; i < 6; i++) {
            out_cell += '<div class="cell"></div>'
        }
        line_head += `<div class="day-container"><div class="weather-item-line">${out_cell}</div></div>`;
        containerBig.innerHTML = line_head;
    }
}
getDayContainer();


let getWeekDaysboxes = () => {
    let weekDaysContainer = document.createElement("div");
    document.querySelector('.container-big').prepend(weekDaysContainer);
    weekDaysContainer.className = 'weekday';
    for(let i =0; i < 5; i++) {
        let weekDay = document.createElement("div");
        weekDaysContainer.appendChild(weekDay);
    }
    let weekdays = document.querySelector('.weekday').children;
    let date = new Date();
    let days = ['Воскреенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    for(let i = 0; i < 5; i++) {
        weekdays[i].innerHTML = days[date.getDay() + i];
    }
    weekdays[0].innerHTML = 'Сегодня';
}
getWeekDaysboxes();


let lineHeadName = () => {
    let weatherItemLine = document.querySelectorAll('.weather-item-line');
    for(let i = 0; i < weatherItemLine.length; i++) {
        weatherItemLine[i].children[2].innerHTML = 'Температура';
        weatherItemLine[i].children[3].innerHTML = 'Влажность';
        weatherItemLine[i].children[4].innerHTML = 'Скорость ветра';
        weatherItemLine[i].children[5].innerHTML = 'Атмосферное давление';
    }
}
lineHeadName();

let getDayStructure = () => {
    let out_line = ' ';

    for(let i = 0; i < 8; i++) {
        let out_cell = ' ';
        for(let i = 0; i < 6; i++) {
            out_cell += '<div class="cell"></div>'
        }
        out_line += `<div class="line">${out_cell}</div>`;
    }
    let day = document.querySelectorAll('.day-container');
    for(let i = 0; i < day.length; i++) {
        day[i].innerHTML += out_line;
    }
}
getDayStructure();


let times = ['00', '03', '06', '09', '12', '15', '18', '21'];

let todayTimes = [];

let todayForecastTimes = () => {
    let hours = new Date().getHours();
    let indexes = [];
    for(let i = 0; i < times.length; i++) {
        if(times[i] >= hours) {
            indexes.push(i);
            todayTimes.push(times[i]);
        }
    }
    if(times[indexes[0]] != hours && hours < 21) {
        todayTimes.unshift(times[indexes[0]-1]);
    }
    if(hours > 21) {
        todayTimes.push('21');
    }

}
todayForecastTimes();


let getForecast = () => {
    let day = document.querySelectorAll('.day-container');
    let line = document.querySelectorAll('.line');

    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${localStorage.getItem('cityCode')}&appid=87baafad9a4fb7eed5550969f5ab2bd3`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
                for(let i = 0; i < todayTimes.length; i++) {
                    line[i].children[0].innerHTML = `${todayTimes[i]}:00`;
                    line[i].children[1].innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0]['icon']}@2x.png" width="50" height="50">`;
                    line[i].children[2].innerHTML = Math.round(data.list[i].main.temp - 273.15) + '&degC';
                    line[i].children[3].innerHTML = data.list[i].main.humidity + ' %';
                    line[i].children[4].innerHTML = data.list[i].wind.speed + ' м/с';
                    line[i].children[5].innerHTML = data.list[i].main.pressure + ' гПа';
                }


                let t = 0;
                for(let i = 1; i < day.length; i++) {
                    let k = 1;
                    for(let j = todayTimes.length; j < (todayTimes.length + 8); j++) {
                        let dayChildren = day[i].children[k];

                        dayChildren.children[0].innerHTML = `${times[j-todayTimes.length]}:00`;
                        dayChildren.children[1].innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[j+t].weather[0]['icon']}@2x.png" width="50" height="50">`;
                        dayChildren.children[2].innerHTML = Math.round(data.list[j+t].main.temp - 273.15) + '&degC';
                        dayChildren.children[3].innerHTML = data.list[j+t].main.humidity + ' %';
                        dayChildren.children[4].innerHTML = data.list[j+t].wind.speed + ' м/с';
                        dayChildren.children[5].innerHTML = data.list[j+t].main.pressure + ' гПа';
                        k++;
                    }
                    t += 8;
                }

        });
}

getForecast();