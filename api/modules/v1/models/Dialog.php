<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "dialog".
 *
 * @property integer $id
 * @property integer $sender_id
 * @property integer $getter_id
 * @property integer $create_at
 * @property string $text
 * @property string $read
 */
class Dialog extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'dialog';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['sender_id', 'getter_id', 'create_at', 'text'], 'required'],
            [['sender_id', 'getter_id', 'create_at', 'read'], 'integer'],
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
            'create_at' => 'Create At',
            'text' => 'Text',
        ];
    }
}
