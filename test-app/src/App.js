import logo from './logo.svg';
import './App.css';
import WindowSizeTracker from './WindowSizeTracker';
import UserProfile from './UserProfile';
import ContactForm from './ContactForm';

function App() {
  return (
    <div className="App">
      <WindowSizeTracker/>
      <UserProfile/>
      <ContactForm/>
    </div>
  );
}

export default App;