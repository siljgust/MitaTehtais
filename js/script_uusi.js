var numbers = [];

$(document).ready(function () {
    $("#ageq label").click(function () {
        console.log("moi");
        $('#ageq').fadeOut('slow', function () {
            $('#countq').fadeIn('slow');
        });
    });

    var inputs = document.getElementById('countq').getElementsByTagName('input');

});


function afterChoosing() {
    $('#countq').fadeOut('slow', function () {
        $('#loading').fadeIn('slow', function () {
            $('#loading').delay(1000).fadeOut('slow');
             tulokset();
            $('#results').delay(1600).fadeIn('slow');
        });
    })

}


function goback() {
    $('#countq').fadeOut('slow', function () {
        $('#ageq').fadeIn('slow');
        $('#results').hide();
    });
}

function refresh() {
    tulokset();
    $('#results').fadeOut('slow', function () {
        $('#results').fadeIn('slow');
    });
}


function tulokset() {
    var age = document.forms["agecount"]["age"].value;
    console.log(age + " moi " + count);
    var count = document.forms["agecount"]["count"].value;

    if (count == "") {
        return;
    }

    $("#tulokset").html("");

    if (age == 131) {
        age = "1-3";
    }

    for (i = 0; i < 3; i++) {
        $.get("data/" + age + ":" + count + ".txt", function (wholeTextFile) {
            txtKasittely(wholeTextFile);
        });
    }
}

function txtKasittely(wholeTextFile) {
    //Katkotaan tekstirivit arrayhyn
    var lines = wholeTextFile.split(/\n/);

    //Arvotaan randomluku
    randomIndex = Math.floor(Math.random() * lines.length);

    if (numbers.length >= (lines.length - 1)) {
        numbers.length = 0;
    }

    //Katsotaan, ettei sitä ole jo käytetty
    while (numbers.indexOf(randomIndex) != -1) {
        randomIndex = Math.floor(Math.random() * lines.length);
    };

    console.log(numbers);

    //otetaan numeroa vastaava rivi ja splitataan ja muotoillaan
    var randomLine = lines[randomIndex];
    randomLine = randomLine.split("#");

    //laitetaan muotoillut tulokset näkyville 
    $("#tulokset").append('<a href="#nro' + randomIndex + '" rel="modal:open"><div class="tulos"><table><td class="text"><h3>' + randomLine[0] + '</h3></td><td class="image"><i class="material-icons" style="color:white;">info_outline<i></td></table></div></a><div id="nro' + randomIndex + '" style="display:none;"><h4>' + randomLine[0] + '</h4> <p>' + randomLine[1] + '</p></div>');


    var myColors = [
        '#06C995', '#EF476F', '#2892D7', '#2892D7'
    ];
    var i = 0;
    $('div.tulos').each(function () {
        $(this).css('background-color', myColors[i]);
        i = (i + 1) % myColors.length;
    });

    //lisätään käytetty numero listaan
    numbers.push(randomIndex);
}

function newSearch(event) {
    $('#results').fadeOut('fast', function () {
        tulokset(event);
        $('#results').fadeIn('slow');
    });
}
