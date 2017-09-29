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

var enterBudget = document.getElementById("enterBudget");
enterBudget.onclick = calculateBudget;

function calculateBudget(){
    //get budget from input field and store
    //convert trip budget to the destination currency
    //using the exchange rate. Display result on the page
    //using the tripExchangeMsg paragraph element
    //calculate daily budget in jap yen and display 
    //result using the dailyExchangeMsg para element
    //calculate exchange cost for an item that is usually
    //ten dollars and 500 dollars using echange10Msg
    // and echange500Msg
    var budgetInput = document.getElementById("tripBudget");
    var budget = budgetInput.value;
    var jpy = 112.24;
    var converted = budget * jpy;
    var tripExchangeMsg = document.getElementById("tripExchangeMsg");
    tripExchangeMsg.innerHTML = "Your budget is "+converted+" in Japanese Yen.";
    
    var daysInput = document.getElementById("days");
    var days = daysInput.value;
    var dailyExchangeMsg = document.getElementById("dailyExchangeMsg");
    var daily = converted/days;
    dailyExchangeMsg.innerHTML = "Your daily budget is "+daily+" in Japanese Yen.";
    
    var exchange10Msg = document.getElementById("exchange10Msg");
    var exchange10 = 10 * 112.24;
    exchange10Msg.innerHTML = "A $10 item is "+exchange10+" in Japanese Yen.";
    
    var exchange500Msg = document.getElementById("exchange500Msg");
    var exchange500 = 500*112.24;
    exchange500Msg.innerHTML = "A $500 item is "+exchange500+" in Japanese Yen.";
}
var images = ["images/japan.jpg", "images/japan1.jpg", "images/japan2.jpg","images/japan3.jpg"];
var currentImage = 0;
setInterval(changeImage, 30000);

function changeImage(){
    currentImage++;
    if(currentImage > images.length - 1){
        currentImage = 0;
    }
    document.body.style.backgroundImage = "url("+images[currentImage]+")";
}