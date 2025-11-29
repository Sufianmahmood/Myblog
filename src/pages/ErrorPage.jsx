import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-2">⚠️ Something went wrong</h1>

      <p className="text-lg text-gray-700">
        {error?.statusText || error?.message || "Unexpected error occurred"}
      </p>

      <Link
        to="/"
        className="mt-5 px-6 py-2 bg-black text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}
