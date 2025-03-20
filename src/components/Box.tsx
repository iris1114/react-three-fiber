// src/components/Box.tsx
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { HoverContext } from "../contexts/HoverContext";
import * as THREE from "three";
import { ThreeElements } from "@react-three/fiber";

const Box = forwardRef<
  THREE.Mesh,
  ThreeElements["mesh"] & { children?: React.ReactNode }
>(({ children, ...props }, fref) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [click, setClick] = useState(false);

  console.log("hovered", hovered);

  useImperativeHandle(fref, () => ref.current!);

  return (
    <mesh
      {...props}
      ref={ref}
      scale={click ? 1.5 : 1}
      onClick={() => setClick(!click)}
      onPointerMove={(e) => {
        e.stopPropagation();
        const newHovered = e.face?.materialIndex ?? null;
        if (newHovered !== hovered) {
          setHovered(newHovered);
        }
      }}
      onPointerOut={() => setHovered(null)}
    >
      <boxGeometry />
      <HoverContext.Provider value={hovered}>{children}</HoverContext.Provider>
    </mesh>
  );
});

export default Box;

/*
notes:
1. useImperativeHandle 把內層ref傳遞至父層
2. e.face?.materialIndex 指 3d object 停的面
*/
