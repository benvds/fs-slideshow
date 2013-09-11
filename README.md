# FS Slideshow

A minimal full screen slideshow jquery plugin intended for use in other
projects as a boilerplate or just as is.

characteristics:

 * easy to adjust
 * supports only newer browsers
 * css3 transitions
 * only one slideshow per page
 * manually trigger sliding

todo:

 * start at index
 * shallow controls: next, prev, play, pause

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
        $('.fs-slideshow).fsSlideshow();
    });
```
