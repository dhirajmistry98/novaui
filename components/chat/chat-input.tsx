import { ChatStatus } from 'ai';
import React, { useState } from 'react'
import { PromptInput, PromptInputActionAddAttachments, PromptInputActionMenu, PromptInputActionMenuContent, PromptInputActionMenuTrigger, PromptInputBody, PromptInputFooter, PromptInputMessage, PromptInputSubmit, PromptInputTextarea, PromptInputTools, usePromptInputAttachments } from '../ai-elements/prompt-input';
import { SignInButton, SignUpButton, useAuth } from '@insforge/nextjs';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '../ui/item';
import { FaArrowUp, FaLock, FaStop, FaTimes } from 'react-icons/fa';
import { Button } from '../ui/button';
import { Attachment, AttachmentPreview, AttachmentRemove, Attachments } from '../ai-elements/attachments';


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
      <PromptInput
        globalDrop
        className='rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] bg-background/70 backdrop-blur-xl border-border/50 ring-1 ring-border/5 transition-all focus-within:ring-primary/20 focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
           onSubmit={handleSubmit}
      >
        <PromptInputActionAddAttachmentsDisplay/>
       <PromptInputBody>
        <PromptInputTextarea 
        onChange={(e)=>setInput(e.target.value)}
        value={input}
        placeholder='Describe the website you want to build...'
        className='pt-6 px-6 pb-2 selection:bg-primary/20 placeholder:text-muted-foreground/50'
        />
       </PromptInputBody>
     <PromptInputFooter className="px-4 pb-4">
      <PromptInputTools>
        <PromptInputActionMenu>
          <PromptInputActionMenuTrigger className="size-9 rounded-full hover:bg-accent/50 transition-colors"/>
          <PromptInputActionMenuContent>
            <PromptInputActionAddAttachments/>
          </PromptInputActionMenuContent>
        </PromptInputActionMenu>
      </PromptInputTools>
      {isLoading?(
        <StopButton onStop={onStop}/>

      ):(
        <PromptInputSubmit
        status={status}
        disabled={!input.trim() || isLoading}
        className='size-9 rounded-full bg-primary hover:bg-primary/90 transition-all flex items-center justify-center p-0'
        >
       <FaArrowUp size={16} className="text-primary-foreground"/>
        </PromptInputSubmit>
      )}
     </PromptInputFooter>
      </PromptInput>
    </div>

  )
}

const  PromptInputActionAddAttachmentsDisplay = () => {
  const attachments = usePromptInputAttachments();
  if (attachments.files.length === 0) {
     return null
  }
  return(
    <Attachments 
    variant='grid'
    className='px-4 w-full pt-4 justify-start flex-nowrap overflow-x-auto ml-0'
    >
      {attachments.files.map((attachment)=>(
        <Attachment
        data={attachment}
        key={attachment.id}
        className='size-15 shrink-0'
        onRemove={()=> attachments.remove(
          attachment.id
        )}
        >
          <AttachmentPreview/>
          <AttachmentRemove/>
        </Attachment>
        ))}
    </Attachments>
  )
}
const StopButton = ({onStop}: {onStop: () => void}) => {
  return(
    <Button
    size="icon"
    variant="outline"
    className='!bg-muted dark:!bg-black border cursor-pointer rounded-full'
    onClick={onStop}
    >
      <FaStop size={15} className='text-black dark:text-white'/>
    </Button>
  )
}
export default ChatInput