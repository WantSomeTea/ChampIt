'use strict'

// addTournamentToDatabase(11, name, group, teamNames)

// var addTournamentToDatabase = (trnID, name, group, teams) => {
//   Firebase.Tournament.setTournament(trnID, name, group, "Group", teams).then(() => {
//     console.log("Added smthing");
//   })
// }

'use strict'

const GroupStage = require('groupstage')


// Add inputs based on number in team number input
$('input#form-team-number').change(() => {
  var teamsCount = +($('input#form-team-number').val())

  var teamInput = '<span id="form-teams"><div class="row blocks">'

  for (var i = 0; i < teamsCount; i += 1) {
    teamInput += (`<div class="form-item col col-6">
      <label>Команда № ${i+1}</label>
      <input class="form-team-name" type="text" placeholder="Команда № ${i+1}">
      </div>`)
  }
  teamInput += '</div></span>'

  $('span#form-teams').replaceWith(teamInput)
})


// Button for tournament creation
$('button#group-stage').on('click', () => {
  var teamsCount = +($('input#form-team-number').val())
  var teamsInGroup = +($('input#form-teams-in-group').val())

  // Check if groupstage can be constructed
  var reason = GroupStage.invalid(teamsCount) //, { groupSize: teamsInGroup })

  /*numPlayers === groupSize*numGroups
  groupSize % 2 === 0*/

  if (reason) {
    $('#form-error-message').text('Не удалось создать турнир')
    $('#form-error').alert('open')
    console.error(reason)
  } else {
    var group = new GroupStage(teamsCount, { groupSize: teamsInGroup })
    $('#form-info-message').text(`Группы успешно созданы`)
    $('#form-info').alert('open')

    var teamNames = []
    $('.form-team-name').each(function(index, value) {
      var value = $(this).val()
      if (value != "") {
        teamNames.push(value)
      } else {
        teamNames.push(`${index + 1} Команда`)
      }
    })

    var name = $('#form-tournament-name').val()

    var trn = new Tournament(name, group, group.matches, teamNames)
    console.log(trn.fullMatches);

    var scheduleHtml = trn.schedule
    $('#current-tournament').replaceWith(scheduleHtml)
  }
})


var isValidTournament = (options) => {

}

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
