import { useContext, useState } from 'react'
import './ChannelList.scss'
import ChannelsContext from '../../contexts/ChannelsContext'
import UserContext from '../../contexts/UserContext'

export default function ChannelList() {
    const { channels, setChannels } = useContext(ChannelsContext);
    const { user } = useContext(UserContext);
    
    const [showAddForm, setShowAddForm] = useState(false);
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [searchedChannels, setSearchedChannels] = useState([]);

    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");

    function closeForm(type) {
        setChannelName("");
        if(type === "add") {
            setDescription("");
            setShowAddForm(false);
        } else {
            setSearchedChannels([]);
            setShowSearchForm(false);
        }
    }

    function openForm(type) {
        if(type === "add") setShowAddForm(true);
        else setShowSearchForm(true);
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
                closeForm("add");
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

    async function searchChannels() {
        const retreivedChannels = await getSearchChannels();
        const newChannels = retreivedChannels.filter(channel => !channels.find(existingChannel => existingChannel.id === channel.id));
        setSearchedChannels(newChannels);
    }

    async function getSearchChannels() {
        if(channelName.trim().length < 4) {
            console.log("Enter atlest 4 characters to search channels");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/channel/search?name=${channelName.trim()}&id=${user.id}`);

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
        } catch (error) {
            console.log("Error making api request to get searched channels: ", error);
        }
    }

    async function addMembership(index) {
        const body = {
            "channelId": searchedChannels[index].id,
            "userId": user.id,
            "role": "member"
        }

        try {
            const response = await fetch("http://localhost:8080/api/member/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if(response.status === 200) {
                console.log("Membership added successfully");
                const allChannels = await getUserChannels(user.id);
                setChannels(allChannels);
                closeForm("search");
            } else {
                console.log("Error adding user to the channel");
            }
        } catch (error) {
            console.log("Error making api request to get add membership: ", error);
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
                        onClick={() => openForm("add")} 
                        onKeyDown={(e) => {e.key === "Enter" && openForm("add")}}
                    ></i>
                </div>
                <div className="channelListButton">
                    <i
                        className="fa-solid fa-magnifying-glass"
                        onClick={() => openForm("search")} 
                        onKeyDown={(e) => {e.key === "Enter" && openForm("search")}}
                    ></i>
                </div>
            </div>

            <div id="popUpForm" className={showSearchForm ? "active" : ""}>
                <div id="popUpFormHeader">
                    <div className="big">Search Channels</div>
                </div>
                <div className="popUpInput">
                    <label htmlFor="channel-name">CHANNEL NAME</label>
                    <input type="text" name='channel-name' value={channelName} onChange={(e) => setChannelName(e.target.value)}/>
                </div>

                { 
                    searchedChannels.length > 0 && 
                    <div className="popUpList">
                        {searchedChannels.map((channel, index) => {
                            return (
                                <div className="popUpListItem" key={index}>
                                    <div className="popUpListItemImage">
                                        {channel.name[0]}
                                    </div>
                                    <div className="popUpListItemText">
                                        {channel.name}
                                    </div>
                                    <div className="popUpListItemButton" onClick={() => addMembership(index)}>
                                        Add
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }

                <div className="popUpInput buttons">
                    <div
                        className="button"
                        tabIndex={0}
                        onClick={() => closeForm("search")}
                        onKeyDown={(e) => {e.key === "Enter" && closeForm("search")}}
                    >
                        Back
                    </div>
                    <div
                        className="button background"
                        tabIndex={0}
                        onClick={searchChannels}
                        onKeyDown={(e) => {e.key === "Enter" && searchChannels()}}
                    >
                        Search
                    </div>
                </div>
            </div>

            <div id="popUpForm" className={showAddForm ? "active" : ""}>
                <div id="popUpFormHeader">
                    <div className="big">Customize your channel</div>
                    <div className="small">Give your channel a personality with a name and a description.</div>
                </div>
                <div className="popUpInput">
                    <label htmlFor="channel-name">CHANNEL NAME</label>
                    <input type="text" name='channel-name' value={channelName} onChange={(e) => setChannelName(e.target.value)}/>
                </div>
                <div className="popUpInput">
                    <label htmlFor="channel-desc">CHANNEL DESCRIPTION</label>
                    <input type="text" name='channel-desc' value={description} onChange={(e) => setDescription(e.target.value)}/>
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