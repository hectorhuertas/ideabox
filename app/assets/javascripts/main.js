$(document).ready(function(){
  refreshIdeas()
  $('#save-idea').on('click', saveIdea)
  $('#fuzzy-filter').on('keyup', fuzzyFilter)
  $('#idea-box').delegate('button.upvoter',   'click', upvoteIdea)
  $('#idea-box').delegate('button.downvoter', 'click', downvoteIdea)
  $('#idea-box').delegate('button.editor',    'click', editIdea)
  $('#idea-box').delegate('button.deleter',   'click', deleteIdea)
  $('#idea-box').delegate('button.updater',   'click', updateIdea)
})

function fuzzyFilter(){
  var filter = $('#fuzzy-filter').val()

  $.each($('.idea'), function(){
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

function updateIdea(){
  var title = $(this.parentElement).find('.title').text()
  var body  = $(this.parentElement).find('.body').text()
  var id = this.parentElement.dataset.id

  $.ajax({
    type: 'PATCH',
    url: '/api/v1/ideas/' + id,
    data: {title:title, body:body}
  }).success(refreshIdeas)
}

function editIdea(){
  $(this.parentElement).find('.title').prop('contenteditable', 'true').toggleClass('editableField')
  $(this.parentElement).find('.body').prop('contenteditable', 'true').toggleClass('editableField')
  $(this.parentElement).find('.ui').toggle()
}



// function editForm(id){
//   // debugger
//   return '<form class="bg-info">'+
//   '<fieldset class="form-group"> '+
//   '<label for="idea-title">Title</label> '+
//   '<input type="text" class="form-control" id="idea-title" placeholder="Enter title">'+
//   ' <small class="text-muted">New ideas will be initially qualified as swill.</small> </fieldset> '+
//   '<fieldset class="form-group"> '+
//   '<label for="idea-body">Body</label> '+
//   '<textarea class="form-control" id="idea-body" rows="4"></textarea></fieldset> <button id="save-idea" type="submit" class="btn btn-primary">Save idea</button>  </form>'
// }

function upvoteIdea(){
  var id = this.parentElement.dataset.id
  var url = '/api/v1/ideas/' + id + '/upvote'
  voteIdea(url)
}

function downvoteIdea(){
  var id = this.parentElement.dataset.id
  var url = '/api/v1/ideas/' + id + '/downvote'
  voteIdea(url)
}

function voteIdea(url){
  $.ajax({
    type: 'PATCH',
    url: url
  }).success(refreshIdeas)
}

function deleteIdea(){
  var id = this.parentElement.dataset.id
  $.ajax({
    type: 'DELETE',
    url: '/api/v1/ideas/' + id
  }).success(refreshIdeas)
}

function saveIdea(e){
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/api/v1/ideas',
    data: {title: title(), body: body()}
  }).success(refreshIdeas)
  clearForm()
}

function clearForm(){
  $('#idea-title').val("")
  $('#idea-body').val("")
}

function title(){ return $('#idea-title').val() }

function body(){ return $('#idea-body').val() }

function refreshIdeas(){
  $('#idea-box').empty()

  $.ajax({
    action: 'GET',
    url: '/api/v1/ideas'
  }).success(appendAllToIdeasBox)
}

function appendAllToIdeasBox(ideas) { appendAllTo(ideas, $('#idea-box')) }

function appendAllTo(items, $target){
  $.each(items, function(index, item){
    $target.append( html_for(item) )
  })
}

function html_for(idea) {
  return '<li data-id="' + idea.id +
  '" class="idea list-group-item">' +
  '<span class="title">'+ idea.title + '</span>: ' +
  '<span class="body">'+ limit_length(idea.body) + '</span>' +
  '<button type="button" name="button" class="deleter   ui btn btn-danger btn-sm pull-xs-right">Delete</button>' +
  '<button type="button" name="button" class="editor    ui btn btn-info btn-sm pull-xs-right">Edit</button>' +
  '<button type="button" name="button" class="downvoter ui btn btn-warning btn-sm pull-xs-right">Downvote</button>' +
  '<button type="button" name="button" class="upvoter   ui btn btn-success btn-sm pull-xs-right">Upvote</button>' +
  '<button type="button" name="button" class="updater   ui btn btn-primary btn-sm pull-xs-right" style="display:none">Update</button>' +
  '<span class="ui label label-' +
  color_for(idea.quality) +
  ' label-pill pull-xs-right">' +
  idea.quality +
  '</span></li>'
}

function color_for(quality){
  if (quality === 'genius')    { return 'success' }
  if (quality === 'plausible') { return 'warning' }
  if (quality === 'swill')     { return 'default' }
}

function limit_length(text){
  if (text.length <= 100) {
    return text
  } else {
    var short = text.substring(0,96)
    return short.substring(0,text.lastIndexOf(" ")) + ' ...'
  }
}
