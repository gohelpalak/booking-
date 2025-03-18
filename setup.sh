#!/bin/bash

# Define the project root directory
PROJECT_ROOT="frontend"

# Create the directory structure
mkdir -p $PROJECT_ROOT/public
mkdir -p $PROJECT_ROOT/src/assets
mkdir -p $PROJECT_ROOT/src/components
mkdir -p $PROJECT_ROOT/src/pages
mkdir -p $PROJECT_ROOT/src/services
mkdir -p $PROJECT_ROOT/src/store
mkdir -p $PROJECT_ROOT/src/context

# Create component files
touch $PROJECT_ROOT/src/components/FlightCard.jsx

touch $PROJECT_ROOT/src/components/HotelCard.jsx

touch $PROJECT_ROOT/src/components/CarCard.jsx

touch $PROJECT_ROOT/src/components/Navbar.jsx

# Create page files
touch $PROJECT_ROOT/src/pages/HomePage.jsx

touch $PROJECT_ROOT/src/pages/FlightsPage.jsx

touch $PROJECT_ROOT/src/pages/HotelsPage.jsx

touch $PROJECT_ROOT/src/pages/CarsPage.jsx

touch $PROJECT_ROOT/src/pages/BookingPage.jsx

touch $PROJECT_ROOT/src/pages/LoginPage.jsx

touch $PROJECT_ROOT/src/pages/RegisterPage.jsx

# Create service files
touch $PROJECT_ROOT/src/services/api.js

touch $PROJECT_ROOT/src/services/flightService.js

touch $PROJECT_ROOT/src/services/hotelService.js

touch $PROJECT_ROOT/src/services/carService.js

touch $PROJECT_ROOT/src/services/bookingService.js

# Create Redux store files
touch $PROJECT_ROOT/src/store/store.js

touch $PROJECT_ROOT/src/store/flightSlice.js

touch $PROJECT_ROOT/src/store/hotelSlice.js

touch $PROJECT_ROOT/src/store/carSlice.js

touch $PROJECT_ROOT/src/store/bookingSlice.js

# Create Context API files
touch $PROJECT_ROOT/src/context/AuthContext.js

# Create main application files
touch $PROJECT_ROOT/src/App.jsx

touch $PROJECT_ROOT/src/main.jsx

touch $PROJECT_ROOT/index.html

touch $PROJECT_ROOT/package.json

touch $PROJECT_ROOT/vite.config.js

touch $PROJECT_ROOT/.env

# Print success message
echo "Project structure created successfully!"
