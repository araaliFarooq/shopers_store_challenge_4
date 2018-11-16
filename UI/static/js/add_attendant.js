// Adding an attendant.
var token = localStorage.getItem("token")

document.getElementById('signup-form').addEventListener('submit', add_attendant);
function add_attendant(event){
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let contact = document.getElementById('contact').value;
    let role = document.getElementById('role').value;

    fetch("http://127.0.0.1:5000/api/auth/register",{
      method:'POST',
      headers: {
        'Content-type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({user_name:username, contact:contact, role:role, password:password})
    })

    .then((response) => response.json())
    .then((data) => {
        console.log(token)
        if(data["message"] == "Attendant account created"){
            window.location.reload();
        }
        alert(data.message);
        })
}