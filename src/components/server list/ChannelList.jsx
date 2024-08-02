import { useContext } from 'react'
import './ChannelList.scss'
import ChannelsContext from '../../contexts/ChannelsContext'

export default function ChannelList() {
    const { channels } = useContext(ChannelsContext);

    return(
        <div id="channelListContainer">
            <div id="channelList">
                {
                    channels.map((channel, index) => {
                        return(
                            <div className="channelListItem" key={index}>
                                {channel.name[0]}
                            </div>
                        )
                    })
                }
            </div>
            <div id="channelListButtons">
                <div className="channelListButton">
                    <i className="fa-solid fa-plus"></i>
                </div>
                <div className="channelListButton">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
        </div>
    )
}