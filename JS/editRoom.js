// --- Toast Notification Functions ---
let toastTimeout;
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    const toastMessage = document.getElementById('toastMessage');
    clearTimeout(toastTimeout);

    // Set styling based on type
    if (type === 'success') {
        toastMessage.className = 'flex items-center p-4 rounded-lg shadow-lg text-white font-semibold bg-green-500';
    } else if (type === 'error') {
        toastMessage.className = 'flex items-center p-4 rounded-lg shadow-lg text-white font-semibold bg-red-500';
    } else {
        toastMessage.className = 'flex items-center p-4 rounded-lg shadow-lg text-white font-semibold bg-blue-500';
    }

    toastMessage.textContent = message;
    toastContainer.classList.remove('toast-hide', 'opacity-0', 'translate-x-full');
    toastContainer.classList.add('toast-show');

    toastTimeout = setTimeout(() => {
        toastContainer.classList.remove('toast-show');
        toastContainer.classList.add('toast-hide', 'opacity-0', 'translate-x-full');
    }, 3000);
}

// --- Detect Edit Mode ---
function getEditRoomId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('edit');
}

// --- Populate form if editing ---
function populateEditForm(room) {
    document.getElementById('roomTitle').value = room.title || '';
    document.getElementById('roomLocation').value = room.location || '';
    document.getElementById('roomPrice').value = room.price || '';
    document.getElementById('roomDescription').value = room.description || '';
    document.getElementById('roomImage').value = room.image || '';
    if (document.getElementById('roomAmenities')) {
        document.getElementById('roomAmenities').value = Array.isArray(room.amenities) ? room.amenities.join(', ') : '';
    }
    document.getElementById('contactPhone').value = room.contactPhone || '';
    document.getElementById('contactEmail').value = room.contactEmail || '';
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addEditRoomForm');
    const submitBtn = document.getElementById('submitRoomBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const submitBtnSpinner = document.getElementById('submitBtnSpinner');

    const editRoomId = getEditRoomId();
    let isEditMode = false;

    if (editRoomId) {
        let userRooms = [];
        try {
            userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
        } catch (e) {
            userRooms = [];
        }
        const room = userRooms.find(r => r.id === editRoomId);
        if (room) {
            isEditMode = true;
            populateEditForm(room);
            if (submitBtnText) submitBtnText.textContent = 'Update Room';
        }
    }

    // --- Form Submission Handling ---
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Show spinner
            submitBtn.disabled = true;
            submitBtnSpinner.classList.remove('hidden');
            submitBtnText.textContent = isEditMode ? 'Updating...' : 'Adding...';

            // Gather form data
            const title = document.getElementById('roomTitle').value;
            const location = document.getElementById('roomLocation').value;
            const price = document.getElementById('roomPrice').value;
            const description = document.getElementById('roomDescription').value;
            const image = document.getElementById('roomImage').value;
            const amenitiesStr = document.getElementById('roomAmenities')?.value || '';
            const amenities = amenitiesStr.split(',').map(a => a.trim()).filter(a => a);
            const contactPhone = document.getElementById('contactPhone').value;
            const contactEmail = document.getElementById('contactEmail').value;

            let userRooms = [];
            try {
                userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
            } catch (e) {
                userRooms = [];
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request

                if (isEditMode && editRoomId) {
                    // Update existing room
                    const idx = userRooms.findIndex(r => r.id === editRoomId);
                    if (idx !== -1) {
                        userRooms[idx] = {
                            ...userRooms[idx],
                            title,
                            location,
                            price,
                            description,
                            image,
                            amenities,
                            contactPhone,
                            contactEmail
                        };
                        localStorage.setItem('userRooms', JSON.stringify(userRooms));
                        showToast('Room updated successfully!', 'success');
                    }
                } else {
                    // Add new room
                    const newRoom = {
                        id: crypto.randomUUID(),
                        title,
                        location,
                        price,
                        description,
                        image,
                        amenities,
                        contactPhone,
                        contactEmail
                    };
                    userRooms.push(newRoom);
                    localStorage.setItem('userRooms', JSON.stringify(userRooms));
                    showToast('Room added successfully!', 'success');
                }

                if (!isEditMode) form.reset();
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);

            } catch (error) {
                console.error('Submission error:', error);
                showToast('Failed to submit room data. Please try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtnText.textContent = isEditMode ? 'Update Room' : 'Add Room';
                submitBtnSpinner.classList.add('hidden');
            }
        });
    }
});