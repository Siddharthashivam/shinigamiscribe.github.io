// Create cosmic star background
function createStars() {
    const body = document.querySelector('body');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        
        // Random size
        const size = Math.random() * 2;
        
        // Random animation delay
        const delay = Math.random() * 4;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        
        body.appendChild(star);
    }
}

// Client-side content management
document.addEventListener('DOMContentLoaded', function() {
    // Call the function when the page loads
    createStars();
    
    // Load content from localStorage if available
    loadContent();
    
    // Set up event listeners for admin forms
    setupAdminForms();
});

// Load content from localStorage
function loadContent() {
    // Check if we're on the admin page
    if (window.location.pathname.includes('admin.html')) {
        return; // Admin page handles its own content
    }
    
    // Load and apply theme settings
    const theme = JSON.parse(localStorage.getItem('theme')) || {
        colors: {
            background: "#0a0a0a",
            accent_color: "#6c63ff",
            text_primary: "#ffffff"
        },
        layout: "Cosmic Black",
        animation: "Subtle",
        stars_background: true
    };
    
    // Apply theme colors
    document.documentElement.style.setProperty('--cosmic-black', theme.colors.background);
    document.documentElement.style.setProperty('--accent-color', theme.colors.accent_color);
    document.documentElement.style.setProperty('--text-primary', theme.colors.text_primary);
    
    // Load personal info
    const content = JSON.parse(localStorage.getItem('content')) || {
        name: "Siddhartha",
        tagline: "I'm passionate about creating and innovating.",
        about: "Welcome to my portfolio! I'm Siddhartha, a passionate professional dedicated to excellence and innovation.",
        email: "contact@siddhartha-portfolio.com",
        linkedin: "linkedin.com/in/siddhartha",
        github: "github.com/siddhartha"
    };
    
    // Apply content to page elements
    const nameElements = document.querySelectorAll('.user-name');
    nameElements.forEach(el => {
        if (el) el.textContent = content.name;
    });
    
    const taglineElements = document.querySelectorAll('.user-tagline');
    taglineElements.forEach(el => {
        if (el) el.textContent = content.tagline;
    });
    
    // Page-specific content loading
    const pagePath = window.location.pathname;
    
    if (pagePath.includes('about.html')) {
        const aboutElement = document.getElementById('about-content');
        if (aboutElement) aboutElement.textContent = content.about;
    }
    
    if (pagePath.includes('contact.html')) {
        const emailElement = document.getElementById('contact-email');
        if (emailElement) emailElement.textContent = content.email;
        
        const linkedinElement = document.getElementById('contact-linkedin');
        if (linkedinElement) linkedinElement.textContent = content.linkedin;
        
        const githubElement = document.getElementById('contact-github');
        if (githubElement) githubElement.textContent = content.github;
    }
    
    // Load projects if on projects page
    if (pagePath.includes('projects.html')) {
        loadProjects();
    }
    
    // Load skills if on skills page
    if (pagePath.includes('skills.html')) {
        loadSkills();
    }
}

// Load projects from localStorage
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [
        {
            id: 1,
            name: "Portfolio Website",
            category: "Web Development",
            description: "A responsive portfolio website built with modern web technologies. Features a cosmic black theme with white highlights and full customization capabilities.",
            technologies: ["HTML/CSS", "JavaScript", "Bootstrap"]
        },
        {
            id: 2,
            name: "Future Project",
            category: "Coming Soon",
            description: "This space is reserved for your next amazing project. As you complete more work, you can easily add it to your portfolio through the admin interface.",
            technologies: ["Your Skills Here"]
        }
    ];
    
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectHTML = `
            <div class="col-md-6 mb-4">
                <div class="content-section h-100">
                    <h3>${project.name}</h3>
                    <p class="text-secondary mb-3">${project.category}</p>
                    <p>${project.description}</p>
                    <div class="mt-3">
                        ${project.technologies.map(tech => `<span class="badge bg-secondary me-1">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        
        projectsContainer.innerHTML += projectHTML;
    });
}

// Load skills from localStorage
function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('skills')) || {
        technical: [
            {name: "Python", proficiency: 85, category: "Programming Languages"},
            {name: "JavaScript", proficiency: 75, category: "Programming Languages"},
            {name: "HTML/CSS", proficiency: 70, category: "Programming Languages"},
            {name: "Flask", proficiency: 80, category: "Frameworks & Libraries"},
            {name: "Bootstrap", proficiency: 65, category: "Frameworks & Libraries"},
            {name: "jQuery", proficiency: 60, category: "Frameworks & Libraries"}
        ],
        soft: [
            {name: "Teamwork", icon: "fas fa-users"},
            {name: "Problem Solving", icon: "fas fa-lightbulb"},
            {name: "Communication", icon: "fas fa-comments"},
            {name: "Project Management", icon: "fas fa-tasks"},
            {name: "Time Management", icon: "fas fa-clock"},
            {name: "Adaptability", icon: "fas fa-brain"}
        ],
        learning: [
            {name: "Advanced Programming", icon: "fas fa-code"},
            {name: "Database Management", icon: "fas fa-database"},
            {name: "Mobile Development", icon: "fas fa-mobile-alt"}
        ]
    };
    
    const technicalContainer = document.getElementById('technical-skills');
    if (technicalContainer) {
        technicalContainer.innerHTML = '';
        
        // Group skills by category
        const categories = {};
        skills.technical.forEach(skill => {
            if (!categories[skill.category]) {
                categories[skill.category] = [];
            }
            categories[skill.category].push(skill);
        });
        
        // Create HTML for each category
        for (const category in categories) {
            const categoryHTML = `
                <div class="mb-4">
                    <h4>${category}</h4>
                    ${categories[category].map(skill => `
                        <div class="progress mb-2" style="height: 25px; background-color: var(--cosmic-dark);">
                            <div class="progress-bar" role="progressbar" style="width: ${skill.proficiency}%; background-color: var(--accent-color);" 
                                aria-valuenow="${skill.proficiency}" aria-valuemin="0" aria-valuemax="100">${skill.name}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            technicalContainer.innerHTML += categoryHTML;
        }
    }
    
    const softContainer = document.getElementById('soft-skills');
    if (softContainer) {
        softContainer.innerHTML = '';
        
        const softHTML = `
            <div class="row text-center">
                ${skills.soft.map(skill => `
                    <div class="col-md-4 mb-4">
                        <div class="p-3">
                            <i class="${skill.icon} fa-3x mb-3" style="color: var(--accent-color);"></i>
                            <h5>${skill.name}</h5>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        softContainer.innerHTML = softHTML;
    }
    
    const learningContainer = document.getElementById('learning-journey');
    if (learningContainer) {
        learningContainer.innerHTML = '';
        
        const learningHTML = `
            <div class="row mt-4">
                ${skills.learning.map(skill => `
                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <i class="${skill.icon} fa-2x" style="color: var(--accent-color);"></i>
                            </div>
                            <div>
                                <h5 class="mb-0">${skill.name}</h5>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        learningContainer.innerHTML = learningHTML;
    }
}

// Set up admin form event listeners
function setupAdminForms() {
    // Check if we're on the admin page
    if (!window.location.pathname.includes('admin.html')) {
        return;
    }
    
    // Load content for editing
    const content = JSON.parse(localStorage.getItem('content')) || {
        name: "Siddhartha",
        tagline: "I'm passionate about creating and innovating.",
        about: "Welcome to my portfolio! I'm Siddhartha, a passionate professional dedicated to excellence and innovation.",
        email: "contact@siddhartha-portfolio.com",
        linkedin: "linkedin.com/in/siddhartha",
        github: "github.com/siddhartha"
    };
    
    // Fill form fields with current values
    document.getElementById('name').value = content.name;
    document.getElementById('tagline').value = content.tagline;
    document.getElementById('about').value = content.about;
    document.getElementById('email').value = content.email;
    document.getElementById('linkedin').value = content.linkedin;
    document.getElementById('github').value = content.github;
    
    // Load theme settings
    const theme = JSON.parse(localStorage.getItem('theme')) || {
        colors: {
            background: "#0a0a0a",
            accent_color: "#6c63ff",
            text_primary: "#ffffff"
        },
        layout: "Cosmic Black",
        animation: "Subtle",
        stars_background: true
    };
    
    // Fill theme form fields
    document.getElementById('background').value = theme.colors.background;
    document.getElementById('accent').value = theme.colors.accent_color;
    document.getElementById('text').value = theme.colors.text_primary;
    
    // Set up form submission handlers
    document.querySelectorAll('.admin-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Determine which form was submitted
            const formId = this.closest('.tab-pane').id;
            
            if (formId === 'content') {
                // Update content data
                content.name = document.getElementById('name').value;
                content.tagline = document.getElementById('tagline').value;
                content.about = document.getElementById('about').value;
                content.email = document.getElementById('email').value;
                content.linkedin = document.getElementById('linkedin').value;
                content.github = document.getElementById('github').value;
                
                // Save to localStorage
                localStorage.setItem('content', JSON.stringify(content));
                
                alert('Content updated successfully!');
            } else if (formId === 'appearance') {
                // Update theme data
                theme.colors.background = document.getElementById('background').value;
                theme.colors.accent_color = document.getElementById('accent').value;
                theme.colors.text_primary = document.getElementById('text').value;
                theme.layout = document.getElementById('layout').value;
                theme.animation = document.getElementById('animation').value;
                theme.stars_background = document.getElementById('starsBackground').checked;
                
                // Save to localStorage
                localStorage.setItem('theme', JSON.stringify(theme));
                
                // Apply theme changes immediately
                document.documentElement.style.setProperty('--cosmic-black', theme.colors.background);
                document.documentElement.style.setProperty('--accent-color', theme.colors.accent_color);
                document.documentElement.style.setProperty('--text-primary', theme.colors.text_primary);
                
                alert('Theme updated successfully!');
            }
        });
    });
    
    // Set up project management
    setupProjectManagement();
    
    // Set up skill management
    setupSkillManagement();
}

// Set up project management in admin
function setupProjectManagement() {
    // Load projects
    const projects = JSON.parse(localStorage.getItem('projects')) || [
        {
            id: 1,
            name: "Portfolio Website",
            category: "Web Development",
            description: "A responsive portfolio website built with modern web technologies. Features a cosmic black theme with white highlights and full customization capabilities.",
            technologies: ["HTML/CSS", "JavaScript", "Bootstrap"]
        },
        {
            id: 2,
            name: "Future Project",
            category: "Coming Soon",
            description: "This space is reserved for your next amazing project. As you complete more work, you can easily add it to your portfolio through the admin interface.",
            technologies: ["Your Skills Here"]
        }
    ];
    
    // Display projects in table
    const projectsTable = document.querySelector('#projects table tbody');
    if (projectsTable) {
        projectsTable.innerHTML = '';
        
        projects.forEach(project => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${project.name}</td>
                <td>${project.category}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" data-id="${project.id}">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" data-id="${project.id}">Delete</button>
                </td>
            `;
            
            projectsTable.appendChild(row);
        });
        
        // Add event listeners for edit/delete buttons
        projectsTable.querySelectorAll('.btn-outline-primary').forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = parseInt(this.getAttribute('data-id'));
                const project = projects.find(p => p.id === projectId);
                
                if (project) {
                    // Fill modal with project data
                    document.getElementById('projectName').value = project.name;
                    document.getElementById('projectCategory').value = project.category;
                    document.getElementById('projectDescription').value = project.description;
                    document.getElementById('projectTechnologies').value = project.technologies.join(', ');
                    
                    // Show modal
                    const modal = new bootstrap.Modal(document.getElementById('addProjectModal'));
                    modal.show();
                }
            });
        });
        
        projectsTable.querySelectorAll('.btn-outline-danger').forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = parseInt(this.getAttribute('data-id'));
                
                if (confirm('Are you sure you want to delete this project?')) {
                    // Remove project from array
                    const index = projects.findIndex(p => p.id === projectId);
                    if (index !== -1) {
                        projects.splice(index, 1);
                        
                        // Save to localStorage
                        localStorage.setItem('projects', JSON.stringify(projects));
                        
                        // Refresh table
                        setupProjectManagement();
                    }
                }
            });
        });
    }
    
    // Set up add project form
    const addProjectBtn = document.querySelector('#addProjectModal .btn-custom');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            const name = document.getElementById('projectName').value;
            const category = document.getElementById('projectCategory').value;
            const description = document.getElementById('projectDescription').value;
            const technologies = document.getElementById('projectTechnologies').value.split(',').map(t => t.trim());
            
            if (!name || !category || !description) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create new project
            const newProject = {
                id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
                name,
                category,
                description,
                technologies
            };
            
            // Add to array
            projects.push(newProject);
            
            // Save to localStorage
            localStorage.setItem('projects', JSON.stringify(projects));
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addProjectModal'));
            modal.hide();
            
            // Refresh table
            setupProjectManagement();
        });
    }
}

// Set up skill management in admin
function setupSkillManagement() {
    // Load skills
    const skills = JSON.parse(localStorage.getItem('skills')) || {
        technical: [
            {name: "Python", proficiency: 85, category: "Programming Languages"},
            {name: "JavaScript", proficiency: 75, category: "Programming Languages"},
            {name: "HTML/CSS", proficiency: 70, category: "Programming Languages"},
            {name: "Flask", proficiency: 80, category: "Frameworks & Libraries"},
            {name: "Bootstrap", proficiency: 65, category: "Frameworks & Libraries"},
            {name: "jQuery", proficiency: 60, category: "Frameworks & Libraries"}
        ],
        soft: [
            {name: "Teamwork", icon: "fas fa-users"},
            {name: "Problem Solving", icon: "fas fa-lightbulb"},
            {name: "Communication", icon: "fas fa-comments"},
            {name: "Project Management", icon: "fas fa-tasks"},
            {name: "Time Management", icon: "fas fa-clock"},
            {name: "Adaptability", icon: "fas fa-brain"}
        ],
        learning: [
            {name: "Advanced Programming", icon: "fas fa-code"},
            {name: "Database Management", icon: "fas fa-database"},
            {name: "Mobile Development", icon: "fas fa-mobile-alt"}
        ]
    };
    
    // Display skills in table
    const skillsTable = document.querySelector('#skills table tbody');
    if (skillsTable) {
        skillsTable.innerHTML = '';
        
        skills.technical.forEach(skill => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${skill.name}</td>
                <td>${skill.proficiency}%</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" data-name="${skill.name}">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" data-name="${skill.name}">Delete</button>
                </td>
            `;
            
            skillsTable.appendChild(row);
        });
        
        // Add event listeners for edit/delete buttons
        skillsTable.querySelectorAll('.btn-outline-primary').forEach(btn => {
            btn.addEventListener('click', function() {
                const skillName = this.getAttribute('data-name');
                const skill = skills.technical.find(s => s.name === skillName);
                
                if (skill) {
                    // Fill modal with skill data
                    document.getElementById('skillName').value = skill.name;
                    document.getElementById('skillProficiency').value = skill.proficiency;
                    document.getElementById('skillCategory').value = skill.category;
                    
                    // Update proficiency display
                    document.getElementById('proficiencyValue').textContent = skill.proficiency + '%';
                    
                    // Show modal
                    const modal = new bootstrap.Modal(document.getElementById('addSkillModal'));
                    modal.show();
                }
            });
        });
        
        skillsTable.querySelectorAll('.btn-outline-danger').forEach(btn => {
            btn.addEventListener('click', function() {
                const skillName = this.getAttribute('data-name');
                
                if (confirm('Are you sure you want to delete this skill?')) {
                    // Remove skill from array
                    const index = skills.technical.findIndex(s => s.name === skillName);
                    if (index !== -1) {
                        skills.technical.splice(index, 1);
                        
                        // Save to localStorage
                        localStorage.setItem('skills', JSON.stringify(skills));
                        
                        // Refresh table
                        setupSkillManagement();
                    }
                }
            });
        });
    }
    
    // Set up add skill form
    const addSkillBtn = document.querySelector('#addSkillModal .btn-custom');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function() {
            const name = document.getElementById('skillName').value;
            const proficiency = parseInt(document.getElementById('skillProficiency').value);
            const category = document.getElementById('skillCategory').value;
            
            if (!name || isNaN(proficiency)) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Check if skill already exists
            const existingIndex = skills.technical.findIndex(s => s.name === name);
            
            if (existingIndex !== -1) {
                // Update existing skill
                skills.technical[existingIndex] = {
                    name,
                    proficiency,
                    category
                };
            } else {
                // Add new skill
                skills.technical.push({
                    name,
                    proficiency,
                    category
                });
            }
            
            // Save to localStorage
            localStorage.setItem('skills', JSON.stringify(skills));
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addSkillModal'));
            modal.hide();
            
            // Refresh table
            setupSkillManagement();
        });
    }
    
    // Update proficiency value display
    const proficiencySlider = document.getElementById('skillProficiency');
    if (proficiencySlider) {
        proficiencySlider.addEventListener('input', function() {
            document.getElementById('proficiencyValue').textContent = this.value + '%';
        });
    }
}
