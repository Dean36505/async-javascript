const wo2 = {
    'namelocation': "Los Angeles",
    'countryCode': "US",
    'description': "Sunny",
    'temperature': "28.5",
    'feelsLike': "100",
    'windspeed': "0",
    'humidity': "50"
}

API_KEY = "90fda2032fa98b1cd03beecc0c980777";

async function getCurrentWeather(lat, lon){
    try{
        const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const weatherData = await respone.json();
        return weatherData;

    } catch{}
}

async function getCoordinates(name){
    try{
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`, {mode: "cars"});
        const data = await response.json();
        const latLon = {
            lat: data[0].lat,
            lon: data[0].lon,
        }
        return latLon;
        console.log(data[0].lat);
        console.log(data[0].lon);
       
    } catch{}
}

async function weather(name) {
    try {
        const coordinates = getCoordinates(name);
        const data = await getCurrentWeather((await coordinates).lat, (await coordinates).lon);
        
        const namelocation = data.name;
        const countryCode = data.sys .country;
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;
        const windspeed = data.wind.speed;
        const humidity = data.main.humidity;

        return {
            namelocation,
            countryCode,
            description,
            temperature,
            feelsLike,
            windspeed,
            humidity
        }
        console.log(data);
    } catch {
        return "error"
    }
}

weather("London")

const renderWeatherComponent = (weatherObj) => {
    
    const main = document.createElement("main");
    document.querySelector("body").appendChild(main);

    const locationName = document.createElement("h1");
    locationName.id = "location";
    locationName.textContent = `${weatherObj.namelocation}, ${weatherObj.countryCode}`;
    main.appendChild(locationName);

    const description = document.createElement("h2");
    description.id = "description";
    description.textContent = `${weatherObj.description}`;
    main.appendChild(description);

    const bottomContainer = document.createElement("div");
    bottomContainer.id = "bottomContainer";
    main.appendChild(bottomContainer);

    const leftSide = document.createElement("div");
    leftSide.id = "leftSide";
    bottomContainer.appendChild(leftSide);

    const temperature = document.createElement("h2");
    temperature.id = "temperature";
    temperature.textContent = `${weatherObj.temperature}`;
    leftSide.appendChild(temperature);

    const units = document.createElement("h4");
    units.id = "units";
    units.textContent = "K";
    leftSide.appendChild(units);

    const rightSide = document.createElement("div");
    rightSide.id = "rightSide";
    bottomContainer.appendChild(rightSide);

    const feelsLike = document.createElement("p");
    feelsLike.id = "feelsLike";
    feelsLike.textContent = `Feels like: ${weatherObj.feelsLike} K`;
    rightSide.appendChild(feelsLike);

    const windspeed = document.createElement("p");
    windspeed.id = "wind";
    windspeed.textContent = `Wind: ${weatherObj.windspeed}`;
    rightSide.appendChild(windspeed);

    const humidity = document.createElement("p");
    humidity.id = "humidity";
    humidity.textContent = `Humidity: ${weatherObj.humidity}%`;
    rightSide.appendChild(humidity);
}


async function renderer(weatherObject, first = false){

    const weatherData = await weatherObject;

    if (first == true){
        renderWeatherComponent(weatherData);
    } else {
        document.querySelector("main").remove();
        document.querySelector("input").valut == "";
        renderWeatherComponent(weatherData);
    }
}

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    renderer(weather(document.querySelector("input").value));
})


renderer(weather("lyon"), true)
