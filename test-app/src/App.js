import logo from './logo.svg';
import './App.css';
import UserSettings from './UserSettings';
import SimpleModalExample from './SimpleModalExample.jsx';
import ProgressDashboard from './ProgressDashboard.jsx';

function App() {
  return (
    <div className="App">
      <UserSettings/>
      <SimpleModalExample/>
      <ProgressDashboard/>
    </div>
  );
}

export default App;