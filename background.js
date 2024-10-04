let oauthInProgress = false;

// Function to check if a URL is allowed
function isUrlAllowed(url) {
  const allowedPatterns = [
    /hackerrank\.com/,                    // Allow HackerRank
    /.*\.google\.com/,                    // Allow any google.com subdomain
    /.*\.googleapis\.com/,                // Allow Google APIs
    /.*\.gstatic\.com/,                   // Allow Google static content
    /.*\.googleusercontent\.com/,         // Allow Google OAuth-related domains
    /accounts\.google\.com/,              // Google login pages
    /oauth2\.googleapis\.com/             // OAuth 2 API
  ];
  
  // If OAuth flow is in progress, allow all URLs temporarily
  if (oauthInProgress) {
    return true;
  }

  // Check if any allowed pattern matches the current URL
  return allowedPatterns.some(pattern => pattern.test(url));
}

// Listen for tab updates (navigating to new pages)
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url && !isUrlAllowed(changeInfo.url)) {
    // Redirect to the custom URL if the current tab is not allowed
    chrome.tabs.update(tabId, { url: "https://strong-caramel-386d7e.netlify.app/" });
  }
});

// Listen for web navigation to Google OAuth URLs (for better detection)
chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.url.includes("accounts.google.com") || details.url.includes("oauth2.googleapis.com")) {
    // Start OAuth process
    oauthInProgress = true;
    
    // Disable redirection for 30 seconds to complete OAuth flow
    setTimeout(() => {
      oauthInProgress = false;
    }, 30000); // 30 seconds to allow OAuth process to complete
  }
}, { url: [{ urlContains: "google.com" }] }); // Filter for Google domains
