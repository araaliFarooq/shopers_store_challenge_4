function ProductDetails(product_id) {
    var token = localStorage.getItem('token')
    console.log("product_id "+product_id)
    fetch("http://127.0.0.1:5000/api/v2/products/"+product_id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json())
    .then(data => {
        console.log('successful', data);
        var item_count = Object.keys("product_details").length;
       
        if (item_count > 0){
            
            // set values
            document.getElementById("product").value = data['product_details']['product'];
            document.getElementById("quantity").value = data['product_details']['quantity'];
            document.getElementById("unit_price").value = data['product_details']['unit_price'];
            
        }
        else{
            alert("here "+data.message)
        }
                
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}