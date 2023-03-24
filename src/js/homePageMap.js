(function() {
    const lat = 41.3935138;
    const lng = 2.1791033;
    const map = L.map('map-homePage').setView([lat, lng ], 14);

    let markers = new L.FeatureGroup().addTo(map);

    // Home Page Map Filters set up
    const categoriesSelect = document.querySelector('#categories');
    const pricesSelect = document.querySelector('#prices');

    let properties = [];

    const filters = {
        category: '',
        price: ''
    }


    // Render map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    // Home Page Map Filtering
    const filterCategory = (property) => {
        // The .filter() array method returns the object in question on a truthy condition.
        if (filters.category) {
            // Meaning, here, if there is a Category filter applied, it will return true for every object that matches the given filter. Therefore it will literally return each mathing object.
            // If the object being evaluated doesn't match the given filter, it returns false, meaning the object is not passed back to the resulting array.
            return filters.category === property.categoryId;
        }

        // Therefore, if there are no filters provided, we can either return the very same object in question (property). Or returning true will also return the object.
        return true;
    }

    const filterPrice = (property) => {
        return filters.price ? filters.price === property.priceId : property
    }

    const filterProperties = () => {
        const result = properties.filter(filterCategory).filter(filterPrice);

        displayProperties(result);
    }

    categoriesSelect.addEventListener('change', event => {
        filters.category = Number(event.target.value);
        filterProperties();
    });

    pricesSelect.addEventListener('change', event => {
        filters.price = Number(event.target.value);
        filterProperties();
    });


    // Get and render properties on map.
    const displayProperties = (properties) => {
        markers.clearLayers(); // Clearing current layer of markers so it resets when filters are applied.

        properties.forEach(property => {
            const marker = new L.marker([property?.lat, property?.lng], {
                autoPan: true
            })
            .addTo(map)
            .bindPopup(`
                <h1 class="text-xl font-extrabold uppercase mt-2">${property?.title}</h1>
                <p class="text-indigo-600 font-bold">${property?.category?.name}</p>
                <p class="text-gray-600 font-bold">${property?.price?.priceRange}</p>
                <img src="/uploads/${property?.image}" alt="Property: ${property?.title} image">
                <a href="/property/${property?.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase mt-5">View Property</a>
            `);

            markers.addLayer(marker); // Adding each marker to markers so it can be used for filtering.
        });
    }

    const getProperties = async () => {
        try {
            const url = '/api/properties';

            const response = await fetch(url);            
            const responseJson = await response.json();

            properties = responseJson.properties;

            // Passing the array of properties found in the response.
            displayProperties(properties);

        } catch (error) {
            console.log('Error encountered when retrieving the list of properties.\n', error);
        }
    }

    getProperties();
})();