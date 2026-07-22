import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Two structurally separate spaces',
    icon: '\u{1F5C2}\u{FE0F}',
    description: (
      <>
        Public Docs and Internal Docs are separate content instances with their
        own sidebars and URL paths (<code>/docs/</code> vs{' '}
        <code>/internal-docs/</code>) — not one space with a permission toggle.
      </>
    ),
  },
  {
    title: 'Editing without touching Markdown',
    icon: '\u{1F4DD}',
    description: (
      <>
        A git-based CMS (Decap CMS) at <code>/admin/</code> gives writers a
        form-based editor. Saving a page there commits Markdown to GitHub
        automatically.
      </>
    ),
  },
  {
    title: 'Free hosting, versioned in git',
    icon: '\u{1F680}',
    description: (
      <>
        The whole site builds from a GitHub repo and deploys free via GitHub
        Pages on every push — full page history comes for free through git.
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
