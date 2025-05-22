 
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');

    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      overlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    overlay.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      overlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    // Image slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    // Initialize slider and start autoplay
    function startSlider() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    // Stop autoplay on user interaction
    function stopSlider() {
      clearInterval(slideInterval);
    }

    // Go to specific slide
    function goToSlide(index) {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Update current slide index
      currentSlide = index;
    }

    // Next slide function
    function nextSlide() {
      let nextIndex = currentSlide + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }
      goToSlide(nextIndex);
    }

    // Previous slide function
    function prevSlide() {
      let prevIndex = currentSlide - 1;
      if (prevIndex < 0) {
        prevIndex = slides.length - 1;
      }
      goToSlide(prevIndex);
    }

    // Event listeners for dots
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-index'));
        goToSlide(slideIndex);
        stopSlider();
        startSlider();
      });
    });

    // Event listeners for arrows
    prevBtn.addEventListener('click', function() {
      prevSlide();
      stopSlider();
      startSlider();
    });

    nextBtn.addEventListener('click', function() {
      nextSlide();
      stopSlider();
      startSlider();
    });

    // Start the slider
    startSlider();


    document.addEventListener('DOMContentLoaded', function() {
      const gallerySection = document.querySelector('.gallery-section-wrapper');
      const galleryTrack = document.querySelector('.gallery-track');
      const progressBar = document.querySelector('.gallery-progress-bar');
      const cards = document.querySelectorAll('.gallery-card');
      
      // Calculate the maximum scroll distance
      const calculateMaxScroll = () => {
        return galleryTrack.scrollWidth - galleryTrack.parentElement.clientWidth;
      };
      
      // Calculate how many cards fit in the viewport
      const calculateVisibleCards = () => {
        const containerWidth = galleryTrack.parentElement.clientWidth;
        const cardWidth = cards[0].offsetWidth;
        const cardMargin = 32; // 2rem margin-right
        return Math.floor(containerWidth / (cardWidth + cardMargin));
      };
      
      // Show initial 4 cards
      const showInitialCards = () => {
        // Determine how many cards to show initially (4 or fewer if viewport is small)
        const visibleCount = Math.min(4, cards.length);
        
        for (let i = 0; i < visibleCount; i++) {
          setTimeout(() => {
            cards[i].classList.add('visible');
          }, i * 150);
        }
      };
      
      // Handle scroll event
      window.addEventListener('scroll', () => {
        // Calculate how far we've scrolled within the gallery section
        const sectionTop = gallerySection.offsetTop;
        const sectionHeight = gallerySection.offsetHeight;
        const scrollPosition = window.scrollY - sectionTop;
        const scrollPercentage = Math.min(Math.max(scrollPosition / (sectionHeight - window.innerHeight), 0), 1);
        
        // Move the gallery track based on scroll position
        const maxScroll = calculateMaxScroll();
        const translateX = -1 * scrollPercentage * maxScroll;
        galleryTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update progress bar
        progressBar.style.width = `${scrollPercentage * 100}%`;
        
        // Reveal cards as they come into view
        cards.forEach((card, index) => {
          const cardIndex = parseInt(card.dataset.index);
          if (cardIndex >= 4) { // Skip the initial 4 cards that are already visible
            const cardThreshold = (cardIndex - 3) / (cards.length - 4); // Normalize to 0-1 range
            if (scrollPercentage >= cardThreshold * 0.8) { // Show a bit earlier than exact threshold
              card.classList.add('visible');
            }
          }
        });
      });
      
      // Handle resize
      window.addEventListener('resize', () => {
        // Recalculate visible cards on resize
        showInitialCards();
      });
      
      // Initial setup
      showInitialCards();
    });

    // Tab switching functionality
  document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.events-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Get the tab data attribute
        const tabName = this.getAttribute('data-tab');
        
        // Hide all tab contents
        tabContents.forEach(content => {
          content.classList.remove('active');
        });
        
        // Show the selected tab content
        document.getElementById(`${tabName}-content`).classList.add('active');
      });
    });
    
    // Initialize AOS animation library if it exists
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true
      });
    } else {
      // If AOS is not available, add the aos-animate class to all elements
      document.querySelectorAll('[data-aos]').forEach(el => {
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, parseInt(el.getAttribute('data-aos-delay') || 0));
      });
    }
  });

    document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library if it exists
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true
      });
    } else {
      // If AOS is not available, add the aos-animate class to all elements
      document.querySelectorAll('[data-aos]').forEach(el => {
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, parseInt(el.getAttribute('data-aos-delay') || 0));
      });
    }
  });

  // Bible Study Modal Logic
(function() {
  const modal = document.getElementById('bibleStudyModalWindow');
  const openBtn = document.querySelector('#openBibleStudyModalBtn');
  const closeBtn = modal.querySelector('.bible-study-modal-close');
  const overlay = modal.querySelector('.bible-study-modal-overlay');

  function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
  }
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
      closeModal();
    }
  });
})();



        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileToggle = document.querySelector('.mobile-toggle');
            const mobileClose = document.querySelector('.mobile-close');
            const mobileMenu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('overlay');
            
            mobileToggle.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            mobileClose.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            overlay.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Header Scroll Effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Sermon Filtering
            const categoryFilter = document.getElementById('filter-category');
            const preacherFilter = document.getElementById('filter-preacher');
            const titleFilter = document.getElementById('filter-title');
            const sermonCards = document.querySelectorAll('.sermon-card');
            
            function filterSermons() {
                const category = categoryFilter.value.toLowerCase();
                const preacher = preacherFilter.value.toLowerCase();
                const title = titleFilter.value.toLowerCase();
                
                sermonCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category').toLowerCase();
                    const cardPreacher = card.getAttribute('data-preacher').toLowerCase();
                    const cardTitle = card.getAttribute('data-title').toLowerCase();
                    
                    let showCard = true;
                    
                    if (category && cardCategory !== category.toLowerCase()) {
                        showCard = false;
                    }
                    
                    if (preacher && cardPreacher !== preacher.toLowerCase()) {
                        showCard = false;
                    }
                    
                    if (title && !cardTitle.includes(title.toLowerCase())) {
                        showCard = false;
                    }
                    
                    if (showCard) {
                        card.style.display = '';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            }
            
            categoryFilter.addEventListener('change', filterSermons);
            preacherFilter.addEventListener('change', filterSermons);
            titleFilter.addEventListener('input', filterSermons);
            
            // View Toggle (Grid/List)
            const viewButtons = document.querySelectorAll('.btn-filter');
            const sermonsGrid = document.getElementById('sermons-grid');
            
            viewButtons.forEach(button => {
                button.addEventListener('click', function() {
                    viewButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    const view = this.getAttribute('data-view');
                    if (view === 'grid') {
                        sermonsGrid.classList.remove('sermons-list');
                        sermonsGrid.classList.add('sermons-grid');
                    } else {
                        sermonsGrid.classList.remove('sermons-grid');
                        sermonsGrid.classList.add('sermons-list');
                    }
                });
            });
            
            // Custom Audio Player
            const audioPlayers = document.querySelectorAll('.audio-player');
            
            audioPlayers.forEach(player => {
                const playBtn = player.querySelector('.audio-play-btn');
                const progressContainer = player.querySelector('.audio-progress-container');
                const progress = player.querySelector('.audio-progress');
                const currentTimeEl = player.querySelector('.current-time');
                const totalTimeEl = player.querySelector('.total-time');
                const audioSrc = player.getAttribute('data-src');
                
                const audio = new Audio(audioSrc);
                let isPlaying = false;
                
                // Format time in minutes and seconds
                function formatTime(seconds) {
                    const minutes = Math.floor(seconds / 60);
                    const secs = Math.floor(seconds % 60);
                    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
                }
                
                // Update progress bar
                function updateProgress() {
                    const percent = (audio.currentTime / audio.duration) * 100;
                    progress.style.width = `${percent}%`;
                    currentTimeEl.textContent = formatTime(audio.currentTime);
                }
                
                // Set audio duration when metadata is loaded
                audio.addEventListener('loadedmetadata', () => {
                    totalTimeEl.textContent = formatTime(audio.duration);
                    currentTimeEl.textContent = '0:00';
                });
                
                // Update progress as audio plays
                audio.addEventListener('timeupdate', updateProgress);
                
                // Play/Pause toggle
                playBtn.addEventListener('click', () => {
                    if (isPlaying) {
                        audio.pause();
                        playBtn.innerHTML = '<i class="fas fa-play"></i>';
                        isPlaying = false;
                    } else {
                        // Pause all other audio players first
                        audioPlayers.forEach(p => {
                            if (p !== player) {
                                const otherAudio = new Audio(p.getAttribute('data-src'));
                                otherAudio.pause();
                                const otherPlayBtn = p.querySelector('.audio-play-btn');
                                otherPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                            }
                        });
                        
                        audio.play();
                        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        isPlaying = true;
                    }
                });
                
                // Click on progress bar to seek
                progressContainer.addEventListener('click', (e) => {
                    const clickPosition = e.offsetX / progressContainer.offsetWidth;
                    audio.currentTime = clickPosition * audio.duration;
                    updateProgress();
                });
                
                // Reset player when audio ends
                audio.addEventListener('ended', () => {
                    audio.currentTime = 0;
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    isPlaying = false;
                });
            });
            
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Lazy load images
            if ('IntersectionObserver' in window) {
                const imgObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            const src = img.getAttribute('data-src');
                            if (src) {
                                img.src = src;
                                img.removeAttribute('data-src');
                            }
                            observer.unobserve(img);
                        }
                    });
                });
                
                document.querySelectorAll('img[data-src]').forEach(img => {
                    imgObserver.observe(img);
                });
            }
        });
   

        
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileToggle = document.querySelector('.mobile-toggle');
            const mobileClose = document.querySelector('.mobile-close');
            const mobileMenu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('overlay');
            
            mobileToggle.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            mobileClose.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            overlay.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Header Scroll Effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Tab Functionality
            const tabs = document.querySelectorAll('.mvh-tab');
            const panels = document.querySelectorAll('.mvh-panel');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    tabs.forEach(t => t.classList.remove('active'));
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Hide all panels
                    panels.forEach(panel => panel.classList.remove('active'));
                    
                    // Show the corresponding panel
                    const panelId = this.getAttribute('data-tab');
                    const panel = document.querySelector(`.mvh-panel[data-panel="${panelId}"]`);
                    panel.classList.add('active');
                });
            });
            
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Lazy load images
            if ('IntersectionObserver' in window) {
                const imgObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            const src = img.getAttribute('data-src');
                            if (src) {
                                img.src = src;
                                img.removeAttribute('data-src');
                            }
                            observer.unobserve(img);
                        }
                    });
                });
                
                document.querySelectorAll('img[data-src]').forEach(img => {
                    imgObserver.observe(img);
                });
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    
    // Check if elements exist to prevent errors
    if (mobileToggle && mobileClose && mobileMenu && overlay) {
      // Add click event listener to mobile toggle button
      mobileToggle.addEventListener('click', function() {
        console.log('Mobile toggle clicked'); // For debugging
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
      
      // Add click event listener to close button
      mobileClose.addEventListener('click', function() {
        console.log('Mobile close clicked'); // For debugging
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
      
      // Add click event listener to overlay
      overlay.addEventListener('click', function() {
        console.log('Overlay clicked'); // For debugging
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    } else {
      console.error('One or more mobile menu elements not found');
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileToggle = document.querySelector('.mobile-toggle');
            const mobileClose = document.querySelector('.mobile-close');
            const mobileMenu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('overlay');
            
            mobileToggle.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            mobileClose.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            overlay.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Header Scroll Effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Tab Functionality
            const tabs = document.querySelectorAll('.mvh-tab');
            const panels = document.querySelectorAll('.mvh-panel');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    tabs.forEach(t => t.classList.remove('active'));
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Hide all panels
                    panels.forEach(panel => panel.classList.remove('active'));
                    
                    // Show the corresponding panel
                    const panelId = this.getAttribute('data-tab');
                    const panel = document.querySelector(`.mvh-panel[data-panel="${panelId}"]`);
                    panel.classList.add('active');
                });
            });
            
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Animation for leader cards on scroll
            if ('IntersectionObserver' in window) {
                const leaderCards = document.querySelectorAll('.leader-card');
                
                const leaderObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                            leaderObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1
                });
                
                leaderCards.forEach(card => {
                    leaderObserver.observe(card);
                });
            }
        });
   
 