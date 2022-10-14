/*
 * Form submit placeholder
 */
// $('[value="Записаться"]').on('click', function() {
// 	const note = {
// 		title: 'Cпасибо за заявку',
// 		text: 'В ближайшее время наш сотрудник свяжется с&nbsp;вами.',
// 		mode: 'success'
// 	};
// 	const form = $(this).closest('form');
// 	const formContainer = $(form).parent();
// 	// showNote(note);
// 	showSplash(formContainer, form, note);
// });

/*
 * Timeline placeholder
 */
$('#timeline a').on('click', function() {
	$(this).closest('.time-line').find('li').removeClass('selected');
	$(this).closest('li').addClass('selected');
})
