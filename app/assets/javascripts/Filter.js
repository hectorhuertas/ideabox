var Filter = (function(){
  var filterContent = function(idea, filter){
    var title = $(idea).find('.title').text()
    var body  = $(idea).find('.body') .text()
    var text  = title + ': ' + body
    text.includes(filter) ? $(idea).show() : $(idea).hide()
  }

  var search = function(){
    var filter = $('#fuzzy-filter').val()
    $.each($('.idea'), function(_,idea){filterContent(idea,filter)})
  }

  var clear = function(){
    $('.idea').show()
    $('#fuzzy-filter').val("")
    $('#tag-list button').removeClass('active')
  }

  var filterTag = function(idea, filter){
    if (!idea.dataset.tags.includes(filter)) { $(idea).hide() }
  }

  var byTag = function(e){
    $(e.target).addClass('active')
    var filter = e.target.textContent
    $.each($('.idea'), function(_,idea){filterTag(idea,filter)})
  }

  return {
    search: search,
    clear: clear,
    byTag, byTag
  }
})();
