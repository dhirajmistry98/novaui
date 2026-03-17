import { generateSiteId } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai';
import { toast } from 'sonner';
import { PromptInputMessage } from '../ai-elements/prompt-input';
import NewProjectChat from './new-chat';

type Propstype = {
  isHomepage?: boolean;
  siteId?: string
}

const ChatInterface = ({ isHomepage = false, siteId: propSiteId }: Propstype) => {
  const pathname = usePathname();
  const router = useRouter()

  const [siteId, setSiteId] = useState(() => propSiteId || generateSiteId())

  const [input, setInput] = useState("")
  const [title, SetTitle] = useState<string | null>("")

  const [hasStarted, setHasStarted] = useState(isHomepage)

  const { messages, sendMessage, setMessages, status, error, stop } = useChat({
    messages: [],
    transport: new DefaultChatTransport({
      api: "/api/site",
      prepareSendMessagesRequest: ({ messages, body }) => {
        return {
          body: {
            ...body,
            messages
          }
        }
      }
    }),
    onError: (error) => {
      toast.error("failed to genarte response")
      console.log(error)
    }
  })

  useEffect(() => {
    const CheckReset = () => {
      if (window.location.pathname === "/" && (hasStarted || isHomepage)) {
        setSiteId(generateSiteId())
        setMessages([])
        setHasStarted(false)
        SetTitle(null)
      }
    }
    window.addEventListener("popstate", CheckReset)
    if (pathname === "/" && hasStarted) {
      CheckReset()
    }
    return () => window.removeEventListener("popstate", CheckReset)
  }, [pathname, hasStarted, setMessages, isHomepage])

  const isLoading = status === "submitted" || status === "streaming"
  const onSubmit = (message: PromptInputMessage, options: any) => {
    if (!message.text.trim()) {
      toast.error("Please enter a message")
      return
    }
    if (!isHomepage && !hasStarted) {
      window.history.pushState(null, "", `/site/${siteId}`)
      setHasStarted(true)
    }
sendMessage(
  {
    text: message.text,
    files: message.files,
  },
  {
    body: {
      ...options,
      siteId,
    }
  }
)
    setInput("")
  }

if(!isHomepage && !hasStarted){
  return (
    <NewProjectChat
    input={input}
    setInput={setInput}
    onSubmit={onSubmit}
    status={status}
    onStop={stop}
    isLoading={isLoading}
    />
  )
}
  return (
    <div>ChatInterface</div>
  )
}

export default ChatInterface