const getSectionTitle = (section) => {
	return section.item.attributes['data-title'] || false
}

const setTitle = (titleInfo) => {

	let titleHtml = '';

	if (titleInfo.type == 'phone') {
		titleHtml = config.phoneLinkHtml
	} else {
		titleHtml = titleInfo.html;
	}

	$('#title').html(titleHtml);

}

const titleWatcher = (section) => {

	const title = getSectionTitle(section);
	let titleInfo = {};

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