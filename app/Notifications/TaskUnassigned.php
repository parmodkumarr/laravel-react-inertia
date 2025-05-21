<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskUnassigned extends Notification
{
    public $task;

    public function __construct($task)
    {
        $this->task = $task;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Task Unassigned')
            ->line("You have been removed from the task: {$this->task->name}.");
    }

    public function toArray($notifiable)
    {
        return [
            'type' => 'unassigned',
            'task_id' => $this->task->id,
            'task_name' => $this->task->name,
        ];
    }
}
