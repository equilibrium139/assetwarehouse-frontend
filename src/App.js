import { useState } from 'react';
import logo from "./images/shitty_logo.webp";
import './App.css'

function Header() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <header>
      <div>
        <img className="logo" src={logo} alt="Logo"></img>
      </div>

      <div>
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
      </div>

      <div>
        <button>Sign In</button>
        <button>Register</button>
      </div>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header></Header>
    </div>
  );
}

export default App;
