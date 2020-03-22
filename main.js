//DOM elementsc
const time = document.getElementById('time'),
greeting = document.getElementById('greetings'),
name = document.getElementById('name'),
focus = document.getElementById('focus')


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
getName()