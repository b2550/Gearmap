const {app, Menu, Tray, Notification, BrowserWindow} = require('electron')
const path = require('path');
const notifier = require('node-notifier')
const log = require('electron-log')

let win
let pref
let tray

log.silly('Howdy there! Inventory Manager is starting up. Please wait a moment while I hack your computer for ultimate Inventory Management optimization and integration.')

app.dock.hide()

log.debug('Dock icon hidden')

function createWindow () {
  log.debug('Creating main window')
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: false,
    minWidth: 800,
    minHeight: 300,
    show: false
  })

  log.debug('Loading index.html from ' + path.join(__dirname, 'index.html'))
  win.loadFile(path.join(__dirname, 'index.html'))

  win.on('close', (event) => {
    win = null
  })

  log.debug('Main window created')
}

function createTray () {
  log.debug('Creating tray')
  log.debug('Using tray icon at ' + path.join(__dirname, 'resources', 'icon.png'))
  tray = new Tray(path.join(__dirname, 'resources', 'icon.png')) // TODO: Change to use tempalte image https://github.com/electron/electron/blob/master/docs/api/native-image.md#template-image http://electron.rocks/proper-tray-icon/
  // TODO: Tray icon indicator for error and working application status
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Open Scanner', type: 'normal', click: (item, window, event) => {
      log.debug('Showing main window from tray')
      win.show()
    }},
    {label: 'Preferences...', type: 'normal'},
    {type: 'separator'},
    {label: 'Quit', role: 'quit'}
  ])
  tray.setContextMenu(contextMenu)

  log.debug('Tray created')
  notifier.notify({
    title: 'Inventory Manager Started!',
    message: 'Start scanning items...',
    icon: path.join(__dirname, 'resources', 'icon.png')
  })
}

app.on('ready', () => {
  log.debug('Starting application')
  createTray()
  createWindow()
  log.debug('Application started')
})

app.on('quit', () => {
  log.info('Application quitting')
})
