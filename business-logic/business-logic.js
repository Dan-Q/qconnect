// Firebase plumbing
var Firebase = require("firebase");
var firebase_connection = new Firebase("https://pricetide.firebaseio.com/");

// Model variables
var min_queue_time;
var discount_rate;
var threshold_queue_time;
var vendors = ["alpha","beta","gamma","delta"];
var num_vendors = vendors.length;

// Handle a change in wait times anywhere
start_vendor_listener = function(){
firebase_connection.child("vendors").on("value", calc_discounts)};

function calc_discounts(vendor_data) {
  /* Get wait times
   * We want to know whether or not vendors have a queue less than
   * min_queue_time, and if there are any with a queue longer than
   * threshold_queue_time
   */
  var any_long_queues = false;
  var vendor_discounts = {};
  for (var i = 0; i < num_vendors; i++) {
    var vendor = vendors[i];
    var wait_time = vendor_data.child(vendor).child("wait_time").val();
    console.log("Wait time at " + vendor + ": " + wait_time);

    // Figure out which band this falls into, and setup data accordingly
    if (wait_time < min_queue_time) {
      /* Queue is less than the minimum, if we're doing discounts this vendor
         will have one */
      vendor_discounts[vendor] = discount_rate;
    } else {
      // Queue is greater than the minimum, no discount for you
      vendor_discounts[vendor] = 0;
      if (wait_time > threshold_queue_time) {
        // This is a super-size queue, so discounts are going to be in play
        any_long_queues = true;
      }
    }
  }

  // If we have some long queues, set short queue outlets to have a discount
  console.log("Some outlets have wait times longer than " + threshold_queue_time + "!");

  for (var i = 0; i < num_vendors; i++) {
    var vendor = vendors[i];
    var vendor_ref = firebase_connection.child("vendors").child(vendor);
    vendor_ref.update({discount: vendor_discounts[vendor]});
    console.log("Setting discount to " + vendor_discounts[vendor] + " at " + vendor);
  }
};

/* Handle a change in management variables (sets up the vendor listener on
   success) */
firebase_connection.child("system_variables").on("value", function(system_variables) {
  // set variables
  min_queue_time = system_variables.child("min_queue_time").val();
  discount_rate = system_variables.child("discount_rate").val();
  threshold_queue_time = system_variables.child("threshold_queue_time").val();

  // update discounts
  firebase_connection.child("vendors").once("value", calc_discounts);
});

start_vendor_listener();
