import { useNavigate } from "react-router-dom";
export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-3xl text-red-700">
          Error: Server not responding{" "}
        </h1>

        <button
          className="text-blue-800 bg-blue-100 px-3 py-1 rounded-lg  font-semibold text-xl bg cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to Home
        </button>
      </div>
    </div>
  );
}
