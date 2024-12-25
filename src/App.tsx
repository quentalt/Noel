import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Santa } from './components/Santa';
import { Elf } from './components/Elf';
import { Present } from './components/Present';
import { Snow } from './components/Snow';
import { ChristmasTree } from './components/ChristmasTree';
import { SnowGround } from './components/SnowGround';
import { Reindeer } from './components/Reindeer';

export function App() {
  return (
      <div className="w-full h-screen bg-black">
        <Canvas camera={{ position: [0, 5, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <ChristmasTree position={[0, 0, -5]} />

          <Santa position={[0, 2, 0]} />

          <Reindeer position={[-3, -0.2, -1]} />

          <Elf position={[-2, 1, -2]} />
          <Elf position={[2, 1, -2]} />
          <Elf position={[0, 1, -3]} />

          <Present position={[-1.5, 0.3, 1]} />
          <Present position={[1.5, 0.3, 1]} />
          <Present position={[0, 0.3, 2]} />
          <Present position={[-2, 0.3, 0]} />
          <Present position={[2, 0.3, 0]} />

          <Snow />
          <SnowGround />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>

          <OrbitControls />
        </Canvas>
      </div>
  );
}