const headerHandler = (anchor) => {
	// console.log('headerHandler', anchor);

	const listItems = '#main-header .menu > li';
	const select = 'selected';

	$(`${listItems}`).removeClass(select);
	$(`${listItems} > a[href=\"/#${anchor}\"]`).closest('li').addClass(select);

}