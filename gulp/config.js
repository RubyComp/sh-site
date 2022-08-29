const srcPath = 'src';
const destPath = 'build';

const config = {
	src: {
		root: srcPath,
		less: `${srcPath}/less`,
		sass: `${srcPath}/sass`,
		pug: `${srcPath}/pug`,
		js: `${srcPath}/js`,
		res: `${srcPath}/resources`,
	},

	dest: {
		root: destPath,
		html: destPath,
		css: `${destPath}`,
		js: `${destPath}`,
		res: `${destPath}/resources`
	}
};

export default config;