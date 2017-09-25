var dataPeople = [
    {
        username: "bro",
        password: "bruh",
        type: "A"
    },
    {
        username: "sam",
        password: "please",
        type: "B"
    },
    {
      username: "annie",
      password: "kitty",
      type: "C" 
    }
]
function submitInfo(){
    var user = document.getElementById('username').value
    var pass = document.getElementById('password').value
    let m = 0;
    /*if (user != "" && pass != ""){
        while (user == dataPeople[m].username && pass == dataPeople[m].password){
            alert("Welcome "+user);
            window.location.replace("index.html");
            m++
        }
        while (user == dataPeople[m].username && pass != dataPeople[m].password){
            alert("Incorrect password.");
            window.location.reload("login.html");
            m++
        }
        while (user != dataPeople[m].username && pass == dataPeople[m].password){
            alert("Incorrect username");
            window.location.reload("login.html");
            m++
        }
        while (user != dataPeople[m].username && pass != dataPeople[m].password){
            alert("Incorrect username and password.");
            window.location.reload("login.html");
            m++
        }
    }
    else{
        alert("Please fill in the username and password fields");
    }*/
    //else if()
    for(var i = 0; i < dataPeople.length; i++) {
        if(user == dataPeople[i].username && pass == dataPeople[i].password){
            alert("Welcome " + user);
            window.location.replace("index.html");
        }
        else if (user == dataPeople[i].username && pass != dataPeople[i].password){
            alert("Incorrect password.");
            window.location.reload("login.html");
        }
        else if (user != dataPeople[i].username && pass == dataPeople[i].password){
            alert("Incorrect username");
            window.location.reload("login.html");
        }
        else if(user != dataPeople[i].username && pass != dataPeople[i].password){
            alert("Incorrect username and password.");
            window.location.reload("login.html");
        }
    }
}