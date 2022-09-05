// console.log('Main js');

$(document).ready(function() {

/*
 * Burger
 */
$('#burger').on('click', function() {
	$('body').toggleClass('menu-opened');
	console.log('Menu toggler placeholer');
})

$('#timeline a').on('click', function() {
	$(this).closest('.time-line').find('li').removeClass('selected');
	$(this).closest('li').addClass('selected');
})


/*
 * Person popup placeholder
 */
$('.pirson-inter').on('click', function() {
	$('body').toggleClass('popupShowed');
});
$('.close-popup').on('click', function() {
	$('body').removeClass('popupShowed');
});



/*
 * Slider
 */

$('.paraslider-gui').on('click', function(e) {
	/*
	 * Dev only
	 */

	if (e.shiftKey) {
		$(this).removeClass('active');
		$(this).find('li').removeClass('selected');
	} else {
		$(this).addClass('active');	
	}
})

////

function setSlide(section, id) {
	fullpage_api.moveTo(section, id);
}

function toggleScrolbars(show) {
	if (show)
		$('.scrollbar').show();
	else
		$('.scrollbar').hide();
}

function selectGuiHeader(elem, val) {

	if (val) {
		const link = $(elem).find(`[data-value="${val}"]`)
		$(link).closest('ol').find('li').removeClass('selected');
		$(link).closest('li').addClass('selected');
		$(elem).addClass('active');

	} else {
		$(elem).find('.time-line li').removeClass('selected');
		$(elem).removeClass('active');

	}

}

function setScroll(elem, index) {
	const toddler = $(elem).find('.toddler');
	const ol = $(elem).find('ol > li');
	const count = $(ol).length;
	const width = 100 / count;

	$(toddler).css('transform', 'translateX(' + --index + '00%)');
	$(toddler).css('width', width + '%');
}

function selectGuiScroll(elem, val) {
	const scrollbar = $(elem).find('.scrollbar');
	setScroll(scrollbar, val);
}

function scrollBarHandler(li) {
	const bar = $(li).closest('.scrollbar');
	const val = $(li).index() + 1;
	setScroll(bar, val);
	setSlide('istorya', val);
}

$('.scrollbar li').on('click', function() {
	scrollBarHandler(this);
});

const timelineWatcher = (sectionId, slideId) => {

	const section = $(`[data-anchor="${sectionId}"]`);
	const gui = $(section).find('.paraslider-gui');

	if (gui.length != 1) return;

	const slide = $(`[data-anchor="${slideId}"]`);
	const parent = $(slide).data('parent');
	const index = $(slide).data('index');

	toggleScrolbars(!!slideId);
	selectGuiHeader(gui, parent);
	selectGuiScroll(gui, index);

}

function lockWatcher(data) {

	if ('skip' in data.item.dataset)
		fullpage_api.setAllowScrolling(false,'down');
		
}

function skipWatcher(event) {

	if (customSlider.animationIsOn) return;
	
	if (event.originalEvent.wheelDelta /120 < 0) {

		const slide = fullpage_api.getActiveSlide();

		if (slide && 'skip' in slide.item.dataset) {
			fullpage_api.moveSectionDown();
		}
	}
		
}

function insideSliderCheck(isFirst, item) {

	const cssClass = 'inside-slider'
	
	if (isFirst)
		$(item).removeClass(cssClass);
	else
		$(item).addClass(cssClass);
		
}

$('#wrapper').bind('mousewheel', function(e){
	skipWatcher(e);
});

$('.layer-next').on('click', function() {
	fullpage_api.moveSlideRight();
});


const customSlider = {

	prevSection: '111',
	prevSlide: '222',
	animationIsOn: false,

};

toggleScrolbars(false);

$('#main-content').fullpage({
	anchors: [
		'bojcovskij-klub',
		'istorya',
		'o-nas',
		'informaciya',
		'kontakty'
	],

	menu: '#menu',
	slidesNavigation: true,
	scrollHorizontally: true,
	controlArrows: false,
	slidesNavPosition: 'top',

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
	},
	afterLoad: function(origin, destination, direction, trigger){
		console.log('%c afterLoad', 'color: #3c3e41');
		// console.log(fullpage_api.getActiveSection(), fullpage_api.getActiveSlide());
		// insideSliderCheck();
		
	},
	afterSlideLoad: function(origin, destination, direction, trigger){
		console.log('%c afterSlideLoad', 'color: #3c3e41');
		customSlider.animationIsOn = false;
		fullpage_api.setAllowScrolling(true);

	},

});


/*
	* Timeline
	*/

// slide 

$('.to-slide-top').each(function() {

	const slide = $(this).closest('.section ');
	$(this).prependTo(slide);

});

});

