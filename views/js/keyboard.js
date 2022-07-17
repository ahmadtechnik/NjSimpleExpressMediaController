$('.key-button').on('click', (element) => {
    const key = $(element.target).attr('data-key').toLowerCase();
    $.get('/press_key', {
        key
    })
})
