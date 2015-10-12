var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var jade = require('gulp-jade');

var sass = require('gulp-sass');


var paths = {
  'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']

,
  'style': {
    all: './public/styles/**/*.scss',
    output: './public/styles/'
  }

};

// gulp Express
function startExpress() {

  var server = require('express');
  var app= express();
  app.use(express.static(__dirname));
  app.listen(4000);
}

gulp.task('default', function() {
  startExpress();
});


// gulp lint
gulp.task('lint', function(){
  gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
  gulp.src(paths.src)
    .pipe(watch())
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
});

gulp.task('watch:sass', function () {
  gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
  gulp.src(paths.style.all)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.style.output));
});

// gulp Jade
gulp.task('jade', function() {
  gulp.src('templates/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('templates/'))
});

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [

  'watch:sass',

  'watch:lint'
]);

gulp.task('default', ['watch', 'runKeystone']);
