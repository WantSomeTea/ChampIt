'use strict'

const twig = require('twig').twig

class Tournament {
  constructor (name, group, matches, teams) {
    this.name = name
    this.group = group
    this.matches = matches
    this.teams = teams
  }

  get fullMatches () {
    return this.matches.map((match) => {
      match.p = match.p.map((team) => {
        return this.teams[team - 1]
      })
      return match
    })
  }

  get schedule () {
    let template = twig({
      data: '<table id="schedule">'
      + '<thead>'
      + '<tr>'
      + '<th>Номер</th>'
      + '<th>Домашняя команда</th>'
      + '<th>Гостевая команда</th>'
      + '</tr>'
      + '</thead>'
      + '<tbody>'
      + '{% for match in matches %}'
      + '<tr>'
      + '<td class="col col-2">{{ loop.index }}</td>'
      + '<td class="col col-5">{{ match.p[0] }}</td>'
      + '<td class="col col-5">{{ match.p[1] }}</td>'
      + '</tr>'
      + '{% endfor %}'
      + '</tbody>'
      + '</table>'
    })

    return template.render({
      matches: this.fullMatches
    })
  }
}
