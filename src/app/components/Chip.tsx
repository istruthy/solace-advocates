export const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-[rgba(67,130,113,0.5)] text-[rgba(67, 130, 113, 0.2)] text-xs px-2 py-1 rounded-2xl">
      {children}
    </span>
  );
};
