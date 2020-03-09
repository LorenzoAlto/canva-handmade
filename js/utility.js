var selected; //variabile che si popolerà ogni volta a seconda dell'elemento che vado a cliccare

function logger(text) {
  $("#logger-text").html(text);
  setTimeout(function() {
    $("#logger-text").html("");
  }, 5000);
}

function uiInitialize(element, tag, placeholder) {
  //funzione che aggiunge il placeholder a seconda del tipo di tag
  //parametri: element (elemento creato dinamicamente) tag (tag dell'elemento creato) placeholder (contenuto da mettere nell elemento)

  switch (tag) {
    case "p":
      $(element).html(placeholder);
      break;
    case "img":
      $(element).attr("src", placeholder);
      break;
    case "video":
    //   $(element).attr({
    //     src: placeholder,
    //     type: "video/mp4",
    //     controls: true
    //   });

      var source = $("<source>");
      $(source).attr("src", placeholder).attr("type", "video/mp4");
      $(element).append(source);
      $(element).attr({
          "width": 500,
          "controls": "true"
      })
      break;
    case "audio":
      $(element).attr({
        src: placeholder,
        type: "audio/mp3",
        controls: true
      });
    default:
      break;
  }
}

function uiAdd(tag, target, placeholder) {
  //funzione che aggiunge html ad un target di riferimento
  //parametri: tag (tipologia di tag html da creare) target (div destinatario a cui aggiungere il tag creato) placeholder (contenuto del'elemento)

  console.log(tag, target);

  var element = $("<" + tag + ">");

  uiInitialize(element, tag, placeholder);

  $(element).on("click", function() {
    //al click dell'elemento valoriziamo selected con l'elemento selezionato
    selected = $(this);

    console.log(selected.prop("tagName"));
  });

  $(target).append(element);

  logger("Hai inserito un " + tag + " correttamente");
}

function listeners() {
  //funzione che mi crea gli eventlisteners per i vari bottoni

  $(".btn-action").on("click", function() {
    var tag = $(this).attr("data-tag");
    var target = $(this).attr("data-target");
    var placeholder = $(this).attr("data-placeholder");

    uiAdd(tag, target, placeholder);
  });

  $("#text-editor").on("keyup", function() {
    if (!selected) {
      logger("Non hai selezionato alcun elemento nella pagina!");
    } else {
      $(selected).html($(this).val());
    }
  });

  $("#text-color").on("change", function() {
    if (!selected) {
      logger("Non hai selezionato alcun elemento nella pagina!");
    } else {
      $(selected).css("color", $(this).val());
    }
  });

  $("#text-size").on("change", function() {
    if (!selected) {
      logger("Non hai selezionato alcun elemento nella pagina!");
    } else {
      if ($(this).val() > 0) {
        //non serve in quanto posso mettere un valore minimo
        $(selected).css("font-size", $(this).val() + "px");
      } else {
        $(selected).css("font-size", "1px");
        logger("Non inserire numeri negativi!");
      }
    }
  });

  $("#text-style").on("click", function() {
    $(selected).toggleClass("italic");
  });

  $("#text-decoration").on("click", function() {
    $(selected).toggleClass("underline");
  });

  $("#text-weight").on("change", function() {
    if (!selected) {
      logger("Non hai selezionato alcun elemento nella pagina!");
    } else {
      $(selected).css("font-weight", $(this).val());
    }
  });

  $("#url").on("keyup", function() {
    if (!selected) {
      logger("Non hai selezionato alcun elemento nella pagina!");
    } else {
      $(selected).attr("src", $(this).val());
    }
  });

  $("#img-size").on("change", function() {
    if (!selected) {
      logger("Non hai selezionato alcun elemento nella pagina!");
    } else {
      $(selected).css("width", $(this).val() + "px");
    }
  });

  $("#text-font").on("change", function() {
    if (!selected) {
      logger("Non hai selezionato alcun elemento nella pagina!");
    } else {
      $(selected).css("font-family", $(this).val());
    }
  });

  $("#text-position").on("change", function() {
    if (!selected) {
      logger("Non hai selezionato alcun elemento nella pagina!");
    } else {
      if (selected.prop("tagName") === ("IMG" || "VIDEO")) {
        $(selected).css("position", "absolute");

        switch ($(this).val()) {
          case "left":
            $(selected).css("left", "0");
            break;
          case "center":
            $(selected).css("right", "0");
            $(selected).css("left", "0");
            $(selected).css("margin-left", "auto");
            $(selected).css("margin-right", "auto");
            break;
          case "right":
            $(selected).css("right", "0");
            break;
          default:
            break;
        }
      } else {
        $(selected).css("text-align", $(this).val());
      }
    }
  });

  $("#add-btn").on("click", function() {
    var div = $("<div />");
    $(div).addClass("work-area canvas m20h");

    var target = $(this).attr("data-target");

    $(target).append(div);
  });
}

function init() {
  //funzione che inizializza

  listeners();
}

$(document).ready(function() {
  //quando tutto il file html si carica

  init();
});
