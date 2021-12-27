$(document).ready(function () {
  $.getJSON('data/index.json', function (indexOfTablets) {
    //getButtons(indexOfTablets); 
    getSeries2(indexOfTablets);
    if (window.location.href.indexOf("?query=") > -1) {
      var url = window.location.href;
      var values = url.split('?query=');
      console.log(values)
      $('#series-list').empty()
      $('#series-codes').empty()
      showTablet(values[1]);
    }
  })
})

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
  $('#attestazioni').empty()
  $('#series-list').empty()
  $('#series-index-list').empty()
  $('#series-list').append('<div class="card-deck"><div id="rowdeck" class="row"></div></div>')
  $.each(indexOfTablets, function (key, value) {
    $('#series-index-list').append(`
    <li style="list-style: none;" id="${key}SeriesList"> <a class="cool-link" onclick="addSeriesTablets('${key}')">
    Pylos ${key} Series <span id="${key}-backslash"></span>
    </a>
    </li>`)
    $('#rowdeck').append(`
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card border-0 document-card-size">
        <div class="card-body text-center">
        <img onclick="addSeriesTablets('${key}')" class="card-img-top img-responsive" src="images/thumbnail${key}.png" alt="Card image cap">
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
  $('#attestazioni').empty()
  $('#series-match').empty()
  $('#form-search').empty()
  $('#series-list').empty()
  $('#series-codes').empty()
  $('#tabletShower, #signsShower, #notes').empty()
  $("[id*='-tablet-li-elements']").empty()
  $("[id*='-backslash']").empty()
  //$(`${value}-tablet-li-elements`).empty()
  $.getJSON('data/index.json', function (indexOfTablets) {
    list_of_codes = indexOfTablets[value]
    $('.seriesTitle').text(`/ ${value} Series /`)
    if ($('#back-btn').length === 0) {
      $('#go-back-button').append(`<a id="back-btn" class="btn px-0 mx-0 my-4" style="font-size:larger"></a>`)
    }
    $("#back-btn")
      .html('<i class="fas fa-chevron-left"></i> Back to Series')
      .attr("onclick", "window.location.reload()")
    $('#series-codes').append('<div class="card-deck"><div id="rowdeck-series" class="row"></div></div>')
    $(`#${value}-backslash`).text('/')
    $(`#${value}SeriesList`).append(`<ul id="${value}-tablet-li-elements"></ul>`)
    $.getJSON('data/index-descriptions.json', function (indexDescriptions) {
      console.log(indexDescriptions)
      console.log(value)
      $('#series-description').empty()
      $('#series-description').append(`
      <div class="text-center lead">
        <p>${indexDescriptions[value]['series-description']}</p>
      </div>
      <div id="descriptions" class="card-deck gradient-breakline">
      <div class="row">
      
      <div class="col-lg-3 col-md-3 col-sm-6 col d-flex align-items-stretch">
      <div class="card border-dark">
        <div class="card-header">Category</div>
        <div class="card-body text-dark">
          <h5 class="card-title">${indexDescriptions[value]['category']}</h5>
          ${iconizeMetadata(`${indexDescriptions[value]['category']}`)}
          <p class="card-text"></p>
        </div>
      </div>
      </div>

      <div class="col-lg-3 col-md-3 col-sm-6 col d-flex align-items-stretch">
      <div class="card border-dark" >
        <div class="card-header">Shape</div>
        <div class="card-body text-dark">
          <h5 class="card-title">${indexDescriptions[value]['shape']}</h5>
          ${iconizeMetadata(`${indexDescriptions[value]['shape']}`)}
          <p class="card-text"></p>
        </div>
      </div>
      </div>

      <div class="col-lg-3 col-md-3 col-sm-6 col d-flex align-items-stretch">
      <div class="card border-dark" >
        <div class="card-header">Scribe</div>
        <div class="card-body text-dark">
          <h5 class="card-title">${indexDescriptions[value]['author']}</h5>
          ${iconizeMetadata(`author`)}
          <p class="card-text"></p>
        </div>
      </div>
      </div> 

      <div class="col-lg-3 col-md-3 col-sm-6 col d-flex align-items-stretch">
      <div class="card border-dark" >
        <div class="card-header">Provenance</div>
        <div class="card-body text-dark">
          <h5 class="card-title">${indexDescriptions[value]['provenance']}</h5>
          ${iconizeMetadata(`provenance`)}
          <p class="card-text"></p>
        </div>
      </div>
      </div>
    </div>
  </div>

      `)
    })
    $.each(list_of_codes, function (key, val) {
      if ((key === 'category') || (key === 'shape') || (key === 'series-description') || (key === 'author') || (key === 'provenance')) {
        return;
      }
      $(`#${value}-tablet-li-elements`).append(`<li style="list-style: none;"><a class="cool-link" onclick="showTablet('${key}')">${key.replace('_', ' ')}</a></li>`)
      $('#rowdeck-series').append(
        `<div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card border-0 ">
        <div class="card-body text-center">
        <img class="card-img-top img-responsive tablet-card-size" src="data/thumbnails/${key}.jpg" alt="Card image cap">
        <h5 class="card-title">${key.replace('_', ' ')}</h5>
        <p class="card-text"></p>
        <a onclick="showTablet('${key}')" class="btn btn-outline-secondary">SHOW TABLET</a>
        </div>
        </div></div>`
      )
    });
  })
}

/*        `<div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card border-0">
        <div class="card-body text-center">
        <img class="card-img-top img-responsive tablet-card-size"  style="max-width:50%; max-height:30%" src="data/thumbnails/${key}.jpg" alt="Card image cap">
        <h5 class="card-title">${key.replace('_', ' ')}</h5>
        <p class="card-text"></p>
        <a onclick="showTablet('${key}')" class="btn btn-outline-secondary">SHOW TABLET</a>
        </div>
        </div></div>`*/ 

function iconizeMetadata(input) {
  switch (input) {
    case "Furniture":
      return '<img class="card-img-top" width="40%;" src="images/table.png">';
    case "Personnel":
      return '<img class="card-img-top" width="40%;" src="images/people.png">';
    case "Land Tenure":
      return '<img class="card-img-top" width="40%;" src="images/land.png">';
    case "Wine":
      return '<img class="card-img-top" width="40%;" src="images/grapes.png">';
    case "Page":
      return '<img class="card-img-top" width="40%;" src="images/shape-size-interface-symbol.png">';
    case "Elongated":
      return '<img class="card-img-top" width="40%;" src="images/horizontal-shape.png">';
    case "author":
      return '<img class="card-img-top" width="40%;" src="images/writing.png">';
    case "provenance":
      return '<img class="card-img-top" width="40%;" src="images/ruins.png">';
  }
}


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
  $('#attestazioni').empty()
  $('#series-list').empty()
  $('#series-match').empty()
  $('#series-description').empty()
  $('#series-codes').empty()
  $.getJSON('data/index.json', function (indexOfTablets) {
    $('#series-match').append('<div class="card-deck"><div id="rowdeck-series" class="row"></div></div>')
    var setcontent = new Set()
    $.each(matches, function (idx, val) {
      setcontent.add(
        `<div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card mb-2 border-0">
        <div class="card-body text-center">
        <img class="card-img-top img-responsive tablet-card-size" src="data/${val}/${val}.jpg" alt="Card image cap">
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

function addAlert(value) {
  $('#series-list').empty()
  $('#series-match').empty()
  $('#series-codes').empty()
  $('#series-match').prepend('<a id="back-btn-2" class="btn px-0 mx-0 my-4" style="font-size:larger"></a>')
  $("#back-btn-2")
    .html('<i class="fa fa-times" aria-hidden="true"></i> CLEAN RESULTS')
    .attr("onclick", "window.location.reload()")
  $('#series-match').append(`<div class="alert alert-danger" role="alert">
  Your search '${value}' did not match any documents.
</div>
`)
}

function goBack(series) {
  $('#tabletShower, #signsShower, #notes').empty();
  $('#series-description').empty()
  $("#tabletTitle").text("Documents");
  addSeriesTablets(series);
}


function showTablet(i) {
  $('#series-description').empty()
  $("#signsShower").empty()
  $("#tabletTitle").text("Documents")
  $("#notes").empty()
  $("#tabletShower").empty()
  $('#series-codes').empty()
  $('#attestazioni').empty()
  series = i.slice(0, 2)
  $("#back-btn")
    .html('<i class="fas fa-chevron-left"></i> Back to Tablets')
    .attr("onclick", "goBack(series)");
  $.getJSON('data/index.json', function (indexOfTablets) {
    list_of_filenames = indexOfTablets[series][i]['filenames']
    list_of_filemaps = indexOfTablets[series][i]['file_maps']
    let rows = new Set()
    content = []
    $.each(list_of_filemaps, function (idxmap, tm) { //number of rows of the chosen tablet 
      rows.add(tm[1])
    })
    urows = [...new Set(rows)];
    content.push('<ul>')
    $.each(urows, function (idx_row, row_n) {
      content.push('<li class="images"><span class="li-index">' + row_n + '.</span>')
      $.each(list_of_filemaps, function (idx, t) {
        row_at_n = []

        if (row_n == t[1]) {
          sign = "data/" + i + "/LB_" + i + "_r" + row_n + "_" + t[2] + "_" + t[3] + ".png"
          row_at_n.push("<figure style='display:inline-block; cursor:pointer;'><img onClick='attestazioni(" + '"' + t[3] + '","' + i + '"' + ")' style='width:50px;' src=" + sign + "><figcaption>" + translateSign(t[3]) + "</figcaption></figure>")
        }
        content.push(row_at_n.join(""))
      });
      content.push('</li>')
    })
    content.push('</ul>')
    $("#signsShower").append(content.join(""))
    notes = indexOfTablets[series][i]['notes']
    notes_p = '<p>' + notes + '</p>'
    $("#notes").append(notes_p)
    /*page_title = $("#tabletTitle").text()
    $("#tabletTitle").text(new_title = page_title + ' - ' + i.replace('_', ' '))*/
    $("#tabletTitle").text('PYLOS ' + i.replace('_', ' '))
    imgSource = `data/${i}/${i}.jpg`
    /*    $('#series-matches').append('<a id="back-btn-2" class="btn px-0 mx-0 my-4" style="font-size:larger"></a>')
        $("#back-btn-2")
          .html('<i class="fa fa-times" aria-hidden="true"></i> CLEAN RESULTS')
          .attr("onclick", "window.location.reload()")*/
    whiteSource = `data/${i}/${i}_white.jpg`
    $.get(whiteSource)
      .done(function () {
        tablet = `
        <div class="row">
        <div class="col-12">
        <a href=${imgSource} target="_blank"><img class="img-tablet-final" id="starting-image" src="${imgSource}"/></a>
      </div>
      <div class="col-12">
      <button style="background:white;" onClick="pictureChange('${imgSource}')">
        <span aria-hidden="true"><img width="32px" src="images/001-color-circle.png"></span>
      </button>
      <button style="background:white;" onClick="pictureChange('${whiteSource}')">
        <span aria-hidden="true"><img width="32px" src="images/002-color-circle-1.png"></span>
      </button>
      </div>
      </div>
      </div>
    <script>
    function pictureChange(opposite)
    {
    document.getElementById('starting-image').src=opposite;
    }
    </script>
      `
        $("#tabletShower").append(tablet)
      }).fail(function () {
        tablet = `<a href=${imgSource} target="_blank"><img class="img-tablet-final" src="${imgSource}"/></a>`
        $("#tabletShower").append(tablet)
        $(window).scrollTop(0);
      })
  });
}



function sConsole(event) {
  $('#attestazioni').empty()
  $("#signsShower").empty()
  $("#notes").empty()
  $("#tabletShower").empty()
  $('#series-description').empty()
  $("#tabletTitle").empty()
  event.preventDefault();
  var data = document.getElementById("data");
  matches = []
  $('#series-match').empty()
  $.getJSON('data/result2.json', function (index_of_transcriptions) {
    $.each(index_of_transcriptions, function (key, value) {
      $.each(value, function (idx, str) {
        if (str.includes(data.value)) {
          console.log(str, data.value)
          matches.push(key)
        }
      })
    })
    if (matches.length < 1) {
      addAlert(data)
    }
    else {
      addSeriesMatches(matches)
    }
  })
}

function attestazioni(sign, i) {
  series = i.slice(0, 2)
  list_of_matching_signs = []
  $.getJSON('data/index.json', function (indexOfTablets) {
    $.each(indexOfTablets, function (key, value) {
      $.each(Object.keys(value), function (key2, value2) {
        list_filemap = indexOfTablets[key][value2]['file_maps']
        $.each(list_filemap, function (idx, filemap) {
          if (sign === filemap[3].toString()) {
            list_of_matching_signs.push(filemap)
          }
        })
      })
    })
    console.log(list_of_matching_signs)
    showAttestazioni(sign, list_of_matching_signs)
  })

}

function showAttestazioni(sign, filemap) {
  $('#attestazioni').empty()
  content = []
  $.each(filemap, function (idx, fm) {
    content.push(`<figure style='display:inline-block;'><img style='max-width:50px; max-height:50px' onclick="showTablet('${fm[0]}')" src='data/${fm[0]}/LB_${fm[0]}_r${fm[1]}_${fm[2]}_${fm[3]}.png'><figcaption>${fm[0].replace('_', ' ')}<br>row:${fm[1]} <br>idx: ${fm[2]}</figcaption></figure>`)
  })
  console.log(content)
  $('#attestazioni').append(content.join(''))
  $('#attestazioni').prepend('<h5>Attestations of ' + sign + '</h5>')
  document.getElementById('#attestazioni').scrollIntoView();
}



function translateSign(sign) {
  linearB = {
    "zo" : "20",
    "ze" : "74",
    "za" : "17",
    "z" : "110",
    "wo" : "42",
    "wi" : "40",
    "we" : "75",
    "wa" : "54",
    "vir" : "100",
    "vin" : "131",
    "v" : "111",
    "u" : "10",
    "two" : "91",
    "turo2" : "156",
    "tu" : "69",
    "to" : "05",
    "ti" : "37",
    "tela+te" : "159+te",
    "tela+pu" : "159+pu",
    "tela+pa" : "159+pa",
    "tela" : "159",
    "te" : "04",
    "ta2" : "66",
    "ta" : "59",
    "t" : "112",
    "susf" : "108f",
    "susm" : "108m",
    "sus+si" : "108+si",
    "sus+ka" : "108+ka",
    "sus" : "108",
    "su" : "58",
    "so" : "12",
    "si" : "41",
    "se" : "09",
    "sa" : "31",
    "s" : "113",
    "ru" : "26",
    "rota+te" : "243+te",
    "rota" : "243",
    "ro2" : "68",
    "ro" : "02",
    "ri" : "53",
    "re" : "27",
    "ra3" : "33",
    "ra2" : "76",
    "ra" : "60",
    "qo" : "32",
    "qi" : "21",
    "qe" : "78",
    "qa" : "16",
    "pu2" : "29",
    "pu" : "50",
    "pte" : "62",
    "po" : "11",
    "pi" : "39",
    "pe" : "72",
    "pa" : "03",
    "p" : "115",
    "ovism" : "106m",
    "ovisf" : "106f",
    "ovis+ta" : "106+ta",
    "ovis" : "106",
    "olo+we" : "130+we",
    "oliv" : "122",
    "ole+po" : "130+po",
    "ole+pa" : "130+pa",
    "ole+a" : "130+a",
    "ole" : "130",
    "o" : "61",
    "nwa" : "48",
    "nu" : "55",
    "no" : "52",
    "ni" : "30",
    "ne" : "24",
    "na" : "06",
    "n" : "116",
    "mul" : "102",
    "mu" : "23",
    "mo" : "15",
    "mi" : "73",
    "me" : "13",
    "ma" : "80",
    "m" : "117",
    "lana" : "145",
    "l" : "118",
    "ku" : "81",
    "ko" : "70",
    "ki" : "67",
    "ke" : "44",
    "kapo" : "127",
    "ka" : "77",
    "jo" : "36",
    "je" : "46",
    "ja" : "57",
    "i" : "28",
    "hord" : "121",
    "gra" : "120",    
    "far" : "129",
    "equ" : "105",
    "e" : "38",
    "dwo" : "90",
    "dwe" : "71",
    "du" : "51",
    "do" : "14",
    "di" : "07",
    "de" : "45",
    "da" : "01",
    "cyp+pa" : "125+pa",
    "cyp+o" : "125+o",
    "cerv" : "104",
    "capm" : "107m",
    "capf" : "107f",
    "cap" : "107",
    "bosm" : "109m",
    "bosf" : "109f",
    "bos+si" : "109+si",
    "bos" : "109m",
    "aur" : "141/a",
    "au" : "85",
    "arom" : "123",
    "arm" : "163",
    "arg" : "141/b",
    "arepa" : "133",
    "alv" : "225",
    "aes" : "140",
    "a3" : "43",
    "a2" : "25",
    "a" : "08",
    "234" : "243",
    "86" : "86",
    "83" : "83",
    "82" : "82",
    "79" : "79",
    "65" : "65",
    "64" : "64",
    "63" : "63",
    "56" : "56",
    "34" : "34",
    "19" : "19",
    "251" : "251",
    "250vas" : "250vas",
    "249" : "249",
    "232" : "232",
    "228vas" : "228vas",
    "220" : "220",
    "219vas" : "219vas",
    "216vas" : "216vas",
    "215vas" : "215vas",
    "214vas" : "214vas",
    "213vas" : "213vas",
    "212vas" : "212vas",
    "209vas" : "209vas",
    "208vas" : "208vas",
    "206vas" : "206vas",
    "205vas" : "205vas",
    "204vas" : "204vas",
    "203vas" : "203vas",
    "202vas" : "202vas",
    "201vas" : "201vas",
    "200vas" : "200vas",
    "189" : "189",
    "171" : "171",
    "169" : "169",
    "166+we" : "166+we",
    "157" : "157",
    "154" : "154",
    "153" : "153",
    "152" : "152",
    "146" : "146",
    "132" : "132"
}

translation = []
$.each(linearB, function(letter, code) {
  if (sign == code) {
    translation.push(letter)
  } 
  else if (sign.includes("numeral")) {
    x = sign.replace("numeral","");
    translation.push(x)
  }
})
return translation[0]
}