import { useContext } from 'react'
import './LeftPanel.scss'
import UserContext from '../../contexts/UserContext'
import { SelectedChannelContext } from '../../contexts/SelectedChannelContext';

export default function LeftPanel() {
    const { user } = useContext(UserContext);
    const { selectedChannel } = useContext(SelectedChannelContext);

    const textChannels = selectedChannel.rooms.filter((channel) => channel.type === "text");
    const voiceChannels = selectedChannel.rooms.filter((channel) => channel.type === "voice");

    var tag = "" + user.tag;
    while(tag.length < 4) tag = "0" + tag;

    return(
        <div id="leftPanelContainer">
            <div id="leftPanelHeader">
                <span>{selectedChannel.name}</span>
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
                                        <span>{channel.name}</span>
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
                                        <span>{channel.name}</span>
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
                            <i className="fa-solid fa-signal"></i>
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
                            {user.uname[0]}
                        </div>

                        <div className="leftPanelFooterText">
                            <div className='big'>{user.uname}</div>
                            <div className='small'>#{tag}</div>
                        </div>
                    </div>

                    <div className="leftPanelFooterOptions">
                        <i className="fa-solid fa-microphone"></i>
                        {/* <i className="fa-solid fa-microphone-slash"></i> */}
                        <i className="fa-solid fa-volume-high"></i>
                        {/* <i className="fa-solid fa-volume-xmark"></i> */}
                        <i className="fa-solid fa-gear"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}