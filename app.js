// Global variables
let allDocs = [];
let allResources = [];

// Load documents data
async function loadDocs() {
    try {
        const response = await fetch('/data/docs.json');
        allDocs = await response.json();
        initializeHome();
    } catch (error) {
        console.error('Error loading docs:', error);
    }
}

// Load resources data
async function loadResources() {
    try {
        const response = await fetch('/data/resources.json');
        allResources = await response.json();
        if (window.location.pathname.includes('recursos')) {
            renderResources(allResources);
        }
    } catch (error) {
        console.error('Error loading resources:', error);
    }
}

// Initialize home page
function initializeHome() {
    updateStats();
    renderQuickAccess();
    renderSectionDocs();
    highlightActiveNav();
}

// Update stats
function updateStats() {
    const stats = {
        protocolos: 0,
        procedimientos: 0,
        matrices: 0,
        otros: 0
    };
    
    allDocs.forEach(doc => {
        if (doc.section === 'protocolos') stats.protocolos++;
        else if (doc.section === 'procedimientos') stats.procedimientos++;
        else if (doc.section === 'matrices') stats.matrices++;
        else stats.otros++;
    });
    
    document.getElementById('stat-protocolos').textContent = stats.protocolos;
    document.getElementById('stat-procedimientos').textContent = stats.procedimientos;
    document.getElementById('stat-matrices').textContent = stats.matrices;
    document.getElementById('stat-otros').textContent = stats.otros;
}

// Render quick access cards
function renderQuickAccess() {
    const container = document.getElementById('quickAccessCards');
    if (!container) return;
    
    const criticalDocs = allDocs.filter(doc => doc.critical);
    
    container.innerHTML = criticalDocs.map(doc => createDocCard(doc)).join('');
}

// Render section documents
function renderSectionDocs() {
    renderSection('protocolos', 'protocolosList');
    renderSection('procedimientos', 'procedimientosList');
    renderSection('matrices', 'matricesList');
}

// Render specific section
function renderSection(section, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const docs = allDocs.filter(doc => doc.section === section);
    container.innerHTML = docs.map(doc => createDocCard(doc)).join('');
}

// Create document card HTML
function createDocCard(doc) {
    const tagsHtml = doc.tags.map(tag => 
        `<span class="tag" onclick="searchByTag('${tag}')">${tag}</span>`
    ).join('');
    
    return `
        <div class="doc-card">
            <h3><a href="${doc.url}">${doc.title}</a></h3>
            <div class="doc-meta">
                <span><strong>Versión:</strong> ${doc.version}</span>
                <span><strong>Actualizado:</strong> ${doc.updated}</span>
                ${doc.area ? `<span><strong>Área:</strong> ${doc.area}</span>` : ''}
            </div>
            <p class="doc-summary">${doc.summary}</p>
            <div class="doc-tags">${tagsHtml}</div>
        </div>
    `;
}

// Perform search
function performSearch() {
    const query = document.getElementById('globalSearch').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    
    if (!query) {
        resultsContainer.innerHTML = '';
        return;
    }
    
    const results = allDocs.filter(doc => {
        return doc.title.toLowerCase().includes(query) ||
               doc.summary.toLowerCase().includes(query) ||
               doc.tags.some(tag => tag.toLowerCase().includes(query)) ||
               (doc.area && doc.area.toLowerCase().includes(query));
    });
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron documentos que coincidan con tu búsqueda.</p>';
        return;
    }
    
    resultsContainer.innerHTML = results.map(doc => `
        <div class="search-result-item">
            <h3><a href="${doc.url}">${doc.title}</a></h3>
            <div class="search-result-meta">
                ${doc.section} • Versión ${doc.version} • ${doc.updated}
            </div>
            <p>${doc.summary}</p>
        </div>
    `).join('');
}

// Search by tag
function searchByTag(tag) {
    document.getElementById('globalSearch').value = tag;
    performSearch();
    
    // Scroll to search results
    document.getElementById('searchResults').scrollIntoView({ behavior: 'smooth' });
}

// Show section on home page
function showSection(event, sectionId) {
    event.preventDefault();
    
    // Hide all sections
    document.querySelectorAll('.doc-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Highlight active navigation link
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

// Print document
function printDocument() {
    window.print();
}

// Smooth scroll to anchor
function scrollToAnchor(anchorId) {
    const element = document.getElementById(anchorId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Setup TOC links
function setupTOCLinks() {
    const tocLinks = document.querySelectorAll('.toc-list a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToAnchor(targetId);
        });
    });
}

// Resources page functions
function renderResources(resources) {
    const container = document.getElementById('resourcesGrid');
    if (!container) return;
    
    container.innerHTML = resources.map(resource => createResourceCard(resource)).join('');
}

function createResourceCard(resource) {
    const tagsHtml = resource.tags.map(tag => 
        `<span class="tag" onclick="filterResourcesByTag('${tag}')">${tag}</span>`
    ).join('');
    
    const relatedDocs = resource.related_docs && resource.related_docs.length > 0
        ? resource.related_docs.map(doc => `<a href="${doc.url}">${doc.title}</a>`).join(', ')
        : 'Ninguno';
    
    return `
        <div class="resource-card" data-type="${resource.type}" data-area="${resource.area}">
            <div class="resource-header">
                <h3>${resource.title}</h3>
                <span class="resource-type">${resource.type}</span>
            </div>
            <div class="resource-meta">
                <strong>Área:</strong> ${resource.area} • <strong>Fecha:</strong> ${resource.date}
            </div>
            <div class="resource-tags">${tagsHtml}</div>
            <div class="resource-related">
                <strong>Documentos relacionados:</strong> ${relatedDocs}
            </div>
            <div class="resource-actions">
                <a href="${resource.file_path}" class="btn btn-primary" target="_blank">Abrir recurso</a>
            </div>
        </div>
    `;
}

function filterResources() {
    const typeFilter = document.getElementById('filterType')?.value || 'all';
    const areaFilter = document.getElementById('filterArea')?.value || 'all';
    const searchQuery = document.getElementById('resourceSearch')?.value.toLowerCase() || '';
    
    let filtered = allResources;
    
    if (typeFilter !== 'all') {
        filtered = filtered.filter(r => r.type === typeFilter);
    }
    
    if (areaFilter !== 'all') {
        filtered = filtered.filter(r => r.area === areaFilter);
    }
    
    if (searchQuery) {
        filtered = filtered.filter(r => 
            r.title.toLowerCase().includes(searchQuery) ||
            r.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
    }
    
    renderResources(filtered);
}

function filterResourcesByTag(tag) {
    const filtered = allResources.filter(r => r.tags.includes(tag));
    renderResources(filtered);
}

function clearResourceFilters() {
    if (document.getElementById('filterType')) document.getElementById('filterType').value = 'all';
    if (document.getElementById('filterArea')) document.getElementById('filterArea').value = 'all';
    if (document.getElementById('resourceSearch')) document.getElementById('resourceSearch').value = '';
    renderResources(allResources);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDocs();
    
    // Setup search on Enter key
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Setup TOC links if on document page
    if (document.querySelector('.toc-list')) {
        setupTOCLinks();
    }
    
    // Load resources if on resources page
    if (window.location.pathname.includes('recursos')) {
        loadResources();
    }
    
    // Highlight active nav
    highlightActiveNav();
});
