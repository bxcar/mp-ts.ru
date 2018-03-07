/*CLOSE HIDEN BLOCKS*/
function closeBlocks() {
  var leftMenuBtn = $('.menu-open.left'),
      rightMenuBtn = $('.menu-open.right'),
      leftMenuHolder = $('.side.left'),
      rightMenuHolder = $('.side.right'),
      formLogin = $('.login-holder'),
      formReg = $('.registration-holder'),

      addVacanciesForm = $('.add-vacancies-holder'),
      topMenu = $('.top-user-menu'),

      commentForm = $('.comment-send-holder'),
      commentFormClose = commentForm.find('.close'),

      body = $('body'),
      bodyClass = 'opened',
      userBack = $('.user.back'),
      visibleClass = 'visible';

  $(document).on('click', function(event) {
    if ($(event.target).closest(leftMenuHolder).length) return;
    leftMenuHolder.removeClass('visible');
    body.removeClass(bodyClass);
    leftMenuBtn.removeClass('active');
    event.stopPropagation();
  })

  $(document).on('click', function(event) {
    if ($(event.target).closest(formLogin).length) return;
    formLogin.removeClass('visible')
    event.stopPropagation();
  })

  $(document).on('click', function(event) {
    if ($(event.target).closest(topMenu).length) return;
    topMenu.removeClass('visible');
    event.stopPropagation();
  })


  $('body').on('swipeleft', function(e) {
    body.removeClass(bodyClass);
    leftMenuBtn.removeClass('active');
    leftMenuHolder.removeClass('visible');
    e.stopPropagation();
  });

  if (userBack.length) {
    userBack.on('click', function(e) {
      body.removeClass(bodyClass);
      leftMenuHolder.removeClass('visible');
      leftMenuBtn.removeClass('active');
      e.stopPropagation();
    });
  };

  $(document).on('click', function(event) {
    if ($(event.target).closest(commentForm).length) return;
    commentForm.removeClass('visible');
    event.stopPropagation();
  })
}