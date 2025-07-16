# Modern Portfolio Website

A sleek, modern, and responsive portfolio website for a web design and development service. Built with HTML, CSS, and JavaScript, featuring smooth animations and a minimalist design.

## Features

- Modern, minimalist design with monochromatic color scheme
- Responsive layout that works on all devices
- Smooth scroll animations and transitions
- Interactive elements with hover effects
- Mobile-friendly navigation
- Contact form with validation
- Portfolio showcase section
- Pricing plans with feature comparison
- Custom scrollbar
- Parallax effects

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (ES6+)
- Inter Font Family
- ScrollReveal.js

## Project Structure

```
portfolio-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── images/
    ├── portfolio-1.jpg
    ├── portfolio-2.jpg
    └── portfolio-3.jpg
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
```

2. Navigate to the project directory:
```bash
cd portfolio-website
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server

# Using Node.js
npx serve
```

## Customization

### Colors
The color scheme can be easily modified by changing the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --accent-color: #333333;
    --text-color: #1a1a1a;
    --light-gray: #f5f5f5;
}
```

### Content
- Update the hero section text in `index.html`
- Add your own portfolio images to the `images` directory
- Modify pricing plans and features
- Update contact information and social media links

### Animations
Animation timings and effects can be adjusted in `styles.css` and `main.js`:

- Scroll reveal timing: `transition: all 0.8s ease;`
- Hover effects: `transition: var(--transition);`
- Parallax effect speed: `const speed = (index + 1) * 0.1;`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Font: [Inter](https://fonts.google.com/specimen/Inter)
- Icons: Emoji (native)
- Animation Library: [ScrollReveal](https://scrollrevealjs.org/) 