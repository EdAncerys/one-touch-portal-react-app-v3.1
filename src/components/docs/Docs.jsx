import React, { useContext } from 'react';
import { AppContext } from '../../App';

import Billing from '../../img/support-docs/Billing.png';
import BillingPDF from '../../docs/Billing.pdf';
import Capabilities from '../../img/support-docs/Capabilities.png';
import CapabilitiesPDF from '../../docs/NDG-Supernet-Capabilities-Skills.pdf';
import FaultLogging from '../../img/support-docs/Fault-Logging.png';
import FaultLoggingPDF from '../../docs/Fault-Logging-Enquiries.pdf';
import FaultManagement from '../../img/support-docs/Fault-Management.png';
import FaultManagementPDF from '../../docs/Fault-Management-SLAS-Complete-File.pdf';
import IP from '../../img/support-docs/IP.png';
import IPPDF from '../../docs/IP-Allocation-Policy.pdf';
import Management from '../../img/support-docs/Management.png';
import ManagementPDF from '../../docs/Change-Management-Escalation.pdf';

export default function Index({ props }) {
  const { manageAppContext } = useContext(AppContext);

  const width = '200px';
  const className = 'd-inline-block align-top index-icon';

  return (
    <div style={styles.container} className="features-flex-wrap">
      <a
        href={BillingPDF}
        data-text="download"
        target="_blank"
        rel="noreferrer"
      >
        <img src={Billing} width={width} className={className} alt={Billing} />
      </a>
      <a
        href={CapabilitiesPDF}
        data-text="download"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={Capabilities}
          width={width}
          className={className}
          alt={Capabilities}
        />
      </a>
      <a
        href={FaultLoggingPDF}
        data-text="download"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={FaultLogging}
          width={width}
          className={className}
          alt={FaultLogging}
        />
      </a>
      <a
        href={FaultManagementPDF}
        data-text="download"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={FaultManagement}
          width={width}
          className={className}
          alt={FaultManagement}
        />
      </a>
      <a href={IPPDF} data-text="download" target="_blank" rel="noreferrer">
        <img src={IP} width={width} className={className} alt={IP} />
      </a>
      <a
        href={ManagementPDF}
        data-text="download"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={Management}
          width={width}
          className={className}
          alt={Management}
        />
      </a>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
};
