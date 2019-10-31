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


URIs relative to https://localhost:5002/


**Create**
```
Method: insertComment
HTTP request: POST /comment
Description: Posts the specified comment
```

**Read**
```
Method: getSong
HTTP request: GET /query/getsong/:songId
Description: Gets the specified songId’s song information containing song_id, song_name and song_data_url
```

**Update**
```
Method: updateComment
HTTP request: PUT /updateComment/:commentId
Description: Updates the specified comment
```

**Delete**
```
Method: deleteComment
HTTP request: DELETE /deleteComment/:commentId
Description: Deletes the specified comment.
```
















