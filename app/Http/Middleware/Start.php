<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;
use Inertia\Inertia;

class Start extends Middleware
{

    public function handle($request, Closure $next)
    {
        Inertia::setRootView('start');

        return parent::handle($request, $next); // TODO: Change the autogenerated stub
    }
}
