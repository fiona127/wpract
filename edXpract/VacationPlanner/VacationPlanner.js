var name = window.prompt("Hello! Please enter your name");

var greeting = document.getElementById("greeting");
greeting.innerHTML += ", "+name;

var enterDays = document.getElementById("enterDays");
enterDays.onclick = calculateDays;

function calculateDays(){
    var daysInput = document.getElementById("days");
    var days = daysInput.value;
    var daysMessage = document.getElementById("daysMessage");
    if (days < 4){
        daysMessage.innerHTML = "Short trips are always worth it!";
    }
    else if(days < 7){
        daysMessage.innerHTML = "Cool, you'll be there almost a week!";
    }
    else{
        daysMessage.innerHTML = "You'll have plenty of time to relax and have fun!";
    }
    var hoursMessage = document.getElementById("hoursMessage");
    var hours = days *24;
    hoursMessage.innerHTML = "That means you'll be traveling for "+ hours+" hours!";
    
    var minutesMessage = document.getElementById("minutesMessage");
    var minutes = hours * 60;
    minutesMessage.innerHTML = "Which means you'll be traveling for "+minutes+" minutes!";
    
    var secondsMessage = document.getElementById("secondsMessage");
    var seconds = minutes * 60;
    secondsMessage.innerHTML = "That's "+seconds+" seconds!";
    
    var timingNext = document.getElementById("timingNext");
    timingNext.removeAttribute("hidden");
    timingNext.onclick = function (){
        document.getElementById("budgetSection").removeAttribute("hidden");
    }
}