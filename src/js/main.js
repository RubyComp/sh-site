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

	// const timelinePrepare

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
	const timeLine = $('#timeline');
	const timeNav = $('[data-anchor="istorya"] .fp-slidesNav');
	
	$(timeLine).prependTo(timeNav);
	$(timeNav).addClass('timeline-attached');
});

