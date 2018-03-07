        function Request() {
            var _getRequest = function (endpoint, callback, options ) { //callback( err, data )
                    var req = new XMLHttpRequest();
                    var queryString ='';

                    if( options !== undefined ){
                        var params = [];
                        for( key in options ) {
                            if( options.hasOwnProperty( key ) ) {
                                params.push( encodeURIComponent( key ) + "=" + encodeURIComponent( options[key] ) );
                            }
                        }
                        queryString = '?'+params.join( '&' );
                    }

                    req.open( 'GET', endpoint+queryString, true );

                    req.onload = function () {
                        if( req.readyState == 4 && req.status == 200 ) {
                            callback( null, JSON.parse( req.responseText ) );
                        } else {
                            callback( JSON.parse( req.responseText ), null );
                        }
                    };

                    req.onerror = function () {
                        callback( {result:-1, message:'Network error'}, null );
                    };

                    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    req.send();
            };

            var _postRequest = function (endpoint, callback, options ) {
                    var req = new XMLHttpRequest();
                    var params = new FormData();
                    if( options !== undefined ) {
                        for( key in options ) {
                            if( options.hasOwnProperty( key ) ) {
                                params.append( key, options[key]);
                            }
                        }
                    }

                    req.open( 'POST', endpoint, true );

                    req.onload = function () {
                        if( req.readyState == 4 && req.status == 200 )
                            callback( null, JSON.parse( req.responseText ) );
                        else
                            callback( JSON.parse( req.responseText ), null );
                    };

                    req.onerror = function () {
                        callback( {result:-1, message:'Network error'}, null );
                    };

//                    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    req.send( params );
            };

            this.get = function ( endpoint, callback, options ) {
                _getRequest( endpoint, callback, options );
            }

            this.post = function ( endpoint, callback, options ) {
                _postRequest( endpoint, callback, options );
            }
        };

        function Register( div ) {
            var parent = document.getElementById( div );

            var email = null;
            var role = null;
            var referrer = null;
            var token = null;

            var _clear = function() {
                while (parent.firstChild) {
                    parent.removeChild( parent.firstChild );
                }
            }

            this.processToken = function( tok ) {
                console.log( 'Token:'+tok );
                token = tok;

                var req = new Request();

                req.get( urlService.invitation.decode, function( err, data) {
                        if( data ) _initRegistration( data );
                        else { console.log( 'Token error:'+JSON.stringify( err ) );}
                    }, {token:token} );
            }

            var _initRegistration = function ( resp ) {

                if( resp.result == 0 ) {
                    email = resp.data[0].email;
                    role = resp.data[0].role;
                    referrer = resp.data[0].issuer;

                    _clear();

                    var logo = document.createElement( 'div' );
                    logo.classList.add( 'login-logo' );
                    var image = document.createElement( 'img' );
                    image.setAttribute( 'src', 'img/logo_reg.png' );
                    logo.appendChild( image );
                    parent.appendChild( logo );

                    switch( role ) {
                        case '20':
                            console.log( 'Master' );
                            _masterRegBox();
                            break;
                        case '30':
                            console.log( 'Vendor' );
                            _providerRegBox();
                            break;
                        case '40':
                            console.log( 'Company' );
                            _companyRegBox();
                            break;
                        default:
                            _openGuestRegistrationBox();
                            console.log( 'Guest' );
                            break;
                    }

                } else {
                    alert( resp.description );
                    _openGuestRegistrationBox();
                }
            }

            var _masterRegBox = function () {
                    var nameField = document.createElement( 'input' );
                    nameField.type = 'text';
                    nameField.classList.add( 'login-login' );
                    nameField.id = 'login-name';
                    nameField.setAttribute( 'placeholder', 'Введите Имя и Фамилию' );

                    var passwordField = document.createElement( 'input' );
                    passwordField.type = 'password';
                    passwordField.classList.add( 'login-login' );
                    passwordField.id = 'login-password';
                    passwordField.setAttribute( 'placeholder', 'Введите пароль' );

                    var passwordField2 = document.createElement( 'input' );
                    passwordField2.type = 'password';
                    passwordField2.classList.add( 'login-login' );
                    passwordField2.id = 'login-password2';
                    passwordField2.setAttribute( 'placeholder', 'Подтвердите пароль' );

                    var loginButton = document.createElement( 'div' );
                    loginButton.classList.add( 'login-button' );
                    loginButton.appendChild( document.createTextNode( 'Зарегистрироваться' ) );
                    loginButton.addEventListener( 'click', function () {_doRegisterMaster();}, false );

                    var tag = document.createElement( 'div' );
                    tag.classList.add( 'login-tag' );
                    tag.appendChild( document.createTextNode( 'Регистрация' ) );

                    var skillsTag = document.createElement( 'div' );
                    skillsTag.classList.add( 'login-tag' );
                    skillsTag.appendChild( document.createTextNode( 'Навыки' ) );

                    var skills = document.createElement( 'div' );
                    skills.classList.add( 'login-skills' );
                    skills.innerHTML += loginCtrl.displaySkills(loginCtrl.skills.master.specs);

                    parent.appendChild( tag );
                    parent.appendChild( nameField );
                    parent.appendChild( passwordField );
                    parent.appendChild( passwordField2 );
                    parent.appendChild( skillsTag );
                    parent.appendChild( skills );
                    parent.appendChild( loginButton );

            }

            var _validateMaster = function () {
                var txt = document.getElementById( 'login-name' ).value;

                if( txt.match(/^\s*[a-zA-Zа-яА-ЯёЁ]{2,40}(\s+[a-zA-Zа-яА-ЯёЁ]{2,40})+\s*$/) == null ) {
                    alert( "Введите свои фамилию и имя полностью" );
                    return false;
                }

/*                txt = document.getElementById( 'login-email' ).value;

                if( txt.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/) == null ) {
                    alert( "Введите правильный адрес эл.почты" );
                    return false;
                }
*/
                txt = document.getElementById( 'login-password' ).value;

                if( txt.length < 6 ) {
                    alert( "Пароль должен быть 6 и более символов" );
                    return false;
                }

                var txt2 = document.getElementById( 'login-password2' ).value;

                if( txt !== txt2 ) {
                    alert( "Пароли не совпадают" );
                    return false;
                }

                return true;
            }

            var _doRegisterMaster = function() {
                console.log( 'Registering' );

                if( !_validateMaster() ) return;

                var data = {};
                data.form_name = 'master';
                data.email = email;
                data.token = token;
                data.password = document.getElementById( 'login-password' ).value;
                data.username = document.getElementById( 'login-name' ).value;
                data.role = role;
                data.referrer = referrer;
                data.additionalskill = loginCtrl.serializeSkills();

                var req = new Request();

                req.post( urlService.api + urlService.user.sign_up, function( err, dta ) {
                    if( dta ) { if( dta.status == true ) _openLoginBox(); else alert( dta ); }
                    else { console.log( err ); alert( JSON.stringify(err)); }
                }, data );
            }

            var _companyRegBox = function () {
                    var companynameField = document.createElement( 'input' );
                    companynameField.type = 'text';
                    companynameField.classList.add( 'login-login' );
                    companynameField.id = 'login-companyname';
                    companynameField.setAttribute( 'placeholder', 'Введите название компании' );

                    var companyareaField = document.createElement( 'input' );
                    companyareaField.type = 'text';
                    companyareaField.classList.add( 'login-login' );
                    companyareaField.id = 'login-companyarea';
                    companyareaField.setAttribute( 'placeholder', 'Введите область деятельности компании' );

                    var nameField = document.createElement( 'input' );
                    nameField.type = 'text';
                    nameField.classList.add( 'login-login' );
                    nameField.id = 'login-name';
                    nameField.setAttribute( 'placeholder', 'Введите Имя менеджера' );

                    var lastnameField = document.createElement( 'input' );
                    lastnameField.type = 'text';
                    lastnameField.classList.add( 'login-login' );
                    lastnameField.id = 'login-lastname';
                    lastnameField.setAttribute( 'placeholder', 'Введите Фамилию менеджера' );

                    var phoneField = document.createElement( 'input' );
                    phoneField.type = 'tel';
                    phoneField.classList.add( 'login-login' );
                    phoneField.id = 'login-phone';
                    phoneField.setAttribute( 'placeholder', 'Введите телефон менеджера' );

                    var siteField = document.createElement( 'input' );
                    siteField.type = 'url';
                    siteField.classList.add( 'login-login' );
                    siteField.id = 'login-site';
                    siteField.setAttribute( 'placeholder', 'Введите адрес сайта' );

                    var passwordField = document.createElement( 'input' );
                    passwordField.type = 'password';
                    passwordField.classList.add( 'login-login' );
                    passwordField.id = 'login-password';
                    passwordField.setAttribute( 'placeholder', 'Введите пароль' );

                    var passwordField2 = document.createElement( 'input' );
                    passwordField2.type = 'password';
                    passwordField2.classList.add( 'login-login' );
                    passwordField2.id = 'login-password2';
                    passwordField2.setAttribute( 'placeholder', 'Подтвердите пароль' );

                    var loginButton = document.createElement( 'div' );
                    loginButton.classList.add( 'login-button' );
                    loginButton.appendChild( document.createTextNode( 'Зарегистрироваться' ) );
                    loginButton.addEventListener( 'click', function () {_doRegisterCompany();}, false );

                    var tag = document.createElement( 'div' );
                    tag.classList.add( 'login-tag' );
                    tag.appendChild( document.createTextNode( 'Регистрация' ) );

                    parent.appendChild( tag );
                    parent.appendChild( companynameField );
                    parent.appendChild( companyareaField );
                    parent.appendChild( nameField );
                    parent.appendChild( lastnameField );
                    parent.appendChild( phoneField );
                    parent.appendChild( siteField );
                    parent.appendChild( passwordField );
                    parent.appendChild( passwordField2 );
                    parent.appendChild( loginButton );

            }

            var _validateCompany = function () {
                var txt = document.getElementById( 'login-name' ).value;
                if( txt.match(/^\s*[a-zA-Zа-яА-ЯёЁ]{2,40}\s*$/) == null ) {
                    alert( "Введите своё имя" );
                    return false;
                }

                var txt = document.getElementById( 'login-lastname' ).value;
                if( txt.match(/^\s*[a-zA-Zа-яА-ЯёЁ]{2,40}\s*$/) == null ) {
                    alert( "Введите свою фамилию" );
                    return false;
                }

                txt = document.getElementById( 'login-companyname' ).value;
                if( txt.length < 1 ) {
                    alert( "Введите название компании" );
                    return false;
                }

                txt = document.getElementById( 'login-password' ).value;
                if( txt.length < 6 ) {
                    alert( "Пароль должен быть 6 и более символов" );
                    return false;
                }

                var txt2 = document.getElementById( 'login-password2' ).value;
                if( txt !== txt2 ) {
                    alert( "Пароли не совпадают" );
                    return false;
                }

                return true;
            }

            var _doRegisterCompany = function() {
                console.log( 'Registering' );

                if( !_validateCompany() ) return;

                var data = {};
                data.form_name = 'company';
                data.email = email;
                data.token = token;
                data.password = document.getElementById( 'login-password' ).value;
                data.username = document.getElementById( 'login-name' ).value+' '+document.getElementById( 'login-lastname' ).value;
                data.role = role;
                data.referrer = referrer;
                data.company_name = document.getElementById( 'login-companyname' ).value
                data.company_activity = document.getElementById( 'login-companyarea' ).value
                data.company_phone = document.getElementById( 'login-phone' ).value
                data.company_site = document.getElementById( 'login-site' ).value
                data.manager_name = document.getElementById( 'login-name' ).value
                data.manager_surname = document.getElementById( 'login-lastname' ).value

                var req = new Request();

                req.post( urlService.api + urlService.user.sign_up, function( err, dta ) {
                    if( dta ) { if( dta.status == true ) _openLoginBox(); }
                    else { console.log( err ); alert( JSON.stringify(err)); }
                },
                data );
            }

            var _providerRegBox = function () {
                var nameField = document.createElement( 'input' );
                nameField.type = 'text';
                nameField.classList.add( 'login-login' );
                nameField.id = 'login-name';
                nameField.setAttribute( 'placeholder', 'Введите Имя и Фамилию' );

                var passwordField = document.createElement( 'input' );
                passwordField.type = 'password';
                passwordField.classList.add( 'login-login' );
                passwordField.id = 'login-password';
                passwordField.setAttribute( 'placeholder', 'Введите пароль' );

                var passwordField2 = document.createElement( 'input' );
                passwordField2.type = 'password';
                passwordField2.classList.add( 'login-login' );
                passwordField2.id = 'login-password2';
                passwordField2.setAttribute( 'placeholder', 'Подтвердите пароль' );

                var loginButton = document.createElement( 'div' );
                loginButton.classList.add( 'login-button' );
                loginButton.appendChild( document.createTextNode( 'Зарегистрироваться' ) );
                loginButton.addEventListener( 'click', function () {_doRegisterProvider();}, false );

                var tag = document.createElement( 'div' );
                tag.classList.add( 'login-tag' );
                tag.appendChild( document.createTextNode( 'Регистрация' ) );

                var skillsTag = document.createElement( 'div' );
                skillsTag.classList.add( 'login-tag' );
                skillsTag.appendChild( document.createTextNode( 'Поставщик' ) );

                var skills = document.createElement( 'div' );
                skills.classList.add( 'login-skills' );

                var radio = document.createElement( 'input' );
                radio.type = 'radio';
                radio.setAttribute( 'name', 'provider' );
                radio.id = 'provider1';
                var label = document.createElement( 'label' );
                label.setAttribute( 'for', radio.id );
                label.appendChild( document.createTextNode( 'Типография' ) );
                skills.appendChild( radio );
                skills.appendChild( label );
                skills.appendChild( document.createElement( 'br' ) );

                radio = document.createElement( 'input' );
                radio.type = 'radio';
                radio.setAttribute( 'name', 'provider' );
                radio.id = 'provider2';
                label = document.createElement( 'label' );
                label.setAttribute( 'for', radio.id );
                label.appendChild( document.createTextNode( 'Дизайнер' ) );
                skills.appendChild( radio );
                skills.appendChild( label );
                skills.appendChild( document.createElement( 'br' ) );

                radio = document.createElement( 'input' );
                radio.type = 'radio';
                radio.setAttribute( 'name', 'provider' );
                radio.id = 'provider3';
                label = document.createElement( 'label' );
                label.setAttribute( 'for', radio.id );
                label.appendChild( document.createTextNode( 'Монтажник' ) );
                skills.appendChild( radio );
                skills.appendChild( label );
                skills.appendChild( document.createElement( 'br' ) );

                parent.appendChild( tag );
                parent.appendChild( nameField );
                parent.appendChild( passwordField );
                parent.appendChild( passwordField2 );
                parent.appendChild( skillsTag );
                parent.appendChild( skills );
                parent.appendChild( loginButton );

            }

            var _validateProvider = function () {
                var txt = document.getElementById( 'login-name' ).value;

                if( txt.match(/^\s*[a-zA-Zа-яА-ЯёЁ]{2,40}(\s+[a-zA-Zа-яА-ЯёЁ]{2,40})+\s*$/) == null ) {
                    alert( "Введите свои фамилию и имя полностью" );
                    return false;
                }

                txt = document.getElementById( 'login-password' ).value;

                if( txt.length < 6 ) {
                    alert( "Пароль должен быть 6 и более символов" );
                    return false;
                }

                var txt2 = document.getElementById( 'login-password2' ).value;

                if( txt !== txt2 ) {
                    alert( "Пароли не совпадают" );
                    return false;
                }

                return true;
            }

            var _doRegisterProvider = function() {
                console.log( 'Registering' );

                if( !_validateMaster() ) return;

                var data = {};
                data.form_name = 'provider';
                data.email = email;
                data.token = token;
                data.password = document.getElementById( 'login-password' ).value;
                data.username = document.getElementById( 'login-name' ).value;
                data.role = role;
                data.referrer = referrer;

                data.additionalskill = JSON.stringify([]);
                if( document.getElementById( 'provider1' ).checked )
                    data.additionalskill = JSON.stringify(['Типография']);
                else if( document.getElementById( 'provider2' ).checked )
                    data.additionalskill = JSON.stringify(['Дизайнер']);
                else if( document.getElementById( 'provider3' ).checked )
                    data.additionalskill = JSON.stringify(['Монтажник']);

                var req = new Request();

                req.post( urlService.api + urlService.user.sign_up, function( err, dta ) {
                    if( dta ) { if( dta.status == true ) _openLoginBox(); }
                    else { console.log( err ); alert( JSON.stringify(err))}
                } ,data );
            }

            this.processLogin = function() {
                _clear();

                var lb = document.createElement( 'div' );
                var rb = document.createElement( 'div' );
                var logo = document.createElement( 'div' );

                logo.classList.add( 'login-logo' );
                var image = document.createElement( 'img' );
                image.setAttribute( 'src', 'img/logo_reg.png' );
                logo.appendChild( image );

                lb.classList.add( 'login-button' );
                lb.appendChild( document.createTextNode( 'Войти' ) );
                lb.addEventListener( 'click', function () {_openLoginBox();}, false );

                rb.classList.add( 'login-button' );
                rb.appendChild( document.createTextNode( 'Зарегистрироваться' ) );
                rb.addEventListener( 'click', function () {_openGuestRegistrationBox();}, false );

                parent.appendChild( logo );
                parent.appendChild( lb );
                parent.appendChild( rb );
            }

            var _openGuestRegistrationBox = function() {
                console.log( 'Guest registration' );
                _clear();

                var logo = document.createElement( 'div' );
                logo.classList.add( 'login-logo' );
                var image = document.createElement( 'img' );
                image.setAttribute( 'src', 'img/logo_reg.png' );
                logo.appendChild( image );

                var nameField = document.createElement( 'input' );
                nameField.type = 'text';
                nameField.classList.add( 'login-login' );
                nameField.id = 'login-name';
                nameField.setAttribute( 'placeholder', 'Введите Имя и Фамилию' );

                var loginField = document.createElement( 'input' );
                loginField.type = 'email';
                loginField.classList.add( 'login-login' );
                loginField.id = 'login-login';
                loginField.setAttribute( 'placeholder', 'Введите e-mail' );

                    var passwordField = document.createElement( 'input' );
                    passwordField.type = 'password';
                    passwordField.classList.add( 'login-login' );
                    passwordField.id = 'login-password';
                    passwordField.setAttribute( 'placeholder', 'Введите пароль' );

                    var passwordField2 = document.createElement( 'input' );
                    passwordField2.type = 'password';
                    passwordField2.classList.add( 'login-login' );
                    passwordField2.id = 'login-password2';
                    passwordField2.setAttribute( 'placeholder', 'Подтвердите пароль' );

                var loginButton = document.createElement( 'div' );
                loginButton.classList.add( 'login-button' );
                loginButton.appendChild( document.createTextNode( 'Зарегистрироваться' ) );
                loginButton.addEventListener( 'click', function () {_doRegister();}, false );

                var tag = document.createElement( 'div' );
                tag.classList.add( 'login-tag' );
                tag.appendChild( document.createTextNode( 'Регистрация' ) );

                parent.appendChild( logo );
                parent.appendChild( tag );
                parent.appendChild( nameField );
                parent.appendChild( loginField );
                parent.appendChild( passwordField );
                parent.appendChild( passwordField2 );
                parent.appendChild( loginButton );
            }

            var _doRegister = function() {
                console.log( 'Registering' );

                if( !_validateGuest() ) return;

                var data = {};
                data.email = document.getElementById( 'login-login' ).value;
                data.password = document.getElementById( 'login-password' ).value;
                data.username = document.getElementById( 'login-name' ).value;
                data.role = '10';
                data.referrer = -1;

                var req = new Request();

                req.post( urlService.api + urlService.user.sign_up, function( err, data ) {
                    if( data ) { if( data.status == true ) _openLoginBox(); else alert( data.msg.email[0] );}
                    else { console.log( err ); alert( JSON.stringify(err)); }
                }
                ,data );
            }

            var _validateGuest = function () {
                var txt = document.getElementById( 'login-name' ).value;

                if( txt.match(/^\s*[a-zA-Zа-яА-ЯёЁ]{2,40}(\s+[a-zA-Zа-яА-ЯёЁ]{2,40})+\s*$/) == null ) {
                    alert( "Введите свои фамилию и имя полностью" );
                    return false;
                }

                txt = document.getElementById( 'login-login' ).value;

                if( txt.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/) == null ) {
                    alert( "Введите правильный адрес эл.почты" );
                    return false;
                }

                txt = document.getElementById( 'login-password' ).value;

                if( txt.length < 6 ) {
                    alert( "Пароль должен быть 6 и более символов" );
                    return false;
                }

                var txt2 = document.getElementById( 'login-password2' ).value;

                if( txt !== txt2 ) {
                    alert( "Пароли не совпадают" );
                    return false;
                }

                return true;
            }

            var _openLoginBox = function() {
                console.log( 'Login' );
                _clear();

                var logo = document.createElement( 'div' );
                logo.classList.add( 'login-logo' );
                var image = document.createElement( 'img' );
                image.setAttribute( 'src', 'img/logo_reg.png' );
                logo.appendChild( image );

                var loginField = document.createElement( 'input' );
                loginField.type = 'email';
                loginField.classList.add( 'login-login' );
                loginField.id = 'login-login';
                loginField.setAttribute( 'placeholder', 'Введите e-mail' );

                    var passwordField = document.createElement( 'input' );
                    passwordField.type = 'password';
                    passwordField.classList.add( 'login-login' );
                    passwordField.id = 'login-password';
                    passwordField.setAttribute( 'placeholder', 'Введите пароль' );

                var loginButton = document.createElement( 'div' );
                loginButton.classList.add( 'login-button' );
                loginButton.appendChild( document.createTextNode( 'Войти' ) );
                loginButton.addEventListener( 'click', function () {_doLogin();}, false );

                    var savePassword = document.createElement( 'input' );
                    savePassword.type = 'checkbox';
                    savePassword.id = 'login-save-password';
                    savePassword.classList.add( 'login-save-password' );

                    var spLabel = document.createElement( 'label' );
                    spLabel.setAttribute( 'for', savePassword.id );
                    spLabel.appendChild( document.createTextNode( 'Сохранить пароль' ) );

                var restorePassword = document.createElement( 'a' );
                restorePassword.setAttribute( 'href', 'restore_password.html' );
                restorePassword.classList.add( 'login-restore-password' );
                restorePassword.appendChild( document.createTextNode( 'Забыли пароль?' ) );

                var tag = document.createElement( 'div' );
                tag.classList.add( 'login-tag' );
                tag.appendChild( document.createTextNode( 'Авторизация' ) );

                console.log( localStorage.remember_me );

                if( localStorage.remember_me !== undefined && JSON.parse( localStorage.remember_me ) == true ) {
                    savePassword.checked = true;
                    loginField.value = localStorage.user_login;
                    passwordField.value = localStorage.password;
                }

                parent.appendChild( logo );
                parent.appendChild( tag );
                parent.appendChild( loginField );
                parent.appendChild( passwordField );
                parent.appendChild( savePassword );
                parent.appendChild( spLabel );
                parent.appendChild( restorePassword );
                parent.appendChild( loginButton );

            }

            var _doLogin = function() {
                console.log( 'Logging in' );

                var data = {};
                data.password = document.getElementById( 'login-password' ).value;
                data.username = document.getElementById( 'login-login' ).value;

                if( document.getElementById( 'login-save-password' ).checked ) {
                    localStorage.remember_me = true;
                    localStorage.user_login = data.username;
                    localStorage.password = data.password;
                }
                else {
                    localStorage.remember_me = false;
                }
                var req = new Request();

                req.post( urlService.api + urlService.user.login, function( err, dta ) {
                    if( dta ) {
                        if( dta.status == true ) {
                            console.log( dta );
                            localStorage.auth_key = dta.auth_key;
                            localStorage.user_id = dta.user_id;
                            localStorage.username = dta.username;
                            localStorage.admin = dta.admin;

                            console.log( 'adm:'+dta.admin+'/'+localStorage.admin);
                            window.location = 'user-profile-view.html?user=' + dta.user_id;
                        } else {
                            logger.write( 'Login failed:'+JSON.stringify( data )+'('+JSON.stringify( dta )+')' );
                            alert('Вы ввели неверные данные. Повторите попытку снова.');
                        }
                    }
                    else {
                        console.log( err );
                        alert( JSON.stringify( err ) );
                    }
                },
                data );
            }
        }
