# CaseStudyBlock Implementation Plan

## Core Requirements

### Layout & Structure

- It should display one hero case study and two supporting case studies
- It should ensure no duplicate case studies are shown simultaneously
- It should maintain responsive layout (stack on mobile, grid on desktop)
- It should use rounded corners (rounded-2xl) consistently

### Hero Case Study Card

- It should display a full-width background image
- It should have a semi-transparent overlay with blur effect
- It should contain:
  - Company logo (top left)
  - Testimonial quote (center)
  - Author name and position (bottom)
  - Optional metrics (if provided)
  - "Read story" link (optional for future implementation)
  - case studies shoultn't be in the sitemap.

### Supporting Case Study Cards

- It should display in a two-column layout on desktop
- It should contain:
  - Company logo
  - Key metric/achievement
  - Brief headline
  - "Read how" link (optional for future implementation)

### Animation & Interaction

- It should rotate case studies automatically every 6 seconds
- It should animate transitions smoothly using Framer Motion
- It should cross-fade between case studies
- It should ensure smooth background image transitions
- It should maintain performance with image loading

## Data Model Requirements

### CaseStudies Collection

- It should be defined as a collection (`collections/CaseStudies.ts`)
- It should be reusable across the site
- It should store:
  ```typescript
  {
    slug: 'case-studies',
    admin: {
      useAsTitle: 'company.name',
      group: 'Content',
      description: 'Customer case studies and testimonials'
    },
    access: {
      read: () => true,
    },
    fields: [
      {
        name: 'company',
        type: 'group',
        required: true,
        fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'logo', type: 'upload', relationTo: 'media', required: true }
        ]
      },
      {
        name: 'testimonial',
        type: 'group',
        required: true,
        fields: [
          { name: 'quote', type: 'textarea', required: true },
          { name: 'author', type: 'text', required: true },
          { name: 'position', type: 'text', required: true },
          { name: 'company', type: 'text', required: true }
        ]
      },
      {
        name: 'background',
        type: 'upload',
        relationTo: 'media',
        required: true,
        admin: {
          description: 'Background image (recommended: 1920x1080px)'
        }
      },
      {
        name: 'metrics',
        type: 'array',
        maxRows: 2,
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'text', required: true }
        ]
      }
    ]
  }
  ```

### CaseStudyBlock Structure

- It should reference the CaseStudies collection
- It should store:
  ```typescript
  {
    slug: 'caseStudyShowcase',
    fields: [
      {
        name: 'caseStudies',
        type: 'relationship',
        relationTo: 'case-studies',
        hasMany: true,
        required: true,
        minRows: 4,
        admin: {
          description: 'Select at least 4 case studies to display in rotation'
        }
      },
      {
        name: 'rotationSpeed',
        type: 'number',
        min: 3000,
        max: 10000,
        defaultValue: 6000,
        admin: {
          description: 'Rotation speed in milliseconds'
        }
      }
    ]
  }
  ```

## Implementation Tasks

1. [ ] Collection Setup

   - [ ] Create collection
   - [ ] Set up access control
   - [ ] Add admin panel configuration
   - [ ] Test collection CRUD operations

2. [ ] Block Configuration

   - [ ] Set up basic block structure
   - [ ] Define all required fields
   - [ ] Add admin descriptions and labels
   - [ ] Configure field validation

3. [ ] Component Development

   - [ ] Create base Component.tsx with rotation logic
   - [ ] Implement HeroCard with blur effect
   - [ ] Build SupportingCard component
   - [ ] Create Metric component for reuse

4. [ ] Animation System

   - [ ] Set up Framer Motion
   - [ ] Implement cross-fade transitions
   - [ ] Add background image transitions
   - [ ] Ensure smooth rotation animations

5. [ ] Responsive Design

   - [ ] Implement mobile layout
   - [ ] Create tablet breakpoints
   - [ ] Design desktop grid
   - [ ] Test responsive behavior

6. [ ] Performance Optimization
   - [ ] Implement image lazy loading
   - [ ] Optimize animation performance
   - [ ] Add loading states
   - [ ] Test with multiple case studies

## Future Considerations

### Potential Enhancements

- [ ] Add pause on hover functionality
- [ ] Implement manual navigation controls
- [ ] Add configurable rotation timing
- [ ] Include "Read more" link functionality
- [ ] Add progress indicator for rotations

### Questions to Resolve

1. Should we implement manual navigation arrows?
   yes
2. Do we need a visual indicator for rotation timing?
   yes
3. Should we add keyboard navigation support?
   put this to the @backlog.md
4. Do we need to handle failed image loads gracefully?
   not sure what this means, but put this to the backlog

## Design Specifications

### Visual

- Border Radius: rounded-2xl (Tailwind)
- Blur Effect: backdrop-blur-lg with bg-opacity-80
- Transitions: 500ms ease-in-out
- Spacing: Consistent with Tailwind's spacing scale
- Typography: Follow existing design system
