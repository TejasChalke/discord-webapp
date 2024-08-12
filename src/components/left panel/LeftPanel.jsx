import { useContext, useState } from 'react'
import './LeftPanel.scss'
import UserContext from '../../contexts/UserContext'
import { SelectedChannelContext } from '../../contexts/SelectedChannelContext';

export default function LeftPanel() {
    const { user } = useContext(UserContext);
    const { selectedChannel, setSelectedChannel } = useContext(SelectedChannelContext);

    const [showForm, setShowForm] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [newRoomType, setNewRoomType] = useState("text");

    const textChannels = selectedChannel.rooms.filter((channel) => channel.type === "text");
    const voiceChannels = selectedChannel.rooms.filter((channel) => channel.type === "voice");

    var tag = "" + user.tag;
    while(tag.length < 4) tag = "0" + tag;

    function closeForm(type) {
        if(type === "add") {
            setRoomName("");
            setShowForm(false);
        }
    }

    function displayForm(type) {
        setNewRoomType(type);
        setShowForm(true);
    }

    async function addNewRoom() {
        if(roomName.trim().length < 4) {
            console.log("Enter a valid room name");
            return;
        }

        const body = {
            "channelId": selectedChannel.id,
            "name": roomName.trim(),
            "type": newRoomType
        }

        try {
            const response = await fetch("http://localhost:8080/api/room/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if(response.status === 201) {
                console.log("Room created successfully");
                closeForm("add");

                const channelDataResponse = await fetch(`http://localhost:8080/api/channel/${selectedChannel.id}`);
                if(channelDataResponse.status === 500) {
                    console.log("Error getting channel data from server");
                    return;
                }

                const channelData = await channelDataResponse.json();
                setSelectedChannel({...channelData, id: selectedChannel.id, name: selectedChannel.name});
            } else {
                console.log("Error creating room");
            }
        } catch (error) {
            console.log("Error making api request to add new room: ", error);
        }
    }

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
                        <i className="fa-solid fa-plus" onClick={() => displayForm("text")}></i>
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
                        <i className="fa-solid fa-plus" onClick={() => displayForm("voice")}></i>
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

            <div id="popUpForm" className={showForm ? "active" : ""}>
                <div id="popUpFormHeader">
                    <div className="big">Create a new room</div>
                </div>
                <div className="popUpInput">
                    <label htmlFor="channel-name">ROOM NAME</label>
                    <input type="text" name='channel-name' value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
                </div>
                <div className="popUpInput buttons">
                    <div
                        className="button"
                        tabIndex={0}
                        onClick={() => closeForm("add")}
                        onKeyDown={(e) => {e.key === "Enter" && closeForm("add")}}
                    >
                        Back
                    </div>
                    <div
                        className="button background"
                        tabIndex={0}
                        onClick={addNewRoom}
                        onKeyDown={(e) => {e.key === "Enter" && addNewRoom()}}
                    >
                        Create
                    </div>
                </div>
            </div>
        </div>
    )
}