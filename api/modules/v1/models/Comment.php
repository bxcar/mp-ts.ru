<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "comments".
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $entry_id
 * @property string $text
 * @property integer $create_date
 */
class Comment extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'comments';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'entry_id', 'text', 'create_date'], 'required'],
            [['user_id', 'entry_id', 'create_date', 'type'], 'integer'],
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
            'user_id' => 'User ID',
            'entry_id' => 'Entry ID',
            'text' => 'Text',
            'create_date' => 'Create Date',
            'type' => 'Comment type'
        ];
    }
}
