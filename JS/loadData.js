// import {DEFAULT_ROOMS_DATA} from "../JS/data.js";
// make it into globally available
window.DEFAULT_ROOMS_DATA = window.DEFAULT_ROOMS_DATA || [];

// Local cache for rooms (all data will be stored here)
let rooms = [];

// // default
// --- Dummy Data and Global State (for demonstration) ---
let myFavorites = []; // Simulate favorited room IDs
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Simulate user login status


function seedDefaultRooms() {
    // Only seed if userRooms is empty
    let userRooms = [];
    try {
        userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
    } catch (e) {
        userRooms = [];
    }
    if (userRooms.length === 0) {
        // Copy the default data to localStorage
        localStorage.setItem('userRooms', JSON.stringify(window.DEFAULT_ROOMS_DATA));
        console.log('Seeded default rooms to localStorage.');
    }
}

// new function seedInitialData() {
function seedInitialData() {
    const allRooms = getAllRooms(); // Fetch all rooms from localStorage or initial data
    console.log("Initial data (sample + user):", allRooms);
}

function getAllRooms() {
    let userRooms = [];
    try {
        userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
    } catch (e) {
        userRooms = [];
    }
    // Merge sample data and user data, avoiding duplicates by id
    const sampleRooms = window.DEFAULT_ROOMS_DATA || [];
    // If a user room has the same id as a sample room, prefer the user room
    const allRooms = [
        ...sampleRooms.filter(
            sample => !userRooms.some(user => user.id === sample.id)
        ),
        ...userRooms
    ];
    return allRooms;
}

// --- Modal Elements ---
const roomDetailsModalOverlay = document.getElementById('roomDetailsModalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalPrice = document.getElementById('modalPrice');
const modalStatus = document.querySelector('.modalStatus'); // New status element
const modalLocation = document.getElementById('modalLocation');
const modalAmenities = document.getElementById('modalAmenities'); // New amenity list
const modalDescription = document.getElementById('modalDescription');
const contactInfoDisplay = document.getElementById('contactInfoDisplay'); // New contact info div
const modalContactPhone = document.getElementById('modalContactPhone'); // New phone span
const modalContactEmail = document.getElementById('modalContactEmail'); // New email span
const modalContactBtn = document.getElementById('modalContactBtn'); // New toggle button

/**
 * Opens the room details modal with information about the selected room.
 * @param {Object} room - The room object to display details for.
 */
function openRoomDetailsModal(room) {
    if (!roomDetailsModalOverlay) {
        console.error("Modal elements not initialized. DOM might not be ready or IDs are incorrect.");
        return;
    }

    modalTitle.textContent = room.title;
    modalImage.src = room.image;
    modalImage.onerror = () => {
        modalImage.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Image+Not+Found'; // Fallback image
    };
    modalImage.alt = room.title;
    modalPrice.textContent = `$${room.price}/month`;

    modalStatus.textContent = room.isAvailable ? 'Available' : 'Not Available'; // Use textContent for fallback
    modalStatus.classList.remove('text-green-800','bg-green-100', 'text-red-800' ,'bg-red-100'); // Reset classes
    if (room.isAvailable) {
        modalStatus.classList.add('bg-green-100', 'tex-green-800');
    } else {
        modalStatus.classList.add('bg-red-100', 'text-red-800');
    }


    modalLocation.textContent = room.location;
    modalDescription.textContent = room.description || 'No description available.'; // Use fallback

    // Clear previous amenities and populate new ones
    modalAmenities.innerHTML = '';
    if (room.amenities && room.amenities.length > 0) {
        room.amenities.forEach(amenity => {
            const li = document.createElement('li');
            li.textContent = amenity;
            modalAmenities.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No amenities listed.';
        modalAmenities.appendChild(li);
    }

    // Populate contact info by directly accessing room.contactPhone and room.contactEmail
    modalContactPhone.textContent = room.contactPhone || 'N/A';
    modalContactEmail.textContent = room.contactEmail || 'N/A';

    contactInfoDisplay.classList.add('hidden'); // Ensure contact info is hidden by default when modal opens
    modalContactBtn.textContent = 'Show Contact Info'; // Reset button text

    roomDetailsModalOverlay.style.display = 'flex'
    roomDetailsModalOverlay.classList.add('open');
}

function closeRoomDetailsModal() {
    roomDetailsModalOverlay.style.display = 'none'
    roomDetailsModalOverlay.classList.remove('open');

}

// Close modal when clicking the close button
document.querySelector('.closeDetailBtn').addEventListener('click', closeRoomDetailsModal);

// Close modal when clicking outside content
roomDetailsModalOverlay.addEventListener('click', (event) => {
    if (event.target === roomDetailsModalOverlay) {
        closeRoomDetailsModal();
    }
});

// Toggle contact info visibility
modalContactBtn.addEventListener('click', () => {
    contactInfoDisplay.classList.toggle('hidden');
    if (contactInfoDisplay.classList.contains('hidden')) {
        modalContactBtn.textContent = 'Show Contact Info';
    } else {
        modalContactBtn.textContent = 'Hide Contact Info';
    }
});

function openAddNewRoomModal() {
    // alert('Opening form to add a new room! (This is a placeholder)');
    // Implement your modal or page redirection for adding a new room here.
    if(isLoggedIn){
        window.location.href = 'addNewRoom.html';
    }else{
        window.location.href = 'loginPage.html';
        console.log('you need to login first!!');
    }
}

// createRoomCard is a utility function to create a room card element
function createRoomCard(room, isFavorited, showFavoriteBtn = false) {
    const availabilityText = room.isAvailable ? 'Available' : 'Not Available';
    const availabilityColorClass = room.isAvailable ? 'text-green-600' : 'text-red-600';
    const availabilityColorBg = room.isAvailable ? 'bg-green-100' : 'bg-red-100';

    const favoriteIconHtml = `
        <svg class="w-6 h-6 ${isFavorited ? 'text-red-500' : 'text-slate-400'}" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.84-1.66C4.04 14.16 2 12.28 2 9.5 2 7.02 4.02 5 6.5 5c1.74 0 3.41.81 4.5 2.09C12.09 5.81 13.76 5 15.5 5 17.98 5 20 7.02 20 9.5c0 2.78-2.04 4.66-8.16 10.19L12 21.35z"/>
        </svg>
    `;

    const card = document.createElement('div');
    card.className = 'card-container bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl';
    card.innerHTML = `
        <div class="relative">
            <img src="${room.image}" alt="${room.title}" class="w-full h-48 object-cover"
                 onerror="this.onerror=null;this.src='https://placehold.co/600x400/e2e8f0/64748b?text=Image+Not+Found';">
            <div class="absolute bottom-0 left-0 m-2 px-3 py-1 ${availabilityColorBg} rounded-full text-xs font-bold ${availabilityColorClass}">
                ${availabilityText}
            </div>
        </div>
        <div class="p-4 card-content-area">
            <h3 class="text-2xl font-semibold text-slate-800 mb-2">${room.title}</h3>
            <p class="text-xl text-indigo-600 font-bold mb-2">$${room.price}/month</p>
            <div class="flex items-center text-slate-600 text-sm mb-4">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>${room.location}</span>
            </div>
            <div class="mt-auto flex justify-between items-center">
                <button data-id="${room.id}" class="view-details-btn bg-indigo-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-indigo-600">View Details</button>
                ${showFavoriteBtn ? `<button data-id="${room.id}" class="favorite-toggle-btn text-pink-500 hover:text-pink-700 p-2 rounded-full">${favoriteIconHtml}</button>` : ''}
            </div>
        </div>
    `;
    return card;
}

function getFavoritesKey () {
    const currentUser = localStorage.getItem('currentUser');
    return `myFavorites_${currentUser}`;
}

/**
 * Renders the room listings and an "Add New Room" card.
 * @param {Array<Object>} roomList - The list of room objects to render.
 * @param {HTMLElement} primaryContainer - The main DOM element to append the cards to.
 * @param {HTMLElement} secondaryContainer - An optional secondary DOM element for listings (e.g., availableListings on homepage).
 */
function renderRoomListings(roomList, primaryContainer, secondaryContainer = null) {
    if (!primaryContainer) return;

    primaryContainer.innerHTML = ''; // Clear primary container
    if (secondaryContainer) {
        secondaryContainer.innerHTML = ''; // Clear secondary container if it exists
    }

    // --- Add New Room Card (conditionally added only for the homepage featuredRooms) ---
    if (primaryContainer.id === 'featuredRooms') { // Check if the primary container is for featured rooms
        const addNewCard = document.createElement('div');
        addNewCard.className = 'card-container bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 cursor-pointer';
        addNewCard.innerHTML = `
            <div class="card-content-area flex flex-col items-center justify-center h-full">
                <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v6m0-3h6m-3-3l3 3m-3-3V9a9 9 0 110 18z"></path>
                </svg>
                <h3 class="text-xl font-semibold text-gray-700 mb-4">List Your Room</h3>
                <button class="add-new-room-btn bg-indigo-500 text-white py-3 px-6 rounded-lg text-base font-medium hover:bg-indigo-600 transition-colors duration-200 mt-auto">
                    Add New Room
                </button>
            </div>
        `;
        primaryContainer.appendChild(addNewCard);

        // Attach event listener for Add New Room button
        const addNewRoomBtn = addNewCard.querySelector('.add-new-room-btn');
        if (addNewRoomBtn) {
            addNewRoomBtn.addEventListener('click', openAddNewRoomModal);
        }
        // Optional: make the whole card clickable for add new room
        addNewCard.addEventListener('click', (event) => {
            if (!event.target.closest('button')) { // Prevent double-trigger if button clicked
                openAddNewRoomModal();
            }
        });
    }

    // Always get the latest favorites from localStorage
    let myFavorites = [];
    try {
        myFavorites = JSON.parse(localStorage.getItem(getFavoritesKey()) || '[]');
    } catch (e) {
        myFavorites = [];
    }


    // --- Render existing room listings ---
    roomList.forEach(room => {
        const isFavorited = isLoggedIn && myFavorites.includes(room.id);

        // If primaryContainer is 'featuredRooms', render a card there
        if (primaryContainer.id === 'featuredRooms') {
            const homepageCard = createRoomCard(room, isFavorited, isLoggedIn);
            primaryContainer.appendChild(homepageCard);

            // Attach event listener for View Details button on homepageCard
            const viewDetailsBtnHomepage = homepageCard.querySelector('.view-details-btn');
            if (viewDetailsBtnHomepage) {
                viewDetailsBtnHomepage.addEventListener('click', () => {
                    openRoomDetailsModal(room);
                });
            }

            // Attach event listener for Favorite button on homepageCard
            const favoriteToggleBtnHomepage = homepageCard.querySelector('.favorite-toggle-btn');
            if (favoriteToggleBtnHomepage) {
                favoriteToggleBtnHomepage.addEventListener('click', (event) => {
                    let myFavorites = [];
                    try {
                        myFavorites = JSON.parse(localStorage.getItem(getFavoritesKey()) || '[]');
                    } catch (e) {
                        myFavorites = [];
                    }

                    const roomId = event.currentTarget.dataset.id;
                    const icon = event.currentTarget.querySelector('svg');

                    if (myFavorites.includes(roomId)) {
                        myFavorites = myFavorites.filter(id => id !== roomId);
                        icon.classList.remove('text-red-500');
                        icon.classList.add('text-slate-400');
                    } else {
                        myFavorites.push(roomId);
                        icon.classList.remove('text-slate-400');
                        icon.classList.add('text-red-500');
                    }
                    localStorage.setItem(getFavoritesKey(), JSON.stringify(myFavorites)); // Save to localStorage
                    console.log('My favorites:',  myFavorites);
                    // // 🧾 Log Room ID and the card element or details
                    // console.log('Room ID:', roomId);
                    // console.log('My Favorites IDs:', myFavorites);

                    // // Optional: Log full card HTML or details
                    // console.log('Current Room Card Element:', roomCard); // full DOM element
                    // console.log('Card Inner HTML:', roomCard?.innerHTML); // or just the HTML content
                });
            }
        }


        // Render to the appropriate container for available listings
        // This handles both secondaryContainer (on homepage) and primaryContainer (on listings.html)
        if (room.isAvailable) {
            let targetContainer = null;
            if (secondaryContainer && secondaryContainer.id === 'availableListings') {
                targetContainer = secondaryContainer;
            } else if (primaryContainer.id === 'availableListings') { // This is the case for listings.html
                targetContainer = primaryContainer;
            }

            if (targetContainer) {
                const listingCard = createRoomCard(room, isFavorited, isLoggedIn);
                targetContainer.appendChild(listingCard);

                // Attach event listener for View Details button on listingCard
                const viewDetailsBtnListing = listingCard.querySelector('.view-details-btn');
                if (viewDetailsBtnListing) {
                    viewDetailsBtnListing.addEventListener('click', () => {
                        openRoomDetailsModal(room);
                    });
                }

                // Attach event listener for Favorite button on listingCard
                const favoriteToggleBtnListing = listingCard.querySelector('.favorite-toggle-btn');
                if (favoriteToggleBtnListing) {
                    favoriteToggleBtnListing.addEventListener('click', (event) => {
                        const roomId = event.currentTarget.dataset.id;
                        const icon = event.currentTarget.querySelector('svg');

                        if (myFavorites.includes(roomId)) {
                            myFavorites = myFavorites.filter(id => id !== roomId);
                            icon.classList.remove('text-red-500');
                            icon.classList.add('text-slate-400');
                        } else {
                            myFavorites.push(roomId);
                            icon.classList.remove('text-slate-400');
                            icon.classList.add('text-red-500');
                        }
                        console.log('My favorites:', myFavorites);
                    });
                }
            }
        }
    });
}
window.renderRoomListings = renderRoomListings;


function renderMyListedRooms() {
    const myRoomListings = document.getElementById('myRoomListings');
    const noMyRoomsMessage = document.getElementById('noMyRoomsMessage');
    myRoomListings.innerHTML = '';
    const currentUser = localStorage.getItem('currentUser');
    const allRooms = getAllRooms();
    const myRooms = allRooms.filter(room =>
        room.owner === currentUser || room.ownerId === currentUser
    );

    if (myRooms.length === 0) {
        if (noMyRoomsMessage) noMyRoomsMessage.classList.remove('hidden');
        return;
    } else {
        if (noMyRoomsMessage) noMyRoomsMessage.classList.add('hidden');
    }

    myRooms.forEach(room => {
        const statusText = room.isAvailable ? 'Available' : 'Not Available';
        const statusClass = room.isAvailable ? 'text-green-600' : 'text-red-600';
        const statusBtnClass = room.isAvailable
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-red-100 text-red-700 hover:bg-red-200';
        const statusIcon = room.isAvailable
            ? `<svg class="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`
            : `<svg class="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap font-semibold">${room.title}</td>
            <td class="px-6 py-4 whitespace-nowrap">${room.location}</td>
            <td class="px-6 py-4 whitespace-nowrap">$${room.price}</td>
            <td class="px-6 py-4 whitespace-nowrap ${statusClass}">${statusText}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center flex justify-center">
                <button class="status-btn ${statusBtnClass} rounded px-3 py-1 font-semibold transition-colors duration-200 mr-2 flex items-center" data-id="${room.id}" title="Toggle Status">
                    ${statusIcon}
                    ${room.isAvailable ? 'ON' : 'OFF'}
                </button>
                <button class="edit-btn text-green-600 hover:underline mr-2" data-id="${room.id}">Edit</button>
                <button class="delete-btn text-red-600 hover:underline" data-id="${room.id}">Delete</button>
            </td>
        `;
        myRoomListings.appendChild(tr);
    });

    // Status toggle
    myRoomListings.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const roomId = btn.getAttribute('data-id');
            let userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
            const idx = userRooms.findIndex(r => r.id === roomId);
            if (idx !== -1) {
                userRooms[idx].isAvailable = !userRooms[idx].isAvailable;
                localStorage.setItem('userRooms', JSON.stringify(userRooms));
                renderMyListedRooms();
            }
        });
    });

    // Edit button
    myRoomListings.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const roomId = btn.getAttribute('data-id');
            window.location.href = `editRoom.html?edit=${roomId}`;
        });
    });

    // Delete button
    myRoomListings.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const roomId = btn.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this room?')) {
                let userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
                userRooms = userRooms.filter(r => r.id !== roomId);
                localStorage.setItem('userRooms', JSON.stringify(userRooms));
                renderMyListedRooms();
            }
        });
    });
}
window.renderMyListedRooms = renderMyListedRooms;


function renderAdminRoomList() {
    const adminRoomListings = document.getElementById('adminRoomListings');
    const noAdminRoomsMessage = document.getElementById('noAdminRoomsMessage');
    if (!adminRoomListings) return;

    const allRooms = getAllRooms();
    // try {
    //     allRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
    // } catch (e) {
    //     allRooms = [];
    // }
    adminRoomListings.innerHTML = '';

    if (allRooms.length === 0) {
        if (noAdminRoomsMessage) noAdminRoomsMessage.classList.remove('hidden');
        return;
    } else {
        if (noAdminRoomsMessage) noAdminRoomsMessage.classList.add('hidden');
    }

    allRooms.forEach(room => {
        const statusText = room.isAvailable ? 'Available' : 'Not Available';
        const statusClass = room.isAvailable ? 'text-green-600' : 'text-red-600';
        const statusBtnClass = room.isAvailable
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-red-100 text-red-700 hover:bg-red-200';
        const statusIcon = room.isAvailable
            ? `<svg class="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`
            : `<svg class="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`;
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap font-semibold">${room.title}</td>
        <td class="px-6 py-4 whitespace-nowrap">${room.location}</td>
        <td class="px-6 py-4 whitespace-nowrap">$${room.price}</td>
        <td class="px-6 py-4 whitespace-nowrap ${statusClass}">${statusText}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right flex justify-center">
            <button class="status-btn ${statusBtnClass} rounded px-3 py-1 font-semibold transition-colors duration-200 mr-2 flex items-center" data-id="${room.id}" title="Toggle Status">
                ${statusIcon}
                ${room.isAvailable ? 'ON' : 'OFF'}
            </button>
            <button class="edit-btn text-green-600 hover:underline mr-2" data-id="${room.id}">Edit</button>
            <button class="delete-btn text-red-600 hover:underline" data-id="${room.id}">Delete</button>
        </td>
    `;
        adminRoomListings.appendChild(tr);
    });

    // Edit button: redirect to edit page with room id
    adminRoomListings.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const roomId = btn.getAttribute('data-id');
            // Only allow editing if the room exists in userRooms
            const room = allRooms.find(r => r.id === roomId);
            if (room) {
                window.location.href = `editRoom.html?edit=${roomId}`;
            } else {
                alert('This room cannot be edited because it is not a user-created room.');
            }
        });
    });

    // Delete button: remove from localStorage and re-render
    adminRoomListings.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const roomId = btn.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this room?')) {
                let userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
                userRooms = userRooms.filter(r => r.id !== roomId);
                localStorage.setItem('userRooms', JSON.stringify(userRooms));
                renderAdminRoomList();
            }
        });
    });

    adminRoomListings.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const roomId = btn.getAttribute('data-id');
            let userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
            const idx = userRooms.findIndex(r => r.id === roomId);
            if (idx !== -1) {
                userRooms[idx].isAvailable = !userRooms[idx].isAvailable;
                localStorage.setItem('userRooms', JSON.stringify(userRooms));
                renderAdminRoomList();
            }
        });
    });
}
window.renderAdminRoomList = renderAdminRoomList;

function renderFavoriteRoomsList() {
    const favoriteRoomListings = document.getElementById('favoriteRoomListings');
    const noFavoriteResultsMessage = document.getElementById('noFavoriteResultsMessage');
    if (!favoriteRoomListings) return;

    // Get favorite IDs from localStorage
    // let favoriteIds = myFavorites.length > 0 ? myFavorites : [];
    let favoriteIds = [];
    try {
        favoriteIds = JSON.parse(localStorage.getItem(getFavoritesKey()) || '[]');
    } catch (e) {
        favoriteIds = [];
    }

    // Use getAllRooms() to include both sample and user data
    const allRooms = typeof getAllRooms === 'function' ? getAllRooms() : (window.DEFAULT_ROOMS_DATA || []);
    // const allRooms = getAllRooms();  // // Fetch all rooms from localStorage or initial data
    const favoriteRooms = allRooms.filter(room => favoriteIds.includes(room.id));

    favoriteRoomListings.innerHTML = '';

    if (favoriteRooms.length === 0) {
        if (noFavoriteResultsMessage) noFavoriteResultsMessage.classList.remove('hidden');
        return;
    } else {
        if (noFavoriteResultsMessage) noFavoriteResultsMessage.classList.add('hidden');
    }

    favoriteRooms.forEach(room => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-2 sm:px-6 py-4 font-semibold">${room.title}</td>
            <td class="px-2 sm:px-6 py-4">${room.location}</td>
            <td class="px-2 sm:px-6 py-4">$${room.price}</td>
            <td class="px-2 sm:px-6 py-4 text-right">
                <button class="view-btn text-indigo-600 hover:underline mr-2" data-id="${room.id}">View</button>
                <button class="remove-fav-btn text-red-600 hover:underline" data-id="${room.id}">Remove</button>
            </td>
        `;
        favoriteRoomListings.appendChild(tr);
    });

    // Add event listeners for actions
    favoriteRoomListings.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const roomId = btn.getAttribute('data-id');
            const room = favoriteRooms.find(r => r.id === roomId);
            if (room && typeof openRoomDetailsModal === 'function') openRoomDetailsModal(room);
        });
    });

    favoriteRoomListings.querySelectorAll('.remove-fav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const roomId = btn.getAttribute('data-id');
            let favoriteIds = JSON.parse(localStorage.getItem('myFavorites') || '[]');
            favoriteIds = favoriteIds.filter(id => id !== roomId);
            localStorage.setItem(getFavoritesKey(), JSON.stringify(favoriteIds));
            renderFavoriteRoomsList();
        });
    });
}
window.renderFavoriteRoomsList = renderFavoriteRoomsList;

// --- Initialize the room listings when the DOM is ready ---
document.addEventListener('DOMContentLoaded', () => {
    seedDefaultRooms(); // Seed default rooms if not already done
    seedInitialData(); // Seed initial data if not already done

    const featuredRoomsContainer = document.getElementById('featuredRooms');
    const availableListingsContainer = document.getElementById('availableListings');
    const allRooms = getAllRooms(); // Fetch all rooms from localStorage or initial data

    // console.log('Sample data:', window.DEFAULT_ROOMS_DATA);
    // console.log('All rooms:', getAllRooms());

    // Determine which container is present on the current page and call renderRoomListings accordingly
    if (featuredRoomsContainer) {
        // This is likely index.html, render to featuredRooms and optionally availableListings
        renderRoomListings(allRooms, featuredRoomsContainer, availableListingsContainer);
    } else if (availableListingsContainer) {
        // This is likely listings.html, so availableListings is the primary container
        // and there is no secondary container for additional listings.
        renderRoomListings(allRooms, availableListingsContainer, null);
    }


    // mylisting modal 
    const myRoomsBtn = document.getElementById('myRoomsBtn');
    const myRoomsModal = document.getElementById('myRoomsModal');
    const closeMyRoomsModalBtn = document.getElementById('closeMyRoomsModalBtn');

    if (myRoomsBtn && myRoomsModal) {
        myRoomsBtn.addEventListener('click', () => {
            myRoomsModal.classList.remove('hidden');
            renderMyListedRooms();
            // Animate modal in
            setTimeout(() => {
                document.getElementById('myRoomsModalContent').classList.remove('scale-95', 'opacity-0');
                document.getElementById('myRoomsModalContent').classList.add('scale-100', 'opacity-100');
            }, 10);
        });
    }

    if (closeMyRoomsModalBtn && myRoomsModal) {
        closeMyRoomsModalBtn.addEventListener('click', () => {
            document.getElementById('myRoomsModalContent').classList.add('scale-95', 'opacity-0');
            document.getElementById('myRoomsModalContent').classList.remove('scale-100', 'opacity-100');
            setTimeout(() => {
                myRoomsModal.classList.add('hidden');
            }, 300);
        });
    }
});
