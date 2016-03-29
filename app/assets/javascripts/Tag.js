var Tag = (function(){
  var refreshAll = function(){
    $.get('/api/v1/tags')
     .then(XRender.tags)
  }

  return {
    refreshAll: refreshAll
  }
})();
