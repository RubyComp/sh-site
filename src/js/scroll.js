const scrollSlideWatcher = () => {

	const slide = fullpage_api.getActiveSlide();
	// debugger;

	if (slide) {

		const block = $(slide.item).find('.scroll');
		const scrollHeight = $(block).prop('scrollHeight');
		const innerHeight = $(block).innerHeight();
		const dif = innerHeight - scrollHeight;

		if (Math.abs(dif) > 2) {
	
			let isScrollable = 'scroll' in slide.item.dataset;

			window.isScrollableSection = isScrollable;
			fullpage_api.setAllowScrolling(!isScrollable);
	
			if (isScrollable) {
				const scrollBlock = $(slide.item).find('.scroll');
				if (scrollBlock.length > 0)
					checkScrollEnd(scrollBlock);
			}
		}

	} else {
		fullpage_api.setAllowScrolling(true);
	}

}

const scrollBlock = (block, scroll) => {

	const time = config.scroll.time;
	window.isBlockScroll = true;

	$(block).animate({ scrollTop: scroll }, time);

	setTimeout(() => {
		window.isBlockScroll = false;
	}, time);

}

const checkScrollEnd = (block) => {

	setTimeout(() => {

		$block = $(block);

		const scrollTop = $block.scrollTop();
		const innerHeight = $block.innerHeight();
		const scrollHeight = $block[0].scrollHeight;

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

		if (slide.isFirst)
			fullpage_api.moveSectionUp();
		else
			fullpage_api.moveSlideLeft();


	} else if (move == 'end' && wheel < 0) {

		if (slide.isLasr)
			fullpage_api.moveSectionDown();
		else
			fullpage_api.moveSlideRight();

	}

}

const scrollBlockWatcher = (wheel, useDefault) => {

	const slide = fullpage_api.getActiveSlide();

	if (window.isScrollableSection && !window.isBlockScroll && slide && !window.animationIsOn) {

		window.isBlockScroll = true;

		const block = $(slide.item).find('.scroll');
		const curScrollValue = $(block).scrollTop();

		let moveUnit;
		let move;

		if (useDefault) {
			moveUnit = config.scroll.value;
			move = (wheel < 0) ? moveUnit : -moveUnit;
		} else {
			move = -wheel;
		}

		const blockItem = block[0];

		if (blockItem) {

			const scrollEnd = ('dataset' in blockItem) ? blockItem.dataset.scroll : false;

			if (scrollEnd) {
				switchSlide(scrollEnd, wheel);
				window.isBlockScroll = false;
			}
			
			const pos = curScrollValue + move;
			// let move = curScrollValue;
			// move += (wheel < 0) ? moveUnit : -moveUnit;
			scrollBlock(block, pos);

		} else {
			window.isBlockScroll = false;
		}

	}
}
