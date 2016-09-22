'use strict'

const GroupStage = require('groupstage')

$('button#group-stage').on('click', () => {
  // let inputs = $('.form-team-name')
  // var teamNames = []
  // for (var i = 0; i < inputs.length; i+=1) {
  //   teamNames.push(inputs[i])
  // }

  var teamsCount = +($('input#form-team-number').val())
  var teamsInGroup = +($('input#form-teams-in-group').val())

  // Check if groupstage can be constructed
  var reason = GroupStage.invalid(teamsCount, { groupSize: teamsInGroup })
  if (!reason) {
    var group = new GroupStage(teamsCount, { groupSize: teamsInGroup })
    console.log(group)
      $('#form-info-message').text(`Группы успешно созданы`)
      $('#form-info').alert('open')
  } else {
    $('#form-error-message').text(`${ reason }`)
    $('#form-error').alert('open')
    console.log(reason); // will tell you what went wrong
  }
})

$('input#form-team-number').change(() => {
  var teamsCount = +($('input#form-team-number').val())

  var teamInput = '<span id="form-teams"><div class="row blocks">'

  for (var i = 0; i < teamsCount; i += 1) {
    teamInput += (`<div class="form-item col col-6">
      <label>Команда № ${i+1}</label>
      <input type="text" placeholder="Команда № ${i+1}">
      </div>`)
  }
  teamInput += '</div></span>'

  $('span#form-teams').replaceWith(teamInput)
})
