$('#main-content').fullpage({
	anchors: [
		'bojcovskij-klub',
		'o-nas',
		'informaciya',
		'kontakty'
	],

	menu: '#menu',
	slidesNavigation: true,
	scrollHorizontally: true,
	controlArrows: false,
	slidesNavPosition: 'top',
	dragAndMove: true,
	autoScrolling: true,
	fitToSection: false,
	paddingTop: 'var(--header-size)',
	// scrollOverflow: true,
	// normalScrollElements: '.scroll',

	afterSlideLoad: function(section, origin, destination, direction){
		// console.log('%c afterSlideLoad', 'color: #3c3e41');
		// customSlider.animationIsOn = false;
		window.animationIsOn = false;
		
	},

	beforeLeave: function(origin, destination, direction, trigger){
		// console.log('%c beforeLeave', 'color: #3c3e41');
		// customSlider.prevSection = fullpage_api.getActiveSection();
		// customSlider.prevSlide = fullpage_api.getActiveSlide();
		// customSlider.animationIsOn = true;
		window.animationIsOn = true;
		// console.log(customSlider);
	},

	onSlideLeave: function(section, origin, destination, direction){
		// console.log('%c onSlideLeave', 'color: #3c3e41');
		// console.log(destination);
		// customSlider.animationIsOn = true;
		window.animationIsOn = true;

		lockWatcher(destination);
		timelineWatcher(section.anchor, destination.anchor);
		insideSliderCheck(destination.isFirst, section.item);
		burgerMenu(false);
		togglePopup(false);
	},
	afterLoad: function(origin, destination, direction, trigger){
		// console.log('%c afterLoad', 'color: #3c3e41');
		// console.log('destination', destination);
		// customSlider.animationIsOn = false;
		// insideSliderCheck();
		window.animationIsOn = false;

		// if (!config.firstVideoReseize) {
			// config.firstVideoReseize = true;
			videoWatcher(destination.anchor);
		// }
		// if (destination.anchor == 'bojcovskij-klub') {
		// 	bannerFlow();
		// }
		scrollSlideWatcher(destination);
		
		if (destination.anchor == 'bojcovskij-klub') {
			$('#main-content').css('transform', 'translate3d(0px, 0px, 0px)');
		}
	},
	afterSlideLoad: function(origin, destination, direction, trigger){
		// console.log('%c afterSlideLoad', 'color: #3c3e41');
		// customSlider.animationIsOn = false;
		window.animationIsOn = false;
		fullpage_api.setAllowScrolling(true);
		scrollSlideWatcher(destination);
	},
	onLeave: function(origin, destination, direction, trigger){
		// console.log('onLeave, destination', destination);
		// burgerWatcher(destination);
		// clearBannerFlow();
		// customSlider.animationIsOn = true; /* todo: remove customSlider */
		window.animationIsOn = true;
		videoSliderWatcher(destination);
		burgerMenu(false);
		togglePopup(false);
		titleWatcher(destination);
		headerHandler(destination.anchor);
		videoWatcher(destination.anchor);

		// if (destination.anchor == 'bojcovskij-klub') {
		// 	$('#main-content').css('transform', 'translate3d(0px, 0px, 0px)');
		// }
	},

	// afterResize: function(width, height){
	// 	console.log('%c afterResize', 'color: #3c3e41');
	// 	scrollSlideWatcher(fullpage_api.getActiveSlide());
	// }
	// onScrollOverflow: function( section, slide, position, direction){
	// 	console.log(section);
	// 	console.log("position: " + position);
	// }

});

const hideTextForm = () => {
	$('.info-2__article').css({
		'font-size': '0',
		'height': 'var(--header-size)',
		'opacity': '0'
	});
}

const showTextForm = () => {

	$('.info-2__article').css({
		'font-size': '',
		'height': ''
	});
	setTimeout(() => {
		$('.info-2__article').css('opacity', '');
	}, 400);

}

// window.addEventListener('native.showkeyboard', scrollSlideWatcher(fullpage_api.getActiveSlide()));

window.addEventListener('native.showkeyboard', hideTextForm);
window.addEventListener('native.hidekeyboard', showTextForm);


addEventListener('resize', () => {
	scrollSlideWatcher(fullpage_api.getActiveSlide());
});
