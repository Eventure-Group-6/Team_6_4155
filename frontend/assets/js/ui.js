// UI utilities
const ui = {
  fadeOut(element) {
    element.classList.add('fade-out');
  },

  fadeIn(element) {
    element.classList.remove('fade-out');
    element.classList.add('fade-in');
  },

  transition(element, callback, delay = 150) {
    this.fadeOut(element);
    setTimeout(() => {
      callback();
      this.fadeIn(element);
    }, delay);
  },

  showModal(content) {
    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';
    overlay.onclick = () => this.closeModal();
    
    const modal = document.createElement('div');
    modal.className = 'expanded-card';
    modal.innerHTML = content;
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('#closeBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
    
    setTimeout(() => {
      overlay.classList.add('show');
      modal.classList.add('show');
    }, 10);
  },

  closeModal() {
    const overlay = document.querySelector('.card-overlay');
    const modal = document.querySelector('.expanded-card');
    
    if (overlay && modal) {
      overlay.classList.remove('show');
      modal.classList.remove('show');
      
      setTimeout(() => {
        overlay.remove();
        modal.remove();
      }, 300);
    }
  },

  shareFlyer(clubName) {
    const shareUrl = `${window.location.origin}${window.location.pathname}?club=${encodeURIComponent(clubName)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(`Link copied to clipboard! Share this link: ${shareUrl}`);
    }).catch(() => {
      alert(`Share this link: ${shareUrl}`);
    });
  }
};
