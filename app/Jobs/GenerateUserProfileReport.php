<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class GenerateUserProfileReport implements ShouldQueue
{
    use Dispatchable, Queueable;

    protected $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function handle()
    {
        // Simulate report generation (e.g. create PDF or gather data)
        \Log::info('Generating profile report for user: '.$this->user->id);

        // Here you would add actual logic to generate report
    }
}
