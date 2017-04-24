var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleaner = require('gulp-clean-css');
var rename = require('gulp-rename');

// ... pathing variables
var input  = './src/**/*.scss';
var output = './dist';

// ... option variables
var sassOptions = {
 	errLogToConsole: true,
  	outputStyle: 'expanded'
};
var autoprefixerOptions = {
    browsers: [
	  	'last 2 versions', 
	  	'> 1%', 
	  	'Firefox ESR'
    ]
};
var cssCleanerOptions = {
	debug: true, 
	compatibility: 'ie8'
};

// ... task: sass
gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});

// ... task: watch
gulp.task('watch', function() {
  return gulp
    .watch(input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ',\n running task: "sass"...');
    });
});

// ... task: prod
gulp.task('prod', function () {
  return gulp
    .src(input)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cleaner(cssCleanerOptions, function(details) {
    	// output file stats
        console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(output));
});

// ... task: default
gulp.task('default', ['sass', 'watch']);
