import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ title, subtitle, parent = 'Home', parentLink = '/' }) {
  return (
    <section
      className="breadcrumb-area breadcrumb-space breadcrumb-overlay include-bg"
      style={{
        backgroundImage: `url('/assets/front/theme-2/images/bg/price-bg.png')`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-content text-center">
              <div className="td-breadcrumb-menu">
                <nav>
                  <ul>
                    <li>
                      <span>
                        <Link to={parentLink}>{parent}</Link>
                      </span>
                    </li>
                    <li className="active">
                      <span>{title}</span>
                    </li>
                  </ul>
                </nav>
              </div>
              <h1 className="breadcrumb-title text-white">{title}</h1>
              {subtitle && <p className="description mx-auto mt-3">{subtitle}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
