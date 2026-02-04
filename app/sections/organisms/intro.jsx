import Image from "next/image";
import Closing from "../closing";
import Button from "../../ui/Button";


export default function Intro() {
    return (
    <div className="w-full flex flex-col">
        <div className="flex flex-col gutter-xs">
            <span className="text-h5 md:text-h5">
                Product Designer and Developer
            </span>
            <span className="text-p">
                Imagining and building for other digital natives with a UX and developer lens. 
                Currently curious about how I can make real change through interaction design, accessible design, and Human-AI Interaction.
                Based in Toronto, currently seeking a Co-op for Summer 2026.
            </span>
        </div>
        <Closing />
    </div>
    );
}