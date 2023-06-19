const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Define the paths for your SCSS and CSS files
const scssPath = 'assets/scss/**/*.scss';
const cssPath = 'assets/css';

// Create a task to compile SCSS into CSS
gulp.task('sass', function() {
  return gulp.src(scssPath)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest(cssPath));
});

/* This code defines a Gulp task named "minify-css" that minifies and concatenates all CSS files in the "css" directory, then saves the result as "style.min.css" in the "dist/css" directory. The task uses the "gulp-clean-css" and "gulp-concat" plugins to achieve this. */
gulp.task('minify-css', () => {
  return gulp.src('assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'));
});

/* This code defines a Gulp task named "minify-js" that concatenates all JavaScript files in the "js" directory, then saves the result as "script.min.js" in the "dist/js" directory. The task uses the "gulp-concat" plugin to achieve this. */
gulp.task('minify-js', () => {
  return gulp.src('js/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

/* This code defines a Gulp task named "watch" that watches for changes to SCSS, CSS, and JavaScript files. Whenever a change is detected, it triggers the corresponding task to run. Specifically, it watches for changes to the SCSS files defined in the `scssPath` variable and runs the "sass" task, watches for changes to CSS files in the "assets/css" directory and runs the "minify-css" task, and watches for changes to JavaScript files in the "js" directory and runs the "minify-js" task. */
gulp.task('watch', () => {
  // Watch for changes to SCSS files
  gulp.watch(scssPath, gulp.series('sass'));
  // Watch for changes to CSS files
  gulp.watch('assets/css/*.css', gulp.series('minify-css'));
  // Watch for changes to JavaScript files
  gulp.watch('js/*.js', gulp.series('minify-js'));
});

// Create a default task that runs the 'sass' and 'watch' tasks
gulp.task('default', gulp.parallel('sass', 'watch', 'minify-css', 'minify-js'));
