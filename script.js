const displayData = document.querySelector('.displayData');
const searchInput = document.getElementById('search');

const url = 'https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript';

let allVideos = []; // Store all videos globally

async function fetchData() {
    try {
        const response = await fetch(url);
        const rdata = await response.json();
        allVideos = rdata.data.data;
        displayVideos(allVideos);
    } catch (error) {
        console.error("Error fetching data:", error);
        displayData.innerText = "Failed to load data.";
    }
}

function displayVideos(videos) {
    displayData.innerHTML = ''; // Clear existing content
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');

        const videoLink = document.createElement('a');
        videoLink.href = `https://www.youtube.com/watch?v=${video.items.id}`;
        videoLink.target = "_blank";
        videoLink.textContent = "Watch on YouTube";

        videoCard.innerHTML = `
            <img src="${video.items.snippet.thumbnails.medium.url}" alt="${video.items.snippet.title}">
            <h3>${video.items.snippet.title}</h3>
        `;

        videoCard.appendChild(videoLink);
        displayData.appendChild(videoCard);
    });
}

// Filter videos based on search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredVideos = allVideos.filter(video =>
        video.items.snippet.title.toLowerCase().includes(query)
    );
    displayVideos(filteredVideos);
});

fetchData();
