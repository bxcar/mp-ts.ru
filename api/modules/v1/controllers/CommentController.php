<?php
/**
 * Created by PhpStorm.
 * User: Vista
 * Date: 04.02.17
 * Time: 15:53
 */

namespace api\modules\v1\controllers;

use api\modules\v1\models\Comment;
use api\modules\v1\models\Feedback;
use common\models\User;
use Yii;
use yii\db\Query;
use yii\rest\Controller;

class CommentController extends Controller
{
    public function actionIndex()
    {
        $data = \Yii::$app->request->get();
        $auth_key = $data['auth_key'];
        $user_id = $data['user_id'];
        $entry_id = $data['entry_id'];
        return array(
            'status' => true,
            'data' => Comment::find()->where(['user_id' => $user_id, 'entry_id' => $entry_id, 'type' => 0])->all()
        );
    }

/*    public function actionIndexEvent() {
        $data = \Yii::$app->request->get();
        $entry_id = $data['id'];
        
        return array(
            'status' => true,
            'data' => Comment::find()->where(['entry_id' => $entry_id, 'type' => 1])->all()
        );
    }
*/

public function actionIndexEvent() {
        $data = \Yii::$app->request->get();
        $entry_id = $data['id'];
    
        $query = new Query();
        $query  ->select( ['comments.*', 'user.username', 'user.avatar'] )
                -> from( 'comments' )
                -> join( 'INNER JOIN', 'user', 'user.id = comments.user_id' )
                -> where( ['entry_id'=>$entry_id] )
                -> andwhere( ['type'=>1] )
                -> addOrderBy( ['create_date' => SORT_DESC] );
    
        $command = $query->createCommand();
        $res = $command->queryAll();

        return array(
            'status' => true,
            'data' => $res
        );
}
    public function actionCreate()
    {
        $data = \Yii::$app->request->post();
        $model = new Comment();
        if ($model->load($data, "")) {
            $model->create_date = time();
            $model->type = 0;
            if ($model->save()) {
                return array(
                    'status' => true
                );
            }
        } else {
            return array(
                'status' => false,
                'msg' => $model->getErrors()
            );
        }
    }

    public function actionCreateEvent() {
        $data = \Yii::$app->request->post();
        
        $model = new Comment();
        if ($model->load($data, "")) {
            $model->create_date = time();
            $model->type = 1;
           if ($model->save()) {
                return array(
                    'status' => true
                );
            }
        } else {
            return array(
                'status' => false,
                'msg' => $model->getErrors()
            );
        }
    }

    public function actionFeedBackAdd()
    {
        $data = \Yii::$app->request->post();
        $model = new Feedback();
        if ($model->load($data, "")) {
//            return $model;
            $model->create_date = time();
            if ($model->save()) {
                return array(
                    'status' => true
                );
            }
        } else {
            return array(
                'status' => false,
                'msg' => $model->getErrors()
            );
        }
    }

    public function actionFeedBackIndex()
    {
        $id = Yii::$app->request->get('id');
        $query = (new Query);
        $res = $query->select('feedback.*,user.username,user.avatar')
            ->from('feedback', 'user')
            ->where(['feedback.getter_id' => $id])
            ->join('INNER JOIN', 'user', 'user.id = feedback.sender_id')
            ->all();
        return [
            'data' => $res,
            'user' => User::find()->select('avatar,username,id')->where(['id' => $id])->one()
        ];
    }
}
