const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="px-4 py-2 text-xs tracking-wider uppercase font-medium text-gray-900">
      {children}
    </th>
  );
};

export default TableHeader;
