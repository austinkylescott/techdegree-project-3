const $checkboxes = $(".activities input[type='checkbox']");

$(document).ready(function(){
  $('input').first().focus(); //When page loads, set focus to first text field.
});

$("#other-title").hide();   //Hide "other" input field at start.
$("#colors-js-puns").hide();//Hide colors at start

/*Check whether or not the "other" option is selected.
    If it is, show text input for user to enter option.
*/
$("#title").on('change', function (event) {
  if(event.target.value === "other") {
    $("#other-title").slideDown(100);
  } else {
    $("#other-title").slideUp(100);
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
  const selectedName = event.target.name;
  const selectedChecked = event.target.checked;
  
  if(selectedName === 'all' && selectedChecked) {
    totalCost+=200;
  } else if(selectedName === 'all'){
    totalCost-=200;
  } else if(selectedChecked){
    totalCost+=100;
  } else {
    totalCost-=100;
  }
  console.log("Total Cost: " + totalCost);

/* REGEX MATCHING ATTEMPT - DOES NOT WORK
  //create REGEX string
  const $timeRegex = /\w{1,}day \d{1,}\w{2}-\d{1,}\w{2}/g;

  const label = $(this).closest('label').text();
  const selectedTime = label.match($timeRegex);
  console.log(selectedTime);

  $checkboxes.each(function () {
    const checkLabel = $(this).closest('label').text();
    const eventTime = checkLabel.match($timeRegex);
    const name = checkLabel.name;

    if(eventTime === selectedTime && name != 'all') {
      console.log(checkLabel);
      console.log(checkLabel + eventTime);
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  });
*/
});
