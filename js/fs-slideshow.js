(function() {

    'use strict';

    var backgroundImageClass = 'fs-bg',
        backgroundClass = 'fs-background',
        slideClass = 'fs-slide',
        activeClass = 'fs-active',
        defaults = {
            'shuffle': false,
            'autoPlay': true,
            'timeout': 5000
        },

        shuffle = function (original) {
            var slides = original.sort(function() {
                    return 0.5 - Math.random()
                });

            return slides;
        },

        // constructor
        FsSlideshow = function (element, options) {
            // source element for the slideshow
            this.$element = $(element);
            this.options = $.extend({}, defaults, options);
            // background element holding the slides
            this.$background = $('<div />').
                addClass(backgroundClass).
                appendTo('body');
            // cache backgrounds for manipulation
            this.$backgrounds = $();
            // cache content for manipulation
            this.$contents = this.$element.children();

            this.initSlides();
            this.initButtons();
        };

    FsSlideshow.prototype = {
        // create slides, add to background
        'initSlides': function () {
            var $this, $backgroundImg, src, slides = [], slide, that = this;

            this.$contents.each(function () {
                $this = $(this);

                // get the background image source
                $backgroundImg =
                    $this.children('.' + backgroundImageClass + ':first');
                src = $backgroundImg.attr('src');

                // add slide and set the background image
                slide = $('<div />').
                    addClass(slideClass).
                    css('backgroundImage', 'url(' + src + ')');
                    // appendTo(that.$background);

                // that.$backgrounds = that.$backgrounds.add(slide);
                slides.push(slide);
            });

            if (this.options.shuffle) {
                shuffle(slides);
            }

            for (var i = 0, l = slides.length; i < l; i ++) {
                var $s = slides[i];
                $s.appendTo(this.$background);
                that.$backgrounds = that.$backgrounds.add($s);
            }

            if (this.options.autoPlay) {
                this.play();
            }
        },

        // handle button clicks
        'initButtons': function (index) {
            $('.fs-prev').on('click', $.proxy(this.prev, this));
            $('.fs-next').on('click', $.proxy(this.next, this));
        },

        // index of the current active slide
        'curIndex': function() {
            return this.$background.find('.' + activeClass).index();
        },

        // equals given index that of the last slide
        'isFirstSlideIndex': function (index) {
            return index === 0;
        },

        // equals given index that of the last slide
        'isLastSlideIndex': function (index) {
            return this.$backgrounds.length === index + 1;
        },

        // reset timeout when slideshow is playing on changing slides
        'changeSlide': function (showFn) {
            if (typeof this.intervalId == 'undefined') {
                this[showFn]();
            } else {
                this.pause();
                this[showFn]();
                this.play();
            }
        },

        'prev': function () {
            this.changeSlide('showPrev');
        },

        'showPrev': function () {
                // cache current index
            var curIndex = this.curIndex(),
                // use last index if current index is the first
                nextIndex = this.isFirstSlideIndex(curIndex) ?
                    this.$backgrounds.length - 1 : curIndex - 1;

            this.setActive(nextIndex);
        },

        'next': function () {
            this.changeSlide('showNext');
        },

        'showNext': function () {
                // cache current index
            var curIndex = this.curIndex(),
                // use first index if current index is the last
                nextIndex = this.isLastSlideIndex(curIndex) ? 0 : curIndex + 1;

            this.setActive(nextIndex);
        },

        'setActive': function (index) {
            this.$backgrounds.removeClass(activeClass);
            this.$contents.removeClass(activeClass);
            this.$backgrounds.eq(index).addClass(activeClass);
            this.$contents.eq(index).addClass(activeClass);
        },

        'play': function (timeout) {
            var that = this;
            that.intervalId = window.setInterval(function() {
                that.showNext();
            }, timeout || this.options.timeout);
        },

        'pause': function () {
            window.clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    };

    $.fn.fsSlideshow = function () {
        var args = Array.prototype.slice.call(arguments);

        return this.each(function () {
            var $this = $(this),
                data = $this.data('fsSlideshow');

            if (!data) {
                $this.data('fsSlideshow',
                           (data = new FsSlideshow(this, args[0])));
            }

            if (!args.length || typeof args[0] === 'object') {
                // default to first slide
                data.setActive(0);
            } else if (typeof args[0] === 'number') {
                // use slide index if given
                data.setActive(args[0]);
            } else if (typeof args[0] === 'string') {
                // call method with given name, one argument is passed
                data[args[0]](args[1]);
            }
        });
    };
})();
