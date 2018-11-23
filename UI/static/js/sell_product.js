var products = [];
var cart = [];

// show all available products
function view_all_products() {
    var token = localStorage.getItem('token');
    fetch("http://127.0.0.1:5000/api/v2/products", {
        headers: {
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === "Token has expired"){
            window.location.href = './loginpage.html';
        }
        console.log('successful', data);
        products.push(data)

        var tbody = document.getElementById("table_body");
        var item_count = data.available_products.length;
        if (item_count > 0){
            let row_count = 0;
            for (row_count; row_count<item_count; row_count++) {
                let field_entry = data.available_products[row_count];
                // creating shopping product list
                var newProduct = {
                    product_id: null,
                    product: null,
                    quantity: 0,
                    unit_price: 0.00,
                };
                newProduct.product_id=field_entry["product_id"],
                newProduct.product=field_entry["product"];
                newProduct.quantity=field_entry["quantity"];
                newProduct.unit_price=field_entry["unit_price"]

                products.push(newProduct);

                // populating table
                var row = '<tr class="odd" id="'+field_entry["product_id"]+ '">';
                row += '<td class="center">' + field_entry["product"] + '</td>';
                row += '<td class="center">' + field_entry["quantity"] + '</td>';
                row += '<td class="center">' + field_entry["unit_price"] + '</td>';
                row += '<td class="center">';
                row += '<input type="number" name="quantity" id="quantity'+field_entry["product_id"]+'" value="0" min="0">';
                row += '</td>';
                row += '<td class="center">';
                row += '<button type="button" id="view_details" class="view" onclick="addToCart('+ field_entry["product_id"] +')"> Add </button>';
                row += '</td>';
                row += '</tr>';
                
                tbody.innerHTML += row;
            }
        }
        else{
            document.getElementById("alert").style.display = "block";
            document.getElementById("alert").innerHTML = "No products available";
        }
                
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

// add item to shopping cart
function addToCart(product_id) {
    let quantity = document.getElementById("quantity"+product_id).value;
    console.log("qty"+quantity);

    for (var i = 0; i < products.length; i++) {
        if (products[i].product_id == product_id) {
            var cartItem = null;
            for (var k = 0; k < cart.length; k++) {
                if (cart[k].product.product_id == products[i].product_id) {
                    cartItem = cart[k];
                    cart[k].quantity=parseInt(cart[k].quantity)+parseInt(quantity);
                    break;
                }
            }
            if (cartItem == null) {
                
                var cartItem = {
                    product: products[i],
                    quantity: parseInt(quantity) 
                };
                cart.push(cartItem);
            }
        }
    }

    renderCartTable();
}

// render shopping cart
function renderCartTable() {
    var html = '';
    var element = document.getElementById("mycart");
    element.innerHTML = ''; 

    html += "<table id='tblCart' border='1|1'>";
    html += "<thead>";
    html += "<tr>";
    html += "<th>Product</th>";
    html += "<th>Quantity</th>";
    html += "<th>Price</th>";
    html += "<th>Total</th>";
    html += "<th>Action</th></tr></thead>";
    var GrandTotal = 0;
    for (var i = 0; i < cart.length; i++) {
        html += "<tr>";
        // html += "<td>" + cart[i].product.product_id + "</td>";
        html += "<td>" + cart[i].product.product + "</td>";
        html += "<td>" + cart[i].quantity + "</td>";
        html += "<td>" + cart[i].product.unit_price + "</td>";
        html += "<td>" + parseInt(cart[i].product.unit_price) * parseInt(cart[i].quantity) + "</td>";
        html += "<td><button type='submit' onClick='removeItem(\"" + cart[i].product.product_id + "\", this);'/>Remove Item</button></td>";
        html += "</tr>";

       GrandTotal += parseInt(cart[i].product.unit_price) * parseInt(cart[i].quantity);            

    }
    document.getElementById('total').innerHTML = GrandTotal;
    html += "</table>";
    element.innerHTML = html;
}

// remove item from shopping cart
function removeItem(product_id)
    { 
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product.product_id == product_id) {
                cart.splice(i,1);
            }
        }
        renderCartTable();
    }

//add sale record to database 
function add_sale_record(product_id, quantity){
    var token = localStorage.getItem('token');

    fetch("http://127.0.0.1:5000/api/v2/sales",{
        method:'POST',
        headers: {
        'Content-type':'application/json',
        Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({product_id:product_id, quantity:quantity})
    })

    .then((response) => response.json())
    .then((data) => {
        console.log(token)
        if(data["message"] == "sale record successfully added"){
            // window.location.reload();
        }
        document.getElementById("alert").style.display = "block";
        document.getElementById("alert").innerHTML = data.message;
        })
}

function create_sale(){
    if (cart.length > 0){
        for(var i=0; i<cart.length; i++){

            add_sale_record(cart[i].product.product_id, cart[i].quantity)
        }
        renderCartTable();
    }else{
        document.getElementById("alert").style.display = "block";
        document.getElementById("alert").innerHTML = "No items in your shopping cart";
    }
}
