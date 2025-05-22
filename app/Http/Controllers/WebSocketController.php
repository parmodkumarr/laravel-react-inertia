<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pusher\Pusher;

class WebSocketController extends Controller
{
    private $pusher;

    public function __construct()
    {
        $this->pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'useTLS' => true
            ]
        );
    }

    public function auth(Request $request)
    {
        $socketId = $request->input('socket_id');
        $channelName = $request->input('channel_name');

        $auth = $this->pusher->socket_auth($channelName, $socketId);

        return response($auth);
    }

    public function signal(Request $request)
    {
        $data = $request->all();
        $channel = 'teleconsultation-' . $data['roomId'];

        $this->pusher->trigger($channel, 'signal', [
            'type' => $data['type'],
            'data' => $data['data'],
            'from' => $data['from']
        ]);

        return response()->json(['status' => 'success']);
    }
}
