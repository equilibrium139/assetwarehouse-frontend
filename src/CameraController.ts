import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";

interface SphericalCoords {
  radius: number;
  theta: number;
  phi: number;
}

function CameraController() {
  const { camera, gl } = useThree();
  const [sphericalCoords, setSphericalCoords] = useState<SphericalCoords>({
    radius: 5,
    theta: 0,
    phi: Math.PI / 2,
  });
  const isDragging = useRef(false);
  const prevMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    const handleKeyDown = (event) => {
      setSphericalCoords((prev) => {
        let { radius, theta, phi } = prev;

        const deltaRadius = 0.5;
        const deltaAngle = 0.05;

        switch (event.key.toLowerCase()) {
          case "w":
            radius = Math.max(1, radius - deltaRadius);
            break;
          case "s":
            radius += deltaRadius;
            break;
          case "a":
            theta -= deltaAngle;
            break;
          case "d":
            theta += deltaAngle;
            break;
        }

        return { radius, theta, phi };
      });
    };

    const handleMouseDown = (event) => {
      let lmbDown = event.button === 0;
      if (lmbDown) {
        isDragging.current = true;
        prevMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (event) => {
      if (isDragging.current) {
        const movementX = event.clientX - prevMousePosition.current.x;
        const movementY = event.clientY - prevMousePosition.current.y;

        setSphericalCoords((prev) => {
          let { theta, phi } = prev;
          const deltaTheta = (movementX / canvas.width) * Math.PI;
          const deltaPhi = (movementY / canvas.height) * Math.PI;
          theta -= deltaTheta;
          phi -= deltaPhi;
          const epsilon = 0.0001;
          phi = Math.max(epsilon, Math.min(Math.PI - epsilon, phi));
          return { ...prev, theta, phi };
        });

        prevMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleWheel = (event) => {
      event.preventDefault();
      setSphericalCoords((prev) => {
        let { radius } = prev;
        const scrollSensitivity = 0.01;
        const deltaRadius = event.deltaY * scrollSensitivity;
        radius = Math.max(1, radius + deltaRadius);
        return { ...prev, radius };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [gl.domElement]);

  useFrame(() => {
    const { radius, theta, phi } = sphericalCoords;
    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default CameraController;
