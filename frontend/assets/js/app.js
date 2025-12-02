// Main application logic
let savedFlyers = storage.getSavedFlyers();
let createdPosts = storage.getCreatedPosts();
let myEvents = storage.getMyEvents();
let followedOrgs = storage.getFollowedOrgs();

// Authentication
async function checkAuth() {
  try {
    const data = await api.checkAuth();
    if (!data.authenticated) {
      window.location.href = 'login.html';
    }
  } catch (error) {
    console.error('Backend offline, running in demo mode');
    const demoUser = localStorage.getItem('demoUser');
    if (!demoUser) {
      alert('Demo mode: Please create an account first');
      window.location.href = 'login.html';
    }
  }
}

// Load data from backend
async function loadSavedFlyersFromBackend() {
  try {
    const response = await api.fetch('/flyers/saved');
    if (response.ok) {
      const backendFlyers = await response.json();
      savedFlyers = [...savedFlyers, ...backendFlyers.filter(bf => !savedFlyers.some(sf => sf.id === bf.id))];
      storage.setSavedFlyers(savedFlyers);
    }
  } catch (error) {
    console.log('Backend offline, using localStorage only');
  }
}

async function loadFollowedOrgsFromBackend() {
  try {
    const orgs = await api.getFollowedOrgs();
    followedOrgs = orgs.map(o => o.id);
    storage.setFollowedOrgs(followedOrgs);
  } catch (error) {
    console.log('Backend offline, using localStorage only');
  }
}

// Flyer operations
async function toggleSave(flyerId, button) {
  const isSaved = button.textContent.includes('Saved');
  const userPost = createdPosts.find(p => p.id === flyerId);
  const flyerData = userPost || {
    id: flyerId,
    title: organizations.find(o => o.id === flyerId)?.name || 'Event',
    description: organizations.find(o => o.id === flyerId)?.description || '',
    image: organizations.find(o => o.id === flyerId)?.image || ''
  };
  
  try {
    if (isSaved) {
      await api.unsaveFlyer(flyerId);
      savedFlyers = savedFlyers.filter(f => f.id !== flyerId);
      button.textContent = '❤ Save';
    } else {
      await api.saveFlyer(flyerId);
      savedFlyers.push(flyerData);
      button.textContent = '✔ Saved';
    }
  } catch (error) {
    console.log('Backend offline, using localStorage only');
    if (isSaved) {
      savedFlyers = savedFlyers.filter(f => f.id !== flyerId);
      button.textContent = '❤ Save';
    } else {
      savedFlyers.push(flyerData);
      button.textContent = '✔ Saved';
    }
  }
  
  storage.setSavedFlyers(savedFlyers);
}

// Organization operations
async function toggleFollow(orgId, skipRefresh) {
  const index = followedOrgs.indexOf(orgId);
  const isFollowing = index > -1;
  
  try {
    if (isFollowing) {
      await api.unfollowOrg(orgId);
      followedOrgs.splice(index, 1);
    } else {
      await api.followOrg(orgId);
      followedOrgs.push(orgId);
    }
    storage.setFollowedOrgs(followedOrgs);
    if (!skipRefresh) showOrganizations();
  } catch (error) {
    console.error('Backend offline, using localStorage only');
    if (isFollowing) {
      followedOrgs.splice(index, 1);
    } else {
      followedOrgs.push(orgId);
    }
    storage.setFollowedOrgs(followedOrgs);
    if (!skipRefresh) showOrganizations();
  }
}

// Event operations
function addToEvents(eventName, eventTime) {
  const eventExists = myEvents.find(e => e.name === eventName);
  if (eventExists) {
    alert('Event already added!');
    return;
  }
  
  myEvents.push({
    id: Date.now(),
    name: eventName,
    time: eventTime,
    addedDate: new Date().toLocaleDateString()
  });
  
  storage.setMyEvents(myEvents);
  alert('Event added to your calendar!');
}

function removeEvent(index) {
  myEvents.splice(index, 1);
  storage.setMyEvents(myEvents);
  showEvents();
}

function removeFavorite(index) {
  savedFlyers.splice(index, 1);
  storage.setSavedFlyers(savedFlyers);
  showFavorites();
}

// Post operations
function createFlyer(event) {
  event.preventDefault();
  const form = event.target;
  const title = form.querySelector('input[placeholder="Event Title"]').value;
  const org = form.querySelector('input[placeholder="Organization Name"]').value;
  const description = form.querySelector('textarea').value;
  const date = form.querySelector('input[type="date"]').value;
  const eventTime = form.querySelector('#eventTime').value;
  const imageFile = form.querySelector('#imageUpload').files[0];
  
  const newPost = {
    id: Date.now(),
    title,
    org,
    description,
    date,
    eventTime,
    isUserCreated: true
  };
  
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      newPost.image = e.target.result;
      createdPosts.push(newPost);
      storage.setCreatedPosts(createdPosts);
      alert('Flyer created successfully!');
      loadFlyers();
    };
    reader.readAsDataURL(imageFile);
  } else {
    createdPosts.push(newPost);
    storage.setCreatedPosts(createdPosts);
    alert('Flyer created successfully!');
    loadFlyers();
  }
}

// Comment operations
async function postComment(event, eventName) {
  event.preventDefault();
  const form = event.target;
  const textarea = form.querySelector('textarea');
  const comment = textarea.value.trim();
  if (!comment) return;
  
  const org = organizations.find(o => o.name === eventName);
  const flyerId = org?.id || Date.now();
  
  try {
    const response = await api.postComment(flyerId, 1, comment);
    textarea.value = '';
    loadComments(eventName, flyerId);
    return;
  } catch (error) {
    console.log('Backend offline, using localStorage');
  }
  
  let comments = storage.getComments(eventName);
  comments.unshift({
    id: Date.now(),
    text: comment,
    author: 'You',
    timestamp: new Date().toLocaleString()
  });
  storage.setComments(eventName, comments);
  
  textarea.value = '';
  loadComments(eventName, flyerId);
}

async function loadComments(eventName, flyerId) {
  const commentsSection = document.getElementById('commentsSection');
  
  try {
    const backendComments = await api.getComments(flyerId);
    if (backendComments.length > 0) {
      commentsSection.innerHTML = backendComments.map(c => render.comment(c, true)).join('');
      return;
    }
  } catch (error) {
    console.log('Backend offline, using localStorage');
  }
  
  const comments = storage.getComments(eventName);
  
  if (comments.length === 0) {
    commentsSection.innerHTML = '<p style="color:#64748b;text-align:center;padding:20px 0;">No comments yet. Be the first to comment!</p>';
    return;
  }
  
  commentsSection.innerHTML = comments.map(c => render.comment(c)).join('');
}

// Message operations
function postMessage(event) {
  event.preventDefault();
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  if (!message) return;
  
  let messages = storage.getMessages();
  
  messages.unshift({
    id: Date.now(),
    text: message,
    timestamp: new Date().toLocaleString(),
    author: 'You'
  });
  
  storage.setMessages(messages);
  input.value = '';
  loadMessages();
}

function loadMessages() {
  const messageList = document.getElementById('messageList');
  const messages = storage.getMessages();
  
  if (messages.length === 0) {
    messageList.innerHTML = '<p style="color:#475569;text-align:center;margin:20px 0;">No messages yet. Be the first to start a discussion!</p>';
    return;
  }
  
  messageList.innerHTML = messages.map(msg => `
    <div class="poster discussion-post" style="background:linear-gradient(180deg,#ffffff,#f1f5f9);border:2px solid rgba(255,255,255,0.8);padding:16px;transition:transform 0.3s ease, box-shadow 0.3s ease;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div style="font-weight:700;color:#1e293b;font-size:1rem;">${msg.author}</div>
        <div style="font-size:0.8rem;color:#64748b;">${msg.timestamp}</div>
      </div>
      <div style="color:#475569;font-weight:500;">${msg.text}</div>
    </div>
  `).join('');
}

// Initialize
checkAuth();
loadSavedFlyersFromBackend();
loadFollowedOrgsFromBackend();
