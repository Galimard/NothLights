//подключение модуля галпа
var gulp = require('gulp'),
    sass = require('gulp-sass'), //Подключаем Sass пакет
    pug = require('gulp-pug'),
    concat = require('gulp-concat'), //объединение файлов
    autoprefixer = require('gulp-autoprefixer'), //авто префиксы
    cssnano = require('gulp-cssnano'), //Сжатие CSS-файлов
    uglify = require('gulp-uglify'), //минимизация js
    del = require('del'), //очищение папок от файлов
    browserSync = require('browser-sync').create(); //обновление браузера


/*---------------------------------преобразование pug---------------------------*/
gulp.task('pug', function buildHTML() {
    return gulp.src('app/**/*.pug')
        .pipe(pug({pretty: '\t'}))
        .pipe(gulp.dest('app')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});


/*---------------------------------преобразование scss-------------------*/
gulp.task('sass', function() { // Создаем таск Sass
    return gulp.src('app/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

var jsFiles = [ //файлы в том порядке, в котором должны быть добавлены в общий файл
    'app/js/script.js',
    'app/components/header.js'
];

// альтернатива 'app/js/libs/*.js'

/*------------------Сборка библиотек скриптов в один файл---------------------*/
gulp.task('scripts', function () {
    return gulp.src(jsFiles, {read: false, allowEmpty: true})

        // .pipe(concat('lib.js'))
        // .pipe(uglify({
        //     toplevel: true //максимальный уровень минификации
        // }))
        // .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/js/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync.init ({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.pug', gulp.parallel('pug')); // Наблюдение за pug файлами
    gulp.watch('app/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('app/**/*.js', gulp.parallel('scripts')); // Наблюдение за js файлами
    gulp.watch("app/*.html").on('change', browserSync.reload); //наблюдение за html файлами
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));