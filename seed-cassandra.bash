COPY songs (
  id,
  song_name,
  artist_name,
  upload_time,
  tag,
  album_art,
  song_data_url,
  background_light,
  background_dark,
  waveform_data,
  song_duration,
  comment_user_name,
  comment_time_stamp,
  comment,
  commentId
)
  FROM '/Users/cgzlaptop/Documents/HackReactor/song-display/songDisplayComponent/cassandraData.csv'
  WITH DELIMITER = '|'
  AND HEADER = true
  AND CHUNKSIZE = 5000;