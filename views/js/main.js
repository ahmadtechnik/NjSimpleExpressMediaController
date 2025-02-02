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
    
    // Volume slider behavior
    const volumeSlider = $('#volumeChanger');
    const volumeDisplay = $('#volume_value');
    
    // Update display while sliding
    volumeSlider.on('input', (e) => {
        volumeDisplay.text(e.target.value);
    });
    
    // Only send volume change request when mouse is released
    volumeSlider.on('mouseup touchend', (e) => {
        const newVolume = e.target.value;
        $.get('/volume_set?v=' + newVolume, {
            data: {
                volume: newVolume
            }
        });
    });
});

function getCurrentVolume() {
    $.get('/get_volume').then((d) => {
        $('#volume_value').text(d);
        $('#volumeChanger').val(d);
    });
}
