-- ============================================================
--  SizzleSpoon — Database Schema
--  Run this file once to initialize your MySQL database.
--  Usage: mysql -u root -p < database/init.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS sizzlespoon
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sizzlespoon;

-- ── Users ──────────────────────────────────────────────────────────────────────
-- Stores all registered users. Role distinguishes admins from regular users.
CREATE TABLE IF NOT EXISTS Users (
  UserID       INT          NOT NULL AUTO_INCREMENT,
  Username     VARCHAR(50)  NOT NULL UNIQUE,
  Email        VARCHAR(100) NOT NULL UNIQUE,
  PasswordHash VARCHAR(255) NOT NULL,
  Role         ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  CreatedAt    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (UserID)
);

-- ── Categories ─────────────────────────────────────────────────────────────────
-- Simple lookup table for recipe categories (e.g. Breakfast, Vegan, Dessert).
CREATE TABLE IF NOT EXISTS Categories (
  CategoryID   INT          NOT NULL AUTO_INCREMENT,
  CategoryName VARCHAR(100) NOT NULL UNIQUE,

  PRIMARY KEY (CategoryID)
);

-- ── Recipes ────────────────────────────────────────────────────────────────────
-- Core table. Each recipe belongs to one author (User) and one category.
-- Deleting an author cascades to delete their recipes.
-- Deleting a category sets CategoryID to NULL (recipes are preserved).
CREATE TABLE IF NOT EXISTS Recipes (
  RecipeID      INT          NOT NULL AUTO_INCREMENT,
  Title         VARCHAR(255) NOT NULL,
  Ingredients   TEXT         NOT NULL,
  CookingSteps  TEXT         NOT NULL,
  ImageURL      VARCHAR(500)     NULL,
  AuthorID      INT          NOT NULL,
  CategoryID    INT              NULL,
  CreatedAt     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (RecipeID),
  FOREIGN KEY (AuthorID)   REFERENCES Users(UserID)      ON DELETE CASCADE,
  FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE SET NULL
);

-- ── Favorites ──────────────────────────────────────────────────────────────────
-- A user can favorite a recipe once (enforced by UNIQUE constraint).
-- Cascades on both sides: removing a user or recipe clears their favorites.
CREATE TABLE IF NOT EXISTS Favorites (
  FavoriteID INT       NOT NULL AUTO_INCREMENT,
  UserID     INT       NOT NULL,
  RecipeID   INT       NOT NULL,
  CreatedAt  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (FavoriteID),
  UNIQUE KEY  uq_user_recipe_favorite (UserID, RecipeID),
  FOREIGN KEY (UserID)   REFERENCES Users(UserID)    ON DELETE CASCADE,
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE
);

-- ── Ratings ────────────────────────────────────────────────────────────────────
-- A user can rate each recipe once (1–5 stars).
-- CHECK constraint enforces valid score range.
CREATE TABLE IF NOT EXISTS Ratings (
  RatingID  INT          NOT NULL AUTO_INCREMENT,
  UserID    INT          NOT NULL,
  RecipeID  INT          NOT NULL,
  Score     TINYINT      NOT NULL,
  CreatedAt TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (RatingID),
  UNIQUE KEY  uq_user_recipe_rating (UserID, RecipeID),
  CONSTRAINT  chk_score CHECK (Score BETWEEN 1 AND 5),
  FOREIGN KEY (UserID)   REFERENCES Users(UserID)    ON DELETE CASCADE,
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE
);

-- ── Reviews ────────────────────────────────────────────────────────────────────
-- A user can leave multiple text reviews on a recipe.
-- Cascades on both user and recipe deletion.
CREATE TABLE IF NOT EXISTS Reviews (
  ReviewID  INT       NOT NULL AUTO_INCREMENT,
  UserID    INT       NOT NULL,
  RecipeID  INT       NOT NULL,
  Comment   TEXT      NOT NULL,
  CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (ReviewID),
  FOREIGN KEY (UserID)   REFERENCES Users(UserID)    ON DELETE CASCADE,
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE
);

-- ── Seed: Default Categories ───────────────────────────────────────────────────
INSERT IGNORE INTO Categories (CategoryName) VALUES
  ('Breakfast'),
  ('Lunch'),
  ('Dinner'),
  ('Dessert'),
  ('Vegetarian'),
  ('Vegan'),
  ('Snacks'),
  ('Drinks');
