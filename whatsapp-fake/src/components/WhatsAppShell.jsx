import { useState, useRef, useEffect } from 'react'
import '../App.css'

function StatusBar() {
  return (
    <div className="ios-sb">
      <span>9:41</span>
      <div className="ios-sb-r">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="#fff">
          <rect x="0" y="8" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5"/>
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="12" rx="0.5"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="#fff">
          <path d="M8 3.6C9.8 3.6 11.4 4.3 12.6 5.5L14 4.1C12.4 2.5 10.3 1.6 8 1.6S3.6 2.5 2 4.1L3.4 5.5C4.6 4.3 6.2 3.6 8 3.6z"/>
          <path d="M8 7.2c1 0 2 .4 2.7 1.1L12 7c-1.1-1.1-2.5-1.7-4-1.7S4.9 5.9 3.8 7L5.1 8.3C5.8 7.6 6.9 7.2 8 7.2z"/>
          <circle cx="8" cy="11" r="1.5"/>
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="#fff" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="16" height="9" rx="1.5" fill="#25D366"/>
          <path d="M23.5 4.5V8.5" stroke="#fff" strokeOpacity="0.4" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

function ChatList({ chats, onSelect }) {
  return (
    <>
      <StatusBar />
      <div className="wa-h"><h1>WhatsApp</h1></div>
      <div className="wa-search">
        <span>🔍</span>
        <input placeholder="搜尋" readOnly />
      </div>
      <div className="wa-filters">
        <span className="wa-ftab active">全部</span>
        <span className="wa-ftab">未讀</span>
        <span className="wa-ftab">群組</span>
      </div>
      <div className="chat-scroll">
        {chats.map((c) => (
          <div className="chat-row" key={c.id} onClick={() => onSelect(c)}>
            <div className={`av-circle ${c.avatarColor}`}>{c.avatar}</div>
            <div className="cr-body">
              <div className="cr-top">
                <span className="cr-name">{c.name}</span>
                <span className={`cr-time${c.unread ? ' has-unread' : ''}`}>{c.time}</span>
              </div>
              <div className="cr-btm">
                <span className="cr-preview">{c.preview}</span>
                {c.unread > 0 && <span className="cr-badge">{c.unread}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="ios-tabs">
        <button className="ios-tab active"><span className="tab-ico">💬</span><span>對話</span></button>
        <button className="ios-tab"><span className="tab-ico">🔄</span><span>更新</span></button>
        <button className="ios-tab"><span className="tab-ico">👥</span><span>社群</span></button>
        <button className="ios-tab"><span className="tab-ico">📞</span><span>通話</span></button>
      </div>
    </>
  )
}

function ReadReceipt() {
  return (
    <span className="msg-read">
      <svg viewBox="0 0 16 11">
        <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.146.47.47 0 0 0-.343.146l-.311.31a.445.445 0 0 0-.14.337c0 .136.047.25.14.343l2.996 2.996a.724.724 0 0 0 .48.209.667.667 0 0 0 .514-.241L11.071 1.2a.465.465 0 0 0 .1-.318.52.52 0 0 0-.1-.229z"/>
        <path d="M14.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.134-.717.696 1.903 1.903a.724.724 0 0 0 .48.209.667.667 0 0 0 .514-.241L14.071 1.2a.465.465 0 0 0 .1-.318.52.52 0 0 0-.1-.229z"/>
      </svg>
    </span>
  )
}

function ChatView({ chat, onBack }) {
  const endRef = useRef(null)

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'instant' })
    }
  }, [chat])

  let lastDay = null

  return (
    <>
      <StatusBar />
      <div className="cv-hdr">
        <button className="cv-back" onClick={onBack}>‹</button>
        <div className={`cv-av ${chat.avatarColor}`}>{chat.avatar}</div>
        <div className="cv-info">
          <div className="cv-nm">{chat.name}</div>
          <div className="cv-st">{chat.status || '最後上線於今天'}</div>
        </div>
        <div className="cv-acts">
          <span>📹</span>
          <span>📞</span>
        </div>
      </div>
      <div className="msg-area">
        {chat.messages.map((m, i) => {
          const showDay = m.day && m.day !== lastDay
          if (m.day) lastDay = m.day
          return (
            <div key={i}>
              {showDay && (
                <div className="day-pill"><span>{m.day}</span></div>
              )}
              <div className={`msg-row ${m.from === 'me' ? 'me' : 'them'}`}>
                <div className="msg-bubble">
                  {m.sender && <div className="msg-sender">{m.sender}</div>}
                  <span>{m.text}</span>
                  <span className="msg-ts">{m.time}</span>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={endRef} />
      </div>
      <div className="cv-input">
        <button className="cv-input-btn" style={{ color: '#8e8e93' }}>😊</button>
        <input placeholder="訊息" readOnly />
        <button className="cv-input-btn">🎤</button>
      </div>
    </>
  )
}

export default function WhatsAppShell({ userData }) {
  const [openChat, setOpenChat] = useState(null)

  return (
    <div className="wa-app">
      <div className={`chat-list-screen${openChat ? ' pushed' : ''}`}>
        <ChatList chats={userData.chats} onSelect={(c) => setOpenChat(c)} />
      </div>
      <div className={`chat-view${openChat ? ' open' : ''}`}>
        {openChat && (
          <ChatView chat={openChat} onBack={() => setOpenChat(null)} />
        )}
      </div>
    </div>
  )
}
