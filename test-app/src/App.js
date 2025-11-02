import logo from './logo.svg';
import './App.css';
import Greeting from './Greeting';
import UserCard from './UseCard';
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Greeting />
      <UserCard
      name="Иван Иванов"
      role="Администратор"
      avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVMhpKmVy_-iwfRLAiNiaDslMa-2oEz7KTw&s"
      isOnline={true}
      />
      <TaskList />
    </div>
  );
}

export default App;
