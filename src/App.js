import './App.scss';
import ServerList from './components/server list/ServerList';
import LeftPanel from './components/left panel/LeftPanel';
import MainPanel from './components/main panel/MainPanel';

function App() {
  return (
    <div className="App">
      <ServerList />
      <LeftPanel />
      <MainPanel />
    </div>
  );
}

export default App;
