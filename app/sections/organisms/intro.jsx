import Image from "next/image";
import Button from "../../ui/Button";


export default function Intro() {
    return (
    <div className="w-full flex flex-col gutter-md">
        <div className="md:max-w-[800px] flex flex-col">
            <span className="text-md text-500">
                Toronto-based Product Designer and Developer 
            </span>
            <span className="text-base text-300">
                Passionate about creating accessible and mobile-first tools for other digital natives, 
                imagining and build for the web with a UX and accessibility lens. Currently curious about 
                how I can make real change through interaction design, accessible design, UX tools, and AI.
            </span>
        </div>
    </div> 
    );
}