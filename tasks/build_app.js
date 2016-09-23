'use strict'

var gulp = require('gulp')
var twig = require('gulp-twig')
var sass = require('gulp-sass')
var watch = require('gulp-watch')
var batch = require('gulp-batch')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var jetpack = require('fs-jetpack')
var bundle = require('./bundle')
var utils = require('./utils')

var projectDir = jetpack
var srcDir = jetpack.cwd('./src')
var destDir = jetpack.cwd('./app')

gulp.task('bundle', function () {
  return Promise.all([
    bundle(srcDir.path('background.js'), destDir.path('background.js')),
    bundle(srcDir.path('app.js'), destDir.path('app.js'))
  ])
})

gulp.task('js', function () {
  return gulp.src(srcDir.path('js/*.js'))
    .pipe(concat('script.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(destDir.path('dist/js')))
})

gulp.task('sass', function () {
  return gulp.src(srcDir.path('stylesheets/*.scss'))
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(destDir.path('dist/stylesheets')))
})

gulp.task('templates', function () {
  gulp.src(srcDir.path('templates/*.twig'))
    .pipe(twig())
    .pipe(gulp.dest(destDir.path()))
})

gulp.task('environment', function () {
  var configFile = 'config/env_' + utils.getEnvName() + '.json'
  projectDir.copy(configFile, destDir.path('env.json'), { overwrite: true })
})

gulp.task('watch', function () {
  var beepOnError = function (done) {
    return function (err) {
      if (err) {
        utils.beepSound()
      }
      done(err)
    }
  }

  watch('src/**/*.js', batch(function (events, done) {
    gulp.start('bundle', beepOnError(done))
  }))
  watch('src/js/*.js', batch(function (events, done) {
    gulp.start('js', beepOnError(done))
  }))
  watch('src/**/*.twig', batch(function (events, done) {
    gulp.start('templates', beepOnError(done))
  }))
  watch('src/**/*.scss', batch(function (events, done) {
    gulp.start('sass', beepOnError(done))
  }))
})

gulp.task('build', ['bundle', 'js', 'sass', 'templates', 'environment'])
