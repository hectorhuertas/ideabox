$(document).ready(function(){
  refreshIdeas()
  $('#save-idea').on('click', saveIdea)
  $('#idea-box').delegate('button.deleter',   'click', deleteIdea)
})


function deleteIdea(){
  var id = this.parentElement.dataset.id
  $.ajax({
    type: 'DELETE',
    url: '/api/v1/ideas/' + id
  }).success(refreshIdeas)
}

function saveIdea(){
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
  '" class="list-group-item">' +
  idea.title + ': ' + limit_length(idea.body) +
  '<button type="button" name="button" class="deleter btn btn-danger btn-sm pull-xs-right">Delete</button>' +
  '<span class="label label-' +
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
