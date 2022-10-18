const bannerVideoId = 'banner-video';
const bannerVideo = '#' + bannerVideoId;

const aboutVideoId = 'about-video';
const aboutVideo = '#' + aboutVideoId;

const videoControl = (videoId, action, param) => {

	const video = '#' + videoId;
	const control = video + '-control';

	switch(action) {
		case 'sound-on':
			$(video).prop('muted', false);
			$(`${control} .btn-sound-off`).show();
			$(`${control} .btn-sound-on`).hide();
			break

		case 'sound-off':
			$(video).prop('muted', true);
			$(`${control} .btn-sound-on`).show();
			$(`${control} .btn-sound-off`).hide();
			break

		case 'play':
			$(video).trigger('play');
			$(`${control} .btn-pause`).show();
			$(`${control} .btn-play`).hide();
			$(`${control} .btn-sound-on`).prop('disabled', false);
			$(`${control} .btn-sound-off`).prop('disabled', false);
			if (param != 'muted') {
				videoControl(videoId, 'sound-on');
				// hideBannerFlow();
			}

			break

		case 'pause':
			$(video).trigger('pause');
			$(`${control} .btn-play`).show();
			$(`${control} .btn-pause`).hide();
			$(`${control} .btn-sound-on`).prop('disabled', true);
			$(`${control} .btn-sound-off`).prop('disabled', true);
			// clearBannerFlow();
			break

		case 'init':
			$(control).show();
			$(`${control} .btn-pause`).show();
			$(`${control} .btn-play`).hide();
			$(`${control} .btn-sound-off`).hide();

			videoControl(videoId, 'play', 'muted');
			
			$(`${control} .btn-sound-on`).prop('disabled', false);
			$(`${control} .btn-sound-off`).prop('disabled', false);

			break

	}
}

const setVideo = (itemId, file, format) => {
	const video = `${file}.${format}`
	$('#' + itemId).replaceWith(`<video id="${itemId}" class="banner__video" loop muted autoplay playsinline="true" disablePictureInPicture="true"><source src="${video}" type="video/${format}"></video>`)
	console.log(`Video #${itemId} is "${video}" now.`);
}

const videoMounting = (itemId, videoSizesAll, videoPath, format) => {
	let screenWidth = window.window.innerWidth;
	let screenHeight = window.window.innerHeight;
	let videoSize = '';

	let orientation = (window.window.innerWidth > window.window.innerHeight) ? 'horizontal' : 'vertical';
	let namePrefix = '';
	let screenSize;

	if (orientation == 'vertical' && videoSizesAll[1]) {
		screenSize = screenHeight;
		videoSizes = videoSizesAll[1];
		namePrefix = 'x';
	} else {
		screenSize = screenWidth;
		videoSizes = videoSizesAll[0];
	}

	videoSizes.some( (size) => {
		isGoodSize = size >= screenSize;
		videoSize = isGoodSize ? size : false;
		return isGoodSize;
	});

	if (!videoSize)
		videoSize = videoSizes[videoSizes.length - 1];

	const curVideo = `${videoPath}/${namePrefix}${videoSize}`;

	setVideo(itemId, curVideo, format);
}

const videoWatcher = () => {

	videoMounting(bannerVideoId, [[1280, 1920, 1921], [960, 1280, 1920]], 'resources/video/main-banner', 'mp4');
	videoMounting(aboutVideoId, [[1024, 1920]], 'resources/video/inside', 'mp4');

	videoControl(bannerVideoId, 'init');

}

// const videoSliderWatcher = (dest) => {
// 	const isVideo = $(dest.item).hasClass('auto-video');
// 	if (isVideo) {
// 		videoControl(bannerVideoId, 'play', 'muted');
// 	}
// }

$('#banner-video-control .btn').on('click', (e) => {
	videoControl(bannerVideoId, e.currentTarget.dataset.action);
});
