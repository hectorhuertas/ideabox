var Listener = (function(){
  var idea = function(){
    $('#save-idea').on('click', Idea.create)
    $('#idea-box').delegate('button.voter', 'click', Idea.vote)
    $('#idea-box').delegate('button.deleter',   'click', Idea.destroy)

    $('#idea-box').delegate('span.body', 'click', Idea.editBody)
    $('#idea-box').delegate('span.title', 'focusout', Idea.update)
    $('#idea-box').delegate('#idea-body-editor', 'focusout', Idea.update)
  }

  var filters = function(){
    $('#sort-by-quality').on('click', Sorter.byQuality)
    $('#fuzzy-filter').on('keyup', Filter.byContent)
    $('#show-all').on('click', Filter.clear)
    $('#tag-list').delegate('button', 'click', Filter.byTag)
  }

  var start = function(){
    idea()
    filters()
  }

  return {
    start: start
  }
})();
