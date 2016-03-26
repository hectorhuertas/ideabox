var Filter = (function(){
  var search = function(){
    var filter = $('#fuzzy-filter').val()

    $.each($('.idea'), function(){
      debugger
      var title = $(this).find('.title').text()
      var body  = $(this).find('.body') .text()
      var text  = title + ': ' + body
      if (text.includes(filter)) {
        $(this).show()
      } else {
        $(this).hide()
      }
    })
  }

  var clear = function cleanFilters(){
    $.each($('.idea'), function(){ $(this).show() })
    $('#fuzzy-filter').val("")
    $('#tag-list button').removeClass('active')
  }

  var byTag = function(e){
    // debugger
    var that = e.target
    // console.log(this);
    var filter = $(that).html()
  $(that).addClass('active')
    $.each($('.idea'), function(){
      var title = $(this).find('.title').text()
      var body  = $(this).find('.body') .text()
      var text  = title + ': ' + body
      // debugger

      if (!this.dataset.tags.includes(filter)) {
        $(this).hide()
      }
    })

  }

  return {
    search: search,
    clear: clear,
    byTag, byTag
  }
})();
