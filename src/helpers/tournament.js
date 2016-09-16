'use strict'

// function Tournament () {
//   this.id = 0
//   this.teams = [Team]
// }

function Team (name) {
  this.name = name
}

var teams = [
  new Team('Alpha'),
  new Team('Beta')
]

for (var team in teams) {
  console.log(team)
}
