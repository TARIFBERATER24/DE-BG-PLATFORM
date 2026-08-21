type ServicePageProps = {
  title: string;
  intro: string;
  paragraphs: string[];
  includes: string[];
};

const CONTACT_EMAIL = "tarifberatung24@gmail.com";
const CONTACT_PHONE = "+49 157 50171967";

export default function ServicePage({
  title,
  intro,
  paragraphs,
  includes,
}: ServicePageProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-4 text-ink-muted">{intro}</p>

      <div className="mt-6 space-y-4 text-ink">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-line p-6">
        <h2 className="font-semibold text-ink">Какво включва услугата</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-muted">
          {includes.map((item) => (
            <li key={item.slice(0, 24)} className="flex gap-2">
              <span aria-hidden="true" className="text-brand">
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(title)}`}
            className="inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover"
          >
            Свържете се с нас
          </a>
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="inline-flex items-center rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
          >
            {CONTACT_PHONE}
          </a>
        </div>
        <p className="mt-4 border-t border-line pt-4 text-xs text-ink-subtle">
          Цената зависи от конкретния случай — ще я обсъдим при контакт.
        </p>
      </div>
    </div>
  );
}
