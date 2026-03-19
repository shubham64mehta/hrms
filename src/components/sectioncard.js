const SectionCard = ({ title, description, children, footer }) => {
  return (
    <section
      className="bg-white rounded-2xl border border-gray-200 shadow-sm"
    >
      <div className="p-6 space-y-4">
        {(title || description) && (
          <header className="space-y-1">
            {title && <h3 className="text-lg font-semibold tracking-tight">{title}</h3>}
            {description && (
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            )}
          </header>
        )}

        {children}

        {footer && <footer className="pt-2">{footer}</footer>}
      </div>
    </section>
  );
};

export default SectionCard;

