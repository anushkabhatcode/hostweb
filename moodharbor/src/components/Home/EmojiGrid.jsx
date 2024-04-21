import React from 'react';
import { Twemoji } from 'react-emoji-render';
import {useState} from 'react';

const emojis = [
 { symbol: "😄", name: "Happy" },
 { symbol: "🤩", name: "Excited" },
 { symbol: "😔", name: "Sad" },
 { symbol: "😑", name: "Alone" },
 { symbol: "😞", name: "Underconfident"},
 { symbol: "😰", name: "Stressed" },
 { symbol: "😡", name: "Angry" },
];

function EmojiGrid({ onSelectEmoji }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    onSelectEmoji(emoji); // Pass selected emoji to parent component
  };
  return (
    <div className="log-mood-section">
      {emojis.map((emoji, index) => (
        <div key={index} className={`emoji-container ${selectedEmoji === emoji ? 'selected' : ''}`} onClick={() => handleEmojiClick(emoji)}>
          <Twemoji className="large-emoji" text={emoji.symbol} />
          <div className="emoji-name">{emoji.name}</div>
        </div>
      ))}
    </div>
  );
}


export default EmojiGrid;
