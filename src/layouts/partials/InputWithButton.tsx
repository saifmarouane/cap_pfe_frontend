import React, { useState } from 'react';
import { HiOutlineArrowLongRight } from 'react-icons/hi2'; // Import the icon of your choice

interface InputWithButtonProps {
  onSend: (message: string) => void;
}

const InputWithButton: React.FC<InputWithButtonProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  // Introducing an error by using an undefined variable
  // This line will throw a ReferenceError
  console.log();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="chat" className="sr-only">Your message</label>
      <div className="flex items-center px-3 py-2 rounded-lg">
        {/* Add your icon buttons here */}
        <textarea
          id="chat"
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
          <HiOutlineArrowLongRight className="w-5 h-5 rotate-90 rtl:-rotate-90" />
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
};

export default InputWithButton;
