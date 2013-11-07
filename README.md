Responsive-Font
===============

Calculate font-size depending on the window size.

##What it does

Responsive font is a common problem for web designer.  Having the font size to adapt the screen without using multiple media queries is nearly impossible, not without JavaScript. This plugin will adapt the font based on the different points/sizes you will set. 

##How to use
You will surely need to link the `rfont-version.js` or `rfont-version.min.js` file in the head of the document. No other libraries are needed.

You don’t need to wait for the DOM to be ready and it this plugin can be overridden by your CSS files.
###First step

At first, you’ll want to determine what are your break point and the size you wish your font size is. Responsive Font will calculate the font-size depending on those points. If, for example you set a breakpoint at `1000px` with a font size of `12px` and a breakpoint at `2000px` with a font size of  `20px`, the font size will be `16px` if the window width is `1500px`. 

###How it is applied

Responsive Font will create a `style` tag when used. That way, any CSS selector can be used, but you need to check the browser compatibility yourself. So to add a CSS rule, you need to write this:

    rf(‘div, p’)

This will apply Responsive Font on every `div` and `p` tag, just like CSS. However there are no break points set yet, you’ll need to use `.setQueryPoint()`.

    rf(‘div, p’).setQueryPoint({
        1000 : 12, //{width : font-size}
        2000 : 20
    })

Unlimited amount of query point can be set. In this example, if the window width is `<=1000`, the font size will be `12px` and if the width is `>=2000`, it will be `20px`. Between those 2 points, Responsive font will calculate the value.

###A good practice

One of the best ways to use this plugin is to set a responsive width on the `body` and then use only relative font size. This is the best practice and has a huge performance gain.

###Example

Check out this [jsFiddle](http://jsfiddle.net/tfT9L/embedded/result/) to see it in action!

##List of all methods and options

    //Here a list of all options

	/*********************

	rf.value 			= 'px'; 	==> (string : Every CSS font-size proportie value) The size value the font will have.
	rf.throttle 		= false; 	==> (true|false) Performance option: calculate on window resize or X ms after the window resize is done
	rf.throttleDelay 	= 500;		==> (integer) [if throttle == true] Time before calculating the new size after window resize
	rf.override 		= false;	==> (true|false) If true, will add !important, else It will be based on CSS override

	Options can be changed manually like that:

	rf.value = '%'; //Example

	or with rf.options() like that :

	rf.options({
		value : 'px',
		throttle : true,
		throttleDelay : 1000,
		override = true
	});

	*********************/

	//Methods list

	/*********************

	rf('selector')
		==> 'selector' = CSS rules Resposive Font will be applied
		==> Create a new CSS tag
		==> return cssFile

	rf.allObj(callback(index, obj cssFile))
		==> callback 	= function run for each cssFile [this == cssFile]
		==> index 		= current index of the cssFile object
		==> cssFile 	= current cssFile (can be accessed by this)
		==> Loop through all object running a function

	cssFile.changeSelector('selector')
		==> 'selector' = CSS rules Resposive Font will be applied
		==> Change the old selector by a new one
		==> return cssFile

	cssFile.setQueryPoint({width : value[, width : value, ...]})
		==> width = (integer) the mediaqueries break point in px
		==> value = (integer) the font size
		==> Create your query points and set your font size
		==> return cssFile

	cssFile.fontValue([value])
		==> value = (string : Every CSS font-size proportie value) the size value the font will have.
		==> set or return the current font size value
		==> [if value === undefined] return cssFile.value
		==> [if value !== undefined] return cssFile

	cssFile.update()
		==> manually update font size value
		==> return cssFile

	cssFile.remove()
		==> delete the cssFile object and Responsive Font styles
		==> return void

	cssFile.isImportant(value)
		==> value = (true|false) is the style overriding with !important
		==> Set !important on the style or let the CSS override do its job
	*********************/

*__Note:__ English not being my native language, feel free to correct any misstake*
