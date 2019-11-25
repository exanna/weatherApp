const appId = 'a7643e5b5c8f5093e7112ed4af01e38e';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
        searchMethod = 'zip';
    } else searchMethod = 'q';
}

function searchWeatcher(searchTerm) {
    getSearchMethod();
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=metric`)
        .then(result => {
            return result.json();
        })
        .then(result => {
            init(result);
        })
}

function init(resultFromServer) {
    // console.log(resultFromServer);
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("img/clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("img/cloud.jpg")';
            break;
        case 'Rain':
            document.body.style.backgroundImage = 'url("img/rain.jpg")';
            break;
        case 'Drizzle':
            document.body.style.backgroundImage = 'url("img/rain.jpg")';
            break;
        case 'Mist':
            document.body.style.backgroundImage = 'url("img/rain.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("img/storm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("img/snow.jpg")';
            break;
        default:
            break;
    }

    const weatherDescription = document.querySelector('.description');
    const temp = document.querySelector('.temp');
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');
    const city = document.querySelector('.city');
    const weatherIcon = document.querySelector('#documentIconImg')

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';
    const resultDesc = resultFromServer.weather[0].description;
    weatherDescription.innerText = resultDesc.charAt(0).toUpperCase() + resultDesc.slice(1);
    temp.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176' + 'C';
    wind.innerHTML = 'Wind: ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    city.innerHTML = resultFromServer.name;
    humidity.innerHTML = 'Humidity levels at: ' + resultFromServer.main.humidity + '%';
}

const searchBtn = document.querySelector('.searchBtn');
searchBtn.addEventListener('click', () => {
    document.querySelector(".weatcherWrapper").style.display = 'block';
    const searchTerm = document.querySelector('.searchInput').value;
    if (searchTerm) {
        searchWeatcher(searchTerm);
    } else console.log('nie działa!');
})