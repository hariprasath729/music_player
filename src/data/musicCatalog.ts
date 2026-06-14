export type Genre = 'synthwave' | 'lofi' | 'house' | 'ambient' | 'acoustic';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  gradient: string;
  genre: Genre;
  lyrics?: string[];
  color: string;
  fileUrl: string;
  coverUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverGradient: string;
  tracks: Track[];
  likes: string;
  followers: string;
  primaryColor: string;
}

export interface Category {
  id: string;
  title: string;
  color: string;
}

type RawSong = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  cover: string;
};

const RAW_SONGS: RawSong[] =[
  {
    "id": 1,
    "title": "10 Outta 10",
    "artist": "Vrun, Mkay Shivu",
    "album": "10 Outta 10 (Indie)",
    "duration": 173,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/10_Outta_10.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/10_Outta_10.jpg"
  },
  {
    "id": 2,
    "title": "A Tragedy and a Revelation",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 74,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/A_Tragedy_and_a_Revelation.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/A_Tragedy_and_a_Revelation.jpg"
  },
  {
    "id": 3,
    "title": "A walk in the Park",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 79,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/A_walk_in_the_Park.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/A_walk_in_the_Park.jpg"
  },
  {
    "id": 4,
    "title": "Aadiney Irupen",
    "artist": "Justin Prabhakaran",
    "album": "Happy Raj",
    "duration": 224,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Aadiney_Irupen.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Aadiney_Irupen.jpg"
  },
  {
    "id": 5,
    "title": "Aagaya Neelam",
    "artist": "Vaisakh Somanath",
    "album": "Oh Butterfly!",
    "duration": 252,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Aagaya_Neelam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Aagaya_Neelam.jpg"
  },
  {
    "id": 6,
    "title": "Aaja Raja",
    "artist": "Anirudh Ravichander, Chintu",
    "album": "KH x RK Reunion",
    "duration": 128,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Aaja_Raja.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Aaja_Raja.jpg"
  },
  {
    "id": 7,
    "title": "Aaraaro",
    "artist": "Ghibran, Deepthi Suresh, Adithya RK",
    "album": "Leader",
    "duration": 194,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Aaraaro.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Aaraaro.jpg"
  },
  {
    "id": 8,
    "title": "Aaradi Kaathirukku",
    "artist": "Nivas K Prasanna, Aditi Shankar",
    "album": "Thaai Kizhavi",
    "duration": 257,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Aaradi_Kaathirukku.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Aaradi_Kaathirukku.jpg"
  },
  {
    "id": 9,
    "title": "Aariro Paatu",
    "artist": "Sam C.S., Saindhavi",
    "album": "Exam (Web Series)",
    "duration": 194,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Aariro_Paatu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Aariro_Paatu.jpg"
  },
  {
    "id": 10,
    "title": "Aasa Pulla",
    "artist": "G. V. Prakash Kumar",
    "album": "Youth",
    "duration": 151,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Aasa_Pulla.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Aasa_Pulla.jpg"
  },
  {
    "id": 11,
    "title": "Aathi Raasathi",
    "artist": "Sai Abhyankkar, Dhass Benjamin",
    "album": "Karuppu",
    "duration": 237,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Aathi_Raasathi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Aathi_Raasathi.jpg"
  },
  {
    "id": 12,
    "title": "Ada Blue Shirt!",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Ada_Blue_Shirt!.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Ada_Blue_Shirt!.jpg"
  },
  {
    "id": 13,
    "title": "Adaavadi",
    "artist": "Anirudh Ravichander, Mathichiyam Bala, Vignesh Shivan",
    "album": "Love Insurance Kompany (LIK)",
    "duration": 194,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Adaavadi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Adaavadi.jpg"
  },
  {
    "id": 14,
    "title": "Adada",
    "artist": "Ramanujan Mk, K.S.Harisankar, Hriday Goswami, Jeevan Joy, Ruhee Ahamed",
    "album": "Carmeni Selvam",
    "duration": 174,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Adada.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Adada.jpg"
  },
  {
    "id": 15,
    "title": "Adchu Vidu",
    "artist": "Vishnu Vijay, K. S. Harisankar",
    "album": "Thalaivar Thambi Thalaimaiyil (TTT)",
    "duration": 169,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Adchu_Vidu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Adchu_Vidu.jpg"
  },
  {
    "id": 16,
    "title": "Agam",
    "artist": "Dhibu Ninan Thomas, Anand Sreeraj",
    "album": "Mr. X",
    "duration": 236,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Agam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Agam.jpg"
  },
  {
    "id": 17,
    "title": "Ain't Nobody",
    "artist": "Anirudh Ravichander, Ram Kumar",
    "album": "DC",
    "duration": 70,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Ain't_Nobody.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Ain't_Nobody.jpg"
  },
  {
    "id": 18,
    "title": "Aiyo Kadhaley",
    "artist": "Sean Roldan, Vijaynarain, Mohan Rajan",
    "album": "With Love",
    "duration": 206,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Aiyo_Kadhaley.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Aiyo_Kadhaley.jpg"
  },
  {
    "id": 19,
    "title": "Akkadi",
    "artist": "Deva, Girishh G",
    "album": "Sattendru Maarudhu Vaanilai",
    "duration": 187,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Akkadi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Akkadi.jpg"
  },
  {
    "id": 20,
    "title": "Alapuzha Sandhayila",
    "artist": "G. V. Prakash Kumar, Grace Karunaas, Karunaas",
    "album": "Youth",
    "duration": 122,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Alapuzha_Sandhayila.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Alapuzha_Sandhayila.jpg"
  },
  {
    "id": 21,
    "title": "All at once",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 213,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/All_at_once.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/All_at_once.jpg"
  },
  {
    "id": 22,
    "title": "Alpha",
    "artist": "Ravi Basrur, Benny Dayal",
    "album": "Blast",
    "duration": 251,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Alpha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Alpha.jpg"
  },
  {
    "id": 23,
    "title": "Ambu Vitta Kirukki",
    "artist": "Varun Chandrasekar",
    "album": "Ambu Vitta Kirukki (Indie)",
    "duration": 224,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Ambu_Vitta_Kirukki.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Ambu_Vitta_Kirukki.jpg"
  },
  {
    "id": 24,
    "title": "Ambuli Rock",
    "artist": "Ghibran, Guru Hariraj, Benny Dayal, Keeravani, Kanaka Lakshmi",
    "album": "Leader",
    "duration": 182,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Ambuli_Rock.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Ambuli_Rock.jpg"
  },
  {
    "id": 25,
    "title": "Amma Amma Dhaan",
    "artist": "Balaji Sriram, Sreekanth Hariharan",
    "album": "Nooru Saami",
    "duration": 237,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Amma_Amma_Dhaan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Amma_Amma_Dhaan.jpg"
  },
  {
    "id": 26,
    "title": "Amma Thaaye",
    "artist": "Nivas K Prasanna",
    "album": "Thaai Kizhavi",
    "duration": 221,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Amma_Thaaye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Amma_Thaaye.jpg"
  },
  {
    "id": 27,
    "title": "Ammaadi Aanandha Aruvi nee (Female Version)",
    "artist": "Thaman S, Adviteeya Vojjala",
    "album": "S.Saraswathi",
    "duration": 241,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Ammaadi_Aanandha_Aruvi_nee_(Female_Version).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Ammaadi_Aanandha_Aruvi_nee_(Female_Version).jpg"
  },
  {
    "id": 28,
    "title": "Ammaadi Aanandha Aruvi Nee (Male Version)",
    "artist": "Thaman S, Shravan Narayan",
    "album": "S.Saraswathi",
    "duration": 241,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Ammaadi_Aanandha_Aruvi_Nee_(Male_Version).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Ammaadi_Aanandha_Aruvi_Nee_(Male_Version).jpg"
  },
  {
    "id": 29,
    "title": "Anbe Anbe",
    "artist": "Harris Jayaraj, Gayathry Rajiv, Madhan Karky",
    "album": "Kadhal Reset Repeat (KRR)",
    "duration": 285,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Anbe_Anbe.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Anbe_Anbe.jpg"
  },
  {
    "id": 30,
    "title": "Anbennum Aararo",
    "artist": "Sam C.S., Harish Raghavendra, Fathima Jahan",
    "album": "Habeebi",
    "duration": 252,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Anbennum_Aararo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Anbennum_Aararo.jpg"
  },
  {
    "id": 31,
    "title": "Anbenum Peroli",
    "artist": "Sean Roldan, Meenakshi Elayaraja",
    "album": "My Lord",
    "duration": 174,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Anbenum_Peroli.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Anbenum_Peroli.jpg"
  },
  {
    "id": 32,
    "title": "Angel in a Colour Dress",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 21,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Angel_in_a_Colour_Dress.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Angel_in_a_Colour_Dress.jpg"
  },
  {
    "id": 33,
    "title": "Anisha Akka va?",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 51,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Anisha_Akka_va.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Anisha_Akka_va.jpg"
  },
  {
    "id": 34,
    "title": "Anisha Breaks The Ice",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Anisha_Breaks_The_Ice.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Anisha_Breaks_The_Ice.jpg"
  },
  {
    "id": 35,
    "title": "Anisha Theme",
    "artist": "Sean Roldan, Mohan Rajan",
    "album": "With Love",
    "duration": 125,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Anisha_Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Anisha_Theme.jpg"
  },
  {
    "id": 36,
    "title": "Apaayam",
    "artist": "Vishnu Vijay, Anthony Daasan",
    "album": "Thalaivar Thambi Thalaimaiyil (TTT)",
    "duration": 182,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Apaayam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Apaayam.jpg"
  },
  {
    "id": 37,
    "title": "Arakkan Thanae",
    "artist": "Ravi Basrur",
    "album": "Blast",
    "duration": 208,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Arakkan_Thanae.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Arakkan_Thanae.jpg"
  },
  {
    "id": 38,
    "title": "Asal Cinema",
    "artist": "Anup Rubens, Anuradha Bhat",
    "album": "Seetha Payanam",
    "duration": 227,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Asal_Cinema.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Asal_Cinema.jpg"
  },
  {
    "id": 39,
    "title": "Athu Thalore",
    "artist": "Sai Abhyankkar, Ananya Chakraborty",
    "album": "Karuppu",
    "duration": 231,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Athu_Thalore.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Athu_Thalore.jpg"
  },
  {
    "id": 40,
    "title": "Aura 10/10",
    "artist": "Hiphop Tamizha",
    "album": "Meesaya Murukku 2",
    "duration": 129,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Aura_10-10.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Aura_10-10.jpg"
  },
  {
    "id": 41,
    "title": "Ayya Ayya",
    "artist": "G. V. Prakash Kumar",
    "album": "Kara",
    "duration": 201,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Ayya_Ayya.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Ayya_Ayya.jpg"
  },
  {
    "id": 42,
    "title": "Azhagazhagai Manam",
    "artist": "K, Kapil Kapilan, Gayathree",
    "album": "Paris Cafe",
    "duration": 198,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Azhagazhagai_Manam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Azhagazhagai_Manam.jpg"
  },
  {
    "id": 43,
    "title": "Back to the School",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 79,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Back_to_the_School.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Back_to_the_School.jpg"
  },
  {
    "id": 44,
    "title": "Bloody Valentine",
    "artist": "Anirudh Ravichander",
    "album": "DC",
    "duration": 101,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Bloody_Valentine.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Bloody_Valentine.jpg"
  },
  {
    "id": 45,
    "title": "Bramma",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 166,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Bramma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Bramma.jpg"
  },
  {
    "id": 46,
    "title": "Bruised Ego",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 38,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Bruised_Ego.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Bruised_Ego.jpg"
  },
  {
    "id": 47,
    "title": "Call Me Sathya",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 131,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Call_Me_-_Sathya.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Call_Me_-_Sathya.jpg"
  },
  {
    "id": 48,
    "title": "Carnival",
    "artist": "Shankar Ehsaan Loy, Aswath Ajith, Kiran Biju, Kathikan, Naveen Bharathi",
    "album": "Chatha Pacha: The Ring Of Rowdies",
    "duration": 216,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Carnival.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Carnival.jpg"
  },
  {
    "id": 49,
    "title": "Celebration Of Seige",
    "artist": "Ghibran, Shenbagaraj Ganesalingam, Narayanan Ravishankar, Sudharsan Ram",
    "album": "Draupathi 2",
    "duration": 164,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Celebration_Of_Seige.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Celebration_Of_Seige.jpg"
  },
  {
    "id": 50,
    "title": "Chatha Pacha Title Track",
    "artist": "Shankar Ehsaan Loy, Manuvardhan CS, Kiran Biju, Kathikan, Naveen Bharathi",
    "album": "Chatha Pacha: The Ring Of Rowdies",
    "duration": 228,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Chatha_Pacha_Title_Track.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Chatha_Pacha_Title_Track.jpg"
  },
  {
    "id": 51,
    "title": "Chella Pulla",
    "artist": "Hari Prasath, Vignesh Venkatachalam, Mahitha Mahesh",
    "album": "Chella Pulla (Indie)",
    "duration": 219,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Chella_Pulla.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Chella_Pulla.jpg"
  },
  {
    "id": 52,
    "title": "Chennai City",
    "artist": "M.S.Jones Rupert",
    "album": "Mustafa Mustafa",
    "duration": 114,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Chennai_City.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Chennai_City.jpg"
  },
  {
    "id": 53,
    "title": "Chennai",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 75,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Chennai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Chennai.jpg"
  },
  {
    "id": 54,
    "title": "Chikiri Chikiri",
    "artist": "A.R.Rahman, A.R. Ameen",
    "album": "Peddi",
    "duration": 273,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Chikiri_Chikiri.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Chikiri_Chikiri.jpg"
  },
  {
    "id": 55,
    "title": "Chinnanjiru",
    "artist": "Ashwath, Swasthika Swaminathan",
    "album": "Valluvan",
    "duration": 181,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Chinnanjiru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Chinnanjiru.jpg"
  },
  {
    "id": 56,
    "title": "Chithappa",
    "artist": "8c Tony, Tha Prophecy, Mike, M. Kowtham",
    "album": "Chithappa (Indie)",
    "duration": 150,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Chithappa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Chithappa.jpg"
  },
  {
    "id": 57,
    "title": "Chosen One",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 29,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Chosen_One.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Chosen_One.jpg"
  },
  {
    "id": 58,
    "title": "Chumma Lololaai",
    "artist": "M.S.Jones Rupert",
    "album": "Mustafa Mustafa",
    "duration": 116,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Chumma_Lololaai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Chumma_Lololaai.jpg"
  },
  {
    "id": 59,
    "title": "Classroom Galatta",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Classroom_Galatta.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Classroom_Galatta.jpg"
  },
  {
    "id": 60,
    "title": "Cook Cook",
    "artist": "Vengayo, Santhosh Narayanan",
    "album": "Chiyaan 63",
    "duration": 53,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Cook_Cook.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Cook_Cook.jpg"
  },
  {
    "id": 61,
    "title": "Daavu",
    "artist": "Nilukshan",
    "album": "Daavu (Indie)",
    "duration": 197,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Daavu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Daavu.jpg"
  },
  {
    "id": 62,
    "title": "Dance Song",
    "artist": "Sam C.S.",
    "album": "Kaalidas 2",
    "duration": 186,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Dance_Song.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Dance_Song.jpg"
  },
  {
    "id": 63,
    "title": "Dancing with Death",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 62,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Dancing_with_Death.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Dancing_with_Death.jpg"
  },
  {
    "id": 64,
    "title": "Dashamakan Title Promo",
    "artist": "Britto Michael",
    "album": "Dashamakan",
    "duration": 72,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Dashamakan_-_Title_Promo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Dashamakan_-_Title_Promo.jpg"
  },
  {
    "id": 65,
    "title": "Dhanda Jigar",
    "artist": "Ashwath, Anthony Daasan",
    "album": "Valluvan",
    "duration": 230,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Dhanda_Jigar.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Dhanda_Jigar.jpg"
  },
  {
    "id": 66,
    "title": "Dheema (Vocals Only)",
    "artist": "Anirudh Ravichander",
    "album": "Love Insurance Kompany (LIK)",
    "duration": 87,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Dheema_(Vocals_Only).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Dheema_(Vocals_Only).jpg"
  },
  {
    "id": 67,
    "title": "Dheema",
    "artist": "Anirudh Ravichander",
    "album": "Love Insurance Kompany (LIK)",
    "duration": 235,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Dheema.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Dheema.jpg"
  },
  {
    "id": 68,
    "title": "Doki Doki",
    "artist": "Adithya RK",
    "album": "Parimala and Co",
    "duration": 165,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Doki_Doki.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Doki_Doki.jpg"
  },
  {
    "id": 69,
    "title": "Draupathi 2 Theme Music",
    "artist": "Ghibran",
    "album": "Draupathi 2",
    "duration": 33,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Draupathi_-_2_Theme_Music.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Draupathi_-_2_Theme_Music.jpg"
  },
  {
    "id": 70,
    "title": "Drunk Calls",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 78,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Drunk_Calls.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Drunk_Calls.jpg"
  },
  {
    "id": 71,
    "title": "Edhira? Pudhira?",
    "artist": "Sathyaprakash",
    "album": "Once More",
    "duration": 140,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Edhira_-Pudhira_-.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Edhira_-Pudhira_-.jpg"
  },
  {
    "id": 72,
    "title": "Edhukku Dhan Indha Kaadhal",
    "artist": "Sean Roldan, Yuvan Shankar Raja, Mohan Rajan",
    "album": "With Love",
    "duration": 269,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Edhukku_Dhan_Indha_Kaadhal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Edhukku_Dhan_Indha_Kaadhal.jpg"
  },
  {
    "id": 73,
    "title": "Emkoney Reprise Version",
    "artist": "Chinmayi",
    "album": "Draupathi 2",
    "duration": 258,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Emkoney_Reprise_Version.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Emkoney_Reprise_Version.jpg"
  },
  {
    "id": 74,
    "title": "Emkoney",
    "artist": "Padmalatha",
    "album": "Draupathi 2",
    "duration": 258,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Emkoney.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Emkoney.jpg"
  },
  {
    "id": 75,
    "title": "En Vazhi Thani Vazhi",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/En_Vazhi_Thani_Vazhi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/En_Vazhi_Thani_Vazhi.jpg"
  },
  {
    "id": 76,
    "title": "Enakenna Yaarum Illaye",
    "artist": "Anirudh Ravichander",
    "album": "Love Insurance Kompany (LIK)",
    "duration": 260,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Enakenna_Yaarum_Illaye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Enakenna_Yaarum_Illaye.jpg"
  },
  {
    "id": 77,
    "title": "Enakku Oru Idea",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 60,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Enakku_Oru_Idea.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Enakku_Oru_Idea.jpg"
  },
  {
    "id": 78,
    "title": "Endangered Green Forest",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 63,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Endangered_Green_Forest.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Endangered_Green_Forest.jpg"
  },
  {
    "id": 79,
    "title": "Endhooru Poradi Pulla",
    "artist": "Anup Rubens, Jassie Gift, Sruthy Sivadas",
    "album": "Seetha Payanam",
    "duration": 255,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Endhooru_Poradi_Pulla.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Endhooru_Poradi_Pulla.jpg"
  },
  {
    "id": 80,
    "title": "Enga Vechi Podhachita",
    "artist": "Nivas K Prasanna",
    "album": "Thaai Kizhavi",
    "duration": 249,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Enga_Vechi_Podhachita.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Enga_Vechi_Podhachita.jpg"
  },
  {
    "id": 81,
    "title": "Ennachcho",
    "artist": "Ghibran, Kapil Kapilan, Bhritta, Sharwanand, Malvika Nair",
    "album": "Biker",
    "duration": 162,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Ennachcho.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Ennachcho.jpg"
  },
  {
    "id": 82,
    "title": "Ennacho",
    "artist": "Sivaangi Krishnakumar, Vignesh Ramakrishna",
    "album": "Ennacho (Indie)",
    "duration": 173,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Ennacho.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Ennacho.jpg"
  },
  {
    "id": 83,
    "title": "Ennai Polave",
    "artist": "Sean Roldan, Sublahshini, Uma Devi",
    "album": "With Love",
    "duration": 205,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Ennai_Polave.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Ennai_Polave.jpg"
  },
  {
    "id": 84,
    "title": "Esa Kaaththa",
    "artist": "Sean Roldan, Sathyaprakash D, Chinmayi",
    "album": "My Lord",
    "duration": 237,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Esa_Kaaththa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Esa_Kaaththa.jpg"
  },
  {
    "id": 85,
    "title": "Exam (Title Track)",
    "artist": "Sam C.S.",
    "album": "Exam (Web Series)",
    "duration": 42,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Exam_(Title_Track).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Exam_(Title_Track).jpg"
  },
  {
    "id": 86,
    "title": "Fighter Fighter",
    "artist": "Ghibran, Sharwanand, Malvika Nair",
    "album": "Biker",
    "duration": 125,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Fighter_Fighter.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Fighter_Fighter.jpg"
  },
  {
    "id": 87,
    "title": "Fraud Payale",
    "artist": "Sean Roldan, Sublahshini",
    "album": "Con City",
    "duration": 226,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Fraud_Payale.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Fraud_Payale.jpg"
  },
  {
    "id": 88,
    "title": "Friends for life",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 37,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Friends_for_life.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Friends_for_life.jpg"
  },
  {
    "id": 89,
    "title": "Gandhi Rap",
    "artist": "A.R.Rahman, KJ Iyenar Anbugurudass",
    "album": "Gandhi Talks",
    "duration": 159,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Gandhi_Rap.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Gandhi_Rap.jpg"
  },
  {
    "id": 90,
    "title": "Get High",
    "artist": "Darbuka Siva, Sanjana Kalmanje",
    "album": "TN 2026 Thanga Natchathiram",
    "duration": 259,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Get_High.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Get_High.jpg"
  },
  {
    "id": 91,
    "title": "Gethu Flop",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 59,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Gethu_Flop.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Gethu_Flop.jpg"
  },
  {
    "id": 92,
    "title": "Gethu Flops Again",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 34,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Gethu_Flops_Again.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Gethu_Flops_Again.jpg"
  },
  {
    "id": 93,
    "title": "Gin Uh Jimikki",
    "artist": "Ashwin Hemanth, Alexandra Joy, Adithya RK",
    "album": "Nee Forever",
    "duration": 219,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Gin_-_Uh_Jimikki.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Gin_-_Uh_Jimikki.jpg"
  },
  {
    "id": 94,
    "title": "God Mode Begins",
    "artist": "Sai Abhyankkar, Gana Muthu, Vishnu Edavan",
    "album": "Karuppu",
    "duration": 56,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/God_Mode_Begins.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/God_Mode_Begins.jpg"
  },
  {
    "id": 95,
    "title": "God Mode",
    "artist": "Sai Abhyankkar, Gana Muthu",
    "album": "Karuppu",
    "duration": 240,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/God_Mode.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/God_Mode.jpg"
  },
  {
    "id": 96,
    "title": "Goindhamma",
    "artist": "Kaushik Krish, Gana Vinoth, Gana Ulagam Dharani, Gana Sudhakar",
    "album": "Meesaya Murukku 2",
    "duration": 193,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Goindhamma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Goindhamma.jpg"
  },
  {
    "id": 97,
    "title": "Goyyala",
    "artist": "Shankarnag Vijayan",
    "album": "Goyyala (Indie)",
    "duration": 225,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Goyyala.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Goyyala.jpg"
  },
  {
    "id": 98,
    "title": "Gudhaam Gulpi",
    "artist": "MC Vickey, V.U.M Ayshwarya",
    "album": "Happy Raj",
    "duration": 128,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Gudhaam_Gulpi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Gudhaam_Gulpi.jpg"
  },
  {
    "id": 99,
    "title": "Haffa Haffa",
    "artist": "Vaisagh, M.S.Jones Rupert, Anushya Murugesh, Sathish",
    "album": "Mustafa Mustafa",
    "duration": 144,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Haffa_Haffa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Haffa_Haffa.jpg"
  },
  {
    "id": 100,
    "title": "Haiyo Maattikkinaan",
    "artist": "M.S.Jones Rupert, Gana Bala",
    "album": "Mustafa Mustafa",
    "duration": 159,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Haiyo_Maattikkinaan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Haiyo_Maattikkinaan.jpg"
  },
  {
    "id": 101,
    "title": "Haiyodi",
    "artist": "Dhibu Ninan Thomas, Kapil Kapilan",
    "album": "Mr. X",
    "duration": 266,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Haiyodi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Haiyodi.jpg"
  },
  {
    "id": 102,
    "title": "Halo Halo",
    "artist": "Harris Jayaraj, Nikhita Gandhi, Deepthi Suresh, Madhan Karky",
    "album": "Kadhal Reset Repeat (KRR)",
    "duration": 280,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Halo_Halo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Halo_Halo.jpg"
  },
  {
    "id": 103,
    "title": "Happy Raj Vibe Check",
    "artist": "Justin Prabhakaran",
    "album": "Happy Raj",
    "duration": 80,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Happy_Raj_Vibe_Check.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Happy_Raj_Vibe_Check.jpg"
  },
  {
    "id": 104,
    "title": "Heartkulla",
    "artist": "Achu Rajamani",
    "album": "Heartkulla (Indie)",
    "duration": 199,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Heartkulla.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Heartkulla.jpg"
  },
  {
    "id": 105,
    "title": "Hellallallo",
    "artist": "A.R.Rahman, Andrea Jeremiah, Rakshita Suresh",
    "album": "Peddi",
    "duration": 228,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Hellallallo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Hellallallo.jpg"
  },
  {
    "id": 106,
    "title": "Hey Alangaari",
    "artist": "Darbuka Siva, Yuvan Shankar Raja, Priyanka NK",
    "album": "TN 2026 Thanga Natchathiram",
    "duration": 227,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Hey_Alangaari.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Hey_Alangaari.jpg"
  },
  {
    "id": 107,
    "title": "Hey Raasathi",
    "artist": "Sam Vishal",
    "album": "Hey Raasathi (Indie)",
    "duration": 269,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Hey_Raasathi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Hey_Raasathi.jpg"
  },
  {
    "id": 108,
    "title": "Hide & Seek",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 79,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Hide_-_Seek.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Hide_-_Seek.jpg"
  },
  {
    "id": 109,
    "title": "Honey Moon",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 80,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Honey_Moon.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Honey_Moon.jpg"
  },
  {
    "id": 110,
    "title": "I Love You Anisha",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 22,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/I_Love_You_Anisha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/I_Love_You_Anisha.jpg"
  },
  {
    "id": 111,
    "title": "I Want Everything",
    "artist": "Airaa Udupi",
    "album": "Blast",
    "duration": 253,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/I_Want_Everything.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/I_Want_Everything.jpg"
  },
  {
    "id": 112,
    "title": "Iceboy",
    "artist": "Asal Kolaar, Shiv Paul",
    "album": "Iceboy (Indie)",
    "duration": 194,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Iceboy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Iceboy.jpg"
  },
  {
    "id": 113,
    "title": "Idhayam",
    "artist": "Hesham Abdul Wahab, Vineeth Sreenivasan",
    "album": "Once More",
    "duration": 228,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Idhayam-.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Idhayam-.jpg"
  },
  {
    "id": 114,
    "title": "Impending Doom with Voice",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 42,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Impending_Doom_with_Voice.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Impending_Doom_with_Voice.jpg"
  },
  {
    "id": 115,
    "title": "Impending Doom",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Impending_Doom.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Impending_Doom.jpg"
  },
  {
    "id": 116,
    "title": "Indra",
    "artist": "Hesham Abdul Wahab, Hanan Shaah",
    "album": "Once More",
    "duration": 204,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Indra-.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Indra-.jpg"
  },
  {
    "id": 117,
    "title": "Inikkum Bandham",
    "artist": "Sublahshini, Santosh Sobhan, Manasa Varanasi",
    "album": "Couple Friendly",
    "duration": 110,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Inikkum_Bandham.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Inikkum_Bandham.jpg"
  },
  {
    "id": 118,
    "title": "Inner Peace",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 76,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Inner_Peace.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Inner_Peace.jpg"
  },
  {
    "id": 119,
    "title": "Irage",
    "artist": "Sri, Srinisha Jayaseelan",
    "album": "Madharas Mafia Company",
    "duration": 172,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Irage.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Irage.jpg"
  },
  {
    "id": 120,
    "title": "Jai Jai Ganesha",
    "artist": "L.V.Muthu Ganesh, Padmalatha",
    "album": "Maragatha Malai",
    "duration": 134,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Jai_Jai_Ganesha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Jai_Jai_Ganesha.jpg"
  },
  {
    "id": 121,
    "title": "James The Tuition Boy",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 49,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/James_-_The_Tuition_Boy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/James_-_The_Tuition_Boy.jpg"
  },
  {
    "id": 122,
    "title": "Jillahi",
    "artist": "Kharesma Ravichandran",
    "album": "Pookie",
    "duration": 191,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Jillahi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Jillahi.jpg"
  },
  {
    "id": 123,
    "title": "Jilley Juice",
    "artist": "Vijay Antony",
    "album": "Pookie",
    "duration": 198,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Jilley_Juice.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Jilley_Juice.jpg"
  },
  {
    "id": 124,
    "title": "Jilpanso",
    "artist": "G. V. Prakash Kumar, Gana Bala, Ken Karunaas, Eshwar",
    "album": "Youth",
    "duration": 156,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Jilpanso.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Jilpanso.jpg"
  },
  {
    "id": 125,
    "title": "Kaadhal Kadhai",
    "artist": "Sean Roldan, Manoj Krishna, Mohan Rajan, Sushmita Narasimhan",
    "album": "With Love",
    "duration": 81,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kaadhal_Kadhai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kaadhal_Kadhai.jpg"
  },
  {
    "id": 126,
    "title": "Kaadhal Yaathiriye",
    "artist": "Rudh, Sanjeeta Bhattacharya",
    "album": "Kaadhal Yaathiriye (Indie)",
    "duration": 190,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kaadhal_Yaathiriye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kaadhal_Yaathiriye.jpg"
  },
  {
    "id": 127,
    "title": "Kaalidas Theme",
    "artist": "Sam C.S.",
    "album": "Kaalidas 2",
    "duration": 104,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kaalidas_Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kaalidas_Theme.jpg"
  },
  {
    "id": 128,
    "title": "Kaarkoonthal Azhake",
    "artist": "Vishnu Vijay, Karthika Vaidyanathan",
    "album": "Thalaivar Thambi Thalaimaiyil (TTT)",
    "duration": 150,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kaarkoonthal_Azhake.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kaarkoonthal_Azhake.jpg"
  },
  {
    "id": 129,
    "title": "Kaathukulla Kuruvi",
    "artist": "Manoj Chinnaswamy, Anthony Daasan",
    "album": "Singha",
    "duration": 250,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kaathukulla_Kuruvi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kaathukulla_Kuruvi.jpg"
  },
  {
    "id": 130,
    "title": "Kadavulin Thottam",
    "artist": "Justin Prabhakaran, S.P. Charan",
    "album": "Happy Raj",
    "duration": 305,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kadavulin_Thottam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kadavulin_Thottam.jpg"
  },
  {
    "id": 131,
    "title": "Kadhol",
    "artist": "Praveen PKP",
    "album": "Kadhol (Indie)",
    "duration": 138,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kadhol.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kadhol.jpg"
  },
  {
    "id": 132,
    "title": "Kalakalappa",
    "artist": "Vishnu Vijay",
    "album": "Thalaivar Thambi Thalaimaiyil (TTT)",
    "duration": 214,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kalakalappa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kalakalappa.jpg"
  },
  {
    "id": 133,
    "title": "Kalangaamale",
    "artist": "A.R.Rahman, Sreekanth Hariharan, Khatija Rahman",
    "album": "Gandhi Talks",
    "duration": 310,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kalangaamale.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kalangaamale.jpg"
  },
  {
    "id": 134,
    "title": "Kalangatha Raasaavey",
    "artist": "AK Prriyan, Nithyashree Venkataramanan, Aravind Karneeswaran",
    "album": "Manithan Deivamagalam",
    "duration": 230,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kalangatha_Raasaavey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kalangatha_Raasaavey.jpg"
  },
  {
    "id": 135,
    "title": "Kanaa Kai Serum",
    "artist": "Aditya Ravindran, Santosh Sobhan, Manasa Varanasi",
    "album": "Couple Friendly",
    "duration": 250,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kanaa_Kai_Serum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kanaa_Kai_Serum.jpg"
  },
  {
    "id": 136,
    "title": "Kanavodu Karaindhaayo",
    "artist": "Sam C.S., Adithya RK",
    "album": "Exam (Web Series)",
    "duration": 130,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kanavodu_Karaindhaayo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kanavodu_Karaindhaayo.jpg"
  },
  {
    "id": 137,
    "title": "Kanna Paakurom, Kaadhal ah Solrom",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 21,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kanna_Paakurom%2C_Kaadhal_ah_Solrom.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kanna_Paakurom%2C_Kaadhal_ah_Solrom.jpg"
  },
  {
    "id": 138,
    "title": "Kannakuzhiya",
    "artist": "Jen Martin, G. V. Prakash Kumar",
    "album": "Hi",
    "duration": 189,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kannakuzhiya.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kannakuzhiya.jpg"
  },
  {
    "id": 139,
    "title": "Kannamma En Kannamma",
    "artist": "G. V. Prakash Kumar, Dhanush",
    "album": "Kara",
    "duration": 244,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kannamma_En_Kannamma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kannamma_En_Kannamma.jpg"
  },
  {
    "id": 140,
    "title": "Kanney",
    "artist": "Abishek Ar., Jovita Livingston, Dravid Selvam",
    "album": "Pulse",
    "duration": 212,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kanney.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kanney.jpg"
  },
  {
    "id": 141,
    "title": "Kannukkulle",
    "artist": "Sharreth, Sarath Santosh, Haripriya, Muthamil RMS",
    "album": "Kadhal Kadhai Sollava",
    "duration": 178,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kannukkulle.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kannukkulle.jpg"
  },
  {
    "id": 142,
    "title": "Karuppa Kooda Va",
    "artist": "Sai Abhyankkar, V.M. Mahalingam",
    "album": "Karuppu",
    "duration": 250,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Karuppa_Kooda_Va.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Karuppa_Kooda_Va.jpg"
  },
  {
    "id": 143,
    "title": "Kasu Panam Extenden Minus 1",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 198,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kasu_Panam_Extenden_Minus_1.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kasu_Panam_Extenden_Minus_1.jpg"
  },
  {
    "id": 144,
    "title": "Kathara Kathara",
    "artist": "Aditya Ravindran, Gana Muthu, Santosh Sobhan, Manasa Varanasi",
    "album": "Couple Friendly",
    "duration": 170,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kathara_Kathara.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kathara_Kathara.jpg"
  },
  {
    "id": 145,
    "title": "Kaval Thurai En Nanban",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 41,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kaval_Thurai_En_Nanban.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kaval_Thurai_En_Nanban.jpg"
  },
  {
    "id": 146,
    "title": "Kidnapping Manners",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 122,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kidnapping_Manners.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kidnapping_Manners.jpg"
  },
  {
    "id": 147,
    "title": "Kirukku Sirukki",
    "artist": "Siddhu Kumar, Nalini Vittobane, ADK",
    "album": "Kirukku Sirukki (Indie)",
    "duration": 190,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kirukku_Sirukki.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kirukku_Sirukki.jpg"
  },
  {
    "id": 148,
    "title": "Kollazhagiye",
    "artist": "Aswin Krishna",
    "album": "Satan The Dark",
    "duration": 214,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kollazhagiye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kollazhagiye.jpg"
  },
  {
    "id": 149,
    "title": "Korean Family",
    "artist": "Sean Roldan, Vangal Pulla Vicky, Sublahshini",
    "album": "Con City",
    "duration": 234,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Korean_Family.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Korean_Family.jpg"
  },
  {
    "id": 150,
    "title": "Kothaga Jilley Juice",
    "artist": "Vijay Antony",
    "album": "Pookie",
    "duration": 125,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kothaga_Jilley_Juice.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kothaga_Jilley_Juice.jpg"
  },
  {
    "id": 151,
    "title": "KRR Theme",
    "artist": "Harris Jayaraj",
    "album": "Kadhal Reset Repeat (KRR)",
    "duration": 124,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/KRR_Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/KRR_Theme.jpg"
  },
  {
    "id": 152,
    "title": "Kulkanth Kumar",
    "artist": "Darbuka Siva, Premgi Amaren",
    "album": "TN 2026 Thanga Natchathiram",
    "duration": 212,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kulkanth_Kumar.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kulkanth_Kumar.jpg"
  },
  {
    "id": 153,
    "title": "Kural",
    "artist": "Aswin Krishna, Chinmayi",
    "album": "Satan The Dark",
    "duration": 235,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kural.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kural.jpg"
  },
  {
    "id": 154,
    "title": "Kuru Kuru",
    "artist": "Ramanujan Mk, Chinna Ponnu, Anthony Dasan, Hriday Goswami, Jeevan Joy",
    "album": "Carmeni Selvam",
    "duration": 158,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Kuru_Kuru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Kuru_Kuru.jpg"
  },
  {
    "id": 155,
    "title": "Laali Laali",
    "artist": "Thaman S, Sruthi Ranjani",
    "album": "S.Saraswathi",
    "duration": 235,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Laali_Laali.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Laali_Laali.jpg"
  },
  {
    "id": 156,
    "title": "Leader Glimpse Theme",
    "artist": "Ghibran",
    "album": "Leader",
    "duration": 85,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Leader_Glimpse_Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Leader_Glimpse_Theme.jpg"
  },
  {
    "id": 157,
    "title": "Leader Stroke (Instrumental)",
    "artist": "Ghibran",
    "album": "Leader",
    "duration": 143,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Leader_Stroke_(Instrumental).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Leader_Stroke_(Instrumental).jpg"
  },
  {
    "id": 158,
    "title": "Level Up",
    "artist": "Shankar Ehsaan Loy, Kiran Biju, Aswath Ajith, Naveen Bharathi",
    "album": "Chatha Pacha: The Ring Of Rowdies",
    "duration": 267,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Level_Up.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Level_Up.jpg"
  },
  {
    "id": 159,
    "title": "Life Myth Breaks",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 96,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Life_Myth_Breaks.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Life_Myth_Breaks.jpg"
  },
  {
    "id": 160,
    "title": "Life of Monisha",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 70,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Life_of_Monisha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Life_of_Monisha.jpg"
  },
  {
    "id": 161,
    "title": "Love Advice Song",
    "artist": "Vijay Antony",
    "album": "Pookie",
    "duration": 209,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Love_Advice_Song.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Love_Advice_Song.jpg"
  },
  {
    "id": 162,
    "title": "Loveah Sollitalea",
    "artist": "G. V. Prakash Kumar, Ken Karunaas",
    "album": "Youth",
    "duration": 181,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Loveah_Sollitalea.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Loveah_Sollitalea.jpg"
  },
  {
    "id": 163,
    "title": "Maatikitaan Minorkunju",
    "artist": "Nivas K Prasanna, Sublahshini, Alex Samuel Jenito",
    "album": "Thaai Kizhavi",
    "duration": 234,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Maatikitaan_Minorkunju.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Maatikitaan_Minorkunju.jpg"
  },
  {
    "id": 164,
    "title": "Maaya Kanavo",
    "artist": "Balaji Sriram, Kapil Kapilan, Chinmayi Sripada",
    "album": "Nooru Saami",
    "duration": 247,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Maaya_Kanavo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Maaya_Kanavo.jpg"
  },
  {
    "id": 165,
    "title": "Machi Nee Paadu Daa",
    "artist": "Sri, Deva",
    "album": "Madharas Mafia Company",
    "duration": 238,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Machi_Nee_Paadu_Daa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Machi_Nee_Paadu_Daa.jpg"
  },
  {
    "id": 166,
    "title": "Magaraasi",
    "artist": "AK Prriyan, Sithan Jayamoorthy",
    "album": "Manithan Deivamagalam",
    "duration": 214,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Magaraasi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Magaraasi.jpg"
  },
  {
    "id": 167,
    "title": "Majako Mallika",
    "artist": "B. Ajaneesh Loknath, Deepak Blue, Rita Thyagarajan, Harishprakash M",
    "album": "Kattalan",
    "duration": 218,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Majako_Mallika.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Majako_Mallika.jpg"
  },
  {
    "id": 168,
    "title": "Mama Douser Extended Version",
    "artist": "Santhosh Narayanan, Ananya Bhat",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 209,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Mama_Douser_Extended_Version.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Mama_Douser_Extended_Version.jpg"
  },
  {
    "id": 169,
    "title": "Mama Douser",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 207,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Mama_Douser.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Mama_Douser.jpg"
  },
  {
    "id": 170,
    "title": "Manadhiley",
    "artist": "Nivas K Prasanna, Alex Samuel Jenito",
    "album": "Thaai Kizhavi",
    "duration": 285,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Manadhiley.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Manadhiley.jpg"
  },
  {
    "id": 171,
    "title": "Manasatchi",
    "artist": "L.V.Muthu Ganesh, Ananthu",
    "album": "Maragatha Malai",
    "duration": 198,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Manasatchi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Manasatchi.jpg"
  },
  {
    "id": 172,
    "title": "Manasu Valikithu",
    "artist": "Vijay Antony, Kharesma Ravichandran",
    "album": "Pookie",
    "duration": 214,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Manasu_Valikithu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Manasu_Valikithu.jpg"
  },
  {
    "id": 173,
    "title": "Mansion Kuthu",
    "artist": "Sean Roldan, Anthony Daasan",
    "album": "29",
    "duration": 225,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Mansion_Kuthu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Mansion_Kuthu.jpg"
  },
  {
    "id": 174,
    "title": "Marandhu Poche",
    "artist": "Sean Roldan, Adithya RK, Madhan",
    "album": "With Love",
    "duration": 197,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Marandhu_Poche.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Marandhu_Poche.jpg"
  },
  {
    "id": 175,
    "title": "Maruvaati",
    "artist": "Wasim R",
    "album": "Maruvaati (Indie)",
    "duration": 150,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Maruvaati.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Maruvaati.jpg"
  },
  {
    "id": 176,
    "title": "Massa Massa",
    "artist": "A.R.Rahman, Adithya RK",
    "album": "Peddi",
    "duration": 222,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Massa_Massa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Massa_Massa.jpg"
  },
  {
    "id": 177,
    "title": "Medhuvaai Medhuvaai",
    "artist": "Hesham Abdul Wahab, Sharwanand, Malvika Nair",
    "album": "Biker",
    "duration": 261,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Medhuvaai_Medhuvaai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Medhuvaai_Medhuvaai.jpg"
  },
  {
    "id": 178,
    "title": "Meeing at the Cafe",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 51,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Meeing_at_the_Cafe.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Meeing_at_the_Cafe.jpg"
  },
  {
    "id": 179,
    "title": "Meenduma?",
    "artist": "Hesham Abdul Wahab, Aavani Malhar",
    "album": "Once More",
    "duration": 154,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Meenduma_-.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Meenduma_-.jpg"
  },
  {
    "id": 180,
    "title": "Mella Melody",
    "artist": "Pranesh, Arjun",
    "album": "Mella Melody (Indie)",
    "duration": 160,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Mella_Melody.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Mella_Melody.jpg"
  },
  {
    "id": 181,
    "title": "Mellamai",
    "artist": "Vijay Antony, Shibi Srinivasan, Rukhsar Bandhukia",
    "album": "Pookie",
    "duration": 272,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Mellamai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Mellamai.jpg"
  },
  {
    "id": 182,
    "title": "Michael's Ice Cream",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Michael's_Ice_Cream.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Michael's_Ice_Cream.jpg"
  },
  {
    "id": 183,
    "title": "Milirum Oliye",
    "artist": "A.R.Rahman, Mohammed Aslam",
    "album": "Gandhi Talks",
    "duration": 255,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Milirum_Oliye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Milirum_Oliye.jpg"
  },
  {
    "id": 184,
    "title": "Minmini Penne",
    "artist": "Sam C.S., Kapil Kapilan",
    "album": "Kaalidas 2",
    "duration": 170,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/songs/Minmini_Penne.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_1@main/covers/Minmini_Penne.jpg"
  },
  {
    "id": 185,
    "title": "Minnal Adikudhadi",
    "artist": "Sam C.S., Adithya RK",
    "album": "Double Occupancy",
    "duration": 243,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Minnal_Adikudhadi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Minnal_Adikudhadi.jpg"
  },
  {
    "id": 186,
    "title": "Minnal Polave Minnuthe Nenjile",
    "artist": "Thaman S, Yamini Ghantasala",
    "album": "S.Saraswathi",
    "duration": 318,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Minnal_Polave_Minnuthe_Nenjile.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Minnal_Polave_Minnuthe_Nenjile.jpg"
  },
  {
    "id": 187,
    "title": "Miss Oruthi",
    "artist": "Naresh Iyer",
    "album": "Once More",
    "duration": 272,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Miss-Oruthi-.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Miss-Oruthi-.jpg"
  },
  {
    "id": 188,
    "title": "Monisha and Balaji",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 111,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Monisha_and_Balaji.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Monisha_and_Balaji.jpg"
  },
  {
    "id": 189,
    "title": "Monisha the Gangsta",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 51,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Monisha_the_Gangsta.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Monisha_the_Gangsta.jpg"
  },
  {
    "id": 190,
    "title": "Monisha visits Sathya",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 63,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Monisha_visits_Sathya.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Monisha_visits_Sathya.jpg"
  },
  {
    "id": 191,
    "title": "Monisha's Dad",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 54,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Monisha's_Dad.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Monisha's_Dad.jpg"
  },
  {
    "id": 192,
    "title": "Monisha's Entry",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Monisha's_Entry.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Monisha's_Entry.jpg"
  },
  {
    "id": 193,
    "title": "Monisha's Story Ends",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 64,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Monisha's_Story_Ends.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Monisha's_Story_Ends.jpg"
  },
  {
    "id": 194,
    "title": "Monisha's Tragedy",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 139,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Monisha's_Tragedy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Monisha's_Tragedy.jpg"
  },
  {
    "id": 195,
    "title": "Morattu Muttal",
    "artist": "Sean Roldan, Mohan Rajan",
    "album": "With Love",
    "duration": 166,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Morattu_Muttal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Morattu_Muttal.jpg"
  },
  {
    "id": 196,
    "title": "Mosquito Man",
    "artist": "Kharesma Ravichandran",
    "album": "Pookie",
    "duration": 181,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Mosquito_Man.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Mosquito_Man.jpg"
  },
  {
    "id": 197,
    "title": "Mr.X Origins",
    "artist": "Dhibu Ninan Thomas, Namita Anand",
    "album": "Mr. X",
    "duration": 97,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Mr.X_Origins.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Mr.X_Origins.jpg"
  },
  {
    "id": 198,
    "title": "Mudhal Mudhalaai",
    "artist": "Adithya",
    "album": "Mudhal Mudhalaai (Indie)",
    "duration": 272,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Mudhal_Mudhalaai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Mudhal_Mudhalaai.jpg"
  },
  {
    "id": 199,
    "title": "Munneru Munneru",
    "artist": "Ghibran, Sundar Narayana Rao, Sharwanand, Malvika Nair",
    "album": "Biker",
    "duration": 280,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Munneru_Munneru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Munneru_Munneru.jpg"
  },
  {
    "id": 200,
    "title": "Mutta Kalakki",
    "artist": "G. V. Prakash Kumar, Ken Karunaas",
    "album": "Youth",
    "duration": 166,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Mutta_Kalakki.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Mutta_Kalakki.jpg"
  },
  {
    "id": 201,
    "title": "Naa Vera Level",
    "artist": "Kidd Santhe, Raavanaa Ram",
    "album": "Naa Vera Level (Indie)",
    "duration": 199,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Naa_Vera_Level.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Naa_Vera_Level.jpg"
  },
  {
    "id": 202,
    "title": "Naan Dhaan King",
    "artist": "Sean Roldan, Kelithee, Lalitha Sudha",
    "album": "Con City",
    "duration": 246,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Naan_Dhaan_King.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Naan_Dhaan_King.jpg"
  },
  {
    "id": 203,
    "title": "Naan Veezhven Endru Ninaithaiyo",
    "artist": "Girishh G",
    "album": "Sattendru Maarudhu Vaanilai",
    "duration": 247,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Naan_Veezhven_Endru_Ninaithaiyo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Naan_Veezhven_Endru_Ninaithaiyo.jpg"
  },
  {
    "id": 204,
    "title": "Naanga Naalu Peru",
    "artist": "Sai Abhyankkar, Silambarasan Tr",
    "album": "Karuppu",
    "duration": 197,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Naanga_Naalu_Peru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Naanga_Naalu_Peru.jpg"
  },
  {
    "id": 205,
    "title": "Naattile Rowdies",
    "artist": "Shankar Ehsaan Loy, Manuvardhan CS, Naveen Bharathi",
    "album": "Chatha Pacha: The Ring Of Rowdies",
    "duration": 222,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Naattile_Rowdies.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Naattile_Rowdies.jpg"
  },
  {
    "id": 206,
    "title": "Nee Naan",
    "artist": "Kapil Kapilan, Santosh Sobhan, Manasa Varanasi",
    "album": "Couple Friendly",
    "duration": 148,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Nee_Naan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Nee_Naan.jpg"
  },
  {
    "id": 207,
    "title": "Nee Parandhaayo",
    "artist": "Sam C.S.",
    "album": "Exam (Web Series)",
    "duration": 140,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Nee_Parandhaayo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Nee_Parandhaayo.jpg"
  },
  {
    "id": 208,
    "title": "Nee Saaral",
    "artist": "Jen Martin, Sublahshini",
    "album": "Wife",
    "duration": 188,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Nee_Saaral.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Nee_Saaral.jpg"
  },
  {
    "id": 209,
    "title": "Neel Vaaname",
    "artist": "Shakthisree Gopalan, Santosh Sobhan, Manasa Varanasi",
    "album": "Couple Friendly",
    "duration": 204,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Neel_Vaaname.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Neel_Vaaname.jpg"
  },
  {
    "id": 210,
    "title": "Neeroda",
    "artist": "Sathyan Ilanko",
    "album": "Neeroda (Indie)",
    "duration": 179,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Neeroda.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Neeroda.jpg"
  },
  {
    "id": 211,
    "title": "Neeyum Naanum",
    "artist": "Sam C.S., Vijaynarain",
    "album": "Habeebi",
    "duration": 267,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Neeyum_Naanum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Neeyum_Naanum.jpg"
  },
  {
    "id": 212,
    "title": "Nenjagathi",
    "artist": "Sean Roldan, Vijaynarain",
    "album": "29",
    "duration": 239,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Nenjagathi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Nenjagathi.jpg"
  },
  {
    "id": 213,
    "title": "Nenjam",
    "artist": "Ghibran, Shweta Mohan, Kapil Kapilan",
    "album": "Leader",
    "duration": 268,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Nenjam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Nenjam.jpg"
  },
  {
    "id": 214,
    "title": "Nenjile",
    "artist": "Shankar Ehsaan Loy, Afsal, Vaira Bharathi",
    "album": "Chatha Pacha: The Ring Of Rowdies",
    "duration": 200,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Nenjile.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Nenjile.jpg"
  },
  {
    "id": 215,
    "title": "Nenjukulla Vaadi",
    "artist": "Saindhavi, Aravind Karneeswaran",
    "album": "Manithan Deivamagalam",
    "duration": 223,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Nenjukulla_Vaadi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Nenjukulla_Vaadi.jpg"
  },
  {
    "id": 216,
    "title": "Neraya Vidhyasam Irukku",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 73,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Neraya_Vidhyasam_Irukku.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Neraya_Vidhyasam_Irukku.jpg"
  },
  {
    "id": 217,
    "title": "Nerungatta",
    "artist": "Aditya Ravindran, Santosh Sobhan, Manasa Varanasi",
    "album": "Couple Friendly",
    "duration": 185,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Nerungatta.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Nerungatta.jpg"
  },
  {
    "id": 218,
    "title": "New Year Song",
    "artist": "Sam C.S., Shweta Mohan",
    "album": "Kaalidas 2",
    "duration": 189,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/New_Year_Song.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/New_Year_Song.jpg"
  },
  {
    "id": 219,
    "title": "News Paper",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 53,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/News_Paper.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/News_Paper.jpg"
  },
  {
    "id": 220,
    "title": "Next Eppo Meet Pannalam?",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 49,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Next_Eppo_Meet_Pannalam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Next_Eppo_Meet_Pannalam.jpg"
  },
  {
    "id": 221,
    "title": "Nilave",
    "artist": "Abishek Ar., Dravid Selvam",
    "album": "Pulse",
    "duration": 212,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Nilave.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Nilave.jpg"
  },
  {
    "id": 222,
    "title": "Oar Thoorale",
    "artist": "Aditya Ravindran, Santosh Sobhan, Manasa Varanasi",
    "album": "Couple Friendly",
    "duration": 172,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Oar_Thoorale.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Oar_Thoorale.jpg"
  },
  {
    "id": 223,
    "title": "Oh My God",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 62,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Oh_My_God.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Oh_My_God.jpg"
  },
  {
    "id": 224,
    "title": "Oru Nodi",
    "artist": "Rajesh Murugesan, Anand Aravindakshan",
    "album": "Heartin",
    "duration": 239,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Oru_Nodi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Oru_Nodi.jpg"
  },
  {
    "id": 225,
    "title": "Othaiyadi",
    "artist": "Nivas K Prasanna",
    "album": "Kenatha Kanom",
    "duration": 222,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Othaiyadi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Othaiyadi.jpg"
  },
  {
    "id": 226,
    "title": "Padharudhu",
    "artist": "M.S.Jones Rupert",
    "album": "Mustafa Mustafa",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Padharudhu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Padharudhu.jpg"
  },
  {
    "id": 227,
    "title": "Pappali Pazhamey",
    "artist": "Hiphop Tamizha, Gana Vinoth, Gana Ulagam Dharani",
    "album": "Meesaya Murukku 2",
    "duration": 206,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pappali_Pazhamey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pappali_Pazhamey.jpg"
  },
  {
    "id": 228,
    "title": "Paranthene Penne",
    "artist": "G. V. Prakash Kumar, Ken Karunaas, Sony Daffodil",
    "album": "Youth",
    "duration": 171,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Paranthene_Penne.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Paranthene_Penne.jpg"
  },
  {
    "id": 229,
    "title": "Pathu Kadal",
    "artist": "Sean Roldan, Srilakshmi Belmannu",
    "album": "My Lord",
    "duration": 193,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pathu_Kadal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pathu_Kadal.jpg"
  },
  {
    "id": 230,
    "title": "Pattuma",
    "artist": "Anirudh Ravichander, Ananthakrrishnan",
    "album": "Love Insurance Kompany (LIK)",
    "duration": 209,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pattuma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pattuma.jpg"
  },
  {
    "id": 231,
    "title": "Pavazha Malli Unplugged",
    "artist": "Sai Abhyankkar, Shruti Haasan",
    "album": "Pavazha Malli (Indie)",
    "duration": 80,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pavazha_Malli_Unplugged.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pavazha_Malli_Unplugged.jpg"
  },
  {
    "id": 232,
    "title": "Pavazha Malli",
    "artist": "Sai Abhyankkar, Shruti Haasan",
    "album": "Pavazha Malli (Indie)",
    "duration": 252,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pavazha_Malli.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pavazha_Malli.jpg"
  },
  {
    "id": 233,
    "title": "Payaname",
    "artist": "Anup Rubens, S.P. Charan",
    "album": "Seetha Payanam",
    "duration": 264,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Payaname.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Payaname.jpg"
  },
  {
    "id": 234,
    "title": "Peekachu",
    "artist": "Arsh, Vallavan",
    "album": "Peekachu (Indie)",
    "duration": 171,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Peekachu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Peekachu.jpg"
  },
  {
    "id": 235,
    "title": "Perambur Gaana",
    "artist": "Bakkiyam Sankar, Bharath Sankar, Jassie Gift",
    "album": "Anbe Diana",
    "duration": 233,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Perambur_Gaana.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Perambur_Gaana.jpg"
  },
  {
    "id": 236,
    "title": "Poga Poga",
    "artist": "G. V. Prakash Kumar, Vineeth Sreenivasan",
    "album": "Youth",
    "duration": 212,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Poga_Poga.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Poga_Poga.jpg"
  },
  {
    "id": 237,
    "title": "Pogaadhe",
    "artist": "Vaisakh Somanath, Kapil Kapilan",
    "album": "Oh Butterfly!",
    "duration": 252,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pogaadhe.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pogaadhe.jpg"
  },
  {
    "id": 238,
    "title": "Polladha Aasaigal",
    "artist": "Sean Roldan, Sathyaprakash, Saindhavi",
    "album": "29",
    "duration": 234,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Polladha_Aasaigal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Polladha_Aasaigal.jpg"
  },
  {
    "id": 239,
    "title": "Ponmaaney",
    "artist": "G. V. Prakash Kumar, Aavani Malhar",
    "album": "Youth",
    "duration": 206,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Ponmaaney.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Ponmaaney.jpg"
  },
  {
    "id": 240,
    "title": "Poo Paadal",
    "artist": "Sean Roldan, Ravi G",
    "album": "29",
    "duration": 139,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Poo_Paadal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Poo_Paadal.jpg"
  },
  {
    "id": 241,
    "title": "Pookattum",
    "artist": "Anirudh Ravichander, Bhumi",
    "album": "Love Insurance Kompany (LIK)",
    "duration": 250,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pookattum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pookattum.jpg"
  },
  {
    "id": 242,
    "title": "Pooththa Poovum Arumbiduma",
    "artist": "Jagankalyan, Saindhavi",
    "album": "Karumpulli Gramam",
    "duration": 259,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pooththa_Poovum_Arumbiduma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pooththa_Poovum_Arumbiduma.jpg"
  },
  {
    "id": 243,
    "title": "Poyi Vaadi",
    "artist": "Vishnu Vijay, Shakthisree Gopalan",
    "album": "Thalaivar Thambi Thalaimaiyil (TTT)",
    "duration": 182,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Poyi_Vaadi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Poyi_Vaadi.jpg"
  },
  {
    "id": 244,
    "title": "Pretty Baby",
    "artist": "Ghibran, Yazin Nizar, Sublahshini, Sharwanand, Malvika Nair",
    "album": "Biker",
    "duration": 197,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pretty_Baby.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pretty_Baby.jpg"
  },
  {
    "id": 245,
    "title": "Psilo Vibin",
    "artist": "Paal Dabba, Foxn",
    "album": "Psilo Vibin (Indie)",
    "duration": 143,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Psilo_Vibin.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Psilo_Vibin.jpg"
  },
  {
    "id": 246,
    "title": "Pudikadhu",
    "artist": "Sharreth, Nivas, Kavi Varman",
    "album": "Kadhal Kadhai Sollava",
    "duration": 179,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pudikadhu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pudikadhu.jpg"
  },
  {
    "id": 247,
    "title": "Pudikaley Pudikaley",
    "artist": "Vijay Antony, Santosh Hariharan, Rukhsar Bandhukia",
    "album": "Pookie",
    "duration": 249,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Pudikaley_Pudikaley.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Pudikaley_Pudikaley.jpg"
  },
  {
    "id": 248,
    "title": "Raasathi Raasa",
    "artist": "Sean Roldan, V.M. Mahalingam, Muthu Sirpi",
    "album": "My Lord",
    "duration": 225,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Raasathi_Raasa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Raasathi_Raasa.jpg"
  },
  {
    "id": 249,
    "title": "Raathu Raasan",
    "artist": "Sai Abhyankkar, V.M. Mahalingam, Paal Dabba",
    "album": "Karuppu",
    "duration": 195,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Raathu_Raasan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Raathu_Raasan.jpg"
  },
  {
    "id": 250,
    "title": "Raga of Revenge",
    "artist": "Anirudh Ravichander",
    "album": "DC",
    "duration": 131,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Raga_of_Revenge.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Raga_of_Revenge.jpg"
  },
  {
    "id": 251,
    "title": "Rai Rai Raa Raa",
    "artist": "A.R.Rahman, Yugendran Vasudevan",
    "album": "Peddi",
    "duration": 266,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Rai_Rai_Raa_Raa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Rai_Rai_Raa_Raa.jpg"
  },
  {
    "id": 252,
    "title": "Ram Nami",
    "artist": "Ghibran, Shenbagaraj Ganesalingam, Narayanan Ravishankar, Sudharsan Ram",
    "album": "Draupathi 2",
    "duration": 171,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Ram_Nami.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Ram_Nami.jpg"
  },
  {
    "id": 253,
    "title": "Rangalala",
    "artist": "Sri, Priya Hemesh",
    "album": "Madharas Mafia Company",
    "duration": 207,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Rangalala.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Rangalala.jpg"
  },
  {
    "id": 254,
    "title": "Rap Battle",
    "artist": "Britto Michael, MC Rude, Mj Suriya, Vj Vijay",
    "album": "Dashamakan",
    "duration": 325,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Rap_Battle.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Rap_Battle.jpg"
  },
  {
    "id": 255,
    "title": "Reengara",
    "artist": "Balaji Sriram, Anurag Kulkarni, Darini Hariharan",
    "album": "Nooru Saami",
    "duration": 221,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Reengara.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Reengara.jpg"
  },
  {
    "id": 256,
    "title": "Revival Of Pulse",
    "artist": "Abishek Ar.",
    "album": "Pulse",
    "duration": 97,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Revival_Of_Pulse.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Revival_Of_Pulse.jpg"
  },
  {
    "id": 257,
    "title": "Romance",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 31,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Romance.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Romance.jpg"
  },
  {
    "id": 258,
    "title": "Roohe Roohe",
    "artist": "Sam C.S., Shweta Mohan, Kapil Kapilan, Rizwan Sha",
    "album": "Habeebi",
    "duration": 292,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Roohe_Roohe.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Roohe_Roohe.jpg"
  },
  {
    "id": 259,
    "title": "Rosave",
    "artist": "Vishnu Vijay, Kapil Kapilan",
    "album": "Thalaivar Thambi Thalaimaiyil (TTT)",
    "duration": 177,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Rosave.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Rosave.jpg"
  },
  {
    "id": 260,
    "title": "Rose Illaa Jack",
    "artist": "Nash te Naaku",
    "album": "Rose Illaa Jack (Indie)",
    "duration": 169,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Rose_Illaa_Jack.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Rose_Illaa_Jack.jpg"
  },
  {
    "id": 261,
    "title": "Rules and Regulations",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 53,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Rules_and_Regulations.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Rules_and_Regulations.jpg"
  },
  {
    "id": 262,
    "title": "Rummy Rummy",
    "artist": "A.R.Rahman, Khatija Rahman",
    "album": "Gandhi Talks",
    "duration": 210,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Rummy_Rummy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Rummy_Rummy.jpg"
  },
  {
    "id": 263,
    "title": "Sa Ga",
    "artist": "Santhosh Narayanan, Phil Hartl, Phil Hartl",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 109,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sa_Ga.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sa_Ga.jpg"
  },
  {
    "id": 264,
    "title": "Saaikaathey",
    "artist": "Abishek Ar., Kapil Kapilan, Nawin Ghanesh",
    "album": "Pulse",
    "duration": 190,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Saaikaathey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Saaikaathey.jpg"
  },
  {
    "id": 265,
    "title": "Sambavakaari",
    "artist": "Sean Roldan, Saindhavi",
    "album": "Gatta Kusthi 2",
    "duration": 239,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sambavakaari.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sambavakaari.jpg"
  },
  {
    "id": 266,
    "title": "Sarkarey Solliruchu",
    "artist": "S.P. Charan, Mukesh Mohamed",
    "album": "Lenin Pandiyan",
    "duration": 277,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sarkarey_Solliruchu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sarkarey_Solliruchu.jpg"
  },
  {
    "id": 267,
    "title": "Sathya Wakes Up",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 37,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sathya_Wakes_Up.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sathya_Wakes_Up.jpg"
  },
  {
    "id": 268,
    "title": "Sathya's Gift to Anisha",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 88,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sathya's_Gift_to_Anisha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sathya's_Gift_to_Anisha.jpg"
  },
  {
    "id": 269,
    "title": "Sathya's Routine",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 64,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sathya's_Routine.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sathya's_Routine.jpg"
  },
  {
    "id": 270,
    "title": "Sattaiyila Button Illa",
    "artist": "Pranav Muniraj, Pravekha",
    "album": "Sattaiyila Button Illa (Indie)",
    "duration": 177,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sattaiyila_Button_Illa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sattaiyila_Button_Illa.jpg"
  },
  {
    "id": 271,
    "title": "Sattendru Maarudhu Vaanilai",
    "artist": "Girishh G, Shreya Ghoshal, M.S Krsna",
    "album": "Sattendru Maarudhu Vaanilai",
    "duration": 220,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sattendru_Maarudhu_Vaanilai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sattendru_Maarudhu_Vaanilai.jpg"
  },
  {
    "id": 272,
    "title": "Sattu Buttu",
    "artist": "Foxn, Sublahshini",
    "album": "Parimala and Co",
    "duration": 184,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sattu_Buttu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sattu_Buttu.jpg"
  },
  {
    "id": 273,
    "title": "Seelay Seelay (Karaoke)",
    "artist": "Sean Roldan",
    "album": "29",
    "duration": 307,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Seelay_Seelay_(Karaoke).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Seelay_Seelay_(Karaoke).jpg"
  },
  {
    "id": 274,
    "title": "Seelay Seelay",
    "artist": "Sean Roldan, Chinmayi",
    "album": "29",
    "duration": 307,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Seelay_Seelay.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Seelay_Seelay.jpg"
  },
  {
    "id": 275,
    "title": "Seerum Puli",
    "artist": "Ghibran, Narayanan Ravishankar, Vikram Pitty, Shridhar Ramesh",
    "album": "Leader",
    "duration": 192,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Seerum_Puli.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Seerum_Puli.jpg"
  },
  {
    "id": 276,
    "title": "Sema Pasi",
    "artist": "M.S.Jones Rupert, Sathish, Aishwarya Murali",
    "album": "Mustafa Mustafa",
    "duration": 169,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sema_Pasi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sema_Pasi.jpg"
  },
  {
    "id": 277,
    "title": "Shalu",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 86,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Shalu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Shalu.jpg"
  },
  {
    "id": 278,
    "title": "Sigma Style",
    "artist": "Thaman S",
    "album": "Sigma",
    "duration": 206,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sigma_Style.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sigma_Style.jpg"
  },
  {
    "id": 279,
    "title": "Sir Ah Paaru Thaaru Maaru",
    "artist": "M.S.Jones Rupert, Anthony Dasan, Deepthi Suresh, Shenbagaraj Ganesalingam",
    "album": "Mustafa Mustafa",
    "duration": 259,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sir_Ah_Paaru_Thaaru_Maaru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sir_Ah_Paaru_Thaaru_Maaru.jpg"
  },
  {
    "id": 280,
    "title": "Sotthu Pala",
    "artist": "Sri, Narayanan Ravishankar",
    "album": "Madharas Mafia Company",
    "duration": 151,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Sotthu_Pala.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Sotthu_Pala.jpg"
  },
  {
    "id": 281,
    "title": "Start With Love",
    "artist": "Sean Roldan",
    "album": "With Love",
    "duration": 57,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Start_With_Love.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Start_With_Love.jpg"
  },
  {
    "id": 282,
    "title": "Stranger in a new town",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 37,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Stranger_in_a_new_town.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Stranger_in_a_new_town.jpg"
  },
  {
    "id": 283,
    "title": "Suzhal",
    "artist": "Vaisakh Somanath, Vaikom Vijayalakshmi",
    "album": "Oh Butterfly!",
    "duration": 165,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Suzhal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Suzhal.jpg"
  },
  {
    "id": 284,
    "title": "Swaminathan Gets Slapped",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Swaminathan_Gets_Slapped.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Swaminathan_Gets_Slapped.jpg"
  },
  {
    "id": 285,
    "title": "Symphony Of Shadows",
    "artist": "Aswin Krishna",
    "album": "Satan The Dark",
    "duration": 132,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Symphony_Of_Shadows.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Symphony_Of_Shadows.jpg"
  },
  {
    "id": 286,
    "title": "Tabaahi",
    "artist": "Vishal Mishra",
    "album": "Toxic",
    "duration": 257,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Tabaahi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Tabaahi.jpg"
  },
  {
    "id": 287,
    "title": "Tarasuki Ram",
    "artist": "Ghibran, Gold Devaraj, Guru Hariraj",
    "album": "Draupathi 2",
    "duration": 199,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Tarasuki_Ram.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Tarasuki_Ram.jpg"
  },
  {
    "id": 288,
    "title": "Team Spirit Guru Payirchi",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 68,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Team_Spirit_Guru_Payirchi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Team_Spirit_Guru_Payirchi.jpg"
  },
  {
    "id": 289,
    "title": "Thaai Kizhavi Vaaraa",
    "artist": "Nivas K Prasanna, Sivakarthikeyan",
    "album": "Thaai Kizhavi",
    "duration": 278,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thaai_Kizhavi_Vaaraa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thaai_Kizhavi_Vaaraa.jpg"
  },
  {
    "id": 290,
    "title": "Thaai Paatu",
    "artist": "Sam C.S.",
    "album": "Exam (Web Series)",
    "duration": 124,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thaai_Paatu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thaai_Paatu.jpg"
  },
  {
    "id": 291,
    "title": "Thaaraga Thugalaa",
    "artist": "Aswin Krishna, Adithya RK, Ramya Ramc",
    "album": "Satan The Dark",
    "duration": 248,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thaaraga_Thugalaa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thaaraga_Thugalaa.jpg"
  },
  {
    "id": 292,
    "title": "Thaazham Poove",
    "artist": "G. V. Prakash Kumar, Saindhavi",
    "album": "Kara",
    "duration": 192,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thaazham_Poove.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thaazham_Poove.jpg"
  },
  {
    "id": 293,
    "title": "Thaka Thakita",
    "artist": "L.V.Muthu Ganesh, Chinmayi Sripaada",
    "album": "Maragatha Malai",
    "duration": 237,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thaka_Thakita.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thaka_Thakita.jpg"
  },
  {
    "id": 294,
    "title": "Thalaivarey",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 67,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thalaivarey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thalaivarey.jpg"
  },
  {
    "id": 295,
    "title": "Thanga Magan",
    "artist": "G. V. Prakash Kumar, Haricharan, Sruthy Sivadas",
    "album": "Youth",
    "duration": 59,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thanga_Magan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thanga_Magan.jpg"
  },
  {
    "id": 296,
    "title": "Thangame Thangame",
    "artist": "Thaman S, D Dheeraj",
    "album": "Idhayam Murali",
    "duration": 303,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thangame-Thangame-.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thangame-Thangame-.jpg"
  },
  {
    "id": 297,
    "title": "Thangarathinamey",
    "artist": "AK Prriyan, Shibi Srinivasan, Padmaja Srinivasan, Jothy",
    "album": "Manithan Deivamagalam",
    "duration": 182,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thangarathinamey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thangarathinamey.jpg"
  },
  {
    "id": 298,
    "title": "Thara Thara",
    "artist": "M.S.Jones Rupert, G. V. Prakash Kumar",
    "album": "Mustafa Mustafa",
    "duration": 214,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thara_Thara.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thara_Thara.jpg"
  },
  {
    "id": 299,
    "title": "Thattaan Chirage",
    "artist": "Sam C.S.",
    "album": "Exam (Web Series)",
    "duration": 144,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thattaan_Chirage.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thattaan_Chirage.jpg"
  },
  {
    "id": 300,
    "title": "The Birthday Gift",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 33,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/The_Birthday_Gift.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/The_Birthday_Gift.jpg"
  },
  {
    "id": 301,
    "title": "The butterfly theme",
    "artist": "Vaisakh Somanath, Shakthisree Gopalan, Nanda J. Devan",
    "album": "Oh Butterfly!",
    "duration": 242,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/The_butterfly_theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/The_butterfly_theme.jpg"
  },
  {
    "id": 302,
    "title": "The Handshake",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 39,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/The_Handshake.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/The_Handshake.jpg"
  },
  {
    "id": 303,
    "title": "The Hunter Anthem",
    "artist": "Nihal Sadiq, Munz TDT, SVDP, Hanan Shah",
    "album": "Kattalan",
    "duration": 234,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/The_Hunter_Anthem.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/The_Hunter_Anthem.jpg"
  },
  {
    "id": 304,
    "title": "The Life",
    "artist": "Ravi Basrur, Vaikom Vijayalakshmi",
    "album": "Blast",
    "duration": 242,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/The_Life.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/The_Life.jpg"
  },
  {
    "id": 305,
    "title": "The Lone Wolf",
    "artist": "Dhibu Ninan Thomas",
    "album": "Mr. X",
    "duration": 118,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/The_Lone_Wolf.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/The_Lone_Wolf.jpg"
  },
  {
    "id": 306,
    "title": "The Marriage",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 48,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/The_Marriage.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/The_Marriage.jpg"
  },
  {
    "id": 307,
    "title": "The Name is Kara",
    "artist": "G. V. Prakash Kumar",
    "album": "Kara",
    "duration": 33,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/The_Name_is_Kara.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/The_Name_is_Kara.jpg"
  },
  {
    "id": 308,
    "title": "The Prelude for a Proposal",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 73,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/The_Prelude_for_a_Proposal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/The_Prelude_for_a_Proposal.jpg"
  },
  {
    "id": 309,
    "title": "The Rage",
    "artist": "Ravi Basrur, Rapper Ro",
    "album": "Blast",
    "duration": 225,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/The_Rage.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/The_Rage.jpg"
  },
  {
    "id": 310,
    "title": "Theedhu Theedhu",
    "artist": "Sam C.S.",
    "album": "Exam (Web Series)",
    "duration": 137,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Theedhu_Theedhu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Theedhu_Theedhu.jpg"
  },
  {
    "id": 311,
    "title": "Theera Theera",
    "artist": "Ghibran, Chinmayi Sripada, Haricharan",
    "album": "Leader",
    "duration": 211,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Theera_Theera.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Theera_Theera.jpg"
  },
  {
    "id": 312,
    "title": "Thenmerku",
    "artist": "M. Jayachandran, R. Sudharsan, Kavitha Ravi",
    "album": "Kadhal Kadhai Sollava",
    "duration": 97,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thenmerku.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thenmerku.jpg"
  },
  {
    "id": 313,
    "title": "Thiruvizha Paatu",
    "artist": "Sam C.S., Mukesh",
    "album": "Exam (Web Series)",
    "duration": 206,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thiruvizha_Paatu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thiruvizha_Paatu.jpg"
  },
  {
    "id": 314,
    "title": "Thoodhu Sellava",
    "artist": "M. Jayachandran, Srivardhani Kuchi, Kanmani Rajamohamed",
    "album": "Kadhal Kadhai Sollava",
    "duration": 243,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thoodhu_Sellava.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thoodhu_Sellava.jpg"
  },
  {
    "id": 315,
    "title": "Thottaai",
    "artist": "M. Jayachandran, Sharreth, Srivardhani Kuchi, Ka. Parthipan",
    "album": "Kadhal Kadhai Sollava",
    "duration": 215,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thottaai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thottaai.jpg"
  },
  {
    "id": 316,
    "title": "Thug Life Maadhar",
    "artist": "M.S.Jones Rupert",
    "album": "Mustafa Mustafa",
    "duration": 122,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thug_Life_Maadhar.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thug_Life_Maadhar.jpg"
  },
  {
    "id": 317,
    "title": "Thuppaki Vechirukken Sirikira",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 66,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thuppaki_Vechirukken_Sirikira.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thuppaki_Vechirukken_Sirikira.jpg"
  },
  {
    "id": 318,
    "title": "Thuru Thuru Mazhaiye",
    "artist": "Ghibran, Haricharan, Sharwanand, Malvika Nair",
    "album": "Biker",
    "duration": 201,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thuru_Thuru_Mazhaiye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thuru_Thuru_Mazhaiye.jpg"
  },
  {
    "id": 319,
    "title": "Thuru Thuru",
    "artist": "Justin Prabhakaran, Gangai Amaran, Master Jaahanv S",
    "album": "Happy Raj",
    "duration": 250,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Thuru_Thuru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Thuru_Thuru.jpg"
  },
  {
    "id": 320,
    "title": "Titanic",
    "artist": "SomeBoyZ, Saran Thiyagarajan",
    "album": "Titanic (Indie)",
    "duration": 175,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Titanic.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Titanic.jpg"
  },
  {
    "id": 321,
    "title": "Title Theme",
    "artist": "Sam C.S.",
    "album": "Kaalidas 2",
    "duration": 102,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Title_Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Title_Theme.jpg"
  },
  {
    "id": 322,
    "title": "Tomato Thakkali",
    "artist": "Foxn, Anthony Daasan",
    "album": "Parimala and Co",
    "duration": 122,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Tomato_Thakkali.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Tomato_Thakkali.jpg"
  },
  {
    "id": 323,
    "title": "Trichy Funk",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 60,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Trichy_Funk.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Trichy_Funk.jpg"
  },
  {
    "id": 324,
    "title": "TTT Title Track",
    "artist": "Vishnu Vijay, Arivu",
    "album": "Thalaivar Thambi Thalaimaiyil (TTT)",
    "duration": 150,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/TTT_Title_Track.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/TTT_Title_Track.jpg"
  },
  {
    "id": 325,
    "title": "Tururu",
    "artist": "Vaisakh Somanath, Haricharan",
    "album": "Oh Butterfly!",
    "duration": 216,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Tururu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Tururu.jpg"
  },
  {
    "id": 326,
    "title": "Tusker Lords",
    "artist": "Yuvan Shankar Raja",
    "album": "Aaranya Kaandam BGM (Original Background Score)",
    "duration": 57,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Tusker_Lords.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Tusker_Lords.jpg"
  },
  {
    "id": 327,
    "title": "TVK Campaign Song",
    "artist": "Vijay",
    "album": "TVK Campaign Song (Indie)",
    "duration": 387,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/TVK_Campaign_Song.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/TVK_Campaign_Song.jpg"
  },
  {
    "id": 328,
    "title": "Ulavum Dhegam",
    "artist": "Pradeep Kumar, Santosh Sobhan, Manasa Varanasi",
    "album": "Couple Friendly",
    "duration": 192,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Ulavum_Dhegam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Ulavum_Dhegam.jpg"
  },
  {
    "id": 329,
    "title": "Un Paarvai",
    "artist": "Harris Jayaraj, Vineeth Sreenivasan, Pragathi Guruprasad, GAYATHRY RAJIV, Madhan Karky",
    "album": "Kadhal Reset Repeat (KRR)",
    "duration": 216,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Un_Paarvai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Un_Paarvai.jpg"
  },
  {
    "id": 330,
    "title": "Unakkaayiram Vanakkam",
    "artist": "M. Jayachandran, K K Nishad, Kavitha Ravi",
    "album": "Kadhal Kadhai Sollava",
    "duration": 112,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Unakkaayiram_Vanakkam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Unakkaayiram_Vanakkam.jpg"
  },
  {
    "id": 331,
    "title": "Unnai Nambi",
    "artist": "Shweta Mohan",
    "album": "Lenin Pandiyan",
    "duration": 301,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Unnai_Nambi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Unnai_Nambi.jpg"
  },
  {
    "id": 332,
    "title": "Unnai Ninaithu",
    "artist": "Harris Jayaraj, Sid Sriram, Prashanthini, Vairamuthu",
    "album": "Kadhal Reset Repeat (KRR)",
    "duration": 221,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Unnai_Ninaithu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Unnai_Ninaithu.jpg"
  },
  {
    "id": 333,
    "title": "Untimely Saavu",
    "artist": "Santhosh Narayanan",
    "album": "Soodhu Kavvum BGM (Original Background Score)",
    "duration": 28,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Untimely_Saavu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Untimely_Saavu.jpg"
  },
  {
    "id": 334,
    "title": "Uthamanakkura",
    "artist": "Vijay Antony",
    "album": "Pookie",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Uthamanakkura.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Uthamanakkura.jpg"
  },
  {
    "id": 335,
    "title": "Uyire Uyire",
    "artist": "Girishh G, Jairam Balasubramanian",
    "album": "Sattendru Maarudhu Vaanilai",
    "duration": 285,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Uyire_Uyire_(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Uyire_Uyire_(2).jpg"
  },
  {
    "id": 336,
    "title": "Uyire Uyire (Mental Manadhil )",
    "artist": "G. V. Prakash Kumar, Kapil Kapilan",
    "album": "Mental Manadhil",
    "duration": 234,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Uyire_Uyire.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Uyire_Uyire.jpg"
  },
  {
    "id": 337,
    "title": "Uyire",
    "artist": "Sam C.S., Adithya RK",
    "album": "Double Occupancy",
    "duration": 203,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Uyire.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Uyire.jpg"
  },
  {
    "id": 338,
    "title": "Vaa Endrathum",
    "artist": "Shankar Mahadevan",
    "album": "Charukesi",
    "duration": 478,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vaa_Endrathum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vaa_Endrathum.jpg"
  },
  {
    "id": 339,
    "title": "Vaa Kannamma",
    "artist": "Hesham Abdul Wahab, Uthara Unnikrishnan",
    "album": "Once More",
    "duration": 284,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vaa-Kannamma-.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vaa-Kannamma-.jpg"
  },
  {
    "id": 340,
    "title": "Vaadaa Thondaa",
    "artist": "Darbuka Siva, Thambi Ramaiah, MS Bhaskar, Mathichiyam Bala",
    "album": "TN 2026 Thanga Natchathiram",
    "duration": 261,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vaadaa_Thondaa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vaadaa_Thondaa.jpg"
  },
  {
    "id": 341,
    "title": "Vaadinen Malare",
    "artist": "Sean Roldan",
    "album": "29",
    "duration": 167,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vaadinen_Malare.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vaadinen_Malare.jpg"
  },
  {
    "id": 342,
    "title": "Vaan Vaan",
    "artist": "Thaman S, Mohit Chauhan",
    "album": "Idhayam Murali",
    "duration": 277,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vaan-Vaan-.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vaan-Vaan-.jpg"
  },
  {
    "id": 343,
    "title": "Vaaya Ey Karasaami",
    "artist": "G. V. Prakash Kumar, Anthony Daasan, V.M. Mahalingam, Sathyan",
    "album": "Kara",
    "duration": 248,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vaaya_Ey_Karasaami.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vaaya_Ey_Karasaami.jpg"
  },
  {
    "id": 344,
    "title": "Vallone Vallone",
    "artist": "Sam C.S., Nagore E.M. Haniffa",
    "album": "Habeebi",
    "duration": 281,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vallone_Vallone.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vallone_Vallone.jpg"
  },
  {
    "id": 345,
    "title": "Vandi Yeralam",
    "artist": "Sean Roldan",
    "album": "My Lord",
    "duration": 204,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vandi_Yeralam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vandi_Yeralam.jpg"
  },
  {
    "id": 346,
    "title": "Varam Tharum",
    "artist": "Ghibran, V. Sritharan, Mike Theodore",
    "album": "Leader",
    "duration": 203,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Varam_Tharum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Varam_Tharum.jpg"
  },
  {
    "id": 347,
    "title": "Vari Vari",
    "artist": "Dhee",
    "album": "Vari Vari (Indie)",
    "duration": 201,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vari_Vari.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vari_Vari.jpg"
  },
  {
    "id": 348,
    "title": "Vazhi Thirivu",
    "artist": "Foxn",
    "album": "Parimala and Co",
    "duration": 146,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vazhi_Thirivu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vazhi_Thirivu.jpg"
  },
  {
    "id": 349,
    "title": "Veiyil",
    "artist": "Abishek Ar., Velmurugan, Jegan Kaviraj",
    "album": "Pulse",
    "duration": 178,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Veiyil.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Veiyil.jpg"
  },
  {
    "id": 350,
    "title": "Vellichudare",
    "artist": "Dhibu Ninan Thomas, Kapil Kapilan",
    "album": "Irandu Vaanam",
    "duration": 255,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vellichudare.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vellichudare.jpg"
  },
  {
    "id": 351,
    "title": "Velum Mayilum",
    "artist": "Nivas K Prasanna",
    "album": "Velum Mayilum (Devotional)",
    "duration": 282,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Velum_Mayilum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Velum_Mayilum.jpg"
  },
  {
    "id": 352,
    "title": "Verappa Extended",
    "artist": "Sai Abhyankkar, Arivu",
    "album": "Karuppu",
    "duration": 260,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Verappa_-_Extended.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Verappa_-_Extended.jpg"
  },
  {
    "id": 353,
    "title": "Verappa",
    "artist": "Sai Abhyankkar, Arivu",
    "album": "Karuppu",
    "duration": 100,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Verappa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Verappa.jpg"
  },
  {
    "id": 354,
    "title": "Vibe Vaasey",
    "artist": "Anirudh Ravichander",
    "album": "Love Insurance Kompany (LIK)",
    "duration": 149,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vibe_Vaasey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vibe_Vaasey.jpg"
  },
  {
    "id": 355,
    "title": "Vishwanath & Sons Teaser Theme",
    "artist": "G. V. Prakash Kumar, Ajai S Khashyap, Aavani Malhar",
    "album": "Vishwanath & Sons",
    "duration": 77,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vishwanath_-_Sons_Teaser_Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vishwanath_-_Sons_Teaser_Theme.jpg"
  },
  {
    "id": 356,
    "title": "Vizhigalil Thondriyae",
    "artist": "Ajesh",
    "album": "Moondram Kan",
    "duration": 242,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vizhigalil_Thondriyae.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vizhigalil_Thondriyae.jpg"
  },
  {
    "id": 357,
    "title": "Vizhiyile Oru Thedal",
    "artist": "Satish Raghunathan, Anand Aravindakshan",
    "album": "Hotspot 2 Much",
    "duration": 147,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Vizhiyile_Oru_Thedal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Vizhiyile_Oru_Thedal.jpg"
  },
  {
    "id": 358,
    "title": "Watcha Udadha",
    "artist": "Foxn",
    "album": "Parimala and Co",
    "duration": 168,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/Watcha_Udadha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/Watcha_Udadha.jpg"
  },
  {
    "id": 359,
    "title": "With Love",
    "artist": "Sean Roldan",
    "album": "With Love BGM (Original Background Score)",
    "duration": 122,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/songs/With_Love.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_2@main/covers/With_Love.jpg"
  },
  {
    "id": 360,
    "title": "Would Be",
    "artist": "Sean Roldan, Shibi Srinivasan, Mohan Rajan",
    "album": "With Love",
    "duration": 95,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Would_Be.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Would_Be.jpg"
  },
  {
    "id": 361,
    "title": "X Force",
    "artist": "Dhibu Ninan Thomas",
    "album": "Mr. X",
    "duration": 111,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/X_Force.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/X_Force.jpg"
  },
  {
    "id": 362,
    "title": "X On Duty",
    "artist": "Dhibu Ninan Thomas",
    "album": "Mr. X",
    "duration": 72,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/X_On_Duty.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/X_On_Duty.jpg"
  },
  {
    "id": 363,
    "title": "Yaaro Yaaro (Father Version)",
    "artist": "Justin Prabhakaran, Gangai Amaran",
    "album": "Happy Raj",
    "duration": 261,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Yaaro_Yaaro_(Father_Version).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Yaaro_Yaaro_(Father_Version).jpg"
  },
  {
    "id": 364,
    "title": "Yaaro Yaaro (Son Version)",
    "artist": "Justin Prabhakaran, G. V. Prakash Kumar, Gangai Amaran",
    "album": "Happy Raj",
    "duration": 266,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Yaaro_Yaaro_(Son_Version).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Yaaro_Yaaro_(Son_Version).jpg"
  },
  {
    "id": 365,
    "title": "Yaazh Nenjaththai Meetta",
    "artist": "L.V.Muthu Ganesh, Chinmayi Sripaada",
    "album": "Maragatha Malai",
    "duration": 206,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Yaazh_Nenjaththai_Meetta.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Yaazh_Nenjaththai_Meetta.jpg"
  },
  {
    "id": 366,
    "title": "Yamma Ghajini",
    "artist": "Harris Jayaraj, Asal Kolar, Suchith Suresh, Senthil Dass, Tamizh Adhavan, Madhan Karky, Arcus Aryian",
    "album": "Kadhal Reset Repeat (KRR)",
    "duration": 231,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Yamma_Ghajini.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Yamma_Ghajini.jpg"
  },
  {
    "id": 367,
    "title": "Yedhayya Saami",
    "artist": "Ajay Atul, Shweta Mohan, Karthik",
    "album": "Ranabaali",
    "duration": 79,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Yedhayya_Saami.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Yedhayya_Saami.jpg"
  },
  {
    "id": 368,
    "title": "Yegandhi",
    "artist": "Sam C.S., Sathyaprakash, Fathima Jahan, Yugabharathi",
    "album": "Habeebi",
    "duration": 318,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Yegandhi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Yegandhi.jpg"
  },
  {
    "id": 369,
    "title": "Yenjaamiye",
    "artist": "AK Prriyan, Aravind Karneeswaran, Shibi Srinivasan, JC Joe",
    "album": "Manithan Deivamagalam",
    "duration": 189,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Yenjaamiye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Yenjaamiye.jpg"
  },
  {
    "id": 370,
    "title": "Yetho Yetho",
    "artist": "A.R.Rahman, Amina Rafiq, Shridhar Ramesh",
    "album": "Gandhi Talks",
    "duration": 254,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Yetho_Yetho.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Yetho_Yetho.jpg"
  },
  {
    "id": 371,
    "title": "Yeyya Yemmane",
    "artist": "G. V. Prakash Kumar, Vaikom Vijayalakshmi",
    "album": "Kara",
    "duration": 157,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Yeyya_Yemmane.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Yeyya_Yemmane.jpg"
  },
  {
    "id": 372,
    "title": "10000 Aura RAP",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 57,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/10000-Aura-RAP-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/10000-Aura-RAP-MassTamilan.dev.jpg"
  },
  {
    "id": 373,
    "title": "1st Mantra",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 134,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/1st%20Mantra.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/1st%20Mantra.jpg"
  },
  {
    "id": 374,
    "title": "23 Theme",
    "artist": "Hector Salamanca, Anirudh Ravichander",
    "album": "AA23",
    "duration": 47,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/23%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/23%20Theme.jpg"
  },
  {
    "id": 375,
    "title": "2nd Mantra",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 137,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/2nd%20Mantra.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/2nd%20Mantra.jpg"
  },
  {
    "id": 376,
    "title": "3 Matches Found for Narasimhan",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 25,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/3%20Matches%20Found%20for%20Narasimhan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/3%20Matches%20Found%20for%20Narasimhan.jpg"
  },
  {
    "id": 377,
    "title": "A Kiss Across Time",
    "artist": "Jen Martin",
    "album": "Kiss",
    "duration": 215,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/A%20Kiss%20Across%20Time.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/A%20Kiss%20Across%20Time.jpg"
  },
  {
    "id": 378,
    "title": "A Surprise",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 34,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/A%20Surprise.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/A%20Surprise.jpg"
  },
  {
    "id": 379,
    "title": "Aadhiyaman's Den",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 45,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aadhiyaman's-Den-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aadhiyaman's-Den-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 380,
    "title": "Aadhiyaman's Prank",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 31,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aadhiyaman's-Prank-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aadhiyaman's-Prank-MassTamilan.dev.jpg"
  },
  {
    "id": 381,
    "title": "Aadhiyaman Finds The Truth",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 112,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aadhiyaman-Finds-The-Truth-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aadhiyaman-Finds-The-Truth-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 382,
    "title": "Aadhiyaman Tries To Threaten Kural",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 42,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aadhiyaman-Tries-To-Threaten-Kural-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aadhiyaman-Tries-To-Threaten-Kural-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 383,
    "title": "Aalapikkey Ummak",
    "artist": "Santhosh Narayanan",
    "album": "Vaa Vaathiyaar",
    "duration": 188,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aalapikkey%20Ummak.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aalapikkey%20Ummak.jpg"
  },
  {
    "id": 384,
    "title": "Aanpaavam Pollathathu Theme",
    "artist": "Siddhu Kumar",
    "album": "Aan Paavam Pollathathu",
    "duration": 53,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aanpaavam%20Pollathathu%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aanpaavam%20Pollathathu%20Theme.jpg"
  },
  {
    "id": 385,
    "title": "Aanpaavam Pollathathu Trailer Theme",
    "artist": "Siddhu Kumar",
    "album": "Aan Paavam Pollathathu",
    "duration": 144,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aanpaavam%20Pollathathu%20Trailer%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aanpaavam%20Pollathathu%20Trailer%20Theme.jpg"
  },
  {
    "id": 386,
    "title": "Aaradha Kaayam",
    "artist": "Pranav Muniraj, Meenakshi Elayaraja",
    "album": "Middle Class",
    "duration": 167,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aaradha%20Kaayam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aaradha%20Kaayam.jpg"
  },
  {
    "id": 387,
    "title": "Aaromaley The Usual Promo Theme",
    "artist": "Siddu Kumar",
    "album": "Aaromaley",
    "duration": 121,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aaromaley%20-%20The%20Usual%20Promo%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aaromaley%20-%20The%20Usual%20Promo%20Theme.jpg"
  },
  {
    "id": 388,
    "title": "Aaromaley Title Track",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 92,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aaromaley%20Title%20Track%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aaromaley%20Title%20Track%20(2).jpg"
  },
  {
    "id": 389,
    "title": "Aarthi's Request",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 34,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aarthi's%20Request.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aarthi's%20Request.jpg"
  },
  {
    "id": 390,
    "title": "Aarthi's Struggle",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 158,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aarthi's%20Struggle.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aarthi's%20Struggle.jpg"
  },
  {
    "id": 391,
    "title": "Aarthi's Wedding",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 70,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aarthi's%20Wedding.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aarthi's%20Wedding.jpg"
  },
  {
    "id": 392,
    "title": "Aaruyire",
    "artist": "Dhibu Ninan Thomas, Ravi G",
    "album": "Diesel",
    "duration": 59,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aaruyire.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aaruyire.jpg"
  },
  {
    "id": 393,
    "title": "Aaruyire Reprise",
    "artist": "Dhibu Ninan Thomas, Harish Kalyan",
    "album": "Diesel",
    "duration": 128,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aaruyire%C2%A0Reprise.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aaruyire%C2%A0Reprise.jpg"
  },
  {
    "id": 394,
    "title": "Aasai Theeyae",
    "artist": "Justin Prabhakaran, Sathyaprakash",
    "album": "Thanal",
    "duration": 229,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aasai%20Theeyae.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aasai%20Theeyae.jpg"
  },
  {
    "id": 395,
    "title": "Abdi Abdi",
    "artist": "Mayssa Karaa, Deepthi Suresh, Freek, A.R.Rahman",
    "album": "Genie",
    "duration": 307,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdi%20Abdi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdi%20Abdi.jpg"
  },
  {
    "id": 396,
    "title": "Abdul And Kalai Approaching The Chamber",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 151,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20And%20Kalai%20Approaching%20The%20Chamber.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20And%20Kalai%20Approaching%20The%20Chamber.jpg"
  },
  {
    "id": 397,
    "title": "Abdul And Kalai In Courtroom",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 52,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20And%20Kalai%20In%20Courtroom.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20And%20Kalai%20In%20Courtroom.jpg"
  },
  {
    "id": 398,
    "title": "Abdul And Mom In Village",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 22,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20And%20Mom%20In%20Village.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20And%20Mom%20In%20Village.jpg"
  },
  {
    "id": 399,
    "title": "Abdul Between Fear And Freedom 2",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Between%20Fear%20And%20Freedom%202.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Between%20Fear%20And%20Freedom%202.jpg"
  },
  {
    "id": 400,
    "title": "Abdul Between Fear And Freedom",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 89,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Between%20Fear%20And%20Freedom.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Between%20Fear%20And%20Freedom.jpg"
  },
  {
    "id": 401,
    "title": "Abdul Breaking Point",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 402,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Breaking%20Point.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Breaking%20Point.jpg"
  },
  {
    "id": 402,
    "title": "Abdul Breakout",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 190,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Breakout.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Breakout.jpg"
  },
  {
    "id": 403,
    "title": "Abdul Facing The Judge",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 250,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Facing%20The%20Judge.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Facing%20The%20Judge.jpg"
  },
  {
    "id": 404,
    "title": "Abdul Found At Last",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 89,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Found%20At%20Last.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Found%20At%20Last.jpg"
  },
  {
    "id": 405,
    "title": "Abdul Fragments Of The Past",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Fragments%20Of%20The%20Past.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Fragments%20Of%20The%20Past.jpg"
  },
  {
    "id": 406,
    "title": "Abdul Heart On The Edge",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 153,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Heart%20On%20The%20Edge.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Heart%20On%20The%20Edge.jpg"
  },
  {
    "id": 407,
    "title": "Abdul In Transit",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 38,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20In%20Transit.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20In%20Transit.jpg"
  },
  {
    "id": 408,
    "title": "Abdul Lost In Transit",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 230,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Lost%20In%20Transit.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Lost%20In%20Transit.jpg"
  },
  {
    "id": 409,
    "title": "Abdul Shadows Of Yesterday",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 66,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Shadows%20Of%20Yesterday.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Shadows%20Of%20Yesterday.jpg"
  },
  {
    "id": 410,
    "title": "Abdul Surrender",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 198,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Surrender.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Surrender.jpg"
  },
  {
    "id": 411,
    "title": "Abdul Theme",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 154,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abdul%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abdul%20Theme.jpg"
  },
  {
    "id": 412,
    "title": "Abort This Child",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abort-This-Child-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abort-This-Child-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 413,
    "title": "Abortion Cancel",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Abortion-Cancel-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Abortion-Cancel-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 414,
    "title": "Action Mode",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 51,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Action%20Mode.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Action%20Mode.jpg"
  },
  {
    "id": 415,
    "title": "Adadada",
    "artist": "Anand Kashinath, Sharan Kumar",
    "album": "Yellow",
    "duration": 89,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Adadada.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Adadada.jpg"
  },
  {
    "id": 416,
    "title": "Adi Alaye",
    "artist": "G. V. Prakash Kumar, Sean Roldan, Dhee",
    "album": "Parasakthi",
    "duration": 250,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Adi%20Alaye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Adi%20Alaye.jpg"
  },
  {
    "id": 417,
    "title": "Adiye Alangaari",
    "artist": "Justin Prabhakaran, Krishnaraj, Ananya Bhat",
    "album": "Thandakaaranyam",
    "duration": 204,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Adiye%20Alangaari.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Adiye%20Alangaari.jpg"
  },
  {
    "id": 418,
    "title": "Agriculture Song",
    "artist": "B. Ajaneesh Loknath, Muthu Sirpi",
    "album": "Kantara Chapter 1",
    "duration": 144,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Agriculture%20Song%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Agriculture%20Song%20(2).jpg"
  },
  {
    "id": 419,
    "title": "Aishu and Prabhu",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 48,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aishu%20and%20Prabhu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aishu%20and%20Prabhu.jpg"
  },
  {
    "id": 420,
    "title": "Ajith in College",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 28,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ajith%20in%20College.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ajith%20in%20College.jpg"
  },
  {
    "id": 421,
    "title": "Ajith Is Late",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 22,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ajith%20Is%20Late%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ajith%20Is%20Late%20(2).jpg"
  },
  {
    "id": 422,
    "title": "Ajith Is Late for the Meeting",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ajith%20Is%20Late%20for%20the%20Meeting%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ajith%20Is%20Late%20for%20the%20Meeting%20(2).jpg"
  },
  {
    "id": 423,
    "title": "Ajith Proposes His Love to Anjali",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 91,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ajith%20Proposes%20His%20Love%20to%20Anjali%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ajith%20Proposes%20His%20Love%20to%20Anjali%20(2).jpg"
  },
  {
    "id": 424,
    "title": "Ajith Restarts Life",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ajith%20Restarts%20Life.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ajith%20Restarts%20Life.jpg"
  },
  {
    "id": 425,
    "title": "Ajith vs Anjali",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 74,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ajith%20vs%20Anjali%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ajith%20vs%20Anjali%20(2).jpg"
  },
  {
    "id": 426,
    "title": "Ajith Wants to Fall in Love",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 38,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ajith%20Wants%20to%20Fall%20in%20Love.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ajith%20Wants%20to%20Fall%20in%20Love.jpg"
  },
  {
    "id": 427,
    "title": "Ajith’s Birthday Party",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 50,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ajith%E2%80%99s%20Birthday%20Party.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ajith%E2%80%99s%20Birthday%20Party.jpg"
  },
  {
    "id": 428,
    "title": "Amma En Thangakani",
    "artist": "Yuvan Shankar Raja, Ilaiyaraaja",
    "album": "Kombuseevi",
    "duration": 313,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Amma%20En%20Thangakani.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Amma%20En%20Thangakani.jpg"
  },
  {
    "id": 429,
    "title": "Amma In Hospital",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 63,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Amma%20In%20Hospital.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Amma%20In%20Hospital.jpg"
  },
  {
    "id": 430,
    "title": "Amma Slaps Ajith",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 56,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Amma%20Slaps%20Ajith.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Amma%20Slaps%20Ajith.jpg"
  },
  {
    "id": 431,
    "title": "Amma Advice",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 22,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Amma-Advice-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Amma-Advice-MassTamilan.dev.jpg"
  },
  {
    "id": 432,
    "title": "Amma’s Definition of Love",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 95,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Amma%E2%80%99s%20Definition%20of%20Love.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Amma%E2%80%99s%20Definition%20of%20Love.jpg"
  },
  {
    "id": 433,
    "title": "An Unexpected Meeting",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 88,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/An%20Unexpected%20Meeting.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/An%20Unexpected%20Meeting.jpg"
  },
  {
    "id": 434,
    "title": "Anaiyaada Oliyaaki",
    "artist": "Poly Varghese, Rajashree Santhosh",
    "album": "Saayavanam",
    "duration": 298,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Anaiyaada%20Oliyaaki.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Anaiyaada%20Oliyaaki.jpg"
  },
  {
    "id": 435,
    "title": "Andha 7 Naatkal Theme",
    "artist": "Sachin Sundar",
    "album": "Andha 7 Naatkal",
    "duration": 108,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Andha%207%20Naatkal%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Andha%207%20Naatkal%20Theme.jpg"
  },
  {
    "id": 436,
    "title": "Andhipera Azhagaaliye",
    "artist": "Adithya RK, Bharath Aaseevagan",
    "album": "Theeyavar Kulai Nadunga",
    "duration": 201,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Andhipera%20Azhagaaliye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Andhipera%20Azhagaaliye.jpg"
  },
  {
    "id": 437,
    "title": "Andrum Indrum",
    "artist": "Keneeshaa",
    "album": "Andrum Indrum (Indie)",
    "duration": 175,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Andrum%20Indrum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Andrum%20Indrum.jpg"
  },
  {
    "id": 438,
    "title": "Angammal Theme",
    "artist": "Mohammed Maqbool Mansoor",
    "album": "Angammal",
    "duration": 66,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Angammal%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Angammal%20Theme.jpg"
  },
  {
    "id": 439,
    "title": "Animal Instinct",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi",
    "duration": 37,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Animal%20Instinct.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Animal%20Instinct.jpg"
  },
  {
    "id": 440,
    "title": "Anjali The Terror",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 86,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Anjali%20-%20The%20Terror%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Anjali%20-%20The%20Terror%20(2).jpg"
  },
  {
    "id": 441,
    "title": "Anjali and Micheal",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 68,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Anjali%20and%20Micheal%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Anjali%20and%20Micheal%20(2).jpg"
  },
  {
    "id": 442,
    "title": "Anjali Converts",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 27,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Anjali%20Converts.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Anjali%20Converts.jpg"
  },
  {
    "id": 443,
    "title": "Anjali Intro",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 62,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Anjali%20Intro.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Anjali%20Intro.jpg"
  },
  {
    "id": 444,
    "title": "Anjali Repents",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 45,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Anjali%20Repents%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Anjali%20Repents%20(2).jpg"
  },
  {
    "id": 445,
    "title": "Anjali Takes Leave",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 21,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Anjali%20Takes%20Leave.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Anjali%20Takes%20Leave.jpg"
  },
  {
    "id": 446,
    "title": "Anjali's Gift",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 63,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Anjali's%20Gift%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Anjali's%20Gift%20(2).jpg"
  },
  {
    "id": 447,
    "title": "Annan Magan",
    "artist": "Yuvan Shankar Raja, Velu, Shibi Srinivasan, Aravind Annest",
    "album": "Kombuseevi",
    "duration": 107,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Annan%20Magan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Annan%20Magan.jpg"
  },
  {
    "id": 448,
    "title": "Another Home",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Another%20Home.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Another%20Home.jpg"
  },
  {
    "id": 449,
    "title": "Anthre Gives Hopes To Kaali",
    "artist": "Sam C.S.",
    "album": "Retta Thala BGM (Original Background Score)",
    "duration": 119,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Anthre%20Gives%20Hopes%20To%20Kaali.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Anthre%20Gives%20Hopes%20To%20Kaali.jpg"
  },
  {
    "id": 450,
    "title": "Appa's Wisdom",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 89,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Appa's%20Wisdom.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Appa's%20Wisdom.jpg"
  },
  {
    "id": 451,
    "title": "Appo Ippo",
    "artist": "Ashwin Vinayagamoorthy",
    "album": "Indian Penal Law (IPL)",
    "duration": 222,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Appo%20Ippo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Appo%20Ippo.jpg"
  },
  {
    "id": 452,
    "title": "Approved Home Loan",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Approved%20Home%20Loan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Approved%20Home%20Loan.jpg"
  },
  {
    "id": 453,
    "title": "AR Police Under The Badge",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 86,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/AR%20Police%20Under%20The%20Badge.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/AR%20Police%20Under%20The%20Badge.jpg"
  },
  {
    "id": 454,
    "title": "Arasan Theme",
    "artist": "Anirudh Ravichander",
    "album": "Arasan",
    "duration": 94,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Arasan-Theme-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Arasan-Theme-MassTamilan.dev.jpg"
  },
  {
    "id": 455,
    "title": "Are You Okay Anjali?",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 71,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Are%20You%20Okay%20Anjali%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Are%20You%20Okay%20Anjali%20(2).jpg"
  },
  {
    "id": 456,
    "title": "Aththaan",
    "artist": "Siddhu Kumar, Vaisagh",
    "album": "Aan Paavam Pollathathu",
    "duration": 176,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Aththaan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Aththaan.jpg"
  },
  {
    "id": 457,
    "title": "Atleast Realize Now",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 64,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Atleast-Realize-Now-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Atleast-Realize-Now-MassTamilan.dev.jpg"
  },
  {
    "id": 458,
    "title": "Avalidam Sol",
    "artist": "A.R.Rahman, A.R. Ameen, Jonita Gandhi",
    "album": "Tere Ishk Mein",
    "duration": 298,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Avalidam%20Sol.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Avalidam%20Sol.jpg"
  },
  {
    "id": 459,
    "title": "Azhagana Raniye",
    "artist": "N.R. Raghunanthan, Ravi G",
    "album": "Lock Down",
    "duration": 227,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Azhagana%20Raniye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Azhagana%20Raniye.jpg"
  },
  {
    "id": 460,
    "title": "Azhagazhaga",
    "artist": "N.R. Raghunanthan, M.M.Manasi",
    "album": "Lock Down",
    "duration": 142,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Azhagazhaga.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Azhagazhaga.jpg"
  },
  {
    "id": 461,
    "title": "Azhagiyaley",
    "artist": "Ghibran, Abby V, Bhritta",
    "album": "Aaryan",
    "duration": 229,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Azhagiyaley-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Azhagiyaley-MassTamilan.dev.jpg"
  },
  {
    "id": 462,
    "title": "Azhagu Machaan",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Azhagu%20Machaan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Azhagu%20Machaan.jpg"
  },
  {
    "id": 463,
    "title": "Azhaikaathey Kannalae",
    "artist": "Santhosh Ram, Haripriya, David Simon",
    "album": "Red Flower",
    "duration": 228,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Azhaikaathey%20Kannalae.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Azhaikaathey%20Kannalae.jpg"
  },
  {
    "id": 464,
    "title": "Baba Phoenix",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 84,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Baba%20-%20Phoenix.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Baba%20-%20Phoenix.jpg"
  },
  {
    "id": 465,
    "title": "Baba in Himalayas",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 126,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Baba%20in%20Himalayas.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Baba%20in%20Himalayas.jpg"
  },
  {
    "id": 466,
    "title": "Baba Kichchu",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 351,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Baba%20Kichchu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Baba%20Kichchu.jpg"
  },
  {
    "id": 467,
    "title": "Baba Rap",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 287,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Baba%20Rap.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Baba%20Rap.jpg"
  },
  {
    "id": 468,
    "title": "Baba Realises",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 122,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Baba%20Realises.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Baba%20Realises.jpg"
  },
  {
    "id": 469,
    "title": "Baba Rejects Chamu",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 26,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Baba%20Rejects%20Chamu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Baba%20Rejects%20Chamu.jpg"
  },
  {
    "id": 470,
    "title": "Baba Turns into Theist",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 165,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Baba%20Turns%20into%20Theist.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Baba%20Turns%20into%20Theist.jpg"
  },
  {
    "id": 471,
    "title": "Back From The Dead",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 58,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Back%20From%20The%20Dead.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Back%20From%20The%20Dead.jpg"
  },
  {
    "id": 472,
    "title": "Balbir At Rameshwaram",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 35,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Balbir%20At%20Rameshwaram.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Balbir%20At%20Rameshwaram.jpg"
  },
  {
    "id": 473,
    "title": "Balbir Singh",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 68,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Balbir%20Singh.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Balbir%20Singh.jpg"
  },
  {
    "id": 474,
    "title": "Balbir's Inquiry",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 43,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Balbir's%20Inquiry.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Balbir's%20Inquiry.jpg"
  },
  {
    "id": 475,
    "title": "Bar Song",
    "artist": "Noah Armstrong, Karan B Krupa",
    "album": "Kuttram Pudhithu",
    "duration": 187,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Bar%20Song.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Bar%20Song.jpg"
  },
  {
    "id": 476,
    "title": "Beer Song",
    "artist": "Dhibu Ninan Thomas, Gana Guna",
    "album": "Diesel",
    "duration": 196,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Beer%20Song.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Beer%20Song.jpg"
  },
  {
    "id": 477,
    "title": "Behind Bars",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 63,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Behind%20Bars.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Behind%20Bars.jpg"
  },
  {
    "id": 478,
    "title": "Behind His Silence",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 99,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Behind%20His%20Silence.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Behind%20His%20Silence.jpg"
  },
  {
    "id": 479,
    "title": "Better Dont Come in My Way",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 110,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Better%20Dont%20Come%20in%20My%20Way.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Better%20Dont%20Come%20in%20My%20Way.jpg"
  },
  {
    "id": 480,
    "title": "Between Two Souls",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 36,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Between%20Two%20Souls.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Between%20Two%20Souls.jpg"
  },
  {
    "id": 481,
    "title": "Between You and My Dream",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 124,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Between%20You%20and%20My%20Dream.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Between%20You%20and%20My%20Dream.jpg"
  },
  {
    "id": 482,
    "title": "Bhairavan Enters The Last House",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 120,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Bhairavan%20Enters%20The%20Last%20House.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Bhairavan%20Enters%20The%20Last%20House.jpg"
  },
  {
    "id": 483,
    "title": "Birthday Party",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 62,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Birthday%20Party.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Birthday%20Party.jpg"
  },
  {
    "id": 484,
    "title": "Bleeding Forward",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 164,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Bleeding%20Forward.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Bleeding%20Forward.jpg"
  },
  {
    "id": 485,
    "title": "Blood and Belief",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 74,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Blood%20and%20Belief.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Blood%20and%20Belief.jpg"
  },
  {
    "id": 486,
    "title": "Blud Is On His Way",
    "artist": "Sai Abhyankkar",
    "album": "Dude",
    "duration": 77,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Blud%20Is%20On%20His%20Way.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Blud%20Is%20On%20His%20Way.jpg"
  },
  {
    "id": 487,
    "title": "Bore Aana Vaazhka",
    "artist": "Vivek Mervin, Mugen Rao",
    "album": "Jinn – The Pet",
    "duration": 211,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Bore%20Aana%20Vaazhka.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Bore%20Aana%20Vaazhka.jpg"
  },
  {
    "id": 488,
    "title": "Born In Shadow",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 104,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Born%20In%20Shadow.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Born%20In%20Shadow.jpg"
  },
  {
    "id": 489,
    "title": "Brahmakalasha",
    "artist": "B. Ajaneesh Loknath, Abby V",
    "album": "Kantara Chapter 1",
    "duration": 343,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Brahmakalasha%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Brahmakalasha%20(2).jpg"
  },
  {
    "id": 490,
    "title": "Breath Before Impact",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 157,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Breath%20Before%20Impact.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Breath%20Before%20Impact.jpg"
  },
  {
    "id": 491,
    "title": "Bullet Vandi",
    "artist": "Anthony Daasan",
    "album": "Gandhi Kannadi",
    "duration": 180,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Bullet%20Vandi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Bullet%20Vandi.jpg"
  },
  {
    "id": 492,
    "title": "Burglar On Terrace",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 34,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Burglar%20On%20Terrace.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Burglar%20On%20Terrace.jpg"
  },
  {
    "id": 493,
    "title": "Bus Fight x Powerhouse x Disco",
    "artist": "Anirudh Ravichander",
    "album": "Bus Fight x Powerhouse x Disco (From \"Coolie BGM\")",
    "duration": 177,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Bus%20Fight%20x%20Powerhouse%20x%20Disco.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Bus%20Fight%20x%20Powerhouse%20x%20Disco.jpg"
  },
  {
    "id": 494,
    "title": "Calm After Storm",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 36,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Calm%20After%20Storm.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Calm%20After%20Storm.jpg"
  },
  {
    "id": 495,
    "title": "Cash Cash",
    "artist": "G. V. Prakash Kumar, Suresh Peters, Karunas",
    "album": "Mask",
    "duration": 208,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Cash%20Cash.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Cash%20Cash.jpg"
  },
  {
    "id": 496,
    "title": "Castiest Dad",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 30,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Castiest-Dad-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Castiest-Dad-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 497,
    "title": "CCTV Footage",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 43,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/CCTV%20Footage.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/CCTV%20Footage.jpg"
  },
  {
    "id": 498,
    "title": "Celebration Horn",
    "artist": "D.Imman",
    "album": "Bomb",
    "duration": 191,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Celebration%20Horn.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Celebration%20Horn.jpg"
  },
  {
    "id": 499,
    "title": "Chakra's",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 37,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chakra's.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chakra's.jpg"
  },
  {
    "id": 500,
    "title": "Chamu Visits Baba House",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 50,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chamu%20Visits%20Baba%20House.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chamu%20Visits%20Baba%20House.jpg"
  },
  {
    "id": 501,
    "title": "Cheenikkallu (Unplugged)",
    "artist": "Nivas K. Prasanna",
    "album": "Bison",
    "duration": 193,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Cheenikkallu%20(Unplugged).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Cheenikkallu%20(Unplugged).jpg"
  },
  {
    "id": 502,
    "title": "Cheenikkallu",
    "artist": "Nivas K. Prasanna, Chinmayi Sripada, Vijay Yesudas",
    "album": "Bison",
    "duration": 355,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Cheenikkallu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Cheenikkallu.jpg"
  },
  {
    "id": 503,
    "title": "Chella Magale",
    "artist": "Vijay, Anirudh Ravichander",
    "album": "Jana Nayagan",
    "duration": 232,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chella-Magale-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chella-Magale-MassTamilan.dev.jpg"
  },
  {
    "id": 504,
    "title": "Chellatty",
    "artist": "N.R.Raghunanthan, Jithin Raj",
    "album": "Cristina Kathirvelan",
    "duration": 274,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chellatty.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chellatty.jpg"
  },
  {
    "id": 505,
    "title": "Chendipoova (Version 1)",
    "artist": "Mohammed Maqbool Mansoor, K. S. Chithra",
    "album": "Angammal",
    "duration": 249,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chendipoova%20(Version%201).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chendipoova%20(Version%201).jpg"
  },
  {
    "id": 506,
    "title": "Chendipoova (Version 2)",
    "artist": "Mohammed Maqbool Mansoor, Sublahshini",
    "album": "Angammal",
    "duration": 249,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chendipoova%20(Version%202).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chendipoova%20(Version%202).jpg"
  },
  {
    "id": 507,
    "title": "Chikku Bukku",
    "artist": "Jen Martin, Meera Karthik Kumar",
    "album": "Kiss",
    "duration": 174,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chikku%20Bukku.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chikku%20Bukku.jpg"
  },
  {
    "id": 508,
    "title": "Chillana Sirukki",
    "artist": "Kapil Kapilan, Sam C.S.",
    "album": "Blackmail",
    "duration": 205,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chillana%20Sirukki.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chillana%20Sirukki.jpg"
  },
  {
    "id": 509,
    "title": "Chinnaware",
    "artist": "A.R.Rahman, Shankar Mahadevan",
    "album": "Tere Ishk Mein",
    "duration": 183,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chinnaware.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chinnaware.jpg"
  },
  {
    "id": 510,
    "title": "Chirag",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chirag.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chirag.jpg"
  },
  {
    "id": 511,
    "title": "Chocolate Gun Prank",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 70,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Chocolate-Gun-Prank-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Chocolate-Gun-Prank-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 512,
    "title": "Church Kalavaram",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 36,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Church%20Kalavaram%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Church%20Kalavaram%20(2).jpg"
  },
  {
    "id": 513,
    "title": "Clash With Chamu",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 84,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Clash%20With%20Chamu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Clash%20With%20Chamu.jpg"
  },
  {
    "id": 514,
    "title": "Clients Torture",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 65,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Clients%20Torture%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Clients%20Torture%20(2).jpg"
  },
  {
    "id": 515,
    "title": "CM Ram Nandan",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 119,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/CM%20Ram%20Nandan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/CM%20Ram%20Nandan.jpg"
  },
  {
    "id": 516,
    "title": "College Fees",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/College%20Fees.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/College%20Fees.jpg"
  },
  {
    "id": 517,
    "title": "College Love",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 25,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/College%20Love%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/College%20Love%20(2).jpg"
  },
  {
    "id": 518,
    "title": "Commit",
    "artist": "Asal Kolaar",
    "album": "Commit (Indie)",
    "duration": 162,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Commit.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Commit.jpg"
  },
  {
    "id": 519,
    "title": "Coolie DISCO",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 129,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Coolie%20DISCO.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Coolie%20DISCO.jpg"
  },
  {
    "id": 520,
    "title": "Coolie Feels",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 130,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Coolie%20Feels.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Coolie%20Feels.jpg"
  },
  {
    "id": 521,
    "title": "Courtroom Hope",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 143,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Courtroom%20Hope.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Courtroom%20Hope.jpg"
  },
  {
    "id": 522,
    "title": "Dahaa Theme",
    "artist": "Lalo Salamanca, Anirudh Ravichander, Heisenberg",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 179,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dahaa%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dahaa%20Theme.jpg"
  },
  {
    "id": 523,
    "title": "Dandanakka Life'u",
    "artist": "Siddhu Kumar, T. Rajendar, OfRO",
    "album": "Aaromaley",
    "duration": 201,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dandanakka%20Life'u.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dandanakka%20Life'u.jpg"
  },
  {
    "id": 524,
    "title": "Dandanakka Office Theme",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 26,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dandanakka%20Office%20Theme%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dandanakka%20Office%20Theme%20(2).jpg"
  },
  {
    "id": 525,
    "title": "Danger Mamae",
    "artist": "Sean Roldan",
    "album": "Revolver Rita",
    "duration": 225,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Danger%20Mamae.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Danger%20Mamae.jpg"
  },
  {
    "id": 526,
    "title": "Dark Theme",
    "artist": "Sam C.S.",
    "album": "Retta Thala",
    "duration": 160,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dark%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dark%20Theme.jpg"
  },
  {
    "id": 527,
    "title": "Dayal",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 98,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dayal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dayal.jpg"
  },
  {
    "id": 528,
    "title": "Deva Entry",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Deva%20Entry.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Deva%20Entry.jpg"
  },
  {
    "id": 529,
    "title": "Deva's 3 Minute Monologue",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 192,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Deva's%203%20Minute%20Monologue.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Deva's%203%20Minute%20Monologue.jpg"
  },
  {
    "id": 530,
    "title": "Devathai Kolam",
    "artist": "Theeson, Saindhavi, Lokeshwaran",
    "album": "Mangai",
    "duration": 195,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Devathai%20Kolam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Devathai%20Kolam.jpg"
  },
  {
    "id": 531,
    "title": "Dhilip's Death",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 76,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dhilip's-Death-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dhilip's-Death-MassTamilan.dev.jpg"
  },
  {
    "id": 532,
    "title": "Dho Pogura",
    "artist": "Siddhu Kumar, Aravind Karneeswaran",
    "album": "Aaromaley",
    "duration": 200,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dho%20Pogura.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dho%20Pogura.jpg"
  },
  {
    "id": 533,
    "title": "Dhop",
    "artist": "Thaman S, Aditi Shankar, Prudhvi Chandra, Sruthi Ranjani",
    "album": "Game Changer",
    "duration": 291,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dhop.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dhop.jpg"
  },
  {
    "id": 534,
    "title": "Dillubaru Aaja",
    "artist": "Dhibu Ninan Thomas, Silambarasan Tr, Shweta Mohan",
    "album": "Diesel",
    "duration": 278,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dillubaru%20Aaja.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dillubaru%20Aaja.jpg"
  },
  {
    "id": 535,
    "title": "Dippu Dippu",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 328,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dippu%20Dippu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dippu%20Dippu.jpg"
  },
  {
    "id": 536,
    "title": "Disco Jillebi",
    "artist": "Vinod Yajamanya, Kaviya Isaivi, Sai Rajkumar",
    "album": "Janata Bar",
    "duration": 246,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Disco%20Jillebi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Disco%20Jillebi.jpg"
  },
  {
    "id": 537,
    "title": "Divyanandha Barathy",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 48,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Divyanandha%20Barathy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Divyanandha%20Barathy.jpg"
  },
  {
    "id": 538,
    "title": "Doli Dankana",
    "artist": "Jitin Raj, M M Manasi",
    "album": "Desingu Raja 2",
    "duration": 229,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Doli%20Dankana.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Doli%20Dankana.jpg"
  },
  {
    "id": 539,
    "title": "Don’T Know Your Name",
    "artist": "Sam C.S., Julius, Kannan M",
    "album": "Retta Thala",
    "duration": 96,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Don%E2%80%99T%20Know%20Your%20Name.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Don%E2%80%99T%20Know%20Your%20Name.jpg"
  },
  {
    "id": 540,
    "title": "Dreams Come True",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 66,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dreams%20Come%20True.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dreams%20Come%20True.jpg"
  },
  {
    "id": 541,
    "title": "Dude Trailer Blast (Theme)",
    "artist": "Sai Abhyankkar",
    "album": "Dude",
    "duration": 161,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dude%20Trailer%20Blast%20(Theme).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dude%20Trailer%20Blast%20(Theme).jpg"
  },
  {
    "id": 542,
    "title": "Dude is Back (Oorum Blood Phonk)",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 16,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dude-is-Back-(Oorum-Blood-Phonk)-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dude-is-Back-(Oorum-Blood-Phonk)-MassTamilan.dev.jpg"
  },
  {
    "id": 543,
    "title": "Dude mass Oorum Blood Brazillian",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 78,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dude-mass-Oorum-Blood-Brazillian-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dude-mass-Oorum-Blood-Brazillian-MassTamilan.dev.jpg"
  },
  {
    "id": 544,
    "title": "Dude Orchestral Suite",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 125,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Dude-Orchestral-Suite-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Dude-Orchestral-Suite-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 545,
    "title": "Eelamma Yelo",
    "artist": "Theeson, Vaikom Vijayalakshmi",
    "album": "Mangai",
    "duration": 170,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Eelamma%20Yelo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Eelamma%20Yelo.jpg"
  },
  {
    "id": 546,
    "title": "Elephant Blessing",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 85,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Elephant%20Blessing.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Elephant%20Blessing.jpg"
  },
  {
    "id": 547,
    "title": "En Peru Padaiyappa",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 324,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/En%20Peru%20Padaiyappa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/En%20Peru%20Padaiyappa.jpg"
  },
  {
    "id": 548,
    "title": "Ena Vittu",
    "artist": "Theeson, Anthony Daasan",
    "album": "Mangai",
    "duration": 220,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ena%20Vittu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ena%20Vittu.jpg"
  },
  {
    "id": 549,
    "title": "Encounter Investigation",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 106,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Encounter%20Investigation.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Encounter%20Investigation.jpg"
  },
  {
    "id": 550,
    "title": "End Credits",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 186,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/End%20Credits.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/End%20Credits.jpg"
  },
  {
    "id": 551,
    "title": "Enjaami Thandhaane",
    "artist": "G. V. Prakash Kumar, Dhanush, Arivu",
    "album": "Idli Kadai",
    "duration": 291,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Enjaami%20Thandhaane.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Enjaami%20Thandhaane.jpg"
  },
  {
    "id": 552,
    "title": "Enna Sugam",
    "artist": "G. V. Prakash Kumar, Dhanush, Shweta Mohan",
    "album": "Idli Kadai",
    "duration": 222,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Enna%20Sugam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Enna%20Sugam.jpg"
  },
  {
    "id": 553,
    "title": "Ennai Vittu Ni",
    "artist": "N.R.Raghunanthan, Jithin Raj",
    "album": "Cristina Kathirvelan",
    "duration": 218,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ennai%20Vittu%20Ni.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ennai%20Vittu%20Ni.jpg"
  },
  {
    "id": 554,
    "title": "Ennale Ennale",
    "artist": "Jen Martin, Abishek Suresh",
    "album": "Kiss",
    "duration": 258,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ennale%20Ennale.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ennale%20Ennale.jpg"
  },
  {
    "id": 555,
    "title": "Ennangada Rodhanai",
    "artist": "Achu Rajamani, Velmurugan",
    "album": "Kumaara Sambavam",
    "duration": 166,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ennangada%20Rodhanai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ennangada%20Rodhanai.jpg"
  },
  {
    "id": 556,
    "title": "Ennavo Nenjiley",
    "artist": "Prashanth R. Vihari, Shibi Srinivasan, Rakendu Mouli",
    "album": "The Girlfriend",
    "duration": 83,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ennavo%20Nenjiley.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ennavo%20Nenjiley.jpg"
  },
  {
    "id": 557,
    "title": "Ennoda Bible la (Oorum Blood Comic)",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ennoda-Bible-la-(Oorum-Blood-Comic)-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ennoda-Bible-la-(Oorum-Blood-Comic)-MassTamilan.dev.jpg"
  },
  {
    "id": 558,
    "title": "Eppadi Vandhaayo Reprise",
    "artist": "Siddhu Kumar, Lakshmikanth M",
    "album": "Aaromaley",
    "duration": 95,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Eppadi%20Vandhaayo%20-%20Reprise.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Eppadi%20Vandhaayo%20-%20Reprise.jpg"
  },
  {
    "id": 559,
    "title": "Eppadi Vandhaayo Prelude",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 27,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Eppadi%20Vandhaayo%20Prelude%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Eppadi%20Vandhaayo%20Prelude%20(2).jpg"
  },
  {
    "id": 560,
    "title": "Eppadi Vandhaayo",
    "artist": "Siddhu Kumar, Chinmayi, Anand Aravindakshan",
    "album": "Aaromaley",
    "duration": 169,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Eppadi%20Vandhaayo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Eppadi%20Vandhaayo.jpg"
  },
  {
    "id": 561,
    "title": "Eri Mazhaiyena",
    "artist": "Theeson, Saindhavi",
    "album": "Mangai",
    "duration": 142,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Eri%20Mazhaiyena.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Eri%20Mazhaiyena.jpg"
  },
  {
    "id": 562,
    "title": "Escort To Court 2",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 45,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Escort%20To%20Court%202.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Escort%20To%20Court%202.jpg"
  },
  {
    "id": 563,
    "title": "Escort To Court",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 73,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Escort%20To%20Court.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Escort%20To%20Court.jpg"
  },
  {
    "id": 564,
    "title": "Ethana Saami",
    "artist": "G. V. Prakash Kumar, Pushpavanam Kuppusamy",
    "album": "Idli Kadai",
    "duration": 277,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ethana%20Saami.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ethana%20Saami.jpg"
  },
  {
    "id": 565,
    "title": "Ethical Spy",
    "artist": "G. V. Prakash Kumar",
    "album": "Mask",
    "duration": 164,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ethical%20Spy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ethical%20Spy.jpg"
  },
  {
    "id": 566,
    "title": "Ex Flashback",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 68,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Ex-Flashback-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Ex-Flashback-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 567,
    "title": "Exam Failed",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 110,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Exam%20Failed.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Exam%20Failed.jpg"
  },
  {
    "id": 568,
    "title": "Exam Frustration",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 86,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Exam%20Frustration.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Exam%20Frustration.jpg"
  },
  {
    "id": 569,
    "title": "Eyes On The Finish",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 86,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Eyes%20On%20The%20Finish.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Eyes%20On%20The%20Finish.jpg"
  },
  {
    "id": 570,
    "title": "Fake Marriage",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 66,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Fake-Marriage-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Fake-Marriage-MassTamilan.dev.jpg"
  },
  {
    "id": 571,
    "title": "Family In A Pickle",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 38,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Family%20In%20A%20Pickle.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Family%20In%20A%20Pickle.jpg"
  },
  {
    "id": 572,
    "title": "Family Struggles",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 88,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Family%20Struggles.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Family%20Struggles.jpg"
  },
  {
    "id": 573,
    "title": "Family Under Pain",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 106,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Family%20Under%20Pain.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Family%20Under%20Pain.jpg"
  },
  {
    "id": 574,
    "title": "Father and Son Soft Version",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 24,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Father%20and%20Son%20-%20Soft%20Version.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Father%20and%20Son%20-%20Soft%20Version.jpg"
  },
  {
    "id": 575,
    "title": "Father and Son",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 36,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Father%20and%20Son.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Father%20and%20Son.jpg"
  },
  {
    "id": 576,
    "title": "Father Son Drama",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 45,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Father%20Son%20Drama.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Father%20Son%20Drama.jpg"
  },
  {
    "id": 577,
    "title": "Father's Words to His Daughter",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 55,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Father's%20Words%20to%20His%20Daughter.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Father's%20Words%20to%20His%20Daughter.jpg"
  },
  {
    "id": 578,
    "title": "Fight For Her",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 54,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Fight%20For%20Her.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Fight%20For%20Her.jpg"
  },
  {
    "id": 579,
    "title": "Fighting Demons",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 134,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Fighting%20Demons.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Fighting%20Demons.jpg"
  },
  {
    "id": 580,
    "title": "Final Fight",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 75,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Final%20Fight.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Final%20Fight.jpg"
  },
  {
    "id": 581,
    "title": "Final Interview",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 128,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Final%20Interview.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Final%20Interview.jpg"
  },
  {
    "id": 582,
    "title": "Finally a Home Awaits",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 42,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Finally%20a%20Home%20Awaits.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Finally%20a%20Home%20Awaits.jpg"
  },
  {
    "id": 583,
    "title": "Fired From Job",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 31,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Fired%20From%20Job.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Fired%20From%20Job.jpg"
  },
  {
    "id": 584,
    "title": "Firestorm",
    "artist": "Thaman S, Str, Raja Kumari, Deepak Blue",
    "album": "They Call Him OG",
    "duration": 240,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Firestorm.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Firestorm.jpg"
  },
  {
    "id": 585,
    "title": "First Goodbye",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 54,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/First%20Goodbye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/First%20Goodbye.jpg"
  },
  {
    "id": 586,
    "title": "First Love’u Poyidichaam",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 21,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/First%20Love%E2%80%99u%20Poyidichaam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/First%20Love%E2%80%99u%20Poyidichaam.jpg"
  },
  {
    "id": 587,
    "title": "Following The Light",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 94,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Following%20The%20Light.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Following%20The%20Light.jpg"
  },
  {
    "id": 588,
    "title": "Forever and Always",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 110,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Forever%20and%20Always.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Forever%20and%20Always.jpg"
  },
  {
    "id": 589,
    "title": "Fractured Silence",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 77,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Fractured%20Silence.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Fractured%20Silence.jpg"
  },
  {
    "id": 590,
    "title": "Friends Again",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 36,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Friends%20Again.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Friends%20Again.jpg"
  },
  {
    "id": 591,
    "title": "Full Form La Irukinga",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 22,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Full-Form-La-Irukinga-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Full-Form-La-Irukinga-MassTamilan.dev.jpg"
  },
  {
    "id": 592,
    "title": "Gaja Entry",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 46,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/songs/Gaja-Entry-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_3@main/covers/Gaja-Entry-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 593,
    "title": "Ganapathy Homam, Poornahuthi",
    "artist": "T.S. Ashwini Shastry, T.S. Rohini Shastry, Innisaimani, Mamabalram, Srinivas",
    "album": "Vinayagar Chaturthi Bhakti Maalai (Devotional)",
    "duration": 1756,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Ganapathy%20Homam%2C%20Poornahuthi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Ganapathy%20Homam%2C%20Poornahuthi.jpg"
  },
  {
    "id": 594,
    "title": "Ganesh Varadarajan",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 114,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Ganesh%20Varadarajan%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Ganesh%20Varadarajan%20(2).jpg"
  },
  {
    "id": 595,
    "title": "Get on the floor",
    "artist": "Guna Balasubramanian, Yadu Krishnan K, Lavanya",
    "album": "Right",
    "duration": 189,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Get%20on%20the%20floor.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Get%20on%20the%20floor.jpg"
  },
  {
    "id": 596,
    "title": "Girra Girrara",
    "artist": "Narayanan Ravishankar, Sudharshan Ajay",
    "album": "Rambo",
    "duration": 185,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Girra%20Girrara.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Girra%20Girrara.jpg"
  },
  {
    "id": 597,
    "title": "Giru Giru",
    "artist": "G. V. Prakash Kumar, Gana Balachander",
    "album": "Mask",
    "duration": 197,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Giru%20Giru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Giru%20Giru.jpg"
  },
  {
    "id": 598,
    "title": "Glimpse of Bullet",
    "artist": "Iykki Berry, Sam C.S.",
    "album": "Bullet",
    "duration": 153,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Glimpse-of-Bullet-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Glimpse-of-Bullet-MassTamilan.dev.jpg"
  },
  {
    "id": 599,
    "title": "Going For The Holidays",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 33,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Going%20For%20The%20Holidays.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Going%20For%20The%20Holidays.jpg"
  },
  {
    "id": 600,
    "title": "Greatest of The Greatest",
    "artist": "Santhosh Narayanan, OfRO",
    "album": "Vaa Vaathiyaar",
    "duration": 67,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Greatest%20of%20The%20Greatest.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Greatest%20of%20The%20Greatest.jpg"
  },
  {
    "id": 601,
    "title": "Gun Culture",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 138,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Gun%20Culture.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Gun%20Culture.jpg"
  },
  {
    "id": 602,
    "title": "Guns and Roses",
    "artist": "Thaman S, Deepak Blue, Aravind Srinivas, Shenbagaraj Ganesalingam, D. Mohan Kumar",
    "album": "They Call Him OG",
    "duration": 253,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Guns%20and%20Roses.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Guns%20and%20Roses.jpg"
  },
  {
    "id": 603,
    "title": "Guruji",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 37,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Guruji.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Guruji.jpg"
  },
  {
    "id": 604,
    "title": "Happily Ever After",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 181,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Happily%20Ever%20After.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Happily%20Ever%20After.jpg"
  },
  {
    "id": 605,
    "title": "Happy Birthday",
    "artist": "Sean Roldan, Arivu, Mohan Rajan",
    "album": "Revolver Rita",
    "duration": 184,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Happy%20Birthday.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Happy%20Birthday.jpg"
  },
  {
    "id": 606,
    "title": "Harbour Gang",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 107,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Harbour%20Gang.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Harbour%20Gang.jpg"
  },
  {
    "id": 607,
    "title": "He Who Endured",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 100,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/He%20Who%20Endured.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/He%20Who%20Endured.jpg"
  },
  {
    "id": 608,
    "title": "He will never Leave Me alone",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 49,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/He-will-never-Leave-Me-alone-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/He-will-never-Leave-Me-alone-MassTamilan.dev.jpg"
  },
  {
    "id": 609,
    "title": "Heart Goes \"Bak Bak\"",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 24,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Heart%20Goes%20_Bak%20Bak_.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Heart%20Goes%20_Bak%20Bak_.jpg"
  },
  {
    "id": 610,
    "title": "Heavy Steps",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 119,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Heavy%20Steps.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Heavy%20Steps.jpg"
  },
  {
    "id": 611,
    "title": "Hey Adi Ponnaththa",
    "artist": "Achu Rajamani, Yogi B",
    "album": "Kumaara Sambavam",
    "duration": 190,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Hey%20Adi%20Ponnaththa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Hey%20Adi%20Ponnaththa.jpg"
  },
  {
    "id": 612,
    "title": "Hey Kurunjiye",
    "artist": "Nivas K Prasanna, R.Sivatmikha",
    "album": "Kumki 2",
    "duration": 252,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Hey%20Kurunjiye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Hey%20Kurunjiye.jpg"
  },
  {
    "id": 613,
    "title": "Hey Nanba Nanba",
    "artist": "Pritam, Haricharan, Madhan Karky",
    "album": "WAR 2",
    "duration": 190,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Hey%20Nanba%20Nanba.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Hey%20Nanba%20Nanba.jpg"
  },
  {
    "id": 614,
    "title": "Heyleylo Puleyma",
    "artist": "Yuvan Shankar Raja, Mathichiyam Bala",
    "album": "Kombuseevi",
    "duration": 89,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Heyleylo%20Puleyma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Heyleylo%20Puleyma.jpg"
  },
  {
    "id": 615,
    "title": "Hidden Between Heartbeats",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 111,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Hidden%20Between%20Heartbeats.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Hidden%20Between%20Heartbeats.jpg"
  },
  {
    "id": 616,
    "title": "Hindi Nahi Maalum",
    "artist": "Deva",
    "album": "Gandhi Kannadi",
    "duration": 234,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Hindi%20Nahi%20Maalum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Hindi%20Nahi%20Maalum.jpg"
  },
  {
    "id": 617,
    "title": "Home Loan",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 24,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Home%20Loan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Home%20Loan.jpg"
  },
  {
    "id": 618,
    "title": "Hospital Fun",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 41,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Hospital%20Fun.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Hospital%20Fun.jpg"
  },
  {
    "id": 619,
    "title": "House Owner R. Raghavan IPS",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 46,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/House%20Owner%20R.%20Raghavan%20IPS.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/House%20Owner%20R.%20Raghavan%20IPS.jpg"
  },
  {
    "id": 620,
    "title": "Housefull",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 28,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Housefull.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Housefull.jpg"
  },
  {
    "id": 621,
    "title": "Hukum Reloaded",
    "artist": "Anirudh Ravichander",
    "album": "Jailer 2",
    "duration": 91,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Hukum-Reloaded-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Hukum-Reloaded-MassTamilan.dev.jpg"
  },
  {
    "id": 622,
    "title": "Human Lifey Sambavam",
    "artist": "Achu Rajamani",
    "album": "Kumaara Sambavam",
    "duration": 172,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Human%20Lifey%20Sambavam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Human%20Lifey%20Sambavam.jpg"
  },
  {
    "id": 623,
    "title": "Hungry Cheetah",
    "artist": "Thaman S",
    "album": "They Call Him OG",
    "duration": 119,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Hungry%20Cheetah.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Hungry%20Cheetah.jpg"
  },
  {
    "id": 624,
    "title": "Hunt For Upendra",
    "artist": "Sam C.S.",
    "album": "Retta Thala BGM (Original Background Score)",
    "duration": 70,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Hunt%20For%20Upendra.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Hunt%20For%20Upendra.jpg"
  },
  {
    "id": 625,
    "title": "I Came for You, Ajith!",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 37,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/I%20Came%20for%20You%2C%20Ajith!.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/I%20Came%20for%20You%2C%20Ajith!.jpg"
  },
  {
    "id": 626,
    "title": "I'm The Guy",
    "artist": "Ghibran, Guru Hariraj",
    "album": "Aaryan",
    "duration": 206,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/I'm-The-Guy-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/I'm-The-Guy-MassTamilan.dev.jpg"
  },
  {
    "id": 627,
    "title": "Idhu Devadhai Nerame",
    "artist": "Achu Rajamani, Saindhavi, Haricharan",
    "album": "Kumaara Sambavam",
    "duration": 228,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Idhu%20Devadhai%20Nerame.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Idhu%20Devadhai%20Nerame.jpg"
  },
  {
    "id": 628,
    "title": "Idhudhan Engal Ulagam",
    "artist": "G. V. Prakash Kumar, Andrea Jeremiah, Ananthu, Smith Asher, Arulparan Vaaheesan",
    "album": "Mask",
    "duration": 224,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Idhudhan%20Engal%20Ulagam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Idhudhan%20Engal%20Ulagam.jpg"
  },
  {
    "id": 629,
    "title": "Illa Purila",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 26,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Illa-Purila-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Illa-Purila-MassTamilan.dev.jpg"
  },
  {
    "id": 630,
    "title": "In Search For Aishu",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/In%20Search%20For%20Aishu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/In%20Search%20For%20Aishu.jpg"
  },
  {
    "id": 631,
    "title": "In the Streets of Fire",
    "artist": "Thaman S, Harsha Darivemula",
    "album": "They Call Him OG",
    "duration": 114,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/In%20the%20Streets%20of%20Fire.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/In%20the%20Streets%20of%20Fire.jpg"
  },
  {
    "id": 632,
    "title": "Indha Padai",
    "artist": "Vijay Antony, Pradeep Vijayamala",
    "album": "Shakthi Thirumagan",
    "duration": 204,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Indha-Padai-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Indha-Padai-MassTamilan.dev.jpg"
  },
  {
    "id": 633,
    "title": "Innum Dhooram",
    "artist": "Anand Kashinath, Namratha",
    "album": "Yellow",
    "duration": 217,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Innum%20Dhooram.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Innum%20Dhooram.jpg"
  },
  {
    "id": 634,
    "title": "Innum Ethana Kaalam",
    "artist": "Karthik, Shweta Mohan",
    "album": "Bomb",
    "duration": 270,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Innum%20Ethana%20Kaalam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Innum%20Ethana%20Kaalam.jpg"
  },
  {
    "id": 635,
    "title": "Innum Konjam",
    "artist": "Nivas K Prasanna, Abhay Jodhpurkar",
    "album": "Kumki 2",
    "duration": 166,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Innum%20Konjam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Innum%20Konjam.jpg"
  },
  {
    "id": 636,
    "title": "Inspector Thiraviyam",
    "artist": "Sam C.S.",
    "album": "Retta Thala BGM (Original Background Score)",
    "duration": 27,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Inspector%20Thiraviyam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Inspector%20Thiraviyam.jpg"
  },
  {
    "id": 637,
    "title": "Intermission",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 42,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Intermission%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Intermission%20(2).jpg"
  },
  {
    "id": 638,
    "title": "Intermission (Baba BGM (Original Background Score))",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 66,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Intermission.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Intermission.jpg"
  },
  {
    "id": 639,
    "title": "Interval Between Chapters",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 151,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Interval%20Between%20Chapters.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Interval%20Between%20Chapters.jpg"
  },
  {
    "id": 640,
    "title": "Interval Fight",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 98,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Interval%20Fight.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Interval%20Fight.jpg"
  },
  {
    "id": 641,
    "title": "Invention",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 110,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Invention.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Invention.jpg"
  },
  {
    "id": 642,
    "title": "Ippo Ramasamy",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 33,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Ippo%20Ramasamy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Ippo%20Ramasamy.jpg"
  },
  {
    "id": 643,
    "title": "Ippove Paakanum",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 209,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Ippove%20Paakanum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Ippove%20Paakanum.jpg"
  },
  {
    "id": 644,
    "title": "Iraivaa",
    "artist": "Madhu Balakrishnan, Haricharan",
    "album": "Bomb",
    "duration": 216,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Iraivaa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Iraivaa.jpg"
  },
  {
    "id": 645,
    "title": "Iraivan Manamae",
    "artist": "Kannaka Lakshimi, Keeravani",
    "album": "Rambo",
    "duration": 203,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Iraivan%20Manamae.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Iraivan%20Manamae.jpg"
  },
  {
    "id": 646,
    "title": "Irula Kizhangu Vetti",
    "artist": "Justin Prabhakaran, Rajeshwari",
    "album": "Thandakaaranyam",
    "duration": 64,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Irula%20Kizhangu%20Vetti.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Irula%20Kizhangu%20Vetti.jpg"
  },
  {
    "id": 647,
    "title": "It's Never Too Late",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 96,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/It's%20Never%20Too%20Late.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/It's%20Never%20Too%20Late.jpg"
  },
  {
    "id": 648,
    "title": "Ivanga Illa Sir",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 90,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Ivanga%20Illa%20Sir.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Ivanga%20Illa%20Sir.jpg"
  },
  {
    "id": 649,
    "title": "Jagannathan & Family",
    "artist": "Sam C.S.",
    "album": "Retta Thala BGM (Original Background Score)",
    "duration": 85,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jagannathan%20%26%20Family.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jagannathan%20%26%20Family.jpg"
  },
  {
    "id": 650,
    "title": "Jagannathan Reddy",
    "artist": "Sam C.S.",
    "album": "Retta Thala BGM (Original Background Score)",
    "duration": 33,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jagannathan%20Reddy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jagannathan%20Reddy.jpg"
  },
  {
    "id": 651,
    "title": "Jaragandi",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 260,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jaragandi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jaragandi.jpg"
  },
  {
    "id": 652,
    "title": "Jenny Theme",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 79,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jenny%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jenny%20Theme.jpg"
  },
  {
    "id": 653,
    "title": "Jigar Thanda (Female)",
    "artist": "A.R.Rahman, Khatija Rahman, Amina Rafiq, Adithya RK",
    "album": "Tere Ishk Mein",
    "duration": 271,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jigar%20Thanda%20(Female).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jigar%20Thanda%20(Female).jpg"
  },
  {
    "id": 654,
    "title": "Jigar Thandhaale",
    "artist": "A.R.Rahman, Haricharan",
    "album": "Tere Ishk Mein",
    "duration": 212,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jigar%20Thandhaale.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jigar%20Thandhaale.jpg"
  },
  {
    "id": 655,
    "title": "Jiger",
    "artist": "A.R.Rahman",
    "album": "Moonwalk Mini Cassette",
    "duration": 55,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jiger%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jiger%20(2).jpg"
  },
  {
    "id": 656,
    "title": "Jiger (Moonwalk)",
    "artist": "A.R.Rahman",
    "album": "Moonwalk",
    "duration": 243,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jiger.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jiger.jpg"
  },
  {
    "id": 657,
    "title": "Jill Jill",
    "artist": "Vijay Antony, Vaaheesan Rasaiya",
    "album": "Shakthi Thirumagan",
    "duration": 217,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jill-Jill-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jill-Jill-MassTamilan.dev.jpg"
  },
  {
    "id": 658,
    "title": "Jillelama",
    "artist": "Jen Martin, Adithya RK, Priya Mali",
    "album": "Kiss",
    "duration": 212,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jillelama.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jillelama.jpg"
  },
  {
    "id": 659,
    "title": "Jilloma",
    "artist": "Pranav Muniraj, Kapil Kapilan",
    "album": "Middle Class",
    "duration": 172,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jilloma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jilloma.jpg"
  },
  {
    "id": 660,
    "title": "Jodi Porutham",
    "artist": "Siddhu Kumar, Lakshmikanth M",
    "album": "Aan Paavam Pollathathu",
    "duration": 225,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Jodi%20Porutham.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Jodi%20Porutham.jpg"
  },
  {
    "id": 661,
    "title": "John Bravo",
    "artist": "Sam C.S.",
    "album": "Retta Thala BGM (Original Background Score)",
    "duration": 67,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/John%20Bravo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/John%20Bravo.jpg"
  },
  {
    "id": 662,
    "title": "Just Before The Wedding",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 131,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Just-Before-The-Wedding-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Just-Before-The-Wedding-MassTamilan.dev.jpg"
  },
  {
    "id": 663,
    "title": "Kaakum Vadivel",
    "artist": "Vaaheesan Rasaiya, Ajai S Khashyap, Dharan Kumar",
    "album": "Kaakum Vadivel (Devotional)",
    "duration": 221,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaakum%20Vadivel.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaakum%20Vadivel.jpg"
  },
  {
    "id": 664,
    "title": "Kaaladheera",
    "artist": "Vijay Antony, ADK",
    "album": "Shakthi Thirumagan",
    "duration": 201,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaaladheera-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaaladheera-MassTamilan.dev.jpg"
  },
  {
    "id": 665,
    "title": "Kaalam Oodum",
    "artist": "Sam C.S.",
    "album": "Blackmail",
    "duration": 269,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaalam%20Oodum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaalam%20Oodum.jpg"
  },
  {
    "id": 666,
    "title": "Kaalamaadan Gaanam",
    "artist": "Nivas K. Prasanna, V.M.Mahalingam",
    "album": "Bison",
    "duration": 297,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaalamaadan%20Gaanam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaalamaadan%20Gaanam.jpg"
  },
  {
    "id": 667,
    "title": "Kaali Meets Upendra",
    "artist": "Sam C.S.",
    "album": "Retta Thala BGM (Original Background Score)",
    "duration": 89,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaali%20Meets%20Upendra.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaali%20Meets%20Upendra.jpg"
  },
  {
    "id": 668,
    "title": "Kaali Vs Upendra",
    "artist": "Sam C.S.",
    "album": "Retta Thala BGM (Original Background Score)",
    "duration": 111,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaali%20Vs%20Upendra.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaali%20Vs%20Upendra.jpg"
  },
  {
    "id": 669,
    "title": "Kaali's Intro",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 68,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaali's-Intro-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaali's-Intro-MassTamilan.dev.jpg"
  },
  {
    "id": 670,
    "title": "Kaali's Outrage",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 117,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaali's-Outrage-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaali's-Outrage-MassTamilan.dev.jpg"
  },
  {
    "id": 671,
    "title": "Kaali's Sketch",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 88,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaali's-Sketch-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaali's-Sketch-MassTamilan.dev.jpg"
  },
  {
    "id": 672,
    "title": "Kaali Meets SP",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 88,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaali-Meets-SP-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaali-Meets-SP-MassTamilan.dev.jpg"
  },
  {
    "id": 673,
    "title": "Kaali",
    "artist": "Sam C.S.",
    "album": "Retta Thala BGM (Original Background Score)",
    "duration": 52,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaali.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaali.jpg"
  },
  {
    "id": 674,
    "title": "Kaanalaye Kaanalaye",
    "artist": "Rockstar Ramani Amma, Bharath Aaseevagan",
    "album": "Theeyavar Kulai Nadunga",
    "duration": 190,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaanalaye%20Kaanalaye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaanalaye%20Kaanalaye.jpg"
  },
  {
    "id": 675,
    "title": "Kaathodu Poguma",
    "artist": "Ashwin Vinayagamoorthy, Haricharan",
    "album": "Indian Penal Law (IPL)",
    "duration": 224,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaathodu%20Poguma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaathodu%20Poguma.jpg"
  },
  {
    "id": 676,
    "title": "Kaava Kaade",
    "artist": "Justin Prabhakaran, Arivu, Reema",
    "album": "Thandakaaranyam",
    "duration": 211,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaava%20Kaade.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaava%20Kaade.jpg"
  },
  {
    "id": 677,
    "title": "Kabir Theme Reloaded",
    "artist": "Sanchit Balhara, Ankit Balhara",
    "album": "WAR 2",
    "duration": 89,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kabir%20Theme%20Reloaded.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kabir%20Theme%20Reloaded.jpg"
  },
  {
    "id": 678,
    "title": "Kadengum Vaasam",
    "artist": "VV Prassanna",
    "album": "Mahasenha",
    "duration": 203,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kadengum%20Vaasam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kadengum%20Vaasam.jpg"
  },
  {
    "id": 679,
    "title": "Kadhal Uyire",
    "artist": "Yuvan Shankar Raja",
    "album": "Gandhi Kannadi",
    "duration": 297,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kadhal%20Uyire.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kadhal%20Uyire.jpg"
  },
  {
    "id": 680,
    "title": "Kaiko Love",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 17,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaiko%20Love.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaiko%20Love.jpg"
  },
  {
    "id": 681,
    "title": "Kaiveesum",
    "artist": "Krish, Ananthu",
    "album": "Kuttram Pudhithu",
    "duration": 209,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaiveesum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaiveesum.jpg"
  },
  {
    "id": 682,
    "title": "Kalaaba",
    "artist": "Pritam, Nakash Aziz, Yazin Nizar, Madhan Karky",
    "album": "WAR 2",
    "duration": 215,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kalaaba.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kalaaba.jpg"
  },
  {
    "id": 683,
    "title": "Kalai Father Brutality",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 118,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kalai%20Father%20Brutality.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kalai%20Father%20Brutality.jpg"
  },
  {
    "id": 684,
    "title": "Kalai Longing For Abdul",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 152,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kalai%20Longing%20For%20Abdul.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kalai%20Longing%20For%20Abdul.jpg"
  },
  {
    "id": 685,
    "title": "Kalai Struggles Inside Home",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 234,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kalai%20Struggles%20Inside%20Home.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kalai%20Struggles%20Inside%20Home.jpg"
  },
  {
    "id": 686,
    "title": "Kalai",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 50,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kalai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kalai.jpg"
  },
  {
    "id": 687,
    "title": "Kalaiyarasi And Abdul Confessions",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 152,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kalaiyarasi%20And%20Abdul%20Confessions.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kalaiyarasi%20And%20Abdul%20Confessions.jpg"
  },
  {
    "id": 688,
    "title": "Kaleesha",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 222,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kaleesha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kaleesha.jpg"
  },
  {
    "id": 689,
    "title": "Kalyani The Mastermind",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 57,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kalyani%20The%20Mastermind.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kalyani%20The%20Mastermind.jpg"
  },
  {
    "id": 690,
    "title": "Kana Kanden",
    "artist": "Stephen Zechariah, Pragathi Guruprasad",
    "album": "Kana Kanden (Indie)",
    "duration": 238,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kana%20Kanden.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kana%20Kanden.jpg"
  },
  {
    "id": 691,
    "title": "Kanaa",
    "artist": "N.R. Raghunanthan, Aparna Harikumar",
    "album": "Lock Down",
    "duration": 181,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kanaa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kanaa.jpg"
  },
  {
    "id": 692,
    "title": "Kanavugal Indri",
    "artist": "G. V. Prakash Kumar, Sublahshini",
    "album": "Mask",
    "duration": 96,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kanavugal%20Indri.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kanavugal%20Indri.jpg"
  },
  {
    "id": 693,
    "title": "Kandara Kolli",
    "artist": "Sam C.S., Sivam, Viveka",
    "album": "Retta Thala",
    "duration": 263,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kandara%20Kolli.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kandara%20Kolli.jpg"
  },
  {
    "id": 694,
    "title": "Kanmani Poove",
    "artist": "Guna Balasubramanian",
    "album": "Right",
    "duration": 218,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kanmani%20Poove.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kanmani%20Poove.jpg"
  },
  {
    "id": 695,
    "title": "Kanmani Nee",
    "artist": "Pradeep Kumar",
    "album": "Kaantha",
    "duration": 206,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kanmani-Nee-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kanmani-Nee-MassTamilan.dev.jpg"
  },
  {
    "id": 696,
    "title": "Kanmaniyae",
    "artist": "Cliffy Chris, Kapil Kapilan",
    "album": "Yellow",
    "duration": 227,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kanmaniyae.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kanmaniyae.jpg"
  },
  {
    "id": 697,
    "title": "Kanna Moochi Vena",
    "artist": "Gold Devaraj, Ghibran",
    "album": "BP180",
    "duration": 136,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kanna%20Moochi%20Vena.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kanna%20Moochi%20Vena.jpg"
  },
  {
    "id": 698,
    "title": "Kanna's Doubt",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 69,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kanna's-Doubt-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kanna's-Doubt-MassTamilan.dev.jpg"
  },
  {
    "id": 699,
    "title": "Kannae Kanmaniye",
    "artist": "A.R.Rahman",
    "album": "Tere Ishk Mein",
    "duration": 337,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kannae%20Kanmaniye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kannae%20Kanmaniye.jpg"
  },
  {
    "id": 700,
    "title": "Kannakuzhikaaraa",
    "artist": "Mysskin, Shruti Haasan",
    "album": "Train",
    "duration": 377,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kannakuzhikaaraa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kannakuzhikaaraa.jpg"
  },
  {
    "id": 701,
    "title": "Kannamma",
    "artist": "Dhanush",
    "album": "Retta Thala",
    "duration": 250,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kannamma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kannamma.jpg"
  },
  {
    "id": 702,
    "title": "Kanne Kalangadha",
    "artist": "Justin Prabhakaran",
    "album": "Sirai",
    "duration": 151,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kanne%20Kalangadha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kanne%20Kalangadha.jpg"
  },
  {
    "id": 703,
    "title": "Kanneeril Nindraalum",
    "artist": "Siddharth Vipin, Saindhavi",
    "album": "Lock Down",
    "duration": 208,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kanneeril%20Nindraalum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kanneeril%20Nindraalum.jpg"
  },
  {
    "id": 704,
    "title": "Kannile Eeram",
    "artist": "N.R.Raghunanthan, Sai Vignesh",
    "album": "Marutham",
    "duration": 244,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kannile%20Eeram.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kannile%20Eeram.jpg"
  },
  {
    "id": 705,
    "title": "Kannukulla (Reprise)",
    "artist": "Sai Abhyankkar",
    "album": "Dude",
    "duration": 274,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kannukulla%20(Reprise).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kannukulla%20(Reprise).jpg"
  },
  {
    "id": 706,
    "title": "Kannukulla",
    "artist": "Sai Abhyankkar, Jonita Gandhi",
    "album": "Dude",
    "duration": 273,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kannukulla.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kannukulla.jpg"
  },
  {
    "id": 707,
    "title": "Kannumuzhi",
    "artist": "G. V. Prakash Kumar, Anthony Daasan, Sublahshini",
    "album": "Mask",
    "duration": 225,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kannumuzhi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kannumuzhi.jpg"
  },
  {
    "id": 708,
    "title": "Kantara Chapter 1 Trailer Theme (From \"Kantara A Legend Chapter 1 Tamil\")",
    "artist": "B. Ajaneesh Loknath",
    "album": "Kantara Chapter 1",
    "duration": 176,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kantara%20Chapter%20-%201%20Trailer%20Theme%20(From%20_Kantara%20A%20Legend%20Chapter%201%20-%20Tamil_).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kantara%20Chapter%20-%201%20Trailer%20Theme%20(From%20_Kantara%20A%20Legend%20Chapter%201%20-%20Tamil_).jpg"
  },
  {
    "id": 709,
    "title": "Kantara Chapter 1 Theme",
    "artist": "B. Ajaneesh Loknath",
    "album": "Kantara Chapter 1",
    "duration": 82,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kantara%20Chapter%201%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kantara%20Chapter%201%20Theme.jpg"
  },
  {
    "id": 710,
    "title": "Kanukulla Bgm",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kanukulla-Bgm-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kanukulla-Bgm-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 711,
    "title": "Karma Song",
    "artist": "B. Ajaneesh Loknath, Venkatesh D. C.",
    "album": "Kantara Chapter 1",
    "duration": 243,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Karma%20Song%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Karma%20Song%20(2).jpg"
  },
  {
    "id": 712,
    "title": "Karmugil Kannazhago",
    "artist": "Jhanu Chanthar, Pradeep Kumar",
    "album": "Kaantha",
    "duration": 214,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Karmugil-Kannazhago-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Karmugil-Kannazhago-MassTamilan.dev.jpg"
  },
  {
    "id": 713,
    "title": "Karuppan",
    "artist": "Yuvan Shankar Raja, V.M. Mahalingam",
    "album": "Kombuseevi",
    "duration": 210,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Karuppan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Karuppan.jpg"
  },
  {
    "id": 714,
    "title": "Karuppu Car",
    "artist": "Asal Kolaar, Bank Rolls Young, RXZOR, Khonsabeats",
    "album": "Karuppu Car (Indie)",
    "duration": 195,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Karuppu%20Car.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Karuppu%20Car.jpg"
  },
  {
    "id": 715,
    "title": "Kathiravan Realization Of Love",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 306,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kathiravan%20Realization%20Of%20Love.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kathiravan%20Realization%20Of%20Love.jpg"
  },
  {
    "id": 716,
    "title": "Kathiravan Theme",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 126,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kathiravan%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kathiravan%20Theme.jpg"
  },
  {
    "id": 717,
    "title": "Kelangu",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 62,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kelangu-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kelangu-MassTamilan.dev.jpg"
  },
  {
    "id": 718,
    "title": "Kikku Yerudhey",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 327,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kikku%20Yerudhey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kikku%20Yerudhey.jpg"
  },
  {
    "id": 719,
    "title": "Kimchi Dosa",
    "artist": "Aoora, Dharan Kumar",
    "album": "Kimchi Dosa (Indie)",
    "duration": 242,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kimchi%20Dosa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kimchi%20Dosa.jpg"
  },
  {
    "id": 720,
    "title": "King Diesel",
    "artist": "Mohan Rajan, Dhibu Ninan Thomas, Arivu",
    "album": "Diesel",
    "duration": 182,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/King%20Diesel.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/King%20Diesel.jpg"
  },
  {
    "id": 721,
    "title": "Kingpin Simon",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 78,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kingpin%20Simon.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kingpin%20Simon.jpg"
  },
  {
    "id": 722,
    "title": "Kiss Kiss Bang Bang",
    "artist": "Thaman S, Sanjana Kalmanje, Soha, D. Mohan Kumar",
    "album": "They Call Him OG",
    "duration": 257,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kiss%20Kiss%20Bang%20Bang.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kiss%20Kiss%20Bang%20Bang.jpg"
  },
  {
    "id": 723,
    "title": "Kitta Nerungadha",
    "artist": "Justin Prabhakaran, Naresh Iyer",
    "album": "Thanal",
    "duration": 204,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kitta%20Nerungadha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kitta%20Nerungadha.jpg"
  },
  {
    "id": 724,
    "title": "Komali Koodaram",
    "artist": "K.J Iyenar, Vrusha Balu",
    "album": "Desingu Raja 2",
    "duration": 151,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Komali%20Koodaram.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Komali%20Koodaram.jpg"
  },
  {
    "id": 725,
    "title": "Konda Devara",
    "artist": "Thaman S, Sindhuja Srinivasan",
    "album": "Game Changer",
    "duration": 142,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Konda%20Devara.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Konda%20Devara.jpg"
  },
  {
    "id": 726,
    "title": "Konjam Pakkam Vaa",
    "artist": "Vivek Mervin, Sam Vishal, Sanjana Kalmanje",
    "album": "Jinn – The Pet",
    "duration": 253,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Konjam%20Pakkam%20Vaa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Konjam%20Pakkam%20Vaa.jpg"
  },
  {
    "id": 727,
    "title": "Kovarap",
    "artist": "Thaman S, Sok",
    "album": "Game Changer",
    "duration": 123,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kovarap.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kovarap.jpg"
  },
  {
    "id": 728,
    "title": "Kulasamy Kaaval Kaaka",
    "artist": "G. V. Prakash Kumar",
    "album": "Idli Kadai",
    "duration": 153,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kulasamy%20Kaaval%20Kaaka.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kulasamy%20Kaaval%20Kaaka.jpg"
  },
  {
    "id": 729,
    "title": "Kural and Nithu",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 75,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kural%20and%20Nithu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kural%20and%20Nithu.jpg"
  },
  {
    "id": 730,
    "title": "Kural's Confession",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 28,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kural's-Confession-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kural's-Confession-MassTamilan.dev.jpg"
  },
  {
    "id": 731,
    "title": "Kural's Confusion",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 95,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kural's-Confusion-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kural's-Confusion-MassTamilan.dev.jpg"
  },
  {
    "id": 732,
    "title": "Kural's Entry",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 48,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kural's-Entry-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kural's-Entry-MassTamilan.dev.jpg"
  },
  {
    "id": 733,
    "title": "Kural Breaks",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 59,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kural-Breaks-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kural-Breaks-MassTamilan.dev.jpg"
  },
  {
    "id": 734,
    "title": "Kuralarasi Is No More",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 54,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kuralarasi-Is-No-More-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kuralarasi-Is-No-More-MassTamilan.dev.jpg"
  },
  {
    "id": 735,
    "title": "Kuttyma",
    "artist": "Vivek Mervin",
    "album": "Jinn – The Pet",
    "duration": 223,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Kuttyma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Kuttyma.jpg"
  },
  {
    "id": 736,
    "title": "Laayi Le",
    "artist": "Hesham Abdul Wahab, Raja Ganapati, Rakendu Mouli",
    "album": "The Girlfriend",
    "duration": 171,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Laayi%20Le.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Laayi%20Le.jpg"
  },
  {
    "id": 737,
    "title": "LaLaLa",
    "artist": "Vivek Mervin",
    "album": "Jinn – The Pet",
    "duration": 234,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/LaLaLa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/LaLaLa.jpg"
  },
  {
    "id": 738,
    "title": "Last Ride",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 72,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Last%20Ride.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Last%20Ride.jpg"
  },
  {
    "id": 739,
    "title": "Last 7 Minutes",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Last-7-Minutes-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Last-7-Minutes-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 740,
    "title": "Lava Lava",
    "artist": "Siddharth Vipin, Priya Jerson",
    "album": "Lock Down",
    "duration": 232,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Lava%20Lava.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Lava%20Lava.jpg"
  },
  {
    "id": 741,
    "title": "Lemon Juice",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 42,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Lemon%20Juice.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Lemon%20Juice.jpg"
  },
  {
    "id": 742,
    "title": "Let The Celebration Begin",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 57,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Let-The-Celebration-Begin-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Let-The-Celebration-Begin-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 743,
    "title": "Lifetime Matrimony",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 21,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Lifetime%20Matrimony%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Lifetime%20Matrimony%20(2).jpg"
  },
  {
    "id": 744,
    "title": "Losing Property",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 270,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Losing%20Property.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Losing%20Property.jpg"
  },
  {
    "id": 745,
    "title": "Love Blossoms",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Love%20Blossoms.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Love%20Blossoms.jpg"
  },
  {
    "id": 746,
    "title": "Love Dhop",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 200,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Love%20Dhop.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Love%20Dhop.jpg"
  },
  {
    "id": 747,
    "title": "Love Letter",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 31,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Love%20Letter.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Love%20Letter.jpg"
  },
  {
    "id": 748,
    "title": "Love Prevails",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 47,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Love%20Prevails.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Love%20Prevails.jpg"
  },
  {
    "id": 749,
    "title": "Lucky Lucky Rai",
    "artist": "Vinod Yajamanya, Sravanthi Reddy, Sai Rajkumar",
    "album": "Janata Bar",
    "duration": 205,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Lucky%20Lucky%20Rai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Lucky%20Lucky%20Rai.jpg"
  },
  {
    "id": 750,
    "title": "Lyraanaa",
    "artist": "Thaman S, Karthik, Shreya Ghoshal",
    "album": "Game Changer",
    "duration": 272,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Lyraanaa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Lyraanaa.jpg"
  },
  {
    "id": 751,
    "title": "Maara Makka",
    "artist": "Rudh",
    "album": "Maara Makka (Indie)",
    "duration": 163,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maara%20Makka.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maara%20Makka.jpg"
  },
  {
    "id": 752,
    "title": "Maarudho",
    "artist": "Vijay Antony, Abhijith Anilkumar",
    "album": "Shakthi Thirumagan",
    "duration": 280,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maarudho-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maarudho-MassTamilan.dev.jpg"
  },
  {
    "id": 753,
    "title": "Maaya",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 47,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maaya.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maaya.jpg"
  },
  {
    "id": 754,
    "title": "Maayai",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maayai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maayai.jpg"
  },
  {
    "id": 755,
    "title": "Maayakkaari",
    "artist": "A.R.Rahman, Palakkad Sriram",
    "album": "Tere Ishk Mein",
    "duration": 219,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maayakkaari.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maayakkaari.jpg"
  },
  {
    "id": 756,
    "title": "Maayam Maayam",
    "artist": "Nivas K Prasanna, Alex Samuel Jenito",
    "album": "Kumki 2",
    "duration": 202,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maayam%20Maayam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maayam%20Maayam.jpg"
  },
  {
    "id": 757,
    "title": "Macarena",
    "artist": "A.R.Rahman",
    "album": "Moonwalk Mini Cassette",
    "duration": 72,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Macarena%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Macarena%20(2).jpg"
  },
  {
    "id": 758,
    "title": "Macarena (Moonwalk)",
    "artist": "A.R.Rahman",
    "album": "Moonwalk",
    "duration": 224,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Macarena.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Macarena.jpg"
  },
  {
    "id": 759,
    "title": "Madharaasi Flow",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Madharaasi%20Flow.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Madharaasi%20Flow.jpg"
  },
  {
    "id": 760,
    "title": "Madharaasi Theme",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi",
    "duration": 73,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Madharaasi%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Madharaasi%20Theme.jpg"
  },
  {
    "id": 761,
    "title": "Magale En Uyirae",
    "artist": "S.N. Arunagiri, Vaikom Vijayalakshmi",
    "album": "Mahasenha",
    "duration": 274,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Magale%20En%20Uyirae.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Magale%20En%20Uyirae.jpg"
  },
  {
    "id": 762,
    "title": "Maha and Shyam’s Wedding",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 107,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maha%20and%20Shyam%E2%80%99s%20Wedding.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maha%20and%20Shyam%E2%80%99s%20Wedding.jpg"
  },
  {
    "id": 763,
    "title": "Maha’s Files Is Converted",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 74,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maha%E2%80%99s%20Files%20Is%20Converted.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maha%E2%80%99s%20Files%20Is%20Converted.jpg"
  },
  {
    "id": 764,
    "title": "Maha’s House – Orthodox",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 99,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maha%E2%80%99s%20House%20%E2%80%93%20Orthodox.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maha%E2%80%99s%20House%20%E2%80%93%20Orthodox.jpg"
  },
  {
    "id": 765,
    "title": "Mama's Boy",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 108,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mama's-Boy-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mama's-Boy-MassTamilan.dev.jpg"
  },
  {
    "id": 766,
    "title": "Man of Beauty",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 31,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Man%20of%20Beauty.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Man%20of%20Beauty.jpg"
  },
  {
    "id": 767,
    "title": "Man \"No\" Volcano",
    "artist": "Santhosh Ram, Ranina Reddy, David Simon",
    "album": "Red Flower",
    "duration": 179,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Man%20_No_%20Volcano.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Man%20_No_%20Volcano.jpg"
  },
  {
    "id": 768,
    "title": "Mana Magane",
    "artist": "Siddhu Kumar, Anthony Daasan, Gana Bala",
    "album": "Aan Paavam Pollathathu",
    "duration": 190,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mana%20Magane.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mana%20Magane.jpg"
  },
  {
    "id": 769,
    "title": "Manase",
    "artist": "Cliffy Chris, Sathyaprakash",
    "album": "Yellow",
    "duration": 279,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Manase.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Manase.jpg"
  },
  {
    "id": 770,
    "title": "Mangaiyarkarasi Passes",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 86,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mangaiyarkarasi%20Passes.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mangaiyarkarasi%20Passes.jpg"
  },
  {
    "id": 771,
    "title": "Mangaiyarkarasi's Memorial",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 42,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mangaiyarkarasi's%20Memorial.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mangaiyarkarasi's%20Memorial.jpg"
  },
  {
    "id": 772,
    "title": "Mannana Vandhana Sad version",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 70,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mannana-Vandhana-Sad-version-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mannana-Vandhana-Sad-version-MassTamilan.dev.jpg"
  },
  {
    "id": 773,
    "title": "Mannaru Vandhaaru",
    "artist": "Vignesh Ramakrishna, Siddhu Kumar, Sublahshini",
    "album": "Aaromaley",
    "duration": 157,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mannaru%20Vandhaaru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mannaru%20Vandhaaru.jpg"
  },
  {
    "id": 774,
    "title": "Mannichiru",
    "artist": "Sathyaprakash D, Aanandi Joshi, Justin Prabhakaran",
    "album": "Sirai",
    "duration": 233,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mannichiru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mannichiru.jpg"
  },
  {
    "id": 775,
    "title": "Mannichuru",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 39,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mannichuru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mannichuru.jpg"
  },
  {
    "id": 776,
    "title": "Mansion Rules",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 46,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mansion%20Rules.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mansion%20Rules.jpg"
  },
  {
    "id": 777,
    "title": "Masalamma",
    "artist": "Sean Roldan",
    "album": "Revolver Rita",
    "duration": 189,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Masalamma.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Masalamma.jpg"
  },
  {
    "id": 778,
    "title": "Matter ku Money ah?",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Matter%20ku%20Money%20ah.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Matter%20ku%20Money%20ah.jpg"
  },
  {
    "id": 779,
    "title": "Maya Maya",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 348,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maya%20Maya.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maya%20Maya.jpg"
  },
  {
    "id": 780,
    "title": "Maya Mazhalai Megam",
    "artist": "Pradeep Kumar, Bharath Aaseevagan",
    "album": "Theeyavar Kulai Nadunga",
    "duration": 262,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Maya%20Mazhalai%20Megam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Maya%20Mazhalai%20Megam.jpg"
  },
  {
    "id": 781,
    "title": "Mayakkam Enna",
    "artist": "Deepthi Suresh",
    "album": "Rambo",
    "duration": 182,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mayakkam%20Enna.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mayakkam%20Enna.jpg"
  },
  {
    "id": 782,
    "title": "Mayile",
    "artist": "A.R.Rahman",
    "album": "Moonwalk Mini Cassette",
    "duration": 62,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mayile%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mayile%20(2).jpg"
  },
  {
    "id": 783,
    "title": "Mayile (Moonwalk)",
    "artist": "A.R.Rahman",
    "album": "Moonwalk",
    "duration": 272,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mayile.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mayile.jpg"
  },
  {
    "id": 784,
    "title": "Mazhai Vaanam",
    "artist": "Poly Varghese, Malgudi Subha, Ananthu",
    "album": "Saayavanam",
    "duration": 275,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mazhai%20Vaanam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mazhai%20Vaanam.jpg"
  },
  {
    "id": 785,
    "title": "Mega Intro",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 19,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Mega%20Intro.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Mega%20Intro.jpg"
  },
  {
    "id": 786,
    "title": "Megangal",
    "artist": "Cliffy Chris, Shakthisree Gopalan",
    "album": "Yellow",
    "duration": 210,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Megangal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Megangal.jpg"
  },
  {
    "id": 787,
    "title": "Micheal Kalyanam Panikalama?",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Micheal%20Kalyanam%20Panikalama%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Micheal%20Kalyanam%20Panikalama%20(2).jpg"
  },
  {
    "id": 788,
    "title": "Minana Nachathiram (Film Version)",
    "artist": "Jecin George",
    "album": "Yamakaathaghi",
    "duration": 227,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/songs/Minana%20Nachathiram%20(Film%20Version).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_4@main/covers/Minana%20Nachathiram%20(Film%20Version).jpg"
  },
  {
    "id": 789,
    "title": "Minana Nachathiram (Orchestral Version)",
    "artist": "Jecin George",
    "album": "Yamakaathaghi",
    "duration": 276,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Minana%20Nachathiram%20(Orchestral%20Version).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Minana%20Nachathiram%20(Orchestral%20Version).jpg"
  },
  {
    "id": 790,
    "title": "Minnu Vattaam Poochi",
    "artist": "Yuvan Shankar Raja, Padmaja Srinivasan, Justin Prabhakaran, Karthik Netha",
    "album": "Sirai",
    "duration": 218,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Minnu%20Vattaam%20Poochi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Minnu%20Vattaam%20Poochi.jpg"
  },
  {
    "id": 791,
    "title": "Minsara Kanna Theme",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 42,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Minsara%20Kanna%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Minsara%20Kanna%20Theme.jpg"
  },
  {
    "id": 792,
    "title": "Minsara Kanna",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 373,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Minsara%20Kanna.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Minsara%20Kanna.jpg"
  },
  {
    "id": 793,
    "title": "Monica Transition",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 36,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Monica%20Transition.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Monica%20Transition.jpg"
  },
  {
    "id": 794,
    "title": "Moochava Pechava",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 116,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Moochava-Pechava-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Moochava-Pechava-MassTamilan.dev.jpg"
  },
  {
    "id": 795,
    "title": "Mopidevi",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 184,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Mopidevi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Mopidevi.jpg"
  },
  {
    "id": 796,
    "title": "Mother Stops Baba",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 372,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Mother%20Stops%20Baba.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Mother%20Stops%20Baba.jpg"
  },
  {
    "id": 797,
    "title": "Mother's Death",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 1478,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Mother's%20Death.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Mother's%20Death.jpg"
  },
  {
    "id": 798,
    "title": "Mother's Dream",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 45,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Mother's%20Dream.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Mother's%20Dream.jpg"
  },
  {
    "id": 799,
    "title": "Mu Dha La Li",
    "artist": "Santhosh Narayanan, Sublahshini",
    "album": "Vaa Vaathiyaar",
    "duration": 156,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Mu%20Dha%20La%20Li.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Mu%20Dha%20La%20Li.jpg"
  },
  {
    "id": 800,
    "title": "Mudinja Thodra",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi",
    "duration": 117,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Mudinja%20Thodra.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Mudinja%20Thodra.jpg"
  },
  {
    "id": 801,
    "title": "Mulli's Con",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 34,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Mulli's%20Con.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Mulli's%20Con.jpg"
  },
  {
    "id": 802,
    "title": "Muthaarame",
    "artist": "G. V. Prakash Kumar, Saindhavi",
    "album": "Parasakthi",
    "duration": 257,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Muthaarame.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Muthaarame.jpg"
  },
  {
    "id": 803,
    "title": "Muththe Muththarame",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 29,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Muththe-Muththarame-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Muththe-Muththarame-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 804,
    "title": "My Heartu Spinning",
    "artist": "G. V. Prakash Kumar, A. R. Ameen, Sublahshini",
    "album": "Idli Kadai",
    "duration": 152,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/My%20Heartu%20Spinning.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/My%20Heartu%20Spinning.jpg"
  },
  {
    "id": 805,
    "title": "Na Porantha Seemaiyilae",
    "artist": "Justin Prabhakaran, Rajeshwari",
    "album": "Thandakaaranyam",
    "duration": 273,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Na%20Porantha%20Seemaiyilae.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Na%20Porantha%20Seemaiyilae.jpg"
  },
  {
    "id": 806,
    "title": "Naan Kaanum Kadavul",
    "artist": "N.R.Raghunanthan, Sai Vignesh",
    "album": "Cristina Kathirvelan",
    "duration": 186,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Naan%20Kaanum%20Kadavul.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Naan%20Kaanum%20Kadavul.jpg"
  },
  {
    "id": 807,
    "title": "Nache Nache",
    "artist": "Thaman S, Arun Kaundinya, Prakruthi Reddy, Bappi Lahiri, Usha Uthup",
    "album": "The Rajasaab",
    "duration": 263,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nache%20Nache.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nache%20Nache.jpg"
  },
  {
    "id": 808,
    "title": "Nadhiye",
    "artist": "Hesham Abdul Wahab, Rakendu Mouli",
    "album": "The Girlfriend",
    "duration": 218,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nadhiye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nadhiye.jpg"
  },
  {
    "id": 809,
    "title": "Nallaru Po",
    "artist": "Sai Abhyankkar, Tippu, Mohit Chauhan",
    "album": "Dude",
    "duration": 236,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nallaru%20Po.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nallaru%20Po.jpg"
  },
  {
    "id": 810,
    "title": "Nallaru Po Orchestral",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 34,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nallaru-Po-Orchestral-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nallaru-Po-Orchestral-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 811,
    "title": "Nallaru Po X Oorum Blood Orchestral Unplugged",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 77,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nallaru-Po-X-Oorum-Blood-Orchestral-Unplugged-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nallaru-Po-X-Oorum-Blood-Orchestral-Unplugged-MassTamilan.dev.jpg"
  },
  {
    "id": 812,
    "title": "Namakkana Kaalam",
    "artist": "G. V. Prakash Kumar, Haricharan, Nakash Aziz, Velmurugan",
    "album": "Parasakthi",
    "duration": 244,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Namakkana%20Kaalam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Namakkana%20Kaalam.jpg"
  },
  {
    "id": 813,
    "title": "Narasimhan and Ajith Boost Break",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 43,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Narasimhan%20and%20Ajith%20Boost%20Break%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Narasimhan%20and%20Ajith%20Boost%20Break%20(2).jpg"
  },
  {
    "id": 814,
    "title": "Narasimhan in Love!",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Narasimhan%20in%20Love!%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Narasimhan%20in%20Love!%20(2).jpg"
  },
  {
    "id": 815,
    "title": "Narasimhan Is Approved",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 18,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Narasimhan%20Is%20Approved.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Narasimhan%20Is%20Approved.jpg"
  },
  {
    "id": 816,
    "title": "Narasimhan Reveals",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 45,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Narasimhan%20Reveals.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Narasimhan%20Reveals.jpg"
  },
  {
    "id": 817,
    "title": "Narasimhan Takes Anjali On",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 48,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Narasimhan%20Takes%20Anjali%20On.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Narasimhan%20Takes%20Anjali%20On.jpg"
  },
  {
    "id": 818,
    "title": "Narasimhan vs Sreethar Kaamakoti",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 103,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Narasimhan%20vs%20Sreethar%20Kaamakoti.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Narasimhan%20vs%20Sreethar%20Kaamakoti.jpg"
  },
  {
    "id": 819,
    "title": "Naughty But New At This",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 80,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Naughty%20But%20New%20At%20This.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Naughty%20But%20New%20At%20This.jpg"
  },
  {
    "id": 820,
    "title": "Neelothi Flute",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 89,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Neelothi%20Flute.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Neelothi%20Flute.jpg"
  },
  {
    "id": 821,
    "title": "Neelothi",
    "artist": "Sooraj Santhosh, Chinmayi Sripada, Justin Prabhakaran, Sarathi",
    "album": "Sirai",
    "duration": 274,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Neelothi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Neelothi.jpg"
  },
  {
    "id": 822,
    "title": "Neeye Neeye Oli",
    "artist": "Hesham Abdul Wahab, Aravind Srinivas, Rakendu Mouli",
    "album": "The Girlfriend",
    "duration": 201,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Neeye%20Neeye%20Oli.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Neeye%20Neeye%20Oli.jpg"
  },
  {
    "id": 823,
    "title": "Nellu Vilayira",
    "artist": "N.R.Raghunanthan, Jithin Raj",
    "album": "Marutham",
    "duration": 262,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nellu%20Vilayira.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nellu%20Vilayira.jpg"
  },
  {
    "id": 824,
    "title": "Nenjame",
    "artist": "Pranav Giridharan, Haritha Shri Varshini",
    "album": "Nenjame (Indie)",
    "duration": 178,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nenjame.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nenjame.jpg"
  },
  {
    "id": 825,
    "title": "Nenjamo Thavikkithe",
    "artist": "N.R.Raghunanthan, Lijesh Kumar",
    "album": "Marutham",
    "duration": 226,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nenjamo%20Thavikkithe.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nenjamo%20Thavikkithe.jpg"
  },
  {
    "id": 826,
    "title": "New Job",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 50,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/New%20Job.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/New%20Job.jpg"
  },
  {
    "id": 827,
    "title": "Newly Married",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 54,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Newly-Married-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Newly-Married-MassTamilan.dev.jpg"
  },
  {
    "id": 828,
    "title": "Nila Malai",
    "artist": "Sathyaprakash",
    "album": "Desingu Raja 2",
    "duration": 202,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nila%20Malai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nila%20Malai.jpg"
  },
  {
    "id": 829,
    "title": "Nilamabari Challenge Padayppa",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 202,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nilamabari%20Challenge%20Padayppa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nilamabari%20Challenge%20Padayppa.jpg"
  },
  {
    "id": 830,
    "title": "Nilamabari Warns Vasundhra",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 97,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nilamabari%20Warns%20Vasundhra.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nilamabari%20Warns%20Vasundhra.jpg"
  },
  {
    "id": 831,
    "title": "Nilambari Defeated",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 240,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nilambari%20Defeated.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nilambari%20Defeated.jpg"
  },
  {
    "id": 832,
    "title": "Nilambari Intro",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 55,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nilambari%20Intro.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nilambari%20Intro.jpg"
  },
  {
    "id": 833,
    "title": "Nilambari Returns",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 165,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nilambari%20Returns.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nilambari%20Returns.jpg"
  },
  {
    "id": 834,
    "title": "Nilambari Thandavam",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 137,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nilambari%20Thandavam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nilambari%20Thandavam.jpg"
  },
  {
    "id": 835,
    "title": "Nilambari's Disguise",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 101,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nilambari's%20Disguise.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nilambari's%20Disguise.jpg"
  },
  {
    "id": 836,
    "title": "Nilambari's Love",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 22,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nilambari's%20Love.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nilambari's%20Love.jpg"
  },
  {
    "id": 837,
    "title": "Nilave Mariyathai",
    "artist": "Nivas K Prasanna",
    "album": "Kumki 2",
    "duration": 143,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Nilave%20Mariyathai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Nilave%20Mariyathai.jpg"
  },
  {
    "id": 838,
    "title": "Novala",
    "artist": "Santhosh Narayanan, Dabzee, Jayamoorthy",
    "album": "Novala (Indie)",
    "duration": 208,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Novala.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Novala.jpg"
  },
  {
    "id": 839,
    "title": "Now You've Become a Man",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 30,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Now%20You've%20Become%20a%20Man%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Now%20You've%20Become%20a%20Man%20(2).jpg"
  },
  {
    "id": 840,
    "title": "O Kadhale",
    "artist": "A.R.Rahman, Adithya RK",
    "album": "Tere Ishk Mein",
    "duration": 350,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/O%20Kadhale.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/O%20Kadhale.jpg"
  },
  {
    "id": 841,
    "title": "O Kelvikkuriye",
    "artist": "Hesham Abdul Wahab, Chinmayi Sripada, Rakendu Mouli",
    "album": "The Girlfriend",
    "duration": 276,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/O%20Kelvikkuriye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/O%20Kelvikkuriye.jpg"
  },
  {
    "id": 842,
    "title": "O Penne",
    "artist": "Kaviya Isaivi",
    "album": "Janata Bar",
    "duration": 223,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/O%20Penne.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/O%20Penne.jpg"
  },
  {
    "id": 843,
    "title": "OG Aadhiyaman",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 87,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/OG-Aadhiyaman-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/OG-Aadhiyaman-MassTamilan.dev.jpg"
  },
  {
    "id": 844,
    "title": "Old Souls, Young Hearts",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 102,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Old%20Souls%2C%20Young%20Hearts.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Old%20Souls%2C%20Young%20Hearts.jpg"
  },
  {
    "id": 845,
    "title": "Olikeetrai Nee Thedinaal",
    "artist": "Poly Varghese, Rajashree Santhosh",
    "album": "Saayavanam",
    "duration": 267,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Olikeetrai%20Nee%20Thedinaal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Olikeetrai%20Nee%20Thedinaal.jpg"
  },
  {
    "id": 846,
    "title": "Oliya Kekka",
    "artist": "Pushpavanam Kuppusamy, Yazin Nizar",
    "album": "Bomb",
    "duration": 254,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Oliya%20Kekka.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Oliya%20Kekka.jpg"
  },
  {
    "id": 847,
    "title": "On The Other Side of Silence",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 90,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/On%20The%20Other%20Side%20of%20Silence.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/On%20The%20Other%20Side%20of%20Silence.jpg"
  },
  {
    "id": 848,
    "title": "On Stage Perfomance",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/On-Stage-Perfomance-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/On-Stage-Perfomance-MassTamilan.dev.jpg"
  },
  {
    "id": 849,
    "title": "Oorum Blood Unplugged",
    "artist": "Sai Abhyankkar",
    "album": "Dude",
    "duration": 80,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Oorum%20Blood%20Unplugged.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Oorum%20Blood%20Unplugged.jpg"
  },
  {
    "id": 850,
    "title": "Oorum Blood",
    "artist": "Sai Abhyankkar, Bebhumika, Deepthi Suresh",
    "album": "Dude",
    "duration": 240,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Oorum%20Blood.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Oorum%20Blood.jpg"
  },
  {
    "id": 851,
    "title": "Oorum Blood Comedy",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Oorum-Blood-Comedy-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Oorum-Blood-Comedy-MassTamilan.dev.jpg"
  },
  {
    "id": 852,
    "title": "Oorum blood Nadhaswaram Interval",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 45,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Oorum-blood-Nadhaswaram-Interval-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Oorum-blood-Nadhaswaram-Interval-MassTamilan.dev.jpg"
  },
  {
    "id": 853,
    "title": "Oorum blood Orchestral",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 78,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Oorum-blood-Orchestral-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Oorum-blood-Orchestral-MassTamilan.dev.jpg"
  },
  {
    "id": 854,
    "title": "Oorum blood Rage Rock",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 52,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Oorum-blood-Rage-Rock-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Oorum-blood-Rage-Rock-MassTamilan.dev.jpg"
  },
  {
    "id": 855,
    "title": "Oorum blood Soul",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 25,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Oorum-blood-Soul-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Oorum-blood-Soul-MassTamilan.dev.jpg"
  },
  {
    "id": 856,
    "title": "Orphan",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 55,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Orphan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Orphan.jpg"
  },
  {
    "id": 857,
    "title": "Oru Pere Varalaaru",
    "artist": "",
    "album": "Jana Nayagan",
    "duration": 234,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Oru-Pere-Varalaaru-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Oru-Pere-Varalaaru-MassTamilan.dev.jpg"
  },
  {
    "id": 858,
    "title": "Othukkiriya",
    "artist": "Nikhita Gandhi, D. Imman",
    "album": "Blackmail",
    "duration": 229,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Othukkiriya.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Othukkiriya.jpg"
  },
  {
    "id": 859,
    "title": "Otrai Kombudaiya",
    "artist": "T.M.S. Balraj",
    "album": "Vinayagar Chaturthi Bhakti Maalai (Devotional)",
    "duration": 313,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Otrai%20Kombudaiya.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Otrai%20Kombudaiya.jpg"
  },
  {
    "id": 860,
    "title": "Otta Kuduse",
    "artist": "Cliffy Chris, Anthony Daasan",
    "album": "Yellow",
    "duration": 196,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Otta%20Kuduse.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Otta%20Kuduse.jpg"
  },
  {
    "id": 861,
    "title": "Our First Home",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Our%20First%20Home.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Our%20First%20Home.jpg"
  },
  {
    "id": 862,
    "title": "Our Home",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 58,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Our%20Home.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Our%20Home.jpg"
  },
  {
    "id": 863,
    "title": "Ovvoru Manusanum Ovvoru Vitham",
    "artist": "Meghna Sumesh, Dharshini Rajkumar",
    "album": "Bomb",
    "duration": 273,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Ovvoru%20Manusanum%20Ovvoru%20Vitham.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Ovvoru%20Manusanum%20Ovvoru%20Vitham.jpg"
  },
  {
    "id": 864,
    "title": "Paari Entry",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 50,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Paari-Entry-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Paari-Entry-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 865,
    "title": "Padaiyappa Intro",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 84,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Padaiyappa%20Intro.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Padaiyappa%20Intro.jpg"
  },
  {
    "id": 866,
    "title": "Padaiyappa Re Entry",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 36,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Padaiyappa%20Re-Entry.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Padaiyappa%20Re-Entry.jpg"
  },
  {
    "id": 867,
    "title": "Padaiyappa Theme",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 46,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Padaiyappa%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Padaiyappa%20Theme.jpg"
  },
  {
    "id": 868,
    "title": "Padaiyappa Vs Nilambari",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 102,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Padaiyappa%20Vs%20Nilambari.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Padaiyappa%20Vs%20Nilambari.jpg"
  },
  {
    "id": 869,
    "title": "Padaiyappa Warns His Paternal Uncle",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 164,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Padaiyappa%20Warns%20His%20Paternal%20Uncle.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Padaiyappa%20Warns%20His%20Paternal%20Uncle.jpg"
  },
  {
    "id": 870,
    "title": "Padaiyappa's Love Success",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 47,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Padaiyappa's%20Love%20Success.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Padaiyappa's%20Love%20Success.jpg"
  },
  {
    "id": 871,
    "title": "Panimalare",
    "artist": "Pradeep Kumar, Priyanka NK",
    "album": "Kaantha",
    "duration": 209,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Panimalare-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Panimalare-MassTamilan.dev.jpg"
  },
  {
    "id": 872,
    "title": "Pass With Flying Colours",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 28,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Pass%20With%20Flying%20Colours.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Pass%20With%20Flying%20Colours.jpg"
  },
  {
    "id": 873,
    "title": "Pattampoochi Siragle",
    "artist": "Prashanth R. Vihari, Dev Mathew, Rakendu Mouli",
    "album": "The Girlfriend",
    "duration": 127,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Pattampoochi%20Siragle.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Pattampoochi%20Siragle.jpg"
  },
  {
    "id": 874,
    "title": "Periyavar Meets Kaali",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 88,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Periyavar-Meets-Kaali-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Periyavar-Meets-Kaali-MassTamilan.dev.jpg"
  },
  {
    "id": 875,
    "title": "Phone Na Hello",
    "artist": "Sabesh Solomon",
    "album": "Phone Na Hello (Indie)",
    "duration": 203,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Phone%20Na%20Hello.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Phone%20Na%20Hello.jpg"
  },
  {
    "id": 876,
    "title": "Photograph",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 39,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Photograph.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Photograph.jpg"
  },
  {
    "id": 877,
    "title": "Pidaari Kovil Thoppu",
    "artist": "Vidya Sagar, Vrusha Balu",
    "album": "Desingu Raja 2",
    "duration": 243,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Pidaari%20Kovil%20Thoppu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Pidaari%20Kovil%20Thoppu.jpg"
  },
  {
    "id": 878,
    "title": "Please Don't Forget Me",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 71,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Please-Don't-Forget-Me-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Please-Don't-Forget-Me-MassTamilan.dev.jpg"
  },
  {
    "id": 879,
    "title": "Police Gathering",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 37,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Police%20Gathering.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Police%20Gathering.jpg"
  },
  {
    "id": 880,
    "title": "Police Station",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 43,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Police%20Station.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Police%20Station.jpg"
  },
  {
    "id": 881,
    "title": "Police's Explanation",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 117,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Police's-Explanation-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Police's-Explanation-MassTamilan.dev.jpg"
  },
  {
    "id": 882,
    "title": "Pookie Gaja",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 52,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Pookie-Gaja-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Pookie-Gaja-MassTamilan.dev.jpg"
  },
  {
    "id": 883,
    "title": "Poraduvom Poraduvom",
    "artist": "Achu Rajamani, Vijay Yesudas",
    "album": "Kumaara Sambavam",
    "duration": 202,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Poraduvom%20Poraduvom.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Poraduvom%20Poraduvom.jpg"
  },
  {
    "id": 884,
    "title": "Pothi Pothi",
    "artist": "Nivas K Prasanna",
    "album": "Kumki 2",
    "duration": 227,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Pothi%20Pothi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Pothi%20Pothi.jpg"
  },
  {
    "id": 885,
    "title": "Powerhouse Code",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 118,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Powerhouse%20Code.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Powerhouse%20Code.jpg"
  },
  {
    "id": 886,
    "title": "Powerhouse x Disco",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 85,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Powerhouse%20x%20Disco.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Powerhouse%20x%20Disco.jpg"
  },
  {
    "id": 887,
    "title": "Prabhu Wins",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 20,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Prabhu%20Wins.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Prabhu%20Wins.jpg"
  },
  {
    "id": 888,
    "title": "Pre Interval",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Pre%20Interval.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Pre%20Interval.jpg"
  },
  {
    "id": 889,
    "title": "Premnath",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Premnath.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Premnath.jpg"
  },
  {
    "id": 890,
    "title": "Pudhu Car",
    "artist": "Ashwin Vinayagamoorthy, Sathyaprakash, Punya Selva, Ramya Ramc",
    "album": "Indian Penal Law (IPL)",
    "duration": 213,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Pudhu%20Car.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Pudhu%20Car.jpg"
  },
  {
    "id": 891,
    "title": "Pugaipadam",
    "artist": "Sebastin Rozario, Aravind Karneeswaran, Vinaita Sivakumar",
    "album": "Pugaipadam (Indie)",
    "duration": 233,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Pugaipadam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Pugaipadam.jpg"
  },
  {
    "id": 892,
    "title": "Raa Macha Macha",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 272,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Raa%20Macha%20Macha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Raa%20Macha%20Macha.jpg"
  },
  {
    "id": 893,
    "title": "Raavana Mavandaa",
    "artist": "Anirudh Ravichander",
    "album": "Jana Nayagan",
    "duration": 107,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Raavana-Mavandaa-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Raavana-Mavandaa-MassTamilan.dev.jpg"
  },
  {
    "id": 894,
    "title": "Radhiye Radhiye",
    "artist": "Sachin Sundar, Haricharan",
    "album": "Andha 7 Naatkal",
    "duration": 228,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Radhiye%20Radhiye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Radhiye%20Radhiye.jpg"
  },
  {
    "id": 895,
    "title": "Rage Of Kaantha",
    "artist": "Siddharth Basrur, Yogi B",
    "album": "Kaantha",
    "duration": 263,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Rage-Of-Kaantha-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Rage-Of-Kaantha-MassTamilan.dev.jpg"
  },
  {
    "id": 896,
    "title": "Raghu & Kaboo Theme",
    "artist": "Sanchit Balhara, Ankit Balhara",
    "album": "WAR 2",
    "duration": 116,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Raghu%20%26%20Kaboo%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Raghu%20%26%20Kaboo%20Theme.jpg"
  },
  {
    "id": 897,
    "title": "Raghu and Malathy",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 159,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Raghu%20and%20Malathy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Raghu%20and%20Malathy.jpg"
  },
  {
    "id": 898,
    "title": "Raghu's Instinct",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 62,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Raghu's%20Instinct.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Raghu's%20Instinct.jpg"
  },
  {
    "id": 899,
    "title": "Raghu's Rise",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 62,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Raghu's%20Rise.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Raghu's%20Rise.jpg"
  },
  {
    "id": 900,
    "title": "Raghu",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 42,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Raghu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Raghu.jpg"
  },
  {
    "id": 901,
    "title": "Raja Naan",
    "artist": "Santhosh Ram, Deepak Blue",
    "album": "Red Flower",
    "duration": 269,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Raja%20Naan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Raja%20Naan.jpg"
  },
  {
    "id": 902,
    "title": "Rajasekar's Lab",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 91,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Rajasekar's%20Lab.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Rajasekar's%20Lab.jpg"
  },
  {
    "id": 903,
    "title": "Rajayame",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 242,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Rajayame.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Rajayame.jpg"
  },
  {
    "id": 904,
    "title": "Raje Yuvaraje",
    "artist": "Thaman S, Adviteeya Vojjala, Baby Shriya Pendyala",
    "album": "The Rajasaab",
    "duration": 252,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Raje%20Yuvaraje.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Raje%20Yuvaraje.jpg"
  },
  {
    "id": 905,
    "title": "Ram Nandan's Love",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 83,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Ram%20Nandan's%20Love.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Ram%20Nandan's%20Love.jpg"
  },
  {
    "id": 906,
    "title": "Ram's Comeback",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 98,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Ram's%20Comeback.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Ram's%20Comeback.jpg"
  },
  {
    "id": 907,
    "title": "Rambo Rambo",
    "artist": "Narayanan Ravishankar, Govind Prasath, Arvind Srinivas",
    "album": "Rambo",
    "duration": 217,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Rambo%20Rambo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Rambo%20Rambo.jpg"
  },
  {
    "id": 908,
    "title": "Rathinamey",
    "artist": "Siddhu Kumar, Lakshmikanth M",
    "album": "Aan Paavam Pollathathu",
    "duration": 136,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Rathinamey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Rathinamey.jpg"
  },
  {
    "id": 909,
    "title": "Ratnamala",
    "artist": "G. V. Prakash Kumar, Sivakarthikeyan, Sreeleela",
    "album": "Parasakthi",
    "duration": 279,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Ratnamala.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Ratnamala.jpg"
  },
  {
    "id": 910,
    "title": "Rebel Saab",
    "artist": "Thaman S, Deepak Blue, Blaaze",
    "album": "The Rajasaab",
    "duration": 221,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Rebel%20Saab.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Rebel%20Saab.jpg"
  },
  {
    "id": 911,
    "title": "Rebel Song",
    "artist": "B. Ajaneesh Loknath, Muthu Sirpi",
    "album": "Kantara Chapter 1",
    "duration": 239,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Rebel%20Song%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Rebel%20Song%20(2).jpg"
  },
  {
    "id": 912,
    "title": "Rekka Rekka",
    "artist": "Nivas K. Prasanna, Vedan",
    "album": "Bison",
    "duration": 303,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Rekka%20Rekka.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Rekka%20Rekka.jpg"
  },
  {
    "id": 913,
    "title": "Reminiscing",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 96,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Reminiscing.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Reminiscing.jpg"
  },
  {
    "id": 914,
    "title": "Rise of TTF",
    "artist": "Ashwin Vinayagamoorthy",
    "album": "Indian Penal Law (IPL)",
    "duration": 107,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Rise%20of%20TTF.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Rise%20of%20TTF.jpg"
  },
  {
    "id": 915,
    "title": "Roonie the Dog",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 19,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Roonie%20the%20Dog%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Roonie%20the%20Dog%20(2).jpg"
  },
  {
    "id": 916,
    "title": "Saalumallo Solumallo",
    "artist": "L.V. Muthuganesh, Meenakshi Elayaraja, Devu Mathew",
    "album": "Saayavanam",
    "duration": 182,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Saalumallo%20Solumallo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Saalumallo%20Solumallo.jpg"
  },
  {
    "id": 917,
    "title": "Safe Guarding Kelangu",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 98,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Safe-Guarding-Kelangu-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Safe-Guarding-Kelangu-MassTamilan.dev.jpg"
  },
  {
    "id": 918,
    "title": "Sahana Sahana",
    "artist": "Thaman S, D Dheeraj, Sruthi Ranjani",
    "album": "The Rajasaab",
    "duration": 263,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sahana%20Sahana.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sahana%20Sahana.jpg"
  },
  {
    "id": 919,
    "title": "Sakthi Theme",
    "artist": "Siddhu Kumar",
    "album": "Aan Paavam Pollathathu",
    "duration": 69,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sakthi%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sakthi%20Theme.jpg"
  },
  {
    "id": 920,
    "title": "Salambala",
    "artist": "Anirudh Ravichander, Sai Abhyankkar",
    "album": "Madharaasi",
    "duration": 207,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Salambala.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Salambala.jpg"
  },
  {
    "id": 921,
    "title": "Same Home",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 66,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Same%20Home.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Same%20Home.jpg"
  },
  {
    "id": 922,
    "title": "Saving Nilamabari from the Bull",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 64,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Saving%20Nilamabari%20from%20the%20Bull.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Saving%20Nilamabari%20from%20the%20Bull.jpg"
  },
  {
    "id": 923,
    "title": "Say My Name",
    "artist": "Jen Martin, Arunraja Kamaraj",
    "album": "Kiss",
    "duration": 150,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Say%20My%20Name.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Say%20My%20Name.jpg"
  },
  {
    "id": 924,
    "title": "Scars Multiply",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 168,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Scars%20Multiply.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Scars%20Multiply.jpg"
  },
  {
    "id": 925,
    "title": "School Days",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/School%20Days.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/School%20Days.jpg"
  },
  {
    "id": 926,
    "title": "Search For The Suspects",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 112,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Search%20For%20The%20Suspects.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Search%20For%20The%20Suspects.jpg"
  },
  {
    "id": 927,
    "title": "Second Home",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Second%20Home.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Second%20Home.jpg"
  },
  {
    "id": 928,
    "title": "Senai Koottam",
    "artist": "Yugabharathi",
    "album": "Parasakthi",
    "duration": 260,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Senai%20Koottam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Senai%20Koottam.jpg"
  },
  {
    "id": 929,
    "title": "Sendoora Poove",
    "artist": "Santosh Hariharan",
    "album": "Janata Bar",
    "duration": 233,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sendoora%20Poove.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sendoora%20Poove.jpg"
  },
  {
    "id": 930,
    "title": "Serithan po",
    "artist": "Pranav Muniraj, Anthony Daasan",
    "album": "Middle Class",
    "duration": 200,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Serithan%20po.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Serithan%20po.jpg"
  },
  {
    "id": 931,
    "title": "Setting Up Shyam",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 81,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Setting%20Up%20Shyam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Setting%20Up%20Shyam.jpg"
  },
  {
    "id": 932,
    "title": "Shadow Mentor",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 73,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Shadow%20Mentor.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Shadow%20Mentor.jpg"
  },
  {
    "id": 933,
    "title": "Shaitan",
    "artist": "Sanchit Balhara, Ankit Balhara, Roll Rida, Riya Duggal",
    "album": "WAR 2",
    "duration": 196,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Shaitan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Shaitan.jpg"
  },
  {
    "id": 934,
    "title": "Shakthi Kodu",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 281,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Shakthi%20Kodu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Shakthi%20Kodu.jpg"
  },
  {
    "id": 935,
    "title": "She Completes Me",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 63,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/She%20Completes%20Me.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/She%20Completes%20Me.jpg"
  },
  {
    "id": 936,
    "title": "She Is Like My Mom",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 52,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/She%20Is%20Like%20My%20Mom.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/She%20Is%20Like%20My%20Mom.jpg"
  },
  {
    "id": 937,
    "title": "She Left Twice",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 95,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/She%20Left%20Twice.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/She%20Left%20Twice.jpg"
  },
  {
    "id": 938,
    "title": "She Was My Best Moment",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 72,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/She-Was-My-Best-Moment-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/She-Was-My-Best-Moment-MassTamilan.dev.jpg"
  },
  {
    "id": 939,
    "title": "Silu Silu Sirippai",
    "artist": "Jecin George, Thanjai Selvi",
    "album": "Yamakaathaghi",
    "duration": 171,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Silu%20Silu%20Sirippai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Silu%20Silu%20Sirippai.jpg"
  },
  {
    "id": 940,
    "title": "Simon x Dayal",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 72,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Simon%20x%20Dayal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Simon%20x%20Dayal.jpg"
  },
  {
    "id": 941,
    "title": "Singari Acoustic Version",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 37,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Singari-Acoustic-Version-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Singari-Acoustic-Version-MassTamilan.dev.jpg"
  },
  {
    "id": 942,
    "title": "Singari",
    "artist": "Sai Abhyankkar, Pradeep Ranganathan, Sai Smriti",
    "album": "Dude",
    "duration": 208,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Singari.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Singari.jpg"
  },
  {
    "id": 943,
    "title": "Sirai Title Theme",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 19,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sirai%20Title%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sirai%20Title%20Theme.jpg"
  },
  {
    "id": 944,
    "title": "Sirani Silalika",
    "artist": "Maris Vijay, Shankar Mahadevan, Mano, Gana Bala, Diwakar, Kirti Killedar, Yutika Verma",
    "album": "Vattakhanal",
    "duration": 332,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sirani%20Silalika.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sirani%20Silalika.jpg"
  },
  {
    "id": 945,
    "title": "Sirippazhagi",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 67,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sirippazhagi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sirippazhagi.jpg"
  },
  {
    "id": 946,
    "title": "Sneak Mode Activated",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 149,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sneak%20Mode%20Activated.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sneak%20Mode%20Activated.jpg"
  },
  {
    "id": 947,
    "title": "SOL",
    "artist": "Sid Sriram",
    "album": "SOL (Indie)",
    "duration": 182,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/SOL.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/SOL.jpg"
  },
  {
    "id": 948,
    "title": "Sollu Pulla",
    "artist": "Sachin Sundar",
    "album": "Andha 7 Naatkal",
    "duration": 210,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sollu%20Pulla.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sollu%20Pulla.jpg"
  },
  {
    "id": 949,
    "title": "Sorry Pa",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sorry%20Pa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sorry%20Pa.jpg"
  },
  {
    "id": 950,
    "title": "Soul of Sudalai Muthu",
    "artist": "Mohammed Maqbool Mansoor",
    "album": "Angammal",
    "duration": 60,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Soul%20of%20Sudalai%20Muthu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Soul%20of%20Sudalai%20Muthu.jpg"
  },
  {
    "id": 951,
    "title": "SP's Deal",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 82,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/SP's-Deal-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/SP's-Deal-MassTamilan.dev.jpg"
  },
  {
    "id": 952,
    "title": "SP Arunagiri Theme",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 60,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/SP-Arunagiri-Theme-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/SP-Arunagiri-Theme-MassTamilan.dev.jpg"
  },
  {
    "id": 953,
    "title": "Sri Ganesa Pancharatnam",
    "artist": "Sudha Ragunathan",
    "album": "Vinayagar Chaturthi Bhakti Maalai (Devotional)",
    "duration": 588,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sri%20Ganesa%20Pancharatnam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sri%20Ganesa%20Pancharatnam.jpg"
  },
  {
    "id": 954,
    "title": "Still Here Still Yours",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 84,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Still%20Here%20Still%20Yours.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Still%20Here%20Still%20Yours.jpg"
  },
  {
    "id": 955,
    "title": "Storm The Moonwalk Theme",
    "artist": "Arivu",
    "album": "Moonwalk",
    "duration": 110,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Storm%20-%20The%20Moonwalk%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Storm%20-%20The%20Moonwalk%20Theme.jpg"
  },
  {
    "id": 956,
    "title": "Sudhandhirane",
    "artist": "Keneeshaa Francis, Bharath Aaseevagan",
    "album": "Theeyavar Kulai Nadunga",
    "duration": 195,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Sudhandhirane.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Sudhandhirane.jpg"
  },
  {
    "id": 957,
    "title": "Suthi Suthi Vandhiga",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 386,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Suthi%20Suthi%20Vandhiga.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Suthi%20Suthi%20Vandhiga.jpg"
  },
  {
    "id": 958,
    "title": "Tamil Nadu Welcomes You",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 69,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Tamil%20Nadu%20Welcomes%20You.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Tamil%20Nadu%20Welcomes%20You.jpg"
  },
  {
    "id": 959,
    "title": "Tamilaga Vettri Kazhagam (Flag Anthem)",
    "artist": "Thaman S",
    "album": "TVK Flag Anthem (Indie)",
    "duration": 264,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Tamilaga-Vettri-Kazhagam-(Flag-Anthem)-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Tamilaga-Vettri-Kazhagam-(Flag-Anthem)-MassTamilan.dev.jpg"
  },
  {
    "id": 960,
    "title": "Terrace Studies",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 70,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Terrace%20Studies.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Terrace%20Studies.jpg"
  },
  {
    "id": 961,
    "title": "Tha Rubber",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 35,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Tha%20Rubber%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Tha%20Rubber%20(2).jpg"
  },
  {
    "id": 962,
    "title": "Thaakurom Thookurom",
    "artist": "Pranav Giridharan, El Fe' Choir, Armious",
    "album": "Cold Call",
    "duration": 234,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Thaakurom%20Thookurom.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Thaakurom%20Thookurom.jpg"
  },
  {
    "id": 963,
    "title": "Thaedi Nindren Naan",
    "artist": "Hesham Abdul Wahab, Chinmayi Sripada, Rahul Ravindran, Rakendu Mouli",
    "album": "The Girlfriend",
    "duration": 97,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Thaedi%20Nindren%20Naan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Thaedi%20Nindren%20Naan.jpg"
  },
  {
    "id": 964,
    "title": "Thaenkoodey",
    "artist": "Pranav Muniraj, Sean Roldan, Sublahshini",
    "album": "Middle Class",
    "duration": 198,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Thaenkoodey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Thaenkoodey.jpg"
  },
  {
    "id": 965,
    "title": "Thalaivan Oruvan",
    "artist": "Santhosh Narayanan, OfRO, SVDP, The Indian Choral Ensemble",
    "album": "Thalaivan Oruvan (Indie)",
    "duration": 244,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Thalaivan%20Oruvan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Thalaivan%20Oruvan.jpg"
  },
  {
    "id": 966,
    "title": "Thanal Theme Song",
    "artist": "Justin Prabhakaran",
    "album": "Thanal",
    "duration": 184,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Thanal%20Theme%20Song.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Thanal%20Theme%20Song.jpg"
  },
  {
    "id": 967,
    "title": "Thangapoovey",
    "artist": "Anirudh Ravichander, Ravi G",
    "album": "Madharaasi",
    "duration": 235,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Thangapoovey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Thangapoovey.jpg"
  },
  {
    "id": 968,
    "title": "Tharakku Tharakku",
    "artist": "G. V. Prakash Kumar, Sivakarthikeyan, A. R. Ameen",
    "album": "Parasakthi",
    "duration": 197,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Tharakku%20Tharakku.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Tharakku%20Tharakku.jpg"
  },
  {
    "id": 969,
    "title": "That Was Not To Hurt You",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 152,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/That-Was-Not-To-Hurt-You-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/That-Was-Not-To-Hurt-You-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 970,
    "title": "Thavikkiren Thudikkiren",
    "artist": "Maris Vijay, Abhay Jodhpurkar, Shailey Bidwaikar",
    "album": "Vattakhanal",
    "duration": 274,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/Thavikkiren%20Thudikkiren.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/Thavikkiren%20Thudikkiren.jpg"
  },
  {
    "id": 971,
    "title": "The 7 Days Test",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 56,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%207%20Days%20Test.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%207%20Days%20Test.jpg"
  },
  {
    "id": 972,
    "title": "The Attack",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 107,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Attack.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Attack.jpg"
  },
  {
    "id": 973,
    "title": "The Call Comes In",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 55,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Call%20Comes%20In.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Call%20Comes%20In.jpg"
  },
  {
    "id": 974,
    "title": "The Chair",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 173,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Chair.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Chair.jpg"
  },
  {
    "id": 975,
    "title": "The Challenge",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 36,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Challenge%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Challenge%20(2).jpg"
  },
  {
    "id": 976,
    "title": "The Conflict",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 115,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Conflict.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Conflict.jpg"
  },
  {
    "id": 977,
    "title": "The Dog Con Unfolds",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 90,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Dog%20Con%20Unfolds.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Dog%20Con%20Unfolds.jpg"
  },
  {
    "id": 978,
    "title": "The Dog Owner's Complaint",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 47,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Dog%20Owner's%20Complaint.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Dog%20Owner's%20Complaint.jpg"
  },
  {
    "id": 979,
    "title": "The Drunk Drama",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 84,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Drunk%20Drama.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Drunk%20Drama.jpg"
  },
  {
    "id": 980,
    "title": "The Drunkard's Past",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 83,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Drunkard's%20Past.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Drunkard's%20Past.jpg"
  },
  {
    "id": 981,
    "title": "The End of Us",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 58,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20End%20of%20Us.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20End%20of%20Us.jpg"
  },
  {
    "id": 982,
    "title": "The Fake Flight Journey",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 34,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Fake%20Flight%20Journey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Fake%20Flight%20Journey.jpg"
  },
  {
    "id": 983,
    "title": "The Hope",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 164,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Hope.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Hope.jpg"
  },
  {
    "id": 984,
    "title": "The Job Meeting",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 48,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Job%20Meeting.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Job%20Meeting.jpg"
  },
  {
    "id": 985,
    "title": "The Last House",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 51,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Last%20House.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Last%20House.jpg"
  },
  {
    "id": 986,
    "title": "The Lift",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 41,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Lift.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Lift.jpg"
  },
  {
    "id": 987,
    "title": "The Line Between Me and Us",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 114,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Line%20Between%20Me%20and%20Us.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Line%20Between%20Me%20and%20Us.jpg"
  },
  {
    "id": 988,
    "title": "The Master Plan",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 104,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Master%20Plan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Master%20Plan.jpg"
  },
  {
    "id": 989,
    "title": "The Mysterious Surrender",
    "artist": "Karan B Krupa",
    "album": "Kuttram Pudhithu",
    "duration": 150,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Mysterious%20Surrender.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Mysterious%20Surrender.jpg"
  },
  {
    "id": 990,
    "title": "The Old Lovers",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 107,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Old%20Lovers.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Old%20Lovers.jpg"
  },
  {
    "id": 991,
    "title": "The Pain of Humiliation",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Pain%20of%20Humiliation.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Pain%20of%20Humiliation.jpg"
  },
  {
    "id": 992,
    "title": "The Painful Joy",
    "artist": "Karan B Krupa",
    "album": "Kuttram Pudhithu",
    "duration": 228,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Painful%20Joy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Painful%20Joy.jpg"
  },
  {
    "id": 993,
    "title": "The Police Chase Continues",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 111,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Police%20Chase%20Continues.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Police%20Chase%20Continues.jpg"
  },
  {
    "id": 994,
    "title": "The Quiet Abyss",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 95,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Quiet%20Abyss.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Quiet%20Abyss.jpg"
  },
  {
    "id": 995,
    "title": "The Raid",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 82,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Raid.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Raid.jpg"
  },
  {
    "id": 996,
    "title": "The Return Of Parvathy",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 119,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Return%20Of%20Parvathy.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Return%20Of%20Parvathy.jpg"
  },
  {
    "id": 997,
    "title": "The Sacred Moment",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 72,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Sacred%20Moment.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Sacred%20Moment.jpg"
  },
  {
    "id": 998,
    "title": "The Sacrifice",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 78,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Sacrifice.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Sacrifice.jpg"
  },
  {
    "id": 999,
    "title": "The Shattered Moment",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 100,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Shattered%20Moment.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Shattered%20Moment.jpg"
  },
  {
    "id": 1000,
    "title": "The Soul of Aaromaley",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 27,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Soul%20of%20Aaromaley%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Soul%20of%20Aaromaley%20(2).jpg"
  },
  {
    "id": 1001,
    "title": "The Soul Of Appanna Part 1",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 120,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Soul%20Of%20Appanna%20-%20Part%201.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Soul%20Of%20Appanna%20-%20Part%201.jpg"
  },
  {
    "id": 1002,
    "title": "The Soul Of Appanna Part 2",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 142,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Soul%20Of%20Appanna%20-%20Part%202.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Soul%20Of%20Appanna%20-%20Part%202.jpg"
  },
  {
    "id": 1003,
    "title": "The Soul Of Appanna Part 3",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 89,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/songs/The%20Soul%20Of%20Appanna%20-%20Part%203.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_5@main/covers/The%20Soul%20Of%20Appanna%20-%20Part%203.jpg"
  },
  {
    "id": 1004,
    "title": "The Walk of Love",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 1 (Original Background Score)",
    "duration": 27,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/The%20Walk%20of%20Love%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/The%20Walk%20of%20Love%20(2).jpg"
  },
  {
    "id": 1005,
    "title": "The Wrong Turn",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 115,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/The%20Wrong%20Turn.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/The%20Wrong%20Turn.jpg"
  },
  {
    "id": 1006,
    "title": "The Birth",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/The-Birth-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/The-Birth-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 1007,
    "title": "The Blast",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 82,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/The-Blast-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/The-Blast-MassTamilan.dev.jpg"
  },
  {
    "id": 1008,
    "title": "The Kill",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 96,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/The-Kill-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/The-Kill-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 1009,
    "title": "The Metro Proposal",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 162,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/The-Metro-Proposal-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/The-Metro-Proposal-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 1010,
    "title": "The Plan",
    "artist": "G. V. Prakash Kumar",
    "album": "Veera Dheera Sooran BGM (Original Background Score)",
    "duration": 113,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/The-Plan-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/The-Plan-MassTamilan.dev.jpg"
  },
  {
    "id": 1011,
    "title": "The Sacrifice",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 55,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/The-Sacrifice-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/The-Sacrifice-MassTamilan.dev.jpg"
  },
  {
    "id": 1012,
    "title": "Theatre Love",
    "artist": "Mohammed Maqbool Mansoor",
    "album": "Angammal",
    "duration": 105,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Theatre%20Love.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Theatre%20Love.jpg"
  },
  {
    "id": 1013,
    "title": "Thedi Thedi",
    "artist": "Pranav Muniraj",
    "album": "Middle Class",
    "duration": 170,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Thedi%20Thedi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Thedi%20Thedi.jpg"
  },
  {
    "id": 1014,
    "title": "Theekkoluthi",
    "artist": "Nivas K. Prasanna",
    "album": "Bison",
    "duration": 364,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Theekkoluthi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Theekkoluthi.jpg"
  },
  {
    "id": 1015,
    "title": "Theerum Kadhal",
    "artist": "Siddhu Kumar, Adithya RK",
    "album": "Aaromaley",
    "duration": 194,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Theerum%20Kadhal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Theerum%20Kadhal.jpg"
  },
  {
    "id": 1016,
    "title": "Thennaadu",
    "artist": "Nivas K. Prasanna, Satyan Mahalingam",
    "album": "Bison",
    "duration": 301,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Thennaadu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Thennaadu.jpg"
  },
  {
    "id": 1017,
    "title": "Thimurukaari",
    "artist": "Sean Roldan",
    "album": "Gandhi Kannadi",
    "duration": 255,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Thimurukaari.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Thimurukaari.jpg"
  },
  {
    "id": 1018,
    "title": "Thirudi",
    "artist": "Jen Martin, Anirudh Ravichander",
    "album": "Kiss",
    "duration": 219,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Thirudi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Thirudi.jpg"
  },
  {
    "id": 1019,
    "title": "This is Rage",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 149,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/This%20is%20Rage.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/This%20is%20Rage.jpg"
  },
  {
    "id": 1020,
    "title": "Thoothukudi Chinnaponnu",
    "artist": "Samuel Nicholas, A.R.Rahman",
    "album": "Thoothukudi Chinnaponnu (Indie)",
    "duration": 167,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Thoothukudi%20Chinnaponnu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Thoothukudi%20Chinnaponnu.jpg"
  },
  {
    "id": 1021,
    "title": "Thotta Dei Trap",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side B BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Thotta-Dei-Trap-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Thotta-Dei-Trap-MassTamilan.dev.jpg"
  },
  {
    "id": 1022,
    "title": "Thulli Thulli",
    "artist": "Thaman S, Sruthi Ranjani, D. Mohan Kumar",
    "album": "They Call Him OG",
    "duration": 275,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Thulli%20Thulli.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Thulli%20Thulli.jpg"
  },
  {
    "id": 1023,
    "title": "Tinga",
    "artist": "A.R.Rahman",
    "album": "Moonwalk Mini Cassette",
    "duration": 75,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Tinga%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Tinga%20(2).jpg"
  },
  {
    "id": 1024,
    "title": "Tinga (Moonwalk)",
    "artist": "A.R.Rahman",
    "album": "Moonwalk",
    "duration": 219,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Tinga.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Tinga.jpg"
  },
  {
    "id": 1025,
    "title": "Tiruchy Malai Kottai",
    "artist": "T.L. Maharajan",
    "album": "Vinayagar Chaturthi Bhakti Maalai (Devotional)",
    "duration": 206,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Tiruchy%20Malai%20Kottai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Tiruchy%20Malai%20Kottai.jpg"
  },
  {
    "id": 1026,
    "title": "Title Bgm",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 108,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Title%20Bgm%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Title%20Bgm%20(2).jpg"
  },
  {
    "id": 1027,
    "title": "Title BGM (Baba BGM (Original Background Score))",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 226,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Title%20BGM.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Title%20BGM.jpg"
  },
  {
    "id": 1028,
    "title": "Too Friendly With Neighbours",
    "artist": "Sean Roldan",
    "album": "Tourist Family BGM (Original Background Score)",
    "duration": 40,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Too%20Friendly%20With%20Neighbours.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Too%20Friendly%20With%20Neighbours.jpg"
  },
  {
    "id": 1029,
    "title": "Trance of Omi",
    "artist": "Thaman S, Harsha Darivemula, Adviteeya Vojjala",
    "album": "They Call Him OG",
    "duration": 167,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Trance%20of%20Omi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Trance%20of%20Omi.jpg"
  },
  {
    "id": 1030,
    "title": "Tripping High",
    "artist": "Pritam, Tsumyoki, Raghav Chaitanya, Poorvi Koutish, Brianna Supriyo, Shreya Phukan, Ranj, Yazin Nizar, Dev Arijit",
    "album": "WAR 2",
    "duration": 168,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Tripping%20High.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Tripping%20High.jpg"
  },
  {
    "id": 1031,
    "title": "Truth Of Appanna",
    "artist": "Thaman S",
    "album": "Game Changer",
    "duration": 151,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Truth%20Of%20Appanna.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Truth%20Of%20Appanna.jpg"
  },
  {
    "id": 1032,
    "title": "Tuition",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 21,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Tuition.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Tuition.jpg"
  },
  {
    "id": 1033,
    "title": "Two Heartbeats, One Awakening",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 71,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Two%20Heartbeats%2C%20One%20Awakening.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Two%20Heartbeats%2C%20One%20Awakening.jpg"
  },
  {
    "id": 1034,
    "title": "Uchanipoo",
    "artist": "Mohammed Maqbool Mansoor",
    "album": "Angammal",
    "duration": 297,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Uchanipoo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Uchanipoo.jpg"
  },
  {
    "id": 1035,
    "title": "Ulagena Uruveduthaay",
    "artist": "Pritam, Shashwat Singh, Nikhita Gandhi, Madhan Karky",
    "album": "WAR 2",
    "duration": 226,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Ulagena%20Uruveduthaay.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Ulagena%20Uruveduthaay.jpg"
  },
  {
    "id": 1036,
    "title": "Ulla Vaa Ulla Vaa",
    "artist": "Jp, Ghibran, Deepthi Suresh",
    "album": "BP180",
    "duration": 233,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Ulla%20Vaa%20Ulla%20Vaa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Ulla%20Vaa%20Ulla%20Vaa.jpg"
  },
  {
    "id": 1037,
    "title": "Unadhu Enadhu",
    "artist": "Anirudh Ravichander, Shilpa Rao, Ravi G",
    "album": "Madharaasi",
    "duration": 260,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Unadhu%20Enadhu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Unadhu%20Enadhu.jpg"
  },
  {
    "id": 1038,
    "title": "Unakkulley Kadavul Undu",
    "artist": "K.S.Chithra, Sarasruthi, Nasreen, Gayathri, Aadya",
    "album": "Bomb",
    "duration": 304,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Unakkulley%20Kadavul%20Undu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Unakkulley%20Kadavul%20Undu.jpg"
  },
  {
    "id": 1039,
    "title": "Uncle's Last Words",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 82,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Uncle's%20Last%20Words.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Uncle's%20Last%20Words.jpg"
  },
  {
    "id": 1040,
    "title": "Under The Badge",
    "artist": "Justin Prabhakaran",
    "album": "Sirai BGM (Original Background Score)",
    "duration": 51,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Under%20The%20Badge.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Under%20The%20Badge.jpg"
  },
  {
    "id": 1041,
    "title": "Unga Vijay, Na Varen",
    "artist": "Vijay",
    "album": "Tamilaga Vettri Kazhagam",
    "duration": 269,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Unga-Vijay%2C-Na-Varen-MassTamilan.dev.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Unga-Vijay%2C-Na-Varen-MassTamilan.dev.jpg"
  },
  {
    "id": 1042,
    "title": "United Again",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 60,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/United%20Again.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/United%20Again.jpg"
  },
  {
    "id": 1043,
    "title": "Unna Naan Paatha",
    "artist": "Yuvan Shankar Raja",
    "album": "Kombuseevi",
    "duration": 204,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Unna%20Naan%20Paatha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Unna%20Naan%20Paatha.jpg"
  },
  {
    "id": 1044,
    "title": "Unna Petha Ammavukku",
    "artist": "Jecin George",
    "album": "Yamakaathaghi",
    "duration": 46,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Unna%20Petha%20Ammavukku.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Unna%20Petha%20Ammavukku.jpg"
  },
  {
    "id": 1045,
    "title": "Unnake Unnaka (Female)",
    "artist": "Maris Vijay, Savaniee Ravindrra",
    "album": "Vattakhanal",
    "duration": 372,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Unnake%20Unnaka%20(Female).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Unnake%20Unnaka%20(Female).jpg"
  },
  {
    "id": 1046,
    "title": "Unnake Unnaka",
    "artist": "Maris Vijay, Karthik, Savaniee Ravindrra",
    "album": "Vattakhanal",
    "duration": 372,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Unnake%20Unnaka.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Unnake%20Unnaka.jpg"
  },
  {
    "id": 1047,
    "title": "Unnala Thaane",
    "artist": "N.R.Raghunanthan, Anand Aravindakshan",
    "album": "Marutham",
    "duration": 258,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Unnala%20Thaane.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Unnala%20Thaane.jpg"
  },
  {
    "id": 1048,
    "title": "Unspoken Gravity",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 88,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Unspoken%20Gravity.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Unspoken%20Gravity.jpg"
  },
  {
    "id": 1049,
    "title": "Untold Story",
    "artist": "Anirudh Ravichander",
    "album": "Coolie BGM (Original Background Score)",
    "duration": 226,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Untold%20Story.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Untold%20Story.jpg"
  },
  {
    "id": 1050,
    "title": "Unwrapping The Wrong Surprise",
    "artist": "Yuvan Shankar Raja",
    "album": "Sweetheart BGM (Original Background Score)",
    "duration": 72,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Unwrapping%20The%20Wrong%20Surprise.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Unwrapping%20The%20Wrong%20Surprise.jpg"
  },
  {
    "id": 1051,
    "title": "Upendra Hunts Down Teja",
    "artist": "Sam C.S.",
    "album": "Retta Thala BGM (Original Background Score)",
    "duration": 65,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Upendra%20Hunts%20Down%20Teja.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Upendra%20Hunts%20Down%20Teja.jpg"
  },
  {
    "id": 1052,
    "title": "Urumi Melam",
    "artist": "N.R.Raghunanthan, Mathichiyam Bala",
    "album": "Cristina Kathirvelan",
    "duration": 189,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Urumi%20Melam.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Urumi%20Melam.jpg"
  },
  {
    "id": 1053,
    "title": "US Maplai",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 32,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/US%20Maplai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/US%20Maplai.jpg"
  },
  {
    "id": 1054,
    "title": "Usara Uruvi",
    "artist": "Anirudh Ravichander, Ravi G",
    "album": "Madharaasi",
    "duration": 203,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Usara%20Uruvi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Usara%20Uruvi.jpg"
  },
  {
    "id": 1055,
    "title": "Usilampatti",
    "artist": "Yuvan Shankar Raja, Mukesh Mohamed, Sinduri Vishal",
    "album": "Kombuseevi",
    "duration": 229,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Usilampatti.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Usilampatti.jpg"
  },
  {
    "id": 1056,
    "title": "Uyir Koottula (Composer Version)",
    "artist": "Jecin George",
    "album": "Yamakaathaghi",
    "duration": 247,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Uyir%20Koottula%20(Composer%20Version).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Uyir%20Koottula%20(Composer%20Version).jpg"
  },
  {
    "id": 1057,
    "title": "Uyir Koottula",
    "artist": "Jecin George, Gowtham Bharadwaj",
    "album": "Yamakaathaghi",
    "duration": 253,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Uyir%20Koottula.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Uyir%20Koottula.jpg"
  },
  {
    "id": 1058,
    "title": "Uyir Pathikaama",
    "artist": "Santhosh Narayanan, Vijaynarain, Aditya Ravindran",
    "album": "Vaa Vaathiyaar",
    "duration": 207,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Uyir%20Pathikaama.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Uyir%20Pathikaama.jpg"
  },
  {
    "id": 1059,
    "title": "Uyir",
    "artist": "Dharshan Ravi Kumar, G. V. Prakash Kumar, Saindhavi",
    "album": "Uyir (Indie)",
    "duration": 291,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Uyir.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Uyir.jpg"
  },
  {
    "id": 1060,
    "title": "Uyiraare Uyiraare",
    "artist": "A.R.Rahman, Soubhagya Mohapatra",
    "album": "Tere Ishk Mein",
    "duration": 311,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Uyiraare%20Uyiraare.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Uyiraare%20Uyiraare.jpg"
  },
  {
    "id": 1061,
    "title": "Va Va Ganapathiye",
    "artist": "T.L. Maharajan",
    "album": "Vinayagar Chaturthi Bhakti Maalai (Devotional)",
    "duration": 323,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Va%20Va%20Ganapathiye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Va%20Va%20Ganapathiye.jpg"
  },
  {
    "id": 1062,
    "title": "Vaa Veerabathra",
    "artist": "Justin Prabhakaran, ADK",
    "album": "Thandakaaranyam",
    "duration": 205,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vaa%20Veerabathra.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vaa%20Veerabathra.jpg"
  },
  {
    "id": 1063,
    "title": "Vaanamanayo",
    "artist": "Jayamoorthy",
    "album": "Yamakaathaghi",
    "duration": 292,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vaanamanayo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vaanamanayo.jpg"
  },
  {
    "id": 1064,
    "title": "Vaazhve Pogudhe",
    "artist": "Anand Kashinath",
    "album": "Yellow",
    "duration": 254,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vaazhve%20Pogudhe.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vaazhve%20Pogudhe.jpg"
  },
  {
    "id": 1065,
    "title": "Vaenguzhalil Ezhaindayadi",
    "artist": "B. Ajaneesh Loknath, K. S. Harisankar, Chinmayi",
    "album": "Kantara Chapter 1",
    "duration": 220,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vaenguzhalil%20Ezhaindayadi%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vaenguzhalil%20Ezhaindayadi%20(2).jpg"
  },
  {
    "id": 1066,
    "title": "Vala Vala Kozha Kozha",
    "artist": "Pranav Muniraj",
    "album": "Middle Class",
    "duration": 141,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vala%20Vala%20Kozha%20Kozha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vala%20Vala%20Kozha%20Kozha.jpg"
  },
  {
    "id": 1067,
    "title": "Valikiradhe",
    "artist": "Sachin Sundar, Shakthisree Gopalan",
    "album": "Andha 7 Naatkal",
    "duration": 202,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Valikiradhe.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Valikiradhe.jpg"
  },
  {
    "id": 1068,
    "title": "Valiye Valiye",
    "artist": "Siddhu Kumar, Sooraj Santhosh, The Indian Choral Ensemble",
    "album": "Aaromaley",
    "duration": 169,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Valiye%20Valiye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Valiye%20Valiye.jpg"
  },
  {
    "id": 1069,
    "title": "Varaha Roopam",
    "artist": "B. Ajaneesh Loknath, Sai Vignesh",
    "album": "Kantara Chapter 1",
    "duration": 276,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Varaha%20Roopam%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Varaha%20Roopam%20(2).jpg"
  },
  {
    "id": 1070,
    "title": "Varukuratha Porikuratha",
    "artist": "Dharan Kumar, Pooja Shankar, Junior Nithya",
    "album": "Varukuratha Porikuratha (Indie)",
    "duration": 199,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Varukuratha%20Porikuratha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Varukuratha%20Porikuratha.jpg"
  },
  {
    "id": 1071,
    "title": "Varusanaatu",
    "artist": "Thaman S, Roshini JKV",
    "album": "Game Changer",
    "duration": 279,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Varusanaatu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Varusanaatu.jpg"
  },
  {
    "id": 1072,
    "title": "Vasthara",
    "artist": "Yuvan Shankar Raja, Vishnupriya Ravi, Thamizh Aadhavan",
    "album": "Kombuseevi",
    "duration": 192,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vasthara.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vasthara.jpg"
  },
  {
    "id": 1073,
    "title": "Vasu and Prabhu Theme",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 65,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vasu%20and%20Prabhu%20Theme.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vasu%20and%20Prabhu%20Theme.jpg"
  },
  {
    "id": 1074,
    "title": "Vasu In Silence",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 38,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vasu%20In%20Silence.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vasu%20In%20Silence.jpg"
  },
  {
    "id": 1075,
    "title": "Vasu's Delight",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 52,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vasu's%20Delight.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vasu's%20Delight.jpg"
  },
  {
    "id": 1076,
    "title": "Vasu's Pain",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 36,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vasu's%20Pain.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vasu's%20Pain.jpg"
  },
  {
    "id": 1077,
    "title": "Vasu's Struggle",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 48,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vasu's%20Struggle.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vasu's%20Struggle.jpg"
  },
  {
    "id": 1078,
    "title": "Vasudevan & Family",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 132,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vasudevan%20%26%20Family.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vasudevan%20%26%20Family.jpg"
  },
  {
    "id": 1079,
    "title": "Vasundhra Intro",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 42,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vasundhra%20Intro.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vasundhra%20Intro.jpg"
  },
  {
    "id": 1080,
    "title": "Vattakhanal",
    "artist": "Maris Vijay, Adeline V R",
    "album": "Vattakhanal",
    "duration": 224,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vattakhanal.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vattakhanal.jpg"
  },
  {
    "id": 1081,
    "title": "Vazhi Piranthathey",
    "artist": "Yuvan Shankar Raja, Anthony Daasan",
    "album": "Kombuseevi",
    "duration": 130,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vazhi%20Piranthathey.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vazhi%20Piranthathey.jpg"
  },
  {
    "id": 1082,
    "title": "Vazhiyiraen",
    "artist": "Anirudh Ravichander, Kwame Fyah",
    "album": "Madharaasi",
    "duration": 235,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vazhiyiraen.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vazhiyiraen.jpg"
  },
  {
    "id": 1083,
    "title": "Veezhadhe Va",
    "artist": "Ashwin Vinayagamoorthy, Punya Selva",
    "album": "Indian Penal Law (IPL)",
    "duration": 122,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Veezhadhe%20Va.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Veezhadhe%20Va.jpg"
  },
  {
    "id": 1084,
    "title": "Venaandi",
    "artist": "Jen Martin, Inno Genga",
    "album": "Kiss",
    "duration": 161,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Venaandi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Venaandi.jpg"
  },
  {
    "id": 1085,
    "title": "Vetri Kodi Kattu",
    "artist": "A.R.Rahman",
    "album": "Padaiyappa BGM (Original Background Score)",
    "duration": 280,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vetri%20Kodi%20Kattu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vetri%20Kodi%20Kattu.jpg"
  },
  {
    "id": 1086,
    "title": "Vetri Veerane",
    "artist": "G. V. Prakash Kumar, Anthony Daasan",
    "album": "Mask",
    "duration": 169,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vetri%20Veerane.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vetri%20Veerane.jpg"
  },
  {
    "id": 1087,
    "title": "Vidiyatha Iravondru",
    "artist": "Achu Rajamani",
    "album": "Kumaara Sambavam",
    "duration": 226,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vidiyatha%20Iravondru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vidiyatha%20Iravondru.jpg"
  },
  {
    "id": 1088,
    "title": "Virat Returns",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 147,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Virat%20Returns.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Virat%20Returns.jpg"
  },
  {
    "id": 1089,
    "title": "Virat",
    "artist": "Anirudh Ravichander",
    "album": "Madharaasi BGM (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Virat.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Virat.jpg"
  },
  {
    "id": 1090,
    "title": "Vollyeball Fight",
    "artist": "A.R.Rahman",
    "album": "Baba BGM (Original Background Score)",
    "duration": 189,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Vollyeball%20Fight.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Vollyeball%20Fight.jpg"
  },
  {
    "id": 1091,
    "title": "War Theme 2.0",
    "artist": "Sanchit Balhara, Ankit Balhara",
    "album": "WAR 2",
    "duration": 122,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/War%20Theme%202.0.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/War%20Theme%202.0.jpg"
  },
  {
    "id": 1092,
    "title": "Washi Yo Washi",
    "artist": "Pawan Kalyan, Thaman S, Sujeeth",
    "album": "They Call Him OG",
    "duration": 112,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Washi%20Yo%20Washi.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Washi%20Yo%20Washi.jpg"
  },
  {
    "id": 1093,
    "title": "Wedding Montage",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 44,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Wedding%20Montage.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Wedding%20Montage.jpg"
  },
  {
    "id": 1094,
    "title": "Winds of Barren Lands",
    "artist": "Mohammed Maqbool Mansoor",
    "album": "Angammal",
    "duration": 86,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Winds%20of%20Barren%20Lands.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Winds%20of%20Barren%20Lands.jpg"
  },
  {
    "id": 1095,
    "title": "World of Bison",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 27,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/World%20of%20Bison.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/World%20of%20Bison.jpg"
  },
  {
    "id": 1096,
    "title": "World Of Middle Class",
    "artist": "Pranav Muniraj",
    "album": "Middle Class",
    "duration": 120,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/World%20Of%20Middle%20Class.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/World%20Of%20Middle%20Class.jpg"
  },
  {
    "id": 1097,
    "title": "Wrong Way",
    "artist": "808Krshna",
    "album": "Wrong Way (Indie)",
    "duration": 134,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Wrong%20Way.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Wrong%20Way.jpg"
  },
  {
    "id": 1098,
    "title": "Xavier’s New Dress",
    "artist": "Siddhu Kumar",
    "album": "Aaromaley BGM Volume 2 (Original Background Score)",
    "duration": 24,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Xavier%E2%80%99s%20New%20Dress.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Xavier%E2%80%99s%20New%20Dress.jpg"
  },
  {
    "id": 1099,
    "title": "Yaana Mutta",
    "artist": "Theeson, Shakshi Harendran, Anandhi",
    "album": "Mangai",
    "duration": 223,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yaana%20Mutta.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yaana%20Mutta.jpg"
  },
  {
    "id": 1100,
    "title": "Yaar Ingu Vaazhanum",
    "artist": "A. Praveen Kumar, V.M. Mahalingam",
    "album": "Mahasenha",
    "duration": 222,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yaar%20Ingu%20Vaazhanum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yaar%20Ingu%20Vaazhanum.jpg"
  },
  {
    "id": 1101,
    "title": "Yaar Manidhan",
    "artist": "Santhosh Narayanan",
    "album": "Vaa Vaathiyaar",
    "duration": 201,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yaar%20Manidhan.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yaar%20Manidhan.jpg"
  },
  {
    "id": 1102,
    "title": "Yaaru Petha",
    "artist": "Harshavardhan, Rakshita Suresh",
    "album": "Desingu Raja 2",
    "duration": 172,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yaaru%20Petha.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yaaru%20Petha.jpg"
  },
  {
    "id": 1103,
    "title": "Yaavalo",
    "artist": "Ashwin Vinayagamoorthy, Shivam Mahadevan, Chinmayi",
    "album": "Indian Penal Law (IPL)",
    "duration": 240,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yaavalo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yaavalo.jpg"
  },
  {
    "id": 1104,
    "title": "Yaavum Neeye",
    "artist": "A.R.Rahman, Khatija Rahman",
    "album": "Tere Ishk Mein",
    "duration": 210,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yaavum%20Neeye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yaavum%20Neeye.jpg"
  },
  {
    "id": 1105,
    "title": "Yamayai Yamaiya",
    "artist": "Maris Vijay, Karthik, Savaniee Ravindrra",
    "album": "Vattakhanal",
    "duration": 279,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yamayai%20Yamaiya.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yamayai%20Yamaiya.jpg"
  },
  {
    "id": 1106,
    "title": "Ye Ye Ye",
    "artist": "Nivas K Prasanna",
    "album": "Bison Kaalamaadan BGM (Original Background Score)",
    "duration": 55,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Ye%20Ye%20Ye.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Ye%20Ye%20Ye.jpg"
  },
  {
    "id": 1107,
    "title": "Yedharkada Azhugiraai",
    "artist": "Tamizhmagan, Ghibran, Ranjith",
    "album": "BP180",
    "duration": 219,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yedharkada%20Azhugiraai.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yedharkada%20Azhugiraai.jpg"
  },
  {
    "id": 1108,
    "title": "Yen Paattan Saami Varum",
    "artist": "G. V. Prakash Kumar, Anthony Daasan",
    "album": "Idli Kadai",
    "duration": 222,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yen%20Paattan%20Saami%20Varum.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yen%20Paattan%20Saami%20Varum.jpg"
  },
  {
    "id": 1109,
    "title": "Yengae Ponayyo",
    "artist": "Vijay Narain, Sam C.S.",
    "album": "Blackmail",
    "duration": 274,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yengae%20Ponayyo.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yengae%20Ponayyo.jpg"
  },
  {
    "id": 1110,
    "title": "Yennai Pirindhen",
    "artist": "Justin Prabhakaran",
    "album": "Thanal",
    "duration": 223,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yennai%20Pirindhen.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yennai%20Pirindhen.jpg"
  },
  {
    "id": 1111,
    "title": "Yeno Indru",
    "artist": "Rakhooo, Anand Kashinath",
    "album": "Yeno Indru (Indie)",
    "duration": 203,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yeno%20Indru.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yeno%20Indru.jpg"
  },
  {
    "id": 1112,
    "title": "Yethu",
    "artist": "A.R.Rahman",
    "album": "Moonwalk Mini Cassette",
    "duration": 61,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yethu%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yethu%20(2).jpg"
  },
  {
    "id": 1113,
    "title": "Yethu (Moonwalk)",
    "artist": "A.R.Rahman",
    "album": "Moonwalk",
    "duration": 211,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yethu.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yethu.jpg"
  },
  {
    "id": 1114,
    "title": "You Can Never Question Me",
    "artist": "Sai Abhyankkar",
    "album": "Dude Side A BGM (Original Background Score)",
    "duration": 55,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/You-Can-Never-Question-Me-MassTamilan.dev%20(2).mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/You-Can-Never-Question-Me-MassTamilan.dev%20(2).jpg"
  },
  {
    "id": 1115,
    "title": "Your Future Is In Your Hands",
    "artist": "Amrit Ramnath",
    "album": "3BHK BGM (Original Background Score)",
    "duration": 56,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Your%20Future%20Is%20In%20Your%20Hands.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Your%20Future%20Is%20In%20Your%20Hands.jpg"
  },
  {
    "id": 1116,
    "title": "Yumabaibesa",
    "artist": "Sai Abhyankkar",
    "album": "Dude",
    "duration": 154,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/Yumabaibesa.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/Yumabaibesa.jpg"
  },
  {
    "id": 1117,
    "title": "⁠Myna Nee",
    "artist": "Pranav Muniraj",
    "album": "Middle Class",
    "duration": 95,
    "url": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/songs/%E2%81%A0Myna%20Nee.mp3",
    "cover": "https://cdn.jsdelivr.net/gh/ritcv12345678-source/songs_list_6@main/covers/%E2%81%A0Myna%20Nee.jpg"
  }
]

const COLORS = ['#1db954', '#7c3aed', '#ef4444', '#0ea5e9', '#f97316', '#ec4899'];
const genres: Genre[] = ['ambient', 'house', 'acoustic', 'lofi', 'synthwave'];

const coverBackground = (url: string) => `url("${url}") center / cover no-repeat`;

export const TRACKS: Track[] = RAW_SONGS.map((song, index) => ({
  id: String(song.id),
  title: song.title,
  artist: song.artist,
  album: song.album,
  duration: 0,
  gradient: coverBackground(song.cover),
  genre: genres[index % genres.length],
  color: COLORS[index % COLORS.length],
  fileUrl: song.url,
  coverUrl: song.cover,
}));

const albums = Array.from(new Map(TRACKS.map((track) => [track.album, track])).entries());

export const PLAYLISTS: Playlist[] = albums.map(([album, firstTrack], index) => ({
  id: `album-${index + 1}`,
  title: album,
  description: `${firstTrack.artist} and related tracks`,
  coverGradient: coverBackground(firstTrack.coverUrl),
  tracks: TRACKS.filter((track) => track.album === album),
  likes: `${Math.max(1000, firstTrack.id.length * 1847).toLocaleString()}`,
  followers: `${Math.max(10, index + 1)}K`,
  primaryColor: firstTrack.color,
}));

export const CATEGORIES: Category[] = [
  { id: 'tamil', title: 'Tamil', color: '#1db954' },
  { id: 'bgm', title: 'BGM', color: '#7c3aed' },
  { id: 'indie', title: 'Indie', color: '#ec4899' },
  { id: 'soundtrack', title: 'Soundtracks', color: '#0ea5e9' },
  { id: 'hits', title: 'Hits', color: '#f97316' },
  { id: 'new', title: 'New Releases', color: '#ef4444' },
];