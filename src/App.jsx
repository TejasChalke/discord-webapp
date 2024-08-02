import './App.scss';
import { useState } from 'react';

import UserContext from './contexts/UserContext';
import ChannelsContext from './contexts/ChannelsContext';

import ChannelList from './components/server list/ChannelList';
import LeftPanel from './components/left panel/LeftPanel';
import MainPanel from './components/main panel/MainPanel';
import Login from './components/login/Login';

function App() {
  const [user, setUser] = useState({});
  const [channels, setChannels] = useState({});

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
