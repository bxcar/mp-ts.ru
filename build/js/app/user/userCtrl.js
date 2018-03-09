/**
 * Created by Vista on 27.01.17.
 */
var vac_arr_global = [];

function Swipe(callback) {
    var me = this;
    var treshold = Math.floor(window.innerWidth / 3);
    var verticalDev = Math.floor(treshold / 2);
    this.x = 0;
    this.y = 0;
    this.timestamp = 0;

    this.callback = callback;

    document.addEventListener('touchstart', function (evt) {
        me.x = evt.touches[0].clientX;
        me.y = evt.touches[0].clientY;

        me.timestamp = Math.floor(Date.now());
    }, false);


    document.addEventListener('touchmove', function (evt) {
        var newX = evt.touches[0].clientX;
        var newY = evt.touches[0].clientY;

        var distX = Math.abs(newX - me.x);
        var distY = Math.abs(newY - me.y);
        var direction = newX > me.x;


        if (distX > treshold && distY < verticalDev) {
            var ts = Math.floor(Date.now());

            if ((ts - me.timestamp) < 200) {
                if (typeof( me.callback === 'function' )) {
                    me.x = me.y = me.timestamp = 0;
                    console.log('Swipe');
                    me.callback(direction);
                }
            }
        }
    }, false);
};

function Request() {
    var _getRequest = function (endpoint, callback, options) { //callback( err, data )
        var req = new XMLHttpRequest();
        var queryString = '';

        if (options !== undefined) {
            var params = [];
            for (key in options) {
                if (options.hasOwnProperty(key)) {
                    params.push(encodeURIComponent(key) + "=" + encodeURIComponent(options[key]));
                }
            }
            queryString = '?' + params.join('&');
        }

        req.open('GET', endpoint + queryString, true);

        req.onload = function () {
            if (req.readyState == 4 && req.status == 200) {
                callback(null, JSON.parse(req.responseText));
            } else {
                callback(JSON.parse(req.responseText), null);
            }
        };

        req.onerror = function () {
            callback({result: -1, message: 'Network error'}, null);
        };

        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        req.send();
    };

    var _postRequest = function (endpoint, callback, options) {
        var req = new XMLHttpRequest();
        var params = new FormData();
        if (options !== undefined) {
            for (key in options) {
                if (options.hasOwnProperty(key)) {
                    params.append(key, options[key]);
                }
            }
        }

        req.open('POST', endpoint, true);

        req.onload = function () {
            if (req.readyState == 4 && req.status == 200)
                callback(null, JSON.parse(req.responseText));
            else
                callback(JSON.parse(req.responseText), null);
        };

        req.onerror = function () {
            callback({result: -1, message: 'Network error'}, null);
        };

//                    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        req.send(params);
    };

    this.get = function (endpoint, callback, options) {
        _getRequest(endpoint, callback, options);
    }

    this.post = function (endpoint, callback, options) {
        _postRequest(endpoint, callback, options);
    }
};

var loginCtrl = {
    reg_data: '',
    friends: [],
    events: [],
    newsData: [],
    master: {
        skills: {
            skill_atigraviyka: 'Антигравийка',
            skill_vinyl: 'Цветной винил',
            skill_toning: 'Тонировка',
            skill_diteyling: 'Детейлинг',
            skill_graphics: 'Коммерческая графика'
        },
        skill_diteyling: {
            diteyling_skill1: 'Полировка',
            diteyling_skill2: 'Химчистка',
            diteyling_skill3: 'Покрытие',
            diteyling_skill4: 'Полировка',
            diteyling_skill5: 'Защитная пленка'
        },
        skill_graphics: {
            graphic_skill1: 'Типография',
            graphic_skill2: 'Дизайнер',
            graphic_skill3: 'Монтажник'
        }
    },
    provider: {
        provider1: 'Типография',
        provider2: 'Дизайнер',
        provider3: 'Монтажник'
    },
    selectedCalendar: 0,
    checkCity: false,
    inputFile: null,
    skills: {
        guest: {
            name: 'Гость',
            value: false
        },
        master: {
            name: 'Мастер',
            value: false,
            specs: {
                antigravel: {
                    name: 'Антигравийка',
                    value: false
                },
                vinil: {
                    name: 'Винил',
                    value: false
                },
                tinting: {
                    name: 'Тонировка',
                    value: false
                },
                detailing: {
                    name: 'Детейлинг',
                    value: false,
                    specs: {
                        skill1: {
                            name: 'Полировка',
                            value: false
                        },
                        skill2: {
                            name: 'Химчистка',
                            value: false
                        },
                        skill3: {
                            name: 'Покрытие',
                            value: false
                        },
                        skill4: {
                            name: 'Полировка',
                            value: false
                        },
                        skill5: {
                            name: 'Защитная пленка',
                            value: false
                        }
                    }
                },
                graphics: {
                    name: 'Коммерческая графика',
                    value: false,
                    specs: {
                        skill1: {
                            name: 'Типография',
                            value: false
                        },
                        skill2: {
                            name: 'Дизайнер',
                            value: false
                        },
                        skill3: {
                            name: 'Монтажник',
                            value: false
                        }
                    }
                }

            }
        },
        vendor: {
            name: 'Поставщик',
            value: false
        },
        company: {
            name: 'Компания',
            value: false
        }
    },
    swipe: null,
    previewAvatar: function (avatarFile, canvasName) {
        console.log('previewing avatar');

        var url = null;

        try {
            url = (window.URL || window.webkitURL).createObjectURL(avatarFile);
        } catch (err) {
            alert("URL: " + err.message);
        }

        var img = new Image();
        img.src = url;

        var canvas = document.getElementById(canvasName);
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        img.onload = function () {
            document.getElementById('user-avatar').style.display = 'none';
            console.log('drawing in ' + canvasName);
            document.getElementById(canvasName).style.display = 'block';
            var new_x = 0;
            var new_y = 0;

            img_width = img.width;
            img_height = img.height;

            console.log(img_width + ':' + img_height)

            if (img_width > img_height) {
                new_x = (150 * img_width) / img_height;
                new_y = 150;
                console.log('1:' + new_x + ':' + new_y);
            }

            else if (img_height > img_width) {
                new_x = 150;
                new_y = (150 * img_height) / img_width;
                console.log('2:' + new_x + ':' + new_y);
            }

            else {
                new_x = 150;
                new_y = 150;
                console.log('3:' + new_x + ':' + new_y);
            }

            context.arc(75, 75, 75, 0, Math.PI * 2, true);
            context.clip();

            context.drawImage(img, 0, 0, new_x, new_y);
        }
    },
    previewImg: function (avatarFile, canvasName) {
        var url = null;

        try {
            url = (window.URL || window.webkitURL).createObjectURL(avatarFile);
        } catch (err) {
            alert("URL: " + err.message);
        }

        var img = new Image();
        img.src = url;

        var canvas = document.getElementById(canvasName);
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        img.onload = function () {
            var new_x = 0;
            var new_y = 0;

            img_width = img.width;
            img_height = img.height;

            console.log(img_width + ':' + img_height)

            if (img_width < img_height) {
                new_x = (150 * img_width) / img_height;
                new_y = 150;
                console.log('1:' + new_x + ':' + new_y);
            }

            else if (img_height < img_width) {
                new_x = 150;
                new_y = (150 * img_height) / img_width;
                console.log('2:' + new_x + ':' + new_y);
            }

            else {
                new_x = 150;
                new_y = 150;
                console.log('3:' + new_x + ':' + new_y);
            }

            context.drawImage(img, 0, 0, new_x, new_y);
        }
    },
    initSwipeMenu: function () {
        loginCtrl.swipe = new Swipe(loginCtrl.openMenu);
    },
    openMenu: function (right) {
        var leftMenuBtn = $('.menu-open.left'),
            leftMenuHolder = $('.side.left'),

            body = $('body'),
            bodyClass = 'opened';

        if (right) {
            body.addClass(bodyClass);
//            leftMenuBtn.toggleClass( 'active' );
            leftMenuHolder.toggleClass('visible');
        } else {
            body.removeClass(bodyClass);
            leftMenuHolder.removeClass('visible');
//            leftMenuBtn.removeClass('active');
        }
    },
    displaySkills: function (obj, prefix, level) {
        console.log(obj);

        if (prefix == undefined) prefix = '';
        if (level == undefined) level = 0;
        var txt = '';

        if (prefix.length != 0) prefix += '.specs.';

        for (var key in obj) {
            console.log(key);
            if (key == 'detailing') {
                txt += '<input type="checkbox" name="' + prefix + key + '"' + (obj[key].value ? ' checked' : '') + ' value="' + obj[key].value + '" onchange="loginCtrl.skillChange(this)">Детейлинг<br/>\n';
            } else {
                txt += '<input type="checkbox" name="' + prefix + key + '"' + (obj[key].value ? ' checked' : '') + ' value="' + obj[key].value + '" onchange="loginCtrl.skillChange(this)">' + obj[key].name + '<br/>\n';
            }
            if (obj[key].specs != null && typeof( obj[key].specs ) == 'object') {
                var divName = prefix + key;
                var divname = divName.replace(/\./g, '-');
                var divVisibility = obj[key].value ? 'block' : 'none';
                txt += '<div id="' + divname + '" style="display:' + divVisibility + '" class="hierarchy-' + level + '">\n';

//                for( var i in obj[key].specs ) {
                txt += loginCtrl.displaySkills(obj[key].specs, prefix + key, level + 1);
//                }

                txt += '</div>\n';
            }
        }
        return txt;
    },
    listSkills: function (obj) {
        var txt = '';
        var dlm = '';

        for (var key in obj) {
            if (obj[key].value) {
                txt += obj[key].name;
                dlm = ', ';

            } else {
                txt += '';
                dlm = '';
            }
            if (obj[key].specs != null && typeof( obj[key].specs ) == 'object') {
                var instxt = loginCtrl.listSkills(obj[key].specs);
                if (instxt.length != 0)
                    txt += ' (' + instxt.trim() + ')';
            }
            txt += dlm;
        }
        if (txt.length)
            txt = txt.substr(0, txt.length - 2);
        return txt;
    },
    skillChange: function (elem) {
        var x = elem.name;
        var div = document.getElementById(x.replace(/\./g, '-'));
        if (elem.checked == true) {
            eval('loginCtrl.skills.master.specs.' + x + '.value=true');
            if (div != undefined)
                div.style.display = 'block';
        } else {
            eval('loginCtrl.skills.master.specs.' + x + '.value=false');
            if (div != undefined)
                div.style.display = 'none';
        }
    },
    serializeSkills: function () {
        return JSON.stringify(loginCtrl.skills.master.specs);
    },
    restorePassword: function () {
        var req = new Request();
        var email = document.getElementById('email-input').value;

        console.log(email);

        req.get(urlService.password.restore, function (err, dta) {
            if (dta) {
                if (dta.result) {
                    alert('Ошибка восстановления пароля: ' + dta.description);
                } else {
                    alert('Вам отправлено письмо со ссылкой на восстановление пароля');
                    window.location.assign('index.html');
                }
            } else {
                alert('Ошибка восстановления пароля: ' + err);
                console.log('Err:');
                console.log(err);
            }
        }, {email: email});
    },
    newPassword: function () {
        var id = location.search.split('token=')[1];

        var passw1 = document.getElementById('password1').value.trim();
        var passw2 = document.getElementById('password2').value.trim();

        if (passw1 != passw2) {
            alert('Пароли не совпадают');
            return;
        }

        var req = new Request();

        req.get(urlService.api + urlService.user.new_passw, function (err, dta) {
            if (dta) {
                if (!dta.status) {
                    alert('Ошибка смены пароля: ');
                } else {
                    alert('Пароль успешно сменён.');
                    window.location.assign('index.html');
                }
            } else {
                alert('Ошибка смены пароля: ' + err.status);
                console.log('Err:');
                console.log(err);
            }
        }, {token: id, password: passw1});

    },
    followUser: function (user) {
        console.log("uid:" + user + " me:" + localStorage.user_id);
        if (localStorage.user_id != null && localStorage.user_id !== '') {
            var data = "user_id=" + user + "&followed_by=" + localStorage.user_id;

            var onSuccess = function (resp) {
                console.log(resp);
                if (resp.status) {
                    console.log("following ok");
                    alert("Вы подписались на пользователя");
                } else {
                    console.log("following failed");
                    alert("Ошибка подписки на пользователя");
                }
            };

            var onError = function (err) {
                console.log("following failed:" + err);
                alert("Вы уже подписаны на пользователя");
            };

            requestService.post(urlService.user.follow, data, onSuccess, onError);
        }
    },
    login: function () {

        var form = $('form[name=login_form]');
        if ($('#save_password').is(":checked")) {
            localStorage.remember_me = true;
            localStorage.user_login = form.find('input[name=username]').val();
            localStorage.password = form.find('input[name=password]').val();
        }
        else {
            localStorage.remember_me = false;
        }
        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
                localStorage.auth_key = result.auth_key;
                localStorage.user_id = result.user_id;
                localStorage.username = result.username;
                localStorage.admin = result.admin;

                console.log('adm:' + result.admin + '/' + localStorage.admin);
                window.location = 'user-profile-view.html?user=' + result.user_id;
            }
            else {
                logger.write('Login failed:' + form.serialize() + '(' + JSON.stringify(result) + ')');
                alert('Вы ввели неверные данные! Повторите попытку снова!');
                return false;
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.user.login, form.serialize(), successCallback, errorCallback)
    },
    validateRegistrationFields: function (form) {
        var txt = form.find('input[name="username"]').val();

        if (txt.match(/^\s*[a-zA-Zа-яА-ЯёЁ]{2,40}(\s+[a-zA-Zа-яА-ЯёЁ]{2,40})+\s*$/) == null) {
            alert("Введите свои фамилию и имя полностью");
            return false;
        }

        txt = form.find('input[name="email"]').val();

        if (txt.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/) == null) {
            alert("Введите правильный адрес эл.почты");
            return false;
        }

        txt = form.find('input[name="password"]').val();

        if (txt.length < 6) {
            alert("Пароль должен быть 6 и более символов");
            return false;
        }

        var txt2 = form.find('input[name="user_password2"]').val();

        if (txt !== txt2) {
            alert("Пароли не совпадают");
            return false;
        }

        return true;
    },
    registration: function (form_name) {
        var form = $('form[name=reg_form]');
        if (form_name == 'master') if (!loginCtrl.validateRegistrationFields(form)) return;

        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
                alert('Пользователь успешно зарегистрирован');
                $('.btn.login')[0].click();
            } else {
                if (result.msg.username != null) {
                    alert("Эти имя и фамилия пользователя уже используются");
                } else if (result.msg.email) {
                    alert("Этот адрес эл.почты уже зарегистрирован");
                } else {
                    alert("Ошибка регистрации: " + JSON.stringify(result.msg));
                }
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };

        if (typeof form_name !== 'undefined') {
            var custom_form = $('form[name=' + form_name + '_form]');
            var data = new FormData();
            var form_data = form.serializeArray();
            var custom_formArr = custom_form.serializeArray();
            var additionalskillsArr = [];
            data.append('form_name', form_name);
            if (form_name == 'master') {
                /*                var skill_name = loginCtrl[form_name].skills[custom_formArr[0].value];
                 if (custom_formArr.length > 1) {

                 for (var i = 1; i < custom_formArr.length; i++) {
                 var obj = custom_formArr[i];
                 var add_skill = loginCtrl[form_name][custom_formArr[0].value][obj.name];
                 additionalskillsArr.push(add_skill);
                 }
                 }
                 additionalskillsArr.push(skill_name);
                 data.append('additionalskill', JSON.stringify(additionalskillsArr));*/
                data.append('additionalskill', loginCtrl.serializeSkills());
            }
            else if (form_name == 'provider') {

                console.log(custom_formArr);
                for (var i = 0; i < custom_formArr.length; i++) {
                    var obj = custom_formArr[i];
                    var add_skill = loginCtrl[form_name][obj.name];
                    additionalskillsArr.push(add_skill);
                }
                data.append('additionalskill', JSON.stringify(additionalskillsArr));
            }
            else {
                for (var i in custom_formArr) {
                    data.append(custom_formArr[i].name, custom_formArr[i].value);
                }
            }
            for (var i in form_data) {
                data.append(form_data[i].name, form_data[i].value);
            }

            if (custom_form.find('input[name=doc]')[0].files[0] != null)
                data.append('doc', custom_form.find('input[name=doc]')[0].files[0]);

            var txt = '';


//            for( var pair of data.entries() ) {
//                console.log(pair[0]+ ':' + pair[1]);
//                txt+=pair[0]+ ':' + pair[1]+', ';
//            }

            logger.write('Registration: ' + txt);

            xhr = new XMLHttpRequest();


            xhr.onreadystatechange = function () {
                console.log('Got:' + xhr.readyState);
                console.log('Status:' + xhr.status);

                if (xhr.readyState == 4)
                    if (xhr.status == 200) {
                        logger.write('RegResp: ' + xhr.responseText);
                        console.log('Got:' + xhr.responseText);
                        if (JSON.parse(xhr.responseText).status) {
                            alert('Данные успешно сохранены');
                            window.location = 'index.html';
                            return false;
                        }
                        else {
                            alert('Произошла ошибка (' + xhr.status + '): ' + xhr.responseText);
                            return false;
                        }
                    } else {
                        alert('Status:' + xhr.status + '(' + xhr.readyState + ')' + '\n' + xhr.responseText);
                    }


            };

            xhr.upload.onprogress = function (e) {
                console.log(Math.round(e.loaded / e.total * 100) + '%');
            }

            xhr.open('POST', urlService.api + urlService.user.sign_up, true);
            xhr.send(data);

            /*
             xhr.open('POST', urlService.api + urlService.user.sign_up, true);
             xhr.onreadystatechange = function (response) {
             console.log(response);
             if (xhr.readyState == XMLHttpRequest.DONE) {
             if (JSON.parse(xhr.responseText).status) {
             alert('Данные успешно сохранены');
             window.location = 'user-profile-view.html';
             return false;
             }
             else {
             // alert('Произошла ошибка');
             return false;
             }
             }

             };

             xhr.send(data); */
        }
        else {
//            requestService.post(urlService.user.sign_up, form.serialize(), successCallback, errorCallback)
            xhr = new XMLHttpRequest();


            xhr.onreadystatechange = function () {
                console.log('Got:' + xhr.readyState);
                console.log('Status:' + xhr.status);

                if (xhr.readyState == 4)
                    if (xhr.status == 200) {
                        console.log('Got:' + xhr.responseText);
                        if (JSON.parse(xhr.responseText).status) {
                            alert('Данные успешно сохранены');
                            window.location = 'index.html';
                            return false;
                        }
                        else {
                            alert('Произошла ошибка (' + xhr.status + '): ' + JSON.parse(xhr.responseText).msg);
                            return false;
                        }
                    } else {
                        alert('Status:' + xhr.status + '(' + xhr.readyState + ')' + '\n' + xhr.responseText);
                    }


            };

            xhr.upload.onprogress = function (e) {
                console.log(Math.round(e.loaded / e.total * 100) + '%');
            }

            xhr.open('POST', urlService.api + urlService.user.sign_up, true);
            console.log(form.serialize());
            var data = new FormData();
            var form_data = form.serializeArray();
            for (var i in form_data)
                data.append(form_data[i].name, form_data[i].value);
            xhr.send(data);
        }
    },
    next_step: function () {
        loginCtrl.reg_data = $('form[name=reg_form]');
    },
    profile: function () {
        loginCtrl.initSwipeMenu();
        var id = location.search.split("user=")[1];
        var data = {
            auth_key: localStorage.auth_key,
        };
        if (typeof id !== 'undefined') {
            data.id = id;
        } else {
            data.id = localStorage.user_id;
        }

        if (data.id == localStorage.user_id)
            $('#comment-send-holder').html('');

        $('#file_entry').change(function (e) {
            document.getElementById('img-preview').style.display = 'block';
            loginCtrl.previewImg(e.target.files[0], 'file-preview');
        });


        var successCallback = function (result) {
            console.log(result);
            var user = result.user;
            user.counts = result.counts;
            if (user.avatar)
                user.avatar = "http://mp-ts.ru/api/web/img/" + user.avatar;
            if (user.id === parseInt(localStorage.user_id)) {
                localStorage.user_avatar = user.avatar;
            }
            localStorage.role = result.user.role;

            switch (result.user.role) {
                case
                10
                :
                    result.user.role_text = 'Гость';
                    break;
                case
                20
                :
                    result.user.role_text = 'Мастер';
                    break;
                case
                30
                :
                    result.user.role_text = 'Поставщик';
                    break;
                case
                40
                :
                    result.user.role_text = 'Компания';
                    break;
            }
            if (result.user.role != 20)
                document.getElementById('vacancies-menu-item').style.display = 'none';

            if (result.user.role == 10 || result.user.role == 30)
                document.getElementById('invite-menu-item').style.display = 'none';

            if ((result.user.role == 20 || result.user.role == 30) && (result.skills.length > 0)) {
                loginCtrl.skills.master.specs = JSON.parse(result.skills[0].skills);
                /*                var new_skills = "";
                 for (var i in skills) {
                 var obj = skills[i];
                 if (obj !== null) {
                 new_skills += obj + " ";
                 }
                 } */
            }
//            user.skills = new_skills;
            if (result.user.role == 20)
                user.skills = loginCtrl.listSkills(loginCtrl.skills.master.specs);
            if (localStorage.user_id == user.id) {
                localStorage.userdata = JSON.stringify(user);
                if (result.user.role == 20) {
                    console.log(result.skills, result.skills[0]);
                    if (result.skills[0])
                        localStorage.skills = result.skills[0].skills;
                    else
                        localStorage.skills = JSON.stringify(loginCtrl.skills.master.specs);
                }
            }

            localStorage.city = user.city;

            $('.top-user-image img').attr('src', localStorage.user_avatar);
            $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
            $('#name_surname_menu').text(localStorage.username);

            var source = $("#user-about-template").html();
            var template = Handlebars.compile(source);
            var html = template(user);
            $("#user-about-parent").append(html);

            ss();
        };
        var errorCallback = function (result) {
            console.log(result);
        };

        var getEventsSucceed = function (result) {
            console.log('events');
            console.log(result);
            var newEvents = result[0].eventcount;
            console.log("New events:" + newEvents);
            if (newEvents > 0)
                $('#events-count').text('(+' + newEvents + ')');
        };

        var getEventsFailed = function (result) {
            console.log(result);
        };

        requestService.get(urlService.user.profile, data, successCallback, errorCallback);
        requestService.get(urlService.event.count, {id: data.id}, getEventsSucceed, getEventsFailed);
    },
    profile_edit: function () {
        loginCtrl.initSwipeMenu();

        var id = location.search.split("user=")[1];
        var data = {
            auth_key: localStorage.auth_key,
        };
        if (typeof id !== 'undefined') {
            data.id = id;
        } else {
            data.id = localStorage.user_id;
        }

        console.log(data.id + '/' + localStorage.user_id)

        if (data.id == localStorage.user_id)
            $('#comment-send-holder').html('');

        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        $('#name_surname_menu').text(localStorage.username);

        var source = $("#user-about-edit-template").html();
        var template = Handlebars.compile(source);
        var html = template(JSON.parse(localStorage.userdata));
        $("#user-about-edit-parent").append(html);
        if (localStorage.user_avatar) {
            $('#blah').attr('src', localStorage.user_avatar);
            $('#blah1').attr('href', localStorage.user_avatar);
        }
        console.log(localStorage.user_avatar);
        if (localStorage.user_avatar == 'null')
            $('#blah1').remove();

        var ud = JSON.parse(localStorage.userdata);

        var txt = '';
        if (ud.role == 20) {
            loginCtrl.skills.master.specs = JSON.parse(localStorage.skills);
            txt = loginCtrl.displaySkills(loginCtrl.skills.master.specs);
        }


        document.getElementById('profile-edit-skills').innerHTML = txt;


        function readURL(input) {

            if (input.files && input.files[0]) {
                loginCtrl.inputFile = input.files[0];
                loginCtrl.previewAvatar(input.files[0], 'avatar-preview');
//                var reader = new FileReader();

//                reader.onload = function (e) {
//                    $('#blah').attr('src', e.target.result);
//                }

//                reader.readAsDataURL(input.files[0]);
            } else {
                loginCtrl.inputFile = null;
            }
        }

        $("#file").change(function () {
            readURL(this);
        });
        $("#file_gallery").change(function (e) {
            loginCtrl.previewImg(e.target.files[0], 'file-preview');
        });
    },
    save_profile: function () {
        var form = $('form[name=user-edit-form]');

        var txt = form.find($('input[name="username"]')).val();
        if (txt.match(/^\s*[a-zA-Zа-яА-ЯёЁ]{2,40}(\s+[a-zA-Zа-яА-ЯёЁ]{2,40})+\s*$/) == null) {
            alert("Введите свои фамилию и имя полностью");
            return false;
        }
        txt = form.find('input[name="email"]').val();
        if (txt.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/) == null) {
            alert("Введите правильно адрес эл.почты");
            return false;
        }

        var fd = new FormData();
        var file = document.getElementById('file');
        if (loginCtrl.inputFile != null)
//            fd.append('avatar', loginCtrl.inputFile );
            fd.append('avatar', file.files[0]);

        fd.append('username', form.find($('input[name="username"]')).val());
        fd.append('city', form.find($('input[name="city"]')).val());
        fd.append('address', form.find($('input[name="address"]')).val());
        fd.append('sex', form.find($('select[name="sex"]')).val());
        fd.append('date_birth', form.find($('input[name="date_birth"]')).val());
        fd.append('email', form.find($('input[name="email"]')).val());
        fd.append('phone', form.find($('input[name="phone"]')).val());
        fd.append('vk', form.find($('input[name="vk"]')).val());
        fd.append('user_id', localStorage.user_id);
        fd.append('skills', loginCtrl.serializeSkills());

        var txt = '';

        /*        for( var pair of fd.entries() ) {
         console.log(pair[0]+ ':' + pair[1]);
         txt+=pair[0]+ ':' + pair[1]+'; ';
         }
         */
        logger.write('User:' + localStorage.username + '. ProfUpd:' + txt);

        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
//            console.log( 'Got:'+xhr.readyState );
//            console.log( 'Status:'+xhr.status );
//            console.log( 'Got_:'+xhr.responseText );
            if (xhr.readyState == 4)
                if (xhr.status == 200) {
                    logger.write('User:' + localStorage.username + ' profile update:' + xhr.responseText);
                    if (JSON.parse(xhr.responseText).status) {
                        alert('Данные успешно сохранены');
                        window.location = 'user-profile-view.html';
                        return false;
                    }
                    else {
                        alert('Произошла ошибка (' + xhr.status + '): ' + JSON.parse(xhr.responseText).msg);
                        return false;
                    }
                } else {
                    alert('Status:' + xhr.status + '(' + xhr.readyState + ')' + '\n' + xhr.responseText);
                }


        };

        xhr.upload.onprogress = function (e) {
            console.log(Math.round(e.loaded / e.total * 100) + '%');
        }


        xhr.open('POST', urlService.api + urlService.user.profile_update, true);
//        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(fd);
        // requestService.post(urlService.user.profile_update, fd, successCallback, errorCallback)
    },
    sendEntry: function () {
        var form = $('form[name=entry_form]');
        var fd = new FormData();
        var file = document.getElementById('file_entry');
        fd.append('file', file.files[0]);
        fd.append('text', form.find($('textarea[name="text"]')).val());
        var user_id = location.search.split("user=")[1];
        if (typeof user_id === 'undefined') {
            user_id = localStorage.user_id;
        }
        fd.append('getter_id', user_id);
        fd.append('sender_id', localStorage.user_id);
        fd.append('type', 1);

//        for (var pair of fd.entries()) {
//            console.log(pair[0]+ ', ' + pair[1]);
//        }

        console.log('send msg');

        xhr = new XMLHttpRequest();

        xhr.open('POST', urlService.api + urlService.entry.add, true);
        xhr.onreadystatechange = function () {
            console.log(xhr.responseText);
            if (xhr.readyState == 4)
                if (xhr.status == 200) {
                    if (JSON.parse(xhr.responseText).status) {
                        // alert('Данные успешно сохранены');
                        // window.location.reload();
                        form.find($('textarea[name="text"]')).val('');
                        document.getElementById('img-preview').style.display = 'none';
                        loginCtrl.getEntries();
                    } else {
                        alert('Произошла ошибка (' + xhr.status + '): ' + JSON.parse(xhr.responseText).msg);
                        return false;
                    }
                }

        };

        xhr.send(fd);
    },
    sendNews: function () {
        var form = $('form[name=entry_form]');
        var fd = new FormData();
        var file = document.getElementById('file_entry');
        fd.append('file', file.files[0]);
        fd.append('text', form.find($('textarea[name="text"]')).val());
        var user_id = location.search.split("user=")[1];
        if (typeof user_id === 'undefined') {
            user_id = localStorage.user_id;
        }
        fd.append('getter_id', user_id);
        fd.append('sender_id', localStorage.user_id);
        fd.append('type', 0);

        /*        for (var pair of fd.entries()) {
         console.log(pair[0]+ ', ' + pair[1]);
         }
         */

        xhr = new XMLHttpRequest();

        xhr.open('POST', urlService.api + urlService.entry.add, true);
        xhr.onreadystatechange = function () {
            console.log(xhr.responseText);
//            if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.readyState == 4)
                if (xhr.status == 200) {
                    if (JSON.parse(xhr.responseText).status) {
                        // alert('Данные успешно сохранены');
                        // window.location.reload();
                        form.find($('textarea[name="text"]')).val('');
                        $("#post-item-parent").html("");
                        document.getElementById('img-preview').style.display = 'none';
                        loginCtrl.news();
                    }
                    else {
                        // alert('Произошла ошибка');
                        return false;
                    }
                }

        };

        xhr.send(fd);
    },
    getEntries: function () {
        $("#post-item-parent").empty();
        var id = location.search.split("user=")[1];
        var data = {
            auth_key: localStorage.auth_key,
        };
        if (typeof id !== 'undefined') {
            data.id = id;
        } else {
            data.id = localStorage.user_id;
        }
        var successCallback = function (result) {
            loginCtrl.newsData = result.data;
            console.log(result);
            for (var i in loginCtrl.newsData) {
                var obj = loginCtrl.newsData[i];
                loginCtrl.newsData[i].idx = i;

                if (obj.sender_id == localStorage.user_id || obj.getter_id == localStorage.user_id) {
                    obj.access = true;
                }
                else {
                    obj.access = false;
                }


                obj.avatar = "http://mp-ts.ru/api/web/img/" + obj.avatar;
                if (obj.attachment !== null) {
                    obj.attachment = "http://mp-ts.ru/api/web/img/" + obj.attachment;
                }
                obj.comment_avatar = localStorage.user_avatar;
                obj.user_sender_id = localStorage.user_id;
                var a = moment(obj.create_date * 1000);
                obj.create_date = a.fromNow();
                obj.comments_count = obj.comments.length;
                var source = $("#post-item-template").html();
                var template = Handlebars.compile(source);
                var html = template(obj);
                $("#post-item-parent").append(html);

                loginCtrl.fillComments(i);

                /*                for (var j in obj.comments) {
                 var comment_obj = obj.comments[j];
                 var source = $("#comment_template").html();
                 var template = Handlebars.compile(source);
                 comment_obj.avatar = "http://mp-ts.ru/api/web/img/" + comment_obj.avatar;
                 var html = template(comment_obj);
                 $("#comment_parent_template-" + obj.id).append(html);
                 } */
            }
            ss();

        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.entry.get, data, successCallback, errorCallback)

    },
    sendComment: function (id) {
        var form = $('form[name=commentForm-' + id + ']');
        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
                window.location.assign('news-view.html');
//                loginCtrl.getEntries();
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        console.log(form.serialize());
        requestService.post(urlService.comment.add, form.serialize(), successCallback, errorCallback)

    },
    sendCommentEntries: function (id) {
        var form = $('form[name=commentForm-' + id + ']');
        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
//                window.location.assign( 'news-view.html' );
                loginCtrl.getEntries();
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        console.log(form.serialize());
        requestService.post(urlService.comment.add, form.serialize(), successCallback, errorCallback)

    },
    friend_list: function (search) {
        loginCtrl.initSwipeMenu();

        var role = JSON.parse(localStorage.userdata).role;
        if (role != 20)
            document.getElementById('vacancies-menu-item').style.display = 'none';

        if (role == 10 || role == 30)
            document.getElementById('invite-menu-item').style.display = 'none';


        if (loginCtrl.userList) $("#friend-list-parent-" + loginCtrl.userList).empty();
        if (typeof search !== 'undefined') {
            for (var i in loginCtrl.friends) {
                var obj = loginCtrl.friends[i];

                if (obj.username.indexOf($('p input[name=q]').val()) !== -1) {

                    obj.avatar = "http://mp-ts.ru/api/web/img/" + obj.avatar;
                    var source = $("#friend-list-item-template").html();
                    var template = Handlebars.compile(source);
                    var html = template(obj);
                    $("#friend-list-parent-" + loginCtrl.userList).append(html);
                }
            }
            return false;
        }
        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        $('#name_surname_menu').text(localStorage.username);

        var successCallback = function (result) {
            loginCtrl.friends = result;
//            console.log(result);
            $("#friend-list-parent-company").hide();
            $("#friend-list-parent-master").hide();
            $("#friend-list-parent-vendor").hide();
            $("#friend-list-parent-guest").hide();
            $("#friend-list-parent-followed").hide();
            $("#friend-list-parent-followers").hide();

            for (var i in result) {
                var obj = result[i];
                if (obj.role == 10) {
                    obj.role = 'Гость';
                } else if (obj.role == 20) {
                    obj.role = 'Мастер';
                } else if (obj.role == 30) {
                    obj.role = 'Поставщик';
                } else {
                    obj.role = 'Компания';
                }
                obj.avatar = "http://mp-ts.ru/api/web/img/" + obj.avatar;
                var source = $("#friend-list-item-template").html();
                var template = Handlebars.compile(source);
                var html = template(obj);

                if (obj.followed == 2)
                    $("#friend-list-parent-followed").append(html);

                if (obj.followed == 1)
                    $("#friend-list-parent-followers").append(html);

                switch (obj.role.toUpperCase()) {
                    case 'КОМПАНИЯ':
                        console.log(obj);
                        $("#friend-list-parent-company").append(html);
                        break;
                    case 'МАСТЕР':
                        console.log(obj);
                        $("#friend-list-parent-master").append(html);
                        break;
                    case 'ПОСТАВЩИК':
                        console.log(obj);
                        $("#friend-list-parent-vendor").append(html);
                        break;
                    default:
                        console.log(obj);
                        $("#friend-list-parent-guest").append(html);
                        break;
                }
                ;
            }
//            $("#friend-list-parent-guest").show();
//            $("#friend-list-menu-guest").css("border-bottom", "2px solid #fff");
            loginCtrl.selectFriendList('guest');
            friendInfo();
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.user.friend_list, {id: localStorage.user_id}, successCallback, errorCallback)

    },
    userList: null,
    selectFriendList: function (ul) {
        loginCtrl.userList = ul;
        $("#friend-list-parent-company").hide();
        $("#friend-list-parent-master").hide();
        $("#friend-list-parent-vendor").hide();
        $("#friend-list-parent-guest").hide();
        $("#friend-list-parent-followed").hide();
        $("#friend-list-parent-followers").hide();
        $("#friend-list-parent-" + ul).show();

        $("#friend-list-menu-company").css({
            'background': 'none',
            'border-radius': '13px',
            'padding': '5px',
            'color': '#fff',
            'font-weight': '100',
            'line-height': '4'
        });
        $("#friend-list-menu-master").css({
            'background': 'none',
            'border-radius': '13px',
            'padding': '5px',
            'color': '#fff',
            'font-weight': '100',
            'line-height': '4'
        });
        $("#friend-list-menu-vendor").css({
            'background': 'none',
            'border-radius': '13px',
            'padding': '5px',
            'color': '#fff',
            'font-weight': '100',
            'line-height': '4'
        });
        $("#friend-list-menu-guest").css({
            'background': 'none',
            'border-radius': '13px',
            'padding': '5px',
            'color': '#fff',
            'font-weight': '100',
            'line-height': '4'
        });
        $("#friend-list-menu-followed").css({
            'background': 'none',
            'border-radius': '13px',
            'padding': '5px',
            'color': '#fff',
            'font-weight': '100',
            'line-height': '4'
        });
        $("#friend-list-menu-followers").css({
            'background': 'none',
            'border-radius': '13px',
            'padding': '5px',
            'color': '#fff',
            'font-weight': '100',
            'line-height': '4'
        });

        $("#friend-list-menu-" + ul).css({
            'background-color': '#eee',
            'border-radius': '13px',
            'padding': '5px',
            'color': '#000',
            'font-weight': '600',
            'line-height': '4'
        });
    },
    friend_one: function () {
        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        var id = location.search.split("user=")[1];
        var data = {
            id: id
        };
        var successCallback = function (result) {
            console.log(result);

        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.user.friend_one, data, successCallback, errorCallback)
    }
    ,
    getFeedBack: function () {
        var data = {
            id: location.search.split("user=")[1]
        };
        if (typeof data.id === 'undefined') {
            data.id = localStorage.user_id;
        }
        console.log(data);
        $("#feed_back_parent").empty();
        var successCallback = function (result) {
            console.log(result);
            $('.user-comments .user-top-list img').attr('src', "http://mp-ts.ru/api/web/img/" + result.user.avatar);
            $('.user-comments .user-top-list .user-name').text(result.user.username);
            var totalrating = 0;
            for (var i in result.data) {
                var obj = result.data[i];
                totalrating += parseInt(obj.rating);
                obj.avatar = "http://mp-ts.ru/api/web/img/" + obj.avatar;
                var source = $("#feed_back_item").html();
                var template = Handlebars.compile(source);
                var html = template(obj);
                $("#feed_back_parent").append(html);
            }
            $('#ratingStar').text((totalrating / (parseInt(i) + 1)).toFixed(2));
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.feedback.get, data, successCallback, errorCallback)

    }
    ,
    sendFeedBack: function () {
        var form = $('form[name=feed_back_form]');
        var rating = form.find('select[name=rating]').val();
        var data = {
            sender_id: localStorage.user_id,
            getter_id: location.search.split("user=")[1],
            text: form.find('textarea[name=text]').val(),
            rating: rating
        };
        console.log(data);
        var successCallback = function (result) {
            console.log(result);
            $('.comment-send-holder').removeClass('visible');
            form.find('textarea[name=text]').val('');
            if (result) {
                loginCtrl.getFeedBack();
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.feedback.add, data, successCallback, errorCallback)

    }
    ,
    sendMsg: function (id) {


        if (typeof id !== 'undefined') {
            var form = $('form[name=msg_form_' + id + ']');
            var data = {
                getter_id: id,
                sender_id: localStorage.user_id,
                text: form.find('textarea[name=message]').val()
            };
        }
        else {
            var form = $('form[name=msg_form]');
            var data = {
                sender_id: localStorage.user_id,
                text: form.find('textarea[name=message]').val()
            };
            var sender_id = location.search.split("sender_id=")[1].replace("?", "").split("&")[0];
            var getter_id = location.search.split("getter_id=")[1];
            data.getter_id = localStorage.user_id == sender_id ? getter_id : sender_id;
            var file = document.getElementById('file');
            //если файл
            if (file.files.length > 0) {
                var fd = new FormData();
                fd.append('file', file.files[0]);
                fd.append('sender_id', data.sender_id);
                fd.append('getter_id', data.getter_id);
                xhr = new XMLHttpRequest();
                xhr.open('POST', urlService.api + urlService.dialog.add, true);
                xhr.onreadystatechange = function () {
                    console.log(xhr.responseText);
//                    if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.readyState == 4)
                        if (xhr.status == 200) {
                            if (JSON.parse(xhr.responseText).status) {
                                // alert('Данные успешно сохранены');
                                // window.location.reload();
                                loginCtrl.dialog_single();
                                $('#msg-area').val('');
                                document.getElementById('file-preview').style.display = 'none';
                            }
                            else {
                                // alert('Произошла ошибка');
                                return false;
                            }
                        }

                };

                xhr.send(fd);
                return false;
            }

        }
        var successCallback = function (result) {
            console.log(result);
            form.find('textarea[name=message]').val('');
            if (typeof id === 'undefined') {
                loginCtrl.dialog_single();
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.dialog.add, data, successCallback, errorCallback)
    }
    ,
    dialog_load: function () {
        loginCtrl.initSwipeMenu();

        var role = JSON.parse(localStorage.userdata).role;
        if (role != 20)
            document.getElementById('vacancies-menu-item').style.display = 'none';

        if (role == 10 || role == 30)
            document.getElementById('invite-menu-item').style.display = 'none';

        $("#message-parent").empty();
        var data = {
            id: localStorage.user_id
        };
        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        $('#name_surname_menu').text(localStorage.username);

        var successCallback = function (result) {

            var result = loginCtrl.sort_msg(result);
            console.log(result);
            for (var i in result) {
                // var len_msg=result[i].msg.length;
                var obj = result[i].msg[0];
                if (obj.text.indexOf('/web/img/') !== -1) {
                    obj.text = 'Изображение';
                }
                obj.avatar = "http://mp-ts.ru/api/web/img/" + obj.avatar;
                var source = $("#msg-template").html();
                var template = Handlebars.compile(source);
                var html = template(obj);
                $("#message-parent").append(html);
            }


        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.dialog.get, data, successCallback, errorCallback)
    },
    dialog_single: function () {
        $("#file").change(function (e) {
            loginCtrl.previewImg(e.target.files[0], 'file-preview');
            document.getElementById('file-preview').style.display = 'block';
        });


        $("#mail_parent").empty();
        var data = {
            sender_id: location.search.split("sender_id=")[1].replace("?", "").split("&")[0],
            getter_id: location.search.split("getter_id=")[1]
        };
        var successCallback = function (result) {
            console.log(result);
            for (var i in result) {
                var obj = result[i];
                if (obj.sender_id != localStorage.user_id) {
                    obj.direction = 'from';
                } else {
                    obj.direction = 'to';
                }
                if (obj.text.indexOf('/web/img/') !== -1) {
                    obj.isImage = true;
                    obj.img = obj.text;
                    delete(obj.text);
                }
                // obj.img = "http://mp-ts.ru/api/web/img/" + obj.image;
                var source = $("#mail_item_template").html();
                var template = Handlebars.compile(source);
                var html = template(obj);
                $("#mail_parent").append(html);
            }
            setTimeout(function () {
                $('.mail-list').scrollTop($('.mail-list').scrollTop() + $('.mail-list').height() + 1000);
            }, 200)
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.dialog.single, data, successCallback, errorCallback)

    },
    addToCart: function () {

    },
    login_init: function () {
        console.info('login init');

        var txt = loginCtrl.displaySkills(loginCtrl.skills.master.specs);

//        console.log( txt );

        document.getElementById('skill-selector').innerHTML = txt;

        $("#passport").change(function (e) {
            loginCtrl.previewImg(e.target.files[0], 'file-preview');
        });


        var isChecked = JSON.parse(localStorage.remember_me);
        $('#save_password').prop('checked', isChecked);
        if (isChecked) {
            var form = $('form[name=login_form]');
            form.find('input[name=username]').val(localStorage.user_login)
            form.find('input[name=password]').val(localStorage.password);
        }
    },
    vacancy_index: function () {
        loginCtrl.initSwipeMenu();

        var role = JSON.parse(localStorage.userdata).role;
        if (role != 20)
            document.getElementById('vacancies-menu-item').style.display = 'none';

        if (role == 10 || role == 30)
            document.getElementById('invite-menu-item').style.display = 'none';

        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        $('#name_surname_menu').text(localStorage.username);

        $('#file_vacancy').change(function (e) {
            console.log('Vac img add');
            loginCtrl.previewAvatar(e.target.files[0], 'avatar-preview');
        });

        var successCallback = function (result) {
            console.log(result);

            //fx code
            var vac_city_arr = [];
            var vac_vacancy_arr = [];
            $.each(result, function(index, value) {
                vac_city_arr[index] = value.city;
                vac_vacancy_arr[index] = value.name;
            });

            var unique_vac_city_arr = [];
            $.each(vac_city_arr, function(i, el){
                if($.inArray(el, unique_vac_city_arr) === -1) unique_vac_city_arr.push(el);
            });

            var unique_vac_vacancy_arr = [];
            $.each(vac_vacancy_arr, function(i, el){
                if($.inArray(el, unique_vac_vacancy_arr) === -1) unique_vac_vacancy_arr.push(el);
            });

            // console.log(unique_vac_arr);

            $.each(unique_vac_city_arr, function(key, value) {
                $('#vac-city-select')
                    .append($("<option></option>")
                        .attr("value",value)
                        .text(value));
            });

            $.each(unique_vac_vacancy_arr, function(key, value) {
                $('#vac-vacancy-select')
                    .append($("<option></option>")
                        .attr("value",value)
                        .text(value));
            });


            var names = {};
            var cities = {};
            loginCtrl.vacancies = result.slice(0);

            for (var i in result) {
                var obj = result[i];
                names[result[i].name] = result[i].name;
                cities[result[i].city] = result[i].city;
//                obj.img = "http://mp-ts.ru/api/web/img/" + obj.image;
//                var source = $("#vacancy_item_template").html();
//                var template = Handlebars.compile(source);
//                var html = template(obj);
//                $("#vacancy_parent").append(html);
            }

            loginCtrl.vacancy_draw();


            var nameArray = Object.keys(names).map(function (v) {
                return names[v];
            }).sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            var cityArray = Object.keys(cities).map(function (v) {
                return cities[v];
            }).sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });

            var citySelect = document.getElementById('city-selector');
            for (var i = 0; i < cityArray.length; i++) {
                var opt = document.createElement('option');
                opt.value = cityArray[i];
                opt.innerHTML = cityArray[i];
                citySelect.appendChild(opt);
            }

            var nameSelect = document.getElementById('name-selector');
            for (var i = 0; i < nameArray.length; i++) {
                var opt = document.createElement('option');
                opt.value = nameArray[i];
                opt.innerHTML = nameArray[i];
                nameSelect.appendChild(opt);
            }


            console.log(nameArray);
            console.log(cityArray);
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.vacancy.index, {}, successCallback, errorCallback)

    },
    vacancies: [],
    vacancy_draw: function () {
        document.getElementById("vacancy_parent").innerHTML = "";
        $('#vacancy_parent').html('');

        for (var i in loginCtrl.vacancies) {
            var obj = loginCtrl.vacancies[i];
            if (loginCtrl.selectedVacCity != 0 && loginCtrl.selectedVacCity != obj.city) continue;
            if (loginCtrl.selectedVacName != 0 && loginCtrl.selectedVacName != obj.name) continue;
            obj.img = "http://mp-ts.ru/api/web/img/" + obj.image;
            var source = $("#vacancy_item_template").html();
            var template = Handlebars.compile(source);
            var html = template(obj);
//            $("#vacancy_parent").append(html);
            //document.getElementById( "vacancy_parent" ).innerHTML += html;
            $('#vacancy_parent').prepend(html);

            // $('.vacancies-list li').addClass('customfx');
            // console.log(vac_arr_global);
        }
    },
    selectedVacName: 0,
    selectedVacCity: 0,
    filterName: function () {
        loginCtrl.selectedVacName = document.getElementById('name-selector').value;
        loginCtrl.vacancy_draw();
        //console.log( loginCtrl.selectedVacName );
    },
    filterCity: function () {
        loginCtrl.selectedVacCity = document.getElementById('city-selector').value;
        loginCtrl.vacancy_draw();
        //console.log( loginCtrl.selectedVacCity );
    },
    vacancy_create: function () {

        var form = $('form[name=vacancy_add_form]').serializeArray();
        var fd = new FormData();
        var file = document.getElementById('file_vacancy');
        fd.append('file', file.files[0]);
        fd.append('user_id', localStorage.user_id);
        for (var i in form) {
            var obj = form[i];
            fd.append(obj.name, obj.value);
        }

        console.log("Saving vacancy");

        xhr = new XMLHttpRequest();

        xhr.open('POST', urlService.api + urlService.vacancy.add, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
                if (JSON.parse(xhr.responseText).status) {
                    alert('Вакансия успешно сохранена');
                    window.location.reload();
                    console.log('success');
                }
                else {
                    alert('Произошла ошибка: ' + JSON.parse(xhr.responseText).msg);
                    return false;
                }
            }

        };

        xhr.send(fd);

    },
    one_vacancy: function () {
        var data = {
            id: location.search.split("id=")[1]
        };
        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        var successCallback = function (result) {
            console.log(result);
            result.img = "http://mp-ts.ru/api/web/img/" + result.image;
            var source = $("#vacancy_template").html();
            var template = Handlebars.compile(source);
            var html = template(result);
            $("#vacancy_parent").append(html);
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.vacancy.one, data, successCallback, errorCallback)

    },
    redrawComments: function (i) {
        loginCtrl.fillComments(i);
        if (loginCtrl.newsData[i].comments.length > 3) {
            if (loginCtrl.newsData[i].all)
                $("#expand-comments-" + i).html('Развернуть');
            else
                $("#expand-comments-" + i).html('Свернуть');
        }
    },
    fillComments: function (i) {
        var obj = loginCtrl.newsData[i];
        var count = 0;
        $("#comment_parent_template-" + obj.id).html('');

        if (obj.comments.length > 3)
            $("#expand-comments-" + i).html('Развернуть');

        for (var j in obj.comments) {
            if (!obj.all)
                if (++count > 3) break;

            var comment_obj = obj.comments[j];
            var source = $("#comment_template").html();
            var template = Handlebars.compile(source);
            comment_obj.avic = "http://mp-ts.ru/api/web/img/" + comment_obj.avatar;
            var html = template(comment_obj);
            $("#comment_parent_template-" + obj.id).append(html);
        }
        if (obj.all)
            loginCtrl.newsData[i].all = false;
        else
            loginCtrl.newsData[i].all = true;
    },
    drawNews: function () {
        for (var i in loginCtrl.newsData) {
            loginCtrl.newsData[i].idx = i;
            loginCtrl.newsData[i].all = false;
            var obj = loginCtrl.newsData[i];

            obj.avatar = "http://mp-ts.ru/api/web/img/" + obj.avatar;
            if (obj.attachment !== null) {
                obj.attachment = "http://mp-ts.ru/api/web/img/" + obj.attachment;
            }
            obj.comment_avatar = localStorage.user_avatar;

            var a = moment(obj.create_date * 1000);
            obj.create_date = a.fromNow();
            obj.comments_count = obj.comments.length;
            obj.user_id = localStorage.user_id;
            console.log("adm:" + parseInt(localStorage.admin, 10) + ' ' + typeof(parseInt(localStorage.admin, 10)));
            obj.admin = parseInt(localStorage.admin, 10);
            console.log(obj);
            var source = $("#post-item-template").html();
            var template = Handlebars.compile(source);
            var html = template(obj);
            $("#post-item-parent").append(html);

            loginCtrl.fillComments(i);
        }
    },
    news: function () {
        loginCtrl.initSwipeMenu();

        var role = 10;

        if (localStorage.userdata != null)
            role = JSON.parse(localStorage.userdata).role;

        if (role == null) role = 10;
        if (role != 20)
            document.getElementById('vacancies-menu-item').style.display = 'none';

        if (role == 10 || role == 30)
            document.getElementById('invite-menu-item').style.display = 'none';

        if (localStorage.admin !== '1') {
            $('#post-entry-block').html('');
        }

        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        $('#name_surname_menu').text(localStorage.username);
        $('#file_entry').change(function (e) {
            console.log('News img add');
            document.getElementById('img-preview').style.display = 'block';
            loginCtrl.previewImg(e.target.files[0], 'file-preview');
        });


        var successCallback = function (result) {
            loginCtrl.newsData = result.data;
            loginCtrl.drawNews();

            /*            for (var i in result.data) {
             console.log( 'idx:'+i );
             var obj = result.data[i];
             obj.avatar = "http://mp-ts.ru/api/web/img/" + obj.avatar;
             if (obj.attachment !== null) {
             obj.attachment = "http://mp-ts.ru/api/web/img/" + obj.attachment;
             }
             obj.comment_avatar = localStorage.user_avatar;

             var a = moment(obj.create_date * 1000);
             obj.create_date = a.fromNow();
             obj.comments_count = obj.comments.length;
             obj.user_id = localStorage.user_id;
             console.log( obj );
             var source = $("#post-item-template").html();
             var template = Handlebars.compile(source);
             var html = template(obj);
             $("#post-item-parent").append(html);

             loginCtrl.fillComments( obj, "#comment_template" );

             for (var j in obj.comments) {
             var comment_obj = obj.comments[j];
             var source = $("#comment_template").html();
             var template = Handlebars.compile(source);
             comment_obj.avatar = "http://mp-ts.ru/api/web/img/" + comment_obj.avatar;
             var html = template(comment_obj);
             $("#comment_parent_template-" + obj.id).append(html);
             }

             }
             */
            ss();
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.news.index, {id: localStorage.user_id}, successCallback, errorCallback)

    },
    delete_msg: function (sender_id, getter_id) {
        console.log(sender_id, getter_id);
        var data = {
            sender_id: sender_id,
            getter_id: getter_id
        };
        var successCallback = function (result) {
            console.log(result);
            if (result) {
                loginCtrl.dialog_load();
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.dialog.delete, data, successCallback, errorCallback)


    },
    getUnread: function () {
        $('#msg').empty();
        var data = {
            id: localStorage.user_id
        };
        var successCallback = function (result) {
            console.log(result);
            if (result != 0) {
                $('#msg').append('Сообщения <span class="amount">' + result + '</span>');
            }
            else {
                $('#msg').append('Сообщения');
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.dialog.unread, data, successCallback, errorCallback)

    },
    registerOutstanding: function (id) {
        var data = {
            event_id: id
        };

        console.log(data);

        var successCallback = function (result) {
            console.log(result);
        };

        var errorCallback = function (result) {
            console.log(result);
        };

        requestService.get(urlService.event.register_outstanding, data, successCallback, errorCallback)
    },
    calendar_add: function () {
        var form = $('form[name=calendar_form]');
        var formArr = form.serializeArray();
        formArr[0].value = new Date($('.arrival-time').val()) / 1000
        console.log(formArr);
        if (isNaN(formArr[0].value)) {
            alert('Введите время');
            return false;
        }
        var data = {};
        for (var i in formArr) {
            data[formArr[i].name] = formArr[i].value
        }
        data.user_id = localStorage.user_id;
        console.log(data);
        var successCallback = function (result) {
            console.log(result.status);
            if (result.status) {
                console.log(result);
                loginCtrl.registerOutstanding(result.data);
                alert('Мероприятие успешно создано');
                loginCtrl.calendar_index();
                $(".add-date").click();
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.event.add, data, successCallback, errorCallback)

    },
    calendar_index: function () {
        var data = {};
        data.month = new Date().getMonth() + 1;
        data.year = new Date().getFullYear();
        var myCity = localStorage.city;
        loginCtrl.checkCity = $('#inmycity').is(':checked');

        console.log('adm:' + localStorage.admin);

        $('#inmycity').unbind();
        $('#inmycity').click(function () {
            loginCtrl.checkCity = this.checked;
            loginCtrl.calendar_index();
        });

        var successCallback = function (result) {
            loginCtrl.events = result;

            console.log(result);

            for (var i in result) {
                var date = new Date(result[i].date * 1000).getDate();

                var cty = (!result[i].city) ? '' : result[i].city;

                if (!loginCtrl.checkCity || (myCity.toUpperCase() === cty.toUpperCase())) {
//                    $('#dayList_' + date).css({'background': '#eee','color':'#000'});
                    $('#dayList_' + date).addClass('selected-date');
                } else {
//                    $('#dayList_' + date).css({'background': ''});
                    $('#dayList_' + date).removeClass('selected-date');
                }

                $('#dayList_' + date).click(function () {
                    loginCtrl.selectedCalendar = this.innerText;

                    for (var i in loginCtrl.events) {
                        var obj = loginCtrl.events[i];

                        var date = new Date(obj.date * 1000).getDate();

                        if (this.innerText == date)
                            if (!loginCtrl.checkCity || (myCity.toUpperCase() == obj.city.toUpperCase())) {
                                loginCtrl.viewEvent(obj.id);
                                var h = new Date(obj.date * 1000).getHours();
                                var m = new Date(obj.date * 1000).getMinutes();
                                var text = '<p>' + obj.name + '</p>Время:' +
                                    (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) +
                                    (( obj.city != null ) ? ('<p>' + obj.city + '</p>') : '<p>Место проведения не определено</p>') +
                                    '<p>' + obj.description + '</p>' +
                                    '<p onclick="loginCtrl.addUserToEvent(' + obj.id + ')" style="cursor:pointer;color: #000;background-color: #eee;border-radius: 13px;font-weight: 600;padding: 3px;">Я пойду</p>' +
                                    '<p>Количество записавшихся: ' + obj.subscribers + '</p>' +
                                    ((localStorage.admin != '0') ? ('<a href="event_list.html?id=' + obj.id + '">Список участников</a>') : '') +
                                    '<p>Создал: ' + obj.username + '</p>' +
                                    '<p>Комментарии</p>' +
                                    '<div class="comment-input"><textarea placeholder="Комментировать..." id="eventCommentText" cols="30" rows="10"></textarea></div><div class="comment-submit"><div id="send-comment-button" onclick="loginCtrl.sendEventComment(' + obj.id + ')" class="fa-share-square">отправить</div></div>' +
                                    '<div id="event-comments"></div>';
                                setTimeout(function () {
                                    $('.eventCalendar-noEvents').html(text);
                                }, 900);

                                setTimeout(function () {
                                    loginCtrl.fillEventComments(obj.id);
                                }, 1200);
                            }

                    }
                })

                var currentDay = loginCtrl.selectedCalendar;
                console.log('#dayList_' + currentDay);
                if (currentDay == '0') {
                    currentDay = new Date().getDate();
                    $('#dayList_' + currentDay).click();
                }
            }
        };

        var errorCallback = function (result) {
            console.log(result);
        };


        if (localStorage.admin === '0') {
            $('.add-date').remove();
        }

        console.log(data);

        requestService.get(urlService.event.index, data, successCallback, errorCallback)

    },
    fillEventComments: function (event_id) {
        var data = {
            id: event_id,
        };

        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
                var comments = result.data;
                var txt = "";

                for (var i = 0; i < comments.length; i++) {
                    var avatar = (comments[i].avatar) ? "http://mp-ts.ru/api/web/img/" + comments[i].avatar : "http://placehold.it/350x150";
                    txt += '<div class="event-comment"><div class="event-comment-avatar" style="background-image: url(' + avatar + ');"></div><div class="event-comment-username">' + comments[i].username + '</div><div class="event-comment-text">' + comments[i].text + '</div></div>';
                }

                document.getElementById('event-comments').innerHTML = txt;
            }
        };
        var errorCallback = function (result) {
            console.log(result);

        };
        console.log(urlService.comment.event_index);
        requestService.get(urlService.comment.event_index, data, successCallback, errorCallback)
    },
    sendEventComment: function (event_id) {
        var txt = document.getElementById('eventCommentText').value;
        var data = {
            entry_id: event_id,
            user_id: ((localStorage.user_id) ? localStorage.user_id : -1),
            text: txt
        };

        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
                loginCtrl.fillEventComments(event_id);
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };

        console.log(data);
        requestService.post(urlService.comment.event_add, data, successCallback, errorCallback)
    },
    gallery_add: function () {
        var fd = new FormData();
        var file = document.getElementById('file_gallery');
        if (file.files == null || file.files[0] == null)
            return;

        fd.append('file', file.files[0]);
        fd.append('user_id', localStorage.user_id);
        xhr = new XMLHttpRequest();
        xhr.open('POST', urlService.api + urlService.gallery.add, true);
        xhr.onreadystatechange = function () {
            console.log(xhr.responseText);
//            if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.readyState == 4)
                if (xhr.status == 200) {
                    if (JSON.parse(xhr.responseText).status) {
                        alert('Фото успешно добавлено');
                        // window.location.reload();
                        console.log('success');
                        loginCtrl.gallery_index();
                    }
                    else {
                        // alert('Произошла ошибка');
                        return false;
                    }
                }

        };

        xhr.send(fd);
    },
    gallery_delete: function (id) {
        console.log(id);
        var data = {
            id: id
        };
        var successCallback = function (result) {
            if (result) {
                loginCtrl.gallery_index();
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.gallery.delete, data, successCallback, errorCallback)

    },
    gallery_index: function () {
        var data = {};
        $("#gall_parrent").empty();
        if (typeof location.search.split("user=")[1] === 'undefined') {
            data.id = localStorage.user_id;
        }
        else {
            data.id = location.search.split("user=")[1];

        }
        var successCallback = function (result) {
            console.log(result);
            for (var i in result) {
                var obj = result[i];
                if (obj.user_id == localStorage.user_id) {
                    obj.access = true;
                }
                else {
                    obj.access = false;
                }
                var source = $("#gall_item").html();
                var template = Handlebars.compile(source);
                obj.img = "http://mp-ts.ru/api/web/gallery/" + obj.img;
                var html = template(obj);
                $("#gall_parrent").append(html);
            }

            // $('#gall_parrent').galereya({
            //     load: function (next) {
            //         $.getJSON('images.json',
            //             function (data) {
            //                 // var data = [{"lowsrc":"upload\/thumbnails\/5165b70278e0e2.80829014.jpg","fullsrc":"upload\/5165b70278e0e2.80829014.jpg","description":"Mehmet Dere","category":"drawing"}, ...]
            //                 next(data);
            //             });
            //     }
            // });
            // $('#gall_parrent').galereya();
            // setTimeout(function () {
            // $('.galereya-cell-desc').append('<a onclick="loginCtrl.gallery_delete(this)">delete</a>')
            // },3000);

        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.gallery.index, data, successCallback, errorCallback)

    },
    categories_load: function () {
        loginCtrl.initSwipeMenu();

        var role = JSON.parse(localStorage.userdata).role;
        if (role != 20)
            document.getElementById('vacancies-menu-item').style.display = 'none';

        if (role == 10 || role == 30)
            document.getElementById('invite-menu-item').style.display = 'none';

        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        $('#name_surname_menu').text(localStorage.username);
    },
    sort_msg: function (arr) {
        var res_sub = [];
        for (var i in arr) {
            var obj = arr[i];
            var count_of_it = 0;
            for (var j in res_sub) {
                var jObj = res_sub[j];
                if ((jObj.subscribes.indexOf(obj['sender_id']) !== -1) && (jObj.subscribes.indexOf(obj['getter_id']) !== -1)) {
                    count_of_it++;
                }
            }
            if (count_of_it == 0) {
                var tmpObj = {
                    subscribes: [obj.getter_id, obj.sender_id],
                    msg: []
                };
                res_sub.push(tmpObj);
            }
            if (res_sub.length == 0) {
                var tmpObj = {
                    subscribes: [obj.getter_id, obj.sender_id],
                    msg: []
                };
                res_sub.push(tmpObj);
            }

        }

        for (j in res_sub) {
            var res_subObj = res_sub[j];
            for (var i in arr) {
                var obj = arr[i];
                if ((res_subObj.subscribes.indexOf(obj['sender_id']) !== -1) && (res_subObj.subscribes.indexOf(obj['getter_id']) !== -1)) {
                    res_sub[j].msg.push(obj);
                }
            }

        }


        return res_sub;
    },
    about_us: function () {
        loginCtrl.initSwipeMenu();

        var role = JSON.parse(localStorage.userdata).role;
        if (role != 20)
            document.getElementById('vacancies-menu-item').style.display = 'none';

        if (role == 10 || role == 30)
            document.getElementById('invite-menu-item').style.display = 'none';

        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        $('#name_surname_menu').text(localStorage.username);
    },
    initEventRequest: function () {
        if (localStorage.userdata) {
            var userData = JSON.parse(localStorage.userdata);
            console.log(userData);

            $('#user_id').val(userData.id);
            $('#user-name').val(userData.username);
            $('#user-phone').val(userData.phone);
            $('#user-email').val(userData.email);
            $('#user-city').val(userData.city);

        }
    },
    sendEventRequest: function () {
        var data = {
            event_id: 0,
            user_id: $('#user_id').val(),
            user_name: $('#user-name').val(),
            type: $('#event-type').val(),
            theme: $('#event-theme').val(),
            phone: $('#user-phone').val(),
            email: $('#user-email').val(),
            city: $('#user-city').val()
        };

        console.log(data);
        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
                alert('Ваша заявка успешно зарегистрирована!');
            }
            else {
                alert('Вы уже оставляли такую заявку!');
                return false;
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };

        requestService.post(urlService.event.add_user, data, successCallback, errorCallback);
    },
    addUserToEvent: function (event_id) {
        $('#backdrop').css('display', 'block');
        $('#eventRegistration').css('display', 'block');

        if (localStorage.userdata) {
            var userData = JSON.parse(localStorage.userdata);
            console.log(userData);

            $('#userID').val(userData.id);
            $('#eventID').val(event_id);
            $('#regEvtName').val(userData.username);
            $('#regEvtPhone').val(userData.phone);
            $('#regEvtMail').val(userData.email);
            $('#regEvtCity').val(userData.city);

        }
    },
    registerToEventCancel: function () {
        $('#backdrop').css('display', 'none');
        $('#eventRegistration').css('display', 'none');
    },
    registerToEvent: function () {
        if (!$('#evtRegForm')[0].checkValidity())
            alert("Заполните все поля формы");
        else {

            var data = {
                event_id: $('#eventID').val(),
                user_id: $('#userID').val(),
                user_name: $('#regEvtName').val(),
                phone: $('#regEvtPhone').val(),
                email: $('#regEvtMail').val(),
                city: $('#regEvtCity').val()
            };

            console.log(data);
            var successCallback = function (result) {
                console.log(result);
                if (result.status) {
                    loginCtrl.calendar_index();
                    alert('Вы добавлены к событию успешно!');
                }
                else {
                    alert('Вы уже добавлены к событию!');
                    return false;
                }
            };
            var errorCallback = function (result) {
                console.log(result);
            };

            requestService.post(urlService.event.add_user, data, successCallback, errorCallback)

            $('#backdrop').css('display', 'none');
            $('#eventRegistration').css('display', 'none');
        }
    },
    addUserToEventOld: function (event_id) {
        var data = {
            event_id: event_id,
            user_id: localStorage.user_id
        };
        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
                loginCtrl.calendar_index();
                alert('Вы добавлены к событию успешно!');
            }
            else {
                alert('Вы уже добавлены к событию!');
                return false;
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.event.add_user, data, successCallback, errorCallback)

    },
    viewEvent: function (event_id) {
        var data = {
            eid: event_id,
            uid: localStorage.user_id
        };

        console.log(data);

        var successCallback = function (result) {
            console.log(result);
            if (result.status) {
                console.log("Viewed");
            }
            else {
                return false;
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };

        console.log(urlService.event.view);
        requestService.post(urlService.event.view, data, successCallback, errorCallback)

    },
    event_list: function () {
        var data = {
            event_id: location.search.split("id=")[1]
        };
        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);

        var successCallback = function (result) {
            // loginCtrl.friends = result;
            console.log(result);
            for (var i in result.users) {
                var obj = result.users[i];
                obj.avatar = "http://mp-ts.ru/api/web/img/" + obj.avatar;
                var source = $("#friend-list-item-template").html();
                var template = Handlebars.compile(source);
                var html = template(obj);
                $("#friend-list-parent").append(html);
            }
            friendInfo();
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.event.user_list, data, successCallback, errorCallback)

    },
    delete_post: function (id) {
        console.log(id);
        var data = {
            id: id
        };
        var successCallback = function (result) {
            if (result) {
                loginCtrl.getEntries();
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.entry.delete, data, successCallback, errorCallback)

    },
    delete_news_post: function (id) {
        console.log(id);
        var data = {
            id: id
        };
        var successCallback = function (result) {
            if (result) {
                $("#post-item-parent").html("");
                loginCtrl.news();
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.entry.delete, data, successCallback, errorCallback)

    },
    goToCart: function () {
        window.location = 'basket.html';
    },
    support_index: function () {
        if (localStorage.userdata !== undefined) {
            var userdata = JSON.parse(localStorage.userdata);

            console.log(userdata);

            $('input[name=username]').val(userdata.username);
            $('input[name=email]').val(userdata.email);
            $('input[name=vk]').val(userdata.vk);
            $('input[name=phone]').val(userdata.phone);
        }
    }

};

function Logger() {
    var req = new Request();

    this.write = function (str) {
        req.get('../api/logger.php', function (err, dta) {
            if (dta) {
                console.log("Log:" + JSON.stringify(dta));
            }
            else {
                console.log("Log err:" + JSON.stringify(err))
            }
        }, {data: str});
    }

}

var logger = new Logger();
