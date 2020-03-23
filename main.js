//DOM elementsc
const time = document.getElementById('time'),
greeting = document.getElementById('greetings'),
name = document.getElementById('name'),
focus = document.getElementById('focus'),
history = document.getElementById('history'),
footer = document.getElementById('footer'),
weatherPage = document.getElementById('weather')


//Show time
function showTime(){

    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec= today.getSeconds();
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

//   history.innerHTML =  `You IP is ${data2.query}, with ISP ${data2.isp} from ${data2.city}, ${data2.country} - ${data2.zip}`
// $.getJSON('http://ip-api.com/json', function(data) {
        
//     footer.innerHTML =  `You IP is ${data.query}, with ISP ${data.isp} from ${data.city}, ${data.country} - ${data.zip}`
//     url1 = 'http://api.openweathermap.org/data/2.5/weather?q=' + data.city + ',' + data.countryCode + '&appid=69f179a459032ed4c94e79e3a9e480ef';
//     localStorage.setItem('weatherUrl', url1);
//     weatherUrl = localStorage.getItem('weatherUrl')
// });

$.getJSON( "https://ip-api.com/json", function(data) {
    console.log( "success" );
    footer.innerHTML =  `You IP is ${data.query}, with ISP ${data.isp} from ${data.city}, ${data.country} - ${data.zip}`
    url1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + data.city + ',' + data.countryCode + '&appid=69f179a459032ed4c94e79e3a9e480ef';
    localStorage.setItem('weatherUrl', url1);
    weatherUrl = localStorage.getItem('weatherUrl')
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


if (localStorage.getItem('weatherUrl') == null ){
    weatherPage.innerHTML = "no url"
    weatherUrl = "nodata"
} else {
    weatherPage.innerHTML = "found url"
    weatherUrl = localStorage.getItem('weatherUrl')
}
 
$.getJSON(weatherUrl, function(weatherReport) {
        temp = (weatherReport.main.temp /10)  
        weatherPage.innerHTML = `Weather is ${weatherReport.weather[0].main} and Temp is ${temp} C` 

        }); 
        