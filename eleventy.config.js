const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Add Luxon date filter for footer component
  eleventyConfig.addFilter("date", function(date, format = "yyyy") {
    // If input is a string 'now', use current date
    if (date === "now") {
      return DateTime.now().toFormat(format);
    }
    // If input is a Date object
    if (date instanceof Date) {
      return DateTime.fromJSDate(date).toFormat(format);
    }
    // If input is a string date
    return DateTime.fromISO(date).toFormat(format);
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("_redirects");

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/css/");

  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/**/*.md").sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });

  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagsSet = new Set();
    collectionApi.getAll().forEach(item => {
      if (item.data.tags) {
        item.data.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet).sort();
  });



  // Filters
  eleventyConfig.addFilter("dateReadable", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter("dateIso", function(date) {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("slug", function(str) {
    return str.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  });

  eleventyConfig.addFilter("absoluteUrl", function(url) {
    // This will need to be updated with your actual domain
    const baseUrl = "https://blog.developingapologist.com";
    return `${baseUrl}${url}`;
  });

  eleventyConfig.addFilter("urlencode", function(str) {
    return encodeURIComponent(str);
  });

  eleventyConfig.addFilter("striptags", function(str) {
    return str.replace(/<[^>]*>/g, '');
  });

  eleventyConfig.addFilter("truncate", function(str, length) {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  });

  eleventyConfig.addFilter("filterByTag", function(posts, tag) {
    return posts.filter(post => {
      return post.data.tags && post.data.tags.includes(tag);
    });
  });

  // Shortcodes
  eleventyConfig.addShortcode("readingTime", function(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  });

  // Global data

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    nunjucksOptions: {
      // Add shared includes to the search path
      searchPaths: [
        "src/_includes",
        "src/_includes/shared/includes"
      ]
    }
  };
}; 