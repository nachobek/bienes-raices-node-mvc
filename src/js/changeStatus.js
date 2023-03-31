(() => {
    const changeStatusButtons = document.querySelectorAll('.change-status');

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const changePropertyStatus = async (event) => {
        const { propertyId } = event.target.dataset; // Represents the value stored on custom dataset "data-property-id" in properties/admin.pug

        const url = `/properties/${propertyId}`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    // 'X-CSRF-TOKEN': token
                    'CSRF-Token': token
                }
            });

            const { result } = await response.json();

            if (result) {
                if (event.target.classList.contains('bg-amber-100')) {
                    event.target.classList.add('bg-green-100', 'text-green-800');
                    event.target.classList.remove('bg-amber-100', 'text-amber-800');
                    event.target.textContent = 'Published'
                } else {
                    event.target.classList.add('bg-amber-100', 'text-amber-800');
                    event.target.classList.remove('bg-green-100', 'text-green-800');
                    event.target.textContent = 'Not Published'
                }
            }
        } catch (error) {
            console.log('Error when updating property published status\n', error);
        }
    }

    changeStatusButtons.forEach(button => {
        button.addEventListener('click', changePropertyStatus)
    });

})()