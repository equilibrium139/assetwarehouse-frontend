import { User } from "./types";
import logo from "./images/shitty_logo.webp";
import { Link } from "react-router-dom";

interface HeaderProps {
  user: User | undefined;
  onUploadClicked: () => void;
  onLoginClicked: () => void;
  onSignupClicked: () => void;
}

function Header({
  user,
  onUploadClicked,
  onLoginClicked,
  onSignupClicked,
}: HeaderProps) {
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
        <input
          className="searchbar"
          type="text"
          placeholder="Search assets..."
        />
      </div>

      <div className="authButtons">
        {user ? (
          <div className="loggedInSection">
            <button className="button" onClick={onUploadClicked}>
              Upload
            </button>
            <div className="profilePictureContainer">
              <Link to="/profile">
                <div className="profilePicture">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <button className="button" onClick={onLoginClicked}>
              Login
            </button>
            <button className="button" onClick={onSignupClicked}>
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
