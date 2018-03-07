<?php
/**
 * Created by PhpStorm.
 * User: Vista
 * Date: 15.03.17
 * Time: 02:47
 */

namespace api\modules\v1\controllers;


use api\modules\v1\models\Event;
use api\modules\v1\models\ViewedEvent;
use api\modules\v1\models\UserEvent;
use yii\rest\Controller;
use yii\db\Query;

class EventController extends Controller {


    public function actionCreate()
    {
        $data = \Yii::$app->request->post();
        $model = new Event();
//        return $data;
        if ($model->load($data, "")) {
            $model->create_at = time();
            if ($model->save()) {
                return array(
                    'status' => true,
                    'data' => $model->getPrimaryKey()
                );
            } else {
                return array(
                    'status' => false,
                    'msg' => $model->getErrors()
                );
            }
        } else {
            return array(
                'status' => false,
                'msg' => $model->getErrors()
            );
        }
    }

    public function actionIndex()
    {
        $data = \Yii::$app->request->get();
        $time_start = strtotime( $data['year'] ."-". $data['month'] . "-01");
        $all_days = cal_days_in_month(CAL_GREGORIAN, $data['month'], $data['year']);
//        $time_end = strtotime(date( $data['year']  ."-". $data['month'] . "-".$all_days ." +1 day"));
        $time_end = strtotime( $data['year']  ."-". $data['month'] . "-".$all_days ." +1 day");
//        return $time_end;
        $query = new Query();
        
        $query->select( ['event.*','user.username','user.avatar', '(SELECT COUNT(*) FROM user_event WHERE user_event.event_id = event.id) AS subscribers'] )
            ->from('event', 'user')
            ->where(['>', 'event.date', $time_start])
            ->andwhere(['<', 'event.date', $time_end])
            ->join('INNER JOIN', 'user', 'user.id = event.user_id');
        $command = $query->createCommand();
        $res = $command->queryAll();
//            ->all();
        return $res;
//            Event::find()
//            ->andwhere(['>', 'date', $time_start])
//            ->andwhere(['<', 'date', $time_end])
//            ->all();
    }
    
    public function actionNewlist() {
        $data = \Yii::$app->request->get();
        $time_start = time();
        $query = new Query();
        
        $subquery = new Query();
        $subquery-> select( ['eid'] )
                 -> from( 'viewed_events' )
                 -> where( ['uid'=>$data['id']] );
        
        $query->select( ['count(*) as eventcount'] )
            ->from('event')
            ->where(['>', 'event.date', $time_start])
            ->andwhere(['not in', 'event.id', $subquery]);

        $command = $query->createCommand();

        $res = $command->queryAll();
//        $res = $command->rawSql;
        return $res;
    }

    public function actionRegisterOutstanding() {
        $data = \Yii::$app->request->get();
        
        $event = Event::find()->where(['id'=>$data['event_id']] )->all();
        
        UserEvent::updateAll(['event_id'=>$data['event_id']], ['event_id'=>0, 'type'=>$event[0]['type'], 'theme' => $event[0]['theme']] );


        $res = array(
            'status' => true
        );
        return $res;
    }

    public function actionView() {
        $data = \Yii::$app->request->post();
        $model = new ViewedEvent();
        

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
}
?>
