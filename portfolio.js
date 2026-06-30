/* ==========================================
   Client Logic: 3D Interactive Portfolio
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  let portfolioData = null;

  // Local fallback data in case of CORS block when opening index.html directly via file:// protocol
  const fallbackData = {
    "profile": {
      "name": "Kalamalla Sudheer Basha",
      "title": "Data Analyst & Full Stack Developer",
      "email": "ksudheerbasha721@gmail.com",
      "phone": "+91 7981292208",
      "location": "Hyderabad, Telangana",
      "github": "https://github.com/Sudheer-basha",
      "linkedin": "https://www.linkedin.com/in/kalamalla-sudheer-basha-43793b298/",
      "avatar": "uploads/avatar.jpg",
      "resumeUrl": "uploads/Kalamalla_Sudheer_Basha_Resume.pdf",
      "bio": "Motivated MCA graduate and IT professional with hands-on experience in full life-cycle software implementation, business & technology solutions, and business user engagement. Proficient in Python, SQL, React.js, FastAPI, Power BI, and Docker.",
      "aboutText": "Hello! I am Kalamalla Sudheer Basha, a motivated computer applications postgraduate and data analyst. I love writing clean, maintainable code, building intelligent systems, and solving complex data processing challenges. My primary technical stack revolves around Python, SQL, React.js, FastAPI, Power BI, and Docker. In my spare time, I explore AI models, LLMs, and RAG architectures to construct intelligent digital assistants and analytics dashboards."
    },
    "theme": {
      "primary": "#007bff",
      "accent": "#00b4d8",
      "gradientStart": "#007bff",
      "gradientEnd": "#6f42c1"
    },
    "skills": [
      { "category": "Backend", "name": "Python", "rating": 92 },
      { "category": "Database", "name": "SQL", "rating": 90 },
      { "category": "Frontend", "name": "JavaScript", "rating": 82 },
      { "category": "Backend", "name": "FastAPI", "rating": 90 },
      { "category": "Database", "name": "PostgreSQL 15", "rating": 88 },
      { "category": "Tools", "name": "Docker & Compose", "rating": 85 },
      { "category": "Tools", "name": "Power BI & Tableau", "rating": 90 },
      { "category": "Backend", "name": "RAG & LLM Eng.", "rating": 85 },
      { "category": "Tools", "name": "GitHub Actions", "rating": 80 },
      { "category": "Tools", "name": "Pandas & NumPy", "rating": 90 },
      { "category": "Database", "name": "SQLite3", "rating": 90 }
    ],
    "projects": [
      {
        "id": "project-tutor",
        "title": "AI Data Science Tutor",
        "tech": "FastAPI, React.js, PostgreSQL, Docker, Gemini API",
        "description": "Developed a mastery-based learning management system enforcing progression locks to guarantee concept mastery. Integrated a context-aware AI Tutor chat utilizing the Gemini 2.5 Flash API with RAG prompting based on lesson materials for instant concept explanations and query resolution.",
        "challenge": "Implementing progression locks to guarantee concept mastery and automated script feedback.",
        "solution": "Engineered an automated Python script evaluator providing line-by-line constructive feedback, and a dynamic PDF certificate generator using ReportLab's vector coordinates.",
        "future": "Integrate more coding languages and expand course catalogs.",
        "liveLink": "#",
        "githubLink": "https://github.com",
        "screenshot": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
      },
      {
        "id": "project-resume",
        "title": "AI Resume Agent",
        "tech": "FastAPI, Tailwind CSS, SQLite, Docker, Groq API (Llama 3.3)",
        "description": "Engineered an automated ATS customizer that extracts resume text and compares it against Job Descriptions using a pre-check filter to flag skill and experience gaps before application.",
        "challenge": "Handling complex parsing of PDFs and rewriting bullet points while maintaining factual consistency.",
        "solution": "Leveraged Groq's Llama 3.3 70B model to dynamically rewrite and optimize candidate summary and bullet points to match target job descriptions while ensuring factual consistency. Built a local CRM database dashboard tracking companies, role match scores, application status, and automated Word file generation.",
        "future": "Integrate multi-file batch parsing and template customization.",
        "liveLink": "#",
        "githubLink": "https://github.com",
        "screenshot": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop"
      },
      {
        "id": "project-jobpulse",
        "title": "JobPulse",
        "tech": "FastAPI, HTML5, CSS3, SQLite, GitHub Actions, python-jobspy, Pandas",
        "description": "Designed a web-based Job Search CRM and automation scanner crawling job vacancies across major job boards and ATS platforms. Implemented dynamic experience filtering and key-phrase rules to eliminate mid-to-senior roles, focusing exclusively on entry-level IT and developer roles.",
        "challenge": "Relevance ranking of crawled job postings relative to candidate background.",
        "solution": "Created a custom RAG search capability using a TF-IDF Cosine Similarity engine to query jobs and rank vacancies by relevance score using candidate resume text.",
        "future": "Support automated background scraping on a cron scheduler and WhatsApp alerts.",
        "liveLink": "tracker.html",
        "githubLink": "https://github.com",
        "screenshot": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop"
      }
    ],
    "education": [
      {
        "degree": "Master of Computer Applications (MCA)",
        "institution": "Spirits College of MCA, Kadapa, AP",
        "period": "2024 - 2026",
        "score": "Score: 8.4 / 10.0"
      },
      {
        "degree": "B.Sc. in Mathematics, Statistics, and Computer Science",
        "institution": "Loyola Degree College, Pulivendula, AP",
        "period": "2021 - 2024",
        "score": "Score: 7.1 / 10.0"
      }
    ],
    "certifications": [
      {
        "title": "Python Intern Developer",
        "issuer": "ShadowMinds Technologies",
        "date": "2024",
        "verifyLink": "#",
        "badge": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=150&auto=format&fit=crop"
      },
      {
        "title": "Data Analyst Simulation",
        "issuer": "Forage",
        "date": "2024",
        "verifyLink": "#",
        "badge": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=150&auto=format&fit=crop"
      },
      {
        "title": "Python for Data Science",
        "issuer": "Cognitive Class",
        "date": "2023",
        "verifyLink": "#",
        "badge": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=150&auto=format&fit=crop"
      }
    ],
    "achievements": [
      "Engaged with real-world business users to design and deliver automation scripts to non-technical stakeholders.",
      "Integrated a TF-IDF Cosine Similarity engine for advanced resume relevance ranking in JobPulse.",
      "Engineered custom script evaluators providing constructive feedback on code submissions."
    ],
    "services": [
      {
        "title": "Data Analytics & Pipelines",
        "description": "Orchestrating high-performance data processing pipelines using Pandas, NumPy, and databases like PostgreSQL."
      },
      {
        "title": "AI & RAG Engineering",
        "description": "Integrating LLMs (Llama 3.3, Gemini) using context-aware RAG prompts and vector similarities."
      },
      {
        "title": "Full Stack API Development",
        "description": "Building light, rapid endpoints using FastAPI coupled with React.js or responsive Bootstrap 5 views."
      }
    ]
  };

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Fetch & Render Portfolio Configuration
  fetch('data/portfolio.json')
    .then(res => {
      if (!res.ok) throw new Error('Data fetch failed');
      return res.json();
    })
    .then(data => {
      portfolioData = data;
      renderProfile(data.profile);
      renderServices(data.services);
      renderSkills(data.skills);
      renderProjects(data.projects);
      renderEducation(data.education);
      renderCertifications(data.certifications);
      renderAchievements(data.achievements);

      // Re-trigger icon rendering for dynamically added lucide elements
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // Initialize dynamic animations after loading content
      initScrollAnimations();
      initSkillsSphere(data.skills);
    })
    .catch(err => {
      console.warn('Fetch failed, using local fallback data:', err);
      portfolioData = fallbackData;
      renderProfile(fallbackData.profile);
      renderServices(fallbackData.services);
      renderSkills(fallbackData.skills);
      renderProjects(fallbackData.projects);
      renderEducation(fallbackData.education);
      renderCertifications(fallbackData.certifications);
      renderAchievements(fallbackData.achievements);

      // Re-trigger icon rendering for dynamically added lucide elements
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // Initialize dynamic animations after loading content
      initScrollAnimations();
      initSkillsSphere(fallbackData.skills);
    });

  // 2. Render Functions
  function renderProfile(profile) {
    if (!profile) return;
    
    // Set titles/names
    document.title = `${profile.name} | 3D Interactive Portfolio`;
    const heroName = document.getElementById('hero-main-name');
    if (heroName) heroName.innerText = profile.name;
    
    // Short bio and text
    const shortBio = document.getElementById('hero-short-bio');
    if (shortBio) shortBio.innerText = profile.bio;
    
    const aboutBio = document.getElementById('about-bio-text');
    if (aboutBio) aboutBio.innerText = profile.aboutText;

    // Contact details
    const locVal = document.getElementById('about-location-val');
    if (locVal) locVal.innerText = profile.location;
    const cLocVal = document.getElementById('contact-location-val');
    if (cLocVal) cLocVal.innerText = profile.location;

    const emailContact = document.getElementById('contact-email-val');
    if (emailContact) emailContact.innerText = profile.email;
    const phoneContact = document.getElementById('contact-phone-val');
    if (phoneContact) phoneContact.innerText = profile.phone;

    // Avatar / Photo
    const avatar = document.getElementById('about-avatar');
    if (avatar && profile.avatar) {
      avatar.src = profile.avatar;
    }

    // Links
    const githubLink = document.getElementById('hero-github-link');
    if (githubLink) githubLink.href = profile.github || '#';
    
    const linkedinLink = document.getElementById('hero-linkedin-link');
    if (linkedinLink) linkedinLink.href = profile.linkedin || '#';
    
    const emailLink = document.getElementById('hero-email-link');
    if (emailLink) emailLink.href = `mailto:${profile.email}`;

    // Resume button
    const resumeBtn = document.getElementById('resume-download-btn');
    if (resumeBtn) {
      resumeBtn.href = profile.resumeUrl || '#';
      if (!profile.resumeUrl || profile.resumeUrl === '#') {
        resumeBtn.classList.add('d-none');
      } else {
        resumeBtn.classList.remove('d-none');
      }
    }
  }

  function renderServices(services) {
    const target = document.getElementById('services-target');
    if (!target || !services) return;
    
    target.innerHTML = '';
    services.forEach((service, index) => {
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-md-4';
      col.innerHTML = `
        <div class="service-mini-card h-100">
          <h5 class="fw-bold fs-7 mb-2 text-dark d-flex align-items-center gap-2">
            <span class="text-primary font-monospace fs-8">0${index+1}.</span> ${service.title}
          </h5>
          <p class="small text-muted mb-0">${service.description}</p>
        </div>
      `;
      target.appendChild(col);
    });
  }

  function renderSkills(skills) {
    const target = document.getElementById('skills-bars-target');
    if (!target || !skills) return;

    target.innerHTML = '';
    // Show top 6 skills in horizontal progress bars
    const displaySkills = skills.slice(0, 6);
    displaySkills.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-bar-card';
      card.innerHTML = `
        <div class="d-flex justify-content-between mb-1.5 fs-7">
          <span class="fw-bold text-dark-gray">${skill.name}</span>
          <span class="text-muted font-monospace">${skill.rating}%</span>
        </div>
        <div class="skill-bar-progress">
          <div class="skill-bar-fill" data-percent="${skill.rating}"></div>
        </div>
      `;
      target.appendChild(card);
    });
  }

  function renderProjects(projects) {
    const target = document.getElementById('projects-grid-target');
    if (!target || !projects) return;

    target.innerHTML = '';
    projects.forEach(project => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4';
      
      // Default fallback screenshot
      const screenshot = project.screenshot || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop';
      
      col.innerHTML = `
        <div class="project-card d-flex flex-column h-100">
          <div class="project-image-wrapper">
            <img src="${screenshot}" alt="${project.title}">
          </div>
          <div class="project-card-body flex-grow-1">
            <div class="mb-2">
              <span class="badge bg-light text-primary border rounded-pill px-2.5 py-1 fs-9 font-monospace">${project.tech.split(',')[0]}</span>
            </div>
            <h3 class="fw-bold h5 text-dark mb-2.5">${project.title}</h3>
            <p class="small text-muted mb-0 line-clamp-3">${project.description}</p>
          </div>
          <div class="project-card-footer d-flex justify-content-between align-items-center">
            <button class="btn btn-link p-0 text-decoration-none text-primary fw-semibold fs-7 btn-view-details" data-project-id="${project.id}">
              Details <i data-lucide="info" class="icon-sm ms-1"></i>
            </button>
            <div class="d-flex gap-2">
              ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="text-muted hover-link" aria-label="Live Demo"><i data-lucide="external-link" class="icon-sm"></i></a>` : ''}
              ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="text-muted hover-link" aria-label="GitHub Repository"><i data-lucide="github" class="icon-sm"></i></a>` : ''}
            </div>
          </div>
        </div>
      `;
      target.appendChild(col);
    });

    // Modal view handlers
    document.querySelectorAll('.btn-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-project-id');
        const proj = projects.find(p => p.id === id);
        if (proj) openProjectModal(proj);
      });
    });
  }

  function renderEducation(education) {
    const target = document.getElementById('education-timeline-target');
    if (!target || !education) return;

    target.innerHTML = '';
    education.forEach((edu, index) => {
      const isLeft = index % 2 === 0;
      const item = document.createElement('div');
      item.className = `timeline-item ${isLeft ? 'timeline-item-left' : 'timeline-item-right'}`;
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <span class="badge bg-light text-primary border rounded-pill px-2.5 py-1 mb-2 font-monospace fs-8">${edu.period}</span>
          <h4 class="fw-bold h5 text-dark mb-1">${edu.degree}</h4>
          <p class="small text-dark-gray fw-semibold mb-2">${edu.institution}</p>
          <p class="small text-muted font-monospace mb-0">${edu.score}</p>
        </div>
      `;
      target.appendChild(item);
    });
  }

  function renderCertifications(certs) {
    const target = document.getElementById('certifications-grid-target');
    if (!target || !certs) return;

    target.innerHTML = '';
    certs.forEach(cert => {
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-md-4 cert-item-card';
      col.setAttribute('data-issuer', cert.issuer);
      
      const badge = cert.badge || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=80&auto=format&fit=crop';
      
      col.innerHTML = `
        <div class="cert-card d-flex flex-column justify-content-between h-100">
          <div>
            <div class="cert-badge-wrapper">
              <img src="${badge}" alt="${cert.issuer}">
            </div>
            <h4 class="fw-bold h6 text-dark mb-1">${cert.title}</h4>
            <p class="small text-muted mb-0">${cert.issuer} &bull; ${cert.date}</p>
          </div>
          <div class="mt-3 text-end">
            <a href="${cert.verifyLink}" target="_blank" class="btn btn-link p-0 text-decoration-none text-primary fs-8 fw-semibold d-inline-flex align-items-center gap-1">
              Verify Credentials <i data-lucide="arrow-up-right" class="icon-xs"></i>
            </a>
          </div>
        </div>
      `;
      target.appendChild(col);
    });
    
    // Set up filter click events
    setupCertificateFilters();
  }

  function renderAchievements(achievements) {
    const target = document.getElementById('achievements-list-target');
    if (!target || !achievements) return;

    target.innerHTML = '';
    achievements.forEach((ach, index) => {
      const card = document.createElement('div');
      card.className = 'achievement-row-card';
      card.innerHTML = `
        <div class="d-flex align-items-start gap-3">
          <div class="quick-icon-box bg-light text-primary rounded-circle p-2.5 shadow-sm mt-1">
            <i data-lucide="check-circle" class="icon-sm"></i>
          </div>
          <div>
            <h5 class="fw-bold fs-7 mb-1 text-dark">Milestone 0${index + 1}</h5>
            <p class="small text-secondary mb-0">${ach}</p>
          </div>
        </div>
      `;
      target.appendChild(card);
    });
  }

  // 3. Project Details Modal Setup
  function openProjectModal(project) {
    const modalEl = document.getElementById('projectDetailsModal');
    if (!modalEl) return;
    
    document.getElementById('modal-project-title').innerText = project.title;
    document.getElementById('modal-project-tech').innerText = project.tech;
    document.getElementById('modal-project-description').innerText = project.description;
    document.getElementById('modal-project-challenge').innerText = project.challenge || 'N/A';
    document.getElementById('modal-project-solution').innerText = project.solution || 'N/A';
    document.getElementById('modal-project-future').innerText = project.future || 'N/A';
    
    const screenshot = project.screenshot || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop';
    document.getElementById('modal-project-image').src = screenshot;
    
    const gitLink = document.getElementById('modal-github-link');
    if (project.githubLink) {
      gitLink.href = project.githubLink;
      gitLink.classList.remove('d-none');
    } else {
      gitLink.classList.add('d-none');
    }

    const liveLink = document.getElementById('modal-live-link');
    if (project.liveLink) {
      liveLink.href = project.liveLink;
      liveLink.classList.remove('d-none');
    } else {
      liveLink.classList.add('d-none');
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons({
        attrs: { class: 'icon-sm' },
        nodeList: modalEl.querySelectorAll('[data-lucide]')
      });
    }

    const bootstrapModal = new bootstrap.Modal(modalEl);
    bootstrapModal.show();
  }

  // 4. Filter Certificates
  function setupCertificateFilters() {
    const pills = document.querySelectorAll('#cert-filter-pills button');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Toggle Active
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-filter');
        const cards = document.querySelectorAll('.cert-item-card');
        
        cards.forEach(card => {
          const issuer = card.getAttribute('data-issuer');
          if (filter === 'all' || issuer.toLowerCase().includes(filter.toLowerCase())) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Typing Animation Carousel
  const typingWords = ['K. Sudheer Basha.', 'a Data Analyst.', 'an MCA Graduate.', 'a Python Developer.'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTarget = document.getElementById('typed-text-target');

  function runTypingCarousel() {
    if (!typedTarget) return;

    const currentWord = typingWords[wordIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedTarget.innerHTML = currentWord.substring(0, charIndex);

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at the end of the word
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      typeSpeed = 300;
    }

    setTimeout(runTypingCarousel, typeSpeed);
  }
  
  if (typedTarget) {
    runTypingCarousel();
  }

  // 6. Smooth Scroll & Animations (Lenis + GSAP)
  let lenisInstance = null;
  function initScrollAnimations() {
    // Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });

      lenisInstance.on('scroll', () => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.update();
        }
        
        // Dynamic Navbar Glass background elevation
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 40) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }

        // Update Scroll Progress Bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        const progressEl = document.getElementById('scroll-progress-bar');
        if (progressEl) progressEl.style.width = `${scrolled}%`;

        // Parallax background scroll camera tracking
        if (camera) {
          camera.position.y = 0.2 - window.scrollY * 0.007;
        }
      });

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // GSAP Scroll reveals
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Skill progressive fill animation
      gsap.utils.toArray('.skill-bar-fill').forEach(fill => {
        const percent = fill.getAttribute('data-percent');
        gsap.to(fill, {
          width: `${percent}%`,
          scrollTrigger: {
            trigger: fill,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Simple Fade-in/Slide-up reveals
      gsap.utils.toArray('.section-padding').forEach(section => {
        const title = section.querySelector('.section-title');
        const tag = section.querySelector('.section-tag');
        const content = section.querySelectorAll('.row > div');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });

        if (tag) tl.from(tag, { opacity: 0, y: 15, duration: 0.4 });
        if (title) tl.from(title, { opacity: 0, y: 20, duration: 0.5 }, '-=0.2');
        if (content.length) {
          tl.from(content, { 
            opacity: 0, 
            y: 30, 
            stagger: 0.15, 
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.3');
        }
      });
    }

    // Direct Navbar click bindings for smooth link jump
    document.querySelectorAll('.navbar-nav a[href^="#"], .hero-section a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        
        if (targetEl && lenisInstance) {
          lenisInstance.scrollTo(targetEl, { offset: -80 });
          
          // Collapse navbar menu on mobile after click
          const navbarCollapse = document.getElementById('navbarContent');
          if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      });
    });
  }

  // 7. Three.js 3D Hero Workspace
  let scene, camera, renderer, laptopGroup;
  let dataNodeGroup, particles;
  let ring1, ring2, orbitingBars = [];
  let constellationGroup, nodesArray = [];
  let lineMesh, lineGeometry;
  let gridsGroup, clustersGroup, wavesGroup;
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;

  function adjustLayout() {
    const isMobile = window.innerWidth < 992;
    if (laptopGroup) {
      if (isMobile) {
        laptopGroup.position.set(0, -0.5, 0.2);
        laptopGroup.scale.set(0.65, 0.65, 0.65);
      } else {
        laptopGroup.position.set(1.4, -0.2, 0.5);
        laptopGroup.scale.set(0.9, 0.9, 0.9);
      }
    }
    if (dataNodeGroup) {
      if (isMobile) {
        dataNodeGroup.position.set(-0.7, 1.0, 0.2);
        dataNodeGroup.scale.set(0.6, 0.6, 0.6);
      } else {
        dataNodeGroup.position.set(-1.8, 0.8, 0.5);
        dataNodeGroup.scale.set(0.9, 0.9, 0.9);
      }
    }
  }

  function initThreeHero() {
    const canvas = document.getElementById('three-hero-canvas');
    const container = document.getElementById('hero');
    if (!canvas || !container) return;

    const width = window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x007bff, 1.3);
    dirLight.position.set(5, 5, 4);
    scene.add(dirLight);

    const glowLight = new THREE.PointLight(0x6f42c1, 2.5, 8);
    glowLight.position.set(0, 0.5, -0.5);
    scene.add(glowLight);

    // 3D Moving Constellation Network (Data Nodes) - Extended vertically for full page scroll
    constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    const nodeCount = 55;
    const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ 
      color: 0x007bff,
      transparent: true,
      opacity: 0.5
    });
    nodesArray = [];

    for (let i = 0; i < nodeCount; i++) {
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(
        (Math.random() - 0.5) * 11,
        (Math.random() - 0.7) * 35, // spans down 25 units
        (Math.random() - 0.5) * 7
      );
      nodeMesh.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.0035,
          (Math.random() - 0.5) * 0.0035,
          (Math.random() - 0.5) * 0.0035
        )
      };
      constellationGroup.add(nodeMesh);
      nodesArray.push(nodeMesh);
    }

    // Lines connecting close nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00b4d8,
      transparent: true,
      opacity: 0.12
    });
    lineGeometry = new THREE.BufferGeometry();
    lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Centerpiece Group (replaces laptopGroup with Futuristic Cybernetic Data Core)
    laptopGroup = new THREE.Group();

    // Central Data Core Sphere
    const coreGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x007bff,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0x0033cc,
      emissiveIntensity: 1.0
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    laptopGroup.add(coreMesh);

    // Orbiting Rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x6f42c1,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true
    });
    
    // Ring 1 (Torus)
    const ring1Geo = new THREE.TorusGeometry(1.1, 0.04, 8, 48);
    ring1 = new THREE.Mesh(ring1Geo, ringMat);
    laptopGroup.add(ring1);

    // Ring 2 (Torus - slightly larger and rotated)
    const ring2Geo = new THREE.TorusGeometry(1.4, 0.03, 8, 48);
    ring2 = new THREE.Mesh(ring2Geo, ringMat.clone());
    ring2.material.color.setHex(0x00b4d8);
    ring2.rotation.x = Math.PI / 2.5;
    laptopGroup.add(ring2);

    // Orbiting Data bars circle representing real-time chart calculations
    const orbitBarsCount = 8;
    const barMat = new THREE.MeshStandardMaterial({
      color: 0x00b4d8,
      roughness: 0.2,
      metalness: 0.3,
      emissive: 0x0056b3,
      transparent: true,
      opacity: 0.95
    });
    
    orbitingBars = [];
    for (let i = 0; i < orbitBarsCount; i++) {
      const barGeo = new THREE.BoxGeometry(0.12, 0.6, 0.12);
      barGeo.translate(0, 0.3, 0); // origin to bottom
      const barMesh = new THREE.Mesh(barGeo, barMat.clone());
      
      const angle = (i / orbitBarsCount) * Math.PI * 2;
      barMesh.position.set(Math.cos(angle) * 1.8, -0.3, Math.sin(angle) * 1.8);
      
      laptopGroup.add(barMesh);
      orbitingBars.push(barMesh);
    }

    scene.add(laptopGroup);

    // Floating Data Node (Wireframe Octahedron + Solid Inner Sphere)
    dataNodeGroup = new THREE.Group();
    dataNodeGroup.position.set(-2.2, 0.8, 0.5);

    const outerGeo = new THREE.OctahedronGeometry(0.35, 0);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x6f42c1,
      wireframe: true,
      emissive: 0x3b1480,
      roughness: 0.1
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    dataNodeGroup.add(outerMesh);

    const innerGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      transparent: true,
      opacity: 0.85
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    dataNodeGroup.add(innerMesh);

    scene.add(dataNodeGroup);

    // ----------------------------------------------------
    // BACKGROUND DATA ANALYSIS GRAPH DESIGNS (ALONG HEIGHT)
    // ----------------------------------------------------

    // 1. Floating Matrix Grids (y = -5 to -8)
    gridsGroup = new THREE.Group();
    scene.add(gridsGroup);
    
    const gridHelper1 = new THREE.GridHelper(5, 12, 0x00b4d8, 0x555555);
    gridHelper1.position.set(-2.2, -5.5, -1.0);
    gridHelper1.rotation.x = Math.PI / 6;
    gridHelper1.rotation.y = Math.PI / 4;
    gridsGroup.add(gridHelper1);

    const gridHelper2 = new THREE.GridHelper(5, 12, 0x6f42c1, 0x555555);
    gridHelper2.position.set(2.5, -7.5, -1.5);
    gridHelper2.rotation.x = -Math.PI / 6;
    gridHelper2.rotation.y = -Math.PI / 5;
    gridsGroup.add(gridHelper2);

    // 2. Scatter Plot Clusters (Database segments) (y = -11 to -14)
    clustersGroup = new THREE.Group();
    scene.add(clustersGroup);
    
    const clusterNodeGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const clusterNodeColors = [0x007bff, 0x6f42c1, 0x00b4d8, 0x2ec4b6];
    
    // Cluster A (Left)
    for (let i = 0; i < 15; i++) {
      const mat = new THREE.MeshBasicMaterial({ 
        color: clusterNodeColors[Math.floor(Math.random() * clusterNodeColors.length)],
        transparent: true,
        opacity: 0.8
      });
      const node = new THREE.Mesh(clusterNodeGeo, mat);
      node.position.set(
        -1.8 + (Math.random() - 0.5) * 1.5,
        -12.0 + (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5
      );
      clustersGroup.add(node);
    }
    
    // Cluster B (Right)
    for (let i = 0; i < 15; i++) {
      const mat = new THREE.MeshBasicMaterial({ 
        color: clusterNodeColors[Math.floor(Math.random() * clusterNodeColors.length)],
        transparent: true,
        opacity: 0.8
      });
      const node = new THREE.Mesh(clusterNodeGeo, mat);
      node.position.set(
        1.8 + (Math.random() - 0.5) * 1.5,
        -14.0 + (Math.random() - 0.5) * 1.5,
        -0.5 + (Math.random() - 0.5) * 1.5
      );
      clustersGroup.add(node);
    }

    // 3. Prediction Sine Curves & Trend Lines (y = -21 to -25)
    wavesGroup = new THREE.Group();
    scene.add(wavesGroup);
    
    // Wave Curve 1 (Teal)
    const points1 = [];
    for (let i = -5; i <= 5; i += 0.5) {
      points1.push(new THREE.Vector3(i, Math.sin(i * 1.2) * 0.6 - 21.5, Math.cos(i) * 0.4));
    }
    const curve1 = new THREE.CatmullRomCurve3(points1);
    const pointsData1 = curve1.getPoints(50);
    const waveGeo1 = new THREE.BufferGeometry().setFromPoints(pointsData1);
    const waveMat1 = new THREE.LineBasicMaterial({ color: 0x2ec4b6, linewidth: 2 });
    const waveLine1 = new THREE.Line(waveGeo1, waveMat1);
    wavesGroup.add(waveLine1);
    
    // Wave Curve 2 (Purple)
    const points2 = [];
    for (let i = -5; i <= 5; i += 0.5) {
      points2.push(new THREE.Vector3(i, Math.cos(i * 1.0) * 0.5 - 24.0, Math.sin(i * 0.8) * 0.3));
    }
    const curve2 = new THREE.CatmullRomCurve3(points2);
    const pointsData2 = curve2.getPoints(50);
    const waveGeo2 = new THREE.BufferGeometry().setFromPoints(pointsData2);
    const waveMat2 = new THREE.LineBasicMaterial({ color: 0x6f42c1, linewidth: 2 });
    const waveLine2 = new THREE.Line(waveGeo2, waveMat2);
    wavesGroup.add(waveLine2);

    // Drifting particles background
    const particleCount = 150; // slightly more for full page depth
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 11;
      particlePositions[i + 1] = (Math.random() - 0.7) * 35; // spans down
      particlePositions[i + 2] = (Math.random() - 0.5) * 7;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x007bff,
      size: 0.05,
      transparent: true,
      opacity: 0.5
    });

    particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Initial position responsive layout adjust
    adjustLayout();

    // Listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    // Run animation frame
    animateThree();
  }

  function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
  }

  function onWindowResize() {
    const container = document.getElementById('hero');
    if (!container || !camera || !renderer) return;
    
    const width = window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    
    adjustLayout();
  }



  function animateThree() {
    requestAnimationFrame(animateThree);

    // Dynamic rotations of centerpiece
    if (laptopGroup) {
      // Gentle floating animation
      laptopGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.08 + (window.innerWidth < 992 ? -0.65 : -0.35);
      
      // Mouse Parallax Follow
      targetRotationY = mouseX * 0.4;
      targetRotationX = mouseY * 0.25;
      
      laptopGroup.rotation.y += (targetRotationY - laptopGroup.rotation.y) * 0.05;
      laptopGroup.rotation.x += (targetRotationX - laptopGroup.rotation.x) * 0.05;
    }

    // Animate centerpiece Torus Orbiting Rings
    if (ring1) ring1.rotation.y += 0.015;
    if (ring2) {
      ring2.rotation.x += 0.008;
      ring2.rotation.y += 0.012;
    }

    // Animate centerpiece fluctuating core data bars
    if (orbitingBars.length) {
      orbitingBars.forEach((bar, index) => {
        const scale = (Math.sin(Date.now() * 0.0035 + index * 0.9) * 0.5) + 0.6; // scale between 0.1 and 1.1
        bar.scale.y = scale;
        bar.material.emissive.setHSL(0.55 + scale * 0.1, 1.0, 0.4);
      });
    }

    // Animate Floating Data Node
    if (dataNodeGroup) {
      dataNodeGroup.rotation.x += 0.008;
      dataNodeGroup.rotation.y += 0.012;
      dataNodeGroup.position.y = (Math.sin(Date.now() * 0.002) * 0.15) + (window.innerWidth < 992 ? 1.0 : 0.7);
    }

    // Animate Grid Helper planes
    if (gridsGroup) {
      gridsGroup.rotation.y += 0.0004;
    }

    // Animate Database Node clusters
    if (clustersGroup) {
      clustersGroup.rotation.y -= 0.0003;
    }

    // Update Moving Constellation Nodes
    const linePositions = [];
    if (nodesArray.length) {
      nodesArray.forEach((node, i) => {
        node.position.add(node.userData.velocity);
        
        // Bounce boundaries relative to scroll bounds (-18 to +5)
        if (Math.abs(node.position.x) > 6.0) node.userData.velocity.x *= -1;
        if (node.position.y > 5.0 || node.position.y < -35.0) node.userData.velocity.y *= -1;
        if (Math.abs(node.position.z) > 4.5) node.userData.velocity.z *= -1;
        
        // Check distance to draw connecting line segment vertices
        for (let j = i + 1; j < nodesArray.length; j++) {
          const dist = node.position.distanceTo(nodesArray[j].position);
          if (dist < 2.2) {
            linePositions.push(
              node.position.x, node.position.y, node.position.z,
              nodesArray[j].position.x, nodesArray[j].position.y, nodesArray[j].position.z
            );
          }
        }
      });
    }
    
    if (lineGeometry) {
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.attributes.position.needsUpdate = true;
    }
    
    // Rotate entire constellation network slowly
    if (constellationGroup) {
      constellationGroup.rotation.y += 0.0004;
    }

    if (particles) {
      const positions = particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.0035; // fall slowly
        if (positions[i] < -35.0) {
          positions[i] = 5.0;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  // Initialize Three.js hero space
  initThreeHero();

  // 8. 3D Skills Sphere Custom Tag Cloud (HTML5 Canvas 2D)
  let sphereCanvas, ctx;
  let skillsList = [];
  let sphereTags = [];
  let sphereRadius = 150;
  let angleX = 0.001; // Auto rotation speeds
  let angleY = 0.001;
  let isHoveredSphere = false;
  let mouseSphereX = 0, mouseSphereY = 0;

  function initSkillsSphere(skills) {
    sphereCanvas = document.getElementById('skills-sphere-canvas');
    if (!sphereCanvas) return;

    ctx = sphereCanvas.getContext('2d');
    skillsList = skills || [];

    // Fibonacci sphere mapping coordinates calculation
    const count = skillsList.length;
    sphereTags = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      // Spherical to Cartesian coordinates
      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      sphereTags.push({
        text: skillsList[i].name,
        x: x,
        y: y,
        z: z,
        projX: 0,
        projY: 0,
        scale: 1,
        alpha: 1,
        hovered: false
      });
    }

    // Attach mouse movement inside canvas
    sphereCanvas.addEventListener('mousemove', (e) => {
      const rect = sphereCanvas.getBoundingClientRect();
      mouseSphereX = e.clientX - rect.left - sphereCanvas.width / 2;
      mouseSphereY = e.clientY - rect.top - sphereCanvas.height / 2;
      
      // Update speeds based on hover offset
      angleY = mouseSphereX * 0.00005;
      angleX = -mouseSphereY * 0.00005;
      
      checkTagHover();
    });

    sphereCanvas.addEventListener('mouseleave', () => {
      angleX = 0.001;
      angleY = 0.001;
      isHoveredSphere = false;
      sphereTags.forEach(t => t.hovered = false);
    });

    animateSkillsSphere();
  }

  function rotateSphereX(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    sphereTags.forEach(tag => {
      const y1 = tag.y * cos - tag.z * sin;
      const z1 = tag.z * cos + tag.y * sin;
      tag.y = y1;
      tag.z = z1;
    });
  }

  function rotateSphereY(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    sphereTags.forEach(tag => {
      const x1 = tag.x * cos - tag.z * sin;
      const z1 = tag.z * cos + tag.x * sin;
      tag.x = x1;
      tag.z = z1;
    });
  }

  function checkTagHover() {
    let hoveredAny = false;
    sphereTags.forEach(tag => {
      // Simple collision box check around projected tag coordinate
      const textWidth = ctx.measureText(tag.text).width;
      const xMatch = mouseSphereX > tag.projX - textWidth / 2 - 10 && mouseSphereX < tag.projX + textWidth / 2 + 10;
      const yMatch = mouseSphereY > tag.projY - 12 && mouseSphereY < tag.projY + 12;

      if (xMatch && yMatch && tag.z > -50) { // Hover only closer items
        tag.hovered = true;
        hoveredAny = true;
      } else {
        tag.hovered = false;
      }
    });
    isHoveredSphere = hoveredAny;
  }

  function animateSkillsSphere() {
    requestAnimationFrame(animateSkillsSphere);
    
    // Clear canvas
    ctx.clearRect(0, 0, sphereCanvas.width, sphereCanvas.height);
    
    // Rotate values unless hovered lock
    if (!isHoveredSphere) {
      rotateSphereX(angleX);
      rotateSphereY(angleY);
    }

    // Center canvas offsets
    const cx = sphereCanvas.width / 2;
    const cy = sphereCanvas.height / 2;

    // Sort by depth Z-index so closer elements render on top
    const sortedTags = [...sphereTags].sort((a, b) => a.z - b.z);

    sortedTags.forEach(tag => {
      // Perspective projection mapping formula
      const fov = 400; // Focal length
      const scale = fov / (fov + tag.z);
      tag.scale = scale;
      tag.projX = tag.x * scale;
      tag.projY = tag.y * scale;

      // Alpha value based on Z-depth
      tag.alpha = (tag.z + sphereRadius) / (sphereRadius * 2);
      tag.alpha = Math.max(0.2, Math.min(1.0, tag.alpha)); // Clamp

      // Setup tag styling properties
      ctx.save();
      ctx.translate(cx + tag.projX, cy + tag.projY);
      
      const fontSize = Math.round(14 * scale);
      ctx.font = `bold ${fontSize}px var(--font-heading)`;
      
      if (tag.hovered) {
        // Glowing Hover Pill style
        ctx.fillStyle = 'rgba(0, 123, 255, 0.1)';
        const textWidth = ctx.measureText(tag.text).width;
        ctx.roundRect(-textWidth / 2 - 8, -fontSize - 4, textWidth + 16, fontSize + 12, 8);
        ctx.fill();
        
        ctx.fillStyle = 'var(--primary-color)';
        ctx.shadowColor = 'rgba(0, 123, 255, 0.5)';
        ctx.shadowBlur = 4;
      } else {
        ctx.fillStyle = `rgba(18, 18, 18, ${tag.alpha})`;
      }
      
      ctx.textAlign = 'center';
      ctx.fillText(tag.text, 0, 0);
      ctx.restore();
    });
  }

  // 9. Contact AJAX Form Handling
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      const submitBtn = document.getElementById('contact-submit-btn');
      const originalText = submitBtn.innerHTML;
      
      // Loading State
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <div class="spinner-border spinner-border-sm ms-2" role="status"></div>`;

      // Mock delay and response
      setTimeout(() => {
        // Reset form validations
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        
        // Restore submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Launch Confetti Celebration
        if (typeof confetti !== 'undefined') {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#007bff', '#6f42c1', '#00b4d8']
          });
        }

        // Trigger Success Toast
        const toastEl = document.getElementById('contactToast');
        if (toastEl) {
          const toast = new bootstrap.Toast(toastEl);
          toast.show();
        }
      }, 1500);
    });
  }

  // 10. Real-time Python Console Simulation for Data Analysis
  function startConsoleSimulation() {
    const consoleEl = document.getElementById('analytics-console');
    if (!consoleEl) return;
    
    const logs = [
      ">>> import pandas as pd",
      ">>> import numpy as np",
      ">>> df = pd.read_csv('recruitment_data.csv')",
      "[INFO] Dataset loaded: 14,820 records, 12 features",
      ">>> df.isnull().sum()",
      "Name       0\nExperience 0\nSkills     0\nStatus     0\ndtype: int64",
      ">>> # Running TF-IDF Vectorizer on job description",
      ">>> from sklearn.feature_extraction.text import TfidfVectorizer",
      ">>> vectorizer = TfidfVectorizer(stop_words='english')",
      "[MODEL] Matching candidate resume: K_Sudheer_Basha_Resume.pdf",
      ">>> cosine_sim = cosine_similarity(resume_tfidf, jd_tfidf)",
      "[INFO] Cosine Similarity calculated successfully.",
      "[MODEL] Candidate match relevance score: 94.2%",
      "[INFO] Auto-generating custom ATS optimization report...",
      "[SUCCESS] report_output.pdf generated in /public/uploads/",
      ">>> # Plotting correlation metrics...",
      ">>> import seaborn as sns",
      ">>> sns.heatmap(df.corr(), annot=True, cmap='coolwarm')",
      "[INFO] Model status: 60FPS WebGL Renderer Active"
    ];
    
    let lineIdx = 0;
    
    function addNextLine() {
      const p = document.createElement('div');
      p.className = 'mb-1 text-success';
      p.style.fontSize = '0.75rem';
      p.style.fontFamily = 'monospace';
      
      const lineText = logs[lineIdx];
      
      if (lineText.startsWith('>>>')) {
        p.style.color = '#007bff';
      } else if (lineText.startsWith('[INFO]')) {
        p.style.color = '#6c757d';
      } else if (lineText.startsWith('[MODEL]')) {
        p.style.color = '#6f42c1';
      } else if (lineText.startsWith('[SUCCESS]')) {
        p.style.color = '#2ec4b6';
      } else {
        p.style.color = '#212529';
      }
      
      p.innerText = lineText;
      consoleEl.appendChild(p);
      
      consoleEl.scrollTop = consoleEl.scrollHeight;
      lineIdx = (lineIdx + 1) % logs.length;
      
      if (lineIdx === 0) {
        setTimeout(() => {
          consoleEl.innerHTML = '';
        }, 3000);
      }
      
      setTimeout(addNextLine, Math.random() * 1500 + 800);
    }
    
    addNextLine();
  }
  
  startConsoleSimulation();
});
