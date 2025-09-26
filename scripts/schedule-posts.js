#!/usr/bin/env node

/**
 * Schedule Posts Script
 * 
 * This script helps manage scheduled blog posts by:
 * 1. Showing which posts are scheduled for the future
 * 2. Allowing you to "publish" a post early by changing its date
 * 3. Showing the publication schedule
 */

const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');

const POSTS_DIR = path.join(__dirname, '../src/posts');

function getPostMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) return null;
  
  const frontmatter = frontmatterMatch[1];
  const metadata = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      metadata[key.trim()] = value.replace(/^["']|["']$/g, ''); // Remove quotes
    }
  });
  
  return metadata;
}

function getAllPosts() {
  const files = fs.readdirSync(POSTS_DIR);
  const posts = [];
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(POSTS_DIR, file);
      const metadata = getPostMetadata(filePath);
      
      if (metadata && metadata.date) {
        posts.push({
          file: file,
          filePath: filePath,
          title: metadata.title || 'Untitled',
          date: metadata.date,
          published: new Date(metadata.date) <= new Date()
        });
      }
    }
  });
  
  return posts.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function showSchedule() {
  console.log('📅 Blog Post Schedule\n');
  
  const posts = getAllPosts();
  const now = new Date();
  
  posts.forEach(post => {
    const postDate = new Date(post.date);
    const isPublished = post.published;
    const status = isPublished ? '✅ Published' : '⏰ Scheduled';
    const dateStr = DateTime.fromJSDate(postDate).toFormat('yyyy-MM-dd');
    
    console.log(`${status} | ${dateStr} | ${post.title}`);
  });
  
  const scheduledCount = posts.filter(p => !p.published).length;
  const publishedCount = posts.filter(p => p.published).length;
  
  console.log(`\n📊 Summary:`);
  console.log(`   Published: ${publishedCount}`);
  console.log(`   Scheduled: ${scheduledCount}`);
  console.log(`   Total: ${posts.length}`);
}

function publishPost(filename) {
  const filePath = path.join(POSTS_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Post not found: ${filename}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const today = DateTime.now().toFormat('yyyy-MM-dd');
  
  // Replace the date in frontmatter
  const updatedContent = content.replace(
    /^date:\s*.*$/m,
    `date: ${today}`
  );
  
  fs.writeFileSync(filePath, updatedContent);
  console.log(`✅ Published: ${filename} (date set to ${today})`);
}

function showHelp() {
  console.log(`
📝 Blog Post Scheduler

Usage:
  node scripts/schedule-posts.js [command]

Commands:
  schedule              Show the publication schedule
  publish <filename>    Publish a scheduled post early
  help                  Show this help message

Examples:
  node scripts/schedule-posts.js schedule
  node scripts/schedule-posts.js publish 2025-10-03-testing-deployment-analogy.md
`);
}

// Main execution
const command = process.argv[2];

switch (command) {
  case 'schedule':
    showSchedule();
    break;
  case 'publish':
    const filename = process.argv[3];
    if (!filename) {
      console.error('❌ Please provide a filename to publish');
      process.exit(1);
    }
    publishPost(filename);
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    if (command) {
      console.error(`❌ Unknown command: ${command}`);
    }
    showHelp();
    break;
}
