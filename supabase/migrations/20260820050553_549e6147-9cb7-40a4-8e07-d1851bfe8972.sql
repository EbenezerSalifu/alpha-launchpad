CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read their own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.enrolments (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  contact text NOT NULL,
  gmail text NOT NULL,
  interests text[] NOT NULL,
  status text NOT NULL DEFAULT 'New'
);
GRANT INSERT ON public.enrolments TO anon, authenticated;
GRANT SELECT, UPDATE ON public.enrolments TO authenticated;
GRANT ALL ON public.enrolments TO service_role;
ALTER TABLE public.enrolments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enrolment" ON public.enrolments
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(trim(full_name)) BETWEEN 1 AND 120
  AND length(trim(contact)) BETWEEN 1 AND 40
  AND length(trim(gmail)) BETWEEN 3 AND 200
  AND array_length(interests, 1) BETWEEN 1 AND 3
  AND interests <@ ARRAY['AI FOR STUDENTS','AI FOR PROFESSIONALS','AI FOR ENTREPRENEURS']::text[]
  AND status = 'New'
);

CREATE POLICY "Admins can view enrolments" ON public.enrolments
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update enrolments" ON public.enrolments
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  role text NOT NULL,
  program text NOT NULL,
  quote text NOT NULL,
  story_date date,
  photo_url text,
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published testimonials" ON public.testimonials
FOR SELECT TO anon, authenticated USING (published = true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.testimonials (name, role, program, quote, published, sort_order) VALUES
('Favour O.', 'Student', 'SCALE WITH AI', 'I attended the Scale with AI class in the middle of the semester, just after my tests. I had literally begun giving up on the semester, but after applying the AI-powered study methods shared in the class, I ended the semester with better grades.', true, 1),
('Ayomide J.', 'Secretary — Office Professional', 'SCALE WITH AI', 'Through what I learnt in the Scale with AI class, I discovered practical ways to leverage AI in my daily work. I now sort messages faster, manage tasks more efficiently, and perform better in my role.', true, 2),
('Joshua A.', 'Content Creator', 'SCALE WITH AI', 'The Scale with AI class showed me how to leverage AI for ideation within my field. Since applying what I learnt, I have been able to generate ideas more efficiently and share content more consistently.', true, 3);