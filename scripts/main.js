$(document).ready(function() {
    $('#burger').on('click', function() {
        $('body').toggleClass('menu-opened');
        console.log('Menu toggler placeholer');
    })
});


jQuery(function($) {

	$('#myContainer').fullpage({
		sectionsColor: ['#ff73a1', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff', '#ccc'],
		anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage'],
		menu: '#menu',
		slidesNavigation: true,
		scrollHorizontally: true,
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