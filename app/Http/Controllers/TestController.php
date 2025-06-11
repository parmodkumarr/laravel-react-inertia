<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\SendWelcomeEmail;
use App\Jobs\GenerateUserProfileReport;
use App\Jobs\NotifyAdmin;
use App\Models\User;

class TestController extends Controller
{
    public function test()
    {
        $user = User::find(1);

        SendWelcomeEmail::withChain([
            new GenerateUserProfileReport($user),
            new NotifyAdmin($user)
        ])->dispatch($user);

        return response()->json(['message' => 'Chained jobs dispatched successfully']);
    }
}
