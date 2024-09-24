

var homePage = document.querySelector(".first-page");
var mapPage = document.querySelector(".second-page");
var carPage = document.querySelector(".third-page");
var setPage = document.querySelector(".set-page");
var record1 = document.querySelector(".rec1");
var record2 = document.querySelector(".rec2");
var record3 = document.querySelector(".rec3");
var record4 = document.querySelector(".rec4");
var record5 = document.querySelector(".rec5");
var record6 = document.querySelector(".rec6");
var record7 = document.querySelector(".rec7");
var record8 = document.querySelector(".rec8");
let secondss = 0;

var cameraPage = document.querySelector(".sixth-page")
// var homePage = document.getElementsByClassName("bottom-menu")
// var homePage = document.getElementsByClassName("bottom-menu")
var setInt = setInterval(() => {
    record1.style.backgroundColor = "transparent";
    record2.style.backgroundColor = "transparent";
    record3.style.backgroundColor = "transparent";
    record4.style.backgroundColor = "transparent";
    record5.style.backgroundColor = "transparent";
    record6.style.backgroundColor = "transparent";
    record7.style.backgroundColor = "transparent";
    record8.style.backgroundColor = "transparent";

    secondss = secondss +1;
    
    if (secondss%2 != 0) {
        record1.style.backgroundColor = "red"
        record2.style.backgroundColor = "red"
        record3.style.backgroundColor = "red"
        record4.style.backgroundColor = "red"
        record5.style.backgroundColor = "red"
        record6.style.backgroundColor = "red"
        record7.style.backgroundColor = "red"
        record8.style.backgroundColor = "red"
    }
}, 500);


function showHomePage(){
    homePage.style.display = "block";
    mapPage.style.display = "none";
    carPage.style.display = "none";
    cameraPage.style.display = "none";
    setPage.style.display = "none";
}

function showMapPage(){
    homePage.style.display = "none";
    mapPage.style.display = "block";
    carPage.style.display = "none";
    cameraPage.style.display = "none";
    setPage.style.display = "none";
}

function showCarPage(){
    homePage.style.display = "none";
    mapPage.style.display = "none";
    carPage.style.display = "block";
    cameraPage.style.display = "none";
    setPage.style.display = "none";
}
function showCamPage(){
    homePage.style.display = "none";
    mapPage.style.display = "none";
    carPage.style.display = "none";
    cameraPage.style.display = "flex";
    setPage.style.display = "none";
}

function showSetPage(){
    homePage.style.display = "none";
    mapPage.style.display = "none";
    carPage.style.display = "none";
    cameraPage.style.display = "none";
    setPage.style.display = "flex";
}
// const ws = new WebSocket('ws://example.com/realtime-speed'); // Replace with your WebSocket URL

// // Initialize variables
// let currentSpeed = 0;
// let odometerReading = 0;

// // Function to update speedometer display
// function updateSpeedometer(speed) {
//     const speedElement = document.getElementById('speed');
//     const odometerElement = document.getElementById('odometer');
//     const fuelElement = document.getElementById('fuel');
    
//     // Update speed and odometer
//     currentSpeed = speed;
//     odometerReading += currentSpeed / 3600; // Assuming updates every second, divide by 3600 to convert to hours

//     // Update the DOM elements
//     speedElement.textContent = currentSpeed;
//     odometerElement.textContent = String(odometerReading.toFixed(0)).padStart(6, '0');
//     fuelElement.textContent = getFuelGauge();
// // }

// // // Function to simulate fuel gauge (for demo purposes)
// // function getFuelGauge() {
// //     return 'E' + ' '.repeat(Math.floor(Math.random() * 10)) + 'F';
// // }

// // Handle incoming WebSocket messages
// // ws.onmessage = function(event) {
// //     const data = JSON.parse(event.data);
// //     if (data.speed) {
// //         updateSpeedometer(data.speed);
// //     }
// // };

// // Handle WebSocket errors
// ws.onerror = function(error) {
//     console.error('WebSocket Error:', error);
// };

// // Handle WebSocket connection open
// ws.onopen = function() {
//     console.log('WebSocket connection established');
// };

// // Handle WebSocket connection close
// ws.onclose = function() {
//     console.log('WebSocket connection closed');
// };
const ws = new WebSocket('ws://example.com/realtime-speed'); // Replace with your WebSocket URL

// Function to update the speed display
function updateSpeedDisplay(speed) {
    const speedDisplay = document.getElementById('speedDisplay');
    speedDisplay.textContent = speed;
}

// Handle incoming WebSocket messages
ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.speed !== undefined) {
        updateSpeedDisplay(data.speed);
    }
};

// Handle WebSocket errors
ws.onerror = function(error) {
    console.error('WebSocket Error:', error);
};

// Handle WebSocket connection open
ws.onopen = function() {
    console.log('WebSocket connection established');
};

// Handle WebSocket connection close
ws.onclose = function() {
    console.log('WebSocket connection closed');
};

// Simulate incoming data for demonstration (remove in production)
setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
        ws.onmessage({ data: JSON.stringify({ speed: Math.floor(Math.random() * 100) }) });
    }
}, 1000);


let lastPosition = null;
const maxSpeed = 20;  // Maximum speed in km/h

// Function to update the speedometer
function updateSpeed(newSpeed) {
    const speedometerFill = document.getElementById('speedometer-fill');
    const speedometerNeedle = document.getElementById('speedometer-needle');
    const speedometerLabel = document.getElementById('speedometer-label');
    const currentSpeed = document.getElementById('current-speed');
    
    const percentage = (newSpeed / maxSpeed) * 100;
    const rotation = (percentage * 180 / 100) - 90;  // Convert percentage to degrees for rotation
    const dashOffset = (1130 - (1130 * percentage / 100));  // Convert percentage to stroke-dashoffset
    
    // Update the fill and needle
    speedometerFill.style.strokeDashoffset = dashOffset;
    speedometerNeedle.style.transform = `rotate(${rotation}deg)`;
    speedometerLabel.textContent = Math.round(newSpeed);
    currentSpeed.textContent = Math.round(newSpeed);
}

// Function to calculate speed from geolocation data
function calculateSpeed(position) {
    if (lastPosition) {
        const lat1 = lastPosition.coords.latitude;
        const lon1 = lastPosition.coords.longitude;
        const lat2 = position.coords.latitude;
        const lon2 = position.coords.longitude;
        
        const R = 6371;  // Radius of the Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;  // Distance in km
        
        const timeDiff = (position.timestamp - lastPosition.timestamp) / 1000;  // Time difference in seconds
        const speed = (distance / (timeDiff / 3600));  // Speed in km/h
        
        updateSpeed(speed);
    }
    lastPosition = position;
}

// Function to handle geolocation errors
function handleGeolocationError(error) {
    console.error('Geolocation error:', error);
}

// Function to start getting real-time geolocation data
function startGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => calculateSpeed(position),
            handleGeolocationError,
            { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Initial setup
updateSpeed(0);  // Start with a speed of 0 km/h
startGeolocation();
// Function to update battery percentage display



// let weatherCondition = document.querySelector(".weather-condition");
// let weatherLocation = document.querySelector(".weather-location");
// let weatherHumidity = document.querySelector(".weather-humidity");
// let weatherWind = document.querySelector(".weather-wind");


// function api(){
    
//     fetch('https://api.weatherapi.com/v1/current.json?key=46de42fa554249918e841524240108&q=Poonamallee')
//     .then(res => res.json())
//     // .then(data => console.log(data.current.condition.text))
//     .then(data => weatherCondition.innerText = data.current.condition.text)
   
//    }
// api()
// function api2(){
//     fetch('https://api.weatherapi.com/v1/current.json?key=46de42fa554249918e841524240108&q=Poonamallee')
//     .then(res => res.json())
//     .then(data => body.innerText += data.location.name)
//    }
// api2()
// function api3(){
//     fetch('https://api.weatherapi.com/v1/current.json?key=46de42fa554249918e841524240108&q=Poonamallee')
//     .then(res => res.json())
//     .then(data => body.innerText += data.current.humidity)
//    }
// api3()
// function api4(){
//     fetch('https://api.weatherapi.com/v1/current.json?key=46de42fa554249918e841524240108&q=Poonamallee')
//     .then(res => res.json())
//     .then(data => body.innerText += data.current.wind_kph)
    
//    }
// api4()


// let weather = document.querySelector(".temp");
// function api(){
    
//         fetch('https://api.weatherapi.com/v1/current.json?key=46de42fa554249918e841524240108&q=Poonamallee')
//         .then(res => res.json())
//         // .then(data => console.log(data.current.condition.text))
//         .then(data => weather.innerText = `<h4>23°C</h4>
//             <p style="margin-left: 80px; color: darkgrey; margin-top: 5px;" class="weather-condition">${data.current.condition.text}</p>
//             <p style="margin-left: 80px; color: white; margin-top: 25px;" class="weather-location">${data.location.name}</p>
//             <h6 style="margin-left: 25px; color: white; margin-top: 75px;" class="weather-humidity">${data.current.humidity}%</h6>
//             <p style="margin-left: 10px; color: darkgrey; margin-top: 95px;">Humidity</p>
//             <p style="margin-left: 165px; color: darkgrey; margin-top: 95px;">Wind</p>
//             <h6 style="margin-left: 150px; color: white; margin-top: 75px;" class="weather-wind">${data.current.wind_kph} km//h</h6>
//             <img src="Screenshot (151).png" alt="bluemoon">`)
       
//        }
//     api()

function formatDateTime(date) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Function to update the date and time display
function updateDateTime() {
    const dateTimeElement = document.getElementById('dateTime');
    const now = new Date();
    dateTimeElement.textContent = formatDateTime(now);
}

// Update the date and time every second
setInterval(updateDateTime, 1000);

// Initial call to set the date and time immediately on page load
updateDateTime();

document.addEventListener("DOMContentLoaded", function() {
    const solarOutputElement = document.getElementById("solarOutput");
    const batteryLevelElement = document.getElementById("batteryLevel");
    const energyConsumptionElement = document.getElementById("energyConsumption");
    const estimatedRangeElement = document.getElementById("estimatedRange");

    let batteryCapacity = 50.0; // kWh
    const rangePerKwh = 4.0; // miles per kWh

    async function fetchData() {
        try {
            // Replace this URL with your actual API endpoint
            const response = await fetch('https://api.yoursolarvehicle.com/realtime-data');
            const data = await response.json();

            // Extracting values from API response
            const solarOutput = parseFloat(data.solarPanelOutput).toFixed(2);
            const energyConsumption = parseFloat(data.energyConsumption).toFixed(2);
            const batteryLevel = parseFloat(data.batteryLevel).toFixed(2);
            const estimatedRange = (batteryLevel * rangePerKwh).toFixed(2);

            // Update the DOM elements
            solarOutputElement.textContent = solarOutput;
            batteryLevelElement.textContent = batteryLevel;
            energyConsumptionElement.textContent = energyConsumption;
            estimatedRangeElement.textContent = estimatedRange;
        } catch (error) {
            console.error("Error fetching real-time data:", error);
            solarOutputElement.textContent = "Error";
            batteryLevelElement.textContent = "Error";
            energyConsumptionElement.textContent = "Error";
            estimatedRangeElement.textContent = "Error";
        }
    }

    // Fetch data every 5 seconds
    setInterval(fetchData, 5000);

    // Initial fetch
    fetchData();
});
let totalDistanceKm = 0.0; // Total distance traveled in kilometers
let tripDistanceKm = 0.0; // Distance traveled during the current trip in kilometers
let previousPosition = null; // To store the previous position
let tripActive = false; // Whether the trip is currently active

const totalOdometerDisplay = document.getElementById('total-odometer');
const tripOdometerDisplay = document.getElementById('trip-odometer');
const startStopButton = document.getElementById('start-stop-btn');
const resetButton = document.getElementById('reset-btn');
const unitRadios = document.querySelectorAll('input[name="unit"]');

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
}

function convertToMiles(km) {
    return km * 0.621371;
}

function updateOdometer(position) {
    const { latitude, longitude } = position.coords;

    if (previousPosition) {
        const distanceKm = calculateDistance(
            previousPosition.latitude, 
            previousPosition.longitude, 
            latitude, 
            longitude
        );

        if (tripActive) {
            tripDistanceKm += distanceKm;
            totalDistanceKm += distanceKm;
            const unit = document.querySelector('input[name="unit"]:checked').value;
            const tripDistance = unit === 'km' ? tripDistanceKm : convertToMiles(tripDistanceKm);
            const totalDistance = unit === 'km' ? totalDistanceKm : convertToMiles(totalDistanceKm);

            tripOdometerDisplay.innerText = tripDistance.toFixed(2).padStart(8, '0');
            totalOdometerDisplay.innerText = totalDistance.toFixed(2).padStart(8, '0');
        }
    }

    previousPosition = { latitude, longitude };
}

function handleError(error) {
    console.error(`Error: ${error.message}`);
    tripOdometerDisplay.innerText = "------";
    totalOdometerDisplay.innerText = "------";
}

function toggleTrip() {
    tripActive = !tripActive;
    if (tripActive) {
        tripDistanceKm = 0.0; // Reset trip distance when starting a new trip
        startStopButton.innerText = "Stop Trip";
    } else {
        startStopButton.innerText = "Start Trip";
    }
}

function resetTrip() {
    tripDistanceKm = 0.0; // Reset the trip distance to zero
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const tripDistance = unit === 'km' ? tripDistanceKm : convertToMiles(tripDistanceKm);
    tripOdometerDisplay.innerText = tripDistance.toFixed(2).padStart(8, '0');
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateOdometer, handleError, {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000
    });
} else {
    tripOdometerDisplay.innerText = "------";
    totalOdometerDisplay.innerText = "------";
}

startStopButton.addEventListener('click', toggleTrip);
resetButton.addEventListener('click', resetTrip);
unitRadios.forEach(radio => radio.addEventListener('change', () => {
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const tripDistance = unit === 'km' ? tripDistanceKm : convertToMiles(tripDistanceKm);
    const totalDistance = unit === 'km' ? totalDistanceKm : convertToMiles(totalDistanceKm);
    
    tripOdometerDisplay.innerText = tripDistance.toFixed(2).padStart(8, '0');
    totalOdometerDisplay.innerText = totalDistance.toFixed(2).padStart(8, '0');
}));