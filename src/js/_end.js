$('.to-slide-top').each(function() {
	const slide = $(this).closest('.section');
	$(this).prependTo(slide);
});

$('.scroll').on('scroll', function(e) {
	console.log('on.scroll');
	if (window.isScrollableSection && !window.animationIsOn) {
		checkScrollEnd(e.target);
	}
})

$('#wrapper').bind('wheel mousewheel', function(e){
	console.log('mousewheel');
	scrollBlockWatcher(e);
	skipWatcher(e);
});


});