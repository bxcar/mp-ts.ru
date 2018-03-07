<?php
/**
 * Created by PhpStorm.
 * User: Vista
 * Date: 24.02.17
 * Time: 01:03
 */

namespace api\modules\v1\controllers;


use api\modules\v1\models\Dialog;
use common\models\User;
use Yii;
use yii\db\Query;
use yii\rest\Controller;

class DialogController extends Controller
{

    public function actionTest()
    {
        return "hello world";
    }

    public function actionCreate()
    {
        $model = new Dialog();
        $data = Yii::$app->request->post();
        $model->create_at = time();
        if ($_FILES) {
            $info = pathinfo($_FILES['file']['name']);
//            $ext = $info['extension']; // get the extension of the file
            $ext = 'jpeg';
        
            $maxDim = 640;
            $file_name = $_FILES['file']['tmp_name'];
            list( $width, $height, $type, $attr ) = getimagesize( $file_name );
        
            $target_filename = $file_name;
            $ratio = $width/$height;
            if( $ratio > 1) {
                $new_width = $maxDim;
                $new_height = $maxDim/$ratio;
            } else {
                $new_width = $maxDim*$ratio;
                $new_height = $maxDim;
            }
            
            $src = imagecreatefromstring( file_get_contents( $file_name ) );
            $dst = imagecreatetruecolor( $new_width, $new_height );
            imagecopyresampled( $dst, $src, 0, 0, 0, 0, $new_width, $new_height, $width, $height );
            imagedestroy( $src );
                
            $exif = exif_read_data( $file_name, 'IFD0');
            if( $exif ) {
                $orientation = $exif['Orientation'];
            
                switch($orientation) {
                    case 3:
                        $dst = imagerotate($dst, 180, 0);
                        break;
                    case 6:
                        $dst = imagerotate($dst, -90, 0);
                        break;
                    case 8:
                        $dst = imagerotate($dst, 90, 0);
                        break;
                }
            }
                
            imagejpeg( $dst, $target_filename, 9 );
            imagedestroy( $dst );
            
            $newname = uniqid() . '.' . $ext;
            if (move_uploaded_file($_FILES['file']['tmp_name'], 'img/' . $newname)) {
                $data['text'] = 'http://build-1.tw1.ru/api/web/img/' . $newname;
//                $data['text'] = $newname;
            }
        }
        if ($model->load($data, "") && $model->save()) {
            return [
                "status" => true,
                "id" => $model->id
            ];
        } else {
            return [
                'status' => false,
                'msg' => $model->getErrors()
            ];
        }
    }

    public function actionGet()
    {
        $id = Yii::$app->request->get('id');
        $query = (new Query());
        $res = $query->select(['dialog.*'])
            ->from(['dialog'])
            ->orWhere(['dialog.getter_id' => $id])
            ->orWhere(['dialog.sender_id' => $id])
//            ->join('INNER JOIN', 'user', 'user.id =' . ((('dialog.getter_id' == '46') ? 'dialog.sender_id' : 'dialog.getter_id')))
            ->orderBy(['id' => SORT_DESC])
//            ->groupBy(['dialog.sender_id'])
            ->all();
//        return $res;
        return $this->groupBySender($id, $res);
    }

    public function actionSingle()
    {
        $data = Yii::$app->request->get();
        $sender_id = $data['sender_id'];
        $getter_id = $data['getter_id'];
        $models = Dialog::find()
            ->orWhere(['sender_id' => $sender_id, 'getter_id' => $getter_id])
            ->orWhere(['getter_id' => $sender_id, 'sender_id' => $getter_id])
            ->all();
        foreach ($models as $model) {
            $model->read = 1;
            $model->save();
        }
        return $models;
    }

    public function groupBySender($id, $arr)
    {
        foreach ($arr as $key => $item) {
            $tmp_id = ($item['getter_id'] == $id ? $item['sender_id'] : $item['getter_id']);
            $user = User::find()->where(['id' => $tmp_id])->one();
            $arr[$key]['username']=$user['username'];
            $arr[$key]['avatar']=$user['avatar'];
        }
        return $arr;
    }

    public function actionUnread()
    {
        $data = Yii::$app->request->get();
        return Dialog::find()
            ->Where(['getter_id' => $data['id'], 'read' => 0])
            ->count();
    }

    public function actionDelete()
    {
        $data = Yii::$app->request->post();
        $sender_id = $data['sender_id'];
        $getter_id = $data['getter_id'];
        $models = Dialog::find()
            ->orWhere(['sender_id' => $sender_id, 'getter_id' => $getter_id])
            ->orWhere(['getter_id' => $sender_id, 'sender_id' => $getter_id])
            ->all();
        foreach ($models as $model) {
            $model->delete();
        }
        return true;
    }
}
