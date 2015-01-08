module.exports.validatePhoneNumber = function(number) {
  if(number.match(/^[0-9]+$/) != null && number.length >= 10){
    return(true);
  } else {
    console.log("Input is not correctly formatted");
    return(false);
  }
}