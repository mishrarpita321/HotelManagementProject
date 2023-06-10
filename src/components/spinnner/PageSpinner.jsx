// import React from 'react';
// import styles from './PageSpinner.module.css';

// const PageSpinner = () => {
//     return (
//         <div className={styles['spinner-container']}>
//             <div className={styles.spinner}></div>
//         </div>
//     );
// };

// export default PageSpinner;

import React from 'react';
import styles from './PageSpinner.module.css';

const Spinner = () => {
  return (
    <div className={styles['spinner-container']}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
