var HtmlFor = (function(){
  var colorFor = function(quality){
    if (quality === 'genius')    { return 'success' }
    if (quality === 'plausible') { return 'warning' }
    if (quality === 'swill')     { return 'default' }
  }

  var quality = function(quality){
    var span =  document.createElement('span')

    span.className = "ui label label-pill label-" + colorFor(quality)
    span.innerHTML = quality

    return span
  }

  var title = function(text){
    var span = document.createElement('span')
    span.className = "title"
    var title = document.createElement('h1')
    title.contentEditable = true
    title.innerHTML = text
    span.appendChild(title)
    return span
  }

  var col1 = function(text){
    var col = document.createElement('div')
    col.className = 'col-xs-6'

    col.appendChild(title(text))
    return col
  }

  var button = function(text, job, color){
    var button = document.createElement('button')
    button.type = 'button'
    button.name = 'button'
    button.className = 'ui pull-xs-right btn  ' +job+ ' btn-'+ color
    button.innerHTML = text

    return button
  }

  var limitLength = function(text){
    if (text.length <= 100) {
      return text
    } else {
      var short = text.substring(0,96)
      return short.substring(0,text.lastIndexOf(" ")) + ' ...'
    }
  }

  var col2 = function(qualityX){
    var col = document.createElement('div')
    col.className = 'col-xs-6'
// debugger
  col.appendChild(button('Delete','deleter', 'danger'))
  // col.appendChild(button('Edit','editor', 'info'))
  col.appendChild(button('Downvote','voter', 'warning'))
  col.appendChild(button('Upvote','voter', 'success'))
    col.appendChild(quality(qualityX))
    return col
  }

  var row1 = function(idea){
    var row = document.createElement('div')
    row.className = 'row'

    row.appendChild(col1(idea.title))
    row.appendChild(col2(idea.quality))
    // var p = $(document.createElement('p'))
    // var p = document.createElement('p')
    // p.innerHTML = "sajkdljlf lsaj alskjglas g"
    return row
    // var row = document.createElement('')
    // return '<p> sladjlaskg lasgj lsagjlag </p>'
  }

  var body = function(text){
    var col = document.createElement('div')
    col.className = 'col-xs-5'
    var span = document.createElement('span')
    span.className = "body"
    // span.contentEditable = true
    span.innerHTML = limitLength(text)
// debugger
  // col.appendChild(button('Delete','deleter', 'danger'))
  // col.appendChild(button('Edit','editor', 'info'))
  // col.appendChild(button('Downvote','voter', 'warning'))
  // col.appendChild(button('Upvote','voter', 'success'))
    col.appendChild(span)
    return col

  }

  var row2 = function(idea){
    var row = document.createElement('div')
    row.className = 'row'

    row.appendChild(body(idea.body))
    // var p = $(document.createElement('p'))
    // var p = document.createElement('p')
    // p.innerHTML = "sajkdljlf lsaj alskjglas g"
    return row
    // var row = document.createElement('')
    // return '<p> sladjlaskg lasgj lsagjlag </p>'
  }

  return {
    idea: function(idea){
      var li = document.createElement('li')
      li.dataset.id   = idea.id
      li.dataset.tags = idea.tags.join(" ")
      li.dataset.fullBody = idea.body
      li.className    = "idea list-group-item"
      // li.innerHTML    = idea.title + ': ' + idea.body
      li.appendChild(row1(idea))
      li.appendChild(row2(idea))

      // li.appendChild(title)
      // li.appendChild(body)
      // li.appendChild(deleter)
      // li.appendChild(editor)
      // li.appendChild(downvoter)
      // li.appendChild(upvoter)
      // li.appendChild(quality(idea.quality))
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
