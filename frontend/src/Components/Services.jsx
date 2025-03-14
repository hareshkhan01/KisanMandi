import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleAlt,
  faCarrot,
  faDog,
  faSeedling,
  faTractor,
} from "@fortawesome/free-solid-svg-icons";

const Services = () => {
  return (
    <>
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <div className="mb-3">
                <h6 className="text-primary text-uppercase">Services</h6>
                <h1 className="display-5">Organic Farm Services</h1>
              </div>
              <p className="mb-4">
                Tempor erat elitr at rebum at at clita. Diam dolor diam ipsum et
                tempor sit. Clita erat ipsum et lorem et sit sed stet labore
              </p>
              <a href className="btn btn-primary py-md-3 px-md-5">
                Contact Us
              </a>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light text-center p-5">
                <FontAwesomeIcon
                  icon={faCarrot}
                  className="display-1 text-secondary mb-4"
                />
                <h4>Fresh Vegetables</h4>
                <p className="mb-0">
                  Labore justo vero ipsum sit clita erat lorem magna clita
                  nonumy dolor magna dolor vero
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light text-center p-5">
                <FontAwesomeIcon
                  icon={faAppleAlt}
                  className="display-1 text-secondary mb-4"
                />
                <h4>Fresh Fruits</h4>
                <p className="mb-0">
                  Labore justo vero ipsum sit clita erat lorem magna clita
                  nonumy dolor magna dolor vero
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light text-center p-5">
                <FontAwesomeIcon
                  icon={faDog}
                  className="display-1 text-secondary mb-4"
                />
                <h4>Healty Cattle</h4>
                <p className="mb-0">
                  Labore justo vero ipsum sit clita erat lorem magna clita
                  nonumy dolor magna dolor vero
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light text-center p-5">
                <FontAwesomeIcon
                  icon={faTractor}
                  className="display-1 text-secondary mb-4"
                />
                <h4>Modern Truck</h4>
                <p className="mb-0">
                  Labore justo vero ipsum sit clita erat lorem magna clita
                  nonumy dolor magna dolor vero
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light text-center p-5">
                <FontAwesomeIcon
                  icon={faSeedling}
                  className="display-1 text-secondary mb-4"
                />
                <h4>Farming Plans</h4>
                <p className="mb-0">
                  Labore justo vero ipsum sit clita erat lorem magna clita
                  nonumy dolor magna dolor vero
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services