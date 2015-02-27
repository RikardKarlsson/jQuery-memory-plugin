jQuery memory plugin
====================
A memory that is easy to add to a webpage.

###Features

* Select your own images. Both front and back images.
* Select number of pairs.
* Style the static apperance as you like, using CSS.
* Add as many memories ta a page as you wish. Each can be styled and configured individually.

###Limitations

* Only possible to have identical pictures in a pair.
* Not possible to select transitions when cards are turned over.

Documentation
-------------
**.memory([options])**

`options` is an object where the number of pairs can be specified. Object code follows.

    {'noPairs': 8}

The memory is appended to the selected tag as a child.

Styling is needed.

For more details see below.

Installation instructions
-------------------------

[A fully functional web page with a memory added.](https://github.com/RikardKarlsson/jQuery-memory-plugin)

The following steps are required.

###1. Add a tag to be selected using [jQuery](http://jquery.com).
Add a div-tagg to the web page. Set a class or id on that tag. Example code.

    <div class='memory'></div>

###2. [Download the jQuery memory plugin JavaScript](https://github.com/RikardKarlsson/jQuery-memory-plugin/blob/master/jquery-memory-plugin.js)
to the folder containing the HTML file.

###3. [Download the main.js JavaScript](https://github.com/RikardKarlsson/jQuery-memory-plugin/blob/master/main.js)
to the same folder as the plugin. The file content is diplayed below.

    $(document).ready(function () {
        'use strict';
        $('.memory').memory({'noPairs': 8});
    });

To change the number of pairs used change the number 8 to the desired number of pairs.

###4. Add JavaScripts to the HTML file.
Place the script tags emidiately before the body end tag. The first line below adds jQuery from Google. The second line adds the memory plugin JavaScript. The third line adds the script that adds the memory to all tags with a class named memory.

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="jquery-memory-plugin.js"></script>
    <script src="main.js"></script>

###5. [Download the style sheet](https://github.com/RikardKarlsson/jQuery-memory-plugin/blob/master/style.css)
to the same folder as the other files. Comments on configuration can be found in the stylesheet.

Information needed to style it.
------------------------------
The example used above creats the following DOM.

    <div class="memory">
        <div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
            <div class="back"></div>
        </div>
    </div>

Or the following when all cards are turned face up.

    <div class="memory">
        <div>
            <div class="card-no-2" ></div>
            <div class="card-no-1" ></div>
            <div class="card-no-7" ></div>
            <div class="card-no-3" ></div>
            <div class="card-no-7" ></div>
            <div class="card-no-5" ></div>
            <div class="card-no-4" ></div>
            <div class="card-no-0" ></div>
            <div class="card-no-1" ></div>
            <div class="card-no-6" ></div>
            <div class="card-no-3" ></div>
            <div class="card-no-6" ></div>
            <div class="card-no-5" ></div>
            <div class="card-no-4" ></div>
            <div class="card-no-2" ></div>
            <div class="card-no-0" ></div>
        </div>
    </div>

Images are displayed as CSS background images.





