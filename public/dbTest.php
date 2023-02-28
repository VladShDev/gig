<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));


require __DIR__ . '/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request using
| the application's HTTP kernel. Then, we will send the response back
| to this client's browser, allowing them to enjoy our application.
|
*/

$app = require_once __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();



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



