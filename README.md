# Database Documentation

## Overview

This portfolio uses JSON files as a simple database for storing and managing content. All data is stored in the `database/` folder.

## Database Files

### 1. projects.json
Stores all project information including:
- Project details (title, description, images)
- Technologies used
- Links (live demo, GitHub)
- Categories and featured status

**Structure:**
```json
{
  "projects": [
    {
      "id": 1,
      "title": "Project Name",
      "description": "Short description",
      "longDescription": "Detailed description",
      "image": "images/projects/project.jpg",
      "technologies": ["React", "Node.js"],
      "category": "fullstack",
      "liveUrl": "https://...",
      "githubUrl": "https://...",
      "featured": true,
      "date": "2024-12"
    }
  ]
}
```

### 2. skills.json
Stores skills organized by category:
- Frontend skills
- Backend skills
- Tools and technologies

**Structure:**
```json
{
  "skills": {
    "frontend": [
      { "name": "HTML5", "level": 90, "icon": "fab fa-html5" }
    ],
    "backend": [...],
    "tools": [...]
  }
}
```

### 3. testimonials.json
Stores client testimonials and reviews.

**Structure:**
```json
{
  "testimonials": [
    {
      "id": 1,
      "name": "Client Name",
      "position": "Job Title",
      "company": "Company Name",
      "image": "images/testimonials/client.jpg",
      "text": "Testimonial text",
      "rating": 5
    }
  ]
}
```

### 4. contacts.json
Stores contact form submissions and newsletter signups.

## Database API (js/database.js)

### Methods

**getProjects()** - Get all projects
```javascript
const projects = await db.getProjects();
```

**getFeaturedProjects()** - Get only featured projects
```javascript
const featured = await db.getFeaturedProjects();
```

**getProjectById(id)** - Get specific project
```javascript
const project = await db.getProjectById(1);
```

**getProjectsByCategory(category)** - Filter by category
```javascript
const fullstack = await db.getProjectsByCategory('fullstack');
```

**getSkills()** - Get all skills
```javascript
const skills = await db.getSkills();
```

**getTestimonials()** - Get all testimonials
```javascript
const testimonials = await db.getTestimonials();
```

**searchProjects(query)** - Search projects
```javascript
const results = await db.searchProjects('react');
```

## How to Update Content

### Adding a New Project

1. Open `database/projects.json`
2. Add new project object to the array:
```json
{
  "id": 7,
  "title": "New Project",
  "description": "Description",
  "image": "images/projects/new.jpg",
  "technologies": ["Tech1", "Tech2"],
  "category": "frontend",
  "liveUrl": "https://...",
  "githubUrl": "https://...",
  "featured": false,
  "date": "2025-01"
}
```
3. Save the file
4. Refresh your portfolio

### Adding a New Skill

1. Open `database/skills.json`
2. Add to appropriate category:
```json
{ "name": "New Skill", "level": 80, "icon": "fas fa-icon" }
```

### Adding a Testimonial

1. Open `database/testimonials.json`
2. Add new testimonial:
```json
{
  "id": 4,
  "name": "Client Name",
  "position": "Position",
  "company": "Company",
  "image": "images/testimonials/client.jpg",
  "text": "Review text",
  "rating": 5
}
```

## Features

✅ **Dynamic Content Loading** - All content loads from JSON files
✅ **Caching** - Database caches loaded data for performance
✅ **Search Functionality** - Search projects by title, description, or technology
✅ **Category Filtering** - Filter projects by category
✅ **Featured Projects** - Mark projects as featured for homepage
✅ **Easy Updates** - Just edit JSON files to update content

## Benefits

- No backend server required
- Easy to update content
- Version control friendly
- Fast loading with caching
- Simple to understand and maintain

## Future Enhancements

- Add blog posts database
- Add analytics tracking
- Add contact form storage
- Add project view counter
- Add search history
