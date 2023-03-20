(function() {
    // const lat = document.querySelector('#lat').value ?? 41.3935138; // Using Nullish coalescing (??) assigns the hardcoded number if ".value" is null or undefined. But since we are getting either a value or ''. It will never match such a condition.
    const lat = document.querySelector('#lat').value || 41.3935138; // Useing OR (||) assigns the hardcoded number if ".value" is falsy.
    const lng = document.querySelector('#lng').value || 2.1791033;
    const map = L.map('map').setView([lat, lng ], 14);

    let marker;

    // Setting up Provider and Geocoder - Librarias come from the scripts in the list.pug view
    const geocodeService = L.esri.Geocoding.geocodeService();

    // Render map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Set up drag-able pin.
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(map);

    // Detect pin movement.
    marker.on('moveend', (event) => {
        marker = event.target;

        const position = marker.getLatLng();

        map.panTo(new L.LatLng(position.lat, position.lng));

        // Gather street info on new pin position.
        geocodeService.reverse().latlng(position, 14).run((error, result) => {
            marker.bindPopup(result.address.LongLabel);

            document.querySelector('.street').textContent = result?.address?.Address ?? '';
            document.querySelector('#street').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';
        });
    });
})();