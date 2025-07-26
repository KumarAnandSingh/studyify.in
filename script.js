/*
 * script.js
 *
 * Client‑side behaviour for the Studyify blog. This file powers
 * homepage rendering, search functionality, category filtering, guest
 * session management and subscription handling. Comments and reactions
 * logic lives in article.js loaded on blog pages.
 */

// Utility: Generate a UUID v4 for guest IDs
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Initialize guest session if not present
function initGuestSession() {
  if (!localStorage.getItem('guestId')) {
    localStorage.setItem('guestId', generateUUID());
  }
}

// Render the current year in the footer
function renderYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// Populate category list and attach click handlers for filtering
function renderCategories(posts) {
  const categoryList = document.getElementById('categoryList');
  if (!categoryList) return;
  // Extract unique categories
  const categories = Array.from(new Set(posts.map(p => p.category)));
  // Add 'All' filter
  const allItem = document.createElement('div');
  allItem.textContent = 'All';
  allItem.classList.add('category-item', 'active');
  allItem.addEventListener('click', () => {
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    allItem.classList.add('active');
    renderPosts(posts);
  });
  categoryList.appendChild(allItem);
  // Create each category item
  categories.forEach(cat => {
    const item = document.createElement('div');
    item.textContent = cat;
    item.classList.add('category-item');
    item.addEventListener('click', () => {
      document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      const filtered = posts.filter(p => p.category === cat);
      renderPosts(filtered);
    });
    categoryList.appendChild(item);
  });
}

// Render posts into the grid
function renderPosts(postsToRender) {
  const grid = document.getElementById('postsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  postsToRender.forEach(post => {
    const card = document.createElement('article');
    card.classList.add('post-card');
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="post-card-content">
        <div class="post-meta">${post.category} • ${post.date}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="blog.html?id=${post.id}" class="btn">Read More</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Setup search functionality
function setupSearch(posts) {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = posts.filter(p => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query) || p.content.toLowerCase().includes(query));
    // When filtering, remove category active states
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    renderPosts(filtered);
  });
}

// Subscribe form handler
function setupSubscribe() {
  const form = document.getElementById('subscribeForm');
  const emailInput = document.getElementById('subscribeEmail');
  const messageDiv = document.getElementById('subscribeMessage');
  if (!form || !emailInput) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    // rudimentary email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      messageDiv.textContent = 'Please enter a valid email address.';
      messageDiv.style.color = 'red';
      return;
    }
    // Save email to localStorage for demonstration; in real application this would be sent to a backend
    const subs = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    subs.push({ email, date: new Date().toISOString() });
    localStorage.setItem('subscriptions', JSON.stringify(subs));
    messageDiv.textContent = 'Thank you for subscribing!';
    messageDiv.style.color = 'green';
    emailInput.value = '';
  });
}

// Initialise everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initGuestSession();
  renderYear();
  if (window.posts) {
    // Sort posts by date descending
    const sortedPosts = window.posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    renderCategories(sortedPosts);
    renderPosts(sortedPosts);
    setupSearch(sortedPosts);
  }
  setupSubscribe();
});