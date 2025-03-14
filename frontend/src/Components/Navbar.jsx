import React from 'react'


const Navbar = () => {
  return (
    <>
      
        <div className="container-fluid px-5 d-none d-lg-block">
          <div className="row gx-5 py-3 align-items-center">
            <div className="col-lg-3">
              <div className="d-flex align-items-center justify-content-start">
                <i className="bi bi-phone-vibrate fs-1 text-primary me-2" />
                <h2 className="mb-0">+012 345 6789</h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center justify-content-center">
                <a href="index.html" className="navbar-brand ms-lg-5">
                  <h1 className="m-0 display-4 text-primary">
                    <span className="text-secondary">Farm</span>Fresh
                  </h1>
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="d-flex align-items-center justify-content-end">
                <a
                  className="btn btn-primary btn-square rounded-circle me-2"
                  href="#"
                >
                  <i className="fab fa-twitter" />
                </a>
                <a
                  className="btn btn-primary btn-square rounded-circle me-2"
                  href="#"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn btn-primary btn-square rounded-circle me-2"
                  href="#"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
                <a
                  className="btn btn-primary btn-square rounded-circle"
                  href="#"
                >
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
    

      <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow-sm py-3 py-lg-0 px-3 px-lg-5">
        <a href="index.html" className="navbar-brand d-flex d-lg-none">
          <h1 className="m-0 display-4 text-secondary">
            <span className="text-white">Farm</span>Fresh
          </h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav mx-auto py-0">
            <a href="index.html" className="nav-item nav-link active">
              Home
            </a>
            <a href="about.html" className="nav-item nav-link">
              About
            </a>
            <a href="service.html" className="nav-item nav-link">
              Service
            </a>
            <a href="product.html" className="nav-item nav-link">
              Product
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <div className="dropdown-menu m-0">
                <a href="blog.html" className="dropdown-item">
                  Blog Grid
                </a>
                <a href="detail.html" className="dropdown-item">
                  Blog Detail
                </a>
                <a href="feature.html" className="dropdown-item">
                  Features
                </a>
                <a href="team.html" className="dropdown-item">
                  The Team
                </a>
                <a href="testimonial.html" className="dropdown-item">
                  Testimonial
                </a>
              </div>
            </div>
            <a href="contact.html" className="nav-item nav-link">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar