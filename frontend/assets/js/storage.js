// Local storage utilities
const storage = {
  get(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  // Specific getters/setters
  getSavedFlyers() {
    return this.get('savedFlyers', []);
  },

  setSavedFlyers(flyers) {
    this.set('savedFlyers', flyers);
  },

  getCreatedPosts() {
    return this.get('createdPosts', []);
  },

  setCreatedPosts(posts) {
    this.set('createdPosts', posts);
  },

  getMyEvents() {
    return this.get('myEvents', []);
  },

  setMyEvents(events) {
    this.set('myEvents', events);
  },

  getFollowedOrgs() {
    return this.get('followedOrgs', []);
  },

  setFollowedOrgs(orgs) {
    this.set('followedOrgs', orgs);
  },

  getMessages() {
    return this.get('discussionMessages', []);
  },

  setMessages(messages) {
    this.set('discussionMessages', messages);
  },

  getComments(eventName) {
    return this.get(`comments_${eventName}`, []);
  },

  setComments(eventName, comments) {
    this.set(`comments_${eventName}`, comments);
  }
};
