var Tag = (function(){
  var refreshAll = function(){
    $.get('/api/v1/tags')
     .then(createElements)
     .then(renderElements)
  }

  var createElements = function(tags){ return tags.map(ElementFor.tag) }

  var renderElements = function(elements){
    $('#tag-list').empty().append(elements)
  }

  return {
    refreshAll: refreshAll
  }
})();
