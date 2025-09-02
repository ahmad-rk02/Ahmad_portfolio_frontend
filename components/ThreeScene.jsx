// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Float, Html } from "@react-three/drei";

// function FloatingModel() {
//   return (
//     <Float rotationIntensity={0.6} floatIntensity={0.8}>
//       <mesh scale={1.1}>
//         <icosahedronGeometry args={[1.2, 0]} />
//         <meshStandardMaterial roughness={0.2} metalness={0.9} color="#7c3aed" />
//       </mesh>
//     </Float>
//   );
// }

// export default function ThreeScene({ height = 360 }) {
//   return (
//     <div className="rounded-2xl overflow-hidden shadow-xl w-full" style={{ height }}>
//       <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
//         <ambientLight intensity={0.6} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />
//         <Suspense fallback={<Html center>Loading 3D...</Html>}>
//           <FloatingModel />
//         </Suspense>
//         <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
//       </Canvas>
//     </div>
//   );
// }
