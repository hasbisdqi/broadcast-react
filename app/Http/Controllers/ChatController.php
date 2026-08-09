<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function index()
    {
        $conversations = Auth::user()->conversations()->with('users', 'lastMessage.sender')->get();

        return inertia('chat/page', compact('conversations'));
    }

    public function view(Conversation $conversation)
    {
        $conversations = Auth::user()->conversations()->with('users', 'lastMessage.sender')->get();

        $messages = $conversation->messages()->with('sender')->get();

        return inertia('chat/page', compact('conversations', 'messages'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);

        abort_if($data['user_id'] === Auth::id(), 422);

        $userIds = [
            Auth::id(),
            $data['user_id'],
        ];

        sort($userIds);

        $directKey = implode(':', $userIds);

        DB::transaction(function () use (&$conversation, $directKey, $data) {
            $conversation = Conversation::firstOrCreate(
                [
                    'direct_key' => $directKey,
                ],
                [
                    'type' => 'direct',
                    'created_by' => Auth::id(),
                ]
            );

            $conversation->users()->syncWithoutDetaching([
                Auth::id(),
                $data['user_id'],
            ]);
        });

        return redirect()->route('chat.view', $conversation);
    }
}
