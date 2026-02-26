import { Rss } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white h-20 flex items-center pl-6">
      <div className="flex items-center text-2xl font-bold">
        <Rss className="inline-block mr-2" />
        PodRSS
      </div>
    </header>
  );
};
