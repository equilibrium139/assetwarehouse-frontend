import logo from "./images/shitty_logo.webp";
import "./App.css";
import { useState, useRef, CSSProperties } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HeaderProps {}

function Header({ onLoginClicked, onSignUpClicked }) {
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
        <button className="button" onClick={onLoginClicked}>
          Login
        </button>
        <button className="button" onClick={onSignUpClicked}>
          Sign up
        </button>
      </div>
    </header>
  );
}

interface ModalProps {
  onClose: () => void;
  width?: string;
  height?: string;
  children: React.ReactNode;
}

function Modal({
  onClose,
  width = "500px",
  height = "300px",
  children,
}: ModalProps) {
  const modalStyle: CSSProperties = {
    width: width || "500px",
    height: height || "300px",
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modalContent"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

function LoginForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logged in with:", email, password);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
      </label>

      <button className="submitButton" type="submit">
        Sign In
      </button>
    </form>
  );
}

function SignUpForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signed up with: ", email, password);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
      </label>

      <button className="submitButton" type="submit">
        Sign In
      </button>
    </form>
  );
}

function Box(props) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  return (
    <mesh {...props} ref={meshRef} scale={1}>
      <boxGeometry args={[2, 2, 2]}></boxGeometry>
      <meshStandardMaterial color={"hotpink"}></meshStandardMaterial>
    </mesh>
  );
}

function AssetViewer() {
  return (
    <div className="canvasContainer">
      <h2>Model Viewer</h2> {/*replace with asset name */}
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight></spotLight>
        <Box position={[-1.2, 0.0, 0]}></Box>
        <Box position={[1.2, 0.0, 0]}></Box>
      </Canvas>
    </div>
  );
}

function Gallery({ onThumbnailClicked }) {
  return (
    <div className="gridContainer">
      {sampleItems.map((item, idx) => {
        return (
          <div className="gridItem">
            <img
              onClick={onThumbnailClicked}
              className="thumbnail"
              src={item.thumbnail}
              alt={item.title}
            />
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactElement>();
  const [modalWidth, setModalWidth] = useState<string>("500px");
  const [modalHeight, setModalHeight] = useState<string>("300px");

  function handleLoginClicked() {
    setIsModalOpen(true);
    setModalContent(<LoginForm onClose={() => setIsModalOpen(false)} />);
    setModalWidth("500px");
    setModalHeight("300px");
  }

  function handleSignUpClicked() {
    setIsModalOpen(true);
    setModalContent(<SignUpForm onClose={() => setIsModalOpen(false)} />);
    setModalWidth("500px");
    setModalHeight("300px");
  }

  function handleThumbnailClicked() {
    setIsModalOpen(true);
    setModalContent(<AssetViewer />);
    setModalWidth("800px");
    setModalHeight("600px");
  }

  return (
    <div>
      <Header
        onLoginClicked={handleLoginClicked}
        onSignUpClicked={handleSignUpClicked}
      />
      <Gallery onThumbnailClicked={handleThumbnailClicked} />
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          width={modalWidth}
          height={modalHeight}
        >
          {modalContent}
        </Modal>
      )}
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
