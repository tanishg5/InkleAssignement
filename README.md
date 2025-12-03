Inkle Frontend Intern Assignment
This project is a frontend assignment built for the Inkle Frontend Intern role.
Added a simple loading state so the UI doesn’t feel blank when the project opens.

🛠 Tech Stack used : 

React.js
Tailwind CSS
@tanstack/react-table v8
React Icons


📦 Features

1. Tax Records Table
- Displays entity, gender, request date, country, and actions.
- Supports country filtering (India, US, UK).
- Automatically updates the table based on filters.

2. Edit Customer Modal
- Edit name and country.
- Country dropdown:
  - Scrollable
  - Click-to-select
  - Works with a list from the API
 
⚠️ Challenges Encountered
1. Inconsistent API Data
Some API records had:
->Missing entity names
->Invalid or empty dates
->Inconsistent format of dates

2.Dropdown ui issue
Modal dropdown overlapped Save/Cancel buttons
Added scrollable dropdown behavior

3. Matching the Figma UI Precisely
Focused on:
Accurate spacing
Colors & shadows
Icon placement
Table Ui 
Ensured the UI matches the Figma design as closely as possible.
