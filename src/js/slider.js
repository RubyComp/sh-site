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

	if (customSlider.animationIsOn) return;

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


const customSlider = {
	animationIsOn: false,
};

/**/

const scrollSlideWatcher = () => {

	const slide = fullpage_api.getActiveSlide();

	if (slide) {

		const scrollBlock = $(slide.item).find('.scroll');

		const scrollHeight = $(scrollBlock).prop('scrollHeight');
		const innerHeight = $(scrollBlock).innerHeight();
	
		const dif = innerHeight - scrollHeight;

		if (dif > 2 || dif < -2) {
	
			if ('scroll' in slide.item.dataset) {
				window.isScrollableSection = true;
				fullpage_api.setAllowScrolling(false);
			} else {
				window.isScrollableSection = false;
				fullpage_api.setAllowScrolling(true);
			}
	
		}
	}


}

const scrollBlock = (block, scroll) => {

	const time = config.scroll.time;

	$(block).animate({ scrollTop: scroll }, time);

	setTimeout(() => {
		window.isBlockScroll = false;
	}, time * 1.1);

}

const checkScrollEnd = (block) => {

	setTimeout(function() {

		const scrollTop = $(block).scrollTop();
		const innerHeight = $(block).innerHeight();
		const scrollHeight = $(block)[0].scrollHeight;

		let pos = '';

		if (scrollTop + innerHeight >= scrollHeight - 2) {
			pos = 'end';
		} else if (scrollTop === 0) {
			pos = 'start';
		}

		$(block).attr('data-scroll', pos);

	}, config.scroll.time);

}

const switchSlide = (move, wheel) => {

	const slide = fullpage_api.getActiveSlide();

	if (move == 'start' && wheel > 0) {

		if (slide.isFirst) {
			fullpage_api.moveSectionUp();
		} else {
			fullpage_api.moveSlideLeft();
		}

	} else if (move == 'end' && wheel < 0) {

		if (slide.isLasr) {
			fullpage_api.moveSectionDown();
		} else {
			fullpage_api.moveSlideRight();
		}
	}

}

const scrollBlockWatcher = (event) => {

	// console.log('scrollBlockWatcher');
	const slide = fullpage_api.getActiveSlide();

	if (window.isScrollableSection && !window.isBlockScroll && slide  && !window.animationIsOn) {

		window.isBlockScroll = true;
		// console.log('SCROLL');

		const curScrollBlock = $(slide.item).find('.scroll');
		const curScrollValue = $(curScrollBlock).scrollTop();
		const wheel = event.originalEvent.wheelDelta;
		const moveUnit = config.scroll.value;
		const block = curScrollBlock[0];

		if (block) {

			const scrollEnd = ('dataset' in block) ? block.dataset.scroll : false;

			if (scrollEnd) {
	
				switchSlide(scrollEnd, wheel);
				window.isBlockScroll = false;
	
			}
	
			let move = curScrollValue;
	
			if (wheel < 0) {
				move += moveUnit;
			} else {
				move -= moveUnit;
			}
	
			scrollBlock(curScrollBlock, move);
			// checkScrollEnd(curScrollBlock);
		} else {
			window.isBlockScroll = false;
		}


	}
}

toggleScrolbar(false);

/**/

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