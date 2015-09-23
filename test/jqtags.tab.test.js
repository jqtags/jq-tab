define({
  name : 'jqtags.tab.test',
  extend : "spamjs.view",
  using : ["jqtags.tab"]
}).as(function(test){
	
  test._init_ = function(){
		this.$$.loadTemplate({
			src : this.path("test.html")
		});
	};
	
});