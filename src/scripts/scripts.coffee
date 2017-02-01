teammembers = 1
jQuery(document).ready () ->
  console.log "test"
  submitFormListener()
  addAnotherMemberListener()
  return


submitFormListener = () ->
  form = jQuery('form')
  form.on 'submit', (e) ->
    e.preventDefault()
    console.log e.serialize()
    return
  return

addAnotherMemberListener = () ->
  console.log 'addAnotherMemberListener'
  addAnother = jQuery('#add-another')
  addAnother.on 'click', (e) ->
    e.preventDefault()
    if teammembers == 4
      $('#add-another').hide()
    if teammembers < 5
      teammembers++
      newdiv = document.createElement('div')
      newdiv.innerHTML = '<div class="form-group">
        <label for="name_'+teammembers+'"> Introduce your team mate *</label>
        <input type="text" name="name_'+teammembers+'" placeholder="Teammate\'s name" required>
        <input type="email" name="email_'+teammembers+'" placeholder="Teammate\'s email" required>
        </div>'
      members = document.querySelector '.members'
      members.appendChild(newdiv)
    return
  return
