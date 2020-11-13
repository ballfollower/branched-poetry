$(function(){
    var verseIdentificators = [];

    $("#searchInput").on('keyup', function(e){
      if (e.key === 'Enter' || e.keyCode === 13) {
        if($("#poemSoFar").length){
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

    $(".verseToChoose").on('click', function(){
      alert($(this).index());
    });
});

function postVerse(){
    $.post("http://127.0.0.1:5000/ajax/verseProvider", {year: '2017', semester: 1}, function(result){
        console.log(result);
    });
}