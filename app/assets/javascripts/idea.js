var Idea = (function(){
  var refreshAll = function(){
    $.getJSON("/api/v1/ideas")
    .then(XRender.ideas)
    .then(Tag.refreshAll())
  }

  var create = function(e){
    e.preventDefault()
    $.post('/api/v1/ideas', {idea: IdeaBuilder.run()})
     .then(XRender.newIdea)
     .then(clearForm)
     .then(Tag.refreshAll)
  }

  var edit = function(e){
    var body = $(e.target).closest('.idea').data('full-body')
    $(e.target).replaceWith('<textarea class="form-control" id="idea-body-editor">' + body + '</textarea>')
    $('#idea-body-editor').height($('#idea-body-editor').prop('scrollHeight'));
    $('#idea-body-editor').focus()
  }

  var update = function(e){
    var id = $(e.target).closest('.idea').data('id')

    $.ajax({ type: 'PATCH',
      url: '/api/v1/ideas/' + id,
      data: {idea: IdeaBuilder.update(e)}
    }).success(reload(id))
  }

  var destroy = function(e){
    var id = $(e.target).closest('.idea').data('id')

    $.ajax({ type: 'DELETE', url: '/api/v1/ideas/' + id })
    .success(destroyIdea(id))
    .then(Tag.refreshAll())
  }

  var destroyIdea = function(id){ $('li[data-id="' + id +'"]').remove() }

  var vote = function(e){
    var id = $(e.target).closest('.idea').data('id')
    var vote = e.target.textContent.toLowerCase()

    $.ajax({
      type: 'PATCH',
      url: '/api/v1/ideas/' + id + '/vote?vote=' + vote
    }).success(reload(id))
  }

  var reload = function(id){ $.getJSON("/api/v1/ideas/" + id, XRender.idea) }

  var clearForm = function(){
    $('#idea-title').val("")
    $('#idea-body').val("")
    $('#idea-tags').val("")
  }

  return {
    refreshAll: refreshAll,
    create: create,
    edit: edit,
    update: update,
    destroy: destroy,
    vote: vote,
  }
})();
