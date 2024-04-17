'use client';

// Importez le fichier de configuration Tailwind CSS
import 'tailwindcss/tailwind.css';
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

const conversationStyles = `
  cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
`;

const ChatHistory = () => {
  const [conversations, setConversations] = useState([
 
      { id: 1, title: "Meeting with John about project deadline" },
      { id: 2, title: "Support chat with Sarah regarding login issue" },
      { id: 3, title: "Group chat: Weekend plans with friends" },
      { id: 4, title: "Brainstorming session: New marketing campaign ideas" },
      { id: 5, title: "One-on-one with Mary for performance review" },
      { id: 6, title: "Client call: Discussing software implementation details" },
      { id: 7, title: "Team chat: Urgent bug fix in production environment" },
      { id: 8, title: "Family chat: Birthday party arrangements for Grandma" },
      { id: 9, title: "Customer feedback: Suggestions for product improvement" },
      { id: 10, title: "Book club discussion: 'Pride and Prejudice' by Jane Austen" },
      { id: 1, title: "Meeting with John about project deadline" },
      { id: 2, title: "Support chat with Sarah regarding login issue" },
      { id: 3, title: "Group chat: Weekend plans with friends" },
      { id: 4, title: "Brainstorming session: New marketing campaign ideas" },
      { id: 5, title: "One-on-one with Mary for performance review" },
      { id: 6, title: "Client call: Discussing software implementation details" },
      { id: 7, title: "Team chat: Urgent bug fix in production environment" },
      { id: 8, title: "Family chat: Birthday party arrangements for Grandma" },
      { id: 9, title: "Customer feedback: Suggestions for product improvement" },
      { id: 10, title: "Book club discussion: 'Pride and Prejudice' by Jane Austen" },
      { id: 1, title: "Meeting with John about project deadline" },
      { id: 2, title: "Support chat with Sarah regarding login issue" },
      { id: 3, title: "Group chat: Weekend plans with friends" },
      { id: 4, title: "Brainstorming session: New marketing campaign ideas" },
      { id: 5, title: "One-on-one with Mary for performance review" },
      { id: 6, title: "Client call: Discussing software implementation details" },
      { id: 7, title: "Team chat: Urgent bug fix in production environment" },
      { id: 8, title: "Family chat: Birthday party arrangements for Grandma" },
      { id: 9, title: "Customer feedback: Suggestions for product improvement" },
      { id: 10, title: "Book club discussion: 'Pride and Prejudice' by Jane Austen" },
 
  ]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isClearClicked, setIsClearClicked] = useState(false);
//null to delete 
  const handleConversationClick = (conversationId: null) => {
    setSelectedConversationId(conversationId);
  };

  const clearChat = () => {
    console.clear();
    setSelectedConversationId(null);
    setIsClearClicked(true);
  };

  return (
  <div className="h-screen flex flex-col min-h-0">      {/* Clear Chat Button */}
      <button
      onClick={clearChat}
      className="flex items-center justify-center bg-transparent border border-gray-300 text-gray-600 font-light py-1 px-4 mb-4 rounded-md transition duration-300 ease-in-out shadow-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:shadow-outline-blue active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed ${isClearClicked ? 'transform scale-105' : ''}"
      style={{ marginLeft: '10px', marginRight: '10px' }}
    >
      <div className="flex items-center justify-between w-full">
        <FaPlus className="mr-2 text-base" />
        <span className="text-center w-full">Create New</span>
      </div>
    </button>
      {/* Conversations List */}
      <div className="overflow-y-auto p-4 flex-1 ">
        <ul className="list-decimal list-inside mb-4 border  rounded-md p-4  shadow-lg">
          {conversations.map(conversation => (
            <li key={conversation.id} onClick={() => handleConversationClick(conversation.id)} className={`${conversationStyles} ${selectedConversationId === conversation.id ? 'bg-blue-100' : ''} border-b border-gray-200 py-2`}>
              {conversation.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatHistory;