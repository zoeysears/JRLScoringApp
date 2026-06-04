function loadBalance(alliance, matchNum) {
    $.post('./php/getMatch.php', {match_num: matchNum}, function(data) {
        const m = JSON.parse(data)[0];
        // Populate tables (similar to previous example)
        // ... build HTML for auto/tele/endgame sections
    });
}

$(document).ready(() => {
    const params = new URLSearchParams(location.search);
    const mn = params.get('match_num') || document.getElementById('matchNum')?.textContent;
    loadBalance('red', mn);
});