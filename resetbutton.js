var button = document.getElementById("resetButton");
var form = document.getElementById("myForm");

button.addEventListener("click", function() {
    form.reset();
});