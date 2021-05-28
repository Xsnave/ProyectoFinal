// Variables
var x = document.getElementById('Productos');
var y = document.getElementById('Reparaciones');

function ShowDiv() {
    if (x.style.display == 'none') {
        y.style.display = 'none';
        x.style.display = 'block';
        document.getElementById('Productos').scrollIntoView();
    }
    else {
        x.style.display = 'none';
    }
}

function ShowDiv2() {
    if (y.style.display == 'none') {
        x.style.display = 'none';
        y.style.display = 'block';
        document.getElementById('Reparaciones').scrollIntoView();
    }
    else {
        y.style.display = 'none';
    }
}


