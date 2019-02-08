$(document).ready(function(){
  $('input').first().focus(); //When page loads, set focus to first text field.
});

$("#other-title").hide();

$("#title").on('change', function (event) {
  if(event.target.value === "other") {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
});
