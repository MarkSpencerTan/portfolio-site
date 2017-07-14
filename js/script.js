// Allows for smooth scrolling when clicking on double arrows
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


// Makes navbar 100% transparent after 1/2 of page scroll
$(window).on('DOMContentLoaded load resize scroll', function(){
    var elementTop = $("#portfolio").offset().top;
    var elementBottom = elementTop + $("#portfolio").outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

  if(elementBottom > viewportTop && elementTop < viewportBottom){
    // The element is visible, do something
    $('nav').css('background-color', 'rgba(255,255,255,1)');
    startLoadAnimation();
  }
  else {
    // The element is not visible, do something else
    $('nav').css('background-color', 'rgba(255,255,255,.0)');
  }
});

// Fades portfolio items into view
function startLoadAnimation(){
    var delay = 0;
    $('#portfolio-row .col-sm-4').each(function(index){
        $(this).delay(delay).animate({opacity:1})
        delay += 300
    });
}

/* activate scrollspy menu */
$('body').scrollspy({
  target: '#myNavbar',
  offset: 52
});