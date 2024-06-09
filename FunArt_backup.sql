--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.2

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

--
-- Name: acc_types; Type: TYPE; Schema: public; Owner: JianDB_owner
--

CREATE TYPE public.acc_types AS ENUM (
    'registered',
    'guest'
);


ALTER TYPE public.acc_types OWNER TO "JianDB_owner";

--
-- Name: content_types; Type: TYPE; Schema: public; Owner: JianDB_owner
--

CREATE TYPE public.content_types AS ENUM (
    'public',
    'premium'
);


ALTER TYPE public.content_types OWNER TO "JianDB_owner";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: JianDB_owner
--

CREATE TABLE public.account (
    acc_id character varying(10) NOT NULL,
    acc_type public.acc_types NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    points integer NOT NULL,
    contents_id character varying(10)[]
);


ALTER TABLE public.account OWNER TO "JianDB_owner";

--
-- Name: content; Type: TABLE; Schema: public; Owner: JianDB_owner
--

CREATE TABLE public.content (
    content_id character varying(10) NOT NULL,
    acc_id character varying(10) NOT NULL,
    content_type public.content_types NOT NULL,
    content_desc text,
    tag text[],
    likes integer NOT NULL,
    comments_id character varying(6)[],
    content_title text NOT NULL,
    uploaded_at timestamp without time zone NOT NULL
);


ALTER TABLE public.content OWNER TO "JianDB_owner";

--
-- Name: content_comment; Type: TABLE; Schema: public; Owner: JianDB_owner
--

CREATE TABLE public.content_comment (
    comment_id character varying(6) NOT NULL,
    acc_id character varying(10) NOT NULL,
    comment text,
    replies_id character varying(6)[],
    content_id character varying(10) NOT NULL
);


ALTER TABLE public.content_comment OWNER TO "JianDB_owner";

--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: JianDB_owner
--

COPY public.account (acc_id, acc_type, username, password, points, contents_id) FROM stdin;
1ac053axc0	registered	hewsie	hewsie	100	{064ca5ds23}
1234567890	guest	guest	guest	0	\N
\.


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: JianDB_owner
--

COPY public.content (content_id, acc_id, content_type, content_desc, tag, likes, comments_id, content_title, uploaded_at) FROM stdin;
064ca5ds23	1ac053axc0	public	FanArt of Iofi from Hololive ID by Hewsie	{hololive,iofi,ID}	10	{a01c3d}	Iofi HoloID	2024-06-09 14:30:00
\.


--
-- Data for Name: content_comment; Type: TABLE DATA; Schema: public; Owner: JianDB_owner
--

COPY public.content_comment (comment_id, acc_id, comment, replies_id, content_id) FROM stdin;
a01c3d	1ac053axc0	Here it is~	\N	064ca5ds23
\.


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: JianDB_owner
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (acc_id);


--
-- Name: account account_username_key; Type: CONSTRAINT; Schema: public; Owner: JianDB_owner
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_username_key UNIQUE (username);


--
-- Name: content_comment content_comment_comment_id_key; Type: CONSTRAINT; Schema: public; Owner: JianDB_owner
--

ALTER TABLE ONLY public.content_comment
    ADD CONSTRAINT content_comment_comment_id_key UNIQUE (comment_id);


--
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: JianDB_owner
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (content_id);


--
-- Name: content content_acc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: JianDB_owner
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_acc_id_fkey FOREIGN KEY (acc_id) REFERENCES public.account(acc_id);


--
-- Name: content_comment content_comment_acc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: JianDB_owner
--

ALTER TABLE ONLY public.content_comment
    ADD CONSTRAINT content_comment_acc_id_fkey FOREIGN KEY (acc_id) REFERENCES public.account(acc_id);


--
-- Name: content_comment content_comment_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: JianDB_owner
--

ALTER TABLE ONLY public.content_comment
    ADD CONSTRAINT content_comment_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content(content_id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

