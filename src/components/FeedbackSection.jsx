import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function FeedbackSection() {
  const testimonials = [
    {
      name: 'John Doe',
      role: 'Software Engineer at Tdevs',
      image: '/assets/global/images/kfLFG4L0iY8GyNqQDz7I.png',
      text: 'Bank registration typically refers to the process by which a financial institution obtains the necessary licenses Bank registration typically refers to the process by which a financial.',
    },
    {
      name: 'Donald Roman',
      role: 'Frontend Engineer at Tdevs',
      image: '/assets/global/images/08qYc4HTRP9QulkSXRbn.png',
      text: 'Bank registration typically refers to the process by which a financial institution obtains the necessary licenses Bank registration typically refers to the process by which a financial.',
    },
    {
      name: 'Angel Rose',
      role: 'UI/UX Designer at Tdevs',
      image: '/assets/global/images/RvNRCrXbVHT7JYRaqCgu.png',
      text: 'Bank registration typically refers to the process by which a financial institution obtains the necessary licenses Bank registration typically refers to the process by which a financial.',
    },
    {
      name: 'John Doe',
      role: 'Software Engineer at Tdevs',
      image: '/assets/global/images/kfLFG4L0iY8GyNqQDz7I.png',
      text: 'Bank registration typically refers to the process by which a financial institution obtains the necessary licenses Bank registration typically refers to the process by which a financial.',
    },
  ];

  return (
    <section className="feedback-section bg-sugar-milk section-space" id="feedback">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-10">
            <div className="section-title-wrapper text-center section-title-space">
              <h2 className="section-title mb-15">Trustworthy Feedback From Our Customers</h2>
            </div>
          </div>
        </div>
        <div className="feedback-slider-wrapper">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.td-swiper-dot-custom' }}
            breakpoints={{
              576: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 3 },
            }}
            className="feedback-active"
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="feedback-item">
                  <div className="admin-thumb-content">
                    <div className="thumb">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="icon">
                      <span>
                        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.5 3.54412C9.68293 -1.30955 0 -1.67978 0 5.60071C0 12.0524 10.5 18 10.5 18C10.5 18 21 11.9735 21 5.60071C21 -1.67978 11.3171 -1.30955 10.5 3.54412Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="feedback-content">
                    <p className="description">{item.text}</p>
                    <div className="admin-info">
                      <h4 className="title">{item.name}</h4>
                      <span className="info">{item.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="slider-pagination-wrapper mt-4">
            <div className="td-swiper-dot td-swiper-dot-custom text-center"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
