import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="dark:bg-black py-12 min-h-screen">
      <div id="error-page" className="w-10/12 mx-auto -mt-2 py-40 text-center text-2xl space-y-3 ">
      <h1 className="text-7xl font-bold mt-2 mb-4">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
    </div>
  );
}