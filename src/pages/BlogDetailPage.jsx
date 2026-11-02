import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import { blogPosts } from '../data/blogData';

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === id) || blogPosts[0];
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id);

  return (
    <>
      <Breadcrumb
        title={post.title}
        parent="Blog"
        parentLink="/blog"
        subtitle={`Published on ${post.date} in ${post.category}`}
      />

      <section className="section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <article className="bg-white p-4 p-md-5 rounded-4 border shadow-sm">
                <div className="mb-4 rounded-4 overflow-hidden">
                  <img
                    src={post.thumb}
                    alt={post.title}
                    style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }}
                  />
                </div>

                <div className="d-flex align-items-center gap-3 text-secondary small mb-3">
                  <span>
                    <i className="fa-regular fa-calendar me-1"></i> {post.date}
                  </span>
                  <span>
                    <i className="fa-regular fa-user me-1"></i> By {post.author}
                  </span>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                    {post.category}
                  </span>
                </div>

                <h1 className="h2 fw-bold mb-4">{post.title}</h1>

                <div className="post-content text-secondary lh-lg" style={{ fontSize: '17px' }}>
                  <p className="lead text-dark fw-normal">{post.excerpt}</p>
                  {post.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph.trim()}</p>
                  ))}
                </div>

                {/* Social Share & Tags */}
                <div className="d-flex flex-wrap align-items-center justify-content-between border-top border-bottom py-3 my-5">
                  <div className="fw-semibold text-dark">
                    Share this article:
                    <a href="#share" className="ms-2 text-secondary hover-primary">
                      <i className="fa-brands fa-facebook-f ms-2"></i>
                    </a>
                    <a href="#share" className="ms-2 text-secondary hover-primary">
                      <i className="fa-brands fa-x-twitter ms-2"></i>
                    </a>
                    <a href="#share" className="ms-2 text-secondary hover-primary">
                      <i className="fa-brands fa-linkedin-in ms-2"></i>
                    </a>
                  </div>
                  <div>
                    <button
                      onClick={() => navigate('/blog')}
                      className="btn btn-outline-secondary btn-sm rounded-pill"
                    >
                      <i className="fa-solid fa-arrow-left me-1"></i> Back to Blog
                    </button>
                  </div>
                </div>

                {/* Comment section */}
                <div className="mt-5">
                  <h4 className="fw-bold mb-4">Leave a Comment</h4>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Comment submitted for review!'); }}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <input type="text" className="form-control py-3" placeholder="Your Name" required />
                      </div>
                      <div className="col-md-6">
                        <input type="email" className="form-control py-3" placeholder="Your Email" required />
                      </div>
                      <div className="col-12">
                        <textarea className="form-control py-3" rows="4" placeholder="Your Comment" required></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="site-btn gdt-btn">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </article>
            </div>

            {/* Sidebar with related posts */}
            <div className="col-lg-4 mt-5 mt-lg-0">
              <div className="p-4 bg-white rounded-4 border shadow-sm mb-4">
                <h4 className="fw-bold mb-3 h5 border-bottom pb-2">Recent Articles</h4>
                <div className="d-flex flex-column gap-3">
                  {relatedPosts.map((rp) => (
                    <div key={rp.id} className="d-flex gap-3 align-items-center">
                      <img
                        src={rp.thumb}
                        alt={rp.title}
                        style={{ width: '70px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div>
                        <Link to={`/blog/${rp.id}`} className="fw-semibold text-dark small text-decoration-none">
                          {rp.title}
                        </Link>
                        <div className="text-muted small mt-1">{rp.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-4 text-white text-center" style={{ background: '#20293A' }}>
                <h4 className="text-white h5 mb-3">Open An Account Today</h4>
                <p className="small text-light opacity-75 mb-4">
                  Experience fast, automated, and secure digital banking anywhere in the world.
                </p>
                <Link to="/register" className="site-btn gdt-btn w-100">
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
