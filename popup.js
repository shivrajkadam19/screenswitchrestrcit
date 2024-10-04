document.getElementById("enable").addEventListener("click", function() {
    // Enable redirection
    chrome.storage.local.set({ redirectionEnabled: true }, function() {
      console.log("Redirection enabled.");
    });
  });
  
  document.getElementById("disable").addEventListener("click", function() {
    // Disable redirection
    chrome.storage.local.set({ redirectionEnabled: false }, function() {
      console.log("Redirection disabled.");
    });
  });
  
  // Check the current state of redirection when popup is loaded
  chrome.storage.local.get(['redirectionEnabled'], function(result) {
    const isEnabled = result.redirectionEnabled;
    console.log("Redirection is currently:", isEnabled ? "Enabled" : "Disabled");
  });
  