$(document).ready(function(){
  Idea.addAll()
  $('#save-idea').on('click', Idea.create)
  $('#idea-box').delegate('button.deleter',   'click', Idea.destroy)
  $('#idea-box').delegate('button.voter', 'click', Idea.vote)
  $('#sort-by-quality').on('click', Sorter.byQuality)
  $('#fuzzy-filter').on('keyup', Filter.search)
  $('#show-all').on('click', Filter.clear)
  $('#tag-list').delegate('button', 'click', Filter.byTag)

  $('#idea-box').delegate('span.title', 'focusout', updateTitle)
  $('#idea-box').delegate('span.body', 'click', editBody)
  $('#idea-box').delegate('#idea-body-editor', 'focusout', updateBody)
})

function refreshIdeas(){
  $('#idea-box').empty()
  Idea.addAll()
}

function editBody(e){
  var body = $(e.target).closest('.idea').data('full-body')
   var xx = $(e.target).replaceWith('<textarea class="form-control" id="idea-body-editor">' + body + '</textarea>')
   $('#idea-body-editor').height($('#idea-body-editor').prop('scrollHeight'));
   $('#idea-body-editor').focus()
}

function updateBody(e){
  var body = $('#idea-body-editor').val()
  var id = $(e.target).closest('.idea').data('id')
  var tags = $(e.target).closest('.idea').data('tags').split(" ").filter(function(w){return w})
  var idea = {body: body, tags: tags}
  // debugger
  $.ajax({
    type: 'PATCH',
    url: '/api/v1/ideas/' + id,
    data: {idea: idea}
  }).success( Idea.reload(id))

}

function updateTitle(e){
var title = e.target.textContent
// var id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
var id = $(e.target).closest('.idea').data('id')
var tags = $(e.target).closest('.idea').data('tags').split(" ").filter(function(w){return w})
var idea = {title: title, tags: tags}

$.ajax({
  type: 'PATCH',
  url: '/api/v1/ideas/' + id,
  data: {idea: idea}
}).success(refreshIdeas)
// debugger
}

function updateIdea(){
  var title = $(this.parentElement).find('.title').text()
  var body  = $(this.parentElement).find('.body').text()
  var id = this.parentElement.dataset.id
  var tags = this.parentElement.dataset.tags.split(" ").filter(function(w){return w})
  var idea = {title: title, body: body, tags: tags}

  $.ajax({
    type: 'PATCH',
    url: '/api/v1/ideas/' + id,
    data: {idea: idea}
  }).success(refreshIdeas)
}

function editIdea(){
  $(this.parentElement).find('.title').prop('contenteditable', 'true').toggleClass('editableField')
  $(this.parentElement).find('.body').prop('contenteditable', 'true').toggleClass('editableField')
  $(this.parentElement).find('.ui').toggle()
}
