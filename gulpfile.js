﻿var gulp = require('gulp');

// include the file app.js.map in the "bundle" output. 
// This can be used to debug the app in Chrome developer tools
var sourcemaps = require('gulp-sourcemaps');

var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');

var spawn = require('child_process').spawn;

gulp.task('copy', function () {
	// gulp.src(['app/css/*.css'])
 //    .pipe(gulp.dest('./prod/css'));
//	gulp.src(['app/index.html'])
//    .pipe(gulp.dest('./prod/'));
	// gulp.src(['app/libs/*.js'])
 //    .pipe(gulp.dest('./prod/js'));
   	// gulp.src(['app/legal/*'])
    // .pipe(gulp.dest('./prod/legal'));
   	// gulp.src(['app/styles/**/*'])
    // .pipe(gulp.dest('./prod/styles'));
})

// Rerun tasks whenever a file changes.
gulp.task('watch', function () {
	// gulp.watch(['app/css/*.css'], ['bundle', 'server']);
	gulp.watch(['app/**/*.js'], ['bundle', 'server']);
});

var node;
gulp.task('server', function () {
	if (node) node.kill();
	node = spawn('node', ['./server.js'], { stdio: 'inherit' });
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
});


gulp.task('server_dev', function () {
	if (node) node.kill();
	node = spawn('node', ['./server.js',"3000","dev"], { stdio: 'inherit' });
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
});



gulp.task('bundle', ['copy'], function () {
	return browserify({
		entries: 'app/app.js',
		debug: true,
	})
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./prod'));
})

gulp.task('default', ['bundle', 'watch', 'server']);
gulp.task('dev', ['bundle', 'watch','server_dev']);
