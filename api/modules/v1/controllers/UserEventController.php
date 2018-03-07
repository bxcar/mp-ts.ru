<?php
/**
 * Created by PhpStorm.
 * User: Vista
 * Date: 21.03.17
 * Time: 00:48
 */

namespace api\modules\v1\controllers;

use api\modules\v1\models\Event;
use api\modules\v1\models\UserEvent;
use yii\db\Query;
use yii\rest\Controller;

class UserEventController extends Controller
{
    public function actionTest()
    {
        return "hello";
//      UserEvent::tableName();
    }

    public function actionAddUser()
    {
        $data = \Yii::$app->request->post();
        $model = new UserEvent();
        if ($model->load($data, "") && $model->save()) {
            return [
                'status' => true
            ];
        } else {
            return [
                'status' => false,
                'msg' => $model->getErrors()
            ];
        }
    }

    public function actionList()
    {
        $data = \Yii::$app->request->get();
        $query = (new Query());
        $res = $query->select(['user.username', 'user.avatar', 'user.id'])
            ->from(['user_event'])
            ->join('INNER JOIN', 'user', 'user.id = user_event.user_id')
            ->where(['user_event.event_id' => $data['event_id']])
            ->all();
        return
            [
                'users' => $res,
                'event' => Event::find()->where(['id' => $data['event_id']])->one()
            ];
    }
}
