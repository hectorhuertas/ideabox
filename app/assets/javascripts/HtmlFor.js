var HtmlFor = (function(){
  var colorFor = function(quality){
    if (quality === 'genius')    { return 'success' }
    if (quality === 'plausible') { return 'warning' }
    if (quality === 'swill')     { return 'default' }
  }

  var limitLength = function(text){
    if (text.length <= 100) {
      return text
    } else {
      var short = text.substring(0,96)
      return short.substring(0,text.lastIndexOf(" ")) + ' ...'
    }
  }

  var title = function(text){
    var title = document.createElement('h1')
    title.contentEditable = true
    title.innerHTML = text

    var span = document.createElement('span')
    span.className = "title"
    span.appendChild(title)

    var col = document.createElement('div')
    col.className = 'col-xs-6'
    col.appendChild(span)
    return col
  }

  var quality = function(quality){
    var span =  document.createElement('span')

    span.className = "ui label label-pill label-" + colorFor(quality)
    span.innerHTML = quality

    return span
  }

  var button = function(text, job, color){
    var button = document.createElement('button')
    button.type = 'button'
    button.name = 'button'
    button.className = 'ui pull-xs-right btn  ' +job+ ' btn-'+ color
    button.innerHTML = text

    return button
  }

  var controls = function(idea){
    var col = document.createElement('div')
    col.className = 'col-xs-6'

    col.appendChild(button('Delete','deleter', 'danger'))
    col.appendChild(button('Downvote','voter', 'warning'))
    col.appendChild(button('Upvote','voter', 'success'))
    col.appendChild(quality(idea.quality))
    return col
  }

  var titleRow = function(idea){
    var row = document.createElement('div')
    row.className = 'row'

    row.appendChild(title(idea.title))
    row.appendChild(controls(idea))
    return row
  }

  var body = function(text){
    var span = document.createElement('span')
    span.className = "body"
    span.innerHTML = limitLength(text)

    var col = document.createElement('div')
    col.className = 'col-xs-5'
    col.appendChild(span)
    return col

  }

  var bodyRow = function(idea){
    var row = document.createElement('div')
    row.className = 'row'

    row.appendChild(body(idea.body))
    return row
  }

  return {
    idea: function(idea){
      var li = document.createElement('li')

      li.dataset.id       = idea.id
      li.dataset.tags     = idea.tags.join(" ")
      li.dataset.fullBody = idea.body
      li.className        = "idea list-group-item"

      li.appendChild(titleRow(idea))
      li.appendChild(bodyRow(idea))

      return li
    }
  }
})();
