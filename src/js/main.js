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
	// anchors: [
	// 	'bojcovskij-klub',
	// 	'istorya',
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
		// console.log('afterSlideLoad');
		
	},
	// onLeave: function(){
	// 	toggleScrolbars(false);
	// },
	onSlideLeave: function(section, origin, destination, direction){
		// console.log({
		// 	section: section,
		// 	origin: origin,
		// 	destination: destination,
		// 	direction: direction
		// });
		// console.log('onSlideLeave');
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

const historyContainer = $('[data-anchor="istorya"]');
const historyGui = $('#history-gui');
$(historyGui).prependTo(historyContainer);

});

