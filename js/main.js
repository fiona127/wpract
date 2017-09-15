function submitInfo(){
    var user = document.getElementById('username').value
    var pass = document.getElementById('password').value
    
    for(var i = 0; i < dataPeople.length; i++) {
        if(username == dataPeople[i].username && password == objPeople[i].password){
            console.log("Welcome" + username)
            return
        }
        else {
            return "Sorry. Incorrect username or password"
        }
    }
}