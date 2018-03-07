<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\Order;
use Yii;

class OrderController extends \yii\rest\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionOldCreate()
    {
        $data = Yii::$app->request->post();
        $model = new Order();
        $model->create_at = time();
        if ($model->load($data, "") && $model->save()) {
            $mrh_login = "products.htmlid1";
            $mrh_pass1 = "M15yWdOmtIEJyVyk6E03";
            $inv_id=$model->id;
//            $out_summ = "100.00";
            $out_summ = $data["summ"];
            $description="test desc";
            $crc  =md5("$mrh_login:$out_summ:$inv_id:$mrh_pass1");
            return [
                'status' => true,
                'url'=>"http://auth.robokassa.ru/Merchant/Index.aspx?IsTest=1&"."MrchLogin=products.htmlid1&OutSum=".$out_summ."&InvId=".$inv_id."&IncCurrLabel=&Desc=".$description."&SignatureValue=".$crc
            ];
        } else {
            return [
                'status' => false,
                'msg' => $model->getErrors()
            ];
        }

    }
    
    public function actionCreate()
    {
        $data = Yii::$app->request->post();
        $model = new Order();
        $model->create_at = time();
        if ($model->load($data, "") && $model->save()) {

            $subject = "TUNINGSOUZ: ваш заказ";

        // compose headers
            $headers = "From: TUNINGSOUZ <carbon3d@bk.ru>\r\n";
            $headers .= "Reply-To: carbon3d@bk.ru\r\n";
            $headers .= "X-Mailer: PHP/".phpversion();

        // compose message
            $message = "Здравствуйте " . $data["username"] . ",\r\n\r\n";
            $message .= "Спасибо за заказ в нашем магазине!\r\n";
            $message .= "В ближайшее время наш менеджер свяжется с вами для уточнения деталей.\r\n\r\n";
            $message .= "Ваш заказ №" . $model->id . " на сумму " . $data["summ"] . " руб.:\r\n";
            $message .= $data["description"] . "\r\n";
            $message .= "С уважением,\r\nВаш TUNINGSOUZ\r\n";
        // $message = wordwrap($message, 70);

        // send email
            mail( $data["email"], $subject, $message, $headers );

            $products = json_decode( $data["order"] );
            
            $orders = [];
            
            foreach( $products as $product ) {
                $orders[$product->email][] = $product;

            }
            
            foreach( $orders as $email => $order ) {
                $subject = "TUNINGSOUZ: новый заказ  №" . $model->id;
            // compose headers
                $headers = "From: TUNINGSOUZ <carbon3d@bk.ru>\r\n";
                $headers .= "Reply-To: carbon3d@bk.ru\r\n";
                $headers .= "X-Mailer: PHP/".phpversion();

            // compose message
                $message = "Заказ от " . $data["username"] . ",\r\n\r\n";
//                $message .= "Заказ №" . $model->id . " на сумму " . $data["summ"] . " руб.:\r\n";
                $message .= "Заказ №" . $model->id . ":\r\n";
                foreach( $order as $ordr )
                    $message .= $ordr->text . "\r\n";
                $message .= "\r\n  Заказчик: " . $data["username"] ."\r\n";
                $message .= "  e-mail: " . $data["email"] ."\r\n";
                $message .= "  Адрес: " . $data["address"] ."\r\n";
                $message .= "  Телефон: " . $data["phone"] ."\r\n";
            // $message = wordwrap($message, 70);

            // send email
                mail(  $email, $subject, $message, $headers );
            }
            
            
            
            return [
                'status' => true,
//                'data'=>$data
                'data'=>$orders
            ];
        } else {
            return [
                'status' => false,
                'msg' => $model->getErrors()
            ];
        }

    }

}
