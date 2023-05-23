require 'date'
require 'faker'
require 'geocoder'

puts "seeding..."
users = [
    {
      first_name: "John",
      last_name: "Doe",
      username: "johndoe123",
      password_digest: BCrypt::Password.create("password"),
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      email: "johndoe@example.com",
      profile_picture: "profile.jpg",
      host: false
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      username: "janesmith456",
      password_digest: BCrypt::Password.create("password"),
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      email: "janesmith@example.com",
      profile_picture: "profile.jpg",
      host: true
    },
    {
      first_name: "Michael",
      last_name: "Johnson",
      username: "michaeljohn",
      password_digest: BCrypt::Password.create("password"),
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      email: "michael@example.com",
      profile_picture: "profile.jpg",
      host: true
    },
    {
      first_name: "Emily",
      last_name: "Brown",
      username: "emilybrown",
      password_digest: BCrypt::Password.create("password"),
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      email: "emily@example.com",
      profile_picture: "profile.jpg",
      host: false
    },
    {
      first_name: "David",
      last_name: "Wilson",
      username: "davidwilson",
      password_digest: BCrypt::Password.create("password"),
      code: SecureRandom.hex(10),
      request_time: Time.now,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      email: "david@example.com",
      profile_picture: "profile.jpg",
      host: true
    },
    {
      first_name: "Olivia",
      last_name: "Davis",
      username: "oliviadavis",
      password_digest: BCrypt::Password.create("password"),
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      email: "olivia@example.com",
      profile_picture: "profile.jpg",
      host: true
    },
    {
      first_name: "William",
      last_name: "Miller",
      username: "williammiller",
      password_digest: BCrypt::Password.create("password"),
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      email: "william@example.com",
      profile_picture: "profile.jpg",
      host: false
    },
    {
      first_name: "Sophia",
      last_name: "Anderson",
      username: "sophiaanderson",
      password_digest: BCrypt::Password.create("password"),
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      email: "sophia@example.com",
      profile_picture: "profile.jpg",
      host: false
    },
    {
        first_name: "James",
        last_name: "Taylor",
        username: "jamestaylor",
        password_digest: BCrypt::Password.create("password"),
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        email: "james@example.com",
        profile_picture: "profile.jpg",
        host: true
    },
    {
        first_name: "Isabella",
        last_name: "Thomas",
        username: "isabellathomas",
        password_digest: BCrypt::Password.create("password"),
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        email: "isabella@example.com",
        profile_picture: "profile.jpg",
        host: false
    }
  ]

photos = [
    "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxfHxleHRlcmlvcnxlbnwwfHx8fDE2ODQxODk3NTh8MA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1560184897-ae75f418493e?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyfHxleHRlcmlvcnxlbnwwfHx8fDE2ODQxOTA0ODd8MA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwzfHxleHRlcmlvcnxlbnwwfHx8fDE2ODQxOTA0ODd8MA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHw0fHxleHRlcmlvcnxlbnwwfHx8fDE2ODQxOTA0ODd8MA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHw1fHxleHRlcmlvcnxlbnwwfHx8fDE2ODQxOTA0ODd8MA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1494526585095-c41746248156?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHw2fHxleHRlcmlvcnxlbnwwfHx8fDE2ODQxOTA0ODd8MA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1528013440325-f2473fe988a2?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHw3fHxleHRlcmlvcnxlbnwwfHx8fDE2ODQxOTA0ODd8MA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1503594384566-461fe158e797?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHw4fHxleHRlcmlvcnxlbnwwfHx8fDE2ODQxOTA0ODd8MA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1530982937671-bc00141b5d79?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHw5fHxleHRlcmlvcnxlbnwwfHx8fDE2ODQxOTA0ODd8MA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1635108201747-976f7d4ba453?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxMHx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1622015663319-e97e697503ee?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxMXx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1635108199445-ab9f516646e2?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxMnx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1522050212171-61b01dd24579?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxM3x8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1519806870789-d65fc19601fa?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxNHx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1535007135893-61091db8c179?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxNXx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1529266463145-cba75e3465d2?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxNnx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1527948940587-dc64f8037e79?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxN3x8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1531394360768-cc62d9ed68b3?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxOHx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1524292691042-82ed9c62673b?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwxOXx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1533904842716-e7071a20656d?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyMHx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1521846562476-9c2446539e47?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1489257251256-036cd1ac7606?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyMXx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyMnx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1556575157-75a0d60e4835?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1528993819241-a4392261c690?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyM3x8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1526910050765-6d3a7ff70a5b?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyNHx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1533924004796-43f055849940?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyNXx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1533578555553-e417045631cd?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyNnx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://cdn.discordapp.com/attachments/1106022073605832748/1107816038294356008/Jake_Wehder_8k_photo_of_an_italian_villa_9d6a9083-d96b-406e-8050-399d143e2e11.png", "https://cdn.discordapp.com/attachments/1106022073605832748/1107816252006735942/Jake_Wehder_realistic_photo_of_an_apartment_building_886f3db2-215a-4a8d-b312-c85f47c53f7e.png", "https://images.unsplash.com/photo-1471896335371-82fdaca100f2?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyN3x8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1528489865599-adb58079a8b5?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyOHx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1542464263-7c7ffad2b206?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwyOXx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1533641316813-7a2883c9f7a4?ixid=M3w0NDg5NDJ8MHwxfHNlYXJjaHwzMHx8ZXh0ZXJpb3J8ZW58MHx8fHwxNjg0MTkwNDg3fDA&ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1598737652403-6e0ee5bf5cf2?ixlib=rb-4.0.3"
]

planets = [
    {name: "Aurora", description: "Aurora is a planet that is known for its stunning natural light shows, similar to the Northern Lights on Earth. The planet's atmosphere is filled with charged particles that create beautiful, colorful displays in the sky. Despite the harsh weather conditions, Aurora is home to a diverse range of flora and fauna, including towering trees and brightly-colored birds. Adventurers flock to Aurora to explore its rugged terrain and witness the breathtaking auroras that dance across the sky."},
    {name: "Nebula", description: "Nebula is a planet that lives up to its name. The planet is surrounded by a swirling cloud of gas and dust that creates a surreal, dreamlike environment. Nebula is home to a variety of exotic creatures, including shimmering butterflies and iridescent fish. The planet's oceans are said to contain healing properties that can cure a range of ailments. Visitors to Nebula often describe feeling as though they have stepped into a different dimension."},
    {name: "Galaxia", description: "Galaxia is a planet that is known for its vibrant nightlife and bustling cities. The planet's inhabitants are passionate about art, music, and fashion, and the streets are alive with energy and creativity. Despite the fast-paced lifestyle, Galaxia is also home to serene beaches, lush rainforests, and breathtaking mountain ranges. Visitors to Galaxia can immerse themselves in the culture and nightlife of the cities or escape to the tranquil countryside for a more peaceful experience."},
    {name: "Orion", description: "Orion is a planet that is known for its mysterious, otherworldly landscape. The planet is shrouded in mist and surrounded by towering mountains that seem to reach up to the sky. Despite the harsh conditions, Orion is home to a range of fascinating creatures, including bioluminescent insects and massive, tentacled beasts. Visitors to Orion often describe feeling as though they have stepped onto another planet altogether."},
    {name: "Nova", description: "Nova is a planet that is known for its breathtaking natural wonders, including massive geysers, towering waterfalls, and shimmering lakes. The planet's landscape is both beautiful and dangerous, with treacherous cliffs and rugged canyons that are perfect for adventurous travelers. Nova is also home to a range of fascinating creatures, including majestic eagles and elusive panthers. Visitors to Nova are sure to be awed by the planet's natural beauty and the incredible diversity of life that thrives there."},
    {name: "Earth", description: "Earth is the planet that we call home. It is known for its incredible diversity of life, including millions of plant and animal species. Earth is also the only known planet in the universe that can sustain human life. The planet is home to stunning natural wonders, including towering mountains, vast oceans, and endless expanses of desert. Visitors to Earth can explore a range of different cultures and landscapes, from the bustling cities to the tranquil countryside. Whether you're looking for adventure or relaxation, Earth has something for everyone."}
]


listings = [
    {
        title: "Luxury Villa with Breathtaking Ocean Views",
        description: "Experience the epitome of luxury in this stunning villa boasting breathtaking ocean views. Indulge in the lavish amenities, relax by the infinity pool, and savor the tranquility of the private gardens. This elegant villa offers spacious living areas, state-of-the-art facilities, and impeccable service. Whether you're seeking a romantic getaway or a family retreat, this luxury villa provides an unforgettable experience.",
        type_of_accomodation: "Villa"
    },
    {
        title: "Charming House in the Heart of the City",
        description: "Discover the charm of this cozy house nestled in the heart of the city. With its convenient location and stylish interiors, this house is perfect for exploring the vibrant streets, trendy cafes, and cultural attractions. Unwind in the comfortable living spaces, enjoy the well-equipped kitchen, and experience the vibrant city life just outside your door.",
        type_of_accomodation: "House"
    },
    {
        title: "Modern Apartment with Stunning Skyline Views",
        description: "Immerse yourself in the modern elegance of this apartment boasting stunning skyline views. The sleek design, high-end amenities, and floor-to-ceiling windows create a sophisticated and comfortable living space. Indulge in the nearby shopping districts, dine at the finest restaurants, and experience the vibrant city nightlife.",
        type_of_accomodation: "Apartment"
    },
    {
        title: "Boutique Hotel Room in a Historic Building",
        description: "Step into a world of luxury and elegance in this boutique hotel room located in a historic building. Experience personalized service, exquisite decor, and a range of amenities for your comfort. Immerse yourself in the city's culture, visit nearby landmarks, and relax in the charming ambiance of this unique hotel room.",
        type_of_accomodation: "Hotel Room"
    },
    {
        title: "Stylish Townhouse in a Quaint Neighborhood",
        description: "Escape to this stylish townhouse located in a quaint neighborhood, offering a perfect blend of comfort and charm. With its spacious layout, modern furnishings, and private courtyard, this townhouse provides a cozy retreat. Explore the local shops, dine at neighborhood cafes, and immerse yourself in the relaxed atmosphere of this welcoming community.",
        type_of_accomodation: "Townhouse"
    },
    {
        title: "Cozy Cottage with Garden Oasis",
        description: "Find serenity in this cozy cottage surrounded by a peaceful garden oasis. Escape the hustle and bustle of daily life as you relax on the charming porch, enjoy a cup of tea in the tranquil garden, or cozy up by the fireplace. This idyllic cottage offers a retreat from the world and a chance to reconnect with nature.",
        type_of_accomodation: "Cottage"
    },
    {
        title: "Seaside Resort with All-Inclusive Amenities",
        description: "Experience the ultimate beach getaway at this seaside resort offering all-inclusive amenities. Enjoy direct access to the pristine beach, indulge in the luxurious spa treatments, and savor delectable cuisine at the resort's restaurants. Whether you're seeking relaxation, adventure, or quality time with loved ones, this seaside resort has everything you need for an unforgettable vacation.",
        type_of_accomodation: "Hotel Room"
    },
    {
        title: "Spacious Penthouse with Panoramic Mountain Views",
        description: "Elevate your stay in this spacious penthouse boasting panoramic mountain views. With its modern design,
    expansive terrace, and luxurious features, this penthouse offers a sophisticated retreat. Take in the breathtaking vistas, unwind in the rooftop jacuzzi, and experience the ultimate indulgence in this exclusive accommodation.",
    type_of_accomodation: "Apartment"
    },
    {
    title: "Rustic Cabin Retreat in a Tranquil Forest",
    description: "Escape to a rustic cabin retreat nestled in a tranquil forest, surrounded by nature's beauty. Embrace the cozy ambiance, relax by the crackling fireplace, and take leisurely walks through the forest trails. This charming cabin offers a peaceful sanctuary where you can reconnect with the simplicity of life and rejuvenate your soul.",
    type_of_accomodation: "Cabin"
    },
    {
    title: "Historic Manor House with Grand Architecture",
    description: "Step back in time and experience the grandeur of a historic manor house with its magnificent architecture and timeless elegance. From the opulent interiors to the meticulously landscaped gardens, this manor house exudes sophistication and charm. Immerse yourself in the history, indulge in luxurious amenities, and create unforgettable memories in this regal accommodation.",
    type_of_accomodation: "House"
    },
    {
    title: "Secluded Beach Bungalow with Private Access",
    description: "Find your own slice of paradise in this secluded beach bungalow, offering a private escape with direct access to pristine shores. Wake up to the sound of waves, unwind in the hammock under swaying palm trees, and enjoy breathtaking sunsets from your veranda. This beach bungalow is a tranquil haven where you can truly unwind and rejuvenate.",
    type_of_accomodation: "Bungalow"
    },
    {
    title: "Chic Studio in the Heart of a Vibrant Neighborhood",
    description: "Immerse yourself in the vibrant energy of a lively neighborhood with a stay in this chic studio apartment. From its trendy decor to its convenient location, this studio offers a comfortable and stylish retreat. Explore the eclectic shops, indulge in local cuisine, and discover the unique character of the neighborhood.",
    type_of_accomodation: "Apartment"
    },
    {
    title: "Serenity Cottage with Panoramic Lake Views",
    description: "Escape to a serene cottage with panoramic lake views, where tranquility and natural beauty surround you. Relax on the porch overlooking the shimmering waters, take a leisurely kayak ride, or simply unwind in the comfortable interiors. This idyllic cottage provides a peaceful sanctuary for those seeking a retreat from the world.",
    type_of_accomodation: "Cottage"
    },
    {
    title: "Luxury Villa with Private Pool and Stunning Gardens",
    description: "Indulge in luxury and sophistication at this exquisite villa featuring a private pool and stunning gardens. With its spacious layout, upscale amenities, and impeccable design, this villa offers a truly indulgent experience. Bask in the sunshine by the pool, host memorable gatherings in the expansive outdoor areas, and create lasting memories in this luxurious retreat.",
    type_of_accomodation: "Villa"
    },
    {
    title: "Modern Apartment in a Hip and Artistic District",
    description: "Immerse yourself in the creativity and vibrancy of a hip and artistic district with a stay in this modern apartment. From its sleek design to its proximity to art galleries, trendy cafes, and local boutiques, this apartment offers an inspiring retreat. Experience the neighborhood's unique charm, indulge in local flavors, and be inspired by the artistic ambiance.",
    type_of_accomodation: "Apartment"
    },
    {
    title: "Traditional Townhouse with Old-World Charm",
    description: "
    
    Step into a world of old-world charm and elegance with a stay in this traditional townhouse. With its rich history, classic architecture, and tasteful furnishings, this townhouse offers a glimpse into the past. Relax in the cozy living spaces, explore the neighborhood's historic landmarks, and immerse yourself in the timeless beauty of this townhouse.",
    type_of_accomodation: "Townhouse"
    },
    {
    title: "Secluded Mountain Retreat with Panoramic Views",
    description: "Escape to a secluded mountain retreat and immerse yourself in the beauty of nature with panoramic views stretching as far as the eye can see. Unwind in the outdoor hot tub, embark on hiking adventures, and savor the tranquility of the mountain setting. This retreat offers a peaceful respite where you can disconnect from the world and reconnect with yourself.",
    type_of_accomodation: "Cabin"
    },
    {
    title: "Stylish Beachfront Condo with Ocean Breezes",
    description: "Experience the ultimate beachfront lifestyle in this stylish condo with refreshing ocean breezes and stunning coastal views. From the modern interiors to the proximity to the beach, this condo offers the perfect blend of luxury and relaxation. Soak up the sun on the private balcony, stroll along the sandy shores, and create unforgettable memories by the sea.",
    type_of_accomodation: "Apartment"
    },
    {
    title: "Luxurious Mansion in a Prestigious Neighborhood",
    description: "Indulge in opulence and grandeur at this luxurious mansion nestled in a prestigious neighborhood. With its expansive living spaces, elegant decor, and top-notch amenities, this mansion is the epitome of sophistication. Enjoy the beautifully landscaped gardens, host memorable events in the grand ballroom, and live like royalty during your stay.",
    type_of_accomodation: "House"
    },
    {
    title: "Cozy Log Cabin in a Picturesque Forest Setting",
    description: "Find comfort and charm in this cozy log cabin tucked away in a picturesque forest setting. Embrace the warmth of the fireplace, immerse yourself in the peaceful surroundings, and reconnect with nature. This log cabin offers a tranquil retreat where you can unwind, recharge, and create lasting memories with loved ones.",
    type_of_accomodation: "Cabin"
    }
]


# planets.each do |planet|
#     Planet.create(planet)
# end

# users.each do |user|
#     User.create(user)
# end

puts ENV['GOOGLE_API_KEY']

1.times do 
    address = Faker::Address
    user_id = User.all.sample.id
    puts address.city
    puts address.state
    listing = listings.sample
    Listing.create(
        name: listing[:title],
        city: address.city,
        state_province: address.state,
        country: address.country,
        planet_id: Planet.all.sample.id,
        user_id: user_id,
        description: listing[:description],
        unit_price: rand(125..1250),
        type_of_accomodation: listing[:type_of_accomodation],
        owner_id: user_id,
        max_guests_allowed: rand(1..12),
        longitude: address.longitude,
        latitude: address.latitude,
        photos: photos.sample(3)
      )
end

# 12.times do 
#     listing = Listing.all.sample
#     booking = Booking.create(user_id: User.all.sample.id, listing_id: listing.id, start_date: DateTime.now + rand(1..30), end_date: DateTime.now + rand(31..60), number_of_guests: listing.max_guests_allowed)
# end

# Booking.all.each do |booking|
#     booking.determine_price
#     booking.book_dates
# end

puts "done seeding"