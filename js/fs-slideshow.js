(function() {

    'use strict';

    var backgroundImageClass = 'fs-bg',
        backgroundClass = 'fs-background',
        slideClass = 'fs-slide',
        activeClass = 'fs-active',

        // constructor
        FsSlideshow = function (element) {
            // source element for the slideshow
            this.$element = $(element);
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
            var $this, $backgroundImg, src, slide, that = this;

            this.$contents.each(function () {
                $this = $(this);

                // get the background image source
                $backgroundImg =
                    $this.children('.' + backgroundImageClass + ':first');
                src = $backgroundImg.attr('src');

                // add slide and set the background image
                slide = $('<div />').
                    addClass(slideClass).
                    css('backgroundImage', 'url(' + src + ')').
                    appendTo(that.$background);

                that.$backgrounds = that.$backgrounds.add(slide);
            });
        },

        // handle button clicks
        'initButtons': function (index) {
            $('.fs-prev').on('click', $.proxy(this.showPrev, this));
            $('.fs-next').on('click', $.proxy(this.showNext, this));
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

        'showPrev': function () {
                // cache current index
            var curIndex = this.curIndex(),
                // use last index if current index is the first
                nextIndex = this.isFirstSlideIndex(curIndex) ?
                    this.$backgrounds.length - 1 : curIndex - 1;

            this.setActive(nextIndex);
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
        }
    };

    $.fn.fsSlideshow = function (index) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('fsSlideshow');

            if (!data) {
                $this.data('fsSlideshow',
                           (data = new FsSlideshow(this)));
            }

            data.setActive(typeof index == 'number' ? index : 0);
        });
    };
})();
