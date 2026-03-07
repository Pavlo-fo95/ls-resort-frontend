import type { TrainingTopicDetail } from "../data/trainingData";

type Props = {
  open: boolean;
  onClose: () => void;
  item: TrainingTopicDetail | null;
};

export default function TrainingTopicSheet({ open, onClose, item }: Props) {
  if (!open || !item) return null;

  return (
    <div className="topicSheetOverlay" onClick={onClose}>
      <aside
        className="topicSideSheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
      >
        <button
          type="button"
          className="topicSideSheet__close"
          onClick={onClose}
          aria-label="Закрити"
        >
          ×
        </button>

        {item.image ? (
          <div
            className="topicSideSheet__hero"
            style={{ backgroundImage: `url(${item.image})` }}
            aria-hidden="true"
          />
        ) : null}

        <div className="topicSideSheet__body">
          {item.eyebrow ? (
            <div className="topicSideSheet__eyebrow">{item.eyebrow}</div>
          ) : null}

          <h3 className="topicSideSheet__title">{item.title}</h3>
          <p className="topicSideSheet__intro">{item.intro}</p>

          {item.sections?.map((section, idx) => (
            <section className="topicSideSheet__section" key={`${item.id}-${idx}`}>
              {section.heading ? (
                <h4 className="topicSideSheet__sectionTitle">{section.heading}</h4>
              ) : null}

              {section.paragraphs?.map((paragraph, i) => (
                <p className="topicSideSheet__text" key={`${item.id}-${idx}-p-${i}`}>
                  {paragraph}
                </p>
              ))}

              {section.points?.length ? (
                <ul className="topicSideSheet__list">
                  {section.points.map((point, i) => (
                    <li key={`${item.id}-${idx}-li-${i}`}>{point}</li>
                  ))}
                </ul>
              ) : null}

              {section.note ? (
                <p className="topicSideSheet__note">{section.note}</p>
              ) : null}
            </section>
          ))}
        </div>
      </aside>
    </div>
  );
}