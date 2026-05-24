// DOM Elements
const voiceToggle = document.getElementById('voiceToggle');

// Mobile Navbar Close Logic
const navbarCollapse = document.getElementById('navbarNav');
const navLinks = document.querySelectorAll('.nav-link');

if (navLinks.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const isMobile = window.innerWidth < 992;
      const isExpanded = navbarCollapse && navbarCollapse.classList.contains('show');
      
      if (isMobile && isExpanded) {
        // Use Bootstrap's native API to close the menu
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
}

// Simple Profile Pic Modal
const profilePic = document.getElementById("profilePic");
if (profilePic) {
  profilePic.addEventListener('click', () => {
    // Zoom/flash profile picture slightly or display a fun console message
    console.log("Hey there! Thanks for visiting my portfolio!");
  });
}

// Scroll Animation (Intersection Observer)
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

const observerOptions = {
  threshold: 0.05,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');

      // Stagger reveal elements
      const reveals = entry.target.querySelectorAll('.reveal');
      reveals.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('show');
        }, i * 120);
      });

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const homeHeader = document.querySelector('header');
if (homeHeader) observer.observe(homeHeader);

sections.forEach(section => {
  observer.observe(section);
});

// Active Link Highlighting & Navbar Shrink
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= (sectionTop - 250)) {
      current = section.getAttribute('id');
    }
  });

  if (window.scrollY < 100) current = 'home';

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });

  if (window.scrollY > 50) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    projectItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0) scale(1)';
        }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Project Modals Data & Operations
const projectsData = {
  church: {
    title: 'Gateway Church Website',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=600&q=80',
    desc: 'A modern, highly responsive, and aesthetically premium website built to showcase parish schedules, online donation options, community announcements, and digital outreach. Designed for high accessibility and seamless performance.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Vercel'],
    liveLink: 'https://gatewaychurch.vercel.app/',
    githubLink: 'https://github.com/abhishekkarthi7'
  }
};

const projectModal = document.getElementById('projectModal');
const modalProjectImg = document.getElementById('modal-project-img');
const modalProjectCat = document.getElementById('modal-project-category');
const modalProjectTitle = document.getElementById('modal-project-title');
const modalProjectDesc = document.getElementById('modal-project-desc');
const modalProjectTech = document.getElementById('modal-project-tech');
const modalProjectLink = document.getElementById('modal-project-link');
const modalProjectGithub = document.getElementById('modal-project-github');

function showProjectDetails(id) {
  const project = projectsData[id];
  if (!project || !projectModal) return;

  modalProjectImg.src = project.image;
  // Handle fallback source for missing images
  modalProjectImg.onerror = () => {
    if (id === 'church') modalProjectImg.src = 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=600&q=80';
    else modalProjectImg.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
  };

  modalProjectCat.textContent = project.category;
  modalProjectTitle.textContent = project.title;
  modalProjectDesc.textContent = project.desc;

  // Tech tags rendering removed as requested by user

  // Action links
  modalProjectLink.href = project.liveLink;
  if (project.liveLink === '#') {
    modalProjectLink.style.display = 'none';
  } else {
    modalProjectLink.style.display = 'inline-flex';
  }
  
  modalProjectGithub.href = project.githubLink;

  projectModal.style.display = 'flex';
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.style.display = 'none';
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

// Tilt Effect for Cards (Desktop)
function initTilt() {
  const cards = document.querySelectorAll('.project-card, .skill-card, .image-border');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // Max rotation degrees
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}



// Voice Control & Tour Logic
function initVoiceControl() {
  const btn = document.getElementById('voiceToggle');
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!Recognition) {
    console.warn('Speech Recognition not supported in this browser');
    if (btn) {
      btn.style.display = 'none';
      btn.title = 'Voice control not supported in this browser';
    }
    return;
  }
  
  if (!btn) return;
  
  const recognition = new Recognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;
  
  let active = false;
  let isListening = false;
  const synth = window.speechSynthesis;
  let tts = true;
  
  try {
    const saved = localStorage.getItem('voice_tts');
    if (saved !== null) tts = JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load TTS preference:', e);
  }
  
  function speak(text, onEnd) {
    if (!tts || !synth || !text) {
      if (onEnd) onEnd();
      return;
    }
    
    try {
      synth.cancel();
      showVoiceFeedback('Speaking...');
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onstart = () => { showVoiceFeedback('Speaking...'); };
      utterance.onend = () => { hideVoiceFeedback(); if (onEnd) onEnd(); };
      utterance.onerror = () => { hideVoiceFeedback(); if (onEnd) onEnd(); };
      
      synth.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis error:', e);
      hideVoiceFeedback();
      if (onEnd) onEnd();
    }
  }

  function speakPromise(text) {
    return new Promise(resolve => speak(text, resolve));
  }

  async function startPortfolioTour() {
    speak('Starting your personal tour of Abhishek\'s portfolio. Sit back and enjoy!');
    
    const steps = [
      { 
        selector: '#home', 
        action: () => { smoothScrollTo('#home'); highlightSection('#home'); },
        text: 'We begin at the Home section. Here you can find Abhishek\'s quick introduction as a web developer and cloud computing enthusiast, along with his social links and contact gateways.'
      },
      { 
        selector: '#about', 
        action: () => { smoothScrollTo('#about'); highlightSection('#about'); },
        text: 'Next, the About section. Abhishek focuses on web development and cloud computing. He is an NSS Volunteer and Cloud Practitioner passionate about solving real-world challenges.'
      },
      { 
        selector: '#certifications', 
        action: () => { smoothScrollTo('#certifications'); highlightSection('#certifications'); },
        text: 'Moving to Certifications. Abhishek holds an Operating System Fundamentals certification from NPTEL.'
      },
      { 
        selector: '#portfolio', 
        action: () => { smoothScrollTo('#portfolio'); highlightSection('#portfolio'); },
        text: 'In the Projects section, you can explore Abhishek\'s web project, the Gateway Church website, built with modern responsive designs.'
      },
      { 
        selector: '#contact', 
        action: () => { smoothScrollTo('#contact'); highlightSection('#contact'); },
        text: 'That concludes our tour. You can reach out to Abhishek through the contact form or social links. Thank you for visiting!'
      }
    ];

    for (const step of steps) {
      step.action();
      await speakPromise(step.text);
      await new Promise(r => setTimeout(r, 1200));
    }
  }
  
  function showVoiceFeedback(message) {
    let feedback = document.querySelector('.voice-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'voice-feedback';
      document.body.appendChild(feedback);
    }
    feedback.textContent = message;
    feedback.classList.add('show');
  }
  
  function hideVoiceFeedback() {
    const feedback = document.querySelector('.voice-feedback');
    if (feedback) {
      setTimeout(() => {
        feedback.classList.remove('show');
      }, 500);
    }
  }
  
  function setActive(on) {
    active = on;
    isListening = on;
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = on ? 'bi bi-mic-mute-fill' : 'bi bi-mic-fill';
    }
    btn.classList.toggle('active', on);
    btn.style.background = on ? 'var(--text-headings)' : '';
    btn.style.color = on ? '#ffffff' : '';
    btn.title = on ? 'Voice control active - Click to stop' : 'Click to start voice control';
  }
  
  function smoothScrollTo(selector) {
    try {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  
  function openSocial(label) {
    try {
      const link = document.querySelector(`.social-links a[aria-label="${label}"]`);
      if (link) { link.click(); return true; }
      return false;
    } catch (e) {
      return false;
    }
  }
  

  function filterProjects(kind) {
    try {
      const button = document.querySelector(`.filter-btn[data-filter="${kind}"]`);
      if (button) { button.click(); return true; }
      return false;
    } catch (e) {
      return false;
    }
  }

  function handleVoiceCommand(cmd) {
    const c = cmd.toLowerCase();
    
    if (c.includes('about abhishek') || c.includes('who is abhishek')) {
      explainAbhishek();
      return;
    }
    if (c.includes('start tour') || c.includes('introduce yourself') || c.includes('tour portfolio')) {
      startPortfolioTour();
      return;
    }
    if (c.includes('explain portfolio') || c.includes('portfolio overview')) {
      explainPortfolioOverview();
      return;
    }
    if (c.includes('show projects') || c.includes('tell me about projects')) {
      explainProjects();
      return;
    }

    if (c.includes('show certifications') || c.includes('tell me about certifications')) {
      explainCertifications();
      return;
    }
    
    const secMatch = c.match(/(go to|navigate to|open|show) (home|about|certifications|projects|portfolio|contact)/);
    if (secMatch) {
      const map = { 
        home: '#home', about: '#about', 
        certifications: '#certifications', projects: '#portfolio', portfolio: '#portfolio', 
        contact: '#contact' 
      };
      smoothScrollTo(map[secMatch[2]]);
      speak('Navigating to ' + secMatch[2]);
      return;
    }
    if (c.includes('scroll down')) {
      window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
      speak('Scrolling down');
      return;
    }
    if (c.includes('scroll up')) {
      window.scrollBy({ top: -window.innerHeight * 0.7, behavior: 'smooth' });
      speak('Scrolling up');
      return;
    }
    if (c.includes('top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      speak('Top of page');
      return;
    }
    if (c.includes('bottom')) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      speak('Bottom of page');
      return;
    }

    if (c.includes('open github')) {
      openSocial('GitHub');
      speak('Opening GitHub');
      return;
    }
    if (c.includes('open linkedin')) {
      openSocial('LinkedIn');
      speak('Opening LinkedIn');
      return;
    }
    if (c.includes('open instagram') || c.includes('open insta')) {
      openSocial('Instagram');
      speak('Opening Instagram');
      return;
    }
    if (c.includes('open whatsapp')) {
      openSocial('WhatsApp');
      speak('Opening WhatsApp');
      return;
    }
    
    if (c.includes('close project') || c.includes('close modal')) {
      closeProjectModal();
      speak('Closing details');
      return;
    }

    const projFilterMatch = c.match(/(filter|show) (all|web|cloud|other) projects/);
    if (projFilterMatch) {
      filterProjects(projFilterMatch[2]);
      speak('Filtering by ' + projFilterMatch[2]);
      return;
    }
    
    if (c.includes('help') || c.includes('what can you do')) {
      speak('You can navigate sections, filter projects, or start a tour of the portfolio.');
      return;
    }
    if (c.includes('stop listening') || c.includes('deactivate voice')) {
      btn.click();
      return;
    }
  }

  btn.addEventListener('click', () => {
    try {
      if (!active) {
        if (navigator.permissions) {
          navigator.permissions.query({ name: 'microphone' }).then((result) => {
            if (result.state === 'denied') {
              speak('Microphone access is denied. Please enable it in browser settings.');
              return;
            }
            startVoiceRecognition();
          }).catch(() => {
            startVoiceRecognition();
          });
        } else {
          startVoiceRecognition();
        }
      } else {
        speak('Voice control deactivated');
        recognition.stop();
        setActive(false);
      }
    } catch (e) {
      setActive(false);
    }
  });
  
  function startVoiceRecognition() {
    try {
      recognition.start();
      setActive(true);
      showVoiceFeedback('Listening...');
      speak('Voice control active. How can I help you?');
    } catch (e) {
      speak('Could not initialize microphone. Please check permission settings.');
      setActive(false);
    }
  }
  
  recognition.addEventListener('result', (event) => {
    try {
      const result = event.results[event.results.length - 1];
      if (result && result[0]) {
        const transcript = result[0].transcript.trim();
        const confidence = result[0].confidence || 0;
        
        showVoiceFeedback(`"${transcript}"`);
        
        if (confidence > 0.45) {
          setTimeout(() => {
            handleVoiceCommand(transcript);
          }, 500);
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
  
  recognition.addEventListener('error', (event) => {
    console.error('Recognition error:', event.error);
    if (event.error === 'not-allowed') {
      speak('Microphone access denied. Please allow microphone access.');
      setActive(false);
    }
  });
  
  recognition.addEventListener('start', () => {
    isListening = true;
    showVoiceFeedback('Listening...');
  });
  
  recognition.addEventListener('end', () => {
    isListening = false;
    if (active) {
      try {
        setTimeout(() => {
          if (active && !isListening) {
            recognition.start();
          }
        }, 100);
      } catch (e) {
        setActive(false);
      }
    }
  });
}

// Portfolio explanation helpers
function explainAbhishek() {
  const text = `Abhishek Karthi is a Computer Science student. He focuses on web development and cloud computing. He is an NSS Volunteer and Cloud Practitioner passionate about building applications and solving problems.`;
  smoothScrollTo('#about');
  highlightSection('#about');
  speak(text);
}

function explainPortfolioOverview() {
  const text = `This portfolio displays Abhishek's projects, certifications, and contact information. You can start a tour to learn more about each section.`;
  speak(text);
}

function explainProjects() {
  smoothScrollTo('#portfolio');
  highlightSection('#portfolio');
  const text = `Abhishek designed and developed the Gateway Church website, featuring modern responsive web development. You can explore the live demo or source code right here.`;
  speak(text);
}



function explainCertifications() {
  smoothScrollTo('#certifications');
  highlightSection('#certifications');
  const text = `His certifications include Operating System Fundamentals from NPTEL.`;
  speak(text);
}

function highlightSection(selector) {
  const element = document.querySelector(selector);
  if (!element) return;
  
  element.style.transition = 'all 0.3s ease';
  element.style.boxShadow = '0 0 35px var(--accent-glow)';
  element.style.transform = 'scale(1.015)';
  
  setTimeout(() => {
    element.style.boxShadow = '';
    element.style.transform = '';
  }, 3000);
}

// Command Palette (Ctrl+K)
function initCommandPalette() {
  const overlay = document.getElementById('cmdkOverlay');
  const input = document.getElementById('cmdkInput');
  const list = document.getElementById('cmdkList');
  if (!overlay || !input || !list) return;

  let items = [];
  let filtered = [];
  let index = 0;

  function build() {
    const arr = [];
    
    // Go to sections
    navLinks.forEach(a => {
      const t = a.textContent.trim();
      const href = a.getAttribute('href');
      arr.push({ 
        label: 'Go to ' + t, 
        group: 'Navigation', 
        run: () => { smoothScrollTo(href); } 
      });
    });

    // Social
    const socials = [
      ['GitHub', 'GitHub'], ['LinkedIn', 'LinkedIn'], 
      ['Instagram', 'Instagram'], ['WhatsApp', 'WhatsApp']
    ];
    socials.forEach(s => {
      arr.push({ 
        label: 'Open ' + s[0], 
        group: 'Social', 
        run: () => { openSocial(s[1]); } 
      });
    });

    // Actions
    arr.push({ label: 'Start Voice Tour', group: 'Actions', run: () => startPortfolioTour() });
    arr.push({ label: 'Filter Web Projects', group: 'Actions', run: () => filterProjects('web') });
    arr.push({ label: 'Filter Cloud Projects', group: 'Actions', run: () => filterProjects('cloud') });
    arr.push({ label: 'Filter All Projects', group: 'Actions', run: () => filterProjects('all') });

    items = arr;
  }

  function show() {
    build();
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    input.value = '';
    filter('');
    setTimeout(() => input.focus(), 0);
  }

  function hide() {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function filter(q) {
    const s = q.trim().toLowerCase();
    filtered = !s ? items : items.filter(i => i.label.toLowerCase().includes(s));
    render();
  }

  function render() {
    index = 0;
    list.innerHTML = '';
    filtered.forEach((it, i) => {
      const d = document.createElement('div');
      d.className = 'cmdk-item' + (i === index ? ' active' : '');
      d.setAttribute('data-idx', String(i));
      d.textContent = it.label;
      d.addEventListener('mouseenter', () => { setActive(i); });
      d.addEventListener('click', () => { run(i); });
      list.appendChild(d);
    });
  }

  function setActive(i) {
    index = Math.max(0, Math.min(i, filtered.length - 1));
    list.querySelectorAll('.cmdk-item').forEach((el, idx) => {
      if (idx === index) el.classList.add('active'); else el.classList.remove('active');
    });
  }

  function run(i) {
    const it = filtered[i];
    if (it && it.run) it.run();
    hide();
  }

  input.addEventListener('input', () => filter(input.value));
  
  document.addEventListener('keydown', e => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('show')) hide(); else show();
    }
    
    if (overlay.classList.contains('show')) {
      if (e.key === 'Escape') {
        e.preventDefault();
        hide();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(index + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(index - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        run(index);
      }
    }
  });

  window.openCommandPalette = show;
  window.closeCommandPalette = hide;
}

// Contact Form submission logic
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    formStatus.textContent = 'SENDING MESSAGE...';
    formStatus.style.color = 'var(--accent)';
    
    setTimeout(() => {
      formStatus.textContent = 'MESSAGE SENT SUCCESSFULLY! ABHISHEK WILL GET BACK TO YOU SOON.';
      formStatus.style.color = 'var(--accent3)';
      contactForm.reset();
    }, 1200);
  });
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  
  if (window.matchMedia("(min-width: 768px)").matches) {
    initTilt();
  }
  
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typed.js removed because role section is static now
  
  initVoiceControl();
  initCommandPalette();
  
  // Dynamic Visitor Count
  async function updateVisitorCount() {
    const counterEl = document.getElementById('visitor-count');
    if (!counterEl) return;
    
    try {
      const response = await fetch('https://api.counterapi.dev/v1/abhishekkarthi_portfolio/visits/up');
      const data = await response.json();
      
      if (data && data.count) {
        counterEl.textContent = data.count.toLocaleString();
      } else {
        counterEl.textContent = 'Active';
      }
    } catch (err) {
      counterEl.textContent = 'Live';
    }
  }
  updateVisitorCount();
});

// Expose modal details function globally so inline click handlers work
window.showProjectDetails = showProjectDetails;
window.closeProjectModal = closeProjectModal;
