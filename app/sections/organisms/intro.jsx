import Image from "next/image";
import Closing from "../closing";
import Button from "../../ui/Button";


export default function Intro() {
    return (
    <div className="w-full flex flex-col gutter-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gutter-sm md:gutter-base lg:gutter-base w-full">
            <span className="text-h2 text-500 md:text-h2 lg:text-h1 md:col-span-4">
                <span style={{ color: 'var(--text-color-60)' }}>I am an </span><span style={{ color: 'var(--text-color-100)' }}>AI-native</span><span style={{ color: 'var(--text-color-60)' }}> but </span><span style={{ color: 'var(--text-color-100)' }}>human-first</span><span style={{ color: 'var(--text-color-60)' }}> designer and builder, making my designs 1:1 with the code.</span>
            </span>
            <div className="col-span-2">
                <Closing />
            </div>
        </div>
    </div>
    );
}