
// document.getElementById('fetch').addEventListener("submit", view_products)

function view_products() {
    var token = localStorage.getItem('token')
    fetch("http://127.0.0.1:5000/api/v2/products", {
        headers: {
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === "Token has expired"){
            window.location.href = './loginpage.html'
        }
        console.log('successful', data);
        var tbody = document.getElementById("table_body");
        var item_count = data.available_products.length;
        if (item_count > 0){
            let row_count = 0;
            for (row_count; row_count<item_count; row_count++) {
                let field_entry = data.available_products[row_count];
                var row = '<tr class="odd" id="'+field_entry["product_id"]+ '">';
                row += '<td class="center">' + field_entry["product"] + '</td>';
                row += '<td class="center">' + field_entry["quantity"] + '</td>';
                row += '<td class="center">' + field_entry["unit_price"] + '</td>';
                row += '<td class="center">';
                row += '<button type="button" id="view_details" class="view" onclick="showDialog('+ field_entry["product_id"] +')"> View </button>';
                row += '</td>';
                row += '</tr>';
                
                tbody.innerHTML += row;
            }
        }
        else{
            alert("No products available");
        }
                
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}
