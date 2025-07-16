<?php

namespace App\Listeners;

use App\Events\PublishClientCreated;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use App\Services\RabbitMQService;

class ClientCreated
{
    protected $rabbit;

    public function __construct(RabbitMQService $rabbit)
    {
        $this->rabbit = $rabbit;
    }

    /**
     * Handle the event.
     */
    public function handle(PublishClientCreated $event): void
    {
        $data = [
            'uuid' => $event->uuid,
            'name' => $event->name,
        ];
        $queue = env('RABBITMQ_QUEUE', 'user.created');
        $this->rabbit->publish($queue, $data);
    }
}
