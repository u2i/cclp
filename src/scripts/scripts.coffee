teammembers = 1

jQuery(document).ready () ->
  console.log "test"
  submitFormListener()
  jQuery('.gallery').slick({
    infinite: true,
    centerMode: true,
    adaptiveHeight: true,
    centerPadding: '40px',
    slidesToShow: 3,
    nextArrow: jQuery('.gallery-next'),
    prevArrow: jQuery('.gallery-prev'),
    variableWidth: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }]
  });
  return


submitFormListener = () ->
  form = jQuery('form')
  form.on 'submit', (e) ->
    e.preventDefault()
    console.log e, form.serialize()
    return
  return
