/*
 * article.js
 *
 * Handles dynamic rendering of an individual blog post, reactions,
 * comments and recommended posts on the article page. This script
 * assumes `posts.js` has loaded ahead of it and that posts are
 * available via the global `posts` array.
 */

// Reuse UUID generator from script.js if it exists; if not, define here
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Ensure guest session exists
function initGuestSession() {
  if (!localStorage.getItem('guestId')) {
    localStorage.setItem('guestId', generateUUID());
  }
}

// Utility to get query parameter
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Render the current year in the footer
function renderYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// Retrieve reaction data from localStorage
function getReactionData() {
  return JSON.parse(localStorage.getItem('reactions') || '{}');
}

// Save reaction data back to localStorage
function saveReactionData(data) {
  localStorage.setItem('reactions', JSON.stringify(data));
}

// Retrieve comments for article
function getComments(articleId) {
  const key = `comments_${articleId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

// Save comments
function saveComments(articleId, comments) {
  const key = `comments_${articleId}`;
  localStorage.setItem(key, JSON.stringify(comments));
}

// Format date/time for comments
function formatDateTime(ts) {
  const dt = new Date(ts);
  return dt.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

// Render comments section
function renderComments(articleId) {
  const commentsContainer = document.createElement('div');
  commentsContainer.classList.add('comment-section');
  const commentsTitle = document.createElement('h3');
  commentsTitle.textContent = 'Discussion';
  commentsContainer.appendChild(commentsTitle);
  // Comment list
  const list = document.createElement('ul');
  list.classList.add('comment-list');
  const comments = getComments(articleId);
  if (comments.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No comments yet. Be the first to share your thoughts!';
    commentsContainer.appendChild(empty);
  } else {
    comments.forEach(c => {
      const item = document.createElement('li');
      item.classList.add('comment-item');
      item.innerHTML = `
        <div class="comment-author">Guest</div>
        <div class="comment-meta">${formatDateTime(c.timestamp)}</div>
        <div class="comment-text">${c.comment}</div>
      `;
      list.appendChild(item);
    });
    commentsContainer.appendChild(list);
  }
  // Comment form
  const form = document.createElement('form');
  form.style.marginTop = '1rem';
  const textarea = document.createElement('textarea');
  textarea.rows = 3;
  textarea.placeholder = 'Join the discussion…';
  textarea.style.width = '100%';
  textarea.style.padding = '0.5rem';
  textarea.style.borderRadius = 'var(--border-radius)';
  textarea.style.border = '1px solid #ccc';
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Post Comment';
  submitBtn.classList.add('btn');
  submitBtn.style.marginTop = '0.5rem';
  form.appendChild(textarea);
  form.appendChild(submitBtn);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = textarea.value.trim();
    if (!content) return;
    const newComment = {
      guestId: localStorage.getItem('guestId'),
      comment: content,
      timestamp: Date.now()
    };
    const current = getComments(articleId);
    current.push(newComment);
    saveComments(articleId, current);
    textarea.value = '';
    // Re-render
    articleContainer.querySelector('.comment-section').replaceWith(renderComments(articleId));
  });
  commentsContainer.appendChild(form);
  return commentsContainer;
}

// Render reaction bar
function renderReactions(articleId) {
  const reactionBar = document.createElement('div');
  reactionBar.classList.add('reaction-bar');
  const data = getReactionData();
  const reaction = data[articleId] || { likes: 0, dislikes: 0, userReaction: null };
  // create like button
  const likeBtn = document.createElement('div');
  likeBtn.classList.add('reaction-button');
  likeBtn.innerHTML = `👍 <span>${reaction.likes}</span>`;
  // create dislike button
  const dislikeBtn = document.createElement('div');
  dislikeBtn.classList.add('reaction-button');
  dislikeBtn.innerHTML = `👎 <span>${reaction.dislikes}</span>`;
  // highlight if user has reacted
  if (reaction.userReaction === 'like') likeBtn.classList.add('active');
  if (reaction.userReaction === 'dislike') dislikeBtn.classList.add('active');
  // click handlers
  likeBtn.addEventListener('click', () => {
    const current = getReactionData();
    const r = current[articleId] || { likes: 0, dislikes: 0, userReaction: null };
    if (r.userReaction === 'like') {
      // undo like
      r.likes -= 1;
      r.userReaction = null;
    } else {
      // set like; if previously disliked, remove dislike
      if (r.userReaction === 'dislike') {
        r.dislikes -= 1;
      }
      r.likes += 1;
      r.userReaction = 'like';
    }
    current[articleId] = r;
    saveReactionData(current);
    // update UI
    likeBtn.querySelector('span').textContent = r.likes;
    dislikeBtn.querySelector('span').textContent = r.dislikes;
    likeBtn.classList.toggle('active', r.userReaction === 'like');
    dislikeBtn.classList.toggle('active', r.userReaction === 'dislike');
  });
  dislikeBtn.addEventListener('click', () => {
    const current = getReactionData();
    const r = current[articleId] || { likes: 0, dislikes: 0, userReaction: null };
    if (r.userReaction === 'dislike') {
      r.dislikes -= 1;
      r.userReaction = null;
    } else {
      if (r.userReaction === 'like') {
        r.likes -= 1;
      }
      r.dislikes += 1;
      r.userReaction = 'dislike';
    }
    current[articleId] = r;
    saveReactionData(current);
    likeBtn.querySelector('span').textContent = r.likes;
    dislikeBtn.querySelector('span').textContent = r.dislikes;
    likeBtn.classList.toggle('active', r.userReaction === 'like');
    dislikeBtn.classList.toggle('active', r.userReaction === 'dislike');
  });
  reactionBar.appendChild(likeBtn);
  reactionBar.appendChild(dislikeBtn);
  return reactionBar;
}

// Render recommended posts
function renderRecommended(articleId) {
  const current = window.posts.find(p => p.id === articleId);
  const container = document.createElement('div');
  container.classList.add('recommended-posts');
  const heading = document.createElement('h3');
  heading.textContent = 'Recommended Articles';
  container.appendChild(heading);
  // filter posts other than current; prefer same category
  let recs = window.posts.filter(p => p.id !== articleId && p.category === current.category);
  if (recs.length < 3) {
    // add others to fill
    const others = window.posts.filter(p => p.id !== articleId && p.category !== current.category);
    recs = recs.concat(others);
  }
  // pick up to 3 unique posts
  recs = recs.slice(0, 3);
  const list = document.createElement('div');
  list.classList.add('posts-grid');
  recs.forEach(post => {
    const card = document.createElement('article');
    card.classList.add('post-card');
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="post-card-content">
        <div class="post-meta">${post.category}${post.subcategory ? ': ' + post.subcategory : ''} • ${post.date}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="blog.html?id=${post.id}" class="btn">Read More</a>
      </div>
    `;
    list.appendChild(card);
  });
  container.appendChild(list);
  return container;
}

// Render article page
function renderArticle() {
  const articleId = getQueryParam('id');
  const articleContainer = document.getElementById('articleContainer');
  if (!articleContainer) return;
  if (!articleId || !window.posts) {
    articleContainer.innerHTML = '<p>Article not found.</p>';
    return;
  }
  const post = window.posts.find(p => p.id === articleId);
  if (!post) {
    articleContainer.innerHTML = '<p>Article not found.</p>';
    return;
  }
  // Build article markup
  const wrapper = document.createElement('article');
  // Title
  const titleEl = document.createElement('h1');
  titleEl.textContent = post.title;
  wrapper.appendChild(titleEl);
  // Meta
  const metaEl = document.createElement('div');
  metaEl.classList.add('post-meta');
  metaEl.textContent = `${post.category}${post.subcategory ? ': ' + post.subcategory : ''} • ${post.date}`;
  wrapper.appendChild(metaEl);
  // Image
  const imgEl = document.createElement('img');
  imgEl.src = post.image;
  imgEl.alt = post.title;
  imgEl.style.width = '100%';
  imgEl.style.borderRadius = 'var(--border-radius)';
  imgEl.style.margin = '1rem 0';
  wrapper.appendChild(imgEl);
  // Content
  const contentEl = document.createElement('div');
  contentEl.innerHTML = post.content;
  wrapper.appendChild(contentEl);
  // Reaction bar
  wrapper.appendChild(renderReactions(articleId));
  // Comments
  wrapper.appendChild(renderComments(articleId));
  // Recommended posts
  wrapper.appendChild(renderRecommended(articleId));
  articleContainer.appendChild(wrapper);
}

// On DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initGuestSession();
  renderYear();
  renderArticle();
});