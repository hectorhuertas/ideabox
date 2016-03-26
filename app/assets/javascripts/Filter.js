var Filter = (function(){
  var byContent = function(){
    var filter = $('#fuzzy-filter').val()
    $.each($('.idea'), function(_,idea){filterContent(idea,filter)})
  }

  var byTag = function(e){
    $(e.target).addClass('active')
    var filter = e.target.textContent
    $.each($('.idea'), function(_,idea){filterTag(idea,filter)})
  }

  var clear = function(){
    $('.idea').show()
    $('#fuzzy-filter').val("")
    $('#tag-list button').removeClass('active')
  }

  var filterContent = function(idea, filter){
    var title = $(idea).find('.title').text()
    var body  = $(idea).find('.body') .text()
    var text  = title + ': ' + body
    text.includes(filter) ? $(idea).show() : $(idea).hide()
  }

  var filterTag = function(idea, filter){
    if (!idea.dataset.tags.includes(filter)) { $(idea).hide() }
  }

  return {
    byContent: byContent,
    clear: clear,
    byTag, byTag
  }
})();
