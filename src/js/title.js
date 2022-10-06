const getSectionTitle = (section) => {
	return section.item.attributes['data-title'] || false
}

const setTitle = (titleInfo) => {

	titleHtml = '';

	if (titleInfo.type == 'phone') {
		titleHtml = '<a class="phone" href="tel:+74951234567">+7 495 123-45-67</a>'
	} else {
		titleHtml = titleInfo.html;
	}

	$('#title').html(titleHtml);

}
const titleWatcher = (section) => {

	const title = getSectionTitle(section);
	let titleInfo = '';

	if (title) {
		titleInfo = {'html': title.value}
	} else {
		titleInfo = {'type': 'phone'}
	}
	
	setTitle(titleInfo);
}
const resetTitle = () => {
	const curSection = fullpage_api.getActiveSection();
	titleWatcher(curSection);
}