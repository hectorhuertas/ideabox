var Voter = {
  voteIdea: function(e){
    var id   = e.target.parentElement.dataset.id || e.target.parentElement.parentElement.parentElement.dataset.id
    var vote = e.target.textContent.toLowerCase()
    // debugger
    $.ajax({
      type: 'PATCH',
      url: '/api/v1/ideas/' + id + '/vote?vote=' + vote
    }).success(updateQualityOf(id))
    // }).success(Generate.idea(id))
    // }).success(refreshIdeas)

  }
}

function updateQualityOf(id,b,c,d){
  $.ajax({
    action: 'GET',
    url: '/api/v1/ideas/' + id
  }).success(function(idea){
    var html = HtmlFor.idea(idea)
    // $('#idea-box').append(html)
    $('li[data-id="' + id +'"]').replaceWith(html)
    // debugger
  })
}
//
// function updateQualityOf(id,b,c,d){
//   $.ajax({
//     action: 'GET',
//     url: '/api/v1/ideas/' + id
//   }).success(function(a,b,c){
//     var man = $('li[data-id="' + id +'"] .label')
//     removeColorFor(man)
//     man.addClass(labelColorFor(a.quality))
//     man.text(a.quality)
//   })
// }

// function removeColorFor(cosa){
//   cosa.removeClass('label-success')
//   cosa.removeClass('label-warning')
//   cosa.removeClass('label-default')
// }
//
// function labelColorFor(quality){
//   if (quality === 'genius')    { return 'label-success' }
//   if (quality === 'plausible') { return 'label-warning' }
//   if (quality === 'swill')     { return 'label-default' }
// }
