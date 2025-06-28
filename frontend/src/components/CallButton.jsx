import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-3  flex items-center justify-end max-w-full mx-auto w-full absolute top-0">
      <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white">
        <VideoIcon className="size-6" />
        <span className="ml-2">Call</span>
      </button>
    </div>
  );
}

export default CallButton;