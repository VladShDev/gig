<?php

namespace App\Http\Controllers;

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

class IndexController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index()
    {
        if (auth()->user()) {
            $stores = auth()->user()->getStores();
            if ($stores) {
                return redirect()->route('store', ['store' => $stores->first()->hash]);
            } else {
                return redirect(RouteServiceProvider::HOME);
            }
        } else {
            return view("welcome");
        }
    }
}
