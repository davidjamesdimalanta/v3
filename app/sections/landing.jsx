import Button from "../ui/Button";
import Intro from "./organisms/intro";

export default function Landing() {
  return (
    <div id="landing" className="relative flex flex-col w-full h-svh justify-between padding-page">
      {/* WebGL Canvas Background */}
      <canvas id="webgl-canvas" className="fixed inset-0 -z-10"></canvas>
        <Intro />

        {/* Currently Up to and Contact*/}
        <div className="flex flex-col md:flex-row md:justify-between align-bottom gutter-md">
            <div className="w-hug flex-2 flex flex-col md:flex-row gutter-sm *:text-tiny md:*:text-small">
                <div className="flex flex-col">
                    <span>Currently: </span>
                    <span>MI Candidate at UofT iSchool</span>
                </div>
                <div className="flex flex-col">
                    <span>Currently: </span>
                    <span>MI Candidate at UofT iSchool</span>
                </div>
            </div>
            <div className="w-fill flex-1 flex justify-end">
                <Button 
                    text={"Get in Touch"}
                />
            </div>
        </div>
    </div>
  );
}

