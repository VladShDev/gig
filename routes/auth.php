<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\User;


Route::get('/register', [RegisteredUserController::class, 'create'])
    ->middleware(['guest','start'])
    ->name('register');


Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware(['guest','start']);

Route::get('/login', [AuthenticatedSessionController::class, 'create'])
    ->middleware(['guest','start'])
    ->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(['guest','start']);

Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
    ->middleware(['guest','start'])
    ->name('password.request');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware(['guest','start'])
    ->name('password.email');

Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
    ->middleware(['guest','start'])
    ->name('password.reset');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware(['guest','start'])
    ->name('password.update');

Route::get('/verify-email', [EmailVerificationPromptController::class, '__invoke'])
    ->middleware(['auth','start'])
    ->name('verification.notice');

Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['auth', 'signed', 'throttle:6,1','start'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1','start'])
    ->name('verification.send');

Route::get('/confirm-password', [ConfirmablePasswordController::class, 'show'])
    ->middleware(['auth','start'])
    ->name('password.confirm');

Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store'])
    ->middleware(['auth','start']);

Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware(['auth','start'])
    ->name('logout');


Route::get('/loginredirect', function (){
  return Inertia::render('Auth/LoginRedirect');
})->middleware(['auth','start']);

