/*
 * Form submit placeholder
 */
$('[value="Записаться"]').on('click', function() {
	const note = {
		text: 'Заявка отправлена',
		mode: 'success'
	};
	const form = $(this).closest('form');
	const formContainer = $(form).parent();
	// showNote(note);
	showSplash(formContainer, form, note);
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
