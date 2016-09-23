'use strict'

const GroupStage = require('groupstage')

class Tournament {
  constructor(name, group, teams) {
    this.name = name
    this.group = group
    this.teams = teams
  }
}

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
  var reason = GroupStage.invalid(teamsCount, { groupSize: teamsInGroup })
  if (reason) {
    $('#form-error-message').text('Не удалось создать турнир')
    $('#form-error').alert('open')
    console.error(reson)
  } else {
    var group = new GroupStage(teamsCount, { groupSize: teamsInGroup })
    $('#form-info-message').text(`Группы успешно созданы`)
    $('#form-info').alert('open')

    var teamNames = []
    $('.form-team-name').each(function() {
      var value = $(this).val()
      if (value != "") {
        teamNames.push(value)
      } else {
        teamNames.push('Команда')
      }
    })

    var name = $('#form-tournament-name').val()

    var trn = new Tournament(name, group, teamNames)
    console.log(trn)


    // addTournamentToDatabase(11, name, group, teamNames)
  }
})

// var addTournamentToDatabase = (trnID, name, group, teams) => {
//   Firebase.Tournament.setTournament(trnID, name, group, "Group", teams).then(() => {
//     console.log("Added smthing");
//   })
// }
