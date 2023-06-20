# ticket-maestros

This project is a web application built with React and Java Spring that allows users to search, filter, and buy concert tickets.
 Users can search for their desired concert tickets, apply filters to refine their search, and view the available options displayed in a card format.
 Once users have found the ticket they want to purchase, they can proceed to make the payment directly on the site.

Getting Started To run the web application locally, follow these steps:


    Backend (Java Spring): 
     Open the project in your preferred Java development environment.
    Build and run the backend server using the provided build and run commands.
     The backend server should now be running on a specified port (e.g., 8080).
     DATABASE: Make sure you have PostgreSql driver installed and that you can connect to the db.
     CHECK MAIN (FullstackBackendApplication) -> CommandLineRunner bean to see admin and password (line 44).
    Frontend (React):
     Navigate to the project directory using the command line or terminal. 
    Install the necessary dependencies by running the command: npm install --force (force because of a component called flippy).
     Start the frontend development server using the command: npm run dev.     
       Usage Once the web application is running, users can interact with it using the following features:
    NOTE: TO USE THE CHATGPTIMPLEMENTATION IN HOTEL.jsx add your own OPENAIAPI Key. 
    The code was written for testing a simple idea and was left there. Basically you can ask GPT for info about attraction name, event location and city.

Search: Enter keywords or specific details related to the desired concert tickets in the search bar to find relevant options. 
Filter: Apply filters such as date, location, price range, or genre to refine the search results and find specific concert tickets. 
Card Display: View the available concert tickets in a card format, with essential information such as artist, venue, date, and price. 
Ticket Selection: Select the desired ticket from the available options and proceed to the checkout process.
 Payment: Complete the payment process directly on the site to finalize the ticket purchase.

Contributing Contributions to this web application project are welcome! If you have any suggestions, bug fixes, or new features to propose, please submit a pull request.
