import { Header } from "ui";
import { Button } from "../components/ui/button";

export default function Page() {
  return (
    <>
      <Header text="Web" />
      <div>
        <Button variant="secondary">Click me</Button>
      </div>

      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click Me!
      </button> */}
    </>
  );
}
