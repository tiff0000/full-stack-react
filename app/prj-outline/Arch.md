__Why we slice the system into webapps:__ The entire system is huge and complex. As part of the project, we will develop smaller independent webapps that can be integrated with larger systems. 


__How we will slice the app__: 
* Web app 1: Authentication app for users to sign up and log in: users can create a new account or authenticate if they already had an account. Basic username and password formatting will be validated by the application when user is signing up. All credentials will be sent to the server. 

Technology: HTML/CSS for the sign up/login form, Javascript for client side validation and sending the form to the server. 

* Web service 1: The submitted form will be sent to the server by creating an account in the server or validate the account by looking at the accounts in the database.

Technology: HTTP served by node.js, HTTP methods using express, store user credentials using MongoDB.

* Web app 2: A dashboard app that allows director to set ticket counts, add tickets, view total amount of tickets, view amount of tickets allocated to professors, set ticket as granted. Professors can view potential applicants, view ratio of domestic and international applicants, view the status of each ticket. Allows associate chair and associate chair graduate to get and view tickets in offer requested state, set approval for tickets to offer granted set rejection. Shows  total tickets and ticket states, shows ratio of international vs domestic tickets.

Technology: HTML/CSS to view pages, Javascript for user interactions (add tickets number, set ticket status (approval/rejection), set offer state, etc)
Web service 2: 


Use case     | Web service support
------------ | -------------
director set ticket counts  | HTTP UPDATE
add tickets | HTTP PUT
view total amount of tickets  | HTTP GET
view amount of tickets allocated to professors  | HTTP GET
set ticket as granted| HTTP UPGRADE
Allows associate chair and associate chair graduate to get and view tickets in offer requested state  | HTTP GET and HTTP PUT
set approval for tickets to offer granted set rejection.  | HTTP UPDATE
Shows total tickets and ticket states | HTTP GET
shows ratio of international vs domestic tickets. |HTTP GET

Technology: HTTP served by node.js, HTTP methods using express, store user interaction information using MongoDB.
