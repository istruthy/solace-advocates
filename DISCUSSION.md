# Discussion Points

Thanks for the opportunity to work through this example project. Within the time frame I attempted to make improvements. Below are the thoughts and points that I added, addressed, and think would be potential future enhancements.

The Favorites side sheet doesn't actually save anything or have the ability to add, the data is just mocked in for future enhancement idea.

## Typescript

- [x] Initially added the advocate interface -[x] Add several others to handle the added functionality, though did rely on some help from context for various typescript 'types'

## UI

- [ ] Cosolidated advocates information
- [x] Added filters rather table sorting
- [x] Add a favorites selection
- [x] Initial stab at color pallete matching with live Solace Health website
- [ ] Would like to make the table header sticky in future enhancement
- [ ] Continue to componetize ui

## Database

- [x] Using local docker image
- [ ] Should handle connection pooling
- [ ] Enable better caching
- [ ] Didn't want to add additional tables in this exersize
- [ ] Connection failures should be monitored

## Search filter by

- [x] Degree
- [x] City
- [ ] Years of Experience
- [ ] **Speciality** (due to the array value of this in the DB, should be done but ran out of time)

## Advocate Favorites

- [x] Utlizing Next js parallel routes to conatinerize future development where it would make calls to db separately to manage persistance
- [x] Mock the ability for users to "favorite" an Advocate to compare later
- [ ] Need to add additional state management to keep the favorites consistent

## Authentication

- [ ] Would be useful to add authentication to handle saving favorites and other history

## Additional

- [x] I did add prettier to help in formatting, generic setting
- [x] Added drizzle studio run script to package file
- [x] Modified the tailwind config to handle the location of the components
