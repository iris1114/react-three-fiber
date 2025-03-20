import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Torus from "./components/Torus";
import Viewcube from "./components/Viewcube";

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5 * Math.PI} />
      <Torus scale={1.75} />
      <Viewcube />
      <OrbitControls />
      <Environment preset="city" />
    </Canvas>
  );
};

export default App;
