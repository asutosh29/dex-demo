-- Migration 0010_supreme_clea already adds parent_id, its foreign key,
-- index, and self-parent constraint. Preserve this migration entry without
-- repeating those schema changes.
SELECT 1;
