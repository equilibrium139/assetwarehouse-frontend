import logo from "./images/shitty_logo.webp";
import './App.css'
import { useState } from "react";

function Header({ onLoginClicked, onSignUpClicked }) {
  return (
    <header>
      <div className="logoContainer">
        <a href="#">
          <img className="logo" src={logo} alt="Logo"></img>
        </a>
      </div>

      <div className="dropdownContainer">
        <select className="dropdown">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
      </div>

      <div className="searchbarContainer">
        <input className="searchbar" type="text" placeholder="Search assets..." />
      </div>

      <div className="authButtons">
        <button className="button" onClick={onLoginClicked}>Login</button>
        <button className="button" onClick={onSignUpClicked}>Sign up</button>
      </div>
    </header>
  );
}

function Modal({ onClose, children }) {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  )
}

function LoginForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logged in with:", email, password);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>

      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
      </label>

      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
      </label>

      <button className="submitButton" type="submit">Sign In</button>

    </form>
  )
}

function SignUpForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signed up with: ", email, password);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
      </label>

      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
      </label>

      <button className="submitButton" type="submit">Sign In</button>

    </form>
  )
}

function ThumbnailGrid() {
  return (
    <div className="gridContainer">
      {sampleItems.map((item, idx) => {
        return (
          <div className="gridItem">
            <img className="thumbnail" src={item.thumbnail} alt={item.title} />

            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>)
      })}
    </div>
  )
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleLoginClicked = () => {
    setModalContent(<LoginForm onClose={() => setIsModalOpen(false)} />);
    setIsModalOpen(true);
  };

  const handleSignUpClicked = () => {
    setModalContent(<SignUpForm onClose={() => setIsModalOpen(false)} />);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header onLoginClicked={handleLoginClicked} onSignUpClicked={handleSignUpClicked} />
      <ThumbnailGrid />
      {isModalOpen &&
        <Modal onClose={() => setIsModalOpen(false)}>
          {modalContent}
        </Modal>
      }
    </div>
  );
}


const sampleItems = [
  {
    thumbnail: "thumbnail1.jpg",
    title: "Asset 1",
    description: "Description of Asset 1",
  },
  {
    thumbnail: "thumbnail2.jpg",
    title: "Asset 2",
    description: "Description of Asset 2",
  },
  {
    thumbnail: "thumbnail3.jfif",
    title: "Asset 3",
    description: "Description of Asset 3",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
  {
    thumbnail: "thumbnail4.jfif",
    title: "Asset 4",
    description: "Description of Asset 4",
  },
];

export default App;
