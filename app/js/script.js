$('div#games').group({
  save: function (state) {
    // Write your storage code here, now just display JSON above
    $('pre#state').text(JSON.stringify(state, undefined, 2))
  }
})
