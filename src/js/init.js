const config = {
	'menu': 'menu-opened',
	'firstVideoReseize': false
}

$('.to-slide-top').each(function() {

	const slide = $(this).closest('.section');
	$(this).prependTo(slide);

});