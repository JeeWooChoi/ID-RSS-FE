export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full  border border-gray-500 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-key-color/70 focus:bg-white/8 transition-all placeholder:text-gray-400"
  />
);
