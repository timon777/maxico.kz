$(document).ready(function() {
	let width = $(window).width();
	let height = $(window).height();
	$(window).resize(function(){
		width = $(window).width();
		height = $(window).height();
	});


	if (width > 991){
		$('.about__text').animated('fadeInLeft');
		$('.about__author').animated('fadeInRight');
		$('.services-items__item').animated('fadeInUp');
		$('.clients-items__item').animated('fadeInUp');
		$('.advantages-items').animated('fadeInRight');
		$('.certificates-items__item').animated('fadeInUp');
		$('.reviews-items__item').animated('fadeInUp');
		$('.partners-items__item').animated('fadeInUp');
		$('.contacts__text').animated('fadeInLeft');
		$('.contacts__map').animated('fadeInRight');
		$('.capabillities-items__item').animated('fadeInUp');
		$('.types-items__item').animated('fadeInUp');
		$('.cases-items__item').animated('fadeInUp');
		$('.stages-items__item').animated('fadeInUp');
	}
});


//animation
$.fn.animated = function(animation, delay, each, offset) {
	let ths = $(this);

	if (delay === undefined) delay = false;
	if (each === undefined) each = true;
	if (offset === undefined) offset = 70;
	if (delay) 
		ths.each(function (i) {
			$(this).addClass('animation-delay-' + i);
		});
	if (each) 
		ths.each(function (i) {
			ths = $(this);
			if (!ths.hasClass('animation-none')) animation_start(ths, animation, offset);
		});
	else if (!ths.hasClass('animation-none')) animation_start(ths, animation, offset);


	function animation_start(block,animation,offset){
		let element = block;
		$(element).addClass('opacity-0');
		$(window).on('scroll load resize', function(){
			if (element.hasClass('opacity-1')) return false;
			let element_top = $(element).offset().top;
			let body_height = $('body').height()
			let w_top = $(window).scrollTop();
			let w_height = $(window).height();
			let top_offset_height = w_height / 100 * offset;

			if(w_top + top_offset_height >= element_top) $(element).removeClass('opacity-0').addClass(animation+' animated opacity-1');

			if(top_offset_height >= w_height || body_height < (w_top + w_height + 100)) {
				$(element).removeClass('opacity-0').addClass(animation+' animated opacity-1');
			}

		});
	}
};


