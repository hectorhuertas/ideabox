var ElementFor = (function(){
  var tag = function(tag){
    return $(`
      <button id="${tag.name}" type="button" class="ui btn btn-primary-outline btn-sm"
       name="button" >${tag.name.replace("-", " ")}</button>
    `)
  }

  var HTMLForTags = function(tags){
    return tags.reduce(function(result, tag){
      return result + `<span class="ui label label-primary label-pill">${tag && tag.replace("-", " ")}</span>`
    },"")
  }

  var idea = function(idea){
    return $(`
      <li data-id="${idea.id}" class="idea list-group-item"
      data-tags="${idea.tags.join(" ")}" data-full-body="${idea.body}">
        <div class="row">
          <div class="col-xs-5">
            <div class="row">
              <div class="col-xs-12">
                <span class="title">
                  <h3 class="display-1" contentEditable="true">${idea.title}</h3>
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <span class="body">${limitLength(idea.body)}</span>
              </div>
            </div>
          </div>
          <div class="col-xs-3">${HTMLForTags(idea.tags)}</div>
          <div class="col-xs-2">
            <button type="button" name="button" class="ui btn btn-block btn-${colorFor(idea.quality)}" >${idea.quality}</button>
          </div>
          <div class="col-xs-2">
            <a id="deleter"  class="ui deleter pull-xs-right"><i class="fa fa-2x fa-trash-o"       style="height:0px; "></i></a>
            <a id="downvote" class="ui voter   pull-xs-right"><i class="fa fa-2x fa-thumbs-o-down" style="height:0px; "></i></a>
            <a id="upvote"   class="ui voter   pull-xs-right"><i class="fa fa-2x fa-thumbs-o-up"   style="height:0px; "></i></a>
          </div>
        </div>
      </li>
    `)
  }

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

  return {
    idea: idea,
    tag: tag
  }
})();
