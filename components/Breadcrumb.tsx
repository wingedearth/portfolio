import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-label-large text-on-surface-variant">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-outline" aria-hidden="true">/</span>
            )}
            {index === items.length - 1 ? (
              <span className="text-on-surface">{item.label}</span>
            ) : (
              <Link href={item.href} className="md-link">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
