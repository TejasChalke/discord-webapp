import { createContext } from "react";

const ChannelsContext = createContext({
    channels: [],
    setChannels: () => {}
});

export default ChannelsContext;