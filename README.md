# song-display
song-display-database-optimization

## Description
implementing backend optimization for song-display module

## Related Projects
  - https://github.com/3-musicdb/soundclout-sidebar-module
  - https://github.com/3-musicdb/active-player

## Table of Contents
1. [Requirements](#requirements)
2. [Development](#development)
3. [API](#API)

## Requirements
- Node v8.15.x
- npm v6.4.x

## Development
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

##API:

Request Body is accepted in JSON format.

### Create (POST)

This method inserts a comment record into the database.

`POST /:songId/comments`
`Method: insertComment`
#### Body

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `id`             | `integer`     | *Required.* comment identifier.                                        |
| `song_id`        | `integer`     | *Required.* song identifier for commented song.                        |
| `user_id   `     | `integer`     | *Required.* user identifier for the commented song.                    |
| `timestamp`      | `integer`     | *Required.* Timestamp for the commented song.                          |
| `comment`        | `VARCHAR(255)`| *Required.* The comment to be posted                                   |


### Read (GET)

Gets the specified songId’s song information containing song_id, song_name and song_data_url

`GET /getsong/:songId`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `songId`         | `integer`     | *Required.* Song identifier for the targeted song.                     |

### Response

| Name               | Type         | Description                                                            |
| ------------------ |:------------:| :----------------------------------------------------------------------|
| `songObj     `     | `Object`     | Song Object with waveformdata, date_posted, and song_data_url          |
| `comments`         | `array`      | array of comments for the related song                                 |


### Update (PUT)

Updates the specified comment

`PUT /updateComment/:commentId`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `commentId`      | `integer`     | *Required.* Comment identifier for the targeted comment to be updated. |
| `comment`        | `varchar(255)`| *Required.* updated comment                                            |


#### Delete (DELETE)

Deletes the specified comment.

`DELETE /deleteComment/:commentId`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `commentId`      | `integer`     | *Required.* Comment identifier for the targeted comment to be deleted. |



















