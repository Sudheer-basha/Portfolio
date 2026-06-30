/* ==========================================
   Dashboard Manager Logic: Portfolio Admin
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  let portfolioData = null;
  let currentEditIndex = -1;
  let activeModal = null;

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Helper: Show bootstrap style alerts in the dashboard
  function showAlert(message, type = 'success') {
    const alertPlaceholder = document.getElementById('admin-alert-placeholder');
    if (!alertPlaceholder) return;
    
    alertPlaceholder.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
        <div class="d-flex align-items-center gap-2">
          <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="icon-md"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons({
        attrs: { class: 'icon-sm' },
        nodeList: alertPlaceholder.querySelectorAll('[data-lucide]')
      });
    }

    // Scroll up to show the alert
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 1. Fetch Configuration from Server
  function fetchConfig() {
    fetch('/api/portfolio')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch portfolio settings');
        return res.json();
      })
      .then(data => {
        portfolioData = data;
        populateProfileForm(data.profile);
        renderSkillsTable(data.skills);
        renderProjectsAccordion(data.projects);
        renderEduTable(data.education);
        renderCertsTable(data.certifications);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        showAlert('Failed to connect to the backend server.', 'danger');
      });
  }

  fetchConfig();

  // 2. Populate Profile Fields
  function populateProfileForm(profile) {
    if (!profile) return;
    document.getElementById('profile-name').value = profile.name || '';
    document.getElementById('profile-title').value = profile.title || '';
    document.getElementById('profile-email').value = profile.email || '';
    document.getElementById('profile-phone').value = profile.phone || '';
    document.getElementById('profile-location').value = profile.location || '';
    document.getElementById('profile-github').value = profile.github || '';
    document.getElementById('profile-linkedin').value = profile.linkedin || '';
    document.getElementById('profile-avatar-url').value = profile.avatar || '';
    document.getElementById('profile-resume-url').value = profile.resumeUrl || '';
    document.getElementById('profile-bio').value = profile.bio || '';
    document.getElementById('profile-aboutText').value = profile.aboutText || '';
  }

  // 3. Render Tables and Accordions
  function renderSkillsTable(skills) {
    const tbody = document.getElementById('skills-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    (skills || []).forEach((skill, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="fw-semibold">${skill.name}</td>
        <td><span class="badge bg-light text-dark border">${skill.category}</span></td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <span>${skill.rating}%</span>
            <div class="progress w-100" style="height: 6px;">
              <div class="progress-bar" style="width: ${skill.rating}%"></div>
            </div>
          </div>
        </td>
        <td class="text-end">
          <button class="btn btn-outline-dark btn-sm rounded-pill px-2.5 btn-edit-skill" data-index="${index}">Edit</button>
          <button class="btn btn-outline-danger btn-sm rounded-pill px-2.5 btn-delete-skill" data-index="${index}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Add list event bindings
    tbody.querySelectorAll('.btn-edit-skill').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        openSkillModal(index);
      });
    });

    tbody.querySelectorAll('.btn-delete-skill').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        if (confirm('Delete this skill competency?')) {
          portfolioData.skills.splice(index, 1);
          renderSkillsTable(portfolioData.skills);
        }
      });
    });
  }

  function renderProjectsAccordion(projects) {
    const acc = document.getElementById('projects-list-accordion');
    if (!acc) return;
    acc.innerHTML = '';

    (projects || []).forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'accordion-item border rounded-3 mb-3 overflow-hidden';
      
      const screenshot = project.screenshot || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=300&auto=format&fit=crop';
      
      card.innerHTML = `
        <h2 class="accordion-header" id="heading-proj-${index}">
          <button class="accordion-button collapsed fw-bold d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-proj-${index}" aria-expanded="false" aria-controls="collapse-proj-${index}">
            <span>${project.title}</span>
            <span class="badge bg-light text-primary border ms-2 font-monospace fs-9">${project.tech.split(',')[0]}</span>
          </button>
        </h2>
        <div id="collapse-proj-${index}" class="accordion-collapse collapse" aria-labelledby="heading-proj-${index}" data-bs-parent="#projects-list-accordion">
          <div class="accordion-body bg-light-gray">
            <div class="row align-items-center g-3">
              <div class="col-sm-4 text-center">
                <img src="${screenshot}" alt="Preview" class="img-fluid rounded-3 border" style="max-height: 120px; object-fit: cover;">
              </div>
              <div class="col-sm-8">
                <p class="small text-muted mb-2"><strong>Description:</strong> ${project.description}</p>
                <div class="d-flex justify-content-end gap-2 mt-3">
                  <button class="btn btn-outline-dark btn-sm rounded-pill px-3 btn-edit-proj" data-index="${index}">
                    <i data-lucide="edit-2" class="icon-xs me-1"></i>Edit Details
                  </button>
                  <button class="btn btn-outline-danger btn-sm rounded-pill px-3 btn-delete-proj" data-index="${index}">
                    <i data-lucide="trash" class="icon-xs me-1"></i>Delete Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      acc.appendChild(card);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons({
        attrs: { class: 'icon-sm' },
        nodeList: acc.querySelectorAll('[data-lucide]')
      });
    }

    acc.querySelectorAll('.btn-edit-proj').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        openProjectModal(index);
      });
    });

    acc.querySelectorAll('.btn-delete-proj').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        if (confirm('Delete this project record permanently?')) {
          portfolioData.projects.splice(index, 1);
          renderProjectsAccordion(portfolioData.projects);
        }
      });
    });
  }

  function renderEduTable(eduList) {
    const tbody = document.getElementById('edu-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    (eduList || []).forEach((edu, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="fw-semibold">${edu.degree}</td>
        <td>${edu.institution}</td>
        <td>${edu.period}</td>
        <td class="font-monospace">${edu.score}</td>
        <td class="text-end">
          <button class="btn btn-outline-dark btn-sm rounded-pill px-2.5 btn-edit-edu" data-index="${index}">Edit</button>
          <button class="btn btn-outline-danger btn-sm rounded-pill px-2.5 btn-delete-edu" data-index="${index}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-edit-edu').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        openEduModal(index);
      });
    });

    tbody.querySelectorAll('.btn-delete-edu').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        if (confirm('Remove this education milestone?')) {
          portfolioData.education.splice(index, 1);
          renderEduTable(portfolioData.education);
        }
      });
    });
  }

  function renderCertsTable(certs) {
    const tbody = document.getElementById('certs-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    (certs || []).forEach((cert, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="fw-semibold">${cert.title}</td>
        <td>${cert.issuer}</td>
        <td>${cert.date}</td>
        <td class="text-end">
          <button class="btn btn-outline-dark btn-sm rounded-pill px-2.5 btn-edit-cert" data-index="${index}">Edit</button>
          <button class="btn btn-outline-danger btn-sm rounded-pill px-2.5 btn-delete-cert" data-index="${index}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-edit-cert').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        openCertModal(index);
      });
    });

    tbody.querySelectorAll('.btn-delete-cert').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        if (confirm('Delete this certification record?')) {
          portfolioData.certifications.splice(index, 1);
          renderCertsTable(portfolioData.certifications);
        }
      });
    });
  }

  // 4. File Upload Utilities
  function uploadFile(fileInput, urlTargetInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    const prevText = urlTargetInput.value;
    urlTargetInput.value = 'Uploading file...';

    fetch('/api/portfolio/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => {
        if (!res.ok) throw new Error('Upload request failed');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          urlTargetInput.value = data.url;
          showAlert('File asset uploaded successfully.', 'success');
        } else {
          urlTargetInput.value = prevText;
          showAlert('Upload failed: ' + data.error, 'danger');
        }
      })
      .catch(err => {
        urlTargetInput.value = prevText;
        console.error('Upload Error:', err);
        showAlert('Network error uploading file.', 'danger');
      });
  }

  // Attach upload listeners
  document.getElementById('file-avatar-picker').addEventListener('change', function() {
    uploadFile(this, document.getElementById('profile-avatar-url'));
  });
  
  document.getElementById('file-resume-picker').addEventListener('change', function() {
    uploadFile(this, document.getElementById('profile-resume-url'));
  });

  document.getElementById('file-screenshot-picker').addEventListener('change', function() {
    uploadFile(this, document.getElementById('project-screenshot-url'));
  });

  document.getElementById('file-cert-picker').addEventListener('change', function() {
    uploadFile(this, document.getElementById('cert-badge-url'));
  });

  // 5. Modals Management (Add / Edit triggers)
  
  // Skills Modal Handlers
  const skillModalEl = document.getElementById('skillModal');
  const skillForm = document.getElementById('form-skill');
  
  function openSkillModal(index = -1) {
    currentEditIndex = index;
    if (index >= 0) {
      const sk = portfolioData.skills[index];
      document.getElementById('skill-name').value = sk.name;
      document.getElementById('skill-category').value = sk.category;
      document.getElementById('skill-rating').value = sk.rating;
    } else {
      skillForm.reset();
    }
    activeModal = new bootstrap.Modal(skillModalEl);
    activeModal.show();
  }

  skillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('skill-name').value,
      category: document.getElementById('skill-category').value,
      rating: parseInt(document.getElementById('skill-rating').value)
    };

    if (currentEditIndex >= 0) {
      portfolioData.skills[currentEditIndex] = payload;
    } else {
      portfolioData.skills.push(payload);
    }
    
    renderSkillsTable(portfolioData.skills);
    activeModal.hide();
  });

  // Education Modal Handlers
  const eduModalEl = document.getElementById('eduModal');
  const eduForm = document.getElementById('form-edu');

  function openEduModal(index = -1) {
    currentEditIndex = index;
    if (index >= 0) {
      const edu = portfolioData.education[index];
      document.getElementById('edu-degree').value = edu.degree;
      document.getElementById('edu-institution').value = edu.institution;
      document.getElementById('edu-period').value = edu.period;
      document.getElementById('edu-score').value = edu.score;
    } else {
      eduForm.reset();
    }
    activeModal = new bootstrap.Modal(eduModalEl);
    activeModal.show();
  }

  eduForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      degree: document.getElementById('edu-degree').value,
      institution: document.getElementById('edu-institution').value,
      period: document.getElementById('edu-period').value,
      score: document.getElementById('edu-score').value
    };

    if (currentEditIndex >= 0) {
      portfolioData.education[currentEditIndex] = payload;
    } else {
      portfolioData.education.push(payload);
    }

    renderEduTable(portfolioData.education);
    activeModal.hide();
  });

  // Certifications Modal Handlers
  const certModalEl = document.getElementById('certModal');
  const certForm = document.getElementById('form-cert');

  function openCertModal(index = -1) {
    currentEditIndex = index;
    if (index >= 0) {
      const cert = portfolioData.certifications[index];
      document.getElementById('cert-title').value = cert.title;
      document.getElementById('cert-issuer').value = cert.issuer;
      document.getElementById('cert-date').value = cert.date;
      document.getElementById('cert-verifyLink').value = cert.verifyLink;
      document.getElementById('cert-badge-url').value = cert.badge || '';
    } else {
      certForm.reset();
      document.getElementById('cert-badge-url').value = '';
    }
    activeModal = new bootstrap.Modal(certModalEl);
    activeModal.show();
  }

  certForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      title: document.getElementById('cert-title').value,
      issuer: document.getElementById('cert-issuer').value,
      date: document.getElementById('cert-date').value,
      verifyLink: document.getElementById('cert-verifyLink').value,
      badge: document.getElementById('cert-badge-url').value
    };

    if (currentEditIndex >= 0) {
      portfolioData.certifications[currentEditIndex] = payload;
    } else {
      portfolioData.certifications.push(payload);
    }

    renderCertsTable(portfolioData.certifications);
    activeModal.hide();
  });

  // Project Modal Handlers
  const projectModalEl = document.getElementById('projectModal');
  const projectForm = document.getElementById('form-project');

  function openProjectModal(index = -1) {
    currentEditIndex = index;
    if (index >= 0) {
      const proj = portfolioData.projects[index];
      document.getElementById('project-id').value = proj.id;
      document.getElementById('project-title').value = proj.title;
      document.getElementById('project-tech').value = proj.tech;
      document.getElementById('project-liveLink').value = proj.liveLink || '';
      document.getElementById('project-githubLink').value = proj.githubLink || '';
      document.getElementById('project-screenshot-url').value = proj.screenshot || '';
      document.getElementById('project-description').value = proj.description;
      document.getElementById('project-challenge').value = proj.challenge || '';
      document.getElementById('project-solution').value = proj.solution || '';
      document.getElementById('project-future').value = proj.future || '';
    } else {
      projectForm.reset();
      document.getElementById('project-id').value = '';
      document.getElementById('project-screenshot-url').value = '';
    }
    activeModal = new bootstrap.Modal(projectModalEl);
    activeModal.show();
  }

  projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const projId = document.getElementById('project-id').value || `project-${Date.now()}`;
    const payload = {
      id: projId,
      title: document.getElementById('project-title').value,
      tech: document.getElementById('project-tech').value,
      liveLink: document.getElementById('project-liveLink').value,
      githubLink: document.getElementById('project-githubLink').value,
      screenshot: document.getElementById('project-screenshot-url').value,
      description: document.getElementById('project-description').value,
      challenge: document.getElementById('project-challenge').value,
      solution: document.getElementById('project-solution').value,
      future: document.getElementById('project-future').value
    };

    if (currentEditIndex >= 0) {
      portfolioData.projects[currentEditIndex] = payload;
    } else {
      portfolioData.projects.push(payload);
    }

    renderProjectsAccordion(portfolioData.projects);
    activeModal.hide();
  });

  // 6. Save Profile & Entire Configuration Back to Server
  document.getElementById('btn-save-all').addEventListener('click', () => {
    if (!portfolioData) return;

    // Collect profile details from inputs
    portfolioData.profile = {
      name: document.getElementById('profile-name').value,
      title: document.getElementById('profile-title').value,
      email: document.getElementById('profile-email').value,
      phone: document.getElementById('profile-phone').value,
      location: document.getElementById('profile-location').value,
      github: document.getElementById('profile-github').value,
      linkedin: document.getElementById('profile-linkedin').value,
      avatar: document.getElementById('profile-avatar-url').value,
      resumeUrl: document.getElementById('profile-resume-url').value,
      bio: document.getElementById('profile-bio').value,
      aboutText: document.getElementById('profile-aboutText').value
    };

    // Post data to express API
    fetch('/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(portfolioData)
    })
      .then(res => {
        if (!res.ok) throw new Error('API save operation failed');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          showAlert('All configuration files updated successfully!', 'success');
        } else {
          showAlert('Save error: ' + data.error, 'danger');
        }
      })
      .catch(err => {
        console.error('Save Error:', err);
        showAlert('Network error saving configuration parameters.', 'danger');
      });
  });
});
