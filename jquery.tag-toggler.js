/*  jQuery Plugin: Tag Toggler
 *    creator: Ryan Heath (http://rpheath.com)
 *
 ** Description:
 *    This plugin provides a means of choosing tags for a
 *    web form. Click a tag once to add it to a specified
 *    text box; click the tag again to remove it.
 *
 ** Dependencies:
 *    - jQuery 1.2.6
 *      (although it should work for prior versions, too)
 *
 ** Example(s):
 *    Assuming the following markup...
 *
 *      <div>
 *        <input id="tags" type="text" name="tags" />
 *        <p class="tags">
 *          <a href="#">web</a>
 *          <a href="#">design</a>
 *          <a href="#">jquery</a>
 *        </p>
 *      </div>
 *
 **** EX 1: typical usage
 *      $(document).ready(function() {
 *        $('p.tags a').toggleTags()
 *      })
 *
 **** EX 2: custom <input ... /> tag
 *      $(document).ready(function() {
 *        $('p.tags a').toggleTags({ text_box: 'input#your_text_box_id' })   
 *      })
 *
 **** EX 3: custom separator...
 *      $(document).ready(function() {
 *        $('p.tags a').toggleTags({ separator: '| ' })
 *      })
 *
 ** (See 'example.html' for a working demo)
 *
 */
 
$.fn.toggleTags = function(options) {
  // defaults
  var settings = $.extend({
    text_box: 'input#tags',
    separator: ', '
  }, options)
  
  // tagFunctions namespace
  $.extend({
    tagFunctions: {
      // removes a tag from the value of a textbox
      // - tb   => textbox in question
      // - tag  => tag to remove
      remove: function(tb, tag) {
        var tags = $.grep(tb.val().split(settings.separator), function(t) { return (t != tag) })
        tb.val(tags.join(settings.separator))
      },
      // appends a tag to the value of a textbox (comma-delimited)
      // - tb   => textbox in question
      // - tag  => tag to remove
      append: function(tb, tag) {
        if (tb.val().length > 0 && tb.val().charAt(tb.val().length - 1) != settings.separator) {
          tb.val(tb.val() + settings.separator) 
        }
        tb.val(tb.val() + tag)
      }
    }
  })
  
  // when a tag is clicked...
  this.click(function() {
    // vars
    var tb = $(settings.text_box),
        tag = this.innerHTML
    
    // is it already in the list of tags?
    // if so, remove it; if not, add it
    if (tb.val().toString().indexOf(tag) > -1) {
      $.tagFunctions.remove(tb, tag)
    } else {
      $.tagFunctions.append(tb, tag)
    }
  })
  
  // keep the chaining alive
  return $(this)
}