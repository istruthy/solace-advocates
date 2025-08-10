export const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <span 
      className="text-xs px-2 py-1 rounded-2xl bg-[rgba(67,130,113,0.9)] text-white"
    >
      {children}
    </span>
  );
};
