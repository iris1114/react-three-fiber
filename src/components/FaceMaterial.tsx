import { useThree } from "@react-three/fiber";
import { RenderTexture, Text, OrthographicCamera } from "@react-three/drei";
import { suspend } from "suspend-react";
import { useHoverContext } from "../contexts/HoverContext";

const medium = import("@pmndrs/assets/fonts/inter_medium.woff");

const FaceMaterial = ({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) => {
  const hovered = useHoverContext();
  const { gl } = useThree();

  return (
    <meshStandardMaterial
      attach={`material-${index}`}
      color={hovered === index ? "hotpink" : "orange"}
    >
      <RenderTexture
        attach="map"
        anisotropy={gl.capabilities.getMaxAnisotropy() || 1}
      >
        <color attach="background" args={["white"]} />
        <OrthographicCamera
          makeDefault
          left={-1}
          right={1}
          top={1}
          bottom={-1}
          position={[0, 0, 10]}
          zoom={0.5}
        />
        <Text
          fontSize={0.8}
          font={(suspend(medium) as { default: string }).default}
          color="black"
        >
          {children}
        </Text>
      </RenderTexture>
    </meshStandardMaterial>
  );
};

export default FaceMaterial;

/*
notes:
1. RenderTexture : 渲染內容的貼圖，應用到 meshStandardMaterial 上。
2. FaceMaterial 組件使用了 useHoverContext 來改變材質顏色，根據當前停留的index。
3. 使用 OrthographicCamera 來渲染文字，並且使用 suspend 來加載字體。
*/
