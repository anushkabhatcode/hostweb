import React from 'react';
import { Twemoji } from 'react-emoji-render';
import {useState} from 'react';

const emojis = [
 { symbol: "😄", name: "Happy" },
 { symbol: "🙆‍♂️", name: "Inspired" },
 { symbol: "😴", name: "Relaxed" },
 { symbol: "😁", name: "Confident" },
 { symbol: "🙂", name: "Grateful" },
 { symbol: "👯", name: "Connection" },

];

function DesireEmojiGrid({ onSelectEmoji }) {

  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    onSelectEmoji(emoji);
  }
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

export default DesireEmojiGrid;
