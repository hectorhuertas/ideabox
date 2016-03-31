var Sorter = (function(){
  var byQuality = function(){
    var desc = $(this).hasClass('descending')
    $(this).toggleClass('descending')

    var ideas = $('.idea').sort(function(a,b){return ideasSorter(a,b,desc)})

    $('#idea-box').empty().append(ideas)
  }

  var ideasSorter = function(firstElement,secondElement, isDescending){
    var value = ['swill', 'plausible', 'genius']
    var first  = value.indexOf($(firstElement).find('.quality').text())
    var second = value.indexOf($(secondElement).find('.quality').text())

    return isDescending ? second - first: first - second
  }

  return {
    byQuality: byQuality
  }
})();
