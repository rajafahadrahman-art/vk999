import type { FaqItem } from "@/lib/content";

type Props = {
  heading?: string;
  faqs: FaqItem[];
};

export default function FaqAccordion({
  heading = "Frequently Asked Questions",
  faqs,
}: Props) {
  if (!faqs.length) return null;

  return (
    <section className="faq-section" aria-labelledby="frequently-asked-questions">
      <h2 id="frequently-asked-questions">{heading}</h2>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.question} className="faq-item">
            <summary>
              <span className="faq-question">{faq.question}</span>
              <span className="faq-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
