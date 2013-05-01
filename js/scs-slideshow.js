/* TODO documentation
 * only newer browsers, css3, background-size: cover
 *
 */
(function() {

    'use strict';

    var sourceSelector = '.scs-slideshow',
        contentSelector = '.content',
        backgroundClass = 'scs-background',
        activeClass = 'active',

        // constructor
        Slideshow = function (element) {
            // source element for the slideshow
            this.$element = $(element);
            // background element holding the slides
            this.$background = $('<div class="' + backgroundClass + '"></div>').
                appendTo('body');
            // cache backgrounds for manipulation
            this.$backgrounds = $();
            // cache content for manipulation
            this.$contents = this.$element.find('> li > .content');

            this.initSlides();
            this.initButtons();
        };

    Slideshow.prototype = {
        // create slides, add to background
        'initSlides': function () {
            var src, slide, that = this;
            this.$element.find('img').each(function () {
                src = $(this).attr('src');
                slide = $('<div class="scs-slide"></div>').
                    css('backgroundImage', 'url(' + src + ')').
                    appendTo(that.$background);
                that.$backgrounds = that.$backgrounds.add(slide);
            });
        },

        // handle button clicks
        'initButtons': function (index) {
            $('.scs-prev').on('click', $.proxy(this.showPrev, this));
            $('.scs-next').on('click', $.proxy(this.showNext, this));
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
            // TODO explain why not caching current active
            this.$backgrounds.removeClass(activeClass);
            this.$contents.removeClass(activeClass);
            this.$backgrounds.eq(index).addClass(activeClass);
            this.$contents.eq(index).addClass(activeClass);
        }
    };

    $.fn.scsSlideshow = function (index) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('scsSlideshow');

            if (!data) {
                $this.data('scsSlideshow',
                           (data = new Slideshow(this)));
            }

            data.setActive(typeof index == 'number' ? index : 0);
        });
    };

    $.fn.scsSlideshow.Constructor = Slideshow;

    // document load
    $(function() {
        $(sourceSelector).scsSlideshow();
    });
})();
