<?php
/**
 * Created by PhpStorm.
 * User: Vista
 * Date: 11.03.17
 * Time: 00:45
 */

namespace api\modules\v1\controllers;


use api\modules\v1\models\Vacantion;
use yii\rest\Controller;

class VacancyController extends Controller
{
    public function actionTest()
    {
        return "hello";
    }

    public function actionIndex()
    {
        return Vacantion::find()->all();
    }

    public function actionOne()
    {
        $id = \Yii::$app->request->get('id');
        return Vacantion::find()->where(['id' => $id])->one();
    }

    public function actionCreate()
    {
        $data = \Yii::$app->request->post();
        $model = new Vacantion();
        if ($model->load($data, "")) {
            $model->create_date = time();
//            return $model;/
            if ($_FILES) {
                $info = pathinfo($_FILES['file']['name']);
//                $ext = $info['extension']; // get the extension of the file
            $ext = 'jpeg';
        
            $maxDim = 150;
            $file_name = $_FILES['file']['tmp_name'];
            list( $width, $height, $type, $attr ) = getimagesize( $file_name );
        
            $target_filename = $file_name;
            $ratio = $width/$height;
            if( $ratio < 1) {
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
                $model->image = $newname;
                if (move_uploaded_file($_FILES['file']['tmp_name'], 'img/' . $newname)) {
                    if ($model->save()) {
                        return array(
                            'status' => true
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
                        'msg' => 'file error'
                    );
                }
            } else {
                if ($model->save()) {
                    return array(
                        'status' => true
                    );
                } else {
                    return array(
                        'status' => false,
                        'msg' => $model->getErrors()
                    );
                }
            }

        } else {
            return array(
                'status' => false,
                'msg' => $model->getErrors()
            );
        }
    }
}
