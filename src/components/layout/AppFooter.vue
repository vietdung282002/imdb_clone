<template>
  <footer class="app-footer">
    <div class="container">
      <div class="signup-section">
        <button class="signup-btn">Sign in for more access</button>
      </div>

      <div class="footer-link">
        <div class="footer-columns">
          <div class="footer-cards-row">
            <div class="footer-cards">
              <div class="footer-cards-title">Follow IMDb on social</div>
              <div class="social-icons-row">
                <a href="#" class="social-icon" aria-label="TikTok">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a href="#" class="social-icon" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#" class="social-icon" aria-label="X (Twitter)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" class="social-icon" aria-label="YouTube">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#" class="social-icon" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
            <div class="footer-cards qr-code-card">
              <div class="qr-code-card-content">
                <div class="footer-cards-title">Get the IMDb App</div>
                <div class="footer-cards-subtitle">For Android and iOS</div>
              </div>
              <div class="qr-code-card-image">
                <img src="@/assets/qrcode.svg" width="66" height="59" alt="QR Code" />
              </div>
            </div>
          </div>
          <div class="footer-links-section">
            <div class="footer-links-row">
              <a href="#" class="footer-link-item">Help</a>
              <a href="#" class="footer-link-item">Site Index</a>
              <a href="#" class="footer-link-item">IMDbPro</a>
              <a href="#" class="footer-link-item">Box Office Mojo</a>
              <a href="#" class="footer-link-item">License IMDb Data</a>
            </div>
            <div class="footer-links-row">
              <a href="#" class="footer-link-item">Press Room</a>
              <a href="#" class="footer-link-item">Advertising</a>
              <a href="#" class="footer-link-item">Jobs</a>
              <a href="#" class="footer-link-item">Conditions of Use</a>
              <a href="#" class="footer-link-item">Privacy Policy</a>
              <a href="#" class="footer-link-item">Your Ads Privacy Choices</a>
            </div>
          </div>

        </div>

      </div>
      <div class="copyright">© 1990-2024 by IMDb.com, Inc.</div>

    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #000;
  color: var(--accent-color);
  padding: 1rem 0;
}

.container {
  margin: 0 auto;
  padding: 0 1rem;
}

.signup-section {
  display: flex;
  justify-content: center;
}

.signup-btn {
  background-color: rgb(245, 197, 24);
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 24px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Roboto';
  height: 36px;
  padding: 0 32px;
}

.footer-link {
  display: flex;
  justify-content: center;
}

.footer-columns {
  width: 1024px;
  height: 222px;
  margin-bottom: 1rem;
}

.footer-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 80%;
  padding: 24px 0 16px;
  margin: 0px auto;
}

.footer-cards {
  border-radius: 10px;
  border: 2px solid rgb(31, 31, 31);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qr-code-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 0rem;
}

.footer-cards-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  font-family: 'Roboto';
  line-height: 24px;
}

.footer-cards-subtitle {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Roboto';
  line-height: 32px;
}

.social-icons-row {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
  padding-top: 4px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: opacity 0.2s ease;
  text-decoration: none;
  padding: 11px;
}

.social-icon:hover {
  opacity: 0.7;
}

.social-icon svg {
  width: 24px;
  height: 24px;
}

.qr-code-card-content {
  padding-left: 1.5rem;
  text-align: left;
}

.qr-code-card-image {
  margin: 1rem 1.5rem 1rem auto;
}

.footer-links-section {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.footer-links-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.footer-link-item {
  color: rgba(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  font-family: 'Roboto';
  padding: 8px;
  transition: text-decoration 0.2s ease;
}

.footer-link-item:hover {
  text-decoration: underline;
}

.copyright {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Roboto';
  line-height: 16px;
  margin: 1em 0px;
  text-align: center;
}
</style>
