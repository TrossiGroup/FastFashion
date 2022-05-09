$("#text-fader")
  .mouseenter(() => {
    var text = $("#text-hidden").text();
    text = $.trim(text.replace(/\s+/g, " "));
    $("#text-fader").append("<div id='hide-text'></div>");
    var spans = "<span>" + text.split("").join("</span><span>") + "</span>";
    $(spans)
      .hide()
      .appendTo("#hide-text")
      .each(function (i) {
        $(this)
          .delay(8 * i)
          .css({
            display: "inline",
            opacity: 0,
          })
          .animate(
            {
              opacity: 1,
            },
            8
          );
      });
  })
  .mouseleave(() => {
    $("#hide-text").remove();
  });

function changeBackground() {
  /* Get colorSchema (dark/light) from localStorage */
  colorSchema = localStorage.getItem("theme");

  if (colorSchema == "dark") {
    $("body, #preloader").css({
      "background-color": "#212121",
    });
    $("#preloader").css({
      "border-top": "6px solid #212121",
      "border-bottom": "6px solid #212121",
    });
    $("h1,h2,h3,h4,h5,h6,a,p,div,span").css({
      color: "#fff",
    });
  } else {
    $("body, #preloader, h1,h2,h3,h4,h5,h6,a,p, span").css({
      color: "#000",
    });
  }
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const colorSchema = e.matches ? "dark" : "light";
    localStorage.setItem("theme", colorSchema);
    changeBackground();
  });

changeBackground();

$(window).bind("storage", function (e) {
  if (e.originalEvent.key === "theme") {
    if (
      e.originalEvent.newValue != "dark" ||
      e.originalEvent.newValue != "light"
    ) {
      localStorage.setItem("theme", "light");
    }
    changeBackground();
  }
});
