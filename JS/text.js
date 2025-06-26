import {DEFAULT_ROOMS_DATA} from "../JS/data.js";

// Local cache for rooms (all data will be stored here)
let rooms = [];
// let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
// let myFavorites = JSON.parse(localStorage.getItem('myFavorites')) || []; // Load favorites from localStorage

// // default 
// --- Dummy Data and Global State (for demonstration) ---
let isLoggedIn = true; // Simulate user login status
let myFavorites = ['room-002']; // Simulate favorited room IDs


// Function to seed initial data into the local 'rooms' array
function seedInitialData() {
    // Assign unique IDs to default rooms
    rooms = DEFAULT_ROOMS_DATA.map(room => ({ ...room, id: crypto.randomUUID() }));
    console.log("Initial data seeded locally:", rooms);
    // Render the initial listings on the home page (if this is index.html)
    if (document.getElementById('featuredRooms')) {
        renderRoomListings(rooms, document.getElementById('featuredRooms'), document.getElementById('availableListings'));
    }
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
    modalStatus.classList.remove('text-green-600', 'bg-green-100', 'text-red-600', 'bg-red-100'); // Reset classes
    if (room.isAvailable) {
        modalStatus.classList.add('text-green-600', 'bg-green-100');
    } else {
        modalStatus.classList.add('text-red-600', 'bg-red-100');
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

    // FIXED: Populate contact info by directly accessing room.contactPhone and room.contactEmail
    modalContactPhone.textContent = room.contactPhone || 'N/A';
    modalContactEmail.textContent = room.contactEmail || 'N/A';

    // change styles
    modalPrice.style.fontSize = '1.5rem';
    modalLocation.style.fontSize = '1.2rem';
    modalDescription.style.fontSize = '1.2rem';
    modalAmenities.style.fontSize = '1.2rem';
    modalContactPhone.style.fontSize = '1.2rem';
    modalContactEmail.style.fontSize = '1.2rem';

    contactInfoDisplay.classList.add('hidden'); // Ensure contact info is hidden by default when modal opens
    modalContactBtn.textContent = 'Show Contact Info'; // Reset button text

    roomDetailsModalOverlay.classList.add('open');
}

function closeRoomDetailsModal() {
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
    alert('Opening form to add a new room! (This is a placeholder)');
    // Implement your modal or page redirection for adding a new room here.
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



/**
 * Renders the room listings and an "Add New Room" card.
 * @param {Array<Object>} roomList - The list of room objects to render.
 * @param {HTMLElement} containerElement - The DOM element to append the cards to.
 */
function renderRoomListings(roomList, containerElement, listingContainer) {
    if (!containerElement) return;

    containerElement.innerHTML = ''; // Clear previous listings

    // --- Add New Room Card ---
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
    containerElement.appendChild(addNewCard);

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


    // // --- Render existing room listings ---
    // roomList.forEach(room => {
    //     const isFavorited = isLoggedIn && myFavorites.includes(room.id);
       
    //     // Updated heart SVG for better fill/stroke control based on favorite status
    //     const favoriteIconHtml = `
    //         <svg class="w-6 h-6 ${isFavorited ? 'text-red-500' : 'text-slate-400'}" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M12 21.35l-1.84-1.66C4.04 14.16 2 12.28 2 9.5 2 7.02 4.02 5 6.5 5c1.74 0 3.41.81 4.5 2.09C12.09 5.81 13.76 5 15.5 5 17.98 5 20 7.02 20 9.5c0 2.78-2.04 4.66-8.16 10.19L12 21.35z"/>
    //         </svg>
    //     `;

    //     // Determine availability text and styling
    //     const availabilityText = room.isAvailable ? 'Available' : 'Not Available';
    //     const availabilityColorClass = room.isAvailable ? 'text-green-600' : 'text-red-600';
    //     const availabilityColorBg = room.isAvailable ? 'bg-green-100' : 'bg-red-100';


    //     const roomCard = document.createElement('div');
    //     roomCard.className = 'card-container bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl';
    //     roomCard.innerHTML = `
    //         <div class="relative"> <img src="${room.image}" alt="${room.title}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/e2e8f0/64748b?text=Image+Not+Found';">
    //             <div class="absolute bottom-0 left-0 m-2 px-3 py-1 border-solid ${availabilityColorBg} rounded-full text-white text-xs font-bold ${availabilityColorClass} ">
    //                 ${availabilityText}
    //             </div>
    //         </div>
    //         <div class="p-4 card-content-area"> <!-- Uses card-content-area for flex behavior -->
    //             <h3 class="text-2xl font-semibold text-slate-800 mb-2">${room.title}</h3>
    //             <p class="text-xl text-indigo-600 font-bold mb-2">$${room.price}/month</p>
    //             <div class="flex items-center text-slate-600 text-sm mb-4">
    //                 <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    //                 <span">${room.location}</span>
    //             </div>       
    //             <div class="mt-auto flex justify-between items-center"> <!-- mt-auto ensures this is at the bottom -->
    //                 <button data-id="${room.id}" class="view-details-btn bg-indigo-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors duration-200">View Details</button>
    //                 ${isLoggedIn ? `<button data-id="${room.id}" class="favorite-toggle-btn text-pink-500 hover:text-pink-700 transition-colors duration-200 p-2 rounded-full">
    //                     ${favoriteIconHtml}
    //                 </button>` : ''}
    //             </div>
    //         </div>
    //     `;
    //     containerElement.appendChild(roomCard);



    //     // Attach event listener for View Details button
    //     const viewDetailsBtn = roomCard.querySelector('.view-details-btn');
    //     if (viewDetailsBtn) {
    //         viewDetailsBtn.addEventListener('click', (event) => {
    //             const roomId = event.currentTarget.dataset.id;
    //             const selectedRoom = roomList.find(r => r.id === roomId);
    //             if (selectedRoom) {
    //                 openRoomDetailsModal(selectedRoom);
    //             } else {
    //                 console.error('Room not found for details:', roomId);
    //             }
    //         });
    //     }

    //     // Attach event listener for Favorite button (if logged in)
    //     const favoriteToggleBtn = roomCard.querySelector('.favorite-toggle-btn');
    //     if (favoriteToggleBtn) {
    //         favoriteToggleBtn.addEventListener('click', (event) => {
    //             const roomId = event.currentTarget.dataset.id;
    //             const icon = event.currentTarget.querySelector('svg');

    //             if (myFavorites.includes(roomId)) {
    //                 myFavorites = myFavorites.filter(id => id !== roomId);
    //                 icon.classList.remove('text-red-500');
    //                 icon.classList.add('text-slate-400');
    //                 icon.setAttribute('fill', 'currentColor'); // Ensure it becomes transparent (stroke)
    //             } else {
    //                 myFavorites.push(roomId);
    //                 icon.classList.remove('text-slate-400');
    //                 icon.classList.add('text-red-500');
    //                 icon.setAttribute('fill', 'currentColor'); // Ensure it becomes solid
    //             }
    //             console.log('My favorites:', myFavorites);
    //             // In a real app, you'd save `myFavorites` to localStorage or a database here.
    //         });
    //     }
    // });

    // --- Render existing room listings ---
    roomList.forEach(room => {
        const isFavorited = isLoggedIn && myFavorites.includes(room.id);
        const homepageCard = createRoomCard(room, isFavorited, isLoggedIn);
        containerElement.appendChild(homepageCard);

        if(room.isAvailable){
            const listingCard = createRoomCard(room, isFavorited, isLoggedIn);
            listingContainer.appendChild(listingCard);
        }

        const viewDetailsBtn = homepageCard.querySelector('.view-details-btn');
        if(viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (event) => {
                const icon = event.currentTarget.querySelector('svg');
                if (myFavorites.includes(room.id)) {
                    myFavorites = myFavorites.filter(id => id !== room.id);
                    icon.classList.remove('text-red-500');
                    icon.classList.add('text-slate-400');
                } else{
                    myFavorites.push(room.id);
                    icon.classList.remove('text-state-400')
                    icon.classList.add('text-red-500');
                }
                console.log("My favorite: ", myFavorites)
            });
        }
    });
}

// --- Initialize the room listings when the DOM is ready ---
document.addEventListener('DOMContentLoaded', () => {
    seedInitialData(); // Seed initial data if not already done
    const roomListingsContainer = document.getElementById('featuredRooms'); // Assuming this is the ID of the container for featured rooms
    const listingPageContainer = DocumentFragment.getElementById('availableListings')
    renderRoomListings(rooms, roomListingsContainer, listingPageContainer);
});
