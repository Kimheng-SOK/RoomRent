// --- Search and Sort for Featured Rooms ---

function filterAndSortRooms() {
    // Get search and sort values
    const searchInput = document.getElementById('searchBar');
    const sortSelect = document.getElementById('sortOptions');
    const featuredRoomsContainer = document.getElementById('featuredRooms');
    if (!featuredRoomsContainer) return;

    let userRooms = [];
    try {
        userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
    } catch (e) {
        userRooms = [];
    }
    // Combine with default rooms if needed
    let allRooms = [...userRooms, ...DEFAULT_ROOMS_DATA];

    // --- Filter ---
    const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let filteredRooms = allRooms.filter(room => {
        const title = room.title?.toLowerCase() || '';
        const location = room.location?.toLowerCase() || '';
        const amenities = (room.amenities || []).join(',').toLowerCase();
        return (
            title.includes(searchValue) ||
            location.includes(searchValue) ||
            amenities.includes(searchValue)
        );
    });

    // --- Sort ---
    if (sortSelect) {
        switch (sortSelect.value) {
            case 'price-asc':
                filteredRooms.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredRooms.sort((a, b) => b.price - a.price);
                break;
            case 'title-asc':
                filteredRooms.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                filteredRooms.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                // No sorting
                break;
        }
    }

    // Render filtered and sorted rooms
    if (typeof renderRoomListings === 'function') {
        renderRoomListings(filteredRooms, featuredRoomsContainer);
    }
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchBar');
    const sortSelect = document.getElementById('sortOptions');
    if (searchInput) {
        searchInput.addEventListener('input', filterAndSortRooms);
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', filterAndSortRooms);
    }
});