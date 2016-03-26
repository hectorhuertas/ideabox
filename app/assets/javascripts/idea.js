var Idea = (function(){
  var refreshAll = function(){
    $.getJSON("/api/v1/ideas")
    .then(renderIdeas)
    .then(Tag.refreshAll())
  }

  var renderIdeas = function(ideas){
    var elements = ideas.map(ElementFor.idea)
    $('#idea-box').empty().append(elements)
  }

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

  var renderIdea = function(idea){
    $('#idea-box').prepend(ElementFor.idea(idea))
  }

  var create = function(e){
    e.preventDefault()
    $.post('/api/v1/ideas', {idea: buildIdea()})
     .then(renderIdea)
     .then(clearForm)
     .then(Tag.refreshAll)
  }

  var vote = function(e){
    var id = $(e.target).closest('.idea').data('id')
    var vote = e.target.textContent.toLowerCase()

    $.ajax({
      type: 'PATCH',
      url: '/api/v1/ideas/' + id + '/vote?vote=' + vote
    }).success(reload(id))
  }

  var reload = function(id){
    $.getJSON("/api/v1/ideas/" + id, replaceIdea) }

  var replaceIdea = function(idea){
    $('li[data-id="' + idea.id +'"]').replaceWith(ElementFor.idea(idea))
  }

  var destroyIdea = function(id){ $('li[data-id="' + id +'"]').remove() }

  var destroy = function(e){
    var id = $(e.target).closest('.idea').data('id')

    $.ajax({ type: 'DELETE', url: '/api/v1/ideas/' + id })
     .success(destroyIdea(id))
     .then(Tag.refreshAll())
  }

  var editBody = function(e){
    var body = $(e.target).closest('.idea').data('full-body')
     var xx = $(e.target).replaceWith('<textarea class="form-control" id="idea-body-editor">' + body + '</textarea>')
     $('#idea-body-editor').height($('#idea-body-editor').prop('scrollHeight'));
     $('#idea-body-editor').focus()
  }

  var updateBody = function(e){
    var body = $('#idea-body-editor').val()
    var id = $(e.target).closest('.idea').data('id')
    var tags = $(e.target).closest('.idea').data('tags').split(" ").filter(function(w){return w})
    var idea = {body: body, tags: tags}
    // debugger
    $.ajax({
      type: 'PATCH',
      url: '/api/v1/ideas/' + id,
      data: {idea: idea}
    }).success(reload(id))
  }

  var updateTitle = function(e){
    var title = e.target.textContent
    // var id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
    var id = $(e.target).closest('.idea').data('id')
    var tags = $(e.target).closest('.idea').data('tags').split(" ").filter(function(w){return w})
    var idea = {title: title, tags: tags}

    $.ajax({
      type: 'PATCH',
      url: '/api/v1/ideas/' + id,
      data: {idea: idea}
    }).success(reload(id))
  // debugger
  }


  return {
    refreshAll: refreshAll,
    create: create,
    vote: vote,
    destroy: destroy,
    editBody: editBody,
    updateBody: updateBody,
    updateTitle: updateTitle,
  }
})();
