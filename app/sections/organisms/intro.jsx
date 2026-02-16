import Image from "next/image";
import Closing from "../closing";
import Button from "../../ui/Button";


export default function Intro() {
    return (
    <div className="w-full flex flex-col gutter-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gutter-sm md:gutter-base lg:gutter-base w-full">
            <span className="text-h2 text-500 md:text-h2 lg:text-h1 md:col-span-4">
                I design products. I ship them too.
            </span>
            <div className="col-span-2">
                <Closing />
            </div>
        </div>
    </div>
    );
}