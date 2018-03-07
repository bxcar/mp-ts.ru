<?php
/**
 * Created by PhpStorm.
 * User: Vista
 * Date: 18.03.17
 * Time: 22:43
 */

namespace api\modules\v1\controllers;

use Yii;
use api\modules\v1\models\Galery;
use yii\rest\Controller;

class GalleryController extends Controller
{
    public function actionTest()
    {
        return "test";
    }

    public function actionIndex()
    {
        $data = \Yii::$app->request->get();
        return Galery::find()->where(['user_id'=>$data['id']])->all();
    }

    public function actionCreate()
    {
        $data = \Yii::$app->request->post();
        $model = new Galery();
        if ($model->load($data, "")) {
            $model->create_at = time();
            if ($_FILES) {
                $info = pathinfo($_FILES['file']['name']);
//                $ext = $info['extension']; // get the extension of the file

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
                
                imagejpeg( $dst, $target_filename, 50 );
                imagedestroy( $dst );
                
                $newname = uniqid() . '.' . $ext;
                $model->img = $newname;
                if (move_uploaded_file($_FILES['file']['tmp_name'], 'gallery/' . $newname)) {
                    if ($model->save()) {
                        return array(
                            'status' => true
                        );
                    }
                }
                else{
                    return [
                      'status'=>false,
                        'msg'=>'Ошибка сохранения изображения'
                    ];
                }
            } else {
                return array(
                    'status' => false,
                    'msg' => 'img is required'
                );
            }

        } else {
            return array(
                'status' => false,
                'msg' => $model->getErrors()
            );
        }
    }

    public function actionDelete()
    {
        $data = Yii::$app->request->post();
        $model=$this->findModel($data['id']);
        if($model){
            if($model->delete()){
                return [
                    'status'=>true,
                ];
            }
            else{
                return [
                    'status'=>false,
                ];
            }
        }
        else{
            return [
                'status'=>false,
            ];
        }
//        return $data;
    }

    protected function findModel($id)
    {
        $model = Galery::find()->where(['id'=>$id])->one();
        if ($model != null) {
            return $model;
        } else {
            return false;
        }
    }

}
