const $checkboxes = $(".activities input[type='checkbox']");
let totalCost = 0;

$(document).ready(function(){
  $('input').first().focus(); //When page loads, set focus to first text field.

  $("#other-title").hide();                       //Hide "other" input field at start.
  $("#colors-js-puns").hide();                    //Hide colors at start

  $("#paypal").hide();
  $("#bitcoin").hide();

  $("#payment").val('credit card');               //Defaults payment option to credit card
  $("#payment [value='select_method']").remove(); //Removes select payment option
});

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
$checkboxes.on('change', function (event) {
  const selectedBox = this;
  const selectedName = selectedBox.name;
  const selectedChecked = selectedBox.checked;

  /*Part of attempted, overly complex regex solution
  const $timeRegex = /\w{1,}day \d{1,}\w{2}-\d{1,}\w{2}/g;
  const selectedLabel = $(selectedBox).closest('label').text();
  const selectedTime = selectedLabel.match($timeRegex);
  */

  //Disables or enables options
  function disableOrEnable(toggleName) {
    const $toggleBox = $(`.activities input[name=${toggleName}]`); //Selects box to be acted upon
    const onOff = $toggleBox.prop('disabled');  //Whether or not box is currently disabled

    if(onOff) { //If disabled, enable and change to active color
      $toggleBox.prop('disabled',false);
      $toggleBox.parent().css('color', '#000');
    } else { //If enabled, disable and change to inactive color
      $toggleBox.prop('disabled',true);
      $toggleBox.parent().css('color', 'gray');
    }
  }

  //Calculate total cost of selected workshops as they are selected
  function calcTotal() {
    if(selectedName === 'all' && selectedChecked) {
      totalCost+=200;
    } else if(selectedName === 'all'){
      totalCost-=200;
    } else if(selectedChecked){
      totalCost+=100;
    } else {
      totalCost-=100;
    }

    /*Checks to see if Total Cost element element exists.
      Adds to DOM if not, or replaces existing one if it there already*/
    if($('#totalCost').length){
      $('.activities #totalCost').replaceWith("<p id=totalCost><b>Total Cost: " + totalCost+"</p><b>");
    } else {
      $('.activities').append("<p id=totalCost><b>Total Cost: " + totalCost+"</p><b>");
    }
  }

  /*Switch statement disables or enables options based on
    the name of the event object*/
  switch(selectedName)
  {
    case 'all':
      break;
    case 'js-frameworks':
      disableOrEnable('express');
      break;
    case 'js-libs':
      disableOrEnable('node');
      break;
    case 'express':
      disableOrEnable('js-frameworks');
      break;
    case 'node':
      disableOrEnable('js-libs');
      break;
    case 'build-tools':
      break;
    case 'npm':
      break;
    default:
      break;
  }

  calcTotal();

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

/*Shows correct payment div based on what is selected*/
$('#payment').on('change', function (event) {
  let paymentMethod = this.value;
  //Adjusts paymentMethod content
  if(paymentMethod === 'credit card'){
    paymentMethod = 'credit-card';
  }

  $(`#${paymentMethod}`).show();
  $(`#${paymentMethod}`).siblings('div').hide();

});
