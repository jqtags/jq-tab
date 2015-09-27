_tag_('jqtags.tab', function (test) {

  var $ = _module_("jQuery");
  var $tabHeaders, $tabBodies, $selectedHeader, $selectedBody;
  var $this, $jqTab;
  var DEFAULT_SLIDER_HEIGHT = "5";

  return {
    tagName: "jq-tab",
    events: {
      "click jq-tab-head": "selectTab",
      "click jq-tab-next": "selectNextTab",
      "click jq-tab-prev": "selectPrevTab"
    },
    accessors: {
      value: {
        type: "string",
        default: "",
        onChange: "setValue"
      },
      slider: {
        type: "string",
        default: false
      }
    },
    attachedCallback: function () {
      var self = this;
      self.setValue();
    },
    findSafe: function (selector) {
      return $this.findSafe(selector, "jq-tab");
    },
    setValue: function () {
      $this = $(this.$);
      var activeClass = $this.attr("active-class");

      $tabHeaders = this.findSafe("jq-tab-head");
      $tabBodies = this.findSafe("jq-tab-pane");

      $tabBodies.attr("hidden", true);
      $tabHeaders.removeAttr("active").removeClass(activeClass);

      $selectedHeader = $tabHeaders.filter("[value='" + this.$.value + "']");
      $selectedHeader.attr("active", true).addClass(activeClass);

      $selectedBody = $tabBodies.filter("[tab='" + this.$.value + "']");
      $selectedBody.removeAttr("hidden");
      //console.log("this.$.slider",this.$.slider)
      if (this.$.slider !== false) {
        this.sliderMatch($selectedHeader); //TODO:-
      }
    },
    selectTab: function (e, target) {
      $this = $(this.$);
      $jqTab = $(target).closest("jq-tab");
      if ($jqTab[0] === this.$) {
        var $target = $(target);
        this.$.value = $target.attr("value");
        this.setValue();
        this.trigger("change");
      }
    },
    selectNextTab: function (e, target) {
      $this = $(this.$);
      $jqTab = $(target).closest("jq-tab");
      if ($jqTab[0] === this.$) {
        $tabHeaders = this.findSafe("jq-tab-head");
        var selectedHeader = $tabHeaders[$tabHeaders.index($tabHeaders.filter("[active]")) - 0 + 1];
        if (selectedHeader !== undefined) {
          return this.selectTab(e, selectedHeader);
        }
      }
    },
    selectPrevTab: function (e, target) {
      $this = $(this.$);
      $jqTab = $(target).closest("jq-tab");
      if ($jqTab[0] === this.$) {
        $tabHeaders = this.findSafe("jq-tab-head");
        var selectedHeader = $tabHeaders[$tabHeaders.index($tabHeaders.filter("[active]")) - 1];
        if (selectedHeader !== undefined) {
          return this.selectTab(e, selectedHeader);
        }
      }
    },
    sliderMatch: debounce(function sliderMatch(el) {
      $this = $(this.$);
      this.matchBGSize(el);
      this.bgPos(el);
    }, 100, undefined, "sliderMatch"),
    matchBGSize: function (el) {
      var activeW = el.width();
      this.findSafe("jq-tab-heads").css({
        "background-size": activeW + "px " + (this.$.slider || DEFAULT_SLIDER_HEIGHT) + "px"
      });
    },
    bgPos: function (el) {
      var offset = el.position().left;
      var corrections = el.parent().offset().left;
      offset = offset - corrections;
      this.findSafe("jq-tab-heads").animate({
        "background-position": offset + "px"
      });
    }
  };

});
