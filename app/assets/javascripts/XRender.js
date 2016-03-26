var XRender = (function(){
  var tags = function(){
    $('#tag-list').empty()

    $.ajax({
      action: 'GET',
      url: '/api/v1/tags'
    }).success(function (tags){
      debugger
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

  // var tags = function(tags){
  //   #prepare the html
  //   #replace the contents
  // }

  return {
    tags: tags
  }
})();
