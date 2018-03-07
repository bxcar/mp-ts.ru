/**
 * Created by Vista on 27.01.17.
 */

var urlService = {
    // api: 'http://www.svm.biz.ua/api/web/v1/',
    api: 'http://mp-ts.ru/api/web/v1/',
    // api: 'http://localhost:8888/shop/api/web/v1/',
    user: {
        login: 'user/login?',
        sign_up: 'user/sign-up?',
        profile: 'user/index?',
        profile_update: 'user/update?',
        friend_list: 'user/friends?',
        friend_one: 'user/friend-one?',
        new_passw: 'user/new-password',
        follow: 'user/add-to-favorites?'
    },
    password: {
        restore: '../api/restore_passw.php'
    },
    invitation: {
        send: '../api/invitation.php',
        decode: '../api/decode_token.php'
    },
    entry: {
        add: 'entry/create?',
        get: 'entry/index?',
        delete:'entry/delete?'
    },
    product: {
        index: 'product/index?',
        view: 'product/view?',
        feedback: 'product/feed-back?',
        get_feedback: 'product/feed-back-get?'
    },
    comment: {
        add: 'comment/create?',
        index: 'comment/index?',
        event_index: 'comment/index-event?',
        event_add: 'comment/create-event?'
    },
    feedback: {
        add: 'comment/feed-back-add',
        get: 'comment/feed-back-index'
    },
    dialog: {
        add: 'dialog/create?',
        get: 'dialog/get?',
        single: 'dialog/single?',
        delete: 'dialog/delete?',
        unread: 'dialog/unread?'
    },
    vacancy: {
        index: 'vacancy/index?',
        add: 'vacancy/create?',
        one: 'vacancy/one?'
    },
    news: {
        index: 'entry/news?'
    },
    event: {
        index: 'event/index?',
        add: 'event/create?',
        add_user: 'user-event/add-user?',
        user_list: 'user-event/list?',
        count:'event/newlist?',
        view:'event/view',
        register_outstanding: 'event/register-outstanding?'
    },
    gallery: {
        index: 'gallery/index?',
        add: 'gallery/create?',
        delete:'gallery/delete?'
    },
    order:{
        create:'order/create?',
    }
};
