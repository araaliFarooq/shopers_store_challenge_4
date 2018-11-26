// Adding a product
var token = localStorage.getItem("token")

document.getElementById('add_product').addEventListener('submit', add_product);
function add_product(event){
    event.preventDefault();

    let product = document.getElementById('product').value;
    let quantity = document.getElementById('quantity').value;
    let unit_price = document.getElementById('unit_price').value;

    fetch("http://127.0.0.1:5000/api/v2/products",{
      method:'POST',
      headers: {
        'Content-type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({product:product, quantity:quantity, unit_price:unit_price})
    })

    .then((response) => response.json())
    .then((data) => {

        if (data.msg === "Token has expired"){
          window.location.href = './loginpage.html';
        }
        console.log(token)
        if(data["message"] == "product successfully added." || data["message"] == "product already exits, so its quantity has been updated"){
        // window.location.reload();
        document.getElementById("alert").style.display = "block";
        document.getElementById("alert").innerHTML = data.message;
        }
        document.getElementById("alert").style.display = "block";
        document.getElementById("alert").innerHTML = data.message;
        })
}

function view_products() {
    var token = localStorage.getItem('token')
    fetch("http://127.0.0.1:5000/api/v2/products", {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.msg === "Token has expired") {
                window.location.href = './loginpage.html'
            }
            console.log('successful', data);
            var tbody = document.getElementById("table_body");
            var item_count = data.available_products.length;
            if (item_count > 0) {
                let row_count = 0;
                for (row_count; row_count < item_count; row_count++) {
                    let field_entry = data.available_products[row_count];
                    var row = '<tr class="odd" id="' + field_entry["product_id"] + '">';
                    row += '<td class="center">' + field_entry["product"] + '</td>';
                    row += '<td class="center">' + field_entry["quantity"] + '</td>';
                    row += '<td class="center">' + field_entry["unit_price"] + '</td>';
                    row += '<td class="center">';
                    row += '<button type="button" id="view_details" class="view" onclick="showDialog(' + field_entry["product_id"] + ')"> View </button><button type="button" id="view_details" class="edit" onclick="showEditDialog(' + field_entry["product_id"] + ')"> Edit </button><button type="button" id="view_details" class="delete" onclick="showDeleteDialog('+ field_entry["product_id"] +')"> Delete </button>';
                    row += '</td>';
                    row += '</tr>';

                    tbody.innerHTML += row;
                }
            }
            else {
                alert("No products available");
            }

        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

function edit_product(product_id){
    var token = localStorage.getItem('token')
    let product = document.getElementById('product').value;
    let quantity = document.getElementById('quantity').value;
    let unit_price = document.getElementById('unit_price').value;

    fetch("http://127.0.0.1:5000/api/v2/products/"+product_id,{
      method:'PUT',
      headers: {
        'Content-type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({product:product, quantity:quantity, unit_price:unit_price})
    })

    .then((response) => response.json())
    .then((data) => {
        if (data.msg === "Token has expired"){
            window.location.href = './loginpage.html';
        }
        console.log(token);
        document.getElementById("alert").style.display = "block";
        document.getElementById("alert").innerHTML = data.message;
        })
}

function delete_product(product_id){
    var token = localStorage.getItem('token');

    fetch("http://127.0.0.1:5000/api/v2/products/"+product_id,{
      method:'DELETE',
      headers: {
        'Content-type':'application/json',
        Authorization: `Bearer ${token}`
      },
         })

    .then((response) => response.json())
    .then((data) => {
        if (data.msg === "Token has expired"){
            window.location.href = './loginpage.html';
        }
        console.log(token);
        document.getElementById("alert").style.display = "block";
        document.getElementById("alert").innerHTML = data.message;
        })
}
