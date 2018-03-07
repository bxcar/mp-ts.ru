<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "user_event".
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $event_id
 */
class UserEvent extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user_event';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'event_id', 'user_name', 'phone', 'email', 'city'], 'required'],
            [['user_id', 'event_id'], 'integer'],
            [['user_name', 'phone', 'email', 'city', 'type', 'theme'], 'string']
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
            'event_id' => 'Event ID',
            'type' => 'Event type',
            'theme' => 'Event theme',
            'user_name' => 'User name',
            'phone' => 'Phone number',
            'email' => 'e-mail address',
            'city' => 'User city'
        ];
    }
    
}
?>
