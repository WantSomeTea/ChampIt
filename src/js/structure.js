'use strict'

const twig = require('twig').twig

class Tournament {
  constructor(name, group, matches, teams) {
    this.name = name
    this.group = group
    this.matches = matches
    this.teams = teams
  }

  get fullMatches() {
    return this.matches.map((match) => {
      match.p = match.p.map((team) => {
        return this.teams[team-1]
      })
      return match
    })
  }

  get schedule() {
    var html = '<table id="current-tournament">'
    + '<thead>'
      + '<tr>'
        + '<th></th>'
        + '<th></th>'
        + '<th></th>'
      + '</tr>'
    + '</thead>'
    + '<tbody>'
    matches.forEach((match) => {
      console.log(match.p)
      html += matchTemplate.render({
          number: 0,
          team1: match.p[0],
          team2: match.p[1]
      })
    })
    html += '</tbody></table>'

    return html
  }

var matchTemplate = twig({
  data: '<tr>'
    + '<td class="col-2">{{ number }}</td>'
    + '<td class="col-5">{{ team1 }}</td>'
    + '<td class="col-5">{{ team2 }}</td>'
  + '</tr>'
})
