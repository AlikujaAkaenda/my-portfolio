// Database utility functions for loading data from JSON files

class Database {
    constructor() {
        this.cache = {};
    }

    async loadJSON(path) {
        if (this.cache[path]) {
            return this.cache[path];
        }

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Failed to load ${path}`);
            const data = await response.json();
            this.cache[path] = data;
            return data;
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            return null;
        }
    }

    async getProjects() {
        const data = await this.loadJSON('database/projects.json');
        return data?.projects || [];
    }

    async getFeaturedProjects() {
        const projects = await this.getProjects();
        return projects.filter(p => p.featured);
    }

    async getProjectById(id) {
        const projects = await this.getProjects();
        return projects.find(p => p.id === parseInt(id));
    }

    async getProjectsByCategory(category) {
        const projects = await this.getProjects();
        return category === 'all' 
            ? projects 
            : projects.filter(p => p.category === category);
    }

    async getSkills() {
        const data = await this.loadJSON('database/skills.json');
        return data?.skills || {};
    }

    async getTestimonials() {
        const data = await this.loadJSON('database/testimonials.json');
        return data?.testimonials || [];
    }

    async searchProjects(query) {
        const projects = await this.getProjects();
        const searchTerm = query.toLowerCase();
        return projects.filter(p => 
            p.title.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.technologies.some(t => t.toLowerCase().includes(searchTerm))
        );
    }

    clearCache() {
        this.cache = {};
    }
}

// Create global database instance
const db = new Database();
