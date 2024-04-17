'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import Button from '@/shortcodes/Button';
import { RiRefreshLine } from 'react-icons/ri';

const ChatInput: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<string | null>(null);
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    //let userId = Cookies.get('user') || localStorage.getItem('user');
    //let session = Cookies.get('session') || localStorage.getItem('session');
    let userId = "31b35056-4f4a-4d04-a64a-b6ab7c1b46e0"
    let session = "0e63373e-6aff-4545-a08b-0da963945a4d"

    if (!userId || !session) {
      userId = uuidv4();
      session = uuidv4();
      Cookies.set('user', userId, { expires: 365 * 10 });
      Cookies.set('session', session, { expires: 1 / 24 * 6 });
      localStorage.setItem('user', userId);
      localStorage.setItem('session', session);
    }

    setUser(userId);
    setSession(session);
  }, []);

  const fetcher = async (url: string) => {
    const response = await axios.get(url, { params: { user, session } });
    return response.data;
  };

  const { data: messages, mutate } = useSWR('http://localhost:8000/apitest/', fetcher);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === '') return; // Don't send empty message

    const userId = Cookies.get('user') || localStorage.getItem('user');
    const session = Cookies.get('session') || localStorage.getItem('session');

    await axios.post('http://localhost:8000/apitest/', {
      user: userId,
      session: session,
      message: newMessage
    });

    // Refresh data after sending a message
    mutate();

    setNewMessage(''); // Clear input field after sending message
  };

  const expireSession = () => {
    Cookies.remove('session');
    localStorage.removeItem('session');
    const newSession = uuidv4();
    setSession(newSession);
    Cookies.set('session', newSession, { expires: 1 / 24 * 6 });
    localStorage.setItem('session', newSession);
  };

  const renderMessages = () => {
    if (!messages) return null; // Handle case when messages are not yet fetched
    return messages.map((message: { role: string; message: string }, index: number) => (
      <div key={index} className="flex items-center space-x-2">
        <div className={`flex-1 ${message.role === 'assistant' ? 'bg-blue-100' : 'bg-gray-100'} p-2 rounded-md`}>
          <div className={`${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>{message.message}</div>
        </div>
        <div className={`flex-shrink-0 ${message.role === 'assistant' ? 'text-blue-500' : 'text-gray-700'} font-semibold`}>
          {message.role}
        </div>
      </div>
    ));
  };

  return (
    <div className=" m-2 flex flex-col h-5/6 w-full border border-gray-300 rounded-lg dark:border-gray-500 shadow-md">
      <div className="flex-grow overflow-y-auto p-4 drop-shadow-md" ref={messageContainerRef}>
        <div className="flex items-center gap-4  bg-opacity-90 rounded-lg  ">
          <h1 className="text-2xl font-bold tracking-tighter text-gray-800">Gen Cad assistant</h1>
          <button onClick={expireSession} className="ml-auto bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 rounded-full p-2">
            <RiRefreshLine className="h-8 w-8 text-gray-800" />
            <span className="sr-only">Actualiser</span>
          </button>
        </div>
        <div className="space-y-2 p-1">
          {renderMessages()}
        </div>
      </div>
      <div className="sticky bottom-0">
        <form onSubmit={sendMessage} className="flex justify-between items-center  p-2 rounded-lg">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow mr-2 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className=" hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
