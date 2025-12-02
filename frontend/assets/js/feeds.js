// Feeds functionality
console.log('feeds.js loaded');
alert('feeds.js file loaded!');

function showFeeds() {
  alert('showFeeds called!');
  const feed = document.querySelector('.feed');
  feed.classList.add('fade-out');
  
  setTimeout(() => {
    feed.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="color:#e6eef8;font-weight:700;margin:0 0 10px 0;">📰 Feeds</h2>
        <p style="color:var(--muted);margin:0 0 15px 0;">View different feed types</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn" onclick="loadFeedType('personal')">Personal</button>
          <button class="btn" onclick="loadFeedType('popular')" style="background:rgba(255,255,255,0.8);color:#374151;border:1px solid rgba(0,0,0,0.15);">Popular</button>
          <button class="btn" onclick="loadFeedType('trending')" style="background:rgba(255,255,255,0.8);color:#374151;border:1px solid rgba(0,0,0,0.15);">Trending</button>
        </div>
      </div>
      <div id="feedContent"></div>
    `;
    
    feed.classList.remove('fade-out', 'fade-in');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        feed.classList.add('fade-in');
      });
    });
    
    setTimeout(() => loadFeedType('personal'), 50);
  }, 150);
}

async function loadFeedType(type) {
  const feedContent = document.getElementById('feedContent');
  if (!feedContent) return;
  
  if (type === 'personal') {
    await loadPersonalFeedContent(feedContent);
  } else if (type === 'popular') {
    await loadPopularContent(feedContent);
  } else if (type === 'trending') {
    await loadTrendingContent(feedContent);
  }
}

async function loadPersonalFeedContent(container) {
  try {
    const response = await api.getFavorites();
    if (response.length === 0 && followedOrgs.length === 0) {
      container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 0;">Follow organizations to see their posts!</p>';
    } else if (response.length > 0) {
      container.innerHTML = response.map(flyer => {
        const org = organizations.find(o => o.id === flyer.orgId);
        return `<article class="poster" style="background:linear-gradient(180deg,#ffffff,#f1f5f9);border:2px solid rgba(255,255,255,0.8);"><div class="meta"><div>${org ? `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;cursor:pointer;" onclick="views.showOrgProfile(${org.id})"><div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:1.2rem;">${org.icon}</div><span style="color:#1e293b;font-weight:600;">${org.name}</span></div>` : ''}<h3 style="color:#1e293b;font-weight:700;margin:0 0 12px 0;">${flyer.flyerAdvert}</h3></div></div><div><div class="actions"><div><button class="icon-btn" onclick="toggleSave(${flyer.id}, this)">❤ Save</button><button class="icon-btn" onclick="ui.shareFlyer('${org?.name || 'Event}')">🔗 Share</button></div><button class="btn" onclick="openDetails('${org?.name || 'Event'}', this)">View</button></div></div></article>`;
      }).join('');
    } else {
      container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 0;">No posts yet from followed organizations</p>';
    }
  } catch(error) {
    container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 0;">Follow organizations to see their posts!</p>';
  }
}

async function loadPopularContent(container) {
  try {
    const flyers = await api.getPopularFlyers();
    if (flyers.length === 0) {
      container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 0;">No popular flyers yet</p>';
    } else {
      container.innerHTML = flyers.map(flyer => {
        const org = organizations.find(o => o.id === flyer.orgId);
        return `<article class="poster" style="background:linear-gradient(180deg,#ffffff,#f1f5f9);border:2px solid rgba(255,255,255,0.8);"><div class="meta"><div>${org ? `<h3 style="margin:0 0 12px 0;cursor:pointer;display:flex;align-items:center;gap:8px;" onclick="views.showOrgProfile(${org.id})"><div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:1rem;">${org.icon}</div><span>${org.name}</span></h3>` : ''}<div class="small" style="color:#475569;">🔥 Popularity: ${flyer.popularityScore}</div></div></div><div><p style="color:#475569;margin:15px 0;">${flyer.flyerAdvert}</p><div class="actions"><div><button class="icon-btn" onclick="toggleSave(${flyer.id}, this)">❤ Save</button><button class="icon-btn" onclick="ui.shareFlyer('${org?.name || 'Event'}')">🔗 Share</button></div><button class="btn" onclick="openDetails('${org?.name || 'Event'}', this)">View</button></div></div></article>`;
      }).join('');
    }
  } catch(error) {
    container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 0;">Backend offline. Popular flyers unavailable.</p>';
  }
}

async function loadTrendingContent(container) {
  try {
    const flyers = await api.getTrendingFlyers();
    if (flyers.length === 0) {
      container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 0;">No trending flyers yet</p>';
    } else {
      container.innerHTML = flyers.map(flyer => {
        const org = organizations.find(o => o.id === flyer.orgId);
        return `<article class="poster" style="background:linear-gradient(180deg,#ffffff,#f1f5f9);border:2px solid rgba(255,255,255,0.8);"><div class="meta"><div>${org ? `<h3 style="margin:0 0 12px 0;cursor:pointer;display:flex;align-items:center;gap:8px;" onclick="views.showOrgProfile(${org.id})"><div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:1rem;">${org.icon}</div><span>${org.name}</span></h3>` : ''}<div class="small" style="color:#475569;">📈 Trending</div></div></div><div><p style="color:#475569;margin:15px 0;">${flyer.flyerAdvert}</p><div class="actions"><div><button class="icon-btn" onclick="toggleSave(${flyer.id}, this)">❤ Save</button><button class="icon-btn" onclick="ui.shareFlyer('${org?.name || 'Event'}')">🔗 Share</button></div><button class="btn" onclick="openDetails('${org?.name || 'Event'}', this)">View</button></div></div></article>`;
      }).join('');
    }
  } catch(error) {
    container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 0;">Backend offline. Trending flyers unavailable.</p>';
  }
}

// Expose to global scope
window.showFeeds = showFeeds;
window.loadFeedType = loadFeedType;
