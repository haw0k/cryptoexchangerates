var syntax        = 'scss';

var gulp          = require('gulp'),
		// gutil         = require('gulp-util' ),
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		cleanCSS      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
  return gulp.src('app/scss/**/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      grid: false
    }))
    .pipe(cleanCSS()) // Опционально, закомментировать при отладке
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function() {
	return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/bootstrap/dist/bootstrap.bundle.min.js',
		'app/js/common.js', // Always at the end
    ])
    // .pipe(sourcemaps.write())
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('build', ['styles', 'js'], function () {

  var buildFiles = gulp.src([
    'app/*.html',
    'app/.htaccess',
  ]).pipe(gulp.dest('dist'));

  var buildCss = gulp.src([
    'app/css/main.min.css',
  ]).pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src([
    'app/js/scripts.min.js',
  ]).pipe(gulp.dest('dist/js'));

  var buildFonts = gulp.src([
    'app/fonts/**/*',
  ]).pipe(gulp.dest('dist/fonts'));

  var buildImages = gulp.src([
    'app/img/**/*',
  ]).pipe(gulp.dest('dist/img'));

});

gulp.task('default', ['watch']);
