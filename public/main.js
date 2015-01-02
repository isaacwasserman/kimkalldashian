var checkphone = function(){
  if(document.getElementById("phone").value.match(/^[0-9]+$/) != null && document.getElementById("phone").value.length == 10){
    document.getElementById("phone").style.backgroundColor = "#53cd95";
  }
  else{
    document.getElementById("phone").style.backgroundColor = "#ff6060";
  }
}