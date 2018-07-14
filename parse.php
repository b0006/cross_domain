<?php
require_once __DIR__ . '/CDom.php';

//header("Content-Type: text/html; charset= windows-1251");
//header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

if ($ch = @curl_init())
{

    @curl_setopt($ch, CURLOPT_URL, $_REQUEST["url"]);

    @curl_setopt($ch, CURLOPT_HEADER, false);

    @curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    @curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);

    @curl_setopt($ch, CURLOPT_USERAGENT, 'PHP Bot (http://blog.yousoft.ru)');

    $data = @curl_exec($ch);

//    print_r($data);

    $posStartAnswer = strpos($data, "<div id=\"answer\">");
    $posEndAnswer = strpos($data, "<p><a target=\"blank\" href=\"http://chessproblem.ru/help");

    $lengthAnswer = intval($posEndAnswer) - intval($posStartAnswer);


    $str = mb_strcut($data, $posStartAnswer, $lengthAnswer);
//    print_r($str);

    $posStartAnswer = strpos($str, "<pre>");
    $posEndAnswer = strpos($str, "</pre>");

    $lengthAnswer = intval($posEndAnswer) - intval($posStartAnswer);

    $str = mb_strcut($str, $posStartAnswer, $lengthAnswer);
    print_r($str);

    @curl_close($ch);
}
?>