<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "galery".
 *
 * @property integer $id
 * @property integer $user_id
 * @property string $description
 * @property string $img
 * @property string $create_at
 */
class Galery extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'galery';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'img','create_at'], 'required'],
            [['user_id','create_at'], 'integer'],
            [['description', 'img'], 'string'],
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
            'description' => 'Description',
            'img' => 'Img',
        ];
    }
}
