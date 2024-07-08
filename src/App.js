import './App.scss';
import LeftPanel from './components/left panel/LeftPanel';
import ServerList from './components/server list/ServerList';

function App() {
  return (
    <div className="App">
      <ServerList />
      <LeftPanel />
    </div>
  );
}

export default App;
