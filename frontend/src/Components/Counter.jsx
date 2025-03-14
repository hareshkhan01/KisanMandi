import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMugHot,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Counter = () => {
  return (
    <>
      <div className="container-fluid bg-primary facts py-5 mb-5">
        <div className="container py-5">
          <div className="row gx-5 gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div
                  className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 60, height: 60 }}
                >
                  <FontAwesomeIcon icon={faStar} className="fs-4 text-white" />
                </div>
                <div className="ps-4">
                  <h5 className="text-white">Our Experience</h5>
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    12345
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div
                  className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 60, height: 60 }}
                >
                  <FontAwesomeIcon icon={faUsers} className="fs-4 text-white" />
                </div>
                <div className="ps-4">
                  <h5 className="text-white">Farm Specialist</h5>
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    12345
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div
                  className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 60, height: 60 }}
                >
                  <FontAwesomeIcon icon={faCheck} className="fs-4 text-white" />
                </div>
                <div className="ps-4">
                  <h5 className="text-white">Complete Project</h5>
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    12345
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex">
                <div
                  className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 60, height: 60 }}
                >
                  <FontAwesomeIcon
                    icon={faMugHot}
                    className="fs-4 text-white"
                  />
                </div>
                <div className="ps-4">
                  <h5 className="text-white">Happy Clients</h5>
                  <h1
                    className="display-5 text-white mb-0"
                    data-toggle="counter-up"
                  >
                    12345
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Counter