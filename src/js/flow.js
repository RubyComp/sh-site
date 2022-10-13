const blackout = (active) => {
	$('#blackout').toggleClass('active', active);
}

const burgerMenu = (active) => {
	$('body').toggleClass(config.menu, active);
	if (active) {
		setTitle({'type': 'phone'});
	} else {
		resetTitle();
	}
	blackout(active);
}

const burgerIcon = (show) => {
	$('#burger').toggleClass('burger_hide', !show);
}

const toggleBurgerMenu = () => {
	const opened = $('body').hasClass(config.menu);
	burgerMenu(!opened);
}

// const burgerWatcher = (dest) => { // disabled at new design
// 	burgerIcon(!dest.isFirst)
// 	burgerMenu(false);
// }

const showNote = (data) => {

	let classList = 'note note_togguble';

	if ('mode' in data && data.mode == 'success')
		classList += ' note_success';

	$("#item").attr('class', classList);
	$('#note .note__content').text(data.text);
	$('#note').show();
	
}

const showSplash = (place, hide, note) => {
	$(hide).hide();
	$(place).prepend(`
		<div class="splash">
			<div class="splash__title">${note.title}</div>
			<div class="splash__text">${note.text}</div>
		</div>
	`);
}

const hideNote = (note) => {
	$(note).hide();
}

$(document).keyup(function(e) {
	if (e.key === 'Escape')
		burgerMenu(false);
});

$('#burger').on('click',
	() => toggleBurgerMenu()
);

$('#mobile-burger').on('click',
	() => toggleBurgerMenu()
);

$('#blackout').on('click',
	() => burgerMenu(false)
);

$('.note_togguble').on('click',
	(e) => hideNote(e.currentTarget)
);

const togglePopup = (show, content) => {

	if (content) {
		$('#popup .popup__title h2').html(content.dt);
		$('#popup .popup__title p').html(content.dd);
		$('#popup .popup__text').html(content.text);
	}
	$('body').toggleClass('popupShowed', show);

}

$('#aside-menu .menu a').on('click', () => {
	burgerMenu(false);
})

/* */

$('.person-inter').on('click', function() {
	const text = $(this).find('.shadow-article').html();
	const dt = $(this).find('dt').html();
	const dd = $(this).find('dd').html();

	const content = {
		dt: dt,
		dd: dd,
		text: text,
	}
	togglePopup(true, content);
});
$('.close-popup').on('click', function() {
	togglePopup(false);
});
