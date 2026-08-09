<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function store(Request $request, Conversation $conversation)
    {
        abort_unless(
            $conversation->users()
                ->whereKey($request->user()->id)
                ->exists(),
            403
        );

        $data = $request->validate([
            'body' => ['required', 'string', 'max:5000'],
        ]);

        DB::transaction(function () use ($conversation, $request, $data) {
            $message = Message::create([
                'conversation_id' => $conversation->id,
                'sender_id' => $request->user()->id,
                'type' => 'text',
                'body' => $data['body'],
            ]);

            $conversation->update([
                'last_message_at' => now(),
            ]);

            broadcast(new MessageSent(
                $message->load('sender'),
                $request['client_id'] ?? null
            ))->toOthers();
        });

        return response()->json(['status' => 'Message sent successfully']);
    }
}
