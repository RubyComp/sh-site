const hideBannerFlow = () => {
	$('.banner__content').css('opacity', 0).css('transition', '0.5s');
}

const bannerFlow = () => {

	window.brakeHideBannerCounter = false;
	window.hideBannerCounter = 0;

	let timer = setInterval(function () {

		// console.log('counter', window.hideBannerCounter);

		if (window.brakeHideBannerCounter) {
			clearInterval(timer);
		}

		if (window.hideBannerCounter >= 1) {
			hideBannerFlow();
			clearInterval(timer);
		}

		window.hideBannerCounter++;

	}, 3000);
}

const clearBannerFlow = () => {
	setTimeout(() => {
		$('.banner__content').css('opacity', 'initial');
	}, 180);
	window.brakeHideBannerCounter = true;
}