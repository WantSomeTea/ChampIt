'use strict'

const Firebase = require('firebase')

Firebase.initializeApp({
  apiKey: 'AIzaSyAlEP38rF6K6fz93YNlUPom8zoY2QGi3vE',
  authDomain: 'ekbfootball-74831.firebaseapp.com',
  databaseURL: 'https://ekbfootball-74831.firebaseio.com'
})

Firebase.Tournament = {
  setTournament: (trnID, name, group, type, teams) => {
    return Firebase.database().ref('tournaments/' + trnID).set({
      name: name,
      type: type,
      group: group,
      teams: teams
    })
  },
  getTournament: (trnID) => {
    return Firebase.database().ref('/tournaments/' + trnID).once('value')
  }
}

export default Firebase
