import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'One tagged source, two sites',
    icon: '\u{1F3F7}\u{FE0F}',
    description: (
      <>
        Every page carries a <code>visibility: public</code> or{' '}
        <code>visibility: internal</code> tag. A build-time script filters the
        same content folder differently for each deployment — no separate
        content to keep in sync.
      </>
    ),
  },
  {
    title: 'Editing without touching Markdown',
    icon: '\u{1F4DD}',
    description: (
      <>
        A git-based CMS (Decap CMS) at <code>/admin/</code> gives writers a
        form-based editor, including a Visibility toggle right on each page —
        no separate step to decide where content ends up.
      </>
    ),
  },
  {
    title: 'Built-in search',
    icon: '\u{1F50D}',
    description: (
      <>
        Search indexes whatever pages made it into this particular build — so
        the public site's search can never surface an internal-only page,
        by construction.
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className="col col--4">
      <div className="text--center">
        <span className={styles.featureIcon} role="img" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
