CREATE EXTENSION pgcrypto;

CREATE SCHEMA IF NOT EXISTS bsbmaint;

CREATE TABLE bsbmaint.members(
    member_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_name character varying(50)
);

CREATE TABLE bsbmaint.tickets(
    ticket_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES bsbmaint.members(member_id),
    ticket_name character varying(50) NOT NULL
);


--INSERTING TEST DATA

INSERT INTO bsbmaint.members(member_name)
VALUES
('member 1', CURRENT_DATE),
('member 2', CURRENT_DATE),
('member 3', CURRENT_DATE),
('member 4', CURRENT_DATE),
('member 5', CURRENT_DATE),
('member 6', CURRENT_DATE),
('member 7', CURRENT_DATE),
('member 8', CURRENT_DATE),
('member 9', CURRENT_DATE);

INSERT INTO bsbmaint.entries(member_id, ticket_name)
VALUES
((SELECT member_id FROM bsbmaint.members WHERE member_name = 'member 1'), 'Broken Fridge'),

((SELECT member_id FROM bsbmaint.members WHERE member_name = 'member 2'), 'Broken Light');