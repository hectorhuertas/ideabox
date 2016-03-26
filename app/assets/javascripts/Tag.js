var Tag = (function(){
  var tagElement = function(tag){
    return $(`<button id="${tag.name}" type="button"
    class="ui btn btn-primary-outline" name="button"
    >${tag.name}</button>`)
  }

  var createTagElements = function(tags){ return tags.map(tagElement) }

  var renderElements = function(elements){
    $('#tag-list').empty()
    $('#tag-list').append(elements)
  }

  var refreshAll = function(){
    $.get('/api/v1/tags')
     .then(createTagElements)
     .then(renderElements)
  }

  return {
    refreshAll: refreshAll
  }
})();
