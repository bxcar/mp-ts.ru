<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "feedback".
 *
 * @property integer $id
 * @property integer $sender_id
 * @property integer $getter_id
 * @property string $text
 * @property integer $create_date
 * @property integer $rating
 */
class Feedback extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'feedback';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['sender_id', 'getter_id', 'text', 'create_date'], 'required'],
            [['sender_id', 'getter_id', 'create_date', 'rating'], 'integer'],
            [['text'], 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'sender_id' => 'Sender ID',
            'getter_id' => 'Getter ID',
            'text' => 'Text',
            'create_date' => 'Create Date',
            'rating' => 'Rating',
        ];
    }
}
