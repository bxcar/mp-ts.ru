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


        function Invite( div ) {
            var parent = document.getElementById( div );
            
            var role = null;
            var admin = 0;
            var referrer = null;
            var nameField = null;
            
            var _clear = function() {
                while (parent.firstChild) {
                    parent.removeChild( parent.firstChild );
                }
            }
            
            this.init = function ( r ) {
                role = r;
                
                if( r == undefined ) {
                    admin = 1;
                    var roles = document.createElement( 'select' );
//                    roles.classList.add( 'login-list' );
                    roles.id = 'login-roles';
                    
                    var opt = document.createElement( 'option' );
                    opt.value = 20;
                    opt.innerHTML = 'Мастер';
                    roles.appendChild( opt );
                    
                    opt = document.createElement( 'option' );
                    opt.value = 30;
                    opt.innerHTML = 'Поставщик';
                    roles.appendChild( opt );
                    
                    opt = document.createElement( 'option' );
                    opt.value = 40;
                    opt.innerHTML = 'Компания';
                    roles.appendChild( opt );
                }
                
                nameField = document.createElement( 'input' );
                nameField.type = 'email';
                nameField.classList.add( 'login-login' );
                nameField.id = 'login-email';
                nameField.setAttribute( 'placeholder', 'Введите адрес приглашаемого' );
                
                var sendButton = document.createElement( 'div' );
                sendButton.classList.add( 'login-button' );
                sendButton.appendChild( document.createTextNode( 'Отправить' ) );
                sendButton.addEventListener( 'click', function () {_sendInvitation();}, false );

                var tag = document.createElement( 'div' );
                tag.classList.add( 'login-tag' );
                tag.appendChild( document.createTextNode( 'Приглашение' ) );
                
                parent.appendChild( tag );
                if( r === undefined ) parent.appendChild( roles );
                parent.appendChild( nameField );
                parent.appendChild( sendButton );
            }
            
            var _sendInvitation = function () {
                var data = {};
                document.getElementById( 'login-email' ).readOnly = true;
                
                if( role === undefined || role == null ) {
                    role = document.getElementById( 'login-roles' ).value;
//                    var rle = document.getElementById( 'login-roles' );
//                    role = rle.options[rle.selectedIndex].value;
                }
                
                data.role = role;
                data.email = document.getElementById( 'login-email' ).value;
                if( data.email.match(/([\w-\.]+)@((?:[\w-]+\.)+)([a-zA-Z]{2,4})/) == null ) {
                    alert( "Введите правильный адрес эл.почты" );
                    return false;
                }
        

                data.user = JSON.parse( localStorage.userdata ).id;
                
                console.log( data );
                logger.write( 'Invitation: '+JSON.stringify( data ) );
                
                
                var req = new Request()
                
                req.get( urlService.invitation.send, function ( err, resp ) {
                    if( resp ) {
                            logger.write( 'Invitation result: '+JSON.stringify( resp ) );
                            if( resp.result == 0 ) {
                                alert( 'Приглашение успешно отправлено' );
                                if( admin ) role = null;
                                nameField.value = '';
                            } else
                                alert( resp.description );
                            document.getElementById( 'login-email' ).readOnly = false;
                        }
                    else { logger.write( 'Invitation error: '+JSON.stringify( err ) ); console.log( 'Invitation error:'+JSON.stringify( err ) ); document.getElementById( 'login-email' ).readOnly = false;}
                }, data );
            }
        }
    
        window.onload = function () {
            var inv = new Invite('main-div');
            window.onerror = function( message, url, lineNumber ) {
                logger.write( url+':'+message+'@'+lineNumber );
                return false;
            };

            
            logger.write( 'Invitation initiation: '+JSON.parse( localStorage.userdata ).email );
            
            var role = JSON.parse( localStorage.userdata ).role;
            var adm = JSON.parse( localStorage.userdata ).admin;
            
            if( !adm ) inv.init( role ); else inv.init();
            
            $('.top-user-image img').attr('src', localStorage.user_avatar);
            $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
            $('#name_surname_menu').text(localStorage.username);


            console.log( localStorage );
            
        }
