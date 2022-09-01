console.log('Main js');

$(document).ready(function() {

	/*
	 * Burger
	 */
	$('#burger').on('click', function() {
			$('body').toggleClass('menu-opened');
			console.log('Menu toggler placeholer');
	})

	/*
	 * Slider
	 */
	const timelineWatcher = (data) => {
		console.log('data.anchor', data.anchor);
		
		if (data.anchor == '1960') {
			console.log('Test lock');
			// $.fn.fullpage.setAllowScrolling(false);
		}

	}

	$('.paraslider-gui').on('click', function(e) {
		/*
		 * Dev only
		 */

    if (e.shiftKey) {
			$(this).removeClass('active');
			$(this).find('li').removeClass('active');
		} else {
			$(this).addClass('active');	
		}
	})

	$('#history-bar li').on('click', function() {

		const bar = $(this).closest('.scrollbar');
		const ol = $(bar).find('ol > li');
		const toddler = $(bar).find('.toddler');

		const index = $(this).index();
		const count = $(ol).length;

		const width = 100 / count;

		console.log(index, count, width);
		
		$(toddler).css('transform', 'translateX(' + index + '00%)');
		$(toddler).css('width', width + '%');
	})

	$('#timeline a').on('click', function() {
		$(this).closest('.history__time-line').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
	})



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
		afterSlideLoad: function(section, origin, destination, direction){
			console.log({
				section: section,
				origin: origin,
				destination: destination,
				direction: direction
			});
		},
		onSlideLeave: function(section, origin, destination, direction){
			console.log({
				section: section,
				origin: origin,
				destination: destination,
				direction: direction
			});
			timelineWatcher(destination);
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

