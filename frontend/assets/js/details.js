// Details modal functionality
function openDetails(name, element) {
  const detailsContent = {
    'Data Science Society': {
      description: 'Dive into the world of data science with hands-on workshops covering Python, R, machine learning algorithms, and data visualization. Work on real-world projects, participate in Kaggle competitions, and connect with industry professionals. Whether you\'re a beginner or advanced, we have something for everyone!',
      when: 'Tuesdays 5:30 PM',
      where: 'Woodward Hall 335'
    },
    'Fencing Club': {
      description: 'Experience the elegance and intensity of fencing! Our club welcomes all skill levels from complete beginners to competitive fencers. Learn foil, épée, and sabre techniques from certified coaches. Equipment is provided for newcomers. Join our team for local and regional tournaments, or just fence for fun and fitness!',
      when: 'Mondays & Thursdays 6:00 PM',
      where: 'Recreation Center Gym 2'
    },
    'Association of Computing Machinery': {
      description: 'ACM is the premier computing organization on campus. Attend weekly tech talks from industry leaders, participate in hackathons, work on open-source projects, and prepare for technical interviews. Network with recruiters from top tech companies and collaborate on innovative software projects with fellow members.',
      when: 'Wednesdays 7:00 PM',
      where: 'Student Union 340'
    },
    'Niner Game Development': {
      description: 'Niner Game Development brings together aspiring game developers, artists, and designers. We organize weekly game jams, Unity and Unreal Engine workshops, and collaborative project teams. Members learn game design principles, programming patterns, 3D modeling, and animation. Join us to build indie games or prepare for careers at major studios!',
      when: 'Wednesdays 6:00 PM',
      where: 'College of Computing and Informatics Room 223'
    },
    'The Guild': {
      description: 'The Guild is your friendly neighborhood board game club where students gather to unwind, strategize, and have fun. We play everything from classic favorites like Settlers of Catan and Ticket to Ride to modern strategy games and party games. No experience needed - we teach new players and welcome all skill levels. Snacks and drinks provided every session.',
      when: 'Fridays 3:00 PM - 6:00 PM',
      where: 'CHHS 128'
    }
  };

  const details = detailsContent[name] || {
    description: 'An exciting event you won\'t want to miss! Join us for a great time with fellow students.',
    when: 'TBD',
    where: 'Student Union Building'
  };

  const content = `
    <button class="close-btn" id="closeBtn">×</button>
    <div style="margin-bottom: 25px;">
      <h2 style="color:#0f172a;font-weight:800;font-size:1.8rem;margin-bottom:8px;">${name}</h2>
      <div style="color:#64748b;font-weight:600;font-size:1rem;">Event Details</div>
    </div>
    
    <div style="background:linear-gradient(135deg,#c7f9e1,#bfdbfe);border-radius:16px;padding:45px;text-align:center;margin:25px 0;border:2px solid rgba(255,255,255,0.8);">
      <div style="font-size:3.5rem;margin-bottom:15px;">🎉</div>
      <h3 style="color:#0f172a;font-weight:700;font-size:1.4rem;">${name}</h3>
    </div>
    
    <div style="margin:25px 0;">
      <h4 style="color:#0f172a;font-weight:700;font-size:1.2rem;margin-bottom:15px;">About This Event</h4>
      <p style="color:#374151;line-height:1.7;font-size:1rem;font-weight:500;">${details.description}</p>
    </div>
    
    <div style="margin:25px 0;background:rgba(248,250,252,0.8);padding:20px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);">
      <h4 style="color:#0f172a;font-weight:700;font-size:1.2rem;margin-bottom:15px;">Event Details</h4>
      <div style="color:#374151;font-weight:500;">
        <p style="margin:8px 0;font-size:1rem;"><strong style="color:#1e293b;">When:</strong> ${details.when}</p>
        <p style="margin:8px 0;font-size:1rem;"><strong style="color:#1e293b;">Where:</strong> ${details.where}</p>
        <p style="margin:8px 0;font-size:1rem;"><strong style="color:#1e293b;">Cost:</strong> Free for students</p>
      </div>
    </div>
    
    <div style="display:flex;gap:12px;margin-top:35px;">
      ${detailsContent[name] ? `<button class="btn" style="flex:1;font-weight:600;" onclick="addToEvents('${name}', '${details.when}'); ui.closeModal();">Add Event</button>` : ''}
      <button class="icon-btn" style="font-weight:600;">❤ Save</button>
      <button class="icon-btn" style="font-weight:600;" onclick="ui.shareFlyer('${name}')">🔗 Share</button>
    </div>
    
    <div style="margin-top:35px;border-top:2px solid rgba(226,232,240,0.8);padding-top:25px;">
      <h4 style="color:#0f172a;font-weight:700;font-size:1.2rem;margin-bottom:15px;">💬 Comments</h4>
      <form onsubmit="postComment(event, '${name}')" style="margin-bottom:20px;">
        <textarea placeholder="Add a comment..." required style="width:100%;min-height:80px;padding:12px;border-radius:10px;border:1px solid rgba(0,0,0,0.15);background:rgba(255,255,255,0.9);color:#1e293b;resize:vertical;font-family:inherit;margin-bottom:10px;"></textarea>
        <button type="submit" class="btn">Post Comment</button>
      </form>
      <div id="commentsSection" style="max-height:300px;overflow-y:auto;">
        <p style="color:#64748b;text-align:center;padding:20px 0;">No comments yet. Be the first to comment!</p>
      </div>
    </div>
  `;

  ui.showModal(content);
}
