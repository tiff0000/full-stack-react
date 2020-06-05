__Models: Users, Grad Applicants, Program, Tickets, Notes__

The complete API can be accessed here:
[Swagger](https://app.swaggerhub.com/apis/csc302BD/GradApp/1.0.0)


Users will sign into through client webapp. The client will send in login credentials to authenticate, and will be sent back user information from the database containing the users model. Client will be redirected to dashboard page; client will request information to grad applicants, program, tickets and notes model to display the information out.

Any creation/update of a ticket will be sent from client UI to the tickets model. 

Any creation/edit information of a new user will be sent from client UI to the users model

Any create/edit of a note will be sent from client UI to the notes model.
