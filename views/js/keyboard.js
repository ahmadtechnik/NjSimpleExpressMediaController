$('.key-button').on('click', (element) => {
    const key = $(element.target).attr('data-key').toLowerCase();
    $.get('/press_key', {
        key
    })
})

$('.key-button-sleep').on('click', () => {
    if (confirm('Are you sure you want to go to sleep?')) {
        $.get('/go_to_sleep');
    }
});
