import React, { useState } from 'react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  const faqs = [
    {
      id: 1,
      question: 'How does it work with two wallets?',
      answer:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
    },
    {
      id: 2,
      question: 'Is there an option for manual Deposit?',
      answer:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus molestiae voluptatem id ut repudiandae totam fugit harum architecto dolorem deleniti incidunt,',
    },
    {
      id: 3,
      question: 'How to Withdraw Money',
      answer:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
    },
    {
      id: 4,
      question: 'How can I upgrade my Ranking',
      answer:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
    },
    {
      id: 5,
      question: 'How the Referral Levels works?',
      answer:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
    },
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="faq-section section-space" id="faq">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-6 col-lg-7">
            <div className="section-title-wrapper text-center section-title-space">
              <h2 className="section-title mb-15">Faq Questions</h2>
              <p className="description">Explore Your Questions.</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xxl-10 col-xl-10 col-lg-10">
            <div className="accordion-wrapper site-faq">
              <div className="accordion" id="accordionExample">
                {faqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div key={faq.id} className={`accordion-item ${isOpen ? 'active' : ''}`}>
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                          type="button"
                          onClick={() => toggle(idx)}
                          aria-expanded={isOpen}
                        >
                          <span className="count">{faq.id}</span>
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                        style={{
                          display: isOpen ? 'block' : 'none',
                        }}
                      >
                        <div className="accordion-body">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
