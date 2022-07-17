$(document).ready(() => {
    getCurrentVolume();
    $('#next_button').on('click', () => {
        $.get('/next');
    });
    $('#prev_button').on('click', () => {
        $.get('/prev');
    });
    $('#toggle_button').on('click', () => {
        $.get('/play');
    });
    $('#v_up_button').on('click', () => {
        $.get('/v_up');
    });
    $('#v_down_button').on('click', () => {
        $.get('/v_down');
    });
    $('#volumeChanger').on('input change', (t) => {
        $('#volume_value').text(t.target.value);
        $.get('/volume_set?v=' + t.target.value, {
            data: {
                volume: t.target.value
            }
        });
    });

    $.get('./fragments/keyboard.html', {responseType: 'html'}).then((res) => {
        $('#response_container').prepend($('<div>').html(res));
    }).catch((err) => {
        console.log(err.message)
    })
});

function getCurrentVolume() {
    $.get('/get_volume').then((d) => {
        $('#volume_value').text(d);
        $('#volumeChanger').val(d);
    });
}
