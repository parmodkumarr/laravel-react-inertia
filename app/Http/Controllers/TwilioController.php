<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;
use Illuminate\Support\Facades\Log;

class TwilioController extends Controller
{
    public function generateToken(Request $request)
    {
        try {
            // Validate request
            $request->validate([
                'roomName' => 'required|string'
            ]);

            // Get the user's identity
            $identity = $request->user()->id;

            // Log the attempt
            Log::info('Generating Twilio token', [
                'user_id' => $identity,
                'room' => $request->roomName
            ]);

            // Create an Access Token
            $token = new AccessToken(
                env('TWILIO_ACCOUNT_SID'),
                env('TWILIO_API_KEY'),
                env('TWILIO_API_SECRET'),
                3600,
                $identity
            );

            // Grant access to Video
            $grant = new VideoGrant();
            $grant->setRoom($request->roomName);
            $token->addGrant($grant);

            return response()->json([
                'token' => $token->toJWT(),
                'identity' => $identity
            ]);
        } catch (\Exception $e) {
            Log::error('Error generating Twilio token', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Failed to generate token',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
