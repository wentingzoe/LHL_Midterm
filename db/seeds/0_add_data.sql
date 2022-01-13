-- users
INSERT INTO users (
    first_name,last_name, email, password)
    VALUES (
    'Devin', 'Sanders', 'tristanjacobs@gmail.com', 'password'),
    (
    'Iva', 'Harrison', 'allisonjackson@mail.com', 'password'),
    (
    'Lloyd', 'Jefferson', 'asherpoole@gmx.com', 'password');

-- categories (defulat id = 4)
-- watach id 1 -- eat id 2 -- read id 3 -- buy id 4
INSERT INTO categories (cate_name) VALUES ('Watch'),('Eat'),('Read'),('Buy');

-- tasks
INSERT INTO tasks (user_id, category_id, task_title, task_description,start_date, end_date) VALUES
-- ---Watching list
(1, 1,'Inception', 'Very nice movie to watch','2022-01-15','2022-01-16'),
(2, 1, 'Citizen Kane', 'Hollywood classic','2022-01-20','2022-01-21' ),
(3, 1,'Avengers: Endgame', 'Need to know what happened to the avengers!','2022-04-15','2022-04-16'),
-- -- Eat list
(1, 2,'The Butcher Chef', 'Nice!!','2022-01-15','2022-01-16'),
(2, 2, 'Ghost Chicken', 'New fried chicken place', '2022-02-15','2022-02-16'),
(3, 2, 'Sukhothai', 'Great Thai Cuisine', '2022-01-16','2022-01-18'),
-- -- Read List
(1, 3, 'Atomic Habits', 'Learn a lot','2022-01-15','2022-03-16'),
(2, 3, 'Will', 'Maybe something new', '2022-03-05','2022-04-16'),
(3, 3, 'It Ends with Us', 'Read a novel', '2022-06-15','2022-12-16'),
-- -- Buy List
(1, 4, 'Pay hydro bill', 'OMG, electricity!','2022-01-15','2022-01-16'),
(2, 4, 'Macbook', 'I need a new one', '2022-02-05','2022-02-16'),
(3, 4, 'Cat cans', 'Oh,my cat needs them ', '2022-01-15','2022-1-16');

-- profiles
INSERT INTO profiles (user_id, img, bio, hometown) VALUES
(1, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1296&q=60','Writer & Fancy Dancer', 'Toronto'),
(2, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1296&q=60','Producer', 'New York'),
(3, 'https://media.istockphoto.com/photos/and-then-you-came-along-and-turned-my-life-around-picture-id1300273437?b=1&k=20&m=1300273437&s=170667a&w=0&h=aBUwwJX9_OCJGcMnvbRpMo39AD3EHUbfsabWjs2iD4I=','Lifestyle | Travel', 'Miami');
