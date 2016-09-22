
// Initialize Firebase
var firebase = require('firebase')

var config = {
  apiKey: 'AIzaSyAlEP38rF6K6fz93YNlUPom8zoY2QGi3vE',
  authDomain: 'ekbfootball-74831.firebaseapp.com',
  databaseURL: 'https://ekbfootball-74831.firebaseio.com',
  storageBucket: 'ekbfootball-74831.appspot.com',
  messagingSenderId: '952184322188'
}
firebase.initializeApp(config)

firebase.Tournament = {
  setTournament: (trnID, name, type, teams) => {
    return firebase.database().ref('tournaments/' + trnID).set({
      name: name,
      type: type,
      teams: teams
    })
  },
  getTournament: (trnID) => {
    return firebase.database().ref('/tournaments/' + trnID).once('value')
  }
}

export default firebase
