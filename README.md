# FS Slideshow

A minimal full screen slideshow jquery plugin intended for use in other
projects as a boilerplate or just as is.

characteristics:

 * easy to adjust
 * supports only newer browsers
 * css3 transitions
 * only one slideshow per page
 * manually trigger sliding

# requirements

  * jquery

# usage

 * require jquery & fs-slideshow script
 * add markup for the content:

```html
    <ol class="fs-slideshow">
        <li>
            <img class="fs-bg" alt="Cairn" src="img/Cairn_by_Sylvain_Naudin.jpg">
            This is the first slide.
        </li>
        <li>
            <img class="fs-bg" alt="Green Plant" src="img/Green_Plant_by_Simon_Schlegl.jpg">
            This is the second slide.
        </li>
        <li>
            <img class="fs-bg" alt="H" src="img/H_by_Manuel_Sagredo.jpg">
            This is the third slide.
        </li>
    </ol>
```

 * add markup for the buttons (optional):

```html
    <div class="fs-prev">
        <a href="#">BACK</a>
    </div>
    <div class="fs-next">
        <a href="#">NEXT</a>
    </div>
```

 * initialize plugin

```javascript
    $(function() {
        $('.fs-slideshow').fsSlideshow();
    });
```

# arguments

 1. `slideIndex` _(Number)_: Show slide with index

```javascript
    // show 3rd slide
    $('.fs-slideshow').fsSlideshow(2);
```

 2. `next` _(String)_: Show next slide

```javascript
    $('.fs-slideshow').fsSlideshow('next');
```

 3. `prev` _(String)_: Show previous slide

```javascript
    $('.fs-slideshow').fsSlideshow('prev');
```

 4. `play [, timeout]` _(String, Number)_: Show next slide with an interval of `timeout` (default 5000ms)

```javascript
    $('.fs-slideshow').fsSlideshow('play');
    $('.fs-slideshow').fsSlideshow('play', 8000);
```

 5. `pause` _(String)_: Pause playback

```javascript
    $('.fs-slideshow').fsSlideshow('pause');
```
