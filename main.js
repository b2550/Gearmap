const {app, Menu, Tray, Notification, BrowserWindow} = require('electron')
const path = require('path');
const notifier = require('node-notifier')

let win
let tray

app.dock.hide()

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadFile('index.html')

  win.on('closed', () => {
    win = null
  })
}

function createTray () {
  tray = new Tray('icon.png')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Open Scanner', type: 'normal', click: (item, window, event) => {
      createWindow()
    }},
    {label: 'Preferences...', type: 'normal'},
    {type: 'separator'},
    {label: 'Quit', role: 'quit'}
  ])
  tray.setContextMenu(contextMenu)

  notifier.notify({
    title: 'Inventory Manager Started!',
    message: 'Start scanning items...',
    icon: 'icon.png'
  })
}

app.on('ready', createTray)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
