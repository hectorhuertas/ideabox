var IdeaBuilder = (function(){
  var sanitizeTags = function(tags){
    return tags.split(",")
               .map(function(t){return t.trim().replace(" ", "-")})
               .filter(function(t){return t})
  }

  var run = function(){
    return {
      title: $('#idea-title').val(),
      body: $('#idea-body').val(),
      tags: sanitizeTags($('#idea-tags').val())
    }
  }

  var update = function(e){
    return {
      title: $(e.target).closest('.idea').find('.title').text().trim(),
      body: $('#idea-body-editor').val() && $('#idea-body-editor').val().trim(),
      tags: $(e.target).closest('.idea').data('tags').split(" ").filter(function(w){return w})
    }
  }

  return {
    run: run,
    update: update
  }
})();
