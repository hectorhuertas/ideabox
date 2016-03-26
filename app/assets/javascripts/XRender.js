var XRender = (function(){
  var tags = function(tags){
    var elements = tags.map(ElementFor.tag)
    $('#tag-list').empty().append(elements)
  }

  var ideas = function(ideas){
    var elements = ideas.map(ElementFor.idea)
    $('#idea-box').empty().append(elements)
  }

  var idea = function(idea){
    $('li[data-id="' + idea.id +'"]').replaceWith(ElementFor.idea(idea))
  }

  var newIdea = function(idea){
    $('#idea-box').prepend(ElementFor.idea(idea))
  }

  return {
    tags: tags,
    ideas: ideas,
    idea: idea,
    newIdea: newIdea
  }
})();
