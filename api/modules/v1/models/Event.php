<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "event".
 *
 * @property integer $id
 * @property string $name
 * @property string $description
 * @property integer $date
 * @property integer $user_id
 * @property integer $create_at
 */
class Event extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'event';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'description', 'date', 'user_id', 'create_at'], 'required'],
            [['description', 'city', 'type', 'theme'], 'string'],
            [['date', 'user_id', 'create_at'], 'integer'],
            [['name'], 'string', 'max' => 40],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'description' => 'Description',
            'city' => 'City',
            'date' => 'Date',
            'user_id' => 'User ID',
            'create_at' => 'Create At',
            'type' => 'Event type',
            'theme' => 'Event theme'
        ];
    }
}
