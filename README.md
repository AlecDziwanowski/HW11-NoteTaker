## Acceptance Criteria
```
WHEN I click on an existing note in the list in the left-hand column
  THEN that note appears in the right-hand column
```

* `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

readme edits
empty db.json then double push
async await
high latency on heroku deployment
