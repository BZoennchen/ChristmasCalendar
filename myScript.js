var messages = new Array();
messages[0] = "Saab";
messages[1] = "Volvo";
messages[3] = "BMW";
messages[4] = "BMW";
messages[5] = "BMW";
messages[6] = "BMW";
messages[7] = "BMW";
messages[8] = "BMW";
messages[9] = "BMW";
messages[10] = "BMW";
messages[10] = "BMW";

function getRandomMessage()
{
	return messages[Math.floor((Math.random()*10)+1)];
}

function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}

function validateDate(day)
{
	pickedDate = parseDate("2013-12-"+day);
    todaysDate = new Date();
    //alert(pickedDate);
    //alert(todaysDate);
    //7 Days=604800000ms
    if (pickedDate <= todaysDate)
    {
    	return true;
	}
    else
    {
    	return false;
    }
}

$.fn.getImage = function(callback, background) {
    var height = 0;
    var path = $(this).attr('src');

    if(background)
    {
    	path = $(this).css('background-image').replace('url', '').replace('(', '').replace(')', '').replace('"', '').replace('"', '');
    }
    
    var tempImg = $('<img />');
    tempImg.hide(); //hide image
    tempImg.bind('load', callback);
    $('body').append(tempImg); // add to DOM before </body>
    tempImg.attr('src', path);
    $('#tempImg').remove(); //remove from DOM
};

$(document).ready(function() {


for (var i = 1; i <= 24; i++)
{
	var name = '#slide'+i;
	var picName = 'pic_'+i+'.png';
	var tmpPicName = 'pic_'+i+'_t.png';

	$(name).css({'background-image': 'url(pictures/'+picName+')'});
	var src = $(name).attr('src');

    $(name).attr('src', 'pictures/'+tmpPicName);
	
	$(name).getImage(function() {
   		 	$(name).css({'height' : $(this).height()+'px'});
     		$(name).css({'width' : $(this).width()+'px'});
	}, true);
	
	$(name).click(function( event ) {
		$(this).attr('alt', i);
		var count = $(this).attr('id').substring(5);
		//alert(count);
		
		if(!validateDate(count))
		{
			alert(getRandomMessage());
		}
		
		if(validateDate(count) && $(this).attr('src') != 'pictures/'+'pic_'+count+'.png')
		{
			//$(name).fadeTo('slow', 0.33 );
			$(this).animate({opacity: 0}, 'slow', function() {
            	$(this).attr('src', 'pictures/pic_'+count+'.png');
            	$(this).animate({opacity: 1});
    	});
    	
    	$(this).getImage(function() {
   		 	$(this).css({'height' : $(this).height()+'px'});
     		$(this).css({'width' : $(this).width()+'px'});
		}, false);
		
		$(name).draggable();
		}
	});
}
});



