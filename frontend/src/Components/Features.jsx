import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleAlt,
  faAward,
  faCarrot,
  faCheck,
  faDog,
  faMugHot,
  faPhoneAlt,
  faSeedling,
  faStar,
  faTractor,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Features = () => {
  return (
    <>
      <div className="container-fluid bg-primary feature py-5 pb-lg-0 my-5">
        <div className="container py-5 pb-lg-0">
          <div
            className="mx-auto text-center mb-3 pb-2"
            style={{ maxWidth: 500 }}
          >
            <h6 className="text-uppercase text-secondary">Features</h6>
            <h1 className="display-5 text-white">Why Choose Us!!!</h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-3">
              <div className="text-white mb-5">
                <div
                  className="bg-secondary rounded-pill d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 60, height: 60 }}
                >
                  <FontAwesomeIcon
                    icon={faSeedling}
                    className="display-1 fs-4 text-white"
                  />
                </div>
                <h4 className="text-white">100% Organic</h4>
                <p className="mb-0">
                  Labore justo vero ipsum sit clita erat lorem magna clita
                </p>
              </div>
              <div className="text-white">
                <div
                  className="bg-secondary rounded-pill d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 60, height: 60 }}
                >
                  <FontAwesomeIcon
                    icon={faAward}
                    className="display-1 fs-4 text-white"
                  />
                </div>
                <h4 className="text-white">Award Winning</h4>
                <p className="mb-0">
                  Labore justo vero ipsum sit clita erat lorem magna clita
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-block bg-white h-100 text-center p-5 pb-lg-0">
                <p>
                  At et justo elitr amet sea at. Magna et sit vero at ipsum sit
                  et dolores rebum. Magna sea eos sit dolor, ipsum amet no
                  tempor ipsum eirmod lorem eirmod diam tempor dolor eos diam et
                  et diam dolor ea. Clita est rebum amet dolore sit. Dolor stet
                  dolor duo clita, vero dolor ipsum amet dolore magna lorem erat
                  stet sed vero dolor
                </p>
                <img className="img-fluid" src="img/feature.png" alt />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="text-white mb-5">
                <div
                  className="bg-secondary rounded-pill d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 60, height: 60 }}
                >
                  <FontAwesomeIcon
                    icon={faTractor}
                    className="display-1 fs-4 text-white"
                  />
                </div>
                <h4 className="text-white">Modern Farming</h4>
                <p className="mb-0">
                  Labore justo vero ipsum sit clita erat lorem magna clita
                </p>
              </div>
              <div className="text-white">
                <div
                  className="bg-secondary rounded-pill d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 60, height: 60 }}
                >
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    className="display-1 fs-4 text-white"
                  />
                </div>
                <h4 className="text-white">24/7 Support</h4>
                <p className="mb-0">
                  Labore justo vero ipsum sit clita erat lorem magna clita
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features