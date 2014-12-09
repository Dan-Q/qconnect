$(function(){


var fire = new Firebase("https://pricetide.firebaseio.com/");
window.all_vendors = [];

// load list of vendors and ask which one we're at
// FUTURE: use geolocation, QR codes, NFC, or something to determine location
//         rather than simply asking the user, which is TOO easy to 'game'
//         and bad UX to boot
fire.child('vendors').once('value', function(vendors){
  $('#main').html('<p>Where are you right now?</p><ul id="select_vendor"></ul>');
  var select_vendor = $('#select_vendor');
  vendors.forEach(function(vendor){
    window.all_vendors.push({id: vendor.key(), name: vendor.child('name').val(), lat: vendor.child('lat').val(), lng: vendor.child('lng').val()});
    select_vendor.append('<li><a href="#" data-id="' +  vendor.key() + '">' + vendor.child('name').val() + '</a></li>');
  });
  $('#select_vendor a').click(function(){
    window.my_location = $(this).data('id');
    fire.child('vendors/'+window.my_location).once('value', function(vendor){
      window.my_location_name = vendor.child('name').val();
      window.my_location_lat = vendor.child('lat').val();
      window.my_location_lng = vendor.child('lng').val();
      $('#main').html('<p>You are at: <strong>' + window.my_location_name + '</strong><br />Queue length at this location: <strong id="queue_length"><em>[...calculating...]</em></strong></p><p>Other locations:</p><ul id="other_locations"></ul>');
      fire.child('vendors/'+window.my_location+'/wait_time').on('value', function(wait_time){
        var val = wait_time.val();
        if(val < 60) {
          $('#queue_length').text('less than a minute');
        } else {
          $('#queue_length').text(moment.duration(wait_time.val(), "seconds").format('h [hours], m [minutes]'));
        }
      });
      var other_locations = $('#other_locations');
      var i;
      for(i = 0; i < window.all_vendors.length; i++){
        var inner_vendor = window.all_vendors[i];
        if(inner_vendor.id != window.my_location){
          var distance_lat = Math.abs(window.my_location_lat - inner_vendor.lat);
          var distance_lng = Math.abs(window.my_location_lng - inner_vendor.lng);
          var distance = Math.sqrt((distance_lat * distance_lat) + (distance_lng * distance_lng));
          other_locations.append('<li><strong>'+inner_vendor.name+'</strong> ('+Math.round(distance)+' minutes walk away; queue <span id="queue_length_'+inner_vendor.id+'"><em>[...calculating...]</span>)<span id="discount_'+inner_vendor.id+'"></span></li>');
        }
      }
      fire.child('vendors').on('child_changed', function(discounted_vendor){
        var queue_length = discounted_vendor.child('wait_time').val();
        var discount = discounted_vendor.child('discount').val();
        $('#queue_length_'+discounted_vendor.key()).text(moment.duration(queue_length, "seconds").format('h [hours], m [minutes]'));
        if(discount > 0){
          $('#discount_'+discounted_vendor.key()).html('<br />Available discount: '+discount+'%');
        } else {
          $('#discount_'+discounted_vendor.key()).html('');
        }
      });
    });
    return false;
  });
});


});