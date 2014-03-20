/*!
 * Responsive Font - version 1.1 2014-02-07
 * Follow me on twitter : https://twitter.com/gagnon_KA
 *
 * Copyright (c) 2013 Karl-André Gagnon
 * GIT hub project page : https://github.com/kagagnon/Responsive-Font/
 * 
 * Not compatibility tested yet (Work in IE8, firefox, chrome, safari...)
 * Post every compatibility error on the GIT project page
 */

//Here a list of all options

/*********************

rf.value 		= 'px'; 	==> (string : Every CSS font-size proportie value) The size value the font will have.
rf.throttle 		= false; 	==> (true|false) Performance option: calculate on window resize or X ms after the window resize is done
rf.throttleDelay 	= 500;		==> (integer) [if throttle == true] Time before calculating the new size after window resize
rf.override 		= false;	==> (true|false) If true, will add !important, else It will be base on CSS override

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

	(function(context){
	//Prototype used in this plugin
	//IE compatible
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (searchElement , fromIndex) {
			var i,
			pivot = (fromIndex) ? fromIndex : 0,
			length;

			if (!this) {
				throw new TypeError();
			}

			length = this.length;

			if (length === 0 || pivot >= length) {
				return -1;
			}

			if (pivot < 0) {
				pivot = length - Math.abs(pivot);
			}

			for (i = pivot; i < length; i++) {
				if (this[i] === searchElement) {
					return i;
				}
			}
			return -1;
		};
	}

	//Utils functions
	//Local functions used by the plugin
	//Cant be accessed by user
	var utils = {
		viewport : function() {
			//Get the current view port
			var e = window, a = 'inner';
			if (!('innerWidth' in window )) {
				a = 'client';
				e = document.documentElement || document.body;
			}
			return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
		},
		resize : function(){
			//Update on resize
			if(rf.throttle){
				clearTimeout(utils.resize.timer);
				utils.resize.timer = setTimeout(utils.loopObj, rf.throttleDelay)
			}else{
				utils.loopObj()
			}
		},
		loopObj : function (){
			//Update all object
			for(var c=0, l=allObj.length; c<l; c++){
				allObj[c].update();
			}
		}
	}

	//Bind the event
	if(context.addEventListener) context.addEventListener('resize', utils.resize);
	else context.attachEvent('onresize', utils.resize);
	utils.resize.timer; //For throttle

	//Set window variable and plugin shortcut.
	var rf;
	context.rf = rf = function(selector){
		//Creating the style object
		return new cssFile(selector);
	}

	//List of options
	rf.value = 'px';
	rf.throttle = false;
	rf.throttleDelay = 500;
	rf.override = false;

	//Some prefer an other method to modify options
	//rf.options({optionName : optionValue})
	rf.options = function(objOptions){
		for(x in objOptions){
			rf[x] = objOptions[x];
		}
	}

	//rf function
	rf.allObj = function(callback){
		//Loop through all obj and call function(index, obj)
		// this == obj
		for(var c=0, l=allObj.length; c<l; c++){
			callback.call(allObj[c], c, allObj[c]);
		}
	}

	//Keep trace of every object
	var allObj = [];

	function cssFile(selector){
		//Init the object
		allObj.push(this);

		//All single object setting
		//Default setting are those set by the user
		this.selector = selector;
		this.watchPoint = {};
		this.setValue = rf.value;
		this.important = rf.override ? '!important' : '';

		//Create and keep reference of <style> in DOM
		this.styleTag = document.createElement('style');
		document.head.appendChild(this.styleTag);
		this.styleTag.setAttribute('type', 'text/css');
		try{
			this.styleTag.innerHTML = this.selector + '{}';
		}catch(error){
			this.styleTag.styleSheet.cssText = this.selector + '{}';
		}
	}

	cssFile.prototype = {
		//All cssFile methods
		changeSelector : function(newSelector){
			this.selector = newSelector;
			this.styleTag.innerHTML = this.styleTag.innerHTML.replace(/.*\{/, this.selector + '{')
		},
		setQueryPoint : function(queries){
			for(x in queries){
				this.watchPoint[x] = queries[x];
			}


			return this.update()
		},
		fontValue : function(value){
			if(value === undefined){
				return this.setValue;
			}else{
				this.setValue = value;
				return this.update();
			}
		},
		update : function(){
			var mediaQueries = utils.viewport().width,
			arrWidth = [],
			minWidth,
			maxWidth;

			for(x in this.watchPoint){
				arrWidth.push(x);
			}

			//Sort in case broswer doesnt do it automaticly.
			arrWidth = arrWidth.sort(function(a, b) {
				return +a > +b ? 1 : -1;
			});

			console.log(arrWidth);


			for(var c = 0, l = arrWidth.length; c<l; c++){
				if(arrWidth[c] <= mediaQueries){
					minWidth = arrWidth[c];
					maxWidth = arrWidth[c+1];
				}
				else break;
			}


			if(!minWidth && minWidth != 0){
				minWidth = arrWidth[0] || 0;
			}


			if(this.watchPoint[minWidth] !== undefined){
				if(maxWidth !== undefined){
					var lowerVal = this.watchPoint[minWidth],
					higherVal = this.watchPoint[maxWidth],
					cssVal =  (((mediaQueries - minWidth) / (maxWidth - minWidth)) * (higherVal - lowerVal)) + lowerVal,
					css = 'font-size : '+ cssVal + this.setValue + this.important + ';';
				}else{
					var css = 'font-size : '+ this.watchPoint[minWidth] + this.setValue + this.important + ';';
				}


				try{
					this.styleTag.innerHTML = this.styleTag.innerHTML.replace(/\{.*\}/, '{'+ css +'}');
				}catch(error){
					this.styleTag.styleSheet.cssText = this.styleTag.styleSheet.cssText.replace(/\{[\s\S]*\}/m, '{'+ css +'}');
				}
			}


			return this
		},
		remove : function(){
			allObj.splice(allObj.indexOf(this), 1);
			document.head.removeChild(this.styleTag);
		},
		isImportant : function(isIt){
			if(isIt === undefined || isIt){
				this.important = '!important';
			}else{
				this.important = '';
			}
			return this.update();
		}
	}
})(window)
