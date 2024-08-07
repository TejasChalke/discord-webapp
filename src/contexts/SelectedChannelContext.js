import { createContext } from "react";

const SelectedChannelContext = createContext({
    selectedChannel: {
        id: -1,
        rooms: [],
        members: []
    },
    setSelectedChannel: () => {}
});

export default SelectedChannelContext;