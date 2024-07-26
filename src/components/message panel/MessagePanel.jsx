import { useState } from 'react'
import './MessagePanel.scss'

export default function MessagePanel() {
    const [displayMessages, setDisplayMessages] = useState(["hello", "hii"]);
    const [message, setMessage] = useState("");
    

    const sendMessage = () => {
        if(message.trim() === "") return;
        
        setDisplayMessages([...displayMessages, message]);
        setMessage("");
        // Send message to backend
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <div id="messagePanelContainer">
            <div id="messagePanelDisplay">
                {
                    displayMessages.map((displayMessage, index) => {
                        return(
                            <div className="displayMessage" key={index}>
                                <div className="displayMessageHeader">
                                    <div className="displayName">UserName</div>
                                    <div className='dateTime'>09-07-2024 16:54</div>
                                </div>
                                {displayMessage}
                            </div>
                        )
                    })
                }
            </div>
            <div id="messagePanelInput">
                <i className="fa-solid fa-square-plus"></i>
                <input 
                    type="text"
                    name="enter message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Message channel'    
                />
                <i id="sendButton" className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
            </div>
        </div>
    )
}