## Acceptance Criteria
```
WHEN I open the Note Taker
  THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
  THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
  THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
  THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
  THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
  THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

## Getting Started
On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.


## Bonus
You haven’t learned how to handle DELETE requests, but this application offers that functionality on the front end. As a bonus, try to add the DELETE route to the application using the following guideline:

* `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

* The URL of the functional, deployed application.
* The URL of the GitHub repository, with a unique name and a README describing the project.

add store.js to db folder?
