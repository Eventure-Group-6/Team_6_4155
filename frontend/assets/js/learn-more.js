// Learn More modal functionality
function showOrgLearnMore(orgId) {
  const org = organizations.find(o => o.id === orgId);
  if (!org) return;
  
  const content = `
    <button class="close-btn" id="closeBtn">×</button>
    <div style="margin-bottom: 25px;text-align:center;">
      <div style="width:80px;height:80px;border-radius:16px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:flex;align-items:center;justify-content:center;font-size:2.5rem;font-weight:bold;color:#022047;margin:0 auto 15px;">${org.icon}</div>
      <h2 style="color:#0f172a;font-weight:800;font-size:1.8rem;margin-bottom:8px;">${org.name}</h2>
      <div style="color:#64748b;font-weight:600;font-size:1rem;">${org.category} • ${org.members} members</div>
    </div>
    
    <div style="margin:25px 0;">
      <h4 style="color:#0f172a;font-weight:700;font-size:1.2rem;margin-bottom:15px;">About</h4>
      <p style="color:#374151;line-height:1.7;font-size:1rem;font-weight:500;">${org.fullDescription}</p>
    </div>
    
    <div style="margin:25px 0;background:rgba(248,250,252,0.8);padding:20px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);">
      <h4 style="color:#0f172a;font-weight:700;font-size:1.2rem;margin-bottom:15px;">Details</h4>
      <div style="color:#374151;font-weight:500;">
        <p style="margin:8px 0;font-size:1rem;"><strong style="color:#1e293b;">Founded:</strong> ${org.founded}</p>
        <p style="margin:8px 0;font-size:1rem;"><strong style="color:#1e293b;">Meetings:</strong> ${org.eventTime}</p>
        <p style="margin:8px 0;font-size:1rem;"><strong style="color:#1e293b;">Location:</strong> ${org.location}</p>
        <p style="margin:8px 0;font-size:1rem;"><strong style="color:#1e293b;">Contact:</strong> ${org.contact}</p>
      </div>
    </div>
    
    <div style="display:flex;gap:12px;margin-top:35px;">
      <button class="btn" style="flex:1;font-weight:600;" onclick="toggleFollow(${org.id}, true); ui.closeModal(); views.showOrgProfile(${org.id});">${followedOrgs.includes(org.id) ? 'Unfollow' : 'Follow'}</button>
      <button class="icon-btn" style="font-weight:600;" onclick="addToEvents('${org.name}', '${org.eventTime}'); ui.closeModal();">📅 Add Event</button>
    </div>
  `;
  
  ui.showModal(content);
}
