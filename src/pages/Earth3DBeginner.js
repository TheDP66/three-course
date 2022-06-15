import React, { Suspense, useRef } from "react";
import styled from "styled-components";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, DoubleSide } from "three";
import { OrbitControls, Stars } from "@react-three/drei";

import EarthDayMap from "../assets/Earth3DBeginner/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../assets/Earth3DBeginner/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../assets/Earth3DBeginner/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../assets/Earth3DBeginner/textures/8k_earth_clouds.jpg";

const CanvasContainer = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #010718;
  position: fixed;
`;

const Earth = () => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 6;
    cloudsRef.current.rotation.y = elapsedTime / 6;
  });

  return (
    <>
      {/*<ambientLight intensity={1}/>*/}
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        {/* <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotation={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        /> */}
      </mesh>
    </>
  );
};

const TopSectionContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #1756dd10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13%;
  z-index: 99;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const Logo = styled.h1`
  margin: 0;
  color: #fff;
  font-weight: 800;
  font-size: 80px;
`;

const Slogan = styled.div`
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 30px;
  margin-top: 10px;
`;

const Paragraph = styled.div`
  margin: 0;
  margin-top: 1em;
  color: #fff;
  font-size: 16px;
  line-height: 1.5;
  max-width: 30%;
  font-weight: 500;
  text-align: center;
`;

const DonateButton = styled.button`
  outline: none;
  border: none;
  background-color: #4cbe4c;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 2em;
  margin-top: 3em;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 250ms ease-in-out;

  &:hover {
    background-color: transparent;
    border: 2px solid #4cbe4c;
  }
`;

const TopSection = () => {
  return (
    <TopSectionContainer
      unselectable="on"
      onselectstart="return false;"
      onmousedown="return false;"
    >
      <Logo>Global Warming</Logo>
      <Slogan>Keep it COOL for Safe Living!</Slogan>
      <Paragraph>
        You can help us cool off our world and have it go back to it's best
        state ever by donating to help fix our only world and our beloved EARTH!
        Be cool and let the earth be cool. Let the ice burgs to live. Globe is
        warming and will set to fire. Stop polluting, it will cost extra.
      </Paragraph>
      <DonateButton>Donate!</DonateButton>
    </TopSectionContainer>
  );
};

const Earth3DBeginner = () => {
  return (
    <CanvasContainer>
      <TopSection />
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
};

export default Earth3DBeginner;
