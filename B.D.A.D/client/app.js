function getResaleValue() {
  var uiResale = document.getElementsByName("uiResale");

  for(var i in uiResale) {
    if(uiResale[i].checked) {
        console.log(uiResale[i]);
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getNo_of_Bedrooms() {
  var uiNo_of_Bedrooms = document.getElementsByName("uiNo_of_Bedrooms");

  for(var i in uiNo_of_Bedrooms) {

    if(uiNo_of_Bedrooms[i].checked) {
        console.log(uiNo_of_Bedrooms[i].checked);
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}



function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var Location = document.getElementById("uiLocations");
  var Area = document.getElementById("uiArea");
  var No_of_Bedrooms = getNo_of_Bedrooms();
  var Resale = getResaleValue();
  var estPrice = document.getElementById("uiEstimatedPrice");

  var state = document.getElementById("uiState");
  console.log("state =" ,state.value);

  var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(url, {
      Location: Location.value,
      Area: parseFloat(Area.value),
      No_of_Bedrooms: No_of_Bedrooms,
      Resale: Resale 

  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString();
      console.log(status);
  });
}

function onPageLoad() {
  var state = document.getElementById("uiState");
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.post(url, {
    State: state.value
  },function(data, status) {
      console.log("got response for get_location_names request");
      //console.log(data.locations);
      if(data) {
          var Locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in Locations) {
              var opt = new Option(Locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

function myValue(valueSelectec){
  $('#uiLocations option').remove();
  console.log("------------------------This", valueSelectec.value);
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.post(url,{
    State: valueSelectec.value
  },function(data, status) {
      console.log("got response for get_location_names request");
      //console.log(data.locations);
      if(data) {
          var Locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in Locations) {
              var opt = new Option(Locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;