const remote = require('electron').remote
const log = require('electron-log')

document.getElementById("min-btn").addEventListener("click", function(e) {
  log.debug('Window minimized from header')
  var window = remote.getCurrentWindow();
  window.minimize();
});

document.getElementById("max-btn").addEventListener("click", function(e) {
  var window = remote.getCurrentWindow();
  if (!window.isMaximized()) {
    log.debug('Window maximized from header')
    window.maximize();
  } else {
    log.debug('Window unmaximized from header')
    window.unmaximize();
  }
});

document.getElementById("close-btn").addEventListener("click", function(e) {
  log.debug('Window closed (hidden) from header')
  var window = remote.getCurrentWindow();
  window.hide();
});

window.eval = global.eval = function () {
  log.warn('Attempted execution of window.eval() blocked.')
  throw new Error(`Sorry, this app does not support window.eval().`)
}
