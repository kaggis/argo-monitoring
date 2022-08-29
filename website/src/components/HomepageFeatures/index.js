import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Describe your infrastructure',
    Svg: require('@site/static/img/undraw_server_status_5pbv.svg').default,
    description: (
      <>

      </>
    ),
  },
  {
    title: 'Collect rich status information',
    Svg: require('@site/static/img/undraw_percentages_0rur.svg').default,
    description: (
      <>
        ARGO deploys and runs checks against your infrastructure and collects a rich set of information from low level items (hosts, services) to higher abstractions (groups, organizations)
      </>
    ),
  },
  {
    title: 'Rich analytics and reports',
    Svg: require('@site/static/img/undraw_charts.svg').default,
    description: (
      <>
        The monitoring data pass through the analytics engine and rich reports are generated
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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
