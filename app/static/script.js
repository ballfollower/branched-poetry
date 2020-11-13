$(function () {
  $("#searchInput").on('keyup', function (e) {
    if ($(this).val().length && (e.key === 'Enter' || e.keyCode === 13)) {
      appendToPoem($(this).val());
      $(this).val("");
      // TODO: handle sending the verse to the server
      
    }

    var input = $("#searchInput");
    var filter = input.val().trim();

    var versesToChoose = $(".verseToChoose");

    for (var i = 0; i < versesToChoose.length; i++) {
      var txtValue = versesToChoose[i].textContent || versesToChoose[i].innerText;

      if (txtValue.indexOf(filter) > -1) {
        versesToChoose[i].style.display = "";
      } else {
        versesToChoose[i].style.display = "none";
      }
    }
  });

  acquireInitialVerses();
});

function appendToPoem(text){
  if ($("#poemSoFar").length) {
    $("#poemSoFar").append("<br>");
  }
  $("#poemSoFar").append(text);
}

function fillVerseDivs(ajaxResponse){
  const verses = ajaxResponse;

  $(".verseToChoose").remove();

  for(var i = 0; i<verses.ids.length; i++){
    var verseDiv = $("<div class='verseToChoose'></div>");
    verseDiv.append(verses.texts[i]);
    verseDiv.data("id", verses.ids[i]);
    verseDiv.on('click', function () {
      // alert("");
      postExistingVerse($(this).data('id'));
      appendToPoem($(this).html());
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
}

function postExistingVerse(id) {
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