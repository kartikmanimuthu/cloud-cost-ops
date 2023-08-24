import { Icons } from "@/components/icons";

interface IconProps {
  className?: string;
}

export default function Loader(props: IconProps) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Icons.spinner
        className="mr-2 h-100 w-100 animate-spin"
        height="100"
        width="100"
      />
    </div>
  );
}
