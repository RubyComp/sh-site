$('.to-slide-top').each(function() {
	const slide = $(this).closest('.section');
	$(this).prependTo(slide);
});

$('.scroll').on('scroll', function(e) {
	// console.log('on.scroll');
	if (window.isScrollableSection && !window.animationIsOn) {
		checkScrollEnd(e.target);
	}
})


$('#wrapper').bind('wheel mousewheel', function(e){
	// console.log('mousewheel');
	scrollBlockWatcher(e.originalEvent.wheelDelta, true);
	skipWatcher(e);
});


$('#wrapper').on('swipeup',function (e,data){
	scrollBlockWatcher(-110);
});

$('#wrapper').on('swipedown',function (e,data){
	scrollBlockWatcher(110);
});

const form = '#main-form';

$(form).submit(function (event) {
	const formData = {
		name: $("#name").val(),
		email: $("#email").val(),
		phone: $("#phone").val(),
		age: $("#age").val(),
	};

	$.ajax({
		type: "POST",
		url: "process.php",
		data: formData,
		dataType: "json",
		encode: true,
	}).done(function (data) {
		console.log(data);

		let note = {};
		if (data.success) {
			// $(form).trigger('reset');
			const splashPlace = $(form).parent();
			note = {
				title: 'Заявка отправлена',
				text: 'В ближайшее время наш сотрудник свяжется с вами',
			}
			showSplash(splashPlace, form, note)

		} else {
			note = {
				text: 'Ошибка отправки формы',
				mode: 'fail'
			}
			showNote(note);
		}
	});

	event.preventDefault();
});

const selector = document.getElementById('phone');
Inputmask({'mask': '+9 (999) 999-9999'}).mask(selector);

});

// function onSubmit(token) {
// 	document.getElementById(form).submit();
// }