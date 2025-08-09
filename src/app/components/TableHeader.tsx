const TableHeader = ({ 
  children, 
  widthClass,
  textAlign = "text-center"
}: { 
  children: React.ReactNode;
  widthClass?: string;
  textAlign?: "text-left" | "text-center" | "text-right";
}) => {
  return (
    <th 
      className={`px-4 py-2 text-xs tracking-wider uppercase font-medium text-gray-900 ${widthClass || ''} ${textAlign}`}
    >
      {children}
    </th>
  );
};

export default TableHeader;
