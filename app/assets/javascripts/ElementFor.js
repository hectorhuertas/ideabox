var ElementFor = (function(){
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

  var idea = function(idea){
    return $(`
      <li data-id="${idea.id}" class="idea list-group-item"
      data-tags="${idea.tags.join(" ")}" data-full-body="${idea.body}">
        <div class="row">
          <div class="col-xs-6">
            <span class="title">
              <h1 contentEditable="true">${idea.title}</h1>
            </span>
          </div>
          <div class="col-xs-6">
            <span class="ui label label-pill label-${colorFor(idea.quality)}">${idea.quality}</span>
            <button type="button" name="button" class="ui deleter btn btn-danger pull-xs-right">Delete</button>
            <button type="button" name="button" class="ui voter btn btn-warning pull-xs-right">Downvote</button>
            <button type="button" name="button" class="ui voter btn btn-success pull-xs-right">Upvote</button>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-6">
            <span class="body">${limitLength(idea.body)}</span>
          </div>
        </div>
      </li>
      `)
  }

  return {
    idea: idea
  }
})();
