-- Database: Workout

-- DROP DATABASE IF EXISTS "Workout";

CREATE DATABASE "Workout"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


-- Table: public.workouts

-- DROP TABLE IF EXISTS public.workouts;

CREATE TABLE IF NOT EXISTS public.workouts
(
    workout_id integer NOT NULL DEFAULT nextval('workouts_workout_id_seq'::regclass),
    workout_date timestamp with time zone NOT NULL DEFAULT CURRENT_DATE,
    workout_type character varying COLLATE pg_catalog."default",
    weight character varying COLLATE pg_catalog."default",
    reps character varying COLLATE pg_catalog."default",
    num_sets integer,
    resistance_type character varying COLLATE pg_catalog."default",
    CONSTRAINT workouts_pkey PRIMARY KEY (workout_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.workouts
    OWNER to postgres;
	
	
-- Table: public.bodypart

-- DROP TABLE IF EXISTS public.bodypart;

CREATE TABLE IF NOT EXISTS public.bodypart
(
    bodypart_id integer NOT NULL DEFAULT nextval('bodypart_bodypart_id_seq'::regclass),
    bodypart_type character varying COLLATE pg_catalog."default",
    CONSTRAINT bodypart_pkey PRIMARY KEY (bodypart_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bodypart
    OWNER to postgres;
	

-- Table: public.resistancetypes

-- DROP TABLE IF EXISTS public.resistancetypes;

CREATE TABLE IF NOT EXISTS public.resistancetypes
(
    resistance_id integer NOT NULL DEFAULT nextval('resistancetypes_resistance_id_seq'::regclass),
    resistance_type character varying COLLATE pg_catalog."default",
    CONSTRAINT resistancetypes_pkey PRIMARY KEY (resistance_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.resistancetypes
    OWNER to postgres;
	
	
-- Table: public.workout_bodypart

-- DROP TABLE IF EXISTS public.workout_bodypart;

CREATE TABLE IF NOT EXISTS public.workout_bodypart
(
    workout_bodypart_id integer NOT NULL DEFAULT nextval('workout_bodypart_workout_bodypart_id_seq'::regclass),
    workout_type character varying COLLATE pg_catalog."default",
    bodypart_type character varying COLLATE pg_catalog."default",
    CONSTRAINT workout_bodypart_pkey PRIMARY KEY (workout_bodypart_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.workout_bodypart
    OWNER to postgres;
	
-- Table: public.workout_resistance

-- DROP TABLE IF EXISTS public.workout_resistance;

CREATE TABLE IF NOT EXISTS public.workout_resistance
(
    workout_resistance_id integer NOT NULL DEFAULT nextval('workout_resistance_workout_resistance_id_seq'::regclass),
    workout_type character varying COLLATE pg_catalog."default",
    resistance_type character varying COLLATE pg_catalog."default",
    CONSTRAINT workout_resistance_pkey PRIMARY KEY (workout_resistance_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.workout_resistance
    OWNER to postgres;
	
	
-- Table: public.workouttype

-- DROP TABLE IF EXISTS public.workouttype;

CREATE TABLE IF NOT EXISTS public.workouttype
(
    workout_id integer NOT NULL DEFAULT nextval('workouttype_workout_id_seq'::regclass),
    workout_type character varying COLLATE pg_catalog."default",
    CONSTRAINT workouttype_pkey PRIMARY KEY (workout_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.workouttype
    OWNER to postgres;