/**
 * Created by Vista on 06.02.17.
 */

var productCtrl = {
    limit: 15,
    offset: 0,
    products: [],
    cart: [],
    index: function (sort) {
        loginCtrl.initSwipeMenu();
        var role = JSON.parse( localStorage.userdata ).role;
        if( role != 20 )
            document.getElementById( 'vacancies-menu-item' ).style.display = 'none';
                
        if( role == 10 || role == 30 )
            document.getElementById( 'invite-menu-item' ).style.display = 'none';
                
        $("#product-template-parent").empty();
        var id = location.search.split("id=")[1];
        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        $('#name_surname_menu').text(localStorage.username);

        var successCallback = function (result) {
            productCtrl.products = result;
            console.log(result);
            for (var i in result) {
                var source = $("#product-template").html();
                var template = Handlebars.compile(source);
                if (result[i].price === "") {
                    result[i].price = "не указана";
                }
                var html = template(result[i]);
                $("#product-template-parent").append(html);
            }
            initTableSort();
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        var data = {
            limit: productCtrl.limit,
            offset: productCtrl.offset,
            id: id,
            sort: sort
        };
        
        console.log(data);
        requestService.get(urlService.product.index, data, successCallback, errorCallback)
    },
    product_view: function (id) {
        window.location = "product-preview.html?id=" + id;
    },
    load_product: function () {
        $("#product_about_parent").empty();
        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        var id = location.search.split("id=")[1];
        var data = {
            id: id
        };
        var successCallback = function (result) {
            console.log(result);
            // for (var i in result) {
            var source = $("#product_about_template").html();
            var template = Handlebars.compile(source);
            // if (result[i].price === "") {
            //     result[i].price = "не указана";
            // }
            var html = template(result);
            $("#product_about_parent").append(html);
            // }

        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.product.view, data, successCallback, errorCallback)
    },
    sort: function (type, param) {
        console.info("type: " + type + " param:" + param);
        var sort = {
            type: type,
            param: param
        };
        productCtrl.index(sort);
    },
    step: function (direction) {
        if (direction === 'next') {

            productCtrl.offset += productCtrl.limit
        }
        else {
            if (productCtrl.offset !== 0) {
                productCtrl.offset -= productCtrl.limit
            }

        }
        productCtrl.index();
    },
    sendFeedBack: function (id) {
        var form = $('form[name=form_feedback_prod]');
        var data = {
            user_id: localStorage.user_id,
            text: form.find('textarea[name=text]').val(),
            product_id: id
        };
        console.info(data);
        var successCallback = function (result) {
            console.log(result);
            form.find('textarea[name=text]').val('');
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.post(urlService.product.feedback, data, successCallback, errorCallback)
    },
    feedBackLoad: function () {
        var id = location.search.split("id=")[1];
        var data = {
            id: id
        };
        $("#review-list-parent").empty();
        var successCallback = function (result) {
            console.log(result);
            for (var i in result) {
                var source = $("#review-item-template").html();
                var template = Handlebars.compile(source);
                result[i].avatar = "http://mp-ts.ru/api/web/img/" + result[i].avatar;
                var html = template(result[i]);
                $("#review-list-parent").append(html);
            }
        };
        var errorCallback = function (result) {
            console.log(result);
        };
        requestService.get(urlService.product.get_feedback, data, successCallback, errorCallback)

    },
    addToCart: function (id) {
        var count = $('.count-text-' + id).val();        
        
        
        for (var i in productCtrl.products) {
            var obj = productCtrl.products[i];
            if (obj.id === id) {
                obj.uniq = new Date() / 1000;
                obj.count = count;
                productCtrl.cart.push(obj);
            }
        }
        
        console.log( productCtrl.cart );
        
        localStorage.cart = JSON.stringify(productCtrl.cart);
    },
    basket: function () {
        loginCtrl.initSwipeMenu();
        var userdata =JSON.parse( localStorage.userdata );
        if( userdata != undefined ) {
//            console.log( userdata );
            $('#basket').find($('input[name="username"]')).val( userdata.username );
            $('#basket').find($('input[name="address"]')).val( userdata.city+', '+userdata.address );
            $('#basket').find($('input[name="email"]')).val( userdata.email );
            $('#basket').find($('input[name="phone"]')).val( userdata.phone );
        }
        var role = userdata.role;
        if( role != 20 )
            document.getElementById( 'vacancies-menu-item' ).style.display = 'none';
        
         if( role == 10 || role == 30 )
            document.getElementById( 'invite-menu-item' ).style.display = 'none';
                       
                
        $("#parent").empty();
        $('.top-user-image img').attr('src', localStorage.user_avatar);
        $('.photo-wrap_inner img').attr('src', localStorage.user_avatar);
        $('#name_surname_menu').text(localStorage.username);

        if (typeof localStorage.cart == 'undefined') {
            return false;
        }
        console.log(JSON.parse(localStorage.cart));
        var result = JSON.parse(localStorage.cart);
        var total = 0;
        for (var i in result) {

            var source = $("#tr-template").html();
            var template = Handlebars.compile(source);
            result[i].summ = parseFloat(result[i].price.replace(/[^\d.-]/g, '')) * result[i].count;
            var html = template(result[i]);
            total += result[i].summ;
            $("#parent").append(html);
        }
        $('.total').text(total);
    },
    basket_del: function (id) {
        console.log( "Deleting "+id );
        var result = JSON.parse(localStorage.cart);
        var tmpres = [];
        for (var i in result) {
            var obj = result[i];
            if (obj.id !== id) {
                tmpres.push(obj);
            }
        }
        console.log( tmpres );
        localStorage.cart = JSON.stringify(tmpres);
        productCtrl.basket();
    },
    save_order: function () {
//        console.log( localStorage.cart );
        var order = {};
        if( localStorage.cart != undefined )
            order = JSON.parse(localStorage.cart);
        else {
            alert( 'Ваша корзина пуста' );
            return;
        }
//        console.log(order);
        
        var products = [];
        var total = 0.0;
        var txt = '';
        
        for (var i in order) {
            var obj = order[i];
            
            obj.price = parseFloat(obj.price.replace(/[^\d.-]/g, ''));
            total += obj.price * obj.count;
            
            txt += 'Товар: '+obj.name+' цена: '+obj.price+' руб. кол-во: '+obj.count+' сумма: '+(obj.price*obj.count)+' руб.\r\n';
            var tmp = {
                count: $('input[data-product-id=' + obj.id + ']').val(),
                id: obj.id,
                email: obj.email,
                text: 'Товар: '+obj.name+' цена: '+obj.price+' руб. кол-во: '+obj.count+' сумма: '+(obj.price*obj.count)+' руб.'
            }
            products.push(tmp);
        }
        
        console.log(products);
        var data = {
            order: JSON.stringify(products),
            user_id: localStorage.user_id,
            description: txt,
            summ: total,
            username: $('#basket').find($('input[name="username"]')).val(),
            address: $('#basket').find($('input[name="address"]')).val(),
            email: $('#basket').find($('input[name="email"]')).val(),
            phone: $('#basket').find($('input[name="phone"]')).val()

        }
        
        logger.write( 'Checkout:'+JSON.stringify(data) );
        
//        console.log( data );
        
        var successCallback = function (result) {
            console.log(result);
            if (result) {
                delete(localStorage.cart);
                console.log( 'Data: '+result.data );
                alert( 'Ваш заказ на сумму '+data.summ+' руб. успешно отправлен. Вам отправлено письмо с описанием заказа.' );
                window.scrollTo(0,0);
                window.location.reload();
                //window.location=result.url;
                //window.open(result.url, '_blank');
            }
        };
        var errorCallback = function (result) {
            logger.write( 'Checkout error:'+JSON.stringify(result) );
            console.log(result);
        };
        requestService.post(urlService.order.create, data, successCallback, errorCallback)

    }

};
