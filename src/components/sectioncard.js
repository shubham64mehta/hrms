const SectionCard = ({ title, description, children, footer, fullWidth = false }) => {
  return (
    <section
      className={`bg-white rounded-2xl border shadow-sm ${
        fullWidth ? "" : ""
      }`}
    >
      <div className="p-6 space-y-4">
        {(title || description) && (
          <header className="space-y-1">
            {title && <h3 className="text-lg font-medium">{title}</h3>}
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </header>
        )}

        <div>{children}</div>

        {footer && <footer>{footer}</footer>}
      </div>
    </section>
  );
};

export default SectionCard;

