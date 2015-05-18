utils.define('jqtags.slider').extend('jqtag').as(function(test){
	
	utils.require(":seiyria/bootstrap-slider");
	var $ = jQuery;
	
	test.register({
	    tagName: "jq-slider",
	    events: {
	        "slide input":"toggleValue"
	    },
	    accessors: {
	        value: {
	            type: "string"
	        }
	    },	
	    attachedCallback: function () {
	    	var self = this;
	    	this.$inputTag = $('<input type="text" value=""/>');
	        $(this.$).append(this.$inputTag);
	        
	        for(var i in this.$.dataset){
	        	this.$inputTag[0].dataset[i] = this.$.dataset[i]
	        }
	        this.$inputTag.slider({}).on('slide',function(e){
	        	self.toggleValue(e);
	        });
	    },
	    toggleValue : function(e){
	    	this.$.value=e.value;
	    }
	});
	
});