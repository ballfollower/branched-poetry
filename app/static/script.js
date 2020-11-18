$(function () {
  $("#searchInput").on('keyup', function (e) {
    var inputTrimmed = $(this).val().trim();

    if (inputTrimmed.length && (e.key === 'Enter' || e.keyCode === 13)) {
      advanceVerseLocally(inputTrimmed);
      
      if($(this).data('identicalVerseId') != null){
        postExistingVerse($(this).data('identicalVerseId'));
      }
      else{
        $.ajax({
          url: "http://127.0.0.1:5000/ajax/newVerseHandler",
          contentType: "application/json;charset=utf-8",
          data: JSON.stringify({ 
            'parentId': $("#poemSoFar").data("lastVerseId"), 
            'text': inputTrimmed
          }),
          dataType: "json",
          type: 'POST',
          success: function (response) {
            $("#poemSoFar").data("lastVerseId", response.id);
          },
          error: function (error) {
            console.log(error);
          }
        });
      }
    }

    $(this).data('identicalVerseId', null);

    mainThis = $(this);// to preserve this value

    // alert(mainThis.val());

    $(".verseToChoose").each(function(i, v) {
      var txtValue = $(this).html();

      var matchedPosition = txtValue.indexOf(inputTrimmed);
      
      if (matchedPosition < 0) {
        v.style.display = "none";
      } else {
        v.style.display = "";

        if (matchedPosition == 0) {// exact match possible
          if(txtValue.length == inputTrimmed.length){// this check should eliminate majority of cases
            if(txtValue == inputTrimmed){// final check
              mainThis.data("identicalVerseId", $(this).data("id"));        
            }
          }
        }
      }
    });
  });

  $('#startOverButton').on('click', function(){
    $("#poemSoFar").html("");
    $("#searchInput").val("");

    $(".verseToChoose").remove();
    acquireInitialVerses();
  });

  $('#downloadButton').on('click', function(){
    downloadText("poem.txt", $('#poemSoFar').html().replace(/\<br\\?>/g, "\n"));
  });

  acquireInitialVerses();
});

// Adapted from: https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function downloadText(filename, text) {
  var element = $('<a></a>');
  
  element.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.attr('download', filename);
  element.css('display', 'none');
  
  $('body').append(element);

  element[0].click();

  element.remove();
}

function advanceVerseLocally(text){
  if ($("#poemSoFar").text().length) {
    $("#poemSoFar").append("<br>");
  }
  $("#poemSoFar").append(text);

  $("#searchInput").val("");

  $(".verseToChoose").remove();
}

function fillVerseDivs(ajaxResponse){
  const verses = ajaxResponse;

  for(var i = 0; i<verses.ids.length; i++){
    var verseDiv = $("<div class='verseToChoose'></div>");
    verseDiv.append(verses.texts[i]);
    verseDiv.data("id", verses.ids[i]);
    verseDiv.on('click', function () {
      postExistingVerse($(this).data('id'));
      advanceVerseLocally($(this).html());
    });
    $("#verseAdditionDiv").append(verseDiv);
  }
}

function acquireInitialVerses(){
  $.ajax({
    url: "http://127.0.0.1:5000/ajax/initialVersesProvider",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({}),
    dataType: "json",
    type: 'POST',
    success: function (response) {
      fillVerseDivs(response)
    },
    error: function (error) {
      console.log(error);
    }
  });

  $("#poemSoFar").data("lastVerseId", 0);
}

function postExistingVerse(id) {
  $("#poemSoFar").data("lastVerseId", id);

  $.ajax({
    url: "http://127.0.0.1:5000/ajax/existingVerseHandler",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({ 'id': id }),
    dataType: "json",
    type: 'POST',
    success: function (response) {
      fillVerseDivs(response);
    },
    error: function (error) {
      console.log(error);
    }
  });
}