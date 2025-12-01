
INSERT INTO users (id, username, email, password) VALUES
(1,  'John Doe',          'john1@charlotte.edu',  'password123'),
(2,  'Jane Smith',        'jane2@charlotte.edu',  'password123'),
(3,  'Alex Johnson',      'alex3@charlotte.edu',  'password123'),
(4,  'Maria Garcia',      'maria4@charlotte.edu', 'password123'),
(5,  'Chris Lee',         'chris5@charlotte.edu', 'password123'),
(6,  'Taylor Brown',      'taylor6@charlotte.edu','password123'),
(7,  'Jordan Davis',      'jordan7@charlotte.edu','password123'),
(8,  'Pat Morgan',        'pat8@charlotte.edu',   'password123'),
(9,  'Sam Patel',         'sam9@charlotte.edu',   'password123'),
(10, 'Riley Nguyen',      'riley10@charlotte.edu','password123');

INSERT INTO org (id, org_name, org_owner, org_followers) VALUES
(1,  'ACM Club',                 'John Doe',        0),
(2,  'Robotics Club',            'Jane Smith',      0),
(3,  'Game Development Club',    'Alex Johnson',    0),
(4,  'Cybersecurity Society',    'Maria Garcia',    0),
(5,  'Fencing Club',   		     'Chris Lee',       0),
(6,  'Data Science Society',     'Taylor Brown',    0),
(7,  'Esports Club',             'Jordan Davis',    0),
(8,  'Board Games Club',         'Pat Morgan',      0),
(9,  'Music Production Club',    'Sam Patel',       0),
(10, 'Entrepreneurship Club',    'Riley Nguyen',    0);

INSERT INTO flyers (id, org_id, flyer_advert, file_path, popularity_score) VALUES
(1,  1, 'Join ACM for coding competitions and tech talks!',          'seed_acm_flyer.png',         85),
(2,  2, 'Build robots with us every Thursday in the lab!',           'seed_robotics_flyer.png',    92),
(3,  3, 'Create your own games – weekly Game Dev workshops!',        'seed_gamedev_flyer.png',     78),
(4,  4, 'Learn ethical hacking and CTF skills with CyberSec!',       'seed_cybersec_flyer.png',    88),
(5,  5, 'Come learn how to fence! - No equipment needed!',           'seed_fencing_flyer.png',     90),
(6,  6, 'Dive into data visualization, analysis, and more!',         'seed_datasci_flyer.png',     73),
(7,  7, 'Compete in campus-wide esports tournaments!',               'seed_esports_flyer.png',     80),
(8,  8, 'Relax with board games and snacks every Friday night!',     'seed_boardgames_flyer.png',  70),
(9,  9, 'Produce your own tracks in our Music Production sessions!', 'seed_musicprod_flyer.png',   76),
(10, 10,'Pitch ideas and learn startups with Entrepreneurship Club!', 'seed_entre_flyer.png',      82);

