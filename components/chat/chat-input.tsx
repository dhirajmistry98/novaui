import { ChatStatus } from 'ai';
import React, { useState } from 'react'
import { PromptInputMessage } from '../ai-elements/prompt-input';
import { SignInButton, SignUpButton, useAuth } from '@insforge/nextjs';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '../ui/item';
import { FaLock, FaTimes } from 'react-icons/fa';
import { Button } from '../ui/button';


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
  onSubmit }: ChatInputProps) => {
  const { isSignedIn } = useAuth();
  const [showAuthBanner, setShowAuthBanner] = useState(false);

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
        <Item variant="outline" size="sm" className='bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/30 text-amber-900 animate-in fade-in duration-300 slide-in-from-bottom-200'>
          <ItemMedia variant="icon" className='bg-transparent'>
            <FaLock className='size-4' />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className='text-sm'>Sign in to use AI</ItemTitle>
            <ItemDescription>Create a free account to start desgining with Nova-UI</ItemDescription>
          </ItemContent>
          <ItemActions>
            <SignInButton>
              <Button variant="outline" size="sm">Login</Button>
            </SignInButton>
            <SignUpButton>
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
            <Button size="sm" variant="ghost" onClick={() => setShowAuthBanner(false)}>
              <FaTimes className='size-4' />
            </Button>
          </ItemActions>
        </Item>
      )}
    </div>

  )
}

export default ChatInput