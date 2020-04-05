//DOM elementsc
const time = document.getElementById('time'),
greeting = document.getElementById('greetings'),
name = document.getElementById('name'),
focus = document.getElementById('focus'),
history = document.getElementById('history'),
footer = document.getElementById('footer'),
weatherPage = document.getElementById('weather'),
news = document.getElementById('news')


//Show time
function showTime(){

    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec= today.getSeconds();
    if (localStorage.getItem('hour') == null ) {
      localStorage.setItem('hour', "-1");
    }
    // set AM or PM

    const amPm = hour >= 12 ?  'PM' : 'AM' ;

    //12 hour
    hour = hour % 12 || 12 ;

    //output time
    time.innerHTML = `${hour}<span>:<span>${addZero(min)}<span>:<span>${addZero(sec)}<span><span>${amPm}`;
    setTimeout(showTime, 1000);
    

}

// set backgroud image
function setBg(){

    let today = new Date(),
    hour = today.getHours();

    if (hour < 4) {
        // night
 
        document.body.style.backgroundImage = "URL('images/night.jpg'";
        document.body.style.backgroundImage
        document.body.style.color = "white"
        
        greeting.textContent = 'Go to Sleep';

    } else if (hour < 12) {

        document.body.style.backgroundImage = "URL('images/morning.jpg')";
        greeting.textContent = 'Good Morning';
         document.body.style.color = "white"

    } else if (hour < 16){
   
        document.body.style.backgroundImage = "URL('images/noon.jpg')";
        greeting.textContent = 'Good Afternoon';
        document.body.style.color = "white"

    } else {
    
        document.body.style.backgroundImage = "URL('images/evening.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = "white"
    }

    
}
function getName(){

    if (localStorage.getItem('name') == null ){
        name.textContent = '[Enter Name]'
    } else {
        name.textContent = localStorage.getItem('name')
    }
}

function setName(e){
    if(e.type == 'keypress'){
        if (e.which == 13 || e.keyCode == 13 ) {
            localStorage.setItem('name', e.target.innerHTML);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerHTML);
    }
}
//Add zeros
function addZero(n){
    return (parseInt(n,10) < 10 ? '0' :'') + n ;
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);



showTime();
setBg();
getName();
var url1 = ""
var data2 
var suck


function getMoreDetails(latitude,longitude){

    var weatherUrl = 'https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&latitude=' + latitude+ '&longitude=' + longitude+ '&oneobservation=true&apiKey=WmS1Kg3mOO7NFOfJN8ZkpYbGDtnhufv9Iwopue2asZw'
    var ipUrl = 'https://api.ipify.org?format=json'
    var request = new XMLHttpRequest();
    var method = 'GET';
    var async = true;
    // request.open(method, ipUrl, async);
    // request.onreadystatechange = function(){
    //   if(request.readyState == 4 && request.status == 200){
    //    // var data = JSON.parse(request.responseText);
    //     localStorage.setItem('ip', request.responseText);
    //   } 
    // };
    $.getJSON(ipUrl, function(result) {
      localStorage.setItem('ip', result.ip);
    })
    .done(function() {
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
    // request.send();
   request.open(method, weatherUrl, async);
    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var weatherData = JSON.parse(request.responseText);
        localStorage.setItem('weather', JSON.stringify(weatherData));
      } 
    };
    request.send();

  };
function getLocation() {
  let today = new Date();
  hour = today.getHours()
  lastHour = localStorage.getItem('hour');
    if (localStorage.getItem('longitude') == null || localStorage.getItem('latitude') == null || lastHour != hour) {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(saveLoc);
        localStorage.setItem('hour', hour);
      } else { 
        //history.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
    showPosition()
  }

  function saveLoc(position) { 
    localStorage.setItem('longitude', position.coords.longitude);
    localStorage.setItem('latitude', position.coords.latitude);
    
  }   
  function showPosition() {
     // history.innerHTML="Latitude: " + localStorage.getItem("latitude") + 
      "<br>Longitude: " + localStorage.getItem("longitude");
      getMoreDetails(localStorage.getItem("latitude"),localStorage.getItem("longitude"))
  }

  function puData() {
      let ip = localStorage.getItem('ip');
      let data = JSON.parse(localStorage.getItem('weather'));
      let iconUrl = data.observations.location[0].observation[0].iconLink + '?apiKey=WmS1Kg3mOO7NFOfJN8ZkpYbGDtnhufv9Iwopue2asZw'
      footer.innerHTML =  `You IP is ${ip}, from ${data.observations.location[0].city} , ${data.observations.location[0].state} - ${data.observations.location[0].city} `
      //weatherPage.style.backgroundImage = " URL(${iconUrl})"
      let text =  "<img src='" + iconUrl+ "' alt=" + data.observations.location[0].observation[0].iconName + "><br>" + data.observations.location[0].observation[0].temperature + " C<sup>o</sup><br>" + data.observations.location[0].observation[0].description + "<br>Wind Direction: " + data.observations.location[0].observation[0].windDesc;
      weatherPage.innerHTML = text;
      if (data.observations.location[0].observation[0].daylight == "D") {
        weatherPage.style.backgroundColor = "rgb(33, 133, 214)"
      } else {
        weatherPage.style.backgroundColor = "rgb(9, 43, 71)"
      }
      }
  getLocation();
  puData();
  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlxdhin5fGn5xAQDO6FjUm0Zy8gs7s9gyP-TZGd855b4MZmKgBh-fD-VlMy3f-TB4Q_QT39XZnYReQ/pubhtml';


  