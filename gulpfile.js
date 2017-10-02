'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var gulpTslint = require("gulp-tslint");
var tslint = require("tslint");

var webpack = require("webpack-stream");

var program = tslint.Linter.createProgram("./tsconfig.json");
var isDevelopment = false;

var paths = {
	root: '.',
	app: 'app',
	styles: 'app/assets/styles',
	css: 'app/css',
	icons: 'app/assets/icons/',
	lib: 'app/lib',
	build: 'build'
};

/**
 * Compile sass files to css.
 * Relies on: "gulp-sass".
 */
gulp.task('styles', function () {
	return gulp.src([
		paths.styles + '/styles.scss'
	])
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(paths.css));
});


gulp.task("tslint", function () {
	var sources = gulp.src([
		paths.app + '/app.ts',
		paths.app + '/**/*.ts'
	]);
    sources
        .pipe(gulpTslint({
            formatter: "verbose",
            program: program
        }))
        .pipe(gulpTslint.report())
});

/**
 * Adds vendor-prefixed CSS properties.
 * Relies on: "gulp-autoprefixer".
 */
gulp.task('autoprefixer', ['styles'], function () {
	return gulp.src([
		paths.css + '/styles.css'
	])
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest(paths.css));
});

/**
 * Watch changes in sass, icons and javascript files and reload.
 * Relies on: "gulp-watch".
 */
gulp.task('watch', function () {

	gulp.watch([
		paths.styles + '/**/*.scss',
		paths.app + '/**/*.ts'
	], ['build-ts','reload']);
	gulp.watch([
		paths.icons + '*.svg'
	], ['webfont','build-ts','reload']);
});

var runTimestamp = Math.round(Date.now()/1000);

/**
 * Adds vendor-prefixed CSS properties.
 * Relies on: "gulp-iconfont", "gulp-iconfont-css".
 */
gulp.task('webfont',function(){
	var fontName = 'icon-font';
	return gulp.src([paths.icons +'*.svg'])
		.pipe(iconfontCss({
			fontName: fontName,
			fontPath: paths.app + '/fonts/',
			targetPath: '/../'+paths.styles + 'libs/iconfont/_icon-font.scss'
		}))
		.pipe(iconfont({
			fontName: fontName,
			formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
			timestamp: runTimestamp,
			normalize: true
		 }))
		.pipe(gulp.dest('fonts'));
});

/**
 * Create a server with livereload and start.
 * Relies on: "gulp-connect".
 */
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

/**
 * Reloads the node server and the browser's tab.
 * Relies on: "gulp-connect".
 */
gulp.task('reload', function() {
	connect.reload();
});

/**
 * Minify and move compiled css to build path.
 * Relies on: "gulp-clean-css".
 */
gulp.task('build-styles', ['autoprefixer'], function() {
  return gulp.src([
      paths.css + '/styles.css',
    ])
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.build + '/css'));
});

gulp.task('run-webpack', function() {
	return gulp.src(paths.app + 'app.ts')
	.pipe(webpack(require('./webpack.config')))
	.pipe(gulp.dest(paths.build));
});

/**
 * Inject scripts and css in index.html and copy to build path
 * Relies on: "gulp-inject".
 */
gulp.task('build', ['tslint', 'run-webpack', 'build-styles'], function() {
	var sources = gulp.src([
	    paths.build + '/vendor*.js',
	    paths.build + '/app*.js',
		paths.build + '/css/styles*.css',
		
	], {
	    read: false // It's not necessary to read the files (will speed up things), we're only after their paths.
	});

	return gulp.src([
			paths.app + '/index.html'
		])
		.pipe(inject(sources, {
			addRootSlash: false, // ensures proper relative paths
      		ignorePath: paths.build + '/' // ensures proper relative paths
		}))
		.pipe(gulp.dest(paths.build));
});

/**
 * Default task, used for development.
 * Starts a server and watches for changes in order to validate it.
 */

gulp.task('default', function(){
	isDevelopment = true;
	runSequence(
		'webfont',
		'connect',
		'build',
		'watch'
	);
});