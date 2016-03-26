var Idea = (function(){
  var addLastIdea = function(ideas){
    $('#idea-box').prepend(HtmlFor.idea(ideas[0]))
    Tag.refreshAll()
  }

  var replaceIdea = function(idea){
    $('li[data-id="' + idea.id +'"]').replaceWith(HtmlFor.idea(idea))
  }

  var addAllIdeas = function(ideas){
    ideas.forEach(function(idea){ $('#idea-box').append(HtmlFor.idea(idea)) })
    Tag.refreshAll()
  }

  var destroyIdea = function(id){
    $('li[data-id="' + id +'"]').remove()
    Tag.refreshAll()
  }

  var addLast = function(id){ $.getJSON("/api/v1/ideas", addLastIdea) }

  var addAll = function(){ $.getJSON("/api/v1/ideas", addAllIdeas) }

  var reload = function(id){ $.getJSON("/api/v1/ideas/" + id, replaceIdea) }

  var clearForm = function(){
    $('#idea-title').val("")
    $('#idea-body').val("")
    $('#idea-tags').val("")
  }
  var sanitizeTags = function(tags){
    return tags.split(",")
               .map(function(t){return t.trim()})
               .filter(function(t){return t})
  }

  var buildIdea = function(){
    return {
      title: $('#idea-title').val(),
      body: $('#idea-body').val(),
      tags: sanitizeTags($('#idea-tags').val())
    }
  }

  var create = function(e){
    e.preventDefault()
    $.post('/api/v1/ideas', {idea: buildIdea()}, addLast)
    clearForm()
  }

  var destroy = function(e){
    var id = $(e.target).closest('.idea').data('id')

    $.ajax({
      type: 'DELETE',
      url: '/api/v1/ideas/' + id
    }).success(destroyIdea(id))
  }

  var vote = function(e){
    var id = $(e.target).closest('.idea').data('id')
    var vote = e.target.textContent.toLowerCase()

    $.ajax({
      type: 'PATCH',
      url: '/api/v1/ideas/' + id + '/vote?vote=' + vote
    }).success(reload(id))

  }

  return {
    reload: reload,
    addLast: addLast,
    addAll: addAll,
    create: create,
    destroy: destroy,
    vote: vote,
  }
})();
