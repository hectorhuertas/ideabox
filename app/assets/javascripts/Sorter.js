var Sorter = (function(){
  var byQuality = function(){
    var currentOrder = this.dataset.order

    var sortedIdeas = $('.idea').sort(function(a,b){
      var value = ['swill', 'plausible', 'genius']
      var av = value.indexOf($(a).find('.label').text())
      var bv = value.indexOf($(b).find('.label').text())

      if (currentOrder === 'asc') {
        return bv - av
      } else { return av - bv }
    })

    if (currentOrder === 'asc') {
      this.dataset.order = 'desc'
    } else { this.dataset.order = 'asc' }

    $('#idea-box').empty().append(sortedIdeas)
  }


  return {
    byQuality: byQuality
  }
})();
