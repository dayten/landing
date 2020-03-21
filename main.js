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

    if (hour < 6) {
        // night
        document.body.style.backgroundColor = "grey";
        document.body.style.backgroundImage = "URL('images/morning.jpg'";
        document.body.style.backgroundImage
        document.body.style.color = "white"
        
        greeting.textContent = 'Good Night';

    } else if (hour < 12) {
        document.body.style.backgroundColor = "blue";
        document.body.style.backgroundImage = "URL('images/morning.jpg')";
        greeting.textContent = 'Good Morning';

    } else if (hour < 18){
        document.body.style.backgroundColor = "yellow";
        document.body.style.backgroundImage = "URL('images/noon.jpg')";
        greeting.textContent = 'Good Afternoon';

    } else {
        document.body.style.backgroundColor = "Orange";
        document.body.style.backgroundImage = "URL('images/evening.jpg')";
        greeting.textContent = 'Good Evening';
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