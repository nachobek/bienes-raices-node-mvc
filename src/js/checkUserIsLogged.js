(async () => {
    const navUserLoggedOut = document.querySelector('#nav-logged-out');
    const navUserLoggedIn = document.querySelector('#nav-logged-in');

    // const getCookie = cookieName => {
    //     let name = cookieName + '=';
    //     let decodedCookie = decodeURIComponent(document.cookie);
    //     let ca = decodedCookie.split(';');

    //     for(let i = 0; i <ca.length; i++) {
    //       let c = ca[i];

    //       while (c.charAt(0) == ' ') {
    //         c = c.substring(1);
    //       }

    //       if (c.indexOf(name) == 0) {
    //         return c.substring(name.length, c.length);
    //       }
    //     }

    //     return '';
    // }

    // const csrfToken = getCookie('_csrf');

    const response = await fetch('/auth/logStatus', {
        method: 'GET',
        credentials: 'same-origin'
        // headers: {
        //     // 'X-CSRF-TOKEN': token
        //     'CSRF-Token': csrfToken
            
        // }
    });

    const { userLogged } = await response.json();

    if (userLogged) {
        navUserLoggedOut.className = 'hidden';
        navUserLoggedIn.classList.add('my-5', 'text-sm', 'md:flex', 'md:items-center', 'md:gap-3', 'font-bold', 'text-white', 'hidden');
    } else {
        navUserLoggedIn.className = 'hidden';
        navUserLoggedOut.classList.add('my-5', 'text-sm', 'md:flex', 'md:items-center', 'md:gap-3', 'font-bold', 'text-white', 'hidden');
    }

})();