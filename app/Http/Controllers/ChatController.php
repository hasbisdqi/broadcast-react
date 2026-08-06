<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Support\Facades\Auth;

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
}
