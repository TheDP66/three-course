import React, { Suspense, useEffect, useRef } from "react";
import "../App.scss";

//Components
import Header from "../components/NCS/header";
import { Canvas, useFrame } from "@react-three/fiber";
// import { RoundedBox } from "@react-three/drei";
import { Html, useGLTF, useGLTFLoader, OrbitControls } from "@react-three/drei";
import { Section } from "../components/NCS/section";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { Scene } from "three";

// page states
import state from "../components/NCS/state";

// intersection observer
import { useInView } from "react-intersection-observer";

const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath, true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />;
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 5]} intensity={1.5} />
      <spotLight position={[1000, 0, 0]} intensity={1} />
    </>
  );
};

const HTMLContent = ({
  bgColor,
  domContent,
  children,
  modelPath,
  positionY,
  positionYModel,
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  const [refItem, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView, bgColor]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, positionYModel, 0]}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container" ref={refItem} style={{ zIndex: 5 }}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default function NewChairShopping() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);

  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <div style={{ height: "100vh" }}>
      <Header />

      <Canvas
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
        style={{ zIndex: 1 }}
      >
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            modelPath={"NCS/armchairYellow.glb"}
            positionY={250}
            positionYModel={-35}
            bgColor={"#f15946"}
          >
            <h1 className="title">Beigi</h1>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath={"NCS/armchairGreen.glb"}
            positionY={0}
            positionYModel={65}
            bgColor={"#571ec1"}
          >
            <h1 className="title">Lime Green</h1>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath={"NCS/armchairGray.glb"}
            positionYModel={165}
            positionY={-250}
            bgColor={"#636567"}
          >
            <h1 className="title">Gray</h1>
          </HTMLContent>
        </Suspense>
      </Canvas>

      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        style={{ zIndex: 1, overflowX: "hidden" }}
      >
        <div style={{ postition: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 73}vh` }}></div>
      </div>
    </div>
  );
}
