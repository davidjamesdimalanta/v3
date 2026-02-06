import Image from "next/image";
import Closing from "../closing";
import Button from "../../ui/Button";


export default function Intro() {
    return (
    <div className="w-full flex flex-col gutter-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gutter-sm w-full">
            <span className="text-h4 md:text-h3 max-w-96">
                Product Designer and Developer
            </span>
            <span className="text-p max-w-96">
                An early-career designer with experience in web development, interaction design, 
                accessibility design, and human-AI interaction.
            </span>
            <span className="text-p max-w-96">
                Based in Toronto, currently seeking a co-op for Summer 2026.
            </span>
        </div>
        <Closing />
    </div>
    );
}