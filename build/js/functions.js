function initLogo() {
  var interval,
        logo = $('.welcome-holder');
    interval = setTimeout(function(){
      logo.addClass('hidden')
    }, 100);
}

function initOpenForms() {
  var btnLogin = $('.js-login'),
      btnReg = $('.js-reg'),
      formLogin = $('.login-holder'),
      formReg = $('.registration-holder');

  if (btnLogin.length) {
    btnLogin.on('click', function(e) {
      formLogin.toggleClass('visible');
      formReg.removeClass('visible');
      e.stopPropagation();
    });
  };

  if (btnReg.length) {
    btnReg.on('click', function(e) {
      formReg.toggleClass('visible');
      formLogin.removeClass('visible');
      e.stopPropagation();
    });
  };
}


function initReg() {
  initRoleSelect();
  initMasterSkill();
  initBack();
}


function initRoleSelect() {
  var formHolder = $('.registration-holder'),
      firstStepForm = formHolder.find('.wrap-form.reg.first'),
      masterForm = formHolder.find('.wrap-form.reg.master'),
      providerForm = formHolder.find('.wrap-form.reg.provider'),
      companyForm = formHolder.find('.wrap-form.reg.company'),

      roleSelect = firstStepForm.find('.select-role'),
      nextStep = firstStepForm.find('.btn.next'),
      guestBtnFinish = firstStepForm.find('.btn.finish')


      //classes
      visibleClass = 'visible',
      hiddenClass = 'hidden',
      disabledClass = 'disabled',
      disabledAttr = 'true',
      enableAttr = 'false',

      //vulue for buton
      finishVal = 'finish',
      nextVal = 'next',
      disableVal = 'disabled'


  nextStep
    .val(disableVal)
    .addClass(disabledClass)
    .prop('disabled', disabledAttr);

  guestBtnFinish
    .addClass(hiddenClass);

  roleSelect.change(function() {
    var val = $(this).val();
    if(val === "empty") {
      nextStep
        .val(disableVal)
        .addClass(disabledClass)
        .prop('disabled', disabledAttr);
    }
    if(val === "10") {
      guestBtnFinish.addClass(visibleClass);
      nextStep
        .addClass(hiddenClass)
        .removeClass(visibleClass)

    }
    else if(val === "20") {
      guestBtnFinish.removeClass(visibleClass);
      nextStep
        .val(nextVal)
        .removeClass(disabledClass)
        .addClass(visibleClass)
        .removeProp('disabled');
      nextStep.on('click', function(e) {
        masterForm
          .addClass(visibleClass)
          .removeClass(hiddenClass);
        providerForm.addClass(hiddenClass);
        companyForm.addClass(hiddenClass);
        firstStepForm.addClass(hiddenClass);
        e.preventDefault();
      });

    }
    else if(val === "30") {
      guestBtnFinish.removeClass(visibleClass);
      nextStep
        .val(nextVal)
        .removeClass(disabledClass)
        .addClass(visibleClass)
        .removeProp('disabled');
      nextStep.on('click', function(e) {
        providerForm
          .addClass(visibleClass)
          .removeClass(hiddenClass);
        masterForm.addClass(hiddenClass);
        companyForm.addClass(hiddenClass);
        firstStepForm.addClass(hiddenClass);
        e.preventDefault();
      });

    }
    else if(val === "40") {
      guestBtnFinish.removeClass(visibleClass);
      nextStep
        .val(nextVal)
        .removeClass(disabledClass)
        .addClass(visibleClass)
        .removeProp('disabled');
      nextStep.on('click', function(e) {
        companyForm
          .addClass(visibleClass)
          .removeClass(hiddenClass);
        masterForm.addClass(hiddenClass);
        providerForm.addClass(hiddenClass);
        firstStepForm.addClass(hiddenClass);
        e.preventDefault();
      });
    }
  });
}


function initBack() {
  var formHolder = $('.wrap-form.reg'),
      firstStepForm = $('.wrap-form.reg.first')
      masterForm = $('.wrap-form.reg.master'),
      providerForm = $('.wrap-form.reg.provider'),
      companyForm = $('.wrap-form.reg.company'),

      //button back
      masterBack= masterForm.find('.btn.bakc'),
      providerBack= providerForm.find('.btn.bakc'),
      companyBack= companyForm.find('.btn.bakc'),

      visibleClass = 'visible',
      hiddenClass = 'hidden';


  if (masterBack.length) {
    masterBack.on('click', function(e) {
      firstStepForm
        .addClass(visibleClass)
        .removeClass(hiddenClass);
      masterForm
        .addClass(hiddenClass)
        .removeClass(visibleClass);
      e.stopPropagation();
    });
  };

  if (providerBack.length) {
    providerBack.on('click', function(e) {
      firstStepForm
        .addClass(visibleClass)
        .removeClass(hiddenClass);
      providerForm
        .addClass(hiddenClass)
        .removeClass(visibleClass);
      e.stopPropagation();
    });
  };

  if (companyBack.length) {
    companyBack.on('click', function(e) {
      firstStepForm
        .addClass(visibleClass)
        .removeClass(hiddenClass);
      companyForm
        .addClass(hiddenClass)
        .removeClass(visibleClass);
      e.stopPropagation();
    });
  };
}


function initMasterSkill() {
  var masterForm = $('.wrap-form.reg.master'),
      skillSelect = masterForm.find('.master-skill'),
      skillDiteyling = masterForm.find('.master-inner.diteyling'),
      skillGraphics = masterForm.find('.master-inner.graphics'),

      //classes
      visibleClass = 'visible';

  skillSelect.change(function() {
    console.log('asdasd')
    var val = $(this).val();
    if(val === "skill_diteyling") {
      skillDiteyling.addClass(visibleClass)
      skillGraphics.removeClass(visibleClass)
    }
    else if(val === "skill_graphics") {
      skillDiteyling.removeClass(visibleClass)
      skillGraphics.addClass(visibleClass)
    }
    else if (val != "skill_graphics" && val != "skill_diteyling") {
      skillDiteyling.removeClass(visibleClass)
      skillGraphics.removeClass(visibleClass)
    }
  });
}



function initUserChose() {
  var userChoiseHolder = $('.user-choise-holder'),
      btnReg = userChoiseHolder.find('.registration')
      btnLogin = userChoiseHolder.find('.login'),
      btnGuest = userChoiseHolder.find('.guest'),

      regHolder = $('.registration-holder'),
      loginHolder = $('.login-holder');


      //classes
      hiddenClass = 'hidden',
      visibleClass = 'visible'

  if (btnReg.length) {
    btnReg.on('click', function(e) {
      regHolder.addClass(visibleClass);
      userChoiseHolder.addClass(hiddenClass);
      e.stopPropagation();
    });
  };

  if (btnLogin.length) {
    btnLogin.on('click', function(e) {
      loginHolder.addClass(visibleClass);
      userChoiseHolder.addClass(hiddenClass);
      e.stopPropagation();
    });
  };

  if (btnGuest.length) {
    btnGuest.on('click', function(e) {
      regHolder.addClass(hiddenClass);
      loginHolder.addClass(hiddenClass);
      userChoiseHolder.addClass(hiddenClass);
      e.stopPropagation();
    });
  };

}


function userChange() {
  var userInfo = $('.user-main-info'),
      btnChange = userInfo.find('.btn.change'),
      btnSave = userInfo.find('.btn.save')

      //class
      active = 'active';

  if (btnChange.length) {
    btnChange.on('click', function(e) {
      userInfo.addClass(active)
      e.stopPropagation();
    });
  };

  if (btnSave.length) {
    btnSave.on('click', function(e) {
      userInfo.removeClass(active)
      e.stopPropagation();
    });
  };

}





function initTabs() {
  var userTab = $('.user-tabs'),
      productTab = $('.product-tabs');

  userTab.lightTabs();
  productTab.lightTabs();
}


function initRate() {
  $('.star').raty({
    half : true,
    size : 24,
    targetKeep : true
  });

  $('.star-product').raty({
    readOnly: true,
    start: 2
  });

  $('.product-rate').raty({
    half : true,
    size : 24,
    targetKeep : true
  });
}



function initSorting() {
  var btnKind = $('.link.sorting.kind'),
      btnType = $('.link.sorting.type'),
      btnWidth = $('.link.sorting.width'),

      holderKind = $('.sorting.kind'),
      holderType = $('.sorting.type'),
      holderWidth = $('.sorting.width'),

      kindRadio = holderKind.find('.radio'),
      typeRadio = holderType.find('.radio'),
      widthRadio = holderWidth.find('.radio'),


      seriesList = $('.sorting-list.series'),
      seriesItem = seriesList.find('li'),
      seriesHolder = $('.sorting-series-holder'),

      visibleClass = 'visible',
      activeClass = 'active',
      disabledClass = 'disabled';

  initSortingBtnClick();
  initRadioClick();

  function initSortingBtnClick() {
    if (btnKind.length) {
      btnKind.on('click', function(e) {
        e.preventDefault();
        $(this).addClass(activeClass);
        btnType.removeClass(activeClass);
        btnWidth.removeClass(activeClass);
        holderKind.addClass(visibleClass);
        holderType.removeClass(visibleClass);
        holderWidth.removeClass(visibleClass);
      });
    };

    if (btnType.length) {
      btnType.on('click', function(e) {
        e.preventDefault();
        $(this).addClass(activeClass),
        btnKind.removeClass(activeClass);
        btnWidth.removeClass(activeClass);
        holderKind.removeClass(visibleClass);
        holderType.addClass(visibleClass);
        holderWidth.removeClass(visibleClass);
      });
    };

    if (btnWidth.length) {
      btnWidth.on('click', function(e) {
        e.preventDefault();
        $(this).addClass(activeClass);
        btnKind.removeClass(activeClass);
        btnType.removeClass(activeClass);
        holderKind.removeClass(visibleClass);
        holderType.removeClass(visibleClass);
        holderWidth.addClass(visibleClass);
      });
    };

    seriesItem.each(function() {
      var cur = $(this),
          curLink = cur.find('.link');
      cur.on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        cur.find('.link').addClass(activeClass);
        cur.siblings().find('.link').removeClass(activeClass);
      });
    });
  }


  function initRadioClick() {
    kindRadio.each(function() {
      var cur = $(this);
      cur.on('click', function(event) {
        btnType.removeClass(disabledClass);
      });
    });

    typeRadio.each(function() {
      var cur = $(this);
      cur.on('click', function(event) {
        btnWidth.removeClass(disabledClass);
      });
    });


    widthRadio.each(function() {
      var cur = $(this);
      cur.on('click', function(event) {

      });
    });
  }

}


function initTableSort() {
  var sortTable = $('.table.sorting-table'),
      sortTableRow = sortTable.find('.product-row'),
      orderBtn = sortTable.find('.btn.order'),
      visibleClass = 'visible';

  sortTableRow.each(function() {
    var cur = $(this),
        curShort = cur.find('.short-description'),
        curLong = cur.find('.long-description');
        reviewHolder = curLong.find('.review-holder'),
        reviewLink = curLong.find('.product-review'),
        reviewClose = reviewHolder.find('.close'),
        reviewSend = reviewHolder.find('.btn.review'),
        curAddBtn = cur.find('.btn.add'),
        curAddSuccess = cur.find('.add-success'),
        curContinue = curAddSuccess.find('.link'),


        visibleClass = 'visible';


    curAddBtn.on('click', function(event) {
      event.preventDefault();
      console.log(curAddSuccess)
      cur.find('.add-success').addClass(visibleClass);
      //$(this).prev().addClass(visibleClass)
    });
    curContinue.on('click', function(event) {
      event.preventDefault();
      cur.find('.add-success').removeClass(visibleClass);
      //$(this).prev().addClass(visibleClass)
    });

    // setTimeout(function() {
    //   cur.find('.add-success').removeClass(visibleClass)
    // }, 100);


    curShort.on('click', function(event) {
      event.preventDefault();
      cur.toggleClass(visibleClass).siblings().removeClass(visibleClass)

    });

    reviewLink.on('click', function(event) {
      event.preventDefault();

      $(this).next().addClass(visibleClass);
    });

    reviewSend.on('click', function(event) {
      event.preventDefault();
      $('.review-holder').removeClass(visibleClass);
    });

    reviewClose.on('click', function(event) {
      event.preventDefault();
      $(this).parent().removeClass(visibleClass);
    });
  });
  // body...
}

function initMessages() {
  // var addSuccess = $('.add-success'),
  //     visibleClass = 'visible';
  // setTimeout(function() {
  //   curAddSuccess.removeClass(visibleClass)
  // }, 100);
}



function keyPress() {
  var count = $('.count')

  count.keypress(function() {
    var countVal = this.value;
    basketProduct()
    basketTotal()
  })
  count.keyup(function() {
    var countVal = this.value;
    basketProduct()
    basketTotal()
  })


}

function basketProduct() {
  cart = $('.table.sorting-table tbody')
  total = $('.total'),

  total_value = 0;

  cart.find('.product-row').each(function() {
    var cur = $(this),
      price = parseFloat(cur.attr('data-price')), // цена
      priceText = cur.find('.price'),
      count = cur.find('.count').val(), // количество
      sum = cur.find('.sum'), // стоимость
      sum_value = price * count;
    sum.text(sum_value);
    priceText.text(price);

  });
  //total.html(total_value + ' Р.');
}

function basketTotal() {
  cart = $('.table.basket tbody')
  total = $('.total'),

  total_value = 0;

  cart.find('.product-row').each(function() {
    var cur = $(this),
      price = parseFloat(cur.attr('data-price')), // цена
      priceText = cur.find('.price'),
      count = cur.find('.count').val(), // количество
      sum = cur.find('.sum'), // стоимость
      sum_value = price * count;
    sum.text(sum_value + ' Р.');
    priceText.text(price);
    total_value += sum_value;
  });
  total.html(total_value + ' Р.');
}


function deleteRow(e) {
  cart = $('.basket.table tbody')
  del = $('.basket.table tbody .fa-times')
    // удаляем строку в корзине
  del.on('click', function(e) {
    e.preventDefault();
    var cur = $(this);
    // var cart = $('.table_cart');
    cur.parents('tr').fadeOut();
    setTimeout(function() {
      cur.parents('tr').remove();
      basketTotal()
    }, 400);
  });
}


function initAddVacancies() {
  var addVacanciesForm = $('.add-vacancies-holder'),
      addVacanciesClose = addVacanciesForm.find('.fa'),
      addVacanciesBtn = $('.top-vacancies-list .btn'),

      visibleClass = 'visible';

  if (addVacanciesBtn.length) {
    addVacanciesBtn.on('click', function(event) {
      event.preventDefault();

      addVacanciesForm.addClass(visibleClass);
    });
  }

  if (addVacanciesClose.length) {
    addVacanciesClose.on('click', function(event) {
      event.preventDefault();
      addVacanciesForm.removeClass(visibleClass);
    });
  }
}

function openComments() {
  var btnOpen = $('.btn.comment'),
      commentForm = $('.comment-send-holder'),
      commentClose = commentForm.find('.close')
      visibleClass = 'visible';

  btnOpen.on('click', function(event) {
    event.preventDefault();
    commentForm.addClass(visibleClass);
  });

  commentClose.on('click', function(event) {
    event.preventDefault();
    commentForm.removeClass(visibleClass);
  });
}


function imgFancy() {
  $(".fancybox").fancybox();
  console.log('asd')
}


function userEdit() {
  var editForm = $('.form.user-edit'),
      infoRow = editForm.find('.row.info'),
      editRow = editForm.find('.row.edit'),

      editBtn = editForm.find('.btn.about.edit'),
      saveBtn = editForm.find('.btn.about.save'),

      visibleClass = 'visible',
      hiddenClass = 'hidden';

  editBtn.on('click', function(event) {
    event.preventDefault();
    $(this).addClass(hiddenClass).removeClass(visibleClass);
    saveBtn.addClass(visibleClass).removeClass(hiddenClass);
    infoRow.addClass(hiddenClass);
    editRow.addClass(visibleClass).removeClass(hiddenClass);
  });

  saveBtn.on('click', function(event) {
    event.preventDefault();
    $(this).addClass(hiddenClass).removeClass(visibleClass);
    editBtn.addClass(visibleClass).removeClass(hiddenClass);
    infoRow.addClass(visibleClass).removeClass(hiddenClass);
    editRow.addClass(hiddenClass).removeClass(visibleClass);
  });
}


function friendInfo() {
  var  friendList = $('.friend-list'),
       friendItem = friendList.find('.friend-list-item'),
       messageForm = friendItem.find('.form-holder.write'),
       activeClass = 'active',
       visibleClass = 'visible',
       hiddenClass = 'hidden';

  friendList.find('.friend-list-item').each(function() {
    var cur = $(this),
        curItemShort = cur.find('.friend-info.short'),
        curItemFull = cur.find('.friend-info.full'),
        curMessageForm = cur.find('.form-holder.write'),
        curMessageBtn = cur.find('.btn.write');

    curItemShort.on('click', function(event) {
      event.preventDefault();
      cur
        .toggleClass(activeClass)
        .removeClass(hiddenClass)
        .siblings()
        .addClass(hiddenClass)
        .removeClass(activeClass);
      curMessageForm.removeClass(visibleClass)
    });
    curMessageBtn.on('click', function(event) {
      event.preventDefault();
      curMessageForm.toggleClass(visibleClass);
    })
  })
  $(document).on('click', function(event) {
    if ($(event.target).closest(friendItem).length) return;
    friendItem.removeClass(activeClass);
    messageForm.removeClass(visibleClass);
    event.stopPropagation();
  })
}


function categortInfo() {
  var  categoryList = $('.category-list'),
       categoryItem = categoryList.find('.category-list-item'),
       activeClass = 'active',
       visibleClass = 'visible',
       hiddenClass = 'hidden';

  categoryList.find('.category-list-item').each(function() {
    var cur = $(this),
        curItemShort = cur.find('.category-info.short'),
        curItemFull = cur.find('.category-info.full');

    curItemShort.on('click', function(event) {
      event.preventDefault();
      cur
        .toggleClass(activeClass)
        .removeClass(hiddenClass)
        .siblings()
        .addClass(hiddenClass)
        .removeClass(activeClass);
    });

  })
  $(document).on('click', function(event) {
    if ($(event.target).closest(categoryItem).length) return;
    categoryItem.removeClass(activeClass);
    event.stopPropagation();
  })
}



function menuSinc() {
  var userMenu = $('.user-list'),
      userMenuMail = userMenu.find('.mail'),
      userMenuReview = userMenu.find('.review'),
      userTab = $('.user-tab-list'),
      userTabItem = userTab.find('.user-tab-item'),
      tabsHolder = $('.tabs-holder'),
      tabsReview = tabsHolder.find('.user-comments'),
      tabsMail = tabsHolder.find('.user-mail');

  userMenuMail.on('click', function(event) {
    event.preventDefault();
    userTabItem.eq(3).addClass('active').siblings().removeClass('active');
    tabsMail
      .css({
        'display': 'block'
      })
      .siblings()
      .css({
        'display': 'none'
      })
  })

  userMenuReview.on('click', function(event) {
    event.preventDefault();
    userTabItem.eq(2).addClass('active').siblings().removeClass('active');
    tabsReview
      .css({
        'display': 'block'
      })
      .siblings()
      .css({
        'display': 'none'
      })
  })
}

function initBasketForm() {
  var basketHolder = $('.basket-holder'),
      basketBtnForm = basketHolder.find('.btn.order'),
      basketForm = basketHolder.find('.basket.form'),

      visibleClass = 'visible',
      activeClass = 'active';

  basketBtnForm.on('click', function(event) {
    event
      .preventDefault();
    $(this)
      .toggleClass(activeClass)
    basketForm
      .toggleClass(visibleClass);
  });



}







$(window).load(function() {

});
$(document).ready(function() {
  mobileMenu();
  closeBlocks();
  initLogo();
  initUserChose();
  initReg();
  userChange()
  initOpenForms()



  userTopMenu();

  initTabs();


  initRate()
  initSorting();
  initTableSort()


  basketProduct()
  basketTotal();
  keyPress()
  deleteRow()

  initMessages();
  initAddVacancies();

  openComments();

  imgFancy();

  userEdit()

  friendInfo()

  categortInfo()
  menuSinc()

  initBasketForm()







$('body').on('click', '.link.share', function(){
    $('.share42init').toggle(500);
  });
});

$(window).resize(function() {

});
