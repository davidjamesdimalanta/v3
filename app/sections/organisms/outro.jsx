import Image from "next/image";
import Button from "../../ui/Button";


export default function Outro() {
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
        <div className="flex justify-between">
            <div className="flex gutter-sm">
                <div className="flex flex-col">
                    <span>Currently: </span>
                    <span>MI Candidate at UofT iSchool</span>
                </div>
                <div className="flex flex-col">
                    <span>Currently: </span>
                    <span>MI Candidate at UofT iSchool</span>
                </div>
            </div>
            <Button />
        </div>
    </div> 
    );
}