/*  jQuery Plugin: Tag Toggler
 *    creator: Ryan Heath (http://rpheath.com)
 *
 *  Description:
 *    This plugin provides a means of choosing tags for a
 *    web form. Click a tag once to add it to a specified
 *    text box; click the tag again to remove it.
 *
 *  Dependencies:
 *    - jQuery 1.2.6
 *      (although it should work for prior versions, too)
 *
 *  Example(s):
 *    Assuming the following markup...
 *
 *        <div>
 *          <input id="tags" type="text" name="tags" />
 *          <p class="tags">
 *            <a href="#">web</a>
 *            <a href="#">design</a>
 *            <a href="#">jquery</a>
 *          </p>
 *        </div>
 *
 *    1)  You'd do...
 *
 *        $(document).ready(function() {
 *          $('p.tags a').toggleTags()
 *        })
 *
 *    2) If you don't have <input id="tags" ... />
 *
 *        $(document).ready(function() {
 *          $('p.tags a').toggleTags({ text_box: 'input#your_text_box_id' })   
 *        })
 *
 *    See 'example.html' for real-world usage ...
 */
 
$.fn.toggleTags = function(options) {
  // defaults
  var settings = $.extend({
    text_box: 'input#tags'
  }, options)
  
  // tagFunctions namespace
  $.extend({
    tagFunctions: {
      // removes a tag from the value of a textbox
      // - tb   => textbox in question
      // - tag  => tag to remove
      remove: function(tb, tag) {
        tb.val(tb.val().replace(tag, ''))
      },
      // appends a tag to the value of a textbox (comma-delimited)
      // - tb   => textbox in question
      // - tag  => tag to remove
      append: function(tb, tag) {
        if (tb.val().length > 0 && tb.val().charAt(tb.val().length - 1) != ', ') {
          tb.val(tb.val() + ', ') 
        }
        tb.val(tb.val() + tag)
      },
      // cleans up the crap from remove/appending tags
      // - tb   => textbox in question
      cleanup: function(tb) {
        tb.val(tb.val().replace(/(, ,)|(,,)/, ','))
        tb.val(tb.val().replace(/(^[^a-z])|((,|, )$)/, ''))
        tb.val($.trim(tb.val()))
      }
    }
  })
  
  // when a tag is clicked...
  this.click(function() {
    // vars
    var tb = $(settings.text_box),
        tag = this.innerHTML;
    
    // is it already in the list of tags?
    // if so, remove it; if not, add it
    if (tb.val().toString().indexOf(tag) > -1) {
      $.tagFunctions.remove(tb, tag)
    } else {
      $.tagFunctions.append(tb, tag)
    }    
    
    // cleanup
    $.tagFunctions.cleanup(tb)
  })
  
  // keep the chaining alive
  return $(this)
}