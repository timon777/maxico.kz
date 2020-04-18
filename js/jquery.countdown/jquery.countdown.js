/**
 * @name		jQuery Countdown Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/12/countdown-jquery/
 * @license		MIT License
 */

 (function($){
 	
	// Number of seconds in every time division
	var days	= 24*60*60,
	hours	= 60*60,
	minutes	= 60;
	
	// Creating the plugin
	$.fn.countdown = function(prop){
		
		var options = $.extend({
			callback	: function(){},
			timestamp	: 0
		},prop);
		
		var left, d, h, m, s, positions;

		// Initialize the plugin
		init(this, options);
		
		positions = this.find('.position');
		
		(function tick(){
			
			// Time left
			left = Math.floor((options.timestamp - (new Date())) / 1000);
			
			if(left < 0){
				left = 0;
			}
			
			// Number of days left
			d = Math.floor(left / days);

			updateDuo(1, 2, d,true);
			left -= d*days;
			
			// Number of hours left
			h = Math.floor(left / hours);
			updateDuo(3, 4, h,false);
			left -= h*hours;
			
			// Number of minutes left
			m = Math.floor(left / minutes);
			updateDuo(5, 6, m,false);
			left -= m*minutes;
			
			// Number of seconds left
			s = left;
			updateDuo(7, 8, s);
			
			// Calling an optional user supplied callback
			options.callback(d, h, m, s);
			
			// Scheduling another call of this function in 1s
			setTimeout(tick, 1000);
		})();
		
		// This function updates two digit positions at once
		function updateDuo(minor,major,value, days){
			if (days==true) {
				var number = Math.floor(value/100)%10;
				if (number==0) positions.eq(0).css("display","none");
				switchDigit(positions.eq(0),number);
			}
			switchDigit(positions.eq(minor),Math.floor(value/10)%10);
			switchDigit(positions.eq(major),value%10);
		}
		
		return this;
	};


	function init(elem, options){
		elem.addClass('countdownHolder');

		var labels = ["дня","часов","минут","секунд"];

		// Creating the markup inside the container
		$.each(['Days','Hours','Minutes','Seconds'],function(i){
			

			var html = '<span class="position">0\
			<span class="digit static">0</span>\
			</span>\
			<span class="position">0\
			<span class="digit static">0</span>\
			</span>';
			if (this=="Days")  html +='\
				<span class="position">0\
			<span class="digit static">0</span>\
			</span>';

			var label = labels[i];
			label = '<span class="label">'+label+'</span>\
			';
			html = label + html;
			$('<span class="count count'+this+'">').html(html).appendTo(elem);
			
			
			if(this!="Seconds"){
				elem.append('<span class="countDiv countDiv'+i+'"></span>');
			}
		});

	}

	// Creates an animated transition between the two numbers
	function switchDigit(position,number){
		
		var digit = position.find('.digit')
		
		if(digit.is(':animated')){
			return false;
		}
		
		if(position.data('digit') == number){
			// We are already showing this number
			return false;
		}
		
		position.data('digit', number);
		
		var replacement = $('<span>',{
			'class':'digit',
			css:{
				top:'-100%',
				opacity:0
			},
			html:number
		});
		
		// The .static class is added when the animation
		// completes. This makes it run smoother.
		
		digit
		.before(replacement)
		.removeClass('static')
		.animate({top:'100%',opacity:0},100,function(){
			digit.remove();
		})

		replacement
		.delay(100)
		.animate({top:0,opacity:1},100,function(){
			replacement.addClass('static');
		});
	}
})(jQuery);