<?php


try {

$config = Illuminate\Support\Facades\DB::connection()->getConfig();
$pdo = Illuminate\Support\Facades\DB::connection()->getPdo();
$db = DB::table('db')->get();
} catch (Trowable $e) {
dump("catch");
dump($e);
}
dump(['config' => $config ,
'pdo' => $pdo,
'myDb' => $db]);