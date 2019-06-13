// Check that service workers are registered
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      // navigator.serviceWorker.register('/service-worker.js');
      navigator.serviceWorker.register('/sw.js');
    });
  }
  let deferredPrompt;
  // let divAdd = document.getElementById('divAdd');
  let btnAdd = document.getElementById('btnAdd');
  window.addEventListener('beforeinstallprompt', (e) => {
    // prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // stash the event so it can be triggered later
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    // divAdd.style.display = 'block';
  });
  window.addEventListener('appinstalled', (evt) => {
    console.log('App installed to home screen!!');
    // divAdd.style.display = "none";
  });
  // btnAdd.addEventListener('click', (e) => {
  //   deferredPrompt.prompt();
  //   deferredPrompt.userChoice.then((choiceResult) => {
  //     if (choiceResult.outcome === 'accepted') {
  //       console.log('User accepted the add to home screen prompt');
  //     }
  //     deferredPrompt = null;
  //   });
  // });