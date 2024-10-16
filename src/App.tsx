import logo from "./images/shitty_logo.webp";
import "./App.css";
import { useState, useRef, CSSProperties, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

interface User {
  id: number;
  username: string;
  email: string;
}

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
          <button className="button" onClick={onUploadClicked}>
            Upload
          </button>
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

function SignUpForm({ onClose, setUser }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (!response.ok) {
      console.log("Error creating account: ", response.status);
    } else {
      const json: User = await response.json();
      setUser(json);
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label>
        Username:
        <input type="text" name="username" required></input>
      </label>

      <label>
        Email:
        <input type="email" name="email" required></input>
      </label>

      <label>
        Password:
        <input type="password" name="password" required></input>
      </label>

      <button className="submitButton" type="submit">
        Sign Up
      </button>
    </form>
  );
}

function UploadForm({ onClose }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = "http://localhost:8080/api/assets/upload";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload model");
        }
        return response.json();
      })
      .then((json) => console.log(json));
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Asset</h2>

      <label>
        Name:
        <input type="text" name="name" required></input>
      </label>

      <label>
        Description:
        <input type="text" name="description" required></input>
      </label>

      <label>
        Thumbnail:
        <input type="file" name="thumbnail" accept="image/*" required></input>
      </label>

      <label>
        Asset:
        <input type="file" name="asset" accept=".glb, .obj" required></input>
      </label>

      <button className="submitButton" type="submit">
        Upload
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
      name={"Model"}
      object={loader === GLTFLoader ? model.scene : model}
      scale={[1, 1, 1]}
    ></primitive>
  );
}

function AssetViewer(props: { asset: Asset }) {
  return (
    <div className="canvasContainer">
      <h2>{props.asset.name}</h2>
      <Canvas
        onCreated={(state) => {
          let modelWorldVec = new THREE.Vector3();
          state.scene.getObjectByName("Model")?.getWorldPosition(modelWorldVec);
          state.camera.lookAt(modelWorldVec);
        }}
      >
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
          <div className="gridItem" key={asset.id}>
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
  const [user, setUser] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({
    onClose: () => {},
    children: null,
  });

  useEffect(() => {
    if (!user) {
      fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setUser(json);
        });
    }
  }, []);

  function handleUploadClicked() {
    setIsModalOpen(true);
    setModalProps({
      onClose: () => setIsModalOpen(false),
      children: <UploadForm onClose={() => setIsModalOpen(false)} />,
      width: "800px",
      height: "600px",
    });
  }

  function handleLoginClicked() {
    setIsModalOpen(true);
    setModalProps({
      onClose: () => setIsModalOpen(false),
      children: <LoginForm onClose={() => setIsModalOpen(false)} />,
      width: "600px",
      height: "400px",
    });
  }

  function handleSignUpClicked() {
    setIsModalOpen(true);
    setModalProps({
      onClose: () => setIsModalOpen(false),
      children: (
        <SignUpForm onClose={() => setIsModalOpen(false)} setUser={setUser} />
      ),
      width: "600px",
      height: "400px",
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
        user={user}
        onUploadClicked={handleUploadClicked}
        onLoginClicked={handleLoginClicked}
        onSignupClicked={handleSignUpClicked}
      />
      <Gallery onThumbnailClicked={handleThumbnailClicked} />
      {isModalOpen && <Modal {...modalProps}></Modal>}
    </div>
  );
}

export default App;
