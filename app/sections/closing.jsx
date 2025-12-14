import Button from "../ui/Button";
import Outro from "./organisms/outro";

export default function Closing() {
  return (
    <div className="relative flex flex-col w-full h-svh justify-between padding-page">
        <Outro />

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

