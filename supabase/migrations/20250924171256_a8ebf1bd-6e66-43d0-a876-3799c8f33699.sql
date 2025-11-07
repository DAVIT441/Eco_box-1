-- Insert sample schools
INSERT INTO public.schools (name, city, region, total_students, total_papers, total_classes, ranking, monthly_papers, saved_trees, carbon_reduced, coordinates_lat, coordinates_lng) VALUES
('თბილისის #1 საჯარო სკოლა', 'თბილისი', 'თბილისი', 450, 2340, 18, 1, 890, 23, 1170, 41.7151, 44.8271),
('ქუთაისის #5 საჯარო სკოლა', 'ქუთაისი', 'იმერეთი', 380, 1950, 15, 2, 750, 19, 975, 42.2679, 42.7005),
('ბათუმის #12 საჯარო სკოლა', 'ბათუმი', 'აჭარა', 320, 1680, 12, 3, 620, 16, 840, 41.6168, 41.6367),
('რუსთავის #8 საჯარო სკოლა', 'რუსთავი', 'ქვემო ქართლი', 290, 1520, 11, 4, 580, 15, 760, 41.5493, 44.9938),
('გორის #3 საჯარო სკოლა', 'გორი', 'შიდა ქართლი', 250, 1290, 10, 5, 490, 12, 645, 41.9842, 44.1123);

-- Insert sample school classes
INSERT INTO public.school_classes (school_id, name, grade, student_count, total_papers, teacher_name) 
SELECT 
    s.id,
    CASE 
        WHEN g.grade <= 6 THEN 'მე-' || g.grade || ' კლასი ა'
        ELSE 'მე-' || g.grade || ' კლასი'
    END,
    g.grade,
    25 + (RANDOM() * 10)::int,
    (25 + (RANDOM() * 10)::int) * (g.grade * 5 + RANDOM() * 20)::int,
    CASE 
        WHEN RANDOM() < 0.5 THEN 'ნინო ჯავახიშვილი'
        ELSE 'გიორგი მელაშვილი'
    END
FROM public.schools s
CROSS JOIN (SELECT generate_series(1, 12) as grade) g;

-- Insert sample EcoBox devices
INSERT INTO public.ecobox_devices (school_id, location, status, total_capacity, current_capacity, last_data_received, daily_collections, coordinates_lat, coordinates_lng)
SELECT 
    id,
    'მთავარი შესასვლელი',
    CASE 
        WHEN RANDOM() < 0.8 THEN 'online'::device_status
        WHEN RANDOM() < 0.9 THEN 'maintenance'::device_status
        ELSE 'offline'::device_status
    END,
    1000,
    (RANDOM() * 800)::int,
    NOW() - (RANDOM() * interval '2 hours'),
    (RANDOM() * 50 + 10)::int,
    coordinates_lat + (RANDOM() - 0.5) * 0.001,
    coordinates_lng + (RANDOM() - 0.5) * 0.001
FROM public.schools;

-- Insert achievements
INSERT INTO public.achievements (name, name_georgian, description, description_georgian, icon, category, requirement, rarity) VALUES
('First Paper', 'პირველი ქაღალდი', 'Submit your first paper to EcoBox', 'EcoBox-ში პირველი ქაღალდის ჩაგდება', '🌱', 'recycling', 1, 'common'),
('Paper Collector', 'ქაღალდის შემგროვებელი', 'Collect 50 papers', '50 ქაღალდის შეგროვება', '📄', 'recycling', 50, 'common'),
('Eco Warrior', 'ეკო მეომარი', 'Collect 200 papers', '200 ქაღალდის შეგროვება', '⚔️', 'recycling', 200, 'rare'),
('Green Champion', 'მწვანე ჩემპიონი', 'Collect 500 papers', '500 ქაღალდის შეგროვება', '🏆', 'recycling', 500, 'epic'),
('Eco Legend', 'ეკო ლეგენდა', 'Collect 1000 papers', '1000 ქაღალდის შეგროვება', '👑', 'recycling', 1000, 'legendary'),
('Streak Master', 'სერიების ოსტატი', 'Maintain a 7-day streak', '7 დღიანი სერიის შენარჩუნება', '🔥', 'streak', 7, 'rare'),
('Dedication', 'ერთგულება', 'Maintain a 30-day streak', '30 დღიანი სერიის შენარჩუნება', '💎', 'streak', 30, 'epic'),
('Quiz Master', 'ვიქტორინის ოსტატი', 'Complete 10 quizzes', '10 ვიქტორინის დასრულება', '🧠', 'education', 10, 'common'),
('Knowledge Seeker', 'ცოდნის მაძიებელი', 'Complete 50 quizzes', '50 ვიქტორინის დასრულება', '📚', 'education', 50, 'rare');

-- Insert challenges
INSERT INTO public.challenges (title, title_georgian, description, description_georgian, type, target, reward, start_date, end_date, participants) VALUES
('Weekly Collection', 'კვირის შეგროვება', 'Collect 25 papers this week', 'ამ კვირაში 25 ქაღალდის შეგროვება', 'weekly', 25, 100, NOW(), NOW() + interval '7 days', 0),
('Monthly Green Goal', 'თვიური მწვანე მიზანი', 'Collect 100 papers this month', 'ამ თვეში 100 ქაღალდის შეგროვება', 'monthly', 100, 500, NOW(), NOW() + interval '30 days', 0),
('Daily Eco Task', 'ყოველდღიური ეკო დავალება', 'Submit 5 papers today', 'დღეს 5 ქაღალდის ჩაბარება', 'daily', 5, 20, NOW(), NOW() + interval '1 day', 0),
('School Competition', 'სკოლის კონკურსი', 'Help your school reach 1000 papers', 'დაეხმარე შენს სკოლას 1000 ქაღალდამდე მისვლაში', 'special', 1000, 1000, NOW(), NOW() + interval '60 days', 0);

-- Insert eco tips
INSERT INTO public.eco_tips (title, title_georgian, content, content_georgian, category, difficulty, impact, icon) VALUES
('Recycle Paper Properly', 'ქაღალდის სწორად გადამუშავება', 'Remove all staples and clips before recycling paper', 'ქაღალდის გადამუშავებამდე ამოიღეთ ყველა სკობა და კლიპსი', 'recycling', 'easy', 'medium', '♻️'),
('Save Energy at Home', 'ენერგიის დაზოგვა სახლში', 'Turn off lights when leaving a room to save electricity', 'ოთახიდან გასვლისას ჩააქრეთ შუქი ელექტროენერგიის დასაზოგად', 'energy', 'easy', 'medium', '💡'),
('Water Conservation', 'წყლის დაზოგვა', 'Take shorter showers to conserve water', 'მიიღეთ უფრო მოკლე შხაპი წყლის დასაზოგად', 'water', 'easy', 'high', '💧'),
('Use Public Transport', 'საზოგადოებრივი ტრანსპორტი', 'Use buses or metro instead of cars to reduce emissions', 'ავტომობილის ნაცვლად გამოიყენეთ ავტობუსი ან მეტრო გაფრქვევების შესამცირებლად', 'transportation', 'medium', 'high', '🚌'),
('Reduce Plastic Use', 'პლასტიკის გამოყენების შემცირება', 'Use reusable bags instead of plastic bags', 'პლასტიკური ჩანთების ნაცვლად გამოიყენეთ მრავალჯერადი ჩანთები', 'general', 'easy', 'high', '🛍️'),
('Compost Food Waste', 'საკვები ნარჩენების კომპოსტირება', 'Create compost from vegetable peels and organic waste', 'შექმენით კომპოსტი ბოსტნეულის ქერქებისა და ორგანული ნარჩენებისგან', 'general', 'medium', 'medium', '🌿'),
('Plant Trees', 'ხეების დარგვა', 'Participate in tree planting activities in your community', 'მონაწილეობა მიიღეთ ხეების დარგვის აქტივობებში თქვენს საზოგადოებაში', 'general', 'hard', 'high', '🌳');

-- Enable realtime for relevant tables
ALTER TABLE public.ecobox_devices REPLICA IDENTITY FULL;
ALTER TABLE public.paper_submissions REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.ecobox_devices;
ALTER PUBLICATION supabase_realtime ADD TABLE public.paper_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;