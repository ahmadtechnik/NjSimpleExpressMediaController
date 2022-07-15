$(document).ready(() => {
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
    $('#volumeChanger').on('input', (t) => {
        console.log(t.target.value)
        $.get('/volume_set?v=' + t.target.value, {
            data: {
                volume: t.target.value
            }
        })
    })
})
