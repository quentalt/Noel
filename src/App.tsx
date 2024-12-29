import { OrbitControls } from "@react-three/drei";
import { Elf } from "./components/Elf";
import { Present } from "./components/Present";
import { SnowGround } from "./components/SnowGround";
import { Canvas } from "@react-three/fiber";
import { Snow } from "./components/Snow";
import { Reindeer } from "./components/Reindeer";
import { Santa } from "./components/Santa";
import { Sleigh } from "./components/Sleigh";
import {ChristmasTree} from "./components/ChristmasTree.tsx";

export function App() {
    return (
        <div className="w-full h-screen bg-black">
            <Canvas camera={{position: [0, 5, 10]}}>
                <ambientLight intensity={0.5}/>
                <pointLight position={[10, 10, 10]} intensity={1} castShadow/>

                {/* Sleigh and reindeer further away */}
                <Sleigh position={[0, 0.5, -12]}/>
                <Reindeer position={[-3, -0.2, -1]} />

                {/* Santa on the ground */}
                <Santa position={[0, 2, 0]}/>

                {/* Elves on the ground */}
                <Elf position={[-2, 1, -2]} />
                <Elf position={[2, 1, -2]} />
                <Elf position={[0, 1, -3]} />

                {/* Presents on the ground */}
                <Present position={[-1.5, 0.3, 1]} />
                <Present position={[1.5, 0.3, 1]} />
                <Present position={[0, 0.3, 2]} />
                <Present position={[-2, 0.3, 0]} />
                <Present position={[2, 0.3, 0]} />

                {/* Christmas tree further away */}
                <ChristmasTree position={[0, 0.5, -6]}/>

                <Snow/>
                <SnowGround/>

                <OrbitControls/>
            </Canvas>
        </div>
    );
}