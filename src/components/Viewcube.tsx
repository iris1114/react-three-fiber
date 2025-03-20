import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Hud, PerspectiveCamera } from "@react-three/drei";
import Box from "./Box";
import FaceMaterial from "./FaceMaterial";

const Viewcube = ({ renderPriority = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const { camera, viewport } = useThree();
  const matrix = new THREE.Matrix4();

  useFrame(() => {
    matrix.copy(camera.matrix).invert(); //複製camera的旋轉矩陣
    mesh.current?.quaternion.setFromRotationMatrix(matrix); //讓 Viewcube 依據矩陣來旋轉，使其方向與camera同步
  });

  return (
    <Hud renderPriority={renderPriority}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Box
        ref={mesh}
        position={[viewport.width / 2 - 4, viewport.height / 2 - 1, 0]}
      >
        <FaceMaterial index={0}>front</FaceMaterial>
        <FaceMaterial index={1}>back</FaceMaterial>
        <FaceMaterial index={2}>top</FaceMaterial>
        <FaceMaterial index={3}>bottom</FaceMaterial>
        <FaceMaterial index={4}>left</FaceMaterial>
        <FaceMaterial index={5}>right</FaceMaterial>
      </Box>
    </Hud>
  );
};

export default Viewcube;

/*
notes:
1. useFrame ： 讓 Viewcube 跟隨 camera 旋轉
2. 使用 Hud 可以使 Viewcube render 固定在畫面最上層， HUD = Heads-Up Display 
3. renderPriority：數值較高的 Hud 會優先render
4. ambientLight 環境光
5. spotLight pointLight 額外光源， Penumbra 半影範圍 ， decay 光線衰減數
6. makeDefault： PerspectiveCamera 成為 Hud 內的主攝影機， 不影響 scene camera
*/
