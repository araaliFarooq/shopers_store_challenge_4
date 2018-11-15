document.getElementById('loginform').addEventListener('submit', login);
function login(event){
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    fetch("http://127.0.0.1:5000/api/auth/login",{
      method:'POST',
      headers: {
        'Content-type':'application/json'
      },
      body:JSON.stringify({user_name:username, password:password})
    })

    .then((response) => response.json())
    .then((data) => {
        
        if(data['token'] && data["role"] == "admin"){
            var token= data['token']
            localStorage.setItem("token",token)
            window.location.href = './add_attendant.html'}
        else if (data["role"] == "attendant"){
            var token= data['token']
            localStorage.setItem("token",token)
            window.location.href = './all_products.html'
            }
        else{
            alert(data.message)
        }    
            
        })
}