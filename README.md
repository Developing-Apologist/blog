# The Developing Apologist Blog

A Markdown-powered blog built with Eleventy (11ty) that explores the intersection of Christian apologetics and software development. This blog is designed to equip Christian software developers with the tools and resources they need to defend their faith through logical, systematic reasoning.

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme with code editor aesthetics
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Typography**: Optimized for readability with proper spacing and hierarchy
- **Code Highlighting**: Syntax highlighting for code blocks
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Interactive Search**: Real-time search with beautiful glowing search bar
- **Category Filtering**: Filter posts by category with smooth animations
- **Content Discovery**: Advanced filtering system for easy content navigation

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd developing-apologist-blog
```

2. Install dependencies:
```bash
npm install
```

3. Build the CSS:
```bash
npm run build:css
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:8081`

## 📝 Creating New Blog Posts

### Step 1: Create a New Markdown File

Create a new `.md` file in the `src/posts/` directory. Use the following naming convention:

```
YYYY-MM-DD-post-title.md
```

Example: `2024-01-25-my-new-post.md`

### Step 2: Add Front Matter

Every blog post needs front matter at the top of the file:

```yaml
---
title: Your Post Title
date: 2024-01-25
description: A brief description of your post for SEO and social sharing
tags: [tag1, tag2, tag3]
category: apologetics  # Optional: apologetics, series, foundation, practical
layout: post.njk
pinned: false  # Optional: true to pin to homepage
order: 1  # Optional: for pinned post ordering
---
```

### Step 3: Write Your Content

Write your content using Markdown syntax:

```markdown
# Your Post Title

Your introduction paragraph goes here.

## Section Heading

Your content here. You can use:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- `inline code`

### Code Blocks

```javascript
function example() {
  console.log("Hello, World!");
}
```

### Lists

- Item 1
- Item 2
- Item 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3

### Blockquotes

> This is a blockquote. Use it for quotes or important callouts.

### Images

![Alt text](path/to/image.jpg)
```

### Step 4: Add Reading Time (Optional)

The reading time is automatically calculated, but you can override it by adding `readingTime: 5` to your front matter.

## 🏗️ Project Structure

```
src/
├── _data/              # Global data files
│   ├── site.json      # Site configuration
│   ├── tags.json      # Tag definitions
│   └── discord.json   # Discord integration settings
├── _includes/          # Template includes
│   ├── layouts/       # Layout templates
│   │   ├── base.njk   # Base layout
│   │   └── post.njk   # Blog post layout
│   └── shared/        # Shared components
│       └── includes/
│           └── components/
│               ├── navbar.njk
│               ├── footer.njk
│               └── discord-comments.njk
├── assets/            # Static assets (images, etc.)
├── css/              # CSS files
│   ├── blog-custom.css      # Blog-specific custom styles
│   └── blog-index.css       # Homepage-specific styles
├── posts/            # Blog posts (Markdown files)
├── index.njk         # Homepage with search and filtering
└── feed.xml.njk      # RSS feed
```

## 🎨 Customization

### CSS Architecture

This blog uses a centralized CSS approach:

1. **Centralized Tailwind CSS**: The main Tailwind CSS file is loaded from `https://developingapologist.com/css/tailwind.css`
2. **Custom Blog Styles**: Blog-specific styles are defined in `src/css/blog-custom.css` using Tailwind's `@apply` directive
3. **Build Process**: Custom styles are processed with Tailwind to resolve `@apply` directives and generate `src/css/blog-custom-built.css`

This approach ensures:
- **Consistency**: All sites use the same base Tailwind CSS
- **Performance**: CSS is cached across sites
- **Maintainability**: Color schemes and design tokens are centralized
- **Flexibility**: Blog-specific customizations are still possible

### Colors

The color scheme is defined in `tailwind.config.js`. The main colors are:

- **Background**: `#0B0E11` (Dark background)
- **Primary Text**: `#FFFFFF` (White text)
- **Primary Accent**: `#00BCD4` (Cyan)
- **Secondary Accent**: `#0077B6` (Blue)

### Typography

The site uses:
- **Sans-serif**: Inter for body text
- **Monospace**: JetBrains Mono for code

### Adding New Pages

1. Create a new `.njk` file in the `src/` directory
2. Add front matter with layout and metadata
3. Write your content using HTML and Nunjucks templating

Example:
```njk
---
layout: base.njk
title: My New Page
description: Description of my new page
---

<div class="max-w-4xl mx-auto px-4 py-12">
  <h1>My New Page</h1>
  <p>Your content here...</p>
</div>
```

## 🔧 Configuration

### Site Settings

Update `src/_data/site.js` with your site information:

```javascript
module.exports = {
  url: "https://your-domain.com",
  title: "Your Blog Title",
  description: "Your blog description",
  author: "Your Name",
  email: "your-email@example.com"
};
```

### Eleventy Configuration

The main configuration is in `eleventy.config.js`. Key features:

- **Collections**: Automatically organizes blog posts
- **Filters**: Date formatting, URL encoding, etc.
- **Shortcodes**: Reading time calculation
- **Passthrough**: Static asset copying

## 📦 Build Commands

```bash
# Build CSS only (processes @apply directives)
npm run build:css

# Build the entire site
npm run build

# Start development server with watch
npm run dev

# Start development server only
npm run start

# Clean build directory
npm run clean

# View scheduled posts
npm run schedule

# Publish a scheduled post early
npm run publish <filename.md>
```

## 🚀 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select your source branch (usually `main`)
4. Set the folder to `/docs` or `/` (root)
5. Update your site URL in `src/_data/site.js`

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `_site`
4. Deploy!

### Vercel

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `_site`
4. Deploy!

## 📊 Features

### Blog Features

- ✅ **Markdown Support**: Write posts in Markdown
- ✅ **Automatic Reading Time**: Calculated based on word count
- ✅ **Tags and Categories**: Organize content with tags and categories
- ✅ **Pagination**: Automatic pagination for blog listings
- ✅ **RSS Feed**: Automatic RSS feed generation
- ✅ **SEO Optimization**: Meta tags, Open Graph, structured data
- ✅ **Social Sharing**: Twitter and LinkedIn sharing buttons
- ✅ **Scheduled Publishing**: Schedule posts for future publication
- ✅ **Pinned Posts**: Pin important posts to the homepage
- ✅ **Series Support**: Link related posts in series
- ✅ **Discord Integration**: Comments powered by Discord

### Content Discovery Features

- ✅ **Real-time Search**: Search posts by title, description, and tags
- ✅ **Category Filtering**: Filter by apologetics, series, foundation, practical
- ✅ **Combined Filtering**: Search within categories
- ✅ **Results Counter**: Shows filtered results count
- ✅ **Smooth Animations**: Beautiful transitions and hover effects
- ✅ **Responsive Design**: Works on all screen sizes

### Technical Features

- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Dark Theme**: Modern dark color scheme with glowing accents
- ✅ **Fast Loading**: Optimized CSS and assets
- ✅ **Accessibility**: Semantic HTML and ARIA labels
- ✅ **Search Engine Friendly**: Clean URLs and meta tags
- ✅ **Modular CSS**: Separate CSS files for different components
- ✅ **JavaScript Filtering**: Client-side content filtering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Eleventy](https://www.11ty.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

## 📞 Support

If you have questions or need help:

1. Check the documentation above
2. Look at existing issues in the repository
3. Create a new issue with your question

---

**Happy blogging!** 🚀 