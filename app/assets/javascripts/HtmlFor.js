var HtmlFor = (function(){
  var colorFor = function(quality){
    if (quality === 'genius')    { return 'label-success' }
    if (quality === 'plausible') { return 'label-warning' }
    if (quality === 'swill')     { return 'label-default' }
  }

  var quality = function(quality){
    var span =  document.createElement('span')

    span.className = "ui label label-pill pull-xs-right " + colorFor(quality)
    span.innerHTML = quality

    return span
  }

  return {
    idea: function(idea){
      var li = document.createElement('li')
      li.dataset.id   = idea.id
      li.dataset.tags = idea.tags.join(" ")
      li.className    = "idea list-group-item"
      li.innerHTML    = idea.title + ': ' + idea.body

      li.appendChild(quality(idea.quality))
      return li
    }
  }
})();

// var HtmlFor = {
//   idea: function(idea){
//     var li = document.createElement('li')
//     li.dataset.id   = idea.id
//     li.dataset.tags = idea.tags.join(" ")
//     li.className    = "idea list-group-item"
//     li.innerHTML    = 'bob'
//
//     li.appendChild(HtmlFor.quality(idea.quality))
//     return li
//   },
//
//   quality: function(quality){
//     var span =  document.createElement('span')
//     span.className = "ui label label-pill pull-xs-right " + this.colorFor(quality)
//     span.innerHTML = quality
//     return span
//   },
//
//   colorFor: function(quality){
//     if (quality === 'genius')    { return 'label-success' }
//     if (quality === 'plausible') { return 'label-warning' }
//     if (quality === 'swill')     { return 'label-default' }
//   }
// }
      // var man = $('li[data-id="' + id +'"] .label')
      // removeColorFor(man)
      // man.addClass(labelColorFor(a.quality))
      // man.text(a.quality)
    // })
  // }
// var Generate = {
//   idea: function(id){
//      var xxx = 34
//      $.ajax({
//       action: 'GET',
//       url: '/api/v1/ideas/' + id
//     }).success(function(idea){
//       var li = document.createElement('li')
//       li.dataset.id = idea.id
//       li.dataset.tags = idea.tags.join(" ")
//       li.class = "idea list-group-item"
//       li.innerHTML = 'bob'
//       li.appendChild(document.createElement('span'))
//       xxx = 'morros'
//       // var man = $('li[data-id="' + id +'"] .label')
//       // removeColorFor(man)
//       // man.addClass(labelColorFor(a.quality))
//       // man.text(a.quality)
//     })
//     debugger
//   }
// }
