document.addEventListener("DOMContentLoaded", function () {

    /* =======================
       COUNTDOWN
    ======================== */
    const daysEl = document.getElementById("days");
    if (daysEl) {
        const endDate = Date.now() + (4 * 24 * 60 * 60 * 1000);

        function updateCountdown() {
            const now = Date.now();
            const diff = endDate - now;

            if (diff <= 0) return;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            document.getElementById("days").innerText = String(days).padStart(2, "0");
            document.getElementById("hours").innerText = String(hours).padStart(2, "0");
            document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
            document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    /* =======================
       SEARCH
    ======================== */
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = document.getElementById('searchInput').value.trim();
            if (!query) alert("Please enter a keyword");
        });
    }

    /* =======================
       NEWSLETTER
    ======================== */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('message').innerText = "Subscribed successfully!";
        });
    }

    /* =======================
       PRICE RANGE SLIDER ✅
    ======================== */
    const slider = document.getElementById('priceSlider');
    const minInput = document.getElementById('minInput');
    const maxInput = document.getElementById('maxInput');
    const applyBtn = document.getElementById('applyBtn');

    if (slider && minInput && maxInput && applyBtn) {

        minInput.value = 0;
        maxInput.value = slider.value;

        slider.addEventListener('input', () => {
            maxInput.value = slider.value;
        });

        applyBtn.addEventListener('click', () => {
            const min = Number(minInput.value) || 0;
            const max = Number(maxInput.value) || slider.max;

            if (min > max) {
                alert("Min price cannot be greater than Max price");
                return;
            }

            filterProducts(min, max);
        });
    }
});

/* =======================
   FILTER PRODUCTS
======================== */
function filterProducts(min, max) {
    document.querySelectorAll('.product-card').forEach(card => {
        const price = parseFloat(
            card.querySelector('h5').innerText.replace(/[^0-9.]/g, '')
        );
        card.style.display = price >= min && price <= max ? "block" : "none";
    });
}

// rating 
const checkboxes = document.querySelectorAll('.rating-filter');
const products = document.querySelectorAll('.product');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    // Get values of all checked boxes
    const checkedValues = Array.from(checkboxes)
      .filter(i => i.checked)
      .map(i => i.value);

    products.forEach(product => {
      const productRating = product.getAttribute('data-rating');
      
      // If nothing is checked, show all. Otherwise, check for a match.
      if (checkedValues.length === 0 || checkedValues.includes(productRating)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  });
});


    const stars = document.querySelectorAll('#starInput i');
    let selectedRating = 0;

    // Handle Star Selection
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            stars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.classList.replace('far', 'fas'); // Fill star
                } else {
                    s.classList.replace('fas', 'far'); // Empty star
                }
            });
        });
    });

    // Handle Form Submission
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewerName').value;
        const text = document.getElementById('reviewText').value;
        
        if(selectedRating === 0) {
            alert("Please select a star rating!");
            return;
        }

        // Create new review HTML
        const newReview = `
            <div class="review-item">
                <div class="user-info">
                    <div class="user-avatar">${name.charAt(0).toUpperCase()}</div>
                    <div><strong>${name}</strong><p class="review-date">Just now</p></div>
                </div>
                <div class="review-content">
                    <p>${text}</p>
                </div>
            </div>
        `;

        // Add to the list and reset form
        document.getElementById('reviewsList').insertAdjacentHTML('afterbegin', newReview);
        this.reset();
        selectedRating = 0;
        stars.forEach(s => s.classList.replace('fas', 'far'));
        alert("Thank you for your review!");
    });
