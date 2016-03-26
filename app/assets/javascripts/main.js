$(document).ready(function(){
  Idea.addAll()
  $('#save-idea').on('click', Idea.create)
  $('#idea-box').delegate('button.voter', 'click', Idea.vote)
  $('#idea-box').delegate('button.deleter',   'click', Idea.destroy)

  $('#idea-box').delegate('span.body', 'click', Idea.editBody)
  $('#idea-box').delegate('span.title', 'focusout', Idea.updateTitle)
  $('#idea-box').delegate('#idea-body-editor', 'focusout', Idea.updateBody)

  $('#sort-by-quality').on('click', Sorter.byQuality)
  $('#fuzzy-filter').on('keyup', Filter.byContent)
  $('#show-all').on('click', Filter.clear)
  $('#tag-list').delegate('button', 'click', Filter.byTag)
})
