var numbers = [];

function tulokset() {

  var p = $("#leiki");
  var position = p.position();
  $("#leiki2").css({ "left": position.left });
  $("#leiki2").css({ "top": position.top });


  $('#leiki2').addClass('loader');
  setTimeout(function () {
    $('#leiki2').removeClass('loader');
  }, 1000);

  var randomi = "error";
  var randomIndex;
  $("#results").html("");

  //console.log(numbers);

  for (i = 0; i < 3; i++) {
    $.get("data/kaikki.txt", function (wholeTextFile) {
      //Katkotaan tekstirivit arrayhyn
      var lines = wholeTextFile.split(/\n/);

      //Arvotaan randomluku
      randomIndex = Math.floor(Math.random() * lines.length);

      if (numbers.length > 59) {
        numbers.length = 0;
      }

      //Katsotaan, ettei sitä ole jo käytetty
      while (numbers.indexOf(randomIndex) != -1) {
        randomIndex = Math.floor(Math.random() * lines.length);
      };

      //otetaan numeroa vastaava rivi ja splitataan ja muotoillaan
      var randomLine = lines[randomIndex];
      randomLine = randomLine.replace("[", "<p class='symboli'>");
      randomLine = randomLine.replace("{1}", "<i class='material-icons'>person</i>");
      randomLine = randomLine.replace("{2}", "<i class='material-icons'>people</i>");
      randomLine = randomLine.replace("{2+}", "<i class='material-icons'>people</i><span class='symboli'>+</span>");
      randomLine = randomLine.replace("]", "</p>");
      randomLine = randomLine.split("#");

      //laitetaan muotoillut tulokset näkyville 
      $("#results").append('<a href="#nro' + randomIndex + '" rel="modal:open"><div class="tulos"><table><td class="text"><h3>' + randomLine[0] + '</h3></td><td class="image"><img src="info.png"></td></table></div></a><div id="nro' + randomIndex + '" style="display:none;"><h4>' + randomLine[0] + '</h4> <p>' + randomLine[1] + '</p></div>');

      //lisätään käytetty numero listaan
      numbers.push(randomIndex);

    });

  }

  return numbers;

}


