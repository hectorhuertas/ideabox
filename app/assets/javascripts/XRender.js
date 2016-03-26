var XRender = (function(){
  var tags = function(tags){
    var elements = tags.map(ElementFor.tag)
    $('#tag-list').empty().append(elements)
  }

  var ideas = function(ideas){
    var elements = ideas.map(ElementFor.idea)
    $('#idea-box').empty().append(elements)
  }

  return {
    tags: tags,
    ideas: ideas,
  }
})();
