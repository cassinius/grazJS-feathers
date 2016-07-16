const gulp 						= require('gulp');
const clean 					= require('gulp-clean');
const mocha 					= require('gulp-mocha');
const babel           = require('gulp-babel');
const istanbul 				= require('gulp-istanbul');
const spawn           = require('child_process').spawn;

// Automatically executed in Mocha tests
require("babel-register");

// Child process for restarting server on change
var node;


//----------------------------
// PATHS
//----------------------------
const paths = {
  sources: ['src/**/*.js'],
  tests: ['test/**/*.js'],
  all: ['src/**/*.js', 'test/**/*.js'],
  clean: ['']
};


//----------------------------
// BABEL
//----------------------------
gulp.task('babel', [], function () {
  return gulp.src(paths.sources)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest("./dist/"));
});


//----------------------------
// RESTART SERVER
//----------------------------
gulp.task('server', ['babel'], function() {
  if (node) {
    node.kill();
  }

  node = spawn('node', ['./dist/index.js'], {
    stdio: 'inherit'
  });

  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});


//----------------------------
// TESTS
//----------------------------
gulp.task('test', [], function () {
  return gulp.src(paths.tests, {read: false})
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 60000
    }));
});


//----------------------------
// COVERAGE
//----------------------------
gulp.task('pre-cov-test', [], function () {
  return gulp.src(paths.sources)
    // Translate first
    .pipe(babel({
      presets: ['es2015']
    }))
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});


gulp.task('coverage', ['pre-cov-test'], function () {
  return gulp.src(paths.tests, {read: false})
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 60000
    }))
    .pipe(istanbul.writeReports());
    // .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});


//----------------------------
// MAIN TASKS
//----------------------------
gulp.task('default', function() {
  gulp.run('test');
  gulp.run('server');

  gulp.watch(paths.all, function() {
    gulp.run('test');
    gulp.run('server');
  });
});


// clean up if an error goes unhandled.
process.on('exit', function() {
  if (node) {
    node.kill();
  }
});
