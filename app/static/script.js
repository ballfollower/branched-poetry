$(function () {
  $("#searchInput").on('keyup', function (e) {
    var inputTrimmed = $(this).val().trim();

    if (inputTrimmed.length && (e.key === 'Enter' || e.keyCode === 13)) {
      advanceVerse(inputTrimmed);
      
      if($(this).data('identicalVerseId') != null){
        postExistingVerse($(this).data('identicalVerseId'));
      }
      else{// TODO: handle this case (i.e. adding verse to database)
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

  acquireInitialVerses();
});

// FIXME: Change name of the function to more appropriate
function advanceVerse(text){
  if ($("#poemSoFar").length) {
    $("#poemSoFar").append("<br>");
  }
  $("#poemSoFar").append(text);

  $("#searchInput").val("");
}

function fillVerseDivs(ajaxResponse){
  const verses = ajaxResponse;

  $(".verseToChoose").remove();

  for(var i = 0; i<verses.ids.length; i++){
    var verseDiv = $("<div class='verseToChoose'></div>");
    verseDiv.append(verses.texts[i]);
    verseDiv.data("id", verses.ids[i]);
    verseDiv.on('click', function () {
      postExistingVerse($(this).data('id'));
      advanceVerse($(this).html());
    });
    $("#verseAdditionPanel").append(verseDiv);
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

  $("#poemSoFar").data("lastVerseId", null);
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