import React, { Fragment, useState } from 'react';
import { PropTypes } from 'prop-types';

import styles from './CqItemBase.module.scss';

import CqItemHeader from './cq-item-header/CqItemHeader';
import CqItemStatus from './cq-item-status/CqItemStatus';

const CqItemBase = ({ subtitle, name, status, date, details }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  return (
    <div className={`${styles['cq-item']} fr-my-1w fr-py-3w`}>
      <div className="fr-container fr-grid-row fr-grid-row--middle">
        <div className="fr-col">
          <CqItemHeader subtitle={subtitle} name={name} />
        </div>
        {date ? (
          <div className="fr-col fr-pl-4w">
            <div className="fr-col fr-mr-1w">{status}</div>
            <div className="fr-col">{date}</div>
          </div>
        ) : (
          <div className="fr-col fr-pl-4w">{status}</div>
        )}

        {details && (
          <div className={`${styles['expand-container']} fr-col-1 fr-px-2w`}>
            <span
              className={`${
                isDetailVisible
                  ? 'fr-fi-arrow-down-s-line'
                  : 'fr-fi-arrow-up-s-line'
              } ${styles['expand-container']} fr-ml-1w cq-helpers__clickable`}
              onClick={() => setIsDetailVisible(!isDetailVisible)}
            ></span>
          </div>
        )}
      </div>
      {details && (
        <Fragment>
          {React.cloneElement(details, { isVisible: isDetailVisible })}
        </Fragment>
      )}
    </div>
  );
};

CqItemBase.propTypes = {
  subtitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.element.isRequired,
  date: PropTypes.element.isRequired,
  action: PropTypes.element.isRequired,
  details: PropTypes.object.isRequired,
};

export default CqItemBase;
