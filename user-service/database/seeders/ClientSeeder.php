<?php

namespace Database\Seeders;

use \App\Models\Client;
use Illuminate\Database\Seeder;
use App\Services\RabbitMQService;

class ClientSeeder extends Seeder
{    public function run(): void
    {
        $clients = Client::factory()
            ->count(50)
            ->create();

        $rabbit = new RabbitMQService();
        $queue = env('RABBITMQ_QUEUE', 'user.created');
        foreach ($clients as $client) {
            $rabbit->publish($queue, [
                'uuid' => $client->uuid,
                'name' => $client->name,
            ]);
        }
    }

    
}
