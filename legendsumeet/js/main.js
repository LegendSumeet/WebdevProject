$(document).ready(function () {
  "use strict";

  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;

  $(".fullscreen").css("height", window_height);
  $(".fitscreen").css("height", fitscreen);

  $(".default-header").sticky({ topSpacing: 0 });

  $("select").niceSelect();

  $(".active-slider").owlCarousel({
    center: true,
    items: 1,
    loop: true,
  });
  $(".next-trigger").click(function () {
    $(".active-slider").trigger("next.owl.carousel");
  });
  // Go to the previous item
  $(".prev-trigger").click(function () {
    $(".active-slider").trigger("prev.owl.carousel");
  });

  $(".menu-bar").on("click", function (e) {
    e.preventDefault();
    $("nav").toggleClass("hide");
    $("span", this).toggleClass("lnr-menu lnr-cross");
    $(".main-menu").addClass("mobile-menu");
  });

  $(".nav-item a:first").tab("show");

  if (document.getElementById("gallery")) {
    $("select").niceSelect();
  }

  if (document.getElementById("default-select")) {
    $(".img-pop-up").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  }

  $(".gal a").simpleLightbox();

  $('.main-menubar a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");

        if (target.length) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top - 68,
            },
            1000,
            function () {
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                return false;
              } else {
                $target.attr("tabindex", "-1");
                $target.focus();
              }
            }
          );
        }
      }
    });

  $(function () {
    $("#datepicker").datepicker();
    $("#datepicker2").datepicker();
  });

  $(document).ready(function () {
    var form = $("#myForm");
    var submit = $(".submit-btn");
    var alert = $(".alert-msg");

    form.on("submit", function (e) {
      e.preventDefault();

      $.ajax({
        url: "mail.php",
        type: "POST",
        dataType: "html",
        data: form.serialize(),
        beforeSend: function () {
          alert.fadeOut();
          submit.html("Sending....");
        },
        success: function (data) {
          alert.html(data).fadeIn();
          form.trigger("reset");
          submit.attr("style", "display: none !important");
        },
        error: function (e) {
          console.log(e);
        },
      });
    });
  });
});
