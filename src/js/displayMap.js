(function() {
    const lat = document.querySelector('#lat').textContent;
    const lng = document.querySelector('#lng').textContent;
    const title = document.querySelector('#title').textContent;
    const address = document.querySelector('#address').textContent;

    // .map(Id of HTML object)
    const map = L.map('mapHtml').setView([lat, lng], 16);

    // Render map.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Render pin on map.
    L.marker([lat, lng]).addTo(map).bindPopup(`<p style="text-align:center"><b>${title}</b> <br> ${address}</p>`);
})();