(function() {

    'use strict';

    var selector = '.scs-slideshow',
        backgroundSelector = '.scs-background',
        Slideshow = function (element) {
            this.$element = $(element);
            this.$background = $(backgroundSelector);
            this.slides = $();
        };

    Slideshow.prototype = {
        'addSlides': function () {
            var src, that = this;
            this.$element.find('img').each(function () {
                src = $(this).attr('src');
                that.slides = that.slides.add($('<div class="scs-slide"></div>').css('backgroundImage', 'url(' + src + ')').appendTo(that.$background));
            });
        },

        'setActive': function (index) {
            this.slides.removeClass('active');
            this.slides.eq(index).addClass('active');
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

            data.addSlides();
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
