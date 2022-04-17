let ipAddress = document.querySelector(".ip-address span");
let locationInfo = document.querySelector(".location span");
let timeZone = document.querySelector(".timezone span");
let isp = document.querySelector(".isp span");
let search = document.querySelector(".search");
let inputFeld = document.querySelector("#ip-input");

// geting the user ip
get();
async function get(){
    const respone = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_6zfSjpjTfdy3I0odn14VoLKYN5Yaw`);
    const data = await respone.json();
    toPage(data);
}


// Adding ip information to the page
function toPage(data){
    ipAddress.innerHTML = data.ip;
    locationInfo.innerHTML = `${data.location.city}, ${data.location.country}`;
    timeZone.innerHTML = `UTC ${data.location.timezone}`;
    isp.innerHTML = data.isp;
    getMap(data.location.lat,data.location.lng);
}


// calling the map 
function getMap(a,b){
    var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }
    var map = L.map('map').setView([a,b], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([a,b]).addTo(map)
}

// Event listener for the search
search.addEventListener("click",function(){
    if(inputFeld.value != ""){
        getFromInput(inputFeld.value)
    }
})


// geting information for specific 
async function getFromInput(ip){
    const respone = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_6zfSjpjTfdy3I0odn14VoLKYN5Yaw&ipAddress=${ip}`);
    const data = await respone.json();
    if(data.messages){
        inputFeld.value = "";
        inputFeld.placeholder = `please ${data.messages}`;
        inputFeld.classList.add("active");
    }else{
        toPage(data);
        inputFeld.value = "";
        inputFeld.placeholder = "Search for any IP address or domain";
        inputFeld.classList.remove("active");
    }
}