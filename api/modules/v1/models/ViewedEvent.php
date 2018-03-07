<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "viewed_events".
 *
 * @property integer $id
 * @property integer $uid
 * @property integer $eid
 */
class ViewedEvent extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'viewed_events';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['uid', 'eid'], 'required'],
            [['uid', 'eid'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'uid' => 'User ID',
            'eid' => 'Event ID',
        ];
    }
    
}
?>
