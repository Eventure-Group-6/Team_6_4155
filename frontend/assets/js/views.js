// View rendering functions
alert('feeds.js file loaded!');
const views = {
  loadFlyers() {
    const feed = document.querySelector('.feed');
    feed.classList.add('fade-out');
    setTimeout(() => {
      let clubsHTML = '<div style="margin-bottom:20px;"><h2 style="color:#e6eef8;font-weight:700;margin:0 0 10px 0;">✨ Discover</h2><p style="color:var(--muted);margin:0;">Explore clubs and events</p></div>';
      clubsHTML += organizations.map(org => render.clubCard(org)).join('');
      clubsHTML += `<div class="footer-note">Tip: Scroll up/down to browse — posters snap into view for easy preview.</div>`;
      feed.innerHTML = clubsHTML;
      feed.classList.remove('fade-out', 'fade-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          feed.classList.add('fade-in');
        });
      });
    }, 150);
  },

  showOrganizations() {
    const feed = document.querySelector('.feed');
    feed.classList.add('fade-out');
    setTimeout(() => {
      let orgsHTML = '<div style="margin-bottom:20px;"><h2 style="color:#e6eef8;font-weight:700;margin:0 0 10px 0;">🏛️ Organizations</h2><p style="color:var(--muted);margin:0;">Discover and follow organizations</p></div>';
      
      organizations.forEach(org => {
        const isFollowing = followedOrgs.includes(org.id);
        orgsHTML += `
          <article class="poster" style="background:linear-gradient(180deg,#ffffff,#f1f5f9);border:2px solid rgba(255,255,255,0.8);cursor:pointer;" onclick="views.showOrgProfile(${org.id})">
            <div style="display:flex;align-items:center;gap:15px;margin-bottom:15px;">
              <div style="width:60px;height:60px;border-radius:12px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:2rem;flex-shrink:0;">${org.icon}</div>
              <div style="flex:1;">
                <h3 style="color:#1e293b;font-weight:700;margin:0 0 5px 0;">${org.name}</h3>
                <div style="color:#64748b;font-size:0.9rem;">${org.category} • ${org.members} members</div>
              </div>
              <button class="btn" onclick="event.stopPropagation(); toggleFollow(${org.id})" style="${isFollowing ? 'background:rgba(255,255,255,0.8);color:#374151;border:1px solid rgba(0,0,0,0.15);' : ''}">${isFollowing ? 'Following' : 'Follow'}</button>
            </div>
            <p style="color:#475569;font-weight:500;margin:0;">${org.description}</p>
          </article>
        `;
      });
      
      feed.innerHTML = orgsHTML;
      feed.classList.remove('fade-out', 'fade-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          feed.classList.add('fade-in');
        });
      });
    }, 150);
  },

  showMyClubs() {
    const feed = document.querySelector('.feed');
    feed.classList.add('fade-out');
    setTimeout(() => {
      const followedClubs = organizations.filter(org => followedOrgs.includes(org.id));
      
      let clubsHTML = '<div style="margin-bottom:20px;"><h2 style="color:#e6eef8;font-weight:700;margin:0 0 10px 0;">⭐ My Clubs</h2><p style="color:var(--muted);margin:0;">Organizations you follow</p></div>';
      
      if (followedClubs.length === 0) {
        clubsHTML += render.emptyState('⭐', 'No Clubs Yet', 'No clubs followed yet. Follow clubs from the Organizations tab!', 'Browse Organizations', 'views.showOrganizations()');
      } else {
        followedClubs.forEach(club => {
          clubsHTML += `
            <article class="poster" style="background:linear-gradient(180deg,#fff4f2,#fff7f0);border:2px solid rgba(255,255,255,0.8);padding:20px;">
              <div style="display:flex;align-items:center;gap:15px;margin-bottom:12px;">
                <div style="width:60px;height:60px;border-radius:12px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:2rem;flex-shrink:0;cursor:pointer;" onclick="views.showOrgProfile(${club.id})">${club.icon}</div>
                <div style="flex:1;cursor:pointer;" onclick="views.showOrgProfile(${club.id})">
                  <h4 style="color:#1e293b;font-weight:700;margin:0 0 5px 0;">${club.name}</h4>
                  <div class="small" style="color:#475569;font-weight:500;">${club.category} • ${club.members} members</div>
                </div>
                <button class="btn" onclick="toggleFollow(${club.id}, true); views.showMyClubs();" style="background:rgba(255,255,255,0.8);color:#374151;border:1px solid rgba(0,0,0,0.15);">Unfollow</button>
              </div>
              <p style="color:#475569;font-weight:500;margin:0;cursor:pointer;" onclick="views.showOrgProfile(${club.id})">${club.description}</p>
            </article>
          `;
        });
      }
      
      feed.innerHTML = clubsHTML;
      feed.classList.remove('fade-out', 'fade-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          feed.classList.add('fade-in');
        });
      });
    }, 150);
  },

  showFavorites() {
    const feed = document.querySelector('.feed');
    feed.classList.add('fade-out');
    setTimeout(() => {
      let favoritesHTML = '<div style="margin-bottom:20px;"><h2 style="color:#e6eef8;font-weight:700;margin:0 0 10px 0;">❤️ Favorites</h2><p style="color:var(--muted);margin:0;">Your saved flyers</p></div>';
      
      if (savedFlyers.length === 0) {
        favoritesHTML += render.emptyState('❤️', 'No Saved Flyers', 'Start saving flyers you\'re interested in!', 'Discover Flyers', 'views.loadFlyers()');
      } else {
        savedFlyers.forEach((flyer, index) => {
          const org = organizations.find(o => o.name === flyer.title);
          const titleWithOrg = org ? `<h3 style="color:#1e293b;font-weight:700;margin:0 0 12px 0;cursor:pointer;display:flex;align-items:center;gap:8px;" onclick="views.showOrgProfile(${org.id})"><div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:1rem;">${org.icon}</div><span>${flyer.title}</span></h3>` : `<h3 style="color:#1e293b;font-weight:700;margin:0 0 12px 0;">${flyer.title}</h3>`;
          favoritesHTML += `
            <article class="poster" style="background:linear-gradient(180deg,#fff4f2,#fff7f0);border:2px solid rgba(255,255,255,0.8);">
              <div class="meta">
                <div>
                  ${titleWithOrg}
                  <div class="small" style="color:#475569;">Saved Flyer</div>
                </div>
                <div class="small" style="color:#059669;">⭐ Saved</div>
              </div>
              ${flyer.image ? `<img src="${flyer.image}" alt="${flyer.title}">` : `<div class="poster-img" style="background:linear-gradient(135deg,#ffd6e0,#ffd7b5);">🎆 ${flyer.title}</div>`}
              <div>
                <p style="color:#475569;margin:15px 0;">${flyer.description}</p>
                <div class="actions">
                  <button class="icon-btn" onclick="removeFavorite(${index})">❌ Remove</button>
                  <button class="btn" onclick="openDetails('${flyer.title}', this)">View Details</button>
                </div>
              </div>
            </article>
          `;
        });
      }
      
      feed.innerHTML = favoritesHTML;
      feed.classList.remove('fade-out', 'fade-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          feed.classList.add('fade-in');
        });
      });
    }, 150);
  },

  showEvents() {
    const feed = document.querySelector('.feed');
    feed.classList.add('fade-out');
    setTimeout(() => {
      let eventsHTML = '<div style="margin-bottom:20px;"><h2 style="color:#e6eef8;font-weight:700;margin:0 0 10px 0;">📅 Events</h2><p style="color:var(--muted);margin:0;">Your saved events</p></div>';
      
      if (myEvents.length === 0) {
        eventsHTML += render.emptyState('📅', 'No Events Yet', 'No events added yet. Add events from the Discover tab!', '', '');
      } else {
        myEvents.forEach((event, index) => {
          eventsHTML += `
            <article class="poster" style="background:linear-gradient(180deg,#ffffff,#f1f5f9);border:2px solid rgba(255,255,255,0.8);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                <h3 style="color:#1e293b;font-weight:700;margin:0;">${event.name}</h3>
                <button class="icon-btn" onclick="removeEvent(${index})" style="background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.3);color:#dc2626;">❌</button>
              </div>
              <div style="color:#475569;font-weight:500;margin-bottom:8px;">
                <div style="margin-bottom:6px;">🕐 ${event.time}</div>
                <div style="font-size:0.85rem;color:#64748b;">Added: ${event.addedDate}</div>
              </div>
            </article>
          `;
        });
      }
      
      feed.innerHTML = eventsHTML;
      feed.classList.remove('fade-out', 'fade-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          feed.classList.add('fade-in');
        });
      });
    }, 150);
  },

  showPostForm() {
    const feed = document.querySelector('.feed');
    feed.classList.add('fade-out');
    setTimeout(() => {
      feed.innerHTML = `
        <div style="margin-bottom:20px;"><h2 style="color:#e6eef8;font-weight:700;margin:0 0 10px 0;">➕ Post</h2><p style="color:var(--muted);margin:0;">Create a new flyer</p></div>
        <div class="poster" style="background:linear-gradient(180deg,#ffffff,#f1f5f9);border:2px solid rgba(255,255,255,0.8);">
          <h3 style="color:#1e293b;font-weight:700;">🎨 Create New Flyer</h3>
          <form onsubmit="createFlyer(event)" id="flyerForm">
            <input type="text" placeholder="Event Title" required class="input" style="width:100%;margin:10px 0;background:rgba(255,255,255,0.9);border:1px solid rgba(0,0,0,0.2);color:#1e293b;">
            <input type="text" placeholder="Organization Name" required class="input" style="width:100%;margin:10px 0;background:rgba(255,255,255,0.9);border:1px solid rgba(0,0,0,0.2);color:#1e293b;">
            <textarea placeholder="Event Description" required class="input" style="width:100%;margin:10px 0;height:120px;resize:vertical;background:rgba(255,255,255,0.9);border:1px solid rgba(0,0,0,0.2);color:#1e293b;"></textarea>
            <input type="date" required class="input" style="width:100%;margin:10px 0;background:rgba(255,255,255,0.9);border:1px solid rgba(0,0,0,0.2);color:#1e293b;">
            <label style="display:block;color:#1e293b;font-weight:500;margin:10px 0 5px 0;">Event Details (optional)</label>
            <input type="text" placeholder="Event Time (e.g., Mondays 6:00 PM)" id="eventTime" class="input" style="width:100%;margin:10px 0;background:rgba(255,255,255,0.9);border:1px solid rgba(0,0,0,0.2);color:#1e293b;">
            <label style="display:block;color:#1e293b;font-weight:500;margin:10px 0 5px 0;">Attach Image (optional)</label>
            <input type="file" accept="image/*" id="imageUpload" class="input" style="width:100%;margin:10px 0;background:rgba(255,255,255,0.9);border:1px solid rgba(0,0,0,0.2);color:#1e293b;padding:8px;">
            <button type="submit" class="btn">🚀 Post Flyer</button>
          </form>
          <button class="btn" onclick="views.loadFlyers()" style="margin-top:15px;background:rgba(255,255,255,0.8);color:#374151;border:1px solid rgba(0,0,0,0.15);">← Cancel</button>
        </div>
      `;
      feed.classList.remove('fade-out', 'fade-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          feed.classList.add('fade-in');
        });
      });
    }, 150);
  },

  showDiscussion() {
    const feed = document.querySelector('.feed');
    feed.classList.add('fade-out');
    setTimeout(() => {
      feed.innerHTML = `
        <div style="margin-bottom:20px;"><h2 style="color:#e6eef8;font-weight:700;margin:0 0 10px 0;">💬 Discussion</h2><p style="color:var(--muted);margin:0;">Community discussion board</p></div>
        <div class="poster" style="background:linear-gradient(180deg,#ffffff,#f1f5f9);border:2px solid rgba(255,255,255,0.8);">
          <h3 style="color:#1e293b;font-weight:700;margin-bottom:15px;">Post a Message</h3>
          <form onsubmit="postMessage(event)" style="display:flex;flex-direction:column;gap:10px;">
            <textarea id="messageInput" placeholder="Share your thoughts..." required style="width:100%;min-height:100px;padding:12px;border-radius:10px;border:1px solid rgba(0,0,0,0.15);background:rgba(255,255,255,0.9);color:#1e293b;resize:vertical;font-family:inherit;"></textarea>
            <button type="submit" class="btn" style="align-self:flex-start;">Post Message</button>
          </form>
        </div>
        <div id="messageList"></div>
      `;
      feed.classList.remove('fade-out', 'fade-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          feed.classList.add('fade-in');
        });
      });
      loadMessages();
    }, 150);
  },

  showOrgProfile(orgId) {
    const org = organizations.find(o => o.id === orgId);
    if (!org) return;
    
    const feed = document.querySelector('.feed');
    feed.classList.add('fade-out');
    setTimeout(() => {
      const isFollowing = followedOrgs.includes(org.id);
      const orgPosts = createdPosts.filter(p => p.org === org.name);
      
      let postsHTML = orgPosts.length > 0 
        ? orgPosts.map(post => {
            const imageHTML = post.image ? `<img src="${post.image}" alt="${post.title}">` : `<div class="poster-img" style="background:linear-gradient(135deg,#bfdbfe,#ddd6fe);">🎉 ${post.title}</div>`;
            return `
              <article class="poster" style="background:linear-gradient(180deg,#e0f2fe,#f0f9ff);border:2px solid rgba(255,255,255,0.8);">
                <div class="meta">
                  <div>
                    <h3 style="color:#1e293b;font-weight:700;">${post.title}</h3>
                    <div class="small" style="color:#475569;">${post.date}</div>
                  </div>
                </div>
                ${imageHTML}
                <div><p style="color:#475569;margin:15px 0;">${post.description}</p></div>
              </article>
            `;
          }).join('')
        : '<p style="color:var(--muted);text-align:center;padding:40px 0;">No posts yet from this organization</p>';
      
      feed.innerHTML = `
        <div class="poster" style="background:var(--surface);border:2px solid rgba(255,255,255,0.8);padding:24px;">
          <div style="display:flex;flex-direction:column;align-items:center;text-align:center;">
            <div style="width:110px;height:110px;border-radius:16px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:2.6rem;font-weight:bold;color:#022047;margin-bottom:14px;">${org.icon}</div>
            <h2 style="color:#f8fafc;font-weight:700;font-size:1.6rem;margin:0 0 6px 0;">${org.name}</h2>
            <div style="color:var(--muted);font-size:0.95rem;margin-bottom:10px;">${org.category} • ${org.members} members</div>
            <p style="color:var(--muted);font-size:0.95rem;line-height:1.4;margin-bottom:16px;">${org.description}</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">
              <button class="btn" onclick="toggleFollow(${org.id}, true); views.showOrgProfile(${org.id});" style="${isFollowing ? 'background:rgba(255,255,255,0.8);color:#374151;border:1px solid rgba(0,0,0,0.15);' : ''}">${isFollowing ? 'Following' : 'Follow'}</button>
              ${org.eventTime ? `<button class="btn" onclick="addToEvents('${org.name}', '${org.eventTime}')" style="background:rgba(255,255,255,0.8);color:#374151;border:1px solid rgba(0,0,0,0.15);">📅 Add Event</button>` : ''}
              <button class="btn" onclick="showOrgLearnMore(${org.id})" style="background:rgba(255,255,255,0.8);color:#374151;border:1px solid rgba(0,0,0,0.15);">📚 Learn More</button>
              <button class="btn" onclick="views.showOrganizations()" style="background:rgba(255,255,255,0.8);color:#374151;border:1px solid rgba(0,0,0,0.15);">← Back</button>
            </div>
          </div>
        </div>
        <div style="margin:20px 0;"><h3 style="color:#e6eef8;font-weight:700;">Recent Posts</h3></div>
        ${postsHTML}
      `;
      feed.classList.remove('fade-out', 'fade-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          feed.classList.add('fade-in');
        });
      });
    }, 150);
  }
};

// Expose to global scope
window.showOrganizations = views.showOrganizations;
window.showMyClubs = views.showMyClubs;
window.showFavorites = views.showFavorites;
window.showEvents = views.showEvents;
window.showPostForm = views.showPostForm;
window.showDiscussion = views.showDiscussion;
window.showOrgProfile = views.showOrgProfile;
window.loadFlyers = views.loadFlyers;
