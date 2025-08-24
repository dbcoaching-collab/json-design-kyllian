# 🏋️ Premium Fitness Coaching Website

A complete, responsive coaching website built with the exact specifications from your Premium Dark Fitness Coaching Design System. Features a split-screen hero layout, vertical sidebar navigation, and premium dark aesthetic with gold accents.

## ✨ Features

- **Split-screen hero section** with left content and right image area
- **Vertical sidebar navigation** with icon-based menu items
- **Tabbed services interface** for easy service presentation
- **Responsive design** that works perfectly on all devices
- **High-contrast black & white imagery treatment**
- **Premium gold accent colors** (#d4af37) throughout
- **Smooth animations and hover effects**
- **Contact form with validation**
- **Testimonials with overlay design**
- **Mobile-optimized navigation**

## 🚀 Quick Start

1. **Open the website**: Simply open `index.html` in your web browser
2. **View on mobile**: Resize your browser or use developer tools to see mobile responsiveness
3. **Test interactions**: Click through tabs, navigation, and forms to see functionality

## 🎨 Customization Guide

### Replacing Images

The website currently uses placeholder gradients for images. To add your own images:

1. **Hero Image** (Right side of hero section):
   ```html
   <!-- Find this section in index.html -->
   <div class="hero-image-placeholder">
       <!-- Replace with: -->
       <img src="path/to/your/hero-image.jpg" alt="Hero Image" style="width: 100%; height: 100%; object-fit: cover;">
   </div>
   ```

2. **Service Images**:
   ```html
   <!-- Find each service-card image section -->
   <div class="image-placeholder"></div>
   <!-- Replace with: -->
   <img src="path/to/your/service-image.jpg" alt="Service Name" style="width: 100%; height: 100%; object-fit: cover;">
   ```

3. **About Section Image**:
   ```html
   <!-- Find in about section -->
   <div class="image-placeholder"></div>
   <!-- Replace with: -->
   <img src="path/to/your/about-image.jpg" alt="About Coach" style="width: 100%; height: 100%; object-fit: cover;">
   ```

4. **Testimonial Images**:
   ```html
   <!-- Find in each testimonial-card -->
   <div class="image-placeholder"></div>
   <!-- Replace with: -->
   <img src="path/to/your/testimonial-image.jpg" alt="Client Name" style="width: 100%; height: 100%; object-fit: cover;">
   ```

### Recommended Image Specifications

- **Hero Image**: 1920x1080px (16:9 ratio) - High quality fitness/coaching imagery
- **Service Images**: 800x600px (4:3 ratio) - Relevant to each service
- **About Image**: 600x800px (3:4 ratio) - Professional headshot or action shot
- **Testimonial Images**: 400x400px (1:1 ratio) - Client photos or relevant imagery

### Updating Content

#### Hero Section
```html
<h1 class="hero-title">YOUR CUSTOM TITLE</h1>
<p class="hero-description">
    Your custom description text here...
</p>
```

#### Services
```html
<!-- Update tab names -->
<button class="tab active" data-tab="personal">YOUR SERVICE NAME</button>

<!-- Update service content -->
<h3 class="service-title">YOUR SERVICE TITLE</h3>
<p class="service-description">
    Your service description...
</p>
```

#### About Section
```html
<h2 class="section-title">ABOUT YOU</h2>
<p class="about-description">
    Your personal story and experience...
</p>

<!-- Update stats -->
<div class="stat">
    <span class="stat-number">YOUR NUMBER</span>
    <span class="stat-label">Your Label</span>
</div>
```

#### Testimonials
```html
<blockquote class="testimonial-quote">
    "Your client's testimonial here..."
</blockquote>
<span class="author-name">Client Name</span>
```

#### Contact Information
```html
<!-- Update contact details -->
<span>Your Address</span>
<span>Your Phone</span>
<span>Your Email</span>
```

### Color Customization

The website uses CSS variables for easy color customization. Edit `styles.css`:

```css
:root {
    --color-bg-primary: #000000;           /* Main background */
    --color-bg-surface: #111111;           /* Section backgrounds */
    --color-accent-gold: #d4af37;         /* Gold accent color */
    --color-accent-gold-hover: #b8941f;   /* Gold hover state */
    /* ... other colors */
}
```

### Typography Customization

Update fonts in `styles.css`:

```css
:root {
    --font-family-primary: 'Your Font', system-ui, sans-serif;
}
```

And add your font import in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;700&display=swap" rel="stylesheet">
```

## 📱 Mobile Responsiveness

The website automatically adapts to different screen sizes:

- **Desktop**: Full sidebar navigation, split-screen hero
- **Tablet**: Responsive layout with adjusted spacing
- **Mobile**: Collapsible navigation, stacked layouts

## 🔧 Technical Details

### File Structure
```
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # Interactive functionality
└── README.md           # This file
```

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance Features
- Optimized scroll handling
- Lazy loading animations
- Efficient CSS variables
- Minimal JavaScript footprint

## 🚀 Deployment

### Local Development
1. Open `index.html` in your browser
2. Make changes to files
3. Refresh browser to see updates

### Web Hosting
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Test all functionality on live site

### Form Handling
The contact form currently shows a success message. To make it functional:

1. **Email Service** (e.g., Formspree, Netlify Forms):
   ```html
   <form action="https://formspree.io/your-email@domain.com" method="POST">
   ```

2. **Custom Backend**:
   - Update the form action in `index.html`
   - Modify form handling in `script.js`

## 🎯 SEO Optimization

### Meta Tags
Update in `index.html`:
```html
<title>Your Business Name - Fitness Coaching</title>
<meta name="description" content="Your business description">
<meta name="keywords" content="fitness, coaching, personal training">
```

### Images
- Add descriptive `alt` attributes to all images
- Use relevant filenames for images
- Optimize image sizes for web

## 🔍 Troubleshooting

### Common Issues

1. **Images not displaying**:
   - Check file paths are correct
   - Ensure images are in the right directory
   - Verify image file formats (jpg, png, webp)

2. **Styling not loading**:
   - Check `styles.css` is in the same directory as `index.html`
   - Clear browser cache
   - Check browser console for errors

3. **JavaScript not working**:
   - Ensure `script.js` is in the same directory
   - Check browser console for errors
   - Verify JavaScript is enabled in browser

### Browser Console
Open developer tools (F12) to see:
- Loading confirmations
- Any JavaScript errors
- Performance information

## 📞 Support

For customization help or questions:
1. Check this README for common solutions
2. Review the code comments for guidance
3. Test changes in small increments
4. Use browser developer tools for debugging

## 🎉 Success!

Your premium fitness coaching website is now ready! The design system ensures:
- Professional, premium aesthetic
- Consistent branding throughout
- Excellent user experience
- Easy customization for your needs
- Mobile-first responsive design

Start by replacing the placeholder content with your own, then add your images and customize the colors to match your brand perfectly!
