var dataPeople = [
    {
        username: "bro",
        password: "bruh",
        type: "A"
    },
    {
        username: "Sam",
        password: "please",
        type: "B"
    },
    {
      username: "Annie",
      password: "kitty",
      type: "C" 
    }
]
function submitInfo(){
    var user = document.getElementById('username').value
    var pass = document.getElementById('password').value
    
    for(var i = 0; i < dataPeople.length; i++) {
        if(user == dataPeople[i].username){
            if (pass == dataPeople[i].password){
                window.location.replace("index.html");
                window.alert("Welcome " + user);
            }
        }
    }
}
