/**
 * Media Controller Client-Side JavaScript
 * Handles all client-side interactions for the media controller interface,
 * including media controls, volume management, and QR code generation.
 */

// API endpoints for media control
const api = {
    next: '/next',
    prev: '/prev',
    play: '/play',
    volumeUp: '/v_up',
    volumeDown: '/v_down',
    getVolume: '/get_volume',
    setVolume: '/volume_set',
    serverInfo: '/server-info'
};

// Volume adjustment interval state
let volumeAdjustInterval = null;
const VOLUME_ADJUST_DELAY = 150; // Time between volume adjustments in ms

$(document).ready(() => {
    // Initialize volume
    getCurrentVolume();

    // Media control buttons
    $('#next_button').on('click', () => {
        $.get(api.next);
    });

    $('#prev_button').on('click', () => {
        $.get(api.prev);
    });

    $('#toggle_button').on('click', () => {
        $.get(api.play);
    });

    // Volume Up Button - Continuous adjustment
    $('#v_up_button')
        .on('mousedown touchstart', (e) => {
            e.preventDefault(); // Prevent default to avoid issues on touch devices
            // Initial volume up
            $.get(api.volumeUp).then(response => {
                updateVolumeDisplay(response.volume);
            });
            // Start continuous volume up
            volumeAdjustInterval = setInterval(() => {
                $.get(api.volumeUp).then(response => {
                    updateVolumeDisplay(response.volume);
                });
            }, VOLUME_ADJUST_DELAY);
        })
        .on('mouseup mouseleave touchend', () => {
            // Stop continuous volume up
            if (volumeAdjustInterval) {
                clearInterval(volumeAdjustInterval);
                volumeAdjustInterval = null;
            }
        });

    // Volume Down Button - Continuous adjustment
    $('#v_down_button')
        .on('mousedown touchstart', (e) => {
            e.preventDefault(); // Prevent default to avoid issues on touch devices
            // Initial volume down
            $.get(api.volumeDown).then(response => {
                updateVolumeDisplay(response.volume);
            });
            // Start continuous volume down
            volumeAdjustInterval = setInterval(() => {
                $.get(api.volumeDown).then(response => {
                    updateVolumeDisplay(response.volume);
                });
            }, VOLUME_ADJUST_DELAY);
        })
        .on('mouseup mouseleave touchend', () => {
            // Stop continuous volume down
            if (volumeAdjustInterval) {
                clearInterval(volumeAdjustInterval);
                volumeAdjustInterval = null;
            }
        });
    
    // Volume slider behavior
    const volumeSlider = $('#volumeChanger');
    
    volumeSlider.on('input', (e) => {
        $('#volume_value').text(e.target.value);
    });
    
    volumeSlider.on('mouseup touchend', (e) => {
        const newVolume = e.target.value;
        $.get(`${api.setVolume}?v=${newVolume}`).then(response => {
            updateVolumeDisplay(response.volume);
        });
    });

    // Initialize QR code
    initializeServerInfo();
});

/**
 * Update volume display and slider position
 * @param {number} volume - The volume level to display (0-100)
 */
function updateVolumeDisplay(volume) {
    $('#volume_value').text(volume);
    $('#volumeChanger').val(volume);
}

/**
 * Fetch current system volume from server
 */
function getCurrentVolume() {
    $.get(api.getVolume).then((response) => {
        updateVolumeDisplay(response.volume);
    });
}

/**
 * Initialize server information and generate QR code
 */
function initializeServerInfo() {
    $.get(api.serverInfo).then(response => {
        generateQRCode(response.url);
        $('#serverUrl').text(response.url);
    });
}

/**
 * Generate QR code for server URL
 * @param {string} url - The server URL to encode in the QR code
 */
function generateQRCode(url) {
    const qr = qrcode(0, 'L');
    qr.addData(url);
    qr.make();
    const cellsize = 4;  // Adjust this value to change QR code size
    const margin = 0;    // Minimal margin
    $('#qrcode').html(qr.createImgTag(cellsize, margin));
}
