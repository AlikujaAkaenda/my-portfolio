// ===== PROJECTS PAGE FILTERING =====

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('projects.html')) {
        initializeProjectsPage();
    }
});

function initializeProjectsPage() {
    loadAllProjects();
    initializeFilters();
}

async function loadAllProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    try {
        const projects = await db.getProjects();
        displayProjects(projects);
        setupFilterButtons(projects);
    } catch (error) {
        console.error('Failed to load projects:', error);
        projectsGrid.innerHTML = '<p class="error">Failed to load projects</p>';
    }
}

function displayProjects(projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    projectsGrid.className = 'projects-masonry';
    
    projects.forEach(project => {
        const card = createProjectCard(project);
        card.dataset.technologies = project.technologies.join(',').toLowerCase();
        card.dataset.category = project.category;
        projectsGrid.appendChild(card);
    });
}

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-projects');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            filterProjects(filter);
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(async () => {
            const results = await db.searchProjects(searchInput.value);
            displayProjects(results);
        }, 300));
    }
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (filter === 'all') {
            project.style.display = 'block';
        } else {
            const category = project.dataset.category;
            const technologies = project.dataset.technologies || '';
            
            if (category === filter || technologies.includes(filter)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function setupFilterButtons(projects) {
    const technologies = new Set();
    const categories = new Set();
    
    projects.forEach(project => {
        categories.add(project.category);
        project.technologies.forEach(tech => technologies.add(tech));
    });
    
    const filterContainer = document.getElementById('project-filters');
    if (filterContainer) {
        filterContainer.innerHTML = '<button class="filter-btn active" data-filter="all">All Projects</button>';
        
        categories.forEach(cat => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.dataset.filter = cat;
            button.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            filterContainer.appendChild(button);
        });
        
        initializeFilters();
    }
}
