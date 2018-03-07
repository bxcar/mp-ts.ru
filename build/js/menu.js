/*MOBILE MENU*/
function mobileMenu() {
  var leftMenuBtn = $('.menu-open.left'),
      leftMenuHolder = $('.side.left'),

      body = $('body'),
      bodyClass = 'opened',

      header = $('.header'),
      headerHeight = header.outerHeight();

  if (leftMenuBtn.length) {
    leftMenuBtn.on('click', function(e) {
      body.addClass(bodyClass);
      leftMenuBtn.toggleClass('active');
      leftMenuHolder.toggleClass('visible');
      e.stopPropagation();
    });
  };
  $('body').on('swiperight', function(e) {
    body.addClass(bodyClass);
    leftMenuBtn.toggleClass('active');
    leftMenuHolder.toggleClass('visible');
    e.stopPropagation();
  });
}

function userTopMenu() {
  var userImg = $('.top-user-image'),
      topMenu = $('.top-user-menu'),
      leftMenuBtn = $('.menu-open.left'),
      leftMenuHolder = $('.side.left'),
      //class
      visibleClass = 'visible';


  if (userImg.length) {
    userImg.on('click', function(e) {
      topMenu.toggleClass(visibleClass);
      leftMenuBtn.removeClass('active');
      leftMenuHolder.removeClass('visible');
      e.stopPropagation();
    });
  };
}