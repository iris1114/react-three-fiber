import { ThreeElements } from "@react-three/fiber";
import { useState } from "react";

const Torus = (props: ThreeElements["mesh"]) => {
  const [hovered, setHovered] = useState(false);
  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...props}
    >
      <torusGeometry args={[1, 0.25, 32, 100]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export default Torus;

/*
notes:
1. torusGeometry
args = {(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)}
https://threejs.org/docs/#api/en/geometries/TorusGeometry

2. meshStandardMaterial
Properties : color,roughness,metalness,emissive自發光顏色,opacity,map...
https://threejs.org/docs/?q=meshStandardMaterial#api/en/materials/MeshStandardMaterial
*/
