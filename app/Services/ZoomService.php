<?php

// app/Services/ZoomService.php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ZoomService
{
    public function getOAuthToken()
    {
        try {
            $response = Http::withHeaders([
                'Host' => 'zoom.us',
                'Authorization' => 'Basic ' . base64_encode(config('services.zoom.client_id') . ':' . config('services.zoom.client_secret')),
            ])->asForm()->post('https://zoom.us/oauth/token', [
                'grant_type' => 'account_credentials',
                'account_id' => config('services.zoom.account_id'),
            ]);

            if ($response->failed()) {
                $error = $response->json();
                Log::error('Zoom OAuth Error', [
                    'status' => $response->status(),
                    'error' => $error,
                ]);
                throw new \Exception($error['reason'] ?? 'Failed to get OAuth token');
            }

            return $response->json()['access_token'];
        } catch (\Exception $e) {
            Log::error('Zoom OAuth Exception', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function createMeeting(array $data)
    {
        $token = $this->getOAuthToken();

        $response = Http::withToken($token)
            ->post('https://api.zoom.us/v2/users/me/meetings', [
                'topic' => $data['topic'] ?? 'New Meeting',
                'type' => 2, // Scheduled meeting
                'start_time' => $this->formatZoomTime($data['start_time'] ?? now()->addHour()),
                'duration' => $data['duration'] ?? 60,
                'timezone' => config('app.timezone'),
                'settings' => [
                    'host_video' => $data['host_video'] ?? true,
                    'participant_video' => $data['participant_video'] ?? true,
                    'join_before_host' => false,
                    'waiting_room' => true,
                ]
            ]);

        if ($response->failed()) {
            throw new \Exception('Failed to create meeting: ' . $response->body());
        }

        return $response->json();
    }

    protected function formatZoomTime($time)
    {
        return $time instanceof \DateTimeInterface
            ? $time->format('Y-m-d\TH:i:s')
            : now()->addHour()->format('Y-m-d\TH:i:s');
    }
}
