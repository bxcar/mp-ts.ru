<?php
namespace api\modules\v1\controllers;

/**
 * Created by PhpStorm.
 * User: Vista
 * Date: 18.01.17
 * Time: 14:05
 */
use api\modules\v1\models\Entries;
use api\modules\v1\models\Feedback;
use api\modules\v1\models\Followers;
use api\modules\v1\models\Galery;
use common\models\LoginForm;
use common\models\User;
use frontend\models\SignupForm;
use frontend\models\ResetPasswordForm;
use yii\debug\models\search\Log;
use yii\db\Query;
use yii\rest\Controller;
use Yii;

class UserController extends Controller
{
    public function actionTest()
    {
        return 'hello';
    }

    public function actionIndex()
    {
        $data = \Yii::$app->request->get();
        $user_id = $data['id'];
        $feedback = Feedback::find()->where(['getter_id' => $user_id])->count();
        $feedback_all = Feedback::find()->where(['getter_id' => $user_id])->all();
        $feedback_rating = 0;
        foreach ($feedback_all as $item) {
            $feedback_rating += $item['rating'];
        }
        if( $feedback != 0 )
            $average_feedback = $feedback_rating / $feedback;
        else
            $average_feedback = 0;
        $user = User::findIdentity($user_id);
        if ($user['role'] == 20 || $user['role'] == 30) {
            $query = (new Query());
            $skills = $query->select(['user_skills.*'])
                ->from(['user_skills'])
//                ->join('INNER JOIN','user','user.id = comments.user_id')
                ->where(['user_id' => $user_id])
                ->all();
        }
//        $auth_key = $data['auth_key'];
        $res = [
            'user' => $user,
            'counts' => [
                'entries' => Entries::find()->where(['getter_id' => $user_id])->count(),
                'gallery' => Galery::find()->where(['user_id' => $user_id])->count(),
                'feedback' => $feedback,
                'rating' => round($average_feedback,2)
            ],
            'skills' => $skills
        ];
        return $res;

    }
    
    public function actionNewPassword() {
        $data = \Yii::$app->request->get();
        
        $model = new ResetPasswordForm( $data['token'] );
        $model->password = $data['password'];
        $res = $model -> resetPassword();
        return array(
            'status' => $res
        );
    }

    public function actionUpdate()
    {
        $data = \Yii::$app->request->post();
//       return isset($data['skills']);

        if(isset($data['skills'])){
            $query = (new Query());
            $skills = $query->select(['user_skills.*'])
                ->from(['user_skills'])
                ->where(['user_id' => $data['user_id']])
                ->one();
            if($skills){
                \Yii::$app->db->createCommand()
                   ->update('user_skills', ['skills' => $data['skills']], 'user_id ='.$data['user_id'])
                    ->execute();
            }
            else{
                \Yii::$app->db->createCommand()
                    ->insert('user_skills', [
                        'skills' => $data['skills'],
                        'user_id' => $data['user_id'],
                    ])->execute();
            }

        }
        $model = User::findOne(['id' => $data['user_id']]);
        $model->sex = $data['sex'];
        $model->city = $data['city'];
        $model->address = $data['address'];
        $model->date_birth = $data['date_birth'];
        $model->phone = $data['phone'];
        $model->email = $data['email'];
        $model->vk = $data['vk'];


        if ($_FILES) {
//        $info = pathinfo($_FILES['avatar']['name']);
//        $ext = $info['extension']; // get the extension of the file
            $ext = 'jpeg';
        
            $maxDim = 150;
            $file_name = $_FILES['avatar']['tmp_name'];
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
            $model->avatar = $newname;
            move_uploaded_file($_FILES['avatar']['tmp_name'], 'img/' . $newname);
        }
        
        $res = $model->save();

        if ($res) {
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

    public function actionLogin()
    {
        $model = new LoginForm();
        $data = \Yii::$app->request->post();
        if ($model->load($data, "") && $model->login()) {
            $user_id = \Yii::$app->user->id;
            return array('status' => true,
                'auth_key' => User::findOne(['id' => $user_id])->auth_key,
                'username' => User::findOne(['id' => $user_id])->username,
                'admin' => User::findOne(['id' => $user_id])->admin,
                'user_id' => $user_id
            );
        } else {
            return array(
                'status' => false,
                'msg' => $model->getErrors(),
            );
        }
    }

    public function actionSignUp()
    {

        $model = new SignupForm();
        $data = \Yii::$app->request->post();
//        return $data;
        if ($_FILES) {
//            $info = pathinfo($_FILES['doc']['name']);
//          $ext = $info['extension']; // get the extension of the file
            $ext = 'jpeg';
        
            $maxDim = 150;
            $file_name = $_FILES['doc']['tmp_name'];
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
            move_uploaded_file($_FILES['doc']['tmp_name'], 'scans/' . $newname);
        }
//        return $data;

        if ($model->load($data, "")) {
            if ($user = $model->signup()) {
                if ($data['role'] != 10 && $data['role'] != 40) {
                    \Yii::$app->db->createCommand()
                        ->insert('user_skills', [
                            'skills' => $data['additionalskill'],
                            'user_id' => $user->getId(),
                        ])->execute();
                }
                if ($data['role'] == 40) {
                    \Yii::$app->db->createCommand()
                        ->insert('companies', [
                            'name' => $data['company_name'],
                            'activity' => $data['company_activity'],
                            'phone' => $data['company_phone'],
                            'site' => $data['company_site'],
                            'manager_name' => $data['manager_name'],
                            'manager_surname' => $data['manager_surname'],
                            'user_id' => $user->getId(),
                        ])->execute();
                }
                if($data['token']) {
                    \Yii::$app->db->createCommand()
                       ->update('invitations', ['isRedeemed' => true, 'redeemed'=>null], 'token ="'.$data['token'].'"')
                        ->execute();
                }

                return array(
                    'user_id' => $user->getId(),
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
                'msg' => $model->getErrors()
            );
        }
    }

    public function actionAddToFavorites()
    {
        $data = \Yii::$app->request->post();

        $model = new Followers();
        
        $model->user_id = $data['user_id'];
        $model->followed_by = $data['followed_by'];
        
        
        if( $model->save() ) {
             return array(
                'status' => true
            );
         } else {
            return array(
                'status' => false
            );
        }
    /*
        if($model->load($data) && $model->save()) {
            return array(
                'status' => true
            );
        } else {
            return array(
                'status' => false
            );
        }
        */
    }

    public function actionFriends()
    {
        $id = \Yii::$app->request->get('id');
//        return User::find()->select(['id', 'username', 'avatar','role'])->where(['<>', 'id', $id])->all();

        $query = new Query();
        $query2 = new Query();
        $query3 = new Query();
        $subquery = new Query();
        $subquery2 = new Query();
        $subquery3 = new Query();
        
        $subquery -> select( ['user_id AS uid'] )
                -> from( 'followers' )
                -> where( ['followed_by'=>$id] );
        
        $subquery2 -> select( ['followed_by AS uid'] )
                -> from( 'followers' )
                -> where( ['user_id'=>$id] );
        
        $query->select( 'id, username, avatar, role' )
                -> from( 'user' )
                -> where( ['<>', 'id', $id] )
                -> andWhere( ['IN', 'id', $subquery] )
                -> andWhere( ['NOT IN', 'id', $subquery2] );
        
        $command = $query->createCommand();
        $res = $command->queryAll();
        foreach( $res as $key=>$value )
            $res[$key]['followed'] = 2;
        
        $query2->select( 'id, username, avatar, role' )
                -> from( 'user' )
                -> where( ['<>', 'id', $id] )
                -> andWhere( ['IN', 'id', $subquery2] );
        
        $command = $query2->createCommand();
        $res2 = $command->queryAll();
        foreach( $res2 as $key=>$value )
            $res2[$key]['followed'] = 1;
        
        $query3->select( 'id, username, avatar, role' )
                -> from( 'user' )
                -> where( ['<>', 'id', $id] )
                -> andWhere( ['NOT IN', 'id', $subquery] )
                -> andWhere( ['NOT IN', 'id', $subquery2] );

        $command = $query3->createCommand();
        $res3 = $command->queryAll();

        foreach( $res3 as $key=>$value ) {
            $res3[$key]['followed'] = 0;
        }
        
        
        return array_merge( $res, $res2, $res3 );

        
//        'SELECT id, username, avatar, role, 1 as followed FROM user WHERE id<>' . $id . ' AND id IN (SELECT user_id FROM followers WHERE followed_by=210) UNION SELECT id, username, avatar, role, 0 as followed FROM user WHERE id<>210 AND id NOT IN (SELECT user_id FROM followers WHERE followed_by=210)'
    }

    public function actionFriendOne()
    {
        $id = \Yii::$app->request->get('id');
        return User::find()->where(['id' => $id])->all();
    }

}
