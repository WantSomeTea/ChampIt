'use strict'

const GroupStage = require('groupstage')

$('button#groupstage').on('click', () => {
  // let inputs = $('.form-team-name')
  // var teamNames = []
  // for (var i = 0; i < inputs.length; i+=1) {
  //   teamNames.push(inputs[i])
  // }

  var teamsCount = +($('input#form-team-number').val())
  var teamsInGroup = +($('input#form-teams-in-group').val())

  var group = new GroupStage(teamsCount, { groupSize: teamsInGroup })
  console.log(group)
})

$('input#form-team-number').change(() => {
  var teamsCount = +($('input#form-team-number').val())

  var teamInput = '<span id="form-teams">'
  for (var i = 0; i < teamsCount; i += 1) {
    teamInput += (`<div class="form-item">
      <label>Команда № ${i+1}</label>
      <input type="text" placeholder="Команда № ${i+1}">
      </div>`)
  }
  teamInput += '</span>'

  $('div#form-teams').replaceWith(teamInput)
})
