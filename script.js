// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Super Comics is ready!");

    // Simple smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Check if we are on the viewer page
    if (window.location.pathname.includes('viewer.html')) {
        setupViewer();
    }
});

function setupViewer() {
    const params = new URLSearchParams(window.location.search);
    const comicId = params.get('comic');

    // Mock data - in a real app this would fetch from a JSON file or API
    const comics = {
        'royalspace': {
            title: "Royal Space",
            pages: [
                'comics/royal-space/page1.png', // Title
                'comics/royal-space/page2.jpg', // Invasion
                'comics/royal-space/page3.jpg', // Archers
                'comics/royal-space/page4.jpg', // Weapon Breathing
                'comics/royal-space/page5.PNG', // Three Swords
                'comics/royal-space/page6.PNG'  // End
            ]
        }
    };

    const comicData = comics[comicId];
    if (!comicData) {
        document.getElementById('comic-viewer').innerHTML = '<h3>Comic not found!</h3><a href="index.html" class="btn btn-primary">Go Back</a>';
        return;
    }

    // Set title
    document.getElementById('comic-title').textContent = comicData.title;

    let currentPage = 0;
    const imgElement = document.getElementById('comic-page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInd = document.getElementById('page-indicator');

    function updatePage() {
        imgElement.src = comicData.pages[currentPage];
        pageInd.textContent = `Page ${currentPage + 1} of ${comicData.pages.length}`;

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === comicData.pages.length - 1;

        if (prevBtn.disabled) prevBtn.style.opacity = '0.5';
        else prevBtn.style.opacity = '1';

        if (nextBtn.disabled) nextBtn.style.opacity = '0.5';
        else nextBtn.style.opacity = '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updatePage();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < comicData.pages.length - 1) {
            currentPage++;
            updatePage();
        }
    });

    updatePage();
}
