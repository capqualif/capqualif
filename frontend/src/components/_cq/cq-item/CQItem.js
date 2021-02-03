import React, { useState } from 'react';
import CqItemHeader from './cq-item-header/CqItemHeader';
import CqItemStatus from './cq-item-status/CqItemStatus';
import './CqItem.scss';

import { OWNER } from '../../../dictionnary/common';
import CqItemDetails from './cq-item-details/CqItemDetails';

// level = Appui, Execution, Direction
// type = ?

const CqItemLogo = ({ logo }) => {
  return (
    <div className="cq-item__document-links">
      <span className={`rf-fi--lg ${logo}`}></span>
    </div>
  );
};

const CqItem = ({
  owner,
  level,
  capacite,
  itemName,
  delivranceDate,
  expirationDate,
  status,
}) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  return (
    <div
      className="cq-item cq-title cq-item--default rf-container"
      onClick={() => setIsDetailVisible(!isDetailVisible)}
    >
      <div class="cq-item__header">
        <div className="rf-grid-row">
          <div className="rf-col">
            <CqItemHeader
              level={level}
              capacite={capacite}
              itemName={itemName}
            />
          </div>
          {/* === This part is displayed only if the CqItem is a marin's item ===*/}
          {owner === OWNER.MARIN && (
            <div className="rf-col">
              <div class="cq-item__right-header">
                <CqItemStatus
                  status={status}
                  delivranceDate={delivranceDate}
                  expirationDate={expirationDate}
                />
                <CqItemLogo logo="rf-fi-file-line" />
                <span class="rf-fi-arrow-down-s-line rf-fi--lg"></span>
              </div>
            </div>
          )}
          {/* ===================================================================*/}
        </div>
        {isDetailVisible && (
          <div className="rf-grid-row">
            <div className="rf-col">
              <CqItemDetails isVisible={isDetailVisible} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CqItem;
