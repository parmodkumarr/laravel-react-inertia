<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Firebase\JWT\JWT;

class ZoomService
{
    protected $apiKey;
    protected $apiSecret;
    protected $baseUrl = 'https://api.zoom.us/v2';

    public function __construct()
    {
        $this->apiKey = config('services.zoom.api_key');
        $this->apiSecret = config('services.zoom.api_secret');
    }

    public function createMeeting($topic, $startTime, $duration = 30)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->generateJWT(),
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl . '/users/me/meetings', [
            'topic' => $topic,
            'type' => 2, // Scheduled meeting
            'start_time' => $startTime,
            'duration' => $duration,
            'settings' => [
                'host_video' => true,
                'participant_video' => true,
                'join_before_host' => false,
                'mute_upon_entry' => true,
                'waiting_room' => true,
            ],
        ]);

        if ($response->failed()) {
            Log::error('Zoom API Error:', [
                'status' => $response->status(),
                'body' => $response->json(),
            ]);
            throw new \Exception('Failed to create Zoom meeting: ' . $response->body());
        }

        return $response->json();
    }

    protected function generateJWT()
    {
        $payload = [
            'iss' => $this->apiKey,
            'exp' => time() + 3600,
        ];

        try {
            return JWT::encode($payload, $this->apiSecret, 'HS256');
        } catch (\Exception $e) {
            Log::error('JWT Generation Error:', [
                'error' => $e->getMessage(),
                'payload' => $payload
            ]);
            throw $e;
        }
    }
}
