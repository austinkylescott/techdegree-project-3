const $checkboxes = $(".activities input[type='checkbox']");

$(document).ready(function(){
  $('input').first().focus(); //When page loads, set focus to first text field.
});

$("#other-title").hide();   //Hide "other" input field at start.
$("#colors-js-puns").hide();//Hide colors when at start

/*Check whether or not the "other" option is selected.
    If it is, show text input for user to enter option.
*/
$("#title").on('change', function (event) {
  if(event.target.value === "other") {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
});

/*Only display the color options that match
    the design selected in the design menu*/
$("#design").on('change', function (event) {
  $("#colors-js-puns").show();
  $("#design option:contains('Select Theme')").remove();  //Removes ability to skip selecting a design

  /*Checks the design choice and serves up the appropriate list of color options.
  Selects the new first available option for colors to avoid any error.
  */
  if($("#design").val() === "js puns") {
    $(".puns").show();
    $(".heart").hide();
    $("#color").find('option:eq(0)').prop('selected', true);

  } else if ($("#design").val() === "heart js") {
    $(".puns").hide();
    $(".heart").show();
    $("#color").find('option:eq(3)').prop('selected', true);
  }
});

/*Disable checkboxes that compete with selected checkboxes
  Totals checked sessions*/
let totalCost = 0;
$checkboxes.on('change', function (event) {

  if(this.checked && this.name === 'all') {
    totalCost+=200;
  } else if (this.name === 'all') {
    totalCost-=200;
  } else if(this.checked){
    totalCost+=100;
  } else {
    totalCost-=100;
  }
  console.log(totalCost);
});
