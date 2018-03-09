<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <title>TuningSouz</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <!--if IE script(src="http://html5shiv.googlecode.com/svn/trunk/html5.js")-->
    <!--Media queries-->
    <meta name="viewport" content="width=device-width, target-densitydpi=device-dpi, user-scalable=yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!--CSS LINKS--><!--[if lte IE 8]>
    <link rel="stylesheet" href="css/ie8.css" media="screen, projection"><![endif]-->
    <!--[if lte IE 9]>
    <link rel="stylesheet" href="css/ie9.css" media="screen, projection"><![endif]-->
    <!--Main style-->
    <link href="css/widgets.css" rel="stylesheet" media="screen">
    <link href="css/main.css" rel="stylesheet" media="screen">
    <link href="css/menus.css" rel="stylesheet" media="screen">
    <style>
.load-img {
    /* text-align: center; */
    position: relative;
    left: 29%;
    /* transform: translate( 25%, 0 ); */
}
.avatar-preview {
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
}

    </style>
</head>
<body onload="loginCtrl.vacancy_index()" style=" -webkit-overflow-scrolling: touch;">
<div class="wrapper">
    <div class="wrapper-inner">
        <header role="banner" class="header">
            <div class="header-inner">
                <div class="container"><span onclick="loginCtrl.getUnread()"  class="btn menu-open left"><span></span><span></span><span></span></span>
                    
                </div>
            </div>
        </header>
         <div class="side left">
            <div class="side-inner">
                <div class="user-menu">
                    <div class="user-menu_header fx">
                        <ul>
                            <li><a href="#" class="user back"><span class="fa fa-long-arrow-left">close</span></a></li>
                            <li><a href="user-profile-edit.html" class="user settings"><span
                                    class="fa fa-cog">settings</span></a></li>
                        </ul>
                    </div>
                    <div class="user-menu_content">
                        <div class="user-photo">
                            <div class="photo-wrap">
                                <div class="photo-wrap_inner"><img src="http://placehold.it/350x150" alt="user photo">
                                </div>
                            </div>
                        </div>
                        <ul class="user-menu_list">
                          <li id="name_surname_menu">Имя Фамилия</li>
                        	<li><a href="user-profile-view.html"><i class="fa fa-user" aria-hidden="true"></i>Профиль</a></li>
                        	<li><a href="friend-list.html"><i class="fa fa-users" aria-hidden="true"></i>Коллеги</a></li>
                        	<li><a href="messages-list.html"><i class="fa fa-comments-o" aria-hidden="true"></i><i  id="msg">Сообщения</i></a></li>
                            <li class="tuningsouz">TuningSouz</li>
                            <li><a href="news-view.html"><i class="fa fa-newspaper-o" aria-hidden="true"></i>Новости</a></li>
                            <li><a href="basket.html"><i class="fa fa-shopping-basket" aria-hidden="true"></i>Корзина</a></li>
                            <li><a href="categories.html"><i class="fa fa-shopping-bag" aria-hidden="true"></i>Магазин</a></li>
                            <li><a href="#" onclick="window.open('https://m.youtube.com/channel/UCLAZBCysrdf5qlzNZOCChNA', '_system');"><i class="fa fa-youtube-square" aria-hidden="true"></i>Видеоканал</a></li>
                            <li><a href="support.html"><i class="fa fa-question-circle" aria-hidden="true"></i>Тех. поддержка</a></li>
                            <li id="invite-menu-item"><a href="invite.html"><i class="fa fa-question-circle" aria-hidden="true"></i>Пригласить</a></li>
                            <li id="vacancies-menu-item"><a href="vacancies.html"><i class="fa fa-briefcase" aria-hidden="true"></i>Вакансии</a></li>
                            <!--<li><a href="vacancies-inner.html">Поиск услуг</a></li>-->
                            <li><a href="event_request.html"><i class="fa fa-graduation-cap" aria-hidden="true"></i>Семинар</a></li>
                            <li><a href="calendar.html"><i class="fa fa-calendar-check-o" aria-hidden="true"></i>Календарь мероприятий</a></li>
                            <li><a href="about-us.html"><i class="fa fa-diamond" aria-hidden="true"></i>О нас</a></li>
                            
                            <!--<li><a href="#" class="link logout"><span class="fa fa-sign-out"></span></a></li>-->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="side center">
                <div class="vacancies-holder">
                    <div class="add-vacancies-holder">
                        <form action="#" name="vacancy_add_form">
                            <div class="form-row"><span>Добавление вакансии</span><span
                                    class="fa fa-times close"></span></div>
                            <div class="row edit">
                            
                            
                                <div class="user-photo-edit" id="user-avatar">
<!--                                    <input type="file" id="file_vacancy"><span class="load-img">Загрузить фото</span> -->
                                    <span class="load-img">фото</span>
                                </div>
                                
                                <div class="row edit">
                                    <canvas id="avatar-preview" width="150" height="150" class="avatar-preview" style="display:none;">Браузер не поддерживает html5 canvas</canvas>
                                    <input hidden type="file" id="file_vacancy">
                                    <label for="file_vacancy" style="cursor:pointer;text-align: center;">Загрузить фото</label>
                                </div>
                            
                            </div>
                            <div class="form-row">
                                <input name="name" type="text" placeholder="название вакансии" class="input">
                            </div>
                            <div class="form-row">
                                <input name="salary" type="text" placeholder="зарплата" class="input">
                            </div>
                            <div class="form-row">
                                <textarea name="description" placeholder="описание"></textarea>
                            </div>
                            <div class="form-row">
                                <input type="text" name="city" placeholder="Город" class="input">
                            </div>
                            <div class="form-row">
                                <input type="text" name="exp" placeholder="Стаж работы" class="input">
                            </div>
                            <div class="form-row">
                                <input type="text" name="phone" placeholder="Телефон" class="input">
                            </div>
                            <div class="form-row">
                                <input type="button" value="добавить" class="btn" onclick="loginCtrl.vacancy_create()">
                            </div>
                        </form>
                    </div>
                    <ul class="top-vacancies-list">
                        <li><span>список всех вакансий</span></li>
                        <li class="select-elem">
                            <select name="role" class="select-role city-select" id="vac-city-select">
                                <option value="empty" selected="selected">Выберите Город</option>
                                <!--<option value="10">Харьков</option>
                                <option value="20">Москва</option>-->
                            </select>
                        </li>
                        <li class="select-elem">
                            <select name="role" class="select-role vakancii-select" id="vac-vacancy-select">
                                <option value="empty" selected="selected">Выберите Вакансию</option>
                                <!--<option value="10">Вакансия 2</option>
                                <option value="20">Вакансия 1</option>-->
                            </select>
                        </li>
                        <li>
                            <input type="submit" value="добавить вакансию" class="btn">
                        </li>
                    </ul>
                    <ul class="vacancies-list" id="vacancy_parent">

                    </ul>
                </div>
            </div>
            <div class="registration-holder">
                <div class="wrap-form reg first">
                    <div class="container">
                        <div class="wrap-form-inner"></div>
                        <form action="">
                            <div class="form-title">
                                <h2>registration form</h2>
                            </div>
                            <div class="form-content">
                                <div class="form-row">
                                    <label for="user_name">Введите логин</label>
                                    <input type="text" name="user_name" placeholder="Введите логин ">
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="form-row">
                                    <label for="user_email">E-mail</label>
                                    <input type="text" name="user_email" placeholder="E-mail ">
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="form-row">
                                    <label for="user_password">Введите пароль</label>
                                    <input type="password" name="user_password" placeholder="Введите пароль ">
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="form-row">
                                    <label for="user_password2">Повторите пароль</label>
                                    <input type="password" name="user_password2" placeholder="Повторите пароль ">
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="form-row">
                                    <label for="user_role">Выберите кто вы?</label>
                                    <select name="user_role" class="select-role">
                                        <option value="empty" selected="selected">Выберите кто вы?</option>
                                        <option value="guest">Гость</option>
                                        <option value="master">Мастер</option>
                                        <option value="provider">Поставщик</option>
                                        <option value="company">Компания</option>
                                    </select>
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="form-row btn-row">
                                    <input type="submit" name="finish" value="finish" class="btn finish">
                                    <input type="submit" name="next" value="next step" class="btn next">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="wrap-form reg master">
                    <div class="container">
                        <div class="wrap-form-inner"></div>
                        <form action="#">
                            <div class="form-title"><a href="#" class="btn bakc">назад</a>
                                <h2>registration form master</h2>
                            </div>
                            <div class="form-content">
                                <div class="form-row">
                                    <label for="master_skill">Мастер</label>
                                    <select name="master_skill" class="master-skill">
                                        <option value="skill_atigraviyka" selected="selected">Атигравийка</option>
                                        <option value="skill_vinyl">Цветной винил</option>
                                        <option value="skill_toning">Тонировка</option>
                                        <option value="skill_diteyling">Дитейлинг</option>
                                        <option value="skill_graphics">Коммерческая графика</option>
                                    </select>
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="master-inner diteyling">
                                    <label for="diteyling_skill">Дитейлинг</label>
                                    <div class="checkbox-holder">
                                        <div class="checkbox-row">
                                            <input type="checkbox" id="diteyling_skill1">
                                            <label for="diteyling_skill1"> Полировка</label>
                                        </div>
                                        <div class="checkbox-row">
                                            <input type="checkbox" id="diteyling_skill2">
                                            <label for="diteyling_skill2"> Химчистка</label>
                                        </div>
                                        <div class="checkbox-row">
                                            <input type="checkbox" id="diteyling_skill3">
                                            <label for="diteyling_skill3"> Покрытие</label>
                                        </div>
                                        <div class="checkbox-row">
                                            <input type="checkbox" id="diteyling_skill4">
                                            <label for="diteyling_skill4"> Полировка</label>
                                        </div>
                                        <div class="checkbox-row">
                                            <input type="checkbox" id="diteyling_skill5">
                                            <label for="diteyling_skill5"> Защитная пленка</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="master-inner graphics">
                                    <label for="graphic_skill">Коммерческая графика</label>
                                    <div class="radio-holder">
                                        <div class="radio-row">
                                            <input type="radio" id="graphic_skill1" name="graphic_skill">
                                            <label for="graphic_skill1"> Типография</label>
                                        </div>
                                        <div class="radio-row">
                                            <input type="radio" id="graphic_skill2" name="graphic_skill">
                                            <label for="graphic_skill2"> Дизайнер</label>
                                        </div>
                                        <div class="radio-row">
                                            <input type="radio" id="graphic_skill3" name="graphic_skill">
                                            <label for="graphic_skill3"> Монтажник</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row btn-row">
                                    <input type="submit" value="finish" class="btn finish">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="wrap-form reg provider">
                    <div class="container">
                        <div class="wrap-form-inner"></div>
                        <form action="#">
                            <div class="form-title"><a href="#" class="btn bakc">назад</a>
                                <h2>registration form provider</h2>
                            </div>
                            <div class="form-content">
                                <label for="reg_provider">Поставщик</label>
                                <div class="radio-holder">
                                    <div class="radio-row">
                                        <input type="radio" id="provider1" name="provider">
                                        <label for="provider1"> Типография</label>
                                    </div>
                                    <div class="radio-row">
                                        <input type="radio" id="provider2" name="provider">
                                        <label for="provider2"> Дизайнер</label>
                                    </div>
                                    <div class="radio-row">
                                        <input type="radio" id="provider3" name="provider">
                                        <label for="provider3"> Монтажник</label>
                                    </div>
                                </div>
                                <div class="form-row btn-row">
                                    <input type="submit" value="finish" class="btn finish">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="wrap-form reg company">
                    <div class="container">
                        <div class="wrap-form-inner"></div>
                        <form action="#">
                            <div class="form-title"><a href="#" class="btn bakc">назад</a>
                                <h2>registration form company</h2>
                            </div>
                            <div class="form-content">
                                <div class="form-row">
                                    <label for="company_name">Название компании</label>
                                    <input type="text" name="company_name" placeholder="Название компании">
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="form-row">
                                    <label for="company_activity">Деятельность</label>
                                    <input type="text" name="company_activity" placeholder="Деятельность">
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="form-row">
                                    <label for="company_manager">Данные менеджера</label>
                                    <div class="form-row_inner">
                                        <input type="text" name="manager_name" placeholder="Имя">
                                        <label class="error">обязательно поле</label>
                                    </div>
                                    <div class="form-row_inner">
                                        <input type="text" name="manager_surname" placeholder="Фамилия">
                                        <label class="error">обязательно поле</label>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <label for="company_phone">Номер телефона менеджера</label>
                                    <input type="text" name="company_phone" placeholder="Номер телефона менеджера">
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="form-row">
                                    <label for="company_site">Ваш сайт</label>
                                    <input type="text" name="company_site" placeholder="Ваш сайт">
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="form-row btn-row">
                                    <input type="submit" value="finish" class="btn finish">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="login-holder">
                <div class="wrap-form login">
                    <div class="container">
                        <div class="wrap-form-inner"></div>
                        <form action="#">
                            <div class="form-title">
                                <h2>login form</h2>
                            </div>
                            <div class="form-content">
                                <div class="form-row">
                                    <label for="name">Введите логин</label>
                                    <input type="text" name="name" placeholder="Введите логин ">
                                </div>
                                <div class="form-row">
                                    <label for="password">Введите пароль</label>
                                    <input type="password" name="password" placeholder="Введите пароль ">
                                    <label class="error">обязательно поле</label>
                                </div>
                                <div class="form-row btn-row">
                                    <input type="submit" value="login" class="btn login">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script id="vacancy_item_template" type="text/x-handlebars-template">
    <li class="vacancies-item">
        <div class="vacancies-left">
            <div class="img"><a href="{{img}}" onerror="this.href='http://placehold.it/350x150'"
                                data-fancybox-group="gallery"
                                class="fancybox"><img src="{{img}}" onerror="this.src='http://placehold.it/350x150'"
                                                      alt=""></a>
            </div>
        </div>
        <div class="vacancies-right">
            <dl>
                <dt>Название вакансии:</dt>
                <dd><span class="vacancies-title">{{name}}</span></dd>
                <dt>Город:</dt>
                <dd><span class="vacancies-city">{{city}}</span></dd>
                <a href="vacancies-inner.html?id={{id}}" class="link">подробнее</a>
            </dl>
        </div>
    </li>
</script>

<script src="js/jquery.js"></script>
<!--<script src="js/jquery.mobile.min.js"></script>-->
<script src="js/jquery-ui.min.js"></script>
<script src="js/widgets.js"></script>
<script src="js/functions.js"></script>
<script src="js/menu.js"></script>
<script src="js/close-blocks.js"></script>
<script src="js/app/user/userCtrl.js"></script>
<script src="common/services/urlService.js"></script>
<script src="common/services/requestService.js"></script>
<script src="bower_components/handlebars/handlebars.min.js"></script>
<script>
    /*$( document ).ready(function() {
        $('.vacancies-list li').addClass('customfx');
    });*/
</script>

</body>
</html>