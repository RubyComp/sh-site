const config = {
	'menu': 'menu-opened',
	'firstVideoReseize': false,
	'phoneLinkHtml': '<a class="phone" href="tel:+74951234567">+7 495 123-45-67</a>'
}

$('.to-slide-top').each(function() {

	const slide = $(this).closest('.section');
	$(this).prependTo(slide);

});