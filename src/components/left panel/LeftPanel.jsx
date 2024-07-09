import './LeftPanel.scss'

export default function LeftPanel() {
    const textChannels = ["General", "Updates"]
    const voiceChannels = ["Gaming", "Chill"]

    return(
        <div id="leftPanelContainer">
            <div id="leftPanelHeader">
                <span>Server Name</span>
                <i className="fa-solid fa-chevron-down"></i>
            </div>

            <div id="leftPanelListContainer">
                <div className="leftPanelList">
                    <div className="leftPanelListHeader">
                        <span>Text Channels</span>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="leftPanelListChannels">
                        {
                            textChannels.map((channel, index) => {
                                return(
                                    <div className="leftPanelListChannel" key={index}>
                                        <i className="fa-solid fa-hashtag"></i>
                                        <span>{channel}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="leftPanelList">
                    <div className="leftPanelListHeader">
                        <span>Voice Channels</span>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="leftPanelListChannels">
                        {
                            voiceChannels.map((channel, index) => {
                                return(
                                    <div className="leftPanelListChannel" key={index}>
                                        <i className="fa-solid fa-hashtag"></i>
                                        <span>{channel}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div id="leftPanelFooter">
                <div className="leftPanelFooterContainer">
                    <div className="leftPanelFooterText">
                        <div className='big'>
                            <i class="fa-solid fa-signal"></i>
                            <span>
                                Voice Connected
                            </span>
                        </div>
                        <div className='small'>Channel Name</div>
                    </div>

                    <div className="leftPanelFooterOptions">
                        <i className="fa-solid fa-phone-slash"></i>
                    </div>
                </div>

                <div className="leftPanelFooterContainer">
                    <div className="leftPanelFooterUserInfo">
                        <div id="leftPanelFooterUserInfoImage">

                        </div>

                        <div className="leftPanelFooterText">
                            <div className='big'>UserName</div>
                            <div className='small'>#1234</div>
                        </div>
                    </div>

                    <div className="leftPanelFooterOptions">
                        <i class="fa-solid fa-microphone"></i>
                        {/* <i class="fa-solid fa-microphone-slash"></i> */}
                        <i className="fa-solid fa-volume-high"></i>
                        {/* <i className="fa-solid fa-volume-xmark"></i> */}
                        <i className="fa-solid fa-gear"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}