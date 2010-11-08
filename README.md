YouTube Auto Wait
=================

Auto Wait is a Chrome extension for adding a little sanity to YouTube videos. If you have a YouTube video playing and open any additional ones, the original video will continue playing, but the others will be paused for you.

Different players
-----------------

If you have HTML5 videos enabled on YouTube, when the video is paused or finishes playing, any additional videos you open up will continue to autoplay as usual. If you close the window while the video is still playing, that's okay too!

If you're using the regular Flash YouTube player, the autoplay switch will only be re-enabled when you close the tab it's playing in.

If you can, [go with HTML5](http://www.youtube.com/html5).

**Not thoroughly tested!**

How to use
----------

If you'd like to get the extension installed locally, you can follow step 4 of the [Getting Started guide](http://code.google.com/chrome/extensions/getstarted.html) on the Google Code website, and use the `src/` directory as the extension directory.

Issues
------

### Flash player

* SetTimeout is currently used for the Flash player, because pauseVideo isn't accessible until the player has fully loaded up. Suffice to say this is a mediocre solution.

* The extension is not very smart for the Flash version of the player.

Currently there's no event listening -- unlike the HTML5 version -- and it's assumed that the window will be closed when the video has finished playing, which is not good enough. Attempts were made to use video.addEventListener() from within the .js file but I suspect that something more involved is needed, in order to get the extension and the exposed YouTube player API linked together.

TODO
----

* Possibly queue up the paused videos and then autoplay them when the tab gains focus.

Contributing
------------

Fork!

License
-------

Copyright (c) 2010 Adam Prescott, licensed under the MIT License, readable in `LICENSE`.