<?php
/**
 * Created by PhpStorm.
 * User: Vista
 * Date: 04.02.17
 * Time: 15:40
 */

namespace api\modules\v1\controllers;

use Yii;
use api\modules\v1\models\Entries;
use common\models\User;
use yii\db\Query;
use yii\rest\Controller;

class EntryController extends Controller
{
    public function actionCreate()
    {
        $data = \Yii::$app->request->post();
        $model = new Entries();
        if ($model->load($data, "")) {
            $model->create_date = time();
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
                $model->attachment = $newname;
                
                
                if (move_uploaded_file($_FILES['file']['tmp_name'], 'img/' . $newname)) {
                    if ($model->save()) {
                        return array(
                            'status' => true
                        );
                    }
                }
            } else {
                if ($model->save()) {
                    return array(
                        'status' => true
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

    public function actionIndex()
    {
/*        $data = \Yii::$app->request->get();
        $auth_key = $data['auth_key'];
        $user_id = $data['id'];
//        return $data;
        $query = (new Query());
        $res = $query->select(['entries.*', 'user.username', 'user.avatar'])
            ->from(['entries'])
            ->join('INNER JOIN', 'user', 'user.id = entries.sender_id')
            ->where(['entries.getter_id' => $user_id])
            ->andwhere( ['entries.type'] => 1 )
            ->orderBy(['create_date' => SORT_DESC])
            ->all();
        foreach ($res as $key => $item) {
            $query = (new Query());
            $res[$key]['comments'] = $query->select(['comments.*', 'user.username', 'user.avatar', 'user.id'])
                ->from(['comments'])
                ->join('INNER JOIN', 'user', 'user.id = comments.user_id')
                ->where(['entry_id' => $item['id']])
                ->all();
        }
        return [
            'status' => true,
            'data' => $res
        ];*/
        
        $id = \Yii::$app->request->get('id');
        
//        $data = \Yii::$app->request->get();
//        $auth_key = $data['auth_key'];
//        $user_id = $data['id'];
//        return $data;
        $subquery = new Query();
        $query0 = new Query();
        $query1 = new Query();
        $query2 = new Query();
        
        $subquery -> select( ['user_id'] )
                -> from( 'followers' )
                -> where( ['followed_by'=>$id] );
        
        
        $query0->select( ['entries.*', 'user.username', 'user.avatar'] )
            ->from( ['entries'] )
            ->join( 'INNER JOIN', 'user', 'user.id = entries.sender_id' )
            ->where( ['IN','sender_id',$subquery] )
            ->andwhere( ['entries.type' => 1] )
            ->orderBy( ['create_date' => SORT_DESC] );
        
        $query1->select( ['entries.*', 'user.username', 'user.avatar'] )
            ->from( ['entries'] )
            ->join( 'INNER JOIN', 'user', 'user.id = entries.sender_id' )
            ->where( ['IN','sender_id',$subquery] )
            ->andwhere( ['getter_id' => $id] )
            ->andwhere( ['entries.type' => 1] )
            ->orderBy( ['create_date' => SORT_DESC] );
        
        $query2->select( ['entries.*', 'user.username', 'user.avatar'] )
            ->from( ['entries'] )
            ->join( 'INNER JOIN', 'user', 'user.id = entries.sender_id' )
            ->where( ['NOT IN','sender_id',$subquery] )
            ->andwhere( ['getter_id' => $id] )
            ->andwhere( ['entries.type' => 1] )
            ->orderBy( ['create_date' => SORT_DESC] );
        
        $res0 = $query0->all();
        $res1 = $query1->all();
        $res2 = $query2->all();
        
        $res = array_merge( $res0, $res1, $res2 );

        foreach ($res as $key => $item) {
            $query = (new Query());
            $res[$key]['comments'] = $query->select(['comments.*', 'user.username', 'user.avatar', 'user.id'])
                ->from(['comments'])
                ->join('INNER JOIN', 'user', 'user.id = comments.user_id')
                ->where(['entry_id' => $item['id']])
                ->all();
        }
        return [
            'status' => true,
            'data' => $res
        ];
        
    }

    public function actionNews()
    {
        $id = \Yii::$app->request->get('id');
        
//        $data = \Yii::$app->request->get();
//        $auth_key = $data['auth_key'];
//        $user_id = $data['id'];
//        return $data;
        $query1 = new Query();
        
        $query1->select( ['entries.*', 'user.username', 'user.avatar'] )
            ->from( ['entries'] )
            ->where( ['entries.type' => 0] )
            ->join( 'INNER JOIN', 'user', 'user.id = entries.sender_id' )
            ->orderBy( ['create_date' => SORT_DESC] );
        
        $res = $query1->all();

        foreach ($res as $key => $item) {
            $query = (new Query());
            $res[$key]['comments'] = $query->select(['comments.*', 'user.username', 'user.avatar', 'user.id'])
                ->from(['comments'])
                ->join('INNER JOIN', 'user', 'user.id = comments.user_id')
                ->where(['entry_id' => $item['id']])
                ->all();
        }
        return [
            'status' => true,
            'data' => $res
        ];
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
        $model = Entries::find()->where(['id'=>$id])->one();
        if ($model != null) {
            return $model;
        } else {
            return false;
        }
    }

}
