// Static data
const organizations = [
  {
    id: 1, 
    name: 'Data Science Society', 
    category: 'Technology', 
    members: 200, 
    description: 'Explore data analytics, machine learning, and AI', 
    icon: '📊', 
    eventTime: 'Tuesdays 5:30 PM', 
    image: '../assets/image.png', 
    fullDescription: 'The Data Science Society is dedicated to fostering a community of data enthusiasts. We organize weekly workshops covering Python, R, SQL, and machine learning frameworks. Members work on real-world datasets, participate in Kaggle competitions, and collaborate on research projects. Our alumni have gone on to work at top tech companies and research institutions.', 
    founded: '2018', 
    location: 'Woodward Hall 335', 
    contact: 'datasci@charlotte.edu'
  },
  {
    id: 2, 
    name: 'Fencing Club', 
    category: 'Sports', 
    members: 75, 
    description: 'Learn the art of fencing', 
    icon: '🤺', 
    eventTime: 'Mondays & Thursdays 6:00 PM', 
    image: '../assets/image copy.png', 
    fullDescription: 'Our Fencing Club welcomes all skill levels from complete beginners to competitive athletes. We provide all equipment for newcomers and offer instruction in foil, épée, and sabre. Our certified coaches have national and international competition experience. We compete in regional tournaments and host an annual invitational. Join us to develop discipline, strategy, and athleticism.', 
    founded: '2015', 
    location: 'Recreation Center Gym 2', 
    contact: 'fencing@charlotte.edu'
  },
  {
    id: 3, 
    name: 'Association of Computing Machinery', 
    category: 'Technology', 
    members: 350, 
    description: 'Join ACM for coding workshops and hackathons', 
    icon: '💻', 
    eventTime: 'Wednesdays 7:00 PM', 
    image: '../assets/image copy 2.png', 
    fullDescription: 'ACM is the largest computing organization on campus. We host weekly tech talks featuring industry professionals, organize hackathons with prizes up to $10,000, and maintain several open-source projects. Our members have access to exclusive internship opportunities, interview prep sessions, and networking events with recruiters from Fortune 500 companies. Special interest groups focus on AI, cybersecurity, web development, and game design.', 
    founded: '2010', 
    location: 'Student Union 340', 
    contact: 'acm@charlotte.edu'
  },
  {
    id: 4, 
    name: 'Niner Game Development', 
    category: 'Technology', 
    members: 180, 
    description: 'Create games and interactive experiences', 
    icon: '🎮', 
    eventTime: 'Wednesdays 6:00 PM', 
    image: '../assets/image copy 3.png', 
    fullDescription: 'Niner Game Development brings together aspiring game developers, artists, and designers. We organize weekly game jams, Unity and Unreal Engine workshops, and collaborative project teams. Members learn game design principles, programming patterns, 3D modeling, and animation. We participate in Global Game Jam and showcase student projects at annual exhibitions. Whether you want to build indie games or work for major studios, we provide the skills and community to help you succeed.', 
    founded: '2019', 
    location: 'College of Computing and Informatics Room 223', 
    contact: 'gamedev@charlotte.edu'
  },
  {
    id: 5,
    name: 'The Guild',
    category: 'Recreation',
    members: 95,
    description: 'Relax with board games and snacks',
    icon: '🎲',
    eventTime: 'Fridays 3:00 PM - 6:00 PM',
    image: '../assets/image copy 4.png',
    fullDescription: 'The Guild is your friendly neighborhood board game club where students gather to unwind, strategize, and have fun. We play everything from classic favorites like Settlers of Catan and Ticket to Ride to modern strategy games and party games. No experience needed - we teach new players and welcome all skill levels. Snacks and drinks provided every session. Come make friends, learn new games, and escape the stress of classes for a few hours each week.',
    founded: '2020',
    location: 'CHHS 128',
    contact: 'theguild@charlotte.edu'
  }
];

const gradients = {
  1: 'linear-gradient(180deg,#ffffff,#f1f5f9)',
  2: 'linear-gradient(180deg,#fff4f2,#fff7f0)',
  3: 'linear-gradient(180deg,#fffef2,#f5fff1)',
  4: 'linear-gradient(180deg,#f0f9ff,#e0f2fe)',
  5: 'linear-gradient(180deg,#fef2f2,#fff1f2)'
};

const ratings = {1: '4.9', 2: '4.7', 3: '5.0', 4: '4.8', 5: '4.9'};
