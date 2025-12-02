// API utility functions
const API_BASE = 'http://localhost:8080/api';

const api = {
  async fetch(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async checkAuth() {
    const response = await this.fetch('/session');
    return response.json();
  },

  async login(email, password) {
    const response = await this.fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  async signup(username, email, password) {
    const response = await this.fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password })
    });
    return response.json();
  },

  async logout() {
    return this.fetch('/logout', { method: 'POST' });
  },

  async getFavorites() {
    const response = await this.fetch('/favorites');
    return response.json();
  },

  async getPopularFlyers() {
    const response = await this.fetch('/flyers/popular');
    return response.json();
  },

  async getTrendingFlyers() {
    const response = await this.fetch('/flyers/trending');
    return response.json();
  },

  async saveFlyer(flyerId) {
    return this.fetch(`/flyers/${flyerId}/save`, { method: 'POST' });
  },

  async unsaveFlyer(flyerId) {
    return this.fetch(`/flyers/${flyerId}/save`, { method: 'DELETE' });
  },

  async followOrg(orgId) {
    return this.fetch(`/orgs/${orgId}/follow`, { method: 'POST' });
  },

  async unfollowOrg(orgId) {
    return this.fetch(`/orgs/${orgId}/follow`, { method: 'DELETE' });
  },

  async getFollowedOrgs() {
    const response = await this.fetch('/user/followedOrgs');
    return response.json();
  },

  async postComment(flyerId, userId, content) {
    const response = await this.fetch(`/flyers/${flyerId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ userId, content })
    });
    return response.json();
  },

  async getComments(flyerId) {
    const response = await this.fetch(`/flyers/${flyerId}/comments`);
    return response.json();
  }
};
