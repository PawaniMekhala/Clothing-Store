USE clothing_store_web;

-- =========================
--  USER TABLE
-- =========================
CREATE TABLE `User` (
  `UserID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(255) NOT NULL,
  `LastName` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Address` VARCHAR(255),
  `Phone` VARCHAR(20),
  `ProfilePicture` VARCHAR(255),
  `Role` ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
  PRIMARY KEY (`UserID`),
  UNIQUE (`Email`),
  UNIQUE (`Phone`)
) ENGINE=InnoDB;

-- =========================
--  CATEGORY TABLE
-- =========================
CREATE TABLE `Category` (
  `CategoryID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `CategoryName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB;

-- =========================
--  PRODUCT TABLE
-- =========================
CREATE TABLE `Product` (
  `ProductID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ProductName` VARCHAR(255) NOT NULL,
  `Description` TEXT,
  `Price` DECIMAL(10,2) NOT NULL,
  `Quantity` INT UNSIGNED NOT NULL,
  `CategoryID` INT UNSIGNED,
  `ImagePath` VARCHAR(255) NOT NULL,
  `ProductColor` VARCHAR(255),
  `ProductSize` VARCHAR(255),
  PRIMARY KEY (`ProductID`),
  FOREIGN KEY (`CategoryID`) REFERENCES `Category`(`CategoryID`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
--  CART TABLE
-- =========================
CREATE TABLE `Cart` (
  `CartID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `UserID` INT UNSIGNED NOT NULL,
  `CQuantity` INT UNSIGNED NOT NULL DEFAULT 0,
  `TotalPrice` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`CartID`),
  FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
--  CART ITEMS TABLE
-- =========================
CREATE TABLE `Cart_Items` (
  `CartItemID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `CartID` INT UNSIGNED NOT NULL,
  `ProductID` INT UNSIGNED NOT NULL,
  `CIQuantity` INT UNSIGNED NOT NULL,
  `ProductColor` VARCHAR(255),
  `ProductSize` VARCHAR(255),
  PRIMARY KEY (`CartItemID`),
  FOREIGN KEY (`CartID`) REFERENCES `Cart`(`CartID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
--  REVIEW TABLE
-- =========================
CREATE TABLE `Review` (
  `ReviewID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `UserID` INT UNSIGNED NOT NULL,
  `ProductID` INT UNSIGNED,
  `Rating` INT NOT NULL,
  `Comment` TEXT,
  PRIMARY KEY (`ReviewID`),
  FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;
