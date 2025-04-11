// NavBar Start
const promotionsLink = document.getElementById("promotions-link");
const dropdownMenu = document.getElementById("dropdown-menu");
promotionsLink.addEventListener("click", function(e) {
    e.preventDefault();
    dropdownMenu.classList.toggle("hidden");
});

// Select the necessary elements
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobiledropdownmenu = document.getElementById("mobile-dropdown-menu");
const mobilepromotionlink = document.getElementById("mobile-promotions-link");
mobilepromotionlink.addEventListener("click", function(e){
    e.preventDefault();
    mobiledropdownmenu.classList.toggle("hidden");
});

// Function to toggle mobile menu visibility with sliding animation from right
mobileMenuToggle.addEventListener("click", () => {
    // Show the menu by removing the 'hidden' class
    mobileMenu.classList.remove("hidden");

    // Add transition classes for smooth sliding animation
    mobileMenu.classList.add("transition-transform", "duration-300", "ease-in-out");

    // Slide the menu in from the right by removing translate-x-full and adding translate-x-0
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
});

// Function to handle close button click (X)
mobileMenuClose.addEventListener("click", () => {
    // Add transition for smooth slide-out animation
    mobileMenu.classList.add("transition-transform", "duration-300", "ease-in-out");

    // Slide the menu out to the right by adding translate-x-full
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.classList.add("translate-x-full");

    // Optionally, hide the menu completely after animation
    setTimeout(() => {
        mobileMenu.classList.add("hidden");
    }, 300); // Delay for the duration of the animation (300ms)
});

// NavBar End

// Carousel Start Here
document.addEventListener("DOMContentLoaded", function() {
    const carouselItems = document.querySelectorAll("[data-carousel-item]");
    const carouselDots = document.querySelectorAll("[data-carousel-dot]");
    let currentIndex = 0;

    // Function to hide all items and show the current item
    function updateCarousel() {
        // Hide all items
        carouselItems.forEach(item => item.classList.add('hidden'));

        // Show the current item
        carouselItems[currentIndex].classList.remove('hidden');

        // Update the dot navigation
        carouselDots.forEach(dot => dot.classList.remove('opacity-100', 'bg-yellow-500'));
        carouselDots[currentIndex].classList.add('opacity-100', 'bg-yellow-500');
    }

    // Event listener for dot navigation
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Function to automatically transition through images
    function autoPlay() {
        currentIndex = (currentIndex + 1) % carouselItems.length; // Loop through the items
        updateCarousel();
    }

    // Set the interval for auto-playing the carousel (every 3 seconds)
    setInterval(autoPlay, 3000); // Change image every 3 seconds

    // Initial update to show the first image
    updateCarousel();
});

// Carousel Manual Movement (using translateX)
let index = 0;
const carousel = document.getElementById('carousel');
const totalImages = carousel.children.length;

// Function to move the carousel
function moveCarousel(direction) {
    index = (index + direction + totalImages) % totalImages;
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Manual image sliding (using buttons)
const prevButton = document.getElementById('prev-button'); // Add this button with ID
const nextButton = document.getElementById('next-button'); // Add this button with ID

if (prevButton) {
    prevButton.addEventListener('click', function() {
        moveCarousel(-1);  // Move to the previous image
    });
}

if (nextButton) {
    nextButton.addEventListener('click', function() {
        moveCarousel(1);  // Move to the next image
    });
}

// Automatic image sliding (every 3 seconds)
setInterval(() => {
    moveCarousel(1);  // Move to the next image automatically every 3 seconds
}, 3000);

// Carousel END HERE


// Fetch the restaurant data from the JSON file -- START
fetch('restaurantdata.json')
  .then(response => response.json())  // Parse the JSON data
  .then(data => {
    const menuContainer = document.getElementById('menu');
    const filterButtons = document.querySelectorAll('.filter-btn');

   // Function to create menu item cards with Order Now button
    function createMenuItemCard(item) {
        return `
           <div id="item-card-${item.id}" class="bg-white border shadow-lg rounded-lg hover:shadow-2xl flex flex-col h-full item-card opacity-0 animate-fade-up">
                <!-- Food Image -->
                <img src="${item.image_url}" alt="${item.foodname}" class="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 hover:scale-110">

                <div class="p-4 flex flex-col flex-grow">
                    <!-- Food Name with Normal Shadow -->
                    <h3 class="text-2xl font-semibold text-[#FF9D23] text-shadow-lg">${item.foodname}</h3>

                    <!-- Category -->
                    <p class="text-gray-500 text-sm mt-1">${item.category}</p>

                    <!-- Price with Normal Shadow -->
                    <div class="mt-3 flex justify-between items-center">
                        <span class="text-xl font-bold text-[#FF9D23] text-shadow-lg">${item.price}</span>
                    </div>

                    <!-- Description -->
                    <p class="mt-2 text-gray-700 text-sm">${item.description}</p>

                    <!-- Empty Space to Push Button to the Bottom -->
                    <div class="flex-grow"></div>

                    <!-- Order Now Button with Gradient -->
                    <button class="mt-4 w-full bg-gradient-to-br from-[#FF9D23] to-[#FFB84C] text-white py-2 rounded-lg hover:scale-105 hover:from-[#FFB84C] hover:to-[#FF9D23] transition duration-300 transform focus:outline-none shadow-md hover:shadow-lg">
                        Order Now
                    </button>
                </div>
            </div>



            `;
    }
  
    // Function to display the full menu or a filtered category
    function displayMenuItems(category = 'all') {
      // Clear the current menu items
      menuContainer.innerHTML = '';

      // Filter data based on selected category
      const filteredData = category === 'all' ? data : data.filter(item => item.category === category);

      // Add each menu item card to the container with animation
      filteredData.forEach(item => {
        menuContainer.innerHTML += createMenuItemCard(item);
      });
    }

    // Initially display all items
    displayMenuItems();

    // Filter menu by category when a filter button is clicked
    filterButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const category = event.target.getAttribute('data-category');
        displayMenuItems(category);
      });
    });
  })
  .catch(error => {
    console.error('Error loading the restaurant data:', error);
  });

  // Fetch the restaurant data from the JSON file -- END

  


  function carouselchef() {
    return {
      current: 0,
      chefs: [
        { image: 'images/chef/chef1.png', name: 'Chef Anton', specialty: 'Filipino Street Food Expert', rating: 5 },
        { image: 'images/chef/chef2.png', name: 'Chef Maria', specialty: 'Traditional Filipino Dishes', rating: 4 },
        { image: 'images/chef/chef3.png', name: 'Chef Michele', specialty: 'Ilocano Cuisine Specialist', rating: 5 },
        { image: 'images/chef/chef4.png', name: 'Chef John', specialty: 'Pastry & Kakanin Maker', rating: 4 },
        { image: 'images/chef/chef5.png', name: 'Chef Rico', specialty: 'Mindanao Fusion Chef', rating: 3 },
        { image: 'images/chef/chef6.png', name: 'Chef Ella', specialty: 'Seafood & Sinigang Master', rating: 5 },
        { image: 'images/chef/chef7.png', name: 'Chef Maris', specialty: 'Lutong Bahay Creator', rating: 4 },
        { image: 'images/chef/chef8.png', name: 'Chef Leah', specialty: 'Modern Filipino Cuisine', rating: 5 },
        { image: 'images/chef/chef9.png', name: 'Chef Sarah', specialty: 'Adobo & Kare-Kare Guru', rating: 4 }
      ],
      next() {
        this.current = (this.current + 1) % this.chefs.length;
      },
      prev() {
        this.current = (this.current - 1 + this.chefs.length) % this.chefs.length;
      },
      getClass(index) {
        const diff = index - this.current;
        if (diff === 0) {
          return 'transform scale-100 z-20';
        } else if (diff === -1 || diff === this.chefs.length - 1) {
          return 'transform -translate-x-64 rotate-y-12 scale-90 z-10 opacity-80';
        } else if (diff === 1 || diff === -(this.chefs.length - 1)) {
          return 'transform translate-x-64 -rotate-y-12 scale-90 z-10 opacity-80';
        } else {
          return 'hidden';
        }
      }
    }
  }

//POS SYSTEM


  