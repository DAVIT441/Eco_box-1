-- Create enum types
CREATE TYPE public.user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE public.device_status AS ENUM ('online', 'offline', 'maintenance', 'full');
CREATE TYPE public.achievement_category AS ENUM ('recycling', 'streak', 'competition', 'education', 'special');
CREATE TYPE public.achievement_rarity AS ENUM ('common', 'rare', 'epic', 'legendary');
CREATE TYPE public.challenge_type AS ENUM ('daily', 'weekly', 'monthly', 'special');
CREATE TYPE public.ecotip_category AS ENUM ('recycling', 'energy', 'water', 'transportation', 'general');
CREATE TYPE public.ecotip_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE public.ecotip_impact AS ENUM ('low', 'medium', 'high');
CREATE TYPE public.notification_type AS ENUM ('achievement', 'challenge', 'ranking', 'system', 'educational');
CREATE TYPE public.leaderboard_type AS ENUM ('student', 'class', 'school');
CREATE TYPE public.trend_type AS ENUM ('up', 'down', 'same');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  school_id UUID,
  class_id UUID,
  level INTEGER DEFAULT 1,
  total_papers INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  joined_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schools table
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  total_students INTEGER DEFAULT 0,
  total_papers INTEGER DEFAULT 0,
  total_classes INTEGER DEFAULT 0,
  ranking INTEGER DEFAULT 0,
  monthly_papers INTEGER DEFAULT 0,
  saved_trees DECIMAL DEFAULT 0,
  carbon_reduced DECIMAL DEFAULT 0,
  coordinates_lat DECIMAL,
  coordinates_lng DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create school_classes table
CREATE TABLE public.school_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  grade INTEGER NOT NULL,
  student_count INTEGER DEFAULT 0,
  total_papers INTEGER DEFAULT 0,
  teacher_id UUID REFERENCES public.profiles(id),
  teacher_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ecobox_devices table
CREATE TABLE public.ecobox_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  status device_status DEFAULT 'offline',
  total_capacity INTEGER DEFAULT 1000,
  current_capacity INTEGER DEFAULT 0,
  last_data_received TIMESTAMP WITH TIME ZONE,
  daily_collections INTEGER DEFAULT 0,
  coordinates_lat DECIMAL,
  coordinates_lng DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_georgian TEXT NOT NULL,
  description TEXT NOT NULL,
  description_georgian TEXT NOT NULL,
  icon TEXT NOT NULL,
  category achievement_category NOT NULL,
  requirement INTEGER NOT NULL,
  rarity achievement_rarity NOT NULL DEFAULT 'common',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table (junction table)
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  UNIQUE(user_id, achievement_id)
);

-- Create challenges table
CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_georgian TEXT NOT NULL,
  description TEXT NOT NULL,
  description_georgian TEXT NOT NULL,
  type challenge_type NOT NULL,
  target INTEGER NOT NULL,
  reward INTEGER NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  participants INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_challenges table (junction table)
CREATE TABLE public.user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  progress INTEGER DEFAULT 0,
  joined_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- Create eco_tips table
CREATE TABLE public.eco_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_georgian TEXT NOT NULL,
  content TEXT NOT NULL,
  content_georgian TEXT NOT NULL,
  category ecotip_category NOT NULL,
  difficulty ecotip_difficulty NOT NULL DEFAULT 'easy',
  impact ecotip_impact NOT NULL DEFAULT 'medium',
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  title_georgian TEXT NOT NULL,
  message TEXT NOT NULL,
  message_georgian TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create paper_submissions table (to track individual submissions)
CREATE TABLE public.paper_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  ecobox_id UUID NOT NULL REFERENCES public.ecobox_devices(id) ON DELETE CASCADE,
  papers_count INTEGER NOT NULL DEFAULT 1,
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified BOOLEAN DEFAULT TRUE
);

-- Add foreign key constraints
ALTER TABLE public.profiles ADD CONSTRAINT fk_profiles_school FOREIGN KEY (school_id) REFERENCES public.schools(id);
ALTER TABLE public.profiles ADD CONSTRAINT fk_profiles_class FOREIGN KEY (class_id) REFERENCES public.school_classes(id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecobox_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eco_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for schools (publicly readable for leaderboards)
CREATE POLICY "Schools are publicly readable" ON public.schools FOR SELECT USING (true);

-- Create RLS policies for school_classes (publicly readable for leaderboards)
CREATE POLICY "School classes are publicly readable" ON public.school_classes FOR SELECT USING (true);

-- Create RLS policies for ecobox_devices (publicly readable for map)
CREATE POLICY "EcoBox devices are publicly readable" ON public.ecobox_devices FOR SELECT USING (true);

-- Create RLS policies for achievements (publicly readable)
CREATE POLICY "Achievements are publicly readable" ON public.achievements FOR SELECT USING (true);

-- Create RLS policies for user_achievements
CREATE POLICY "Users can view their own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for challenges (publicly readable)
CREATE POLICY "Challenges are publicly readable" ON public.challenges FOR SELECT USING (true);

-- Create RLS policies for user_challenges
CREATE POLICY "Users can view their own challenges" ON public.user_challenges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own challenges" ON public.user_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own challenges" ON public.user_challenges FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for eco_tips (publicly readable)
CREATE POLICY "Eco tips are publicly readable" ON public.eco_tips FOR SELECT USING (true);

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for paper_submissions
CREATE POLICY "Users can view their own submissions" ON public.paper_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own submissions" ON public.paper_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON public.schools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_school_classes_updated_at BEFORE UPDATE ON public.school_classes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ecobox_devices_updated_at BEFORE UPDATE ON public.ecobox_devices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON public.achievements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_challenges_updated_at BEFORE UPDATE ON public.challenges FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_eco_tips_updated_at BEFORE UPDATE ON public.eco_tips FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();