var acc = document.getElementsByClassName("category-content");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

function jeans() { 
  document.getElementById('jeans').style.display = "block";
}

function sweaters() { 
document.getElementById('sweaters').style.display = "block";
}

function shirts() { 
document.getElementById('shirts').style.display = "block";
}

function snickers() { 
document.getElementById('snickers').style.display = "block";
}

function trainers() { 
document.getElementById('trainers').style.display = "block";
}

