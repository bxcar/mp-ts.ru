<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "vacantion".
 *
 * @property integer $id
 * @property string $name
 * @property string $salary
 * @property string $description
 * @property string $city
 * @property string $exp
 * @property string $phone
 * @property integer $user_id
 * @property string $image
 * @property integer $create_date
 */
class Vacantion extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'vacantion';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'salary', 'description', 'city', 'exp', 'phone', 'user_id', 'create_date'], 'required'],
            [['name', 'salary', 'description', 'city', 'exp', 'phone', 'image'], 'string'],
            [['user_id', 'create_date'], 'integer'],
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
            'salary' => 'Salary',
            'description' => 'Description',
            'city' => 'City',
            'exp' => 'Exp',
            'phone' => 'Phone',
            'user_id' => 'User ID',
            'image' => 'Image',
            'create_date' => 'Create Date',
        ];
    }
}
