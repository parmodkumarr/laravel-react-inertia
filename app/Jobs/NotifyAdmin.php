<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\AdminNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class NotifyAdmin implements ShouldQueue
{
    use Dispatchable, Queueable;

    protected $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function handle()
    {
        // Send notification email to admin
        Mail::to('admin@example.com')->send(new AdminNotification($this->user));
    }
}
