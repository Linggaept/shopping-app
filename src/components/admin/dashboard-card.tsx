export const DashboardCard = ({
  title,
  description,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  description: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`p-4 bg-white shadow rounded-lg ${className}`} {...props}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
}
export default DashboardCard;