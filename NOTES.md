# Patch Notes

## Summary

Fixed several high-impact correctness, performance, UX, and robustness issues in the task search flow.

- Fixed SQL operator precedence so archived tasks are always excluded and the status filter applies to both title and description matches.
- Removed artificial `Thread.sleep()` latency from the API request path.
- Added pagination bounds (`page >= 1`, `1 <= pageSize <= 100`).
- Reset pagination to page 1 when the search query or status changes.
- Fixed frontend loading and error-state handling and prevented stale responses from overwriting newer search results.
- Updated the reference H2 SQL and Oracle PL/SQL queries to keep search logic consistent.

## What I Did Not Change

I did not refactor unrelated code or change the project structure, startup commands, or dependencies. I also left lower-priority edge cases such as SQL wildcard escaping and invalid status handling for a future patch because they were outside the focused timebox.

## Biggest Remaining Risk

The application uses an in-memory H2 database and initializes seed data on startup. A persistent production database would need a proper migration strategy and controlled data initialization.

## Verification

Backend compilation and frontend production build completed successfully. API checks verified archived-task exclusion, combined search/status filtering, and pagination bounds.

## Tools / AI Used

Used AI assistance for repository audit, bug identification, and reviewing focused fixes. All changes were reviewed and verified manually before submission.