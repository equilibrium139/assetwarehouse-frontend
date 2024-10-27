import { User } from "./types";
import logo from "./images/shitty_logo.webp";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import UploadForm from "./UploadForm";

interface HeaderProps {
  user: User | undefined;
  setUser: (user: User) => void;
  openModal: (children: React.ReactNode, width?: string, height?: string) => void;
  closeModal: () => void;
}

function Header({ user, setUser, openModal, closeModal }: HeaderProps) {
  function handleUploadClicked() {
    console.assert(user, "User must be logged in for upload form to appear");
    openModal(<UploadForm onClose={closeModal} />, "800px", "600px");
  }

  function handleLoginClicked() {
    openModal(<LoginForm onClose={closeModal} setUser={setUser} />, "600px", "400px");
  }

  function handleSignUpClicked() {
    openModal(<SignUpForm onClose={closeModal} setUser={setUser} />, "600px", "400px");
  }

  return (
    <header>
      <div className="logoContainer">
        <img className="logo" src={logo} alt="Logo"></img>
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
        {user ? (
          <div className="loggedInSection">
            <button className="button" onClick={handleUploadClicked}>
              Upload
            </button>
            <div className="profilePictureContainer">
              <Link to="/profile">
                <div className="profilePicture">{user.username.charAt(0).toUpperCase()}</div>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <button className="button" onClick={handleLoginClicked}>
              Login
            </button>
            <button className="button" onClick={handleSignUpClicked}>
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
