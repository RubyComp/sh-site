$(document).ready(function() {

const config = {
	'menu': 'menu-opened'
}

const videoControl = (action, param) => {

	const video = '#banner-video';
	const control = '#banner-video-control';

	switch(action) {
		case 'sound-on':
			$(video).prop('muted', false);
			$(`${control} .btn-sound-off`).show();
			$(`${control} .btn-sound-on`).hide();
			break
	
		case 'sound-off':
			$(video).prop('muted', true);
			$(`${control} .btn-sound-on`).show();
			$(`${control} .btn-sound-off`).hide();
			break
	
		case 'play':
			$(video).trigger('play');
			$(`${control} .btn-pause`).show();
			$(`${control} .btn-play`).hide();
			$(`${control} .btn-sound-on`).prop('disabled', false);
			$(`${control} .btn-sound-off`).prop('disabled', false);
			if (param != 'muted')
				videoControl('sound-on');
			break
	
		case 'pause':
			$(video).trigger('pause');
			$(`${control} .btn-play`).show();
			$(`${control} .btn-pause`).hide();
			$(`${control} .btn-sound-on`).prop('disabled', true);
			$(`${control} .btn-sound-off`).prop('disabled', true);
			break
	
		case 'init':
			videoControl('play', 'muted');
			videoControl('sound-off');
			$(control).show();
			break

	}
}
videoControl('init');

const videoSliderWatcher = (dest) => {
	const isVideo = $(dest.item).hasClass('auto-video');
	if (isVideo) {
		videoControl('play', 'muted');
	}
}

$('#banner-video-control .btn').on('click', (e) => {
	videoControl(e.currentTarget.dataset.action);
});
// video.sound.on();

const blackout = (active) => {
	$('#blackout').toggleClass('active', active);
}

const burgerMenu = (active) => {
	$('body').toggleClass(config.menu, active);
	blackout(active);
}

const burgerIcon = (show) => {
	$('#burger').toggleClass('burger_hide', !show);
}

const toggleBurgerMenu = () => {
	const opened = $('body').hasClass(config.menu);
	burgerMenu(!opened);
}

// const burgerWatcher = (dest) => { // disabled at new design
// 	burgerIcon(!dest.isFirst)
// 	burgerMenu(false);
// }

const showNote = (data) => {
	
	let classList = 'note note_togguble';

	if ('mode' in data && data.mode == 'success')
		classList += ' note_success';

	$("#item").attr('class', classList);
	$('#note .note__content').text(data.text);
	$('#note').show();
	
}
const hideNote = (note) => {
	$(note).hide();
}

$(document).keyup(function(e) {
	if (e.key === 'Escape') 
		burgerMenu(false);
});

$('#burger').on('click', () => toggleBurgerMenu() );
$('#mobile-burger').on('click', () => toggleBurgerMenu() );
$('#blackout').on('click', () => burgerMenu(false) );
$('.note_togguble').on('click', (e) => hideNote(e.currentTarget) );

const togglePopup = (show) => {
	$('body').toggleClass('popupShowed', show);
}

/*
 * Form submit placeholder
 */
$('[value="Записаться"]').on('click', (e) => {
	const note = {
		text: 'Заявка отправлена',
		mode: 'success'
	};
	showNote(note);
});

/*
 * Timeline placeholder
 */
$('#timeline a').on('click', function() {
	$(this).closest('.time-line').find('li').removeClass('selected');
	$(this).closest('li').addClass('selected');
})


/*
 * Person popup placeholder
 */
$('.person-inter').on('click', function() {
	togglePopup(true);
});
$('.close-popup').on('click', function() {
	togglePopup(false);
});


/*
 * Slider
 */

const setHistorySection = (e) => {
	const decade = e.target.attributes['data-value'].value;
	const section = fullpage_api.getActiveSection();
	setSlide(section.anchor, decade, 1);
}

$('#timeline a').on('click', function(e) {
	setHistorySection(e);
})

////

function setSlide(section, slideSection, id) {
	fullpage_api.moveTo(section, `${slideSection}-${id}`);
}

function toggleScrolbar(show) {
	$('.scrollbar').toggle(show);
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

function setScrollbarState(elem, index) {
	const toddler = $(elem).find('.toddler');
	const ol = $(elem).find('ol > li');
	const count = $(ol).length;
	const width = 100 / count;

	$(toddler).css('transform', 'translateX(' + --index + '00%)');
	$(toddler).css('width', width + '%');
}

function selectGuiScroll(elem, val) {
	const scrollbar = $(elem).find('.scrollbar');
	setScrollbarState(scrollbar, val);
}

function scrollBarHandler(li) {

	const bar = $(li).closest('.scrollbar');
	const val = $(li).index() + 1;
	const slide = fullpage_api.getActiveSlide();
	const slideSection = slide.item.attributes['data-parent'].value;

	setScrollbarState(bar, val);
	setSlide('istorya', slideSection, val);

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

	toggleScrolbar(!!slideId);
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

toggleScrolbar(false);

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
		
	},
	afterSlideLoad: function(origin, destination, direction, trigger){
		console.log('%c afterSlideLoad', 'color: #3c3e41');
		customSlider.animationIsOn = false;
		fullpage_api.setAllowScrolling(true);

	},
	onLeave: function(origin, destination, direction, trigger){
		console.log('destination', destination);
		// burgerWatcher(destination);
		videoSliderWatcher(destination);
		customSlider.animationIsOn = true;
		togglePopup(false);
	}
	// afterLoad: function(origin, destination, direction, trigger){
	// }

});

/*
 * Timeline
 */
$('.to-slide-top').each(function() {

	const slide = $(this).closest('.section');
	$(this).prependTo(slide);

});

});

