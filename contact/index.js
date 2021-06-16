var sumbit_click = function(){
    window.location.href = "../redirect.html";
}; 


var reset_click = function () {
    document.getElementById("inputname").value = "";
    document.getElementById("inputsubject").value = "";
    document.getElementById("inputmail").value = "";
    document.getElementById("inputdesc").value = "";
 }

document.getElementById('sumbit').onclick = sumbit_click;
document.getElementById('cancel').onclick = reset_click;
