console.log('Main js');

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

	console.log({
		section: sectionId, 
		slide: slideId
	});

	toggleScrolbars(!!slideId);

	// const sectionId = 'istorya';
	// const slideId = '1960-4';

	const section = $(`[data-anchor="${sectionId}"]`);
	const slide = $(`[data-anchor="${slideId}"]`);

	const parent = $(slide).data('parent');
	const index = $(slide).data('index');

	const gui = $(section).find('.paraslider-gui');

	if (gui.length != 1) {
		console.error('selectGuiScroll: GUI error');
		return; 
	}

	selectGuiHeader(gui, parent);
	selectGuiScroll(gui, index);

	console.log(index);

}

function lockWatcher(data) {

	if('skip' in data.item.dataset)
		fullpage_api.setAllowScrolling(false,'down right');
		
}

function skipWatcher(e) {

	console.log('window.slideAnimationIsOn', window.slideAnimationIsOn);
	

	if (e.originalEvent.wheelDelta /120 < 0 && !window.slideAnimationIsOn) {

		const slide = fullpage_api.getActiveSlide();

		if ('skip' in slide.item.dataset) {
			fullpage_api.moveSectionDown();
			fullpage_api.setAllowScrolling(true);
		}
	}
		
}

$('#wrapper').bind('mousewheel', function(e){
	skipWatcher(e);
});

$('.layer-next').on('click', function() {
	fullpage_api.moveSlideRight();
});

// function skipWatcher(data) {
// 	if('skip' in data) {

// 		fullpage_api.setAllowScrolling(false,'down right');
// 		console.log('Skip');

// 		$('#wrapper').bind('mousewheel', function(e){
// 			if(e.originalEvent.wheelDelta /120 < 0) {
// 				console.log('scrolling down!');
// 				fullpage_api.moveSectionDown();
// 				fullpage_api.setAllowScrolling(true);
// 			}
// 		});
// 	}
		
// }


// $('#history-bar li').on('click', function() {

// 	const bar = $(this).closest('.scrollbar');
// 	const ol = $(bar).find('ol > li');
// 	const toddler = $(bar).find('.toddler');

// 	const index = $(this).index();
// 	const count = $(ol).length;

// 	const width = 100 / count;

// 	console.log(index, count, width);
	
// 	$(toddler).css('transform', 'translateX(' + index + '00%)');
// 	$(toddler).css('width', width + '%');
// })

toggleScrolbars(false);

$('#main-content').fullpage({
	anchors: [
		'bojcovskij-klub',
		'istorya',
		'o-nas',
		'informaciya',
		'kontakty'
	],
	// anchors: [
	// 	'bojcovskij-klub',
	// 	'istorya',
	// 	'1960-1',
	// 	'1960-2',
	// 	'1960-3',
	// 	'1960-4',
	// 	'1960-5',
	// 	'1970-1',
	// 	'1970-2',
	// 	'1970-3',
	// 	'1970-4',
	// 	'1970-5',
	// 	'o-nas',
	// 	'informaciya',
	// 	'kontakty'
	// ],
	menu: '#menu',
	slidesNavigation: true,
	scrollHorizontally: true,
	controlArrows: false,
	slidesNavPosition: 'top',
	// navigation: false,
	// slidesNavigation: false,
	//scrollHorizontallyKey: 'YWx2YXJvdHJpZ28uY29tX01mU2MyTnliMnhzU0c5eWFYcHZiblJoYkd4NVNRcg==',
	// afterLoad: function(origin, destination, direction, trigger){
	// 	toggleScrolbars(false);
	// },
	afterSlideLoad: function(section, origin, destination, direction){
		window.slideAnimationIsOn = false;
		// console.log({
		// 	section: section,
		// 	origin: origin,
		// 	destination: destination,
		// 	direction: direction
		// });
		// console.log({
		// 	section: , 
		// 	destination: ,
		// });
		console.log('afterSlideLoad');
	
	},
	beforeLeave: function(origin, destination, direction, trigger){

		console.log('beforeLeave');
	// 	console.log({
	// 		origin: origin,
	// 		destination: destination,
	// 		direction: direction,
	// 		trigger: trigger,
	// 	});
	// },
	// onLeave: function(){
	// 	toggleScrolbars(false);
	},
	onSlideLeave: function(section, origin, destination, direction){
		window.slideAnimationIsOn = true;
		console.log('onSlideLeave');
		// console.log({
		// 	section: section,
		// 	origin: origin,
		// 	destination: destination,
		// 	direction: direction
		// });
		lockWatcher(destination);
		timelineWatcher(section.anchor, destination.anchor);
	}
});


/*
	* Timeline
	*/
// const timeLine = $('#timeline');
// const timeNav = $('[data-anchor="istorya"] .fp-slidesNav');
// const scrolbar = $('#history-bar');

// $(timeLine).prependTo(timeNav);
// $(scrolbar).prependTo(timeNav);
// $(timeNav).addClass('timeline-attached');

// const historyContainer = $('[data-anchor="istorya"]');
// const historyGui = $('#history-gui');
// $(historyGui).prependTo(historyContainer);

// slide 

$('.to-slide-top').each(function() {

	const slide = $(this).closest('.section ');
	$(this).prependTo(slide);

});

});

