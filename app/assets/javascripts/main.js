$(document).ready(function(){
  refreshIdeas()
  $('#save-idea').on('click', saveIdea)
  $('#sort-by-quality').on('click', sortByQuality)
  $('#fuzzy-filter').on('keyup', fuzzyFilter)
  $('#show-all').on('click', cleanFilters)
  $('#idea-box').delegate('button.voter', 'click', voteIdea)
  $('#idea-box').delegate('button.editor',    'click', editIdea)
  $('#idea-box').delegate('button.deleter',   'click', deleteIdea)
  $('#idea-box').delegate('button.updater',   'click', updateIdea)
  $('#tag-list').delegate('button', 'click', filterTag)
})

function voteIdea(e){
  var id = this.parentElement.dataset.id
  var vote = e.target.textContent.toLowerCase()

  $.ajax({
    type: 'PATCH',
    url: '/api/v1/ideas/' + id + '/vote?vote=' + vote
  }).success(refreshIdeas)
}

function cleanFilters(){
  $.each($('.idea'), function(){ $(this).show() })
  $('#fuzzy-filter').val("")
  $('#tag-list button').removeClass('active')

}

function toggleFilter(e){
  // debugger
  if ($(this).hasClass('btn-primary-outline')) {
    filterTag(e)
  } else {
    unfilterTag(e)
  }
  $(this).toggleClass('btn-primary-outline')
  $(this).toggleClass('btn-primary')
}

function unfilterTag(e){
  // debugger
  var that = e.target
  console.log(this);
  var filter = $(that).html()

  $.each($('.idea'), function(){
    var title = $(this).find('.title').text()
    var body  = $(this).find('.body') .text()
    var text  = title + ': ' + body
    // debugger

    if (this.dataset.tags.includes(filter)) {
      $(this).hide()
    } else {
      $(this).show()
    }
  })

}

function filterTag(e){
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

function sortByQuality(){
  var currentOrder = this.dataset.order

  var sortedIdeas = $('.idea').sort(function(a,b){
    var value = ['swill', 'plausible', 'genius']
    var av = value.indexOf($(a).find('.label').text())
    var bv = value.indexOf($(b).find('.label').text())

    if (currentOrder === 'asc') {
      return bv - av
    } else { return av - bv }
  })

  if (currentOrder === 'asc') {
    this.dataset.order = 'desc'
  } else { this.dataset.order = 'asc' }

  $('#idea-box').empty().append(sortedIdeas)
}

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
    data: {title: title(), body: body(), tags: tags()}
  }).success(refreshIdeas)
  clearForm()
}

function tags(){
  return $('#idea-tags').val().split(",")
                        .map(function(w){return w.trim()})
                        .filter(function(w){return w})
}

function clearForm(){
  $('#idea-title').val("")
  $('#idea-body').val("")
  $('#idea-tags').val("")
}

function title(){ return $('#idea-title').val() }

function body(){ return $('#idea-body').val() }

function refreshIdeas(){
  $('#idea-box').empty()
  $('#tag-list').empty()
  refreshTags()
  $.ajax({
    action: 'GET',
    url: '/api/v1/ideas'
  }).success(appendAllToIdeasBox)
}

function refreshTags(){
  $.ajax({
    action: 'GET',
    url: '/api/v1/tags'
  }).success(function (tags){
    var buttons = tags.map(function(tag){
      return '<button id="'+
      tag.name+
      '" type="button" class="btn btn-primary-outline ui" name="button">'+
      tag.name+
      '</button>'
    })

    $('#tag-list').append(buttons)
  })
}

function appendAllToIdeasBox(ideas) { appendAllTo(ideas, $('#idea-box')) }

function appendAllTo(items, $target){
  $.each(items, function(index, item){
    $target.append( html_for(item) )
  })
}

function html_for(idea) {
  return '<li data-id="' + idea.id +
  '" data-tags="'+ idea.tags.toString().replace(",", " ") +
  '" class="idea list-group-item">' +
  '<span class="title">'+ idea.title + '</span>: ' +
  '<span class="body">'+ limit_length(idea.body) + '</span>' +
  '<button type="button" name="button" class="deleter   ui btn btn-danger btn-sm pull-xs-right">Delete</button>' +
  '<button type="button" name="button" class="editor    ui btn btn-info btn-sm pull-xs-right">Edit</button>' +
  '<button type="button" name="button" class="voter ui btn btn-warning btn-sm pull-xs-right">Downvote</button>' +
  '<button type="button" name="button" class="voter   ui btn btn-success btn-sm pull-xs-right">Upvote</button>' +
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
