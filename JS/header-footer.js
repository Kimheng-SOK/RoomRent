// JS/header-footer.js

document.addEventListener('DOMContentLoaded', async () => {
    const headerHTML = `
    <header class="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 ">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <a href="index.html" class="title text-2xl lg:text-3xl font-bold text-indigo-600 rounded-md p-2 hover:bg-indigo-50 transition-colors duration-200">បន្ទប់ជួល</a>
            <nav class="hidden md:flex space-x-4 items-center lg:text-xl">
                <a href="index.html" class="mx-4 text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200">Home</a>
                <a href="listings.html" class="mx-4 text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200">Listings</a>
                <a href="about.html" class="mx-4 text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200">About Us</a>
                <a href="contact.html" class="mx-4 text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200">Contact</a>
                <a href="loginPage.html" id="headerLoginBtn" class="ml-4 bg-gray-200 text-slate-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 shadow-md">Login</a>
                <button id="headerLogoutBtn" class="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 shadow-md hidden">Logout</button>
                <button id="listRoomBtn" onclick="checkAddBtn()" class="bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md">Add Room</button>
                <a href="roomModalUser.html" id="myListingsBtn" class="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md hidden">My Listings</a>
                <a href="favorites.html" id="myFavoritesBtn" class="bg-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-300 shadow-md hidden">Favorites</a>
                <button id="adminPanelBtn" class="bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-300 shadow-md hidden">Admin Panel</button>
            </nav>
            <div class="md:hidden flex items-center space-x-4">
                <button id="mobileListRoomBtn" onclick="checkAddBtn()" class="bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md">List</button>
                <button id="mobileMenuBtn" class="text-slate-600 hover:text-indigo-600 focus:outline-none">
                    <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>
        <nav id="mobileMenu" class="md:hidden space-y-2 hidden">
            <div class="flex justify-end mb-4">
                <button id="closeMobileMenuBtn" class="text-slate-600 hover:text-indigo-600 focus:outline-none">
                    <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <a href="index.html" class="block text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md font-medium transition-colors duration-200">Home</a>
            <a href="listings.html" class="block text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md font-medium transition-colors duration-200">Listings</a>
            <a href="about.html" class="block text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md font-medium transition-colors duration-200">About Us</a>
            <a href="contact.html" class="block text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md font-medium transition-colors duration-200">Contact</a>
            <a href="addNewRoom.html" id="mobileSideListRoomBtn" class="w-full text-left bg-indigo-100 text-indigo-700 py-2 px-3 rounded-lg font-semibold hover:bg-indigo-200 transition-colors duration-300">List Your Room</a>
            <a href="loginPage.html" id="mobileSideLoginBtn" class="w-full text-left bg-gray-100 text-slate-700 py-2 px-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300">Login</a>
            <a href="roomModalUser.html" id="mobileSideMyListingsBtn" class="w-full text-left bg-blue-100 text-blue-700 py-2 px-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-300 hidden">My Listings</a>
            <a href="favorites.html" id="mobileSideMyFavoritesBtn" class="w-full text-left bg-pink-100 text-pink-700 py-2 px-3 rounded-lg font-semibold hover:bg-pink-200 transition-colors duration-300 hidden">My Favorites</a>
            <button id="mobileSideAdminPanelBtn" class="w-full text-left bg-teal-100 text-teal-700 py-2 px-3 rounded-lg font-semibold hover:bg-teal-200 transition-colors duration-300 hidden">Admin Panel</button> 
            <button id="mobileSideLogoutBtn" class="w-full text-left bg-red-100 text-red-700 py-2 px-3 rounded-lg font-semibold hover:bg-red-200 transition-colors duration-300 hidden">Logout</button>
        </nav>
        <div id="mobileMenuOverlay" class="fixed inset-0 bg-black opacity-0 z-40 hidden"></div>
    </header>`;

    const footerHTML = `
    <footer class="bg-slate-800 text-white py-8 px-4 sm:px-6 lg:px-8 mt-12">
    <div class="max-w-7xl mx-auto text-center">
        <p class="text-slate-300 mb-4">&copy; 2025 RoomRent. All rights reserved.</p>
        <div class="flex justify-center space-x-6">
        <a href="privacy.html" class="text-slate-400 hover:text-indigo-400 transition-colors duration-200">Privacy Policy</a>
        <a href="terms.html" class="text-slate-400 hover:text-indigo-400 transition-colors duration-200">Terms of Service</a>
        <a href="sitemap.html" class="text-slate-400 hover:text-indigo-400 transition-colors duration-200">Sitemap</a>
        </div>
        <p class="mt-2">Designed with ❤️ for a better rental experience.</p>
    </div>
    </footer>`;

    // Inject header and footer into DOM
    const headerContainer = document.getElementById('header-placeholder');
    const footerContainer = document.getElementById('footer-placeholder');
    headerContainer.innerHTML = headerHTML;
    footerContainer.innerHTML = footerHTML;

    // Show/hide header buttons based on login state
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    const myListingsBtn = document.getElementById('myListingsBtn');
    const headerLoginBtn = document.getElementById('headerLoginBtn');
    const headerLogoutBtn = document.getElementById('headerLogoutBtn');
    // Add more buttons as needed

    if (myListingsBtn) myListingsBtn.classList.toggle('hidden', !(isLoggedIn && userRole === 'user'));
    if (headerLoginBtn) headerLoginBtn.classList.toggle('hidden', isLoggedIn);
    if (headerLogoutBtn) headerLogoutBtn.classList.toggle('hidden', !isLoggedIn);

    // Add logout logic if needed
    if (headerLogoutBtn) {
        headerLogoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    }

    // // Wait for the DOM to update, then attach the event listener:
    // setTimeout(() => {
    //     const myListingsBtn = document.getElementById('myListingsBtn');
    //     if (myListingsBtn) {
    //         myListingsBtn.addEventListener('click', () => {
    //             // Show the modal
    //             document.getElementById('myRoomsModal').classList.remove('hidden');
    //             // Call the global function (defined in loadData.js)
    //             if (typeof window.renderMyListedRooms === 'function') {
    //                 window.renderMyListedRooms();
    //             } else {
    //                 console.error('renderMyListedRooms is not defined');
    //             }
    //         });
    //     }
    // }, 0);

    // Show Admin Panel button only for admin
    const adminPanelBtn = document.getElementById('adminPanelBtn');
    if (adminPanelBtn) {
        adminPanelBtn.classList.toggle('hidden', !(isLoggedIn && userRole === 'admin'));
        adminPanelBtn.addEventListener('click', () => {
            document.getElementById('adminPanelModal').classList.remove('hidden');
            if (typeof window.renderAdminRoomList === 'function') window.renderAdminRoomList();
        });
    }
    
    const mobileSideAdminPanelBtn = document.getElementById('mobileSideAdminPanelBtn');
    if (mobileSideAdminPanelBtn) {
        mobileSideAdminPanelBtn.classList.toggle('hidden', !(isLoggedIn && userRole === 'admin'));
        mobileSideAdminPanelBtn.addEventListener('click', () => {
            document.getElementById('mobileSideAdminPanelBtn').classList.remove('hidden');
            if (typeof window.renderAdminRoomList === 'function') window.renderAdminRoomList();
        });
    }

    // Desktop Favorites button
    const myFavoritesBtn = document.getElementById('myFavoritesBtn');
    if (myFavoritesBtn) {
        myFavoritesBtn.addEventListener('click', () => {
            document.getElementById('myFavoritesModal').classList.remove('hidden');
            if (typeof window.renderFavoriteRoomsList === 'function') {
                window.renderFavoriteRoomsList();
            } else {
                console.error('renderFavoriteRoomsList is not defined');
            }
        });
    }

    // Mobile Favorites button
    const mobileSideMyFavoritesBtn = document.getElementById('mobileSideMyFavoritesBtn');
    if (mobileSideMyFavoritesBtn) {
        mobileSideMyFavoritesBtn.addEventListener('click', () => {
            document.getElementById('myFavoritesModal').classList.remove('hidden');
            if (typeof window.renderFavoriteRoomsList === 'function') {
                window.renderFavoriteRoomsList();
            } else {
                console.error('renderFavoriteRoomsList is not defined');
            }
        });
    }

    /**
     * Placeholder function for checkAddBtn. In a real application, this would
     * contain logic to check if the user can add a room (e.g., if logged in).
     */
    window.checkAddBtn = function() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        // const isLoggedIn = false;
        if (!isLoggedIn) {
            alert('You must be logged in to list a room.'); // Using alert for demonstration; replace with custom modal
            window.location.href = 'loginPage.html'; // Redirect to login
        } else {
            // Proceed to add room page or form
            window.location.href = 'addNewRoom.html'; // Example redirect
        }
    };

    // Get references to elements (they exist now because header is loaded)
    console.log('Header loan successfully!')
    // Mobile menu elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    /**
     * Toggles the visibility of the mobile menu and overlay.
     * @param {boolean} show - True to show, false to hide.
     */
    function toggleMobileMenu(show) {
        if (mobileMenu) {
            if (show) {
                mobileMenu.classList.remove('hidden');
                // For sliding effect, add a class after a slight delay
                setTimeout(() => mobileMenu.classList.add('is-open'), 10);
                mobileMenuOverlay.classList.remove('hidden'); // Ensure overlay is not display:none
                setTimeout(() => mobileMenuOverlay.classList.add('is-visible'), 10); 
            } else {
                mobileMenu.classList.remove('is-open');
                mobileMenuOverlay.classList.remove('is-visible');
                // Hide after transition
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenuOverlay.classList.add('hidden')
                }, 300); // Match CSS transition duration
            }
        }

        // // mobileMenuOverlay
        // if (mobileMenuOverlay) {
        //     if (show) {
        //         mobileMenuOverlay.classList.remove('hidden');
        //         setTimeout(() => mobileMenuOverlay.classList.add('is-visible'), 10);
        //     } else {
        //         mobileMenuOverlay.classList.remove('is-visible');
        //         setTimeout(() => mobileMenuOverlay.classList.add('hidden'), 300);
        //     }
        // }

        if (show) {
            document.body.classList.add('overflow-hidden');
            if (mobileMenuBtn) mobileMenuBtn.classList.add('hidden');
            if (closeMobileMenuBtn) closeMobileMenuBtn.classList.remove('hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('hidden');
            if (closeMobileMenuBtn) closeMobileMenuBtn.classList.add('hidden');
        }
    }

    // Add event listeners for mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
    }
    if (closeMobileMenuBtn) {
        closeMobileMenuBtn.addEventListener('click', () => toggleMobileMenu(false));
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));
    }

    /**
     * Handles the logout process.
     */
    function handleLogout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail'); // Remove user email too
        // Optionally, show a logout message or redirect
        window.location.href = 'index.html'; // Redirect back to login
        console.log('user logged out!!');
        updateHeaderButtons();
    }


    /**
     * Updates header button visibility based on login status and user role from localStorage.
     */
    function updateHeaderButtons() {
        // Header navigation buttons
        const headerLoginBtn = document.getElementById('headerLoginBtn');
        const headerLogoutBtn = document.getElementById('headerLogoutBtn');
        const listRoomBtn = document.getElementById('listRoomBtn');
        const myListingsBtn = document.getElementById('myListingsBtn');
        const myFavoritesBtn = document.getElementById('myFavoritesBtn');
        const adminPanelBtn = document.getElementById('adminPanelBtn');

        // Mobile side menu buttons
        const mobileListRoomBtn = document.getElementById('mobileListRoomBtn');
        const mobileSideLoginBtn = document.getElementById('mobileSideLoginBtn');
        console.log('Attempting to get mobileSideLoginBtn:', mobileSideLoginBtn); // Add this
        const mobileSideLogoutBtn = document.getElementById('mobileSideLogoutBtn');
        console.log('Attempting to get mobileSideLogoutBtn:', mobileSideLogoutBtn); // Add this
        const mobileSideMyListingsBtn = document.getElementById('mobileSideMyListingsBtn');
        const mobileSideMyFavoritesBtn = document.getElementById('mobileSideMyFavoritesBtn');
        const mobileSideAdminPanelBtn = document.getElementById('mobileSideAdminPanelBtn');

        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userRole = localStorage.getItem('userRole'); // 'admin' or 'user'

        console.log('updateHeaderButtons called. isLoggedIn:', isLoggedIn, 'userRole:', userRole);
        console.log('mobileSideLoginBtn element found (inside updateHeaderButtons):', !!mobileSideLoginBtn);
        console.log('mobileSideLoginBtn visibility before toggle:', mobileSideLoginBtn ? !mobileSideLoginBtn.classList.contains('hidden') : 'element not found');

        // Desktop menu
        if (headerLoginBtn) headerLoginBtn.classList.toggle('hidden', isLoggedIn);
        if (headerLogoutBtn) headerLogoutBtn.classList.toggle('hidden', !isLoggedIn);
        
        // My Listings, My Favorites are visible for any logged-in user
        // Note: myListingsBtn was commented out in your HTML, uncomment it if needed.
        if (myListingsBtn) myListingsBtn.classList.toggle('hidden', !(isLoggedIn && userRole === 'user')); 
        if (myFavoritesBtn) myFavoritesBtn.classList.toggle('hidden', !(isLoggedIn && userRole === 'user'));

        // Admin Panel only for admin users
        if (adminPanelBtn) {
            adminPanelBtn.classList.toggle('hidden', !(isLoggedIn && userRole === 'admin'));
            adminPanelBtn.addEventListener('click', () => {
                if (window.location.pathname.endsWith('index.html')) {
                    // Already on main page, just open modal
                    document.getElementById('adminPanelModal').classList.remove('hidden');
                    if (typeof window.renderAdminRoomList === 'function') window.renderAdminRoomList();
                } else {
                    // Go to main.html and trigger modal open via query param
                    window.location.href = 'index.html?admin=1';
                }
            });
        }

        // mobileSideListRoomBtn: Assuming this is always visible in the mobile side menu
        // if (mobileSideListRoomBtn) mobileSideListRoomBtn.classList.remove('hidden'); // Ensure it's shown if it ever gets hidden

        // Mobile side menu
        if (mobileSideLoginBtn){
            mobileSideLoginBtn.classList.toggle('hidden', isLoggedIn);
            console.log('mobile login btn show hidden:', mobileSideLoginBtn.classList.contains('hidden'));
        }

        if (mobileSideLogoutBtn) {
            mobileSideLogoutBtn.classList.toggle('hidden', !isLoggedIn);
            console.log('Mobile Logout Button now hidden:', mobileSideLogoutBtn.classList.contains('hidden'));
        }

        if (mobileSideMyListingsBtn) {
            mobileSideMyListingsBtn.classList.toggle('hidden', !(isLoggedIn && userRole === 'user'));
            console.log('Mobile My Listings Button now hidden:', mobileSideMyListingsBtn.classList.contains('hidden'));
        }

        if (mobileSideMyFavoritesBtn) {
            mobileSideMyFavoritesBtn.classList.toggle('hidden', !(isLoggedIn && userRole === 'user'));
            console.log('Mobile My Favorites Button now hidden:', mobileSideMyFavoritesBtn.classList.contains('hidden'));
        }

        // if (mobileSideAdminPanelBtn) {
        //     mobileSideAdminPanelBtn.classList.toggle('hidden', !(isLoggedIn && userRole === 'admin'));
        //     console.log('Mobile Admin Panel Button now hidden:', mobileSideAdminPanelBtn.classList.contains('hidden'));
        // }
    
        if (mobileSideAdminPanelBtn) {
            mobileSideAdminPanelBtn.classList.toggle('hidden', !(isLoggedIn && userRole === 'admin'));
            mobileSideAdminPanelBtn.addEventListener('click', () => {
                if (window.location.pathname.endsWith('index.html')) {
                    document.getElementById('adminPanelModal').classList.remove('hidden');
                    if (typeof window.renderAdminRoomList === 'function') window.renderAdminRoomList();
                } else {
                    window.location.href = 'index.html?admin=1';
                }
            });
        }

        // Attach logout listeners here too if they are part of update
        if (headerLogoutBtn) {
            headerLogoutBtn.removeEventListener('click', handleLogout);
            headerLogoutBtn.addEventListener('click', handleLogout);
        }
        if (mobileSideLogoutBtn) {
            mobileSideLogoutBtn.removeEventListener('click', handleLogout);
            mobileSideLogoutBtn.addEventListener('click', handleLogout);
        }
    }

    // Initial update after a slight delay to ensure DOM readiness
    setTimeout(() => {
        updateHeaderButtons();
    }, 300); // 50ms delay
});
