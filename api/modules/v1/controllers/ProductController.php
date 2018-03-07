<?php
/**
 * Created by PhpStorm.
 * User: Vista
 * Date: 06.02.17
 * Time: 23:05
 */

namespace api\modules\v1\controllers;


use api\modules\v1\models\FeedbackProduct;
use api\modules\v1\models\Products;
use Yii;
use yii\db\Query;
use yii\rest\Controller;

class ProductController extends Controller
{
    public function actionIndex()
    {

        $options = Yii::$app->request->get();
        $query = Products::find()
            ->where(['provider_id' => $options['id']]);
        if (count($options['sort']) !== 0) {
            $query->
            andwhere(['like', $options['sort']['type'], $options['sort']['param']]);
        }
        $query->
        limit($options['limit'])
            ->offset($options['offset']);
        return $query->all();

    }

    public function actionView()
    {
        $id = \Yii::$app->request->get('id');
        return Products::findOne(['id' => $id]);
    }

    public function actionFeedBack()
    {
        $data = \Yii::$app->request->post();
        $model = new FeedbackProduct();
        if ($model->load($data, "")) {
//            $model->create_date = time();
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

    public function actionFeedBackGet()
    {
        $options = \Yii::$app->request->get();
        $query = (new Query());
        $res = $query->select(['feedback_product.*', 'user.username', 'user.avatar', 'user.id'])
            ->from(['feedback_product'])
            ->join('INNER JOIN', 'user', 'user.id = feedback_product.user_id')
            ->where(['product_id' => $options['id']])
            ->all();
        return $res;
//        return FeedbackProduct::find()->where(['product_id' => $options['id']])->all();
    }
}
