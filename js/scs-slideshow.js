(function() {

    'use strict';

    var selector = '.scs-slideshow',
        backgroundSelector = '.scs-background',
        contentSelector = '.content',

        Slideshow = function (element) {
            this.$element = $(element);
            this.$background = $(backgroundSelector);
            this.$backgrounds = $();
            this.$contents = this.$element.find('> li > .content');

            this.addSlides();
            this.addButtons();
        };

    Slideshow.prototype = {
        'addSlides': function () {
            var src, slide, that = this;
            this.$element.find('img').each(function () {
                src = $(this).attr('src');
                slide = $('<div class="scs-slide"></div>').
                    css('backgroundImage', 'url(' + src + ')').
                    appendTo(that.$background);
                that.$backgrounds = that.$backgrounds.add(slide);
            });
        },

        // move buttons inside the $background so aligns to middle
        'addButtons': function (index) {
            var $next = $('.scs-next'),
                $prev = $('.scs-prev');

            $next.on('click', $.proxy(this.showNext, this));
            $prev.on('click', $.proxy(this.showPrev, this));
        },

        'isLastSlide': function (index) {
            return this.$backgrounds.length === index+ 1;
        },

        'showPrev': function () {
            var curIndex = this.$background.find('.active').index(),
                nextIndex = curIndex === 0 ?
                    this.$backgrounds.length - 1 : curIndex - 1;

            this.setActive(nextIndex);
        },

        'showNext': function () {
            var curIndex = this.$background.find('.active').index(),
                nextIndex = this.isLastSlide(curIndex) ? 0 : curIndex + 1;

            this.setActive(nextIndex);
        },

        'setActive': function (index) {
            this.$backgrounds.removeClass('active');
            this.$contents.removeClass('active');
            this.$backgrounds.eq(index).addClass('active');
            this.$contents.eq(index).addClass('active');
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
        console.timeStamp('DOCUMENT LOADED!');
        $(selector).scsSlideshow();
    });
})();
