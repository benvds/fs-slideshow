(function() {

    'use strict';

    var backgroundImageClass = 'fs-bg',
        backgroundClass = 'fs-background',
        slideClass = 'fs-slide',
        activeClass = 'fs-active',
        defaults = {
            'shuffle': false,
            'autoPlay': true,
            'timeout': 5000,
            'startIndex': 0
        },

        // clone and shuffle an array
        shuffle = function (original) {
            return original.slice().sort(function() {
                return 0.5 - Math.random();
            });
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

            this.createSlides();
            this.setSlidesOrder();
            this.initButtons();

            if (this.options.autoPlay) {
                this.play();
            }
        };

    FsSlideshow.prototype = {
        // create slides, add to background
        'createSlides': function () {
            var $this, $backgroundImg, src, $slide, that = this;

            this.$contents.each(function () {
                $this = $(this);

                // get the background image source
                $backgroundImg =
                    $this.children('.' + backgroundImageClass + ':first');
                src = $backgroundImg.attr('src');

                // add slide and set the background image
                $slide = $('<div />').
                    addClass(slideClass).
                    css('backgroundImage', 'url(' + src + ')');

                $slide.appendTo(that.$background);
                that.$backgrounds = that.$backgrounds.add($slide);
            });
        },

        // handle button clicks
        'setSlidesOrder': function () {
            var index = -1, length = this.$backgrounds.length;

            // order of the slides
            this.orderIndex = this.options.startIndex;
            this.slidesOrder = [];

            // add slide indexes in order
            while (++index < length) {
                this.slidesOrder.push(index);
            }

            if (this.options.shuffle) {
                this.slidesOrder = shuffle(this.slidesOrder);
            }
        },

        // handle button clicks
        'initButtons': function (index) {
            $('.fs-prev').on('click', $.proxy(this.prev, this));
            $('.fs-next').on('click', $.proxy(this.next, this));
        },

        // index of the slide for order index or the current order index
        'slideIndex': function(orderIndex) {
            return this.slidesOrder[orderIndex || this.orderIndex];
        },

        'decreaseOrderIndex': function () {
            if (this.orderIndex > 0) {
                this.orderIndex--;
            } else {
                this.orderIndex = this.slidesOrder.length - 1;
            }
        },

        'increaseOrderIndex': function () {
            if (this.orderIndex === this.slidesOrder.length - 1) {
                this.orderIndex = 0;
            } else {
                this.orderIndex++;
            }
        },

        // reset timeout when slideshow is playing on changing slides and call
        // the show function
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
            this.decreaseOrderIndex();
            this.setActive();
        },

        'next': function () {
            this.changeSlide('showNext');
        },

        'showNext': function () {
            this.increaseOrderIndex();
            this.setActive();
        },

        'setActive': function (index) {
            this.$backgrounds.removeClass(activeClass);
            this.$contents.removeClass(activeClass);
            this.$backgrounds.eq(this.slideIndex(index)).addClass(activeClass);
            this.$contents.eq(this.slideIndex(index)).addClass(activeClass);
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
