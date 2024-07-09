import { useState } from 'react'
import './MessagePanel.scss'

export default function MessagePanel() {
    const displayMessages = ["hello", "hii"]
    const [message, setMessage] = useState("");

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
                    placeholder='Message channel'    
                />
            </div>
        </div>
    )
}