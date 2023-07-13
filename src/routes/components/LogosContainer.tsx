import "./css/LogosContainer.css"
import wimmaLabLogo from "/images/logo_round.png";
import iotitudeLogo from "/images/logo-iotitude.png";
import { Tooltip } from 'react-tooltip'

// this component returns loading screen for tukko

export const LogosContainer = () => {
return (
    <div className="logosContainer">
        <a 
        href="https://www.wimmalab.org" 
        target="_blank"
        data-tooltip-id="logo-tooltip"
        data-tooltip-content="Visit WIMMA Lab"
        data-tooltip-place="top"
        >
          <img
            className="wimmaLabLogo"
            src={wimmaLabLogo}
            alt="WIMMA Lab Logo"
          />
        </a>
        <a
          href="https://wimma-lab-2023.pages.labranet.jamk.fi/iotitude/core-traffic-visualizer/"
          target="_blank"
          data-tooltip-id="logo-tooltip"
          data-tooltip-content="Visit Iotitude 2023"
          data-tooltip-place="top"
        >
          <img
            className="iotitudeLogo"
            src={iotitudeLogo}
            alt="IoTitude Logo"
          />
        </a>
        <Tooltip id="logo-tooltip"/>
      </div>
)
};

export default LogosContainer;