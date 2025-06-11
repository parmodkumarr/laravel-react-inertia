<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Notifications\SendOtpNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse|Response
    {
        $request->authenticate();

        // Generate and send OTP
        $user = Auth::user();
        $code = $user->generateOtp();
        $user->notify(new SendOtpNotification($code));
        
        return Inertia::render('Auth/VerifyOtp', [
            'email' => $user->email,
            'status' => 'An OTP code has been sent to your email.',
        ]);
    }

    public function verifyOtp(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ]);

        $user = Auth::user();
        
        if (!$user->verifyOtp($request->code)) {
            throw ValidationException::withMessages([
                'code' => 'The OTP code is invalid or has expired.',
            ]);
        }

        $request->session()->regenerate();
        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function resendOtp(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $code = $user->generateOtp();
        $user->notify(new SendOtpNotification($code));

        return back()->with('status', 'A new OTP code has been sent to your email.');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
