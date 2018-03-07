<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "feedback_product".
 *
 * @property integer $id
 * @property integer $user_id
 * @property string $text
 * @property integer $rating
 * @property integer $product_id
 */
class FeedbackProduct extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'feedback_product';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'user_id', 'rating', 'product_id'], 'integer'],
            [['user_id', 'text', 'product_id'], 'required'],
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
            'text' => 'Text',
            'rating' => 'Rating',
            'product_id' => 'Product ID',
        ];
    }
}
