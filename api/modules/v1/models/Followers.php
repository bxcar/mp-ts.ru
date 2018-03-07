<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "followers".
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $follower_id
 * @property integer $last_update
 */
class Followers extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'followers';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'followed_by'], 'required'],
            [['user_id', 'followed_by'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'followed_by' => 'Follower ID',
            'updated' => 'Last Update',
        ];
    }
}
