let today = new Date().toISOString().substr(0, 10);

var alpha = function(){
    document.getElementById("inputdate").value = today;
    document.getElementById("inputtime").value = "15:32";
    document.getElementById("inputtype").value = "Glass";
    document.getElementById("inputamount").value = "6kg";
}; 

var bravo = function(){
    document.getElementById("inputdate").value = today;
    document.getElementById("inputtime").value = "13:12";
    document.getElementById("inputtype").value = "Plastic";
    document.getElementById("inputamount").value = "7kg";
}; 

var charlie = function(){
    document.getElementById("inputdate").value = today;
    document.getElementById("inputtime").value = "18:54";
    document.getElementById("inputtype").value = "Plastic";
    document.getElementById("inputamount").value = "8kg";
}; 

var delta = function(){
    document.getElementById("inputdate").value = today;
    document.getElementById("inputtime").value = "11:43";
    document.getElementById("inputtype").value = "Glass";
    document.getElementById("inputamount").value = "5kg";
}; 

var reset_click = function () {
    document.getElementById("inputdate").value = "";
    document.getElementById("inputtime").value = "";
    document.getElementById("inputtype").value = "";
    document.getElementById("inputamount").value = "";
    document.getElementById("inputdesc").value = "";
 }

document.getElementById('cancel').onclick = reset_click;
document.getElementById('alpha').onclick = alpha;
document.getElementById('bravo').onclick = bravo;
document.getElementById('charlie').onclick = charlie;
document.getElementById('delta').onclick = delta;


