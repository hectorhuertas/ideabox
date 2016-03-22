$(document).ready(function(){
  refreshIdeas()
  $('#save-idea').on('click', saveIdea)
})

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
  return '<li class="list-group-item">' +
  idea.title + ': ' + limit_length(idea.body) +
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
