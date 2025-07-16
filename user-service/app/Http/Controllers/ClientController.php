<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Events\PublishClientCreated;
use App\Models\Client;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->get('per_page', 15);
        $page = request()->get('page', 1);
        $clients = Client::paginate($perPage, ['*'], 'page', $page);
        return response()->json([
            'data' => $clients->items(),
            'current_page' => $clients->currentPage(),
            'last_page' => $clients->lastPage(),
            'per_page' => $clients->perPage(),
            'total' => $clients->total(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $client = Client::create($request->safe()->all());
        // Publica mensagem na fila RabbitMQ

        event(new PublishClientCreated($client->uuid, $client->name));
        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client = Client::find($id);
        
        if (!$client) {
            return response()->json(['error' => __('Client not found')], 404);
        }
        
        return response()->json($client);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreClientRequest $request, Client $Client)
    {
        $Client->update($request->safe()->all());

        return $Client;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $Client)
    {
        Client::destroy($Client);
        return response()->noContent();
    }
}
