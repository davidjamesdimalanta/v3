import Button from "../ui/Button";
import Intro from "./organisms/intro";

export default function Landing() {
  return (
    <div className="relative flex flex-col w-full h-svh justify-between padding-page">
      {/* WebGL Canvas Background */}
      <canvas id="webgl-canvas" className="fixed inset-0 -z-10"></canvas>
        <Intro />

        {/* Currently Up to and Contact*/}
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

