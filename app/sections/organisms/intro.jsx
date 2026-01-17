import Image from "next/image";
import Closing from "../closing";
import Button from "../../ui/Button";


export default function Intro() {
    return (
    <div className="w-full flex flex-col">
        <div className="md:max-w-[800px] flex flex-col gutter-xs">
            <span className="text-h6 md:text-h5 text-600">
                Product Designer and Developer
            </span>
            <span className="text-p">
                Passionate about creating accessible and mobile-first tools for other digital natives,
                imagining and building for the web with a UX and accessibility lens. Currently curious about
                how I can make real change through interaction design, accessible design, and Human-AI Interaction. Based in Toronto.
            </span>
        </div>
        <Closing />
    </div>
    );
}