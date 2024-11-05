import { src, dest, watch, series, parallel } from 'gulp';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import { deleteAsync } from 'del';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import stripDebug from 'gulp-strip-debug';

const paths = {
	styles: {
		src: 'src/assets/css/**/*.css',   
		dest: 'assets/styles/'       
	},
	scripts: {
		src: 'src/**/*.js',
		dest: 'assets/scripts/'       
	}
};

export const clean = async () => await deleteAsync(['assets']);

export function styles() {
	return src(paths.styles.src)
		.pipe(sourcemaps.init())              
		.pipe(cleanCSS())                      
		.pipe(concat('main.min.css'))          
		.pipe(sourcemaps.write('.'))          
		.pipe(dest(paths.styles.dest));      
}

export function scripts() {
	return src(paths.scripts.src, { sourcemaps: true })
		.pipe(sourcemaps.init())              
		.pipe(uglify())  
		.pipe(stripDebug())                      
		.pipe(concat('main.min.js'))          
		.pipe(sourcemaps.write('.'))          
		.pipe(dest(paths.scripts.dest));      
}

export function watchFiles() {
	watch(paths.styles.src, styles);
	watch(paths.scripts.src, scripts);
}

export const build = series(clean, parallel(styles, scripts));

export default build;
