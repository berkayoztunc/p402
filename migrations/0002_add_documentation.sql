-- Migration: Add documentation field to apis table
-- Description: Add markdown documentation field for API descriptions

ALTER TABLE apis ADD COLUMN documentation TEXT DEFAULT '';
