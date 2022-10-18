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
		fullpage_api.setAllowScrolling(false, 'down');

}

function skipWatcher(event) {

	// if (customSlider.animationIsOn) return;

	if (event.originalEvent.wheelDelta / 120 < 0) {

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

$('.layer-next').on('click', function() {
	fullpage_api.moveSlideRight();
});


// const customSlider = {
// 	animationIsOn: false,
// };

toggleScrolbar(false);