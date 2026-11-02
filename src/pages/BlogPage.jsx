import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import { blogPosts } from '../data/blogData';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Investment & Finance', 'Security & Gateways', 'Fintech Innovation'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const calendarSvg = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.10418 1.29199C6.10418 1.10966 6.03175 0.934788 5.90281 0.805856C5.77388 0.676925 5.59901 0.604492 5.41668 0.604492C5.23434 0.604492 5.05947 0.676925 4.93054 0.805856C4.80161 0.934788 4.72918 1.10966 4.72918 1.29199V2.74033C3.40918 2.84574 2.54385 3.10424 1.90768 3.74133C1.2706 4.37749 1.0121 5.24374 0.905762 6.56283H19.0943C18.9879 5.24283 18.7294 4.37749 18.0923 3.74133C17.4562 3.10424 16.5899 2.84574 15.2708 2.73941V1.29199C15.2708 1.10966 15.1984 0.934788 15.0695 0.805856C14.9405 0.676925 14.7657 0.604492 14.5833 0.604492C14.401 0.604492 14.2261 0.676925 14.0972 0.805856C13.9683 0.934788 13.8958 1.10966 13.8958 1.29199V2.67891C13.2863 2.66699 12.6024 2.66699 11.8333 2.66699H8.16668C7.3976 2.66699 6.71376 2.66699 6.10418 2.67891V1.29199Z"
        fill="#585858"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.833496 10C0.833496 9.23092 0.833496 8.54708 0.845413 7.9375H19.1549C19.1668 8.54708 19.1668 9.23092 19.1668 10V11.8333C19.1668 15.2901 19.1668 17.0189 18.0925 18.0923C17.0191 19.1667 15.2902 19.1667 11.8335 19.1667H8.16683C4.71008 19.1667 2.98125 19.1667 1.90783 18.0923C0.833496 17.0189 0.833496 15.2901 0.833496 11.8333V10ZM14.5835 11.8333C14.8266 11.8333 15.0598 11.7368 15.2317 11.5648C15.4036 11.3929 15.5002 11.1598 15.5002 10.9167C15.5002 10.6736 15.4036 10.4404 15.2317 10.2685C15.0598 10.0966 14.8266 10 14.5835 10C14.3404 10 14.1072 10.0966 13.9353 10.2685C13.7634 10.4404 13.6668 10.6736 13.6668 10.9167C13.6668 11.1598 13.7634 11.3929 13.9353 11.5648C14.1072 11.7368 14.3404 11.8333 14.5835 11.8333Z"
        fill="#585858"
      />
    </svg>
  );

  return (
    <>
      <Breadcrumb
        title="Blog &amp; Latest News"
        subtitle="Stay ahead with updates on digital banking, cybersecurity, smart saving plans, and global financial market insights."
      />

      <section className="blog-section bg-sugar-milk section-space">
        <div className="container">
          {/* Filter & Search Bar */}
          <div className="row g-3 align-items-center mb-5">
            <div className="col-md-6">
              <div className="d-flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`btn btn-sm rounded-pill px-3 py-2 fw-medium ${
                      selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="row gy-30">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((blog) => (
                <div key={blog.id} className="col-xxl-4 col-xl-4 col-lg-6">
                  <article className="single-blog-item h-100 shadow-sm bg-white rounded-4 overflow-hidden d-flex flex-column">
                    <div className="blog-thumb">
                      <Link to={`/blog/${blog.id}`}>
                        <img src={blog.thumb} alt={blog.title} style={{ width: '100%', height: '230px', objectFit: 'cover' }} />
                      </Link>
                    </div>
                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <div className="blog-meta mb-2">
                        <span>
                          {calendarSvg}
                          {blog.date}
                        </span>
                        <span className="ms-3 text-primary fw-medium small">{blog.category}</span>
                      </div>
                      <h3 className="title h5 mb-3">
                        <Link to={`/blog/${blog.id}`} className="text-decoration-none text-dark">
                          {blog.title}
                        </Link>
                      </h3>
                      <p className="text-secondary small mb-4 flex-grow-1">{blog.excerpt}</p>
                      <div>
                        <Link to={`/blog/${blog.id}`} className="site-btn gdt-btn btn-sm">
                          Read Full Article
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h4 className="text-secondary">No articles matched your query.</h4>
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
