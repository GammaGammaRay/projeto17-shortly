--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-08-07 17:36:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16504)
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    email text,
    token text
);


--
-- TOC entry 218 (class 1259 OID 16503)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 218
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- TOC entry 217 (class 1259 OID 16490)
-- Name: short_urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.short_urls (
    id integer NOT NULL,
    owner_id integer,
    url text,
    shorturl text,
    visitcount integer
);


--
-- TOC entry 216 (class 1259 OID 16489)
-- Name: short_urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.short_urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 216
-- Name: short_urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.short_urls_id_seq OWNED BY public.short_urls.id;


--
-- TOC entry 215 (class 1259 OID 16471)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text
);


--
-- TOC entry 214 (class 1259 OID 16470)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3342 (class 0 OID 0)
-- Dependencies: 214
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;


--
-- TOC entry 3185 (class 2604 OID 16507)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- TOC entry 3184 (class 2604 OID 16493)
-- Name: short_urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.short_urls ALTER COLUMN id SET DEFAULT nextval('public.short_urls_id_seq'::regclass);


--
-- TOC entry 3183 (class 2604 OID 16474)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3191 (class 2606 OID 16511)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 16497)
-- Name: short_urls short_urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.short_urls
    ADD CONSTRAINT short_urls_pkey PRIMARY KEY (id);


--
-- TOC entry 3187 (class 2606 OID 16478)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3192 (class 2606 OID 16498)
-- Name: short_urls short_urls_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.short_urls
    ADD CONSTRAINT short_urls_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);


-- Completed on 2023-08-07 17:36:47

--
-- PostgreSQL database dump complete
--

