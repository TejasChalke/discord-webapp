import { createContext } from "react";

const SelectedChannelDefault = {
    selectedChannel: {
        id: -1,
        name: "",
        rooms: [],
        users: []
    },
    setSelectedChannel: () => {}
};

const SelectedChannelContext = createContext(SelectedChannelDefault);

export { SelectedChannelContext, SelectedChannelDefault }