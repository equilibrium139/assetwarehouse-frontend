import { Canvas, useLoader } from "@react-three/fiber";
import { Asset } from "./types";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import CameraController from "./CameraController";

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
  return <primitive name={"Model"} object={loader === GLTFLoader ? model.scene : model} scale={[1, 1, 1]}></primitive>;
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
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Model url={process.env.API_URL + "assets/models/" + props.asset.file_url} />
        <CameraController />
      </Canvas>
    </div>
  );
}

export default AssetViewer;
