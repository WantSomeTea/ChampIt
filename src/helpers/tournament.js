'use strict'

const _ = require('lodash')

// Classes

function Team (name) {
  this.name = name
}

function Game (id, team1, team2) {
  this.id = id
  this.team1 = team1
  this.team2 = team2
}

function Tournament (teams) {
  this.teams = teams
  this.matches = []

  this.schedule = (teams) => {
    var schedule = []
    var num = 0
    _(teams).each((team1, index1) => {
      _(teams).each((team2, index2) => {
        if (team1 !== team2) {
          let game = new Game(num, team1, team2)
          if (!scheduleContainsGame(game)) {
            schedule.push(game)
            num++
          }
        }
      })
    })

    var scheduleContainsGame = (game) => {

      _(schedule).filter((scheduledGame) => {
        if (scheduledGame.team1 === game.team1 && scheduledGame.team2 === game.team2 || scheduledGame.team1 === game.team2 && scheduledGame.team2 === game.team1) {
          return true
        } else {
          return false
        }
      })
    }

    this.matches = schedule
  }
}

// Test

var teams = []
for (var i = 0; i < 3; i++) {
  teams[i] = new Team(`Alpha ${i+1}`)
}

var trn = new Tournament(teams)

trn.schedule(teams)

console.log(trn.matches)
