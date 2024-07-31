import './App.scss';
import { useState } from 'react';
import UserContext from './contexts/UserContext';
import ServerList from './components/server list/ServerList';
import LeftPanel from './components/left panel/LeftPanel';
import MainPanel from './components/main panel/MainPanel';
import Login from './components/login/Login';

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        { user.id && 
          <>
            <ServerList />
            <LeftPanel />
            <MainPanel />
          </>
        }
        {
          !user.id &&
          <Login />
        }
      </UserContext.Provider>
    </div>
  );
}

export default App;
