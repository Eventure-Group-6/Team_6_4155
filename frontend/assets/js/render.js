// Rendering functions
const render = {
  clubCard(org) {
    const meetingDay = org.eventTime.split(' ')[0];
    return `
      <article class="poster" role="article" style="background:${gradients[org.id] || gradients[1]};">
        <div class="meta">
          <div>
            <h3 style="margin:0 0 12px 0;cursor:pointer;display:flex;align-items:center;gap:8px;" onclick="showOrgProfile(${org.id})">
              <div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:1rem;">${org.icon}</div>
              <span>${org.name}</span>
            </h3>
            <div class="small">${org.category} • ${meetingDay}</div>
          </div>
          <div class="small">${ratings[org.id] || '4.8'} ★</div>
        </div>
        <img src="${org.image}" alt="${org.name} poster">
        <div>
          <p>${org.description}</p>
          <div class="actions">
            <div>
              <button class="icon-btn" onclick="toggleSave(${org.id}, this)">❤ Save</button>
              <button class="icon-btn" onclick="addToEvents('${org.name}', '${org.eventTime}')">📅 Add Event</button>
              <button class="icon-btn" onclick="ui.shareFlyer('${org.name}')">🔗 Share</button>
            </div>
            <button class="btn" onclick="openDetails('${org.name}', this)">View</button>
          </div>
        </div>
      </article>
    `;
  },

  emptyState(icon, title, message, buttonText, buttonAction) {
    return `
      <div class="poster" style="background:linear-gradient(180deg,#ffffff,#f1f5f9);border:2px solid rgba(255,255,255,0.8);text-align:center;padding:40px;">
        <h3 style="color:#1e293b;margin-bottom:15px;">${icon} ${title}</h3>
        <p style="color:#475569;margin:20px 0;">${message}</p>
        <button class="btn" onclick="${buttonAction}">${buttonText}</button>
      </div>
    `;
  },

  comment(comment, isBackend = false) {
    const author = isBackend ? `User ${comment.userId}` : comment.author;
    const timestamp = isBackend ? new Date(comment.createdAt).toLocaleString() : comment.timestamp;
    return `
      <div style="background:rgba(248,250,252,0.8);padding:15px;border-radius:10px;margin-bottom:10px;border:1px solid rgba(226,232,240,0.8);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-weight:600;color:#1e293b;">${author}</span>
          <span style="font-size:0.85rem;color:#64748b;">${timestamp}</span>
        </div>
        <p style="color:#374151;margin:0;">${comment.content || comment.text}</p>
      </div>
    `;
  }
};
