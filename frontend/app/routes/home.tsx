import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "xDigital App" },
    { name: "Audio File Repository", content: "Welcome to xDigital App!" },
  ];
}

export default function Home() {
  return (
    <div className="w-96 h-96 mx-auto mt-32 p-5 border border-gray-500 bg-white rounded-2xl">
      <header className="mb-12">
        <h1 className="text-5xl ml-12">
          x<span className="text-purple-600">Digital</span>
        </h1>
        <h2 className="text-3xl text-right">Your Audio Repo</h2>
      </header>
      <p className="mb-12">
        xDigital is the one stop place for you to upload and store your audio
        files. Get started today!
      </p>
      <div className="flex flex-row justify-around">
        <Link
          to="/login"
          className=" px-5 py-2 border border-purple-600 rounded-xl hover:cursor-pointer hover:bg-purple-300"
        >
          Log in
        </Link>
        <Link
          to="signup"
          className=" px-5 py-2 bg-purple-600 rounded-xl text-white hover:cursor-pointer hover:bg-purple-900"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
