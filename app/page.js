'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwQ0Mys2kT7lFj97oac3sD5gJzY0x6kSkYQhLn1RWVCZ8cd8HDfJRE24ZxKItYRcb1U/exec';

  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState('Notify Me');
  const [btnStyle, setBtnStyle] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStoreSlide, setCurrentStoreSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [storeTouchStart, setStoreTouchStart] = useState(null);
  const [storeTouchEnd, setStoreTouchEnd] = useState(null);
  const carouselRef = useRef(null);

  // Event carousel data
  const events = [
    {
      id: 1,
      title: "Kokky Webstite Launch",
      date: "------- --, 2026",
      description: "Stay tuned for the official launch of our website! Explore our exciting new online store, discover our wide range of toys and collectibles, and be the first to know about our latest news and promotions.",
      image: "/event1.png",
      type: "image"
    },
    {
      id: 2,
      title: "Kokky Report Giving Celebration",
      date: "December 25, 2025",
      description: "Show us your report card and get a free gift and a gift voucher to use in our stores! A celebration of hard work and good grades!",
      image: "/event2.png",
      type: "image"
    },
    {
      id: 3,
      title: "Kokky 5 Opening Celebration",
      date: "January 16, 2025",
      description: "Kokky 5 grand opening celebration with special discounts, fun activities and free ice cream for everyone.",
      image: "/event3.png",
      type: "image"
    },
    {
      id: 4,
      title: "New ROKR Series Launch",
      date: "Jan 4, 2026",
      description: "An amazing new series of ROKR DIY kits available now in Kokky! Build your own mechanical models and let your creativity soar.",
      image: "/event4.png",
      type: "image"
    },
    {
      id: 5,
      title: "New Book Nooks",
      date: "Jan 4, 2026",
      description: "Discover Kokky's new collection of book nooks - miniature dioramas that fit between your books and transport you to magical worlds. Perfect for book lovers and collectors!",
      image: "/event5.png",
      type: "image"
    },
  ];

  // Store data
  const stores = [
    {
      id: 1,
      name: "KOKKY",
      location: "On Alikilegefaanu Magu, near Majeedhee magu",
      details: "Detailed Address: G.Nooraanee Villa, Alikilegefaanu Magu, Malé 20131, Maldives",
      hours: "8:00 AM - 11:00 PM Daily",
      phone: "+960 7811100",
      image: "/store1.png",
      features: [""],
      mapLink: "https://maps.app.goo.gl/4WzW7yZZfC6izyad8"
    },
    {
      id: 2,
      name: "KOKKY",
      location: "On Muranga Magu, near IGMH",
      details: "Detailed Address: Muranga Magu, Malé 20179, Maldives",
      hours: "8:00 AM - 11:00 PM Daily",
      phone: "+960 7369200",
      image: "/store2.png",
      features: [""],
      mapLink: "https://maps.app.goo.gl/WKrffjTxQSJQniGK8"
    },
    {
      id: 3,
      name: "KOKKY",
      location: "On Buruzu Magu, right behind iskandhar Koshi!",
      details: "Detailed Address: M.Medhufalhu, Buruzu Magu, 20304, K.Male', Maldives",
      hours: "8:00 AM - 11:00 PM Daily",
      phone: "+960 7367300",
      image: "/store3.png",
      features: [""],
      mapLink: "https://maps.app.goo.gl/cxYd3ihw52ToWHt99"
    },
    {
      id: 4,
      name: "KOKKY",
      location: "Nirolhu Magu - Main Road Hulhumale",
      details: "Detailed Address: Nirolhu Magu - Main Road Hulhumale, 20057",   
      hours: "8:00 AM - 11:00 PM Daily",
      phone: "+960 7371400",
      image: "/store4.png",
      features: [""],
      mapLink: "https://maps.app.goo.gl/8Jd9yGmDa2CswsfM9"
    },
    {
      id: 5,
      name: "KOKKY",
      location: "On Kenery Magu near Mr. Pencil",
      details: "Detailed Address: K, M. Fanari, Kenery Magu, Malé 20214",
      hours: "8:00 AM - 11:00 PM Daily",
      phone: "+960 790 6291",
      image: "/store5.png",
      features: [""],
      mapLink: "https://maps.app.goo.gl/KKdjY9X19gh9d74Z9"
    }
  ];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Touch handlers for store carousel
  const onStoreTouchStart = (e) => {
    setStoreTouchEnd(null);
    setStoreTouchStart(e.targetTouches[0].clientX);
  };

  const onStoreTouchMove = (e) => {
    setStoreTouchEnd(e.targetTouches[0].clientX);
  };

  const onStoreTouchEnd = () => {
    if (!storeTouchStart || !storeTouchEnd) return;
    
    const distance = storeTouchStart - storeTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextStoreSlide();
    }
    if (isRightSwipe) {
      prevStoreSlide();
    }
  };

  // Carousel functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Store carousel functions
  const nextStoreSlide = () => {
    setCurrentStoreSlide((prev) => (prev + 1) % stores.length);
  };

  const prevStoreSlide = () => {
    setCurrentStoreSlide((prev) => (prev - 1 + stores.length) % stores.length);
  };

  const goToStoreSlide = (index) => {
    setCurrentStoreSlide(index);
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check if mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    setLoading(true);
    setBtnText('Sending...');

    const requestBody = new FormData(form);

    fetch(scriptURL, { method: 'POST', body: requestBody })
      .then(response => {
        setBtnText('Thanks!');
        setBtnStyle({ backgroundColor: '#fd6a6aff' });
        form.reset();

        setTimeout(() => {
          setLoading(false);
          setBtnText('Notify Me');
          setBtnStyle({});
        }, 3000);
      })
      .catch(error => {
        console.error('Error!', error.message);
        setBtnText('Error! Try again.');

        setTimeout(() => {
          setLoading(false);
          setBtnText('Notify Me');
        }, 3000);
      });
  };

  return (
    <main className="content-card">
      <div className="logo-container">
        <img 
          src="/kokky_logo_o.png" 
          alt="KOKKY Logo" 
          className="logo"
          loading="eager"
        />
      </div>

      <h2 className="title">Coming Soon!</h2>

      {/* Fun message banner */}
      <div className="fun-message">
        <h3>Something fun and exciting is on the way! Stay tuned!</h3>
      </div>

      <p className="subtitle">
        
      </p>

      {/* Event Carousel */}
      <div 
        className="event-carousel-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label="Event carousel"
      >
        <div className="carousel-controls">
          <button 
            className="carousel-btn" 
            onClick={prevSlide} 
            aria-label="Previous slide"
            type="button"
          >
            &lt;
          </button>
          <button 
            className="carousel-btn" 
            onClick={nextSlide} 
            aria-label="Next slide"
            type="button"
          >
            &gt;
          </button>
        </div>

        <div
          className="event-carousel-track"
          ref={carouselRef}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          role="list"
        >
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className="event-slide"
              role="listitem"
              aria-hidden={index !== currentSlide}
            >
              {/* Conditionally render video or image */}
              {event.type === 'html5-video' ? (
                <div className="event-video-container">
                  <video
                    className="event-video"
                    controls
                    poster={event.poster}
                    preload="metadata"
                    playsInline
                  >
                    <source src={event.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : event.type === 'video' ? (
                <div className="event-video-container">
                  <iframe
                    src={event.video}
                    title={event.title}
                    className="event-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              ) : (
                <img
                  src={event.image}
                  alt={event.title || `Event ${index + 1}`}
                  className="event-image"
                  loading={index === 0 ? "eager" : "lazy"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/800x400/ff6b81/ffffff?text=KOKKY+Event+" + (index + 1);
                  }}
                />
              )}

              <div className="event-info">
                {event.title && <h3 className="event-title">{event.title}</h3>}
                {event.date && <div className="event-date">{event.date}</div>}
                {event.description && <p className="event-desc">{event.description}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-dots" role="tablist">
          {events.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentSlide}
              role="tab"
              type="button"
            />
          ))}
        </div>

        <div className="slide-counter" aria-live="polite">
          {currentSlide + 1} / {events.length}
        </div>
      </div>

      <form className="notify-form" onSubmit={handleSubmit} noValidate>
        <label className="sr-only" htmlFor="email-address">Email address</label>
        <input
          type="email"
          id="email-address"
          name="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
          className="email-input"
          aria-required="true"
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
          style={btnStyle}
          aria-busy={loading}
        >
          {btnText}
        </button>
      </form>

      <p className="disclaimer">
        We'll only email you when we launch
      </p>

      {/* Stores Section - Carousel */}
      <div className="stores-showcase">
        <h3 className="stores-showcase-title">In the mean time Visit Our Stores!</h3>
        <p style={{
          textAlign: 'center',
          color: 'var(--color-text-sub)',
          marginBottom: '2rem',
          fontSize: '1.1rem',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0 1rem'
        }}>
        </p>

        <div 
          className="stores-carousel-wrapper"
          onTouchStart={onStoreTouchStart}
          onTouchMove={onStoreTouchMove}
          onTouchEnd={onStoreTouchEnd}
        >
          <div className="stores-carousel-controls">
            <button 
              className="stores-carousel-btn" 
              onClick={prevStoreSlide}
              aria-label="Previous store"
              type="button"
            >
              &lt;
            </button>
            <button 
              className="stores-carousel-btn" 
              onClick={nextStoreSlide}
              aria-label="Next store"
              type="button"
            >
              &gt;
            </button>
          </div>

          <div 
            className="stores-grid-showcase"
            style={{ 
              transform: isMobile ? `translateX(-${currentStoreSlide * 100}%)` : 'none',
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            {stores.map((store) => (
              <div key={store.id} className="store-card-showcase">
                <div className="store-image-container">
                  <img
                    src={store.image}
                    alt={`${store.name} store front`}
                    className="store-image-showcase"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      console.error(`Failed to load image: ${store.image}`);
                      e.target.src = "https://placehold.co/400x300/ff6b81/ffffff?text=" + encodeURIComponent(store.name);
                    }}
                    onLoad={() => console.log(`Successfully loaded: ${store.image}`)}
                  />
                  {store.badge && <div className="store-badge">{store.badge}</div>}
                </div>
                <div className="store-content-showcase">
                  <h4 className="store-name-showcase">{store.name}</h4>
                  <div className="store-location-showcase">
                    <span className="store-location-icon"></span>
                    <span>{store.location}</span>
                  </div>
                  <p className="store-details-showcase">{store.details}</p>
                  
                  <div className="store-contact">
                    <span className="contact-icon"></span>
                    <a href={`tel:${store.phone.replace(/\s+/g, '')}`} className="store-phone">
                      {store.phone}
                    </a>
                  </div>

                  {store.features && store.features.length > 0 && store.features[0] && (
                    <div className="store-features">
                      {store.features.map((feature, idx) => (
                        <span key={idx} className="store-feature">{feature}</span>
                      ))}
                    </div>
                  )}

<a
                    href={store.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                    aria-label={`View ${store.name} on Google Maps`}
                  >
                    <span className="map-link-icon"></span>
                    View on Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="stores-carousel-dots" role="tablist">
            {stores.map((_, index) => (
              <button
                key={index}
                className={`stores-dot ${index === currentStoreSlide ? 'active' : ''}`}
                onClick={() => goToStoreSlide(index)}
                aria-label={`Go to store ${index + 1}`}
                aria-selected={index === currentStoreSlide}
                role="tab"
                type="button"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-title">Check out what's new from our socials!</div>
          
          <div className="social-links">
            <a
              href="https://www.instagram.com/kokky_mv/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Follow us on Instagram"
            >
              <img 
                src="/instagram.png" 
                alt="Instagram" 
                loading="lazy"
                width="32"
                height="32"
              />
            </a>

            <a
              href="https://www.facebook.com/Kokky.mv/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Follow us on Facebook"
            >
              <img 
                src="/facebook.png" 
                alt="Facebook" 
                loading="lazy"
                width="32"
                height="32"
              />
            </a>

            <a
              href="https://www.tiktok.com/@kokky.mv"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Follow us on TikTok"
            >
              <img 
                src="/tik-tok.png" 
                alt="TikTok" 
                loading="lazy"
                width="32"
                height="32"
              />
            </a>
          </div>

          <div className="footer-links">
            <a 
              href="mailto:hr@kokky.mv" 
              className="footer-link"
              aria-label="Email us at hr@kokky.mv"
            >
              hr@kokky.mv
            </a>
            <a 
              href="mailto:sales@kokky.mv" 
              className="footer-link"
              aria-label="Email us at sales@kokky.mv"
            >
              sales@kokky.mv
            </a>
            <a 
              href="mailto:marketing@kokky.mv" 
              className="footer-link"
              aria-label="Email us at marketing@kokky.mv"
            >
              marketing@kokky.mv
            </a>
          </div>

          <div className="footer-copyright">
            © {new Date().getFullYear()} KOKKY Toy Shop
          </div>
        </div>
      </footer>
    </main>
  );
}