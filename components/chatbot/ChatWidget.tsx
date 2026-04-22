'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageSquare, X, ArrowUp, RotateCcw } from 'lucide-react'

type Role = 'user' | 'bot'
type Message = { id: string; role: Role; text: string; ts: number; error?: boolean }
type HistoryItem = { role: 'user' | 'assistant'; content: string }

const SUGGESTED = [
  'What projects has Warad built?',
  'What are his core skills?',
  'Latest blog posts?',
  'How to contact Warad?',
]

const INITIAL: Message = {
  id: 'init',
  role: 'bot',
  text: "Hi! I'm Warad's portfolio assistant 👋\nAsk me about his projects, skills, blog posts, or experience — in any language.",
  ts: Date.now(),
}

function uid() { return Math.random().toString(36).slice(2, 9) }
function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function TypingDots() {
  return (
    <div className="mr-auto flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm bg-[#111111] border border-[rgba(255,255,255,0.07)]">
      {[0, 1, 2].map(i => (
        <span key={i} className="block w-1.5 h-1.5 rounded-full bg-[#444]"
          style={{ animation: 'chatBounce 1.2s ease-in-out infinite', animationDelay: `${i * 0.18}s` }}
          aria-hidden="true" />
      ))}
    </div>
  )
}

function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex flex-col gap-0.5 ${isUser ? 'items-end' : 'items-start'}`}
      style={{ animation: 'chatFadeUp 0.22s ease both' }}>
      <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words
        ${isUser
          ? 'bg-[#00E87A] text-[#0A0A0A] rounded-br-sm font-medium max-w-[82%]'
          : msg.error
            ? 'bg-[#111] border border-red-500/20 text-red-400 rounded-bl-sm max-w-[92%]'
            : 'bg-[#111111] border border-[rgba(255,255,255,0.07)] text-[#E8E8E8] rounded-bl-sm max-w-[92%]'}`}>
        {msg.text}
      </div>
      <span className="text-[10px] text-[#444] px-1 tabular-nums">{fmtTime(msg.ts)}</span>
    </div>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggested, setShowSuggested] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 180)
  }, [isOpen])

  const buildHistory = useCallback((): HistoryItem[] => {
    return messages
      .filter(m => m.id !== 'init')
      .slice(-8)
      .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
  }, [messages])

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    setShowSuggested(false)
    const userMsg: Message = { id: uid(), role: 'user', text: trimmed, ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: buildHistory() }),
      })
      const data = await res.json()

      setMessages(prev => [...prev, {
        id: uid(),
        role: 'bot',
        text: res.ok ? data.reply : (data.error ?? 'Something went wrong.'),
        ts: Date.now(),
        error: !res.ok,
      }])
    } catch {
      setMessages(prev => [...prev, {
        id: uid(), role: 'bot',
        text: 'Network error. Check your connection and try again.',
        ts: Date.now(), error: true,
      }])
    } finally {
      setIsLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isLoading, buildHistory])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  const reset = () => { setMessages([INITIAL]); setShowSuggested(true); setInput('') }

  const charsLeft = 500 - input.length
  const isOnlyInit = messages.length === 1

  return (
    <>
      <style>{`
        @keyframes chatFadeUp {
          from { opacity:0; transform:translateY(8px) }
          to   { opacity:1; transform:translateY(0) }
        }
        @keyframes chatBounce {
          0%,80%,100% { transform:translateY(0);   opacity:0.4 }
          40%          { transform:translateY(-5px); opacity:1 }
        }
        @keyframes chatPanelIn {
          from { opacity:0; transform:translateY(14px) scale(0.96) }
          to   { opacity:1; transform:translateY(0)    scale(1) }
        }
        @keyframes chatGlow {
          0%,100% { box-shadow:0 0 12px rgba(0,232,122,0.25) }
          50%     { box-shadow:0 0 28px rgba(0,232,122,0.5) }
        }
        .chat-panel { animation:chatPanelIn 0.26s cubic-bezier(0.16,1,0.3,1) both }
        .chat-btn-pulse { animation:chatGlow 2.8s ease-in-out infinite }
        .chat-scroll::-webkit-scrollbar { width:3px }
        .chat-scroll::-webkit-scrollbar-track { background:transparent }
        .chat-scroll::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:99px }
      `}</style>

      {/* Panel */}
      {isOpen && (
        <div className="chat-panel fixed z-50 flex flex-col rounded-2xl overflow-hidden
          border border-[rgba(255,255,255,0.09)]"
          style={{
            bottom: 76, right: 20,
            width: 'min(340px, calc(100vw - 32px))',
            height: 'min(490px, calc(100svh - 120px))',
            background: 'linear-gradient(150deg,#161616 0%,#0f0f0f 100%)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
          }}>

          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-[#00E87A]/10 border border-[#00E87A]/25 flex items-center justify-center">
                  <span className="text-[#00E87A] text-xs font-mono font-bold">W</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00E87A] border-2 border-[#0f0f0f] animate-pulse" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F0F0F0] font-mono leading-none">Portfolio Assistant</p>
                <p className="text-[10px] text-[#00E87A]/80 mt-0.5 leading-none">● Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!isOnlyInit && (
                <button onClick={reset} aria-label="Reset conversation" title="New conversation"
                  className="text-[#444] hover:text-[#888] p-1.5 rounded-lg hover:bg-white/5 transition-all">
                  <RotateCcw size={13} />
                </button>
              )}
              <button onClick={() => setIsOpen(false)} aria-label="Close chat"
                className="text-[#444] hover:text-[#F0F0F0] p-1.5 rounded-lg hover:bg-white/5 transition-all">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-scroll flex-1 overflow-y-auto p-3.5 flex flex-col gap-3 min-h-0">
            {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}

            {showSuggested && isOnlyInit && (
              <div className="flex flex-col gap-1.5 mt-1" style={{ animation: 'chatFadeUp 0.3s ease 0.2s both' }}>
                <p className="text-[10px] text-[#333] font-mono uppercase tracking-wider px-0.5">Try asking</p>
                {SUGGESTED.map(q => (
                  <button key={q} onClick={() => send(q)}
                    className="text-left text-xs text-[#666] px-3 py-2 rounded-xl
                      border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,232,122,0.2)]
                      hover:text-[#E0E0E0] hover:bg-[rgba(0,232,122,0.03)]
                      transition-all duration-150 active:scale-[0.98]">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {isLoading && <TypingDots />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 p-2.5 flex flex-col gap-1.5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex gap-2 items-center">
              <input ref={inputRef} type="text" value={input}
                onChange={e => setInput(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..." disabled={isLoading}
                aria-label="Chat message input"
                className="flex-1 text-sm text-[#E8E8E8] placeholder-[#3a3a3a]
                  bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]
                  rounded-xl px-3.5 py-2.5 focus:outline-none
                  focus:border-[rgba(0,232,122,0.3)] focus:bg-[rgba(0,232,122,0.02)]
                  disabled:opacity-40 transition-all duration-200" />
              <button onClick={() => send(input)}
                disabled={isLoading || !input.trim()} aria-label="Send message"
                className="shrink-0 flex items-center justify-center rounded-xl
                  bg-[#00E87A] text-[#0A0A0A]
                  hover:bg-[#00f080] disabled:opacity-25 disabled:cursor-not-allowed
                  transition-all duration-150 active:scale-90"
                style={{ width: 40, height: 40 }}>
                <ArrowUp size={17} strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex justify-between items-center px-0.5">
              <p className="text-[10px] text-[#2a2a2a] font-mono">
                Groq · llama-3.1-70b
              </p>
              {charsLeft <= 120 && (
                <span className={`text-[10px] tabular-nums font-mono ${charsLeft <= 20 ? 'text-red-400' : 'text-[#3a3a3a]'}`}>
                  {charsLeft} left
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        className={`fixed z-50 flex items-center justify-center rounded-full
          transition-all duration-200 hover:scale-110 active:scale-90
          ${isOpen
            ? 'bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] text-[#555]'
            : 'bg-[#00E87A] text-[#0A0A0A] chat-btn-pulse'}`}
        style={{ bottom: 20, right: 20, width: 52, height: 52 }}>
        <span style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
          {isOpen ? <X size={20} /> : <MessageSquare size={21} />}
        </span>
      </button>
    </>
  )
}
