# song-display
song-display-database-optimization

## Description
implementing backend optimization for song-display module

## Related Projects
  - https://github.com/3-musicdb/soundclout-sidebar-module
  - https://github.com/3-musicdb/active-player

## Table of Contents
1. [Requirements](#requirements)

## Requirements
- Node v8.15.x
- npm v6.4.x

### Installing Dependencies
From within the root directory


1. Install project dependencies
```javascript
npm install
```

2. To create and seed the MySQL database
```javascript
npm run seed
```

3. To create a client bundle
```javascript
npm build
```

4. To start the server
```javascript
npm start
```

5. Go to `localhost:5001/song_:id/` i.e. http://localhost:5001/song_00082/



 
Method
HTTP request
Description
URIs relative to https://localhost:5002/
insertComment
POST /comment
Posts the specified comment
getSong
GET /query/getsong/:songId
Gets the specified songId’s song information containing song_id, song_name and song_data_url
updateComment
PUT /updateComment/:commentId
Updates the specified comment
deleteComment
DELETE /deleteComment/:commentId
Deletes the specified comment.


