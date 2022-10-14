const videoControl = (action, param) => {

	const video = '#banner-video';
	const control = '#banner-video-control';

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
				videoControl('sound-on');
				hideBannerFlow();
			}
			break
	
		case 'pause':
			$(video).trigger('pause');
			$(`${control} .btn-play`).show();
			$(`${control} .btn-pause`).hide();
			$(`${control} .btn-sound-on`).prop('disabled', true);
			$(`${control} .btn-sound-off`).prop('disabled', true);
			clearBannerFlow();
			break
	
		case 'init':
			videoControl('play', 'muted');
			videoControl('sound-off');
			$(control).show();
			break

	}
}

const setVideo = (item, file, format) => {
	const video = `${file}.${format}`
	$(item).replaceWith(`<video id="${item}" class="banner__video" loop muted autoplay poster><source src="${video}" type="video/${format}"></video>`)
	console.log(`Video ${item} is "${video}" now.`);
}

const videoMontage = (item, videoSizes, videoPath, format) => {
	let screenWidth = window.window.innerWidth;
	let videoSize = '';

	videoSizes.some( (size) => {
		isGoodSize = size >= screenWidth;
		videoSize = isGoodSize ? size : false;
		return isGoodSize;
	});

	if (!videoSize)
		videoSize = videoSizes[videoSizes.length - 1];

	const curVideo = `${videoPath}/${videoSize}`
	setVideo(item, curVideo, format);
}

// const videoMontage = () => {
// 	$('#placeholder_banner-video').html();
// }

const videoWatcher = () => {
	// videoMontage();
	videoMontage('#banner-video', [1280, 1920, 1921], 'resources/video/main-banner', 'mp4');
	videoMontage('#about-video', [1024, 1920], 'resources/video/inside', 'mp4');
}

const videoSliderWatcher = (dest) => {
	const isVideo = $(dest.item).hasClass('auto-video');
	if (isVideo) {
		videoControl('play', 'muted');
	}
}

$('#banner-video-control .btn').on('click', (e) => {
	videoControl(e.currentTarget.dataset.action);
});

videoControl('init');

const isMobile = window.mobileCheck();

if (!isMobile) videoControl('sound-on');