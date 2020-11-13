$(function () {
  $("#searchInput").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if ($("#poemSoFar").length) {
        $("#poemSoFar").append("<br>");
      }
      $("#poemSoFar").append($(this).val());
      //alert($(this).val());
    }

    var input = $("#searchInput");
    var filter = input.val().toUpperCase();

    var versesToChoose = $(".verseToChoose");

    for (var i = 0; i < versesToChoose.length; i++) {
      var txtValue = versesToChoose[i].textContent || versesToChoose[i].innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        versesToChoose[i].style.display = "";
      } else {
        versesToChoose[i].style.display = "none";
      }
    }
  });

  acquireInitialVerses();
});

function acquireInitialVerses(){
  $.ajax({
    url: "http://127.0.0.1:5000/ajax/initialVersesProvider",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({}),
    dataType: "json",
    type: 'POST',
    success: function (response) {
      const verses = response;

      for(var i = 0; i<verses.ids.length; i++){
        var verseDiv = $("<div class='verseToChoose'></div>");
        verseDiv.append(verses.texts[i]);
        verseDiv.data("id", verses.ids[i]);
        verseDiv.on('click', function () {
          // alert("");
          // postVerse($(this).data('verseId'));
          // alert($(this).data("id"));
        });
        $("#verseAdditionPanel").append(verseDiv);
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function postVerse(id) {
  // let verseToPost = {
  //   'id': id
  // }

  $.ajax({
    url: "http://127.0.0.1:5000/ajax/verseProvider",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({ 'id': id }),
    dataType: "json",
    type: 'POST',
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log(error);
    }
  });

  // $.post("http://127.0.0.1:5000/ajax/verseProvider", { id: id }, function (result) {
  //   console.log(result);
  // });
}