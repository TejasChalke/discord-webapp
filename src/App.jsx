import './App.scss';
import { useState } from 'react';

import UserContext from './contexts/UserContext';
import ChannelsContext from './contexts/ChannelsContext';
import { SelectedChannelContext, SelectedChannelDefault } from './contexts/SelectedChannelContext.js';

import ChannelList from './components/server list/ChannelList';
import LeftPanel from './components/left panel/LeftPanel';
import MainPanel from './components/main panel/MainPanel';
import Login from './components/login/Login';

function App() {
  const [user, setUser] = useState({});
  const [channels, setChannels] = useState({});
  const [selectedChannel, setSelectedChannel] = useState(SelectedChannelDefault.selectedChannel);

  return (
    <div className="App">
      <SelectedChannelContext.Provider value={{selectedChannel, setSelectedChannel}}>
      <UserContext.Provider value={{user, setUser}}>
      <ChannelsContext.Provider value={{channels, setChannels}}>
        { user.id && 
          <>
            <ChannelList />
            <LeftPanel />
            <MainPanel />
          </>
        }
        {
          !user.id &&
          <Login />
        }
      </ChannelsContext.Provider>
      </UserContext.Provider>
      </SelectedChannelContext.Provider>
    </div>
  );
}

export default App;
