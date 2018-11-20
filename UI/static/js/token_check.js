var role = localStorage.getItem("role")
if (role !== "admin"){
    alert("You need admin permissions to access this page")
    window.history.back()
}