import { useContext, useState } from 'react'
import './ChannelList.scss'
import ChannelsContext from '../../contexts/ChannelsContext'
import UserContext from '../../contexts/UserContext'

export default function ChannelList() {
    const { channels, setChannels } = useContext(ChannelsContext);
    const { user } = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");

    function closeForm() {
        setChannelName("");
        setDescription("");
        setShowForm(false);
    }

    function openForm() {
        setShowForm(true);
    }

    async function addNewChannel() {
        if(channelName.trim().length < 4) {
            console.log("Enter a valid channel name");
            return;
        }

        const body = {
            "creator_id": user.id,
            "name": channelName,
            "description": description
        }

        try {
            const response = await fetch("http://localhost:8080/api/channel/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if(response.status === 201) {
                console.log("New channel created successfully");
                const allChannels = await getUserChannels(user.id);
                setChannels(allChannels);
                closeForm();
            } else {
                console.log("Could not create a new channel");
            }
        } catch (error) {
            console.log("Error making api request to add a new channel: ", error);
        }
    }

    async function getUserChannels(id) {
        try {
            const response = await fetch(`http://localhost:8080/api/channel/user/${id}`);

            if(response.status === 200) {
                const result = await response.json();
                const channels = result.values.map(channel => {
                    const obj = {};
                    result.keys.forEach((key, index) => {
                        obj[key] = channel[index];
                    });
                    return obj;
                });

                return channels;
            } else {
                console.log("Error getting user channels");
                return [];
            }
        } catch(error) {
            console.log("Error making api request to get channels: ", error);
        }
    }

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
                    <i
                        className="fa-solid fa-plus"
                        onClick={() => openForm()} 
                        onKeyDown={(e) => {e.key === "Enter" && openForm()}}
                    ></i>
                </div>
                <div className="channelListButton">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>

            <div id="addChannelForm" className={showForm ? "active" : ""}>
                <div id="channelFormHeader">
                    <div className="big">Customize your channel</div>
                    <div className="small">Give your channel a personality with a name and a description.</div>
                </div>
                <div className="addChannelInput">
                    <label htmlFor="channel-name">CHANNEL NAME</label>
                    <input type="text" name='channel-name' value={channelName} onChange={(e) => setChannelName(e.target.value)}/>
                </div>
                <div className="addChannelInput">
                    <label htmlFor="channel-desc">CHANNEL DESCRIPTION</label>
                    <input type="text" name='channel-desc' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="addChannelInput buttons">
                    <div
                        className="button"
                        tabIndex={0}
                        onClick={closeForm}
                        onKeyDown={(e) => {e.key === "Enter" && closeForm()}}
                    >
                        Back
                    </div>
                    <div
                        className="button background"
                        tabIndex={0}
                        onClick={addNewChannel}
                        onKeyDown={(e) => {e.key === "Enter" && addNewChannel()}}
                    >
                        Create
                    </div>
                </div>
            </div>
        </div>
    )
}