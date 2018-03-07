<?php

namespace api\modules\v1\models;

use Yii;

/**
 * This is the model class for table "products".
 *
 * @property integer $id
 * @property integer $provider_id
 * @property string $name
 * @property string $seria
 * @property string $article
 * @property string $width
 * @property string $depth
 * @property string $color
 * @property string $price
 * @property string $price_nds
 * @property string $country
 * @property string $count
 * @property string $warranty
 * @property string $length
 * @property string $img
 * @property string $type
 */
class Products extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'products';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'provider_id', 'name', 'seria', 'article', 'width', 'depth', 'color', 'price', 'price_nds', 'country', 'count', 'warranty', 'length', 'img', 'type'], 'required'],
            [['id', 'provider_id'], 'integer'],
            [['name', 'seria', 'article', 'width', 'depth', 'color', 'price', 'price_nds', 'country', 'count', 'warranty', 'length', 'img', 'type'], 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'provider_id' => 'Provider ID',
            'name' => 'Name',
            'seria' => 'Seria',
            'article' => 'Article',
            'width' => 'Width',
            'depth' => 'Depth',
            'color' => 'Color',
            'price' => 'Price',
            'price_nds' => 'Price Nds',
            'country' => 'Country',
            'count' => 'Count',
            'warranty' => 'Warranty',
            'length' => 'Length',
            'img' => 'Img',
            'type' => 'Type',
        ];
    }
}
