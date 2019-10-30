/* eslint-disable camelcase */
const faker = require('faker');

const getRandomArbitrary = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const generateComments = () => {
  // Get all song IDs
  const songIDs = [
    {id: 'Song_3', duration: 207 },
    {id: 'Song_2', duration: 233 },
    {id: 'Song_1', duration: 321 },
    {id: 'Song_4', duration: 191 },
    {id: 'Song_5', duration: 226 },
    {id: 'Song_6', duration: 212 },
    {id: 'Song_7', duration: 228 },
    {id: 'Song_8', duration: 286 },
    {id: 'Song_9', duration: 209 },
    {id: 'Song_10', duration: 290 },
    {id: 'Song_11', duration: 182 },
    {id: 'Song_12', duration: 203 },
    {id: 'Song_13', duration: 242 },
    {id: 'Song_14', duration: 245 },
    {id: 'Song_15', duration: 252 },
    {id: 'Song_16', duration: 209 },
    {id: 'Song_17', duration: 249 },
    {id: 'Song_18', duration: 220 },
    {id: 'Song_19', duration: 203 },
    {id: 'Song_20', duration: 221 },
    {id: 'Song_21', duration: 285 },
    {id: 'Song_22', duration: 266 },
    {id: 'Song_23', duration: 174 },
    {id: 'Song_24', duration: 243 },
    {id: 'Song_25', duration: 234 },
    {id: 'Song_26', duration: 262 },
    {id: 'Song_27', duration: 241 },
    {id: 'Song_28', duration: 159 },
    {id: 'Song_29', duration: 194 },
    {id: 'Song_30', duration: 255 },
    {id: 'Song_31', duration: 218 },
    {id: 'Song_32', duration: 222 },
    {id: 'Song_33', duration: 175 },
    {id: 'Song_34', duration: 222 },
    {id: 'Song_35', duration: 213 },
    {id: 'Song_36', duration: 215 },
    {id: 'Song_37', duration: 184 },
    {id: 'Song_38', duration: 135 },
    {id: 'Song_39', duration: 199 },
    {id: 'Song_40', duration: 214 },
    {id: 'Song_41', duration: 191 },
    {id: 'Song_42', duration: 212 },
    {id: 'Song_43', duration: 252 },
    {id: 'Song_44', duration: 203 },
    {id: 'Song_45', duration: 233 },
    {id: 'Song_46', duration: 180 },
    {id: 'Song_47', duration: 239 },
    {id: 'Song_48', duration: 237 },
    {id: 'Song_49', duration: 292 },
    {id: 'Song_50', duration: 186 },
    {id: 'Song_51', duration: 204 },
    {id: 'Song_52', duration: 233 },
    {id: 'Song_53', duration: 198 },
    {id: 'Song_54', duration: 212 },
    {id: 'Song_55', duration: 165 },
    {id: 'Song_56', duration: 198 },
    {id: 'Song_57', duration: 278 },
    {id: 'Song_58', duration: 204 },
    {id: 'Song_59', duration: 218 },
    {id: 'Song_60', duration: 240 },
    {id: 'Song_61', duration: 255 },
    {id: 'Song_62', duration: 216 },
    {id: 'Song_63', duration: 207 },
    {id: 'Song_64', duration: 180 },
    {id: 'Song_65', duration: 170 },
    {id: 'Song_66', duration: 203 },
    {id: 'Song_67', duration: 215 },
    {id: 'Song_68', duration: 178 },
    {id: 'Song_69', duration: 220 },
    {id: 'Song_70', duration: 195 },
    {id: 'Song_71', duration: 178 },
    {id: 'Song_72', duration: 226 },
    {id: 'Song_73', duration: 148 },
    {id: 'Song_74', duration: 202 },
    {id: 'Song_75', duration: 206 },
    {id: 'Song_76', duration: 267 },
    {id: 'Song_77', duration: 262 },
    {id: 'Song_78', duration: 217 },
    {id: 'Song_79', duration: 185 },
    {id: 'Song_80', duration: 240 },
    {id: 'Song_81', duration: 206 },
    {id: 'Song_82', duration: 178 },
    {id: 'Song_83', duration: 269 },
    {id: 'Song_84', duration: 204 },
    {id: 'Song_85', duration: 216 },
    {id: 'Song_86', duration: 189 },
    {id: 'Song_87', duration: 225 },
    {id: 'Song_88', duration: 242 },
    {id: 'Song_89', duration: 215 },
    {id: 'Song_90', duration: 196 },
    {id: 'Song_91', duration: 207 },
    {id: 'Song_92', duration: 280 },
    {id: 'Song_93', duration: 235 },
    {id: 'Song_94', duration: 215 },
    {id: 'Song_95', duration: 186 },
    {id: 'Song_96', duration: 231 },
  ];

  const formattedComments = [];

  // For each song ID, create username, text, and timestamp
  for (let i = 0; i < songIDs.length; i++) {
    const currentSong = songIDs[i];

    // Get random number of comments for current song
    const numComments = getRandomArbitrary(15, 30);

    // For each comment, create username, text, timestamp
    for (let j = 0; j < numComments; j++) {
      const song_id = currentSong.id;

      // Create comment, username, timestamp
      const comment = faker.random.words();
      const user_name = faker.internet.userName();
      const time_stamp = getRandomArbitrary(0, currentSong.duration);

      // Add to overall array
      formattedComments.push([song_id, user_name, time_stamp, comment]);
    }
  }
  return formattedComments;
};

module.exports = generateComments;
