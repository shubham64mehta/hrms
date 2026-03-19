const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

export default PageHeader;

