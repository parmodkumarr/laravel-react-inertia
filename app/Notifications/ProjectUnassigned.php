<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectUnassigned extends Notification
{
    public $project;

    public function __construct($project)
    {
        $this->project = $project;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Project Unassigned')
            ->line("You have been removed from the project: {$this->project->name}.");
    }

    public function toArray($notifiable)
    {
        return [
            'type' => 'unassigned',
            'project_id' => $this->project->id,
            'project_name' => $this->project->name,
        ];
    }
}
