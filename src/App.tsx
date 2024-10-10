import logo from "./images/shitty_logo.webp";
import "./App.css";
import { useState, useRef, CSSProperties, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

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
      <boxGeometry args={[1, 1, 1]}></boxGeometry>
      <meshStandardMaterial color={"hotpink"}></meshStandardMaterial>
    </mesh>
  );
}

function Model(props: { url: string }) {
  console.log(props.url);
  let loader;
  if (props.url.endsWith(".obj")) {
    loader = OBJLoader;
  } else if (props.url.endsWith(".glb")) {
    loader = GLTFLoader;
  } else {
    throw new Error("Unsupported 3D file type");
  }
  const model = useLoader(loader, props.url);
  return (
    <primitive
      object={loader == GLTFLoader ? model.scene : model}
      scale={[1, 1, 1]}
    ></primitive>
  );
}

function AssetViewer(props: { asset: Asset }) {
  return (
    <div className="canvasContainer">
      <h2>{props.asset.name}</h2> {/*replace with asset name */}
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight></spotLight>
        <Model
          url={"http://localhost:8080/assets/models/" + props.asset.file_url}
        />
      </Canvas>
    </div>
  );
}

interface Asset {
  id: number;
  name: string;
  description: string;
  file_url: string;
  thumbnail_url: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  tags: string[];
  is_public: boolean;
  downloads: number;
  views: number;
}

function Gallery({ onThumbnailClicked }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/assets/popular/10")
      .then((response) => response.json())
      .then((json) => setAssets(json));
  }, []);

  return (
    <div className="gridContainer">
      {assets.map((asset, idx) => {
        return (
          <div className="gridItem">
            <img
              onClick={() => onThumbnailClicked(asset)}
              className="thumbnail"
              src={
                "http://localhost:8080/assets/thumbnails/" + asset.thumbnail_url
              }
              alt={asset.name}
            />
            <div>
              <h4>{asset.name}</h4>
              <p>{asset.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({
    onClose: () => {},
    children: null,
  });

  function handleLoginClicked() {
    setIsModalOpen(true);
    setModalProps({
      onClose: () => setIsModalOpen(false),
      children: <LoginForm onClose={() => setIsModalOpen(false)} />,
      width: "500px",
      height: "300px",
    });
  }

  function handleSignUpClicked() {
    setIsModalOpen(true);
    setModalProps({
      onClose: () => setIsModalOpen(false),
      children: <SignUpForm onClose={() => setIsModalOpen(false)} />,
      width: "500px",
      height: "300px",
    });
  }

  function handleThumbnailClicked(assetClicked: Asset) {
    setIsModalOpen(true);
    setModalProps({
      onClose: () => setIsModalOpen(false),
      children: <AssetViewer asset={assetClicked} />,
      width: "800px",
      height: "600px",
    });
  }

  return (
    <div>
      <Header
        onLoginClicked={handleLoginClicked}
        onSignUpClicked={handleSignUpClicked}
      />
      <Gallery onThumbnailClicked={handleThumbnailClicked} />
      {isModalOpen && <Modal {...modalProps}></Modal>}
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
