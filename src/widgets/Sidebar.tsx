import { NavLink } from "react-router-dom";

interface NavItem {
  id: string;
  icon: string;
  label: string;
  sub: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "excel-channel",
    icon: "📁",
    label: "엑셀 → 채널명",
    sub: "Apple ID + RSS 반환",
    path: "/",
  },
  {
    id: "excel-apple-id",
    icon: "📊",
    label: "엑셀 → Apple ID",
    sub: "RSS 반환",
    path: "/excel-apple-id",
  },
  {
    id: "manual-channel",
    icon: "🔍",
    label: "채널명 검색",
    sub: "Apple ID + RSS 반환",
    path: "/manual-channel",
  },
  {
    id: "manual-apple-id",
    icon: "🎙️",
    label: "Apple ID 검색",
    sub: "RSS 반환",
    path: "/manual-apple-id",
  },
  {
    id: "top-podcast",
    icon: "🔥",
    label: "국가별 TOP 팟캐스트",
    sub: "Apple ID + RSS 반환",
    path: "/top-podcast",
  },
];

export const Sidebar = () => {
  return (
    <aside className="w-60 bg-dark border-r border-gray-700 flex flex-col shrink-0">
      {/* Nav */}
      <nav className="p-2 flex-1 flex flex-col gap-5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `w-full flex items-center gap-2.5 rounded-lg border-l-2 transition-all duration-150 no-underline cursor-pointer ${
                isActive
                  ? "bg-dark border-key-color"
                  : "border-transparent hover:bg-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-base pl-2">{item.icon}</span>
                <div className="h-15 flex flex-col justify-center">
                  <div
                    className={`text-m font-semibold ${isActive ? "text-key-color" : "text-gray-400"}`}
                  >
                    {item.label}
                  </div>
                  <div className="text-sm text-gray-200 mt-px">{item.sub}</div>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
