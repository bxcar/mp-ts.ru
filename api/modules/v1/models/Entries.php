<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "entries".
 *
 * @property integer $id
 * @property integer $getter_id
 * @property string $text
 * @property string $attachment
 * @property integer $create_date
 * @property integer $sender_id
 */
class Entries extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'entries';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['getter_id', 'create_date', 'sender_id'], 'required'],
            [['getter_id', 'create_date', 'sender_id', 'type'], 'integer'],
            [['text'], 'string'],
            [['attachment'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'getter_id' => 'Getter ID',
            'text' => 'Text',
            'attachment' => 'Attachment',
            'create_date' => 'Create Date',
            'sender_id' => 'Sender ID',
            'type' => 'Entry type'
        ];
    }
}
