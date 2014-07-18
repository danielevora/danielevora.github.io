/*
	lostclock.js, version 0.1
	Copyright 2014, Daniel Evora
	License: http://www.opensource.org/licenses/mit-license.php
*/

FlipClock.LostClockFace = FlipClock.Face.extend({
	
	clearExcessDigits: true,

	/**
	 * Build the clock face	
	 */

	build: function(time) {
		var t        = this;
		var children = this.factory.$wrapper.find('ul');
		var lists = [];
		
		time     = time ? time : this.factory.time.getMinuteCounter();
		
		if(time.length > children.length) {
			$.each(time, function(i, digit) {
				lists.push(t.createList(digit));
			});
		}
		
		this.factory.lists = lists;	
		
		$(this.createDivider('Seconds')).insertBefore(this.factory.lists[this.factory.lists.length - 2].$obj);
		
		if(this.clearExcessDigits) {
			this._clearExcessDigits();
		}
		
		if(this.autoStart) {
			this.start();
		}
	},
	
	stop: function() {
		// make it spin!!!
		//this.reset();
		//this.start();

		// var myTime = new FlipClock.Time(
		// 	this
		// );
		// this.flip();
	},

	reset: function() {
		this.factory.time = new FlipClock.Time(
			this.factor,
			this.factory.original ? Math.round(this.factory.original) : 0
		);
		this.factory.time = this.factory.time.convertDigitsToArray(); //hack?
		this.flip(this.factory.original, false);
	},

	/**
	 * Flip the clock face
	 */
	 
	flip: function(time, doNotAddPlayClass) {
		if(!time) {
			time = this.factory.time.getMinuteCounter();
		}
		this.base(time, doNotAddPlayClass);
	},

	/**
	 * Clear the excess digits from the tens columns for sec/min
	 */

	_clearExcessDigits: function() {
		var tenSeconds = this.factory.lists[this.factory.lists.length - 2];
		var tenMinutes = this.factory.lists[this.factory.lists.length - 4];
		
		if (this.factory.lists.length >= 5) {
			var hundredMinutes = this.factory.lists[this.factory.lists.length - 5];
		}

		for(var x = 0; x < 10; x++) {
			if (x >= 2 && typeof hundredMinutes != 'undefined') {
				hundredMinutes.$obj.find('li:last-child').remove();
			}
			if (x >= 6) {
				tenSeconds.$obj.find('li:last-child').remove();
				tenMinutes.$obj.find('li:last-child').remove();
			}
		}
	},

	_addGlyph: function(glyph) {
		var obj = this.createList(glyph, {
			classes: {
				active: this.factory.classes.active,
				before: this.factory.classes.before,
				flip: this.factory.classes.flip
			}
		});
		
		obj.$obj.insertBefore(this.factory.lists[0].$obj);
						
		this.factory.lists.unshift(obj);
	},


});