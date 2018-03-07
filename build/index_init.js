        window.onload = function () {
            console.log('init');
            var token = location.search.split("token=")[1];
            var reg = new Register('main-div');
            
            if( token !== undefined ) {
                reg.processToken( token );
            } else {
                reg.processLogin();
            }
        }
