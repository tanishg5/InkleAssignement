Inkle Frontend Intern Assignment
This project is a frontend assignment built for the Inkle Frontend Intern role.

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
 
Challenges Encountered
1. Inconsistent API Data
a.Some API records had:
b.Missing entity names
c.Invalid or empty dates
d.These inconsistencies initially caused UI issues, such as "Invalid Date" or blank fields.

2.Dropdown Positioning & Overflow Issues
a.One of the biggest UI challenges was ensuring the country filter and modal dropdown appeared correctly:
b.The filter dropdown was initially hidden behind the table due to overflow: hidden
c.The modal dropdown initially covered the cancel and save buttons

3. Matching the Figma UI Precisely and accurately - Spacing, colors, shadows, and icon placement had to match the design, especially:

 Known Improvements (If given more time)
- Make the country dropdown searchable.
- Add loader while fetching.
