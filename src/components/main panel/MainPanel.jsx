import { useState } from 'react'
import './MainPanel.scss'
import RightPanel from '../right panel/RightPanel';
import MessagePanel from '../message panel/MessagePanel';

export default function MainPanel() {
    const [searchValue, setSearchValue] = useState("");

    return(
        <div id="mainPanelContainer">
            <div id="mainPanelHeader">
                <div id="mainPanelHeaderInfo">
                    <div className='big'># channel name</div>
                    <div> | channel info, tags etc.</div>
                </div>
                <div id="mainPanelHeaderOptions">
                    <div id="mainPanelHeaderSearch">
                        <input
                            type="text"
                            name="search users"
                            value={searchValue} 
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder='Search'
                        />
                    </div>
                </div>
            </div>
            
            <div id="mainPanelBody">
                <MessagePanel />
                <RightPanel />
            </div>
        </div>
    )
}