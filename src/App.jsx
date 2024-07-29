import './App.scss';
import ServerList from './components/server list/ServerList';
import LeftPanel from './components/left panel/LeftPanel';
import MainPanel from './components/main panel/MainPanel';
import { createContext, useState } from 'react';
import Login from './components/login/Login';

const UserContext = createContext();

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
