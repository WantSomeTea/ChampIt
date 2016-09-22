// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, Menu } from 'electron'
import { devMenuTemplate } from './menu/dev_menu_template'
import { editMenuTemplate } from './menu/edit_menu_template'
import createWindow from './helpers/window'
import Firebase from './helpers/firebase'

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env'

var setApplicationMenu = function () {
  var menus = [editMenuTemplate]
  if (env.name !== 'production') {
    menus.push(devMenuTemplate)
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus))
}

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
  var userDataPath = app.getPath('userData')
  app.setPath('userData', userDataPath + ' (' + env.name + ')')
}

app.on('ready', function () {
  setApplicationMenu()

  var mainWindow = createWindow('main', {
    width: 1000,
    height: 600
  })

  mainWindow.loadURL('file://' + __dirname + '/app.html')

  if (env.name === 'development') {
    mainWindow.openDevTools()
  }

  Firebase.Tournament.setTournament(1, 'Championship #1', 'Group', ['Alpha', 'Beta', 'Gamma']).then(() => {
    console.log('Successfullt added tournament')
    Firebase.Tournament.getTournament(0).then((value) => {
      var trn = value.val()
      console.log(trn)
    })
  })
})

app.on('window-all-closed', function () {
  app.quit()
})
