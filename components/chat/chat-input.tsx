import { ChatStatus } from 'ai';
import React, { useState } from 'react'
import { PromptInputMessage } from '../ai-elements/prompt-input';
import { useAuth } from '@insforge/nextjs';
import { Item } from '../ui/item';


type ChatInputProps = {
  input: string;
  isLoading: boolean;
  status: ChatStatus;
  setInput: (input: string) => void;
  onStop: () => void;
  onSubmit: (message: PromptInputMessage, options?: any) => void;
}

const ChatInput = ({ input,
  isLoading,
  status,
  setInput,
  onStop,
  onSubmit}:ChatInputProps) => {
    const {isSignedIn}=useAuth();
    const [showAuthBanner,setShowAuthBanner] = useState(false);

    const handleSubmit = (message: PromptInputMessage, options?: any) => {
      if (!isSignedIn) {
        setShowAuthBanner(true);
        return;
      }
      setShowAuthBanner(false);
      onSubmit(message, {});
    };
    
  return (
    <div className='w-full flex flex-col gap-2'>
       {showAuthBanner && (
       <Item>
        
       </Item>
       )}
        </div>

  )
}

export default ChatInput