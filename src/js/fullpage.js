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

	afterSlideLoad: function(section, origin, destination, direction){
		console.log('%c afterSlideLoad', 'color: #3c3e41');
		customSlider.animationIsOn = false;
		
	},

	beforeLeave: function(origin, destination, direction, trigger){
		console.log('%c beforeLeave', 'color: #3c3e41');
		customSlider.prevSection = fullpage_api.getActiveSection();
		customSlider.prevSlide = fullpage_api.getActiveSlide();
		customSlider.animationIsOn = true;
		// console.log(customSlider);
	},

	onSlideLeave: function(section, origin, destination, direction){
		console.log('%c onSlideLeave', 'color: #3c3e41');
		// console.log(destination);
		customSlider.animationIsOn = true;

		lockWatcher(destination);
		timelineWatcher(section.anchor, destination.anchor);
		insideSliderCheck(destination.isFirst, section.item);
		burgerMenu(false);
		togglePopup(false);
	},
	afterLoad: function(origin, destination, direction, trigger){
		console.log('%c afterLoad', 'color: #3c3e41');
		customSlider.animationIsOn = false;
		// console.log(fullpage_api.getActiveSection(), fullpage_api.getActiveSlide());
		// insideSliderCheck();
		if (!config.firstVideoReseize) {
			config.firstVideoReseize = true;
			videoWatcher();
		}
		if (destination.anchor == 'bojcovskij-klub') {
			bannerFlow();
		}
		
	},
	afterSlideLoad: function(origin, destination, direction, trigger){
		console.log('%c afterSlideLoad', 'color: #3c3e41');
		customSlider.animationIsOn = false;
		fullpage_api.setAllowScrolling(true);

	},
	onLeave: function(origin, destination, direction, trigger){
		console.log('onLeave, destination', destination);
		// burgerWatcher(destination);
		videoSliderWatcher(destination);
		customSlider.animationIsOn = true;
		togglePopup(false);
		clearBannerFlow();
		titleWatcher(destination);
	},

});