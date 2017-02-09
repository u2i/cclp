'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

// Load plugins
var $ = require('gulp-load-plugins')();

function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('styles', function() {
  var browsers = [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'Opera 12.1'
  ];
  return gulp.src('src/**/*.less')
    .pipe($.less({
      paths: ['bower_components']
    })
    .on('error', $.util.log))
    .on('error', onError)
    .pipe($.postcss([
        require('autoprefixer-core')({
          browsers: browsers
        })
      ]))
    .on('error', onError)
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
  gulp.src('./src/scripts/*.coffee')
    .pipe($.sourcemaps.init())
    .pipe($.coffee({bare: true}))
    .on('error', onError)
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./build/scripts'));
});

gulp.task('views', function(){
  return gulp.src([
      'src/views/*.pug'
    ])
    .pipe($.pug({
      pretty: true
    }))
    .on('error', onError)
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe($.imagemin({
      svgoPlugins: [{
        convertPathData: false
      }]
    }))
    .on('error', onError)
    .pipe(gulp.dest('build/images'));
});


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('watch', ['build'], function() {
  gulp.watch('src/**/*.less', ['styles']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/**/*.pug', ['views']);
  gulp.watch('src/**/*.coffee', ['scripts']);
  gulp.start('browser-sync');
});

gulp.task('selfcheck', function() {
  return gulp.src('gulpfile.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('clean', function(cb) {
  var del = require('del');
  del(['build'], cb);
});

gulp.task('build', ['styles', 'scripts', 'views', 'images']);

gulp.task('default', ['clean'], function() {
  gulp.start('watch');
});
