Implement **authentication** for user accounts in webapp

* User is able to create unique account in our webapp
* User is able to choose username / password of their choice for their account
* User accounts will fall into 4 different categories of accounts.

Implement the dashboard **UI** for 4 types of users: Faculty (Professors), Associate chair graduate, grad staff office, Budget Director
Redirect users after successfully logging in to a dashboard (their homepage)

Implement **basic ticketing system** and tie functionality together with dashboard. 

* Each user type will have different privileges available to them on their dashboard

* **Student**

  * View ticket status

* **Budget Director**

  * Creating tickets to be issued for any user
  * Status page to see total amount of tickets created for that year; see amount of tickets allocated to any user.
  * Status page to see how many tickets are granted to international vs domestic students
  * Ability to mark ticket as granted

* **Professors (Faculty)**

  * Professors can view potential applicants and keeps track of ratio of domestic and international applicants on status page
  * Professors can check the status of each ticket as offer granted, offer request, offer pending, offer refused and offer accepted.
  * Faculty can associate ticket to an applicant which will change the state of ticket to offer-request

* **Associate Chair graduate**

  * Find & view tickets in offer requested state
  * Approve tickets to offer granted state or reject ticket

  Find and handle all tickets that cover same applicant

* **Grad office staff**

  * See the status of all tickets, and be able to edit the ticket state
  * Accept or refuse tickets that have been granted

* **Dashboard / overview**

  * Track total tickets & ticket states
  * Track ratio of international Vs. domestic tickets


 Implement **notes for tickets** as additional functionality for the ticketing system
 Be able to add notes, edit notes and mark a note as resolved and unresolved to a ticket

 Implement **dashboard notifications** additional functionality for dashboard

 If extra time, additional functionality for Admin Console

* GAPF applications for faculty members
* To be reviewed by the Budget director, will calculate number of tickets available based on applications
* Be able to add notes to each GAPF application, resolve/ unresolve notes on the GAPF application
