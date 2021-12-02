$( document ).ready(function() {
  $.getJSON('data/index.json',function(indexOfTablets){   
    //getButtons(indexOfTablets); 
    getSeries2(indexOfTablets);
    if (window.location.href.indexOf("?query=") > -1) {
      var url = window.location.href; 
      var values= url.split('?query=');
      console.log(values)
      $('#series-list').empty()
      $('#series-codes').empty()
      showTablet(values[1]);
    }
})})

/*function getButtons(indexOfTablets) {
    $("#series-list").empty()
    $.each(indexOfTablets, function( key, val ) {
      $("#series-list").append("<div class='seriesButton'>" + key + "<select onchange='showTablet(value)' value="+ key +" id="+ key +"></select></div>");
      var list_of_tablets_in_series = indexOfTablets[key]
      var content = [];
      $.each( list_of_tablets_in_series, function( key2, val2 ) {
       content.push("<option value="+ key2 +">"+key2+"</option>")
       });
       $('#'+key).append(content)
    })}
*/

function getSeries2(indexOfTablets) {
  $('#series-list').empty()
  $('#series-index-list').empty()
  $('#series-list').append('<div class="card-deck"><div id="rowdeck" class="row"></div></div>')
  $('#series-index-list').append('<li style="list-style: none; font-size: larger;">Series / </li>')
  $.each(indexOfTablets, function(key, value) {
    $('#series-index-list').append(`
    <li style="list-style: none;" id="${key}SeriesList"> <a class="cool-link" onclick="addSeriesTablets('${key}')">
    Pylos ${key} Series <span id="${key}-backslash"></span>
    </a>
    </li>`)
    $('#rowdeck').append(`
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card border-0 document-card-size">
        <div class="card-body text-center">
        <img class="card-img-top img-responsive" src="images/thumbnail${key}.png" alt="Card image cap">
          <h5 class="card-title">Pylos ${key} Series</h5>
          <a onclick="addSeriesTablets('${key}')" class="btn btn-outline-secondary">SHOW SERIES</a>
        </div>
      </div>
    </div>`
    )
  });
}
/*<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-outline-secondary">Go somewhere</a>
  </div>
</div>*/

function addSeriesTablets(value) {
  $('#series-match').empty()
  $('#form-search').empty()
  $('#series-list').empty()
  $('#series-codes').empty()
  $("[id*='-tablet-li-elements']").empty()
  $("[id*='-backslash']").empty()
  //$(`${value}-tablet-li-elements`).empty()
  $.getJSON('data/index.json',function(indexOfTablets){
    list_of_codes = indexOfTablets[value]
    $('.seriesTitle').text(`${value} Series`)
    if ($('#back-btn').length === 0) {
        $(`<a id="back-btn" class="btn px-0 mx-0 my-4" style="font-size:larger"></a>`).insertBefore("#tabletTitle")    
    }
    $("#back-btn")
      .html('<i class="fas fa-chevron-left"></i> Back to Series')
      .attr("onclick", "window.location.reload()")
    $('#series-codes').append('<div class="card-deck"><div id="rowdeck-series" class="row"></div></div>')     
    $(`#${value}-backslash`).text('/')
    $(`#${value}SeriesList`).append(`<ul id="${value}-tablet-li-elements"></ul>`)
    $.each( list_of_codes, function( key, val ) {
      if ( (key === 'category' ) || (key === 'shape' ) || (key === 'series-description' ) || (key === 'author' ) || (key === 'provenance' )) {
        return;
      }
      $(`#${value}-tablet-li-elements`).append(`<li style="list-style: none;"><a onclick="showTablet('${key}')">${key.replace('_', ' ')}</a></li>`)
      $('#rowdeck-series').append(
      `<div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card mb-2 border-0">
      <div class="card-body text-center">
      <img class="card-img-top img-responsive tablet-card-size" src="data/thumbnails/${key}.jpg" alt="Card image cap">
        <h5 class="card-title">${key.replace('_', ' ')}</h5>
        <p class="card-text"></p>
        <a onclick="showTablet('${key}')" class="btn btn-outline-secondary">SHOW TABLET</a>
      </div>
      </div></div>`
      )
    });
})}



/*function addSeriesMatches(matches) {
  $('#series-codes').empty()
  $.getJSON('data/index.json',function(indexOfTablets){
    $('#series-codes').append("<select onchange='showTablet(value)' id='mat'></select></div>")
    $('#mat').append('<option value="" selected disabled hidden>Matches</option>');
    var content = [];
    $.each(matches, function(idx, val) {
      content.push("<option value="+ val +">"+val+"</option>")
    })
    $('#mat').append(content)
  })
}*/

function addSeriesMatches(matches) {
  $('#series-list').empty()
  $('#series-match').empty()
  $('#series-codes').empty()
  $.getJSON('data/index.json',function(indexOfTablets){
    $('#series-match').append('<div class="card-deck"><div id="rowdeck-series" class="row"></div></div>')     
    var setcontent = new Set()
    $.each(matches, function(idx, val) {
      setcontent.add( 
        `<div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card mb-2 border-0">
        <div class="card-body text-center">
        <img class="card-img-top img-responsive tablet-card-size" src="data/thumbnails/${val}.jpg" alt="Card image cap">
          <h5 class="card-title">${val.replace('_', ' ')}</h5>
          <p class="card-text"></p>
          <a onclick="showTablet('${val}');document.getElementById('tabletTitle').scrollIntoView();" class="btn btn-outline-secondary">SHOW TABLET</a>
        </div>
        </div></div>`
        )
    })
    let content = Array.from(setcontent);
    $('#rowdeck-series').append(content.join(''))
    $('#series-match').prepend('<a id="back-btn-2" class="btn px-0 mx-0 my-4" style="font-size:larger"></a>')
    $("#back-btn").empty()
    $("#back-btn-2")
      .html('<i class="fa fa-times" aria-hidden="true"></i> CLEAN RESULTS')
      .attr("onclick", "window.location.reload()")
  })
}

function goBack(series) {
  $('#tabletShower, #signsShower, #notes').empty();
  $("#tabletTitle").text("Documents");
  addSeriesTablets(series);
}


function showTablet(i) {
  $("#signsShower").empty()
  $("#tabletTitle").text("Documents")
  $("#notes").empty()
  $("#tabletShower").empty()
  $('#series-codes').empty()
  series = i.slice(0,2)
  $("#back-btn")
    .html('<i class="fas fa-chevron-left"></i> Back to Tablets')
    .attr("onclick", "goBack(series)");
  $.getJSON('data/index.json',function(indexOfTablets){
    list_of_filenames = indexOfTablets[series][i]['filenames']
    list_of_filemaps = indexOfTablets[series][i]['file_maps']
    let rows = new Set()
    content = []
    $.each(list_of_filemaps, function(idxmap, tm){ //number of rows of the chosen tablet 
      rows.add(tm[1])
      console.log(rows)
    })
    urows = [...new Set (rows)];
    content.push('<ul>')
    $.each(urows, function (idx_row, row_n) {
      content.push('<li class="images"><span class="li-index">' + row_n + '.</span>' )
      $.each( list_of_filemaps, function(idx, t) {
        row_at_n = []
        
        if (row_n == t[1]) { 
          row_at_n.push("<figure style='display:inline-block;'><img style='width:50px;' src='data/" + i + "/LB_" + i + "_r" + row_n + "_" + t[2] + "_" + t[3] + ".png'><figcaption>" + t[3] + "</figcaption></figure>")
        }
        content.push(row_at_n.join(""))
      });
      content.push('</li>')
    })
    content.push('</ul>')
    $("#signsShower").append(content.join(""))
    notes = indexOfTablets[series][i]['notes']
    notes_p = '<p>' + notes +'</p>'
    $("#notes").append(notes_p)
    /*page_title = $("#tabletTitle").text()
    $("#tabletTitle").text(new_title = page_title + ' - ' + i.replace('_', ' '))*/
    $("#tabletTitle").text('PYLOS ' + i.replace('_', ' '))
    imgSource = `data/${i}/${i}.jpg`
    tablet = `<a href=${imgSource} target="_blank"><img style="width:50vw;" src="${imgSource}"/></a>`
    $("#tabletShower").append(tablet)
/*    $('#series-matches').append('<a id="back-btn-2" class="btn px-0 mx-0 my-4" style="font-size:larger"></a>')
    $("#back-btn-2")
      .html('<i class="fa fa-times" aria-hidden="true"></i> CLEAN RESULTS')
      .attr("onclick", "window.location.reload()")*/
  });}


  function sConsole(event) {
    $("#signsShower").empty()
    $("#notes").empty()
    $("#tabletShower").empty()
    $("#tabletTitle").empty()
    event.preventDefault();
    var data = document.getElementById("data");
    matches = []
    $('#series-match').empty()
    $.getJSON('data/result2.json',function(index_of_transcriptions){
      $.each(index_of_transcriptions, function(key, value) {
        $.each(value, function(idx, str) {
        if (str.includes(data.value)) {
          console.log(str, data.value)
          matches.push(key)
        }
        })
      })
      addSeriesMatches(matches)        
      })
  }

