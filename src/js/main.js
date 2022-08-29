console.log('Main js');

$(document).ready(function() {
	$('#burger').on('click', function() {
			$('body').toggleClass('menu-opened');
			console.log('Menu toggler placeholer');
	})
});

jQuery(function($) {
	$('#main-content').fullpage({
		// sectionsColor: ['#ff73a1', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff', '#ccc'],
		anchors: ['bojcovskij-klub', 'istorya', 'o-nas', 'informaciya', 'kontakty'],
		menu: '#menu',
		slidesNavigation: true,
		scrollHorizontally: true,
		controlArrows: false,
		navigation: false,
		slidesNavigation: false,
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
		}
	});
});