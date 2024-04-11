import { Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { AxisHelper } from "three";

const Home = () => {
  const mesh = useRef(null);
  const group = useRef();

  const Model = ({ modelPath }) => {
    const gltf = useGLTF(modelPath, true);

    var mroot = gltf.scene;
    var bbox = new THREE.Box3().setFromObject(mroot);
    var cent = bbox.getCenter(new THREE.Vector3());
    var size = bbox.getSize(new THREE.Vector3());

    // Rescale the object
    var maxAxis = Math.max(size.x, size.y, size.z);

    mroot.scale.multiplyScalar(70 / maxAxis);
    bbox.setFromObject(mroot);
    bbox.getCenter(cent);
    bbox.getSize(size);

    mroot.position.copy(cent).multiplyScalar(-1);
    mroot.rotation.y = Math.PI / 1;
    mroot.rotation.x = Math.PI / 10;

    // const { camera, gl, mouse, intersect, viewport } = useThree();
    // console.log(useThree());

    // var target = new THREE.Vector3();

    // useFrame(({ mouse }) => {
    //   // target.x = ((mouse.x * viewport.width) / 2) * -1;
    //   // target.y = ((mouse.y * viewport.height) / 2) * -1;
    //   // mroot.lookAt(target);

    //   console.log(mroot);
    // });

    return (
      <group ref={group}>
        {/* <mesh position={[0, 0, 0]} dispose={null} rotation={[0, 0, 0]}> */}
        <mesh position={[-27, -14, -25]} dispose={null} rotation={[0, 0, 0]}>
          {/* <mesh position={[-33, -30, -25]} dispose={null}> */}
          <primitive object={mroot} />
        </mesh>
      </group>
    );
  };

  function Loader() {
    // console.log("LOADING");
    const { progress } = useProgress();

    return (
      <Html center className="z-10">
        {progress}%
      </Html>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "snow",
        textAlign: "center",
        height: "100vh",
      }}
    >
      <div style={{ height: "40vh", width: "auto" }}>
        <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotation={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
          />
          <axisHelper />
          <ambientLight intensity={0.3} />;
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[0, 10, 5]} intensity={0.6} />
          <spotLight position={[100, 0, 0]} intensity={1} />
          <Suspense fallback={<Loader />}>
            <Model modelPath={"home/dog-face.glb"} />
          </Suspense>
        </Canvas>
      </div>
      <small>try to click and drag the dog face</small>
      <br />
      <br />
      <h1 style={{ margin: 0 }}>My React Three Course</h1>
      <ul style={{ padding: "0px" }}>
        <li style={{ listStyleType: "none" }}>
          <Link to={"/three-wobble-box"} className="">
            Three Wobble Box
          </Link>
        </li>
        <li style={{ listStyleType: "none" }}>
          <Link to={"/earth-3d-beginner"} className="">
            Earth 3D Beginner
          </Link>
        </li>
        <li style={{ listStyleType: "none" }}>
          <Link to={"/new-chair-shopping"} className="">
            New Chair Shopping
          </Link>
        </li>
        {/* <li>
          <Link to={"/portofolio-3d"} className="">
            Portofolio 3D
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Home;
