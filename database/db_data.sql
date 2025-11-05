INSERT INTO Product 
(ProductID, ProductName, Description, Price, Quantity, CategoryID, ImagePath, ProductColor, ProductSize) 
VALUES
(1, 'Classic White Shirt', 'A slim-fit cotton shirt suitable for formal and casual wear.', 3500.00, 50, 1, 'https://res.cloudinary.com/clothing-web/image/upload/v1762326615/product_images/gduar4hssuykw5ma9juk.jpg', 'White', 'M'),
(2, 'Denim Jeans', 'Comfortable blue denim jeans with stretch fabric.', 5200.00, 40, 1, 'https://res.cloudinary.com/clothing-web/image/upload/v1762326640/product_images/k2qec9hlrkwhlzdl6prr.webp', 'Blue', 'XL'),
(3, 'Black Leather Jacket', 'Stylish biker leather jacket with zippers.', 12500.00, 15, 1, 'https://res.cloudinary.com/clothing-web/image/upload/v1762326666/product_images/eo5vowqpgzvpkd0nz7yd.webp', 'Black', 'L'),
(4, 'Formal Trousers', 'Navy-blue slim-fit formal trousers for office wear.', 4800.00, 25, 1, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327290/product_images/i0ry0zdhma8wrcyl1f95.webp', 'Navy Blue', 'XXL'),
(5, 'Sports T-Shirt', 'Breathable polyester t-shirt ideal for workouts.', 2800.00, 60, 1, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327318/product_images/xttppxhtalz4eok9m7wn.webp', 'Grey', 'M'),
(6, 'Hoodie', 'Cotton hoodie with adjustable drawstrings.', 4500.00, 35, 1, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327357/product_images/d1hgyl6pfpnm2y7wycp3.jpg', 'Maroon', 'L'),
(7, 'Polo T-Shirt', 'Classic short-sleeve polo shirt with breathable cotton.', 3200.00, 45, 1, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327375/product_images/uthhorvbedlg0ynf4vnm.webp', 'Navy Blue', 'L'),
(8, 'Floral Dress', 'Summer floral printed midi dress with soft cotton fabric.', 7200.00, 30, 2, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327393/product_images/ulyvdpsllkuvngwdnk4g.webp', 'Pink', 'M'),
(9, 'Jeans', 'High-waist skinny-fit jeans for women.', 5600.00, 40, 2, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327393/product_images/ulyvdpsllkuvngwdnk4g.webp', 'Dark Blue', 'M'),
(10, 'Silk Blouse', 'Elegant silk blouse perfect for formal wear.', 6800.00, 20, 2, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327413/product_images/f4icrhe8ffrpvnotnxzz.jpg', 'Ivory', 'S'),
(11, 'Printed Long Skirt', 'Bohemian style maxi skirt with floral prints.', 5400.00, 25, 2, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327438/product_images/f9phebtdp3bo5rfif5ef.webp', 'Red', 'M'),
(12, 'Crop Top', 'Trendy cotton crop top with round neck.', 2800.00, 50, 2, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327457/product_images/c7hcjm7xc6ilvlibsabr.webp', 'Beige', 'S'),
(13, 'Cardigan', 'Soft wool cardigan for winter wear.', 4900.00, 30, 2, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327476/product_images/hi45dauzfqncqm5nsgi4.jpg', 'Brown', 'L'),
(14, 'Denim Jacket', 'Trendy cropped denim jacket with button closure.', 7500.00, 25, 2, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327497/product_images/ghkocjphc1y0dwhsgepx.jpg', 'Light Blue', 'XL'),
(15, 'T-Shirt', 'Colorful cotton t-shirt with cartoon print.', 1800.00, 60, 3, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327517/product_images/zxisonjljy7pznevbjle.webp', 'Yellow', 'S'),
(16, 'Shorts', 'Comfortable cotton shorts for summer.', 2200.00, 50, 3, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327536/product_images/j3668iw5tmc1ainnyhtb.webp', 'Blue', 'M'),
(17, 'Hoodie', 'Warm hoodie for kids with zipper.', 3500.00, 25, 3, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327553/product_images/xzgczdmiaorwddynd17f.webp', 'Red', 'M'),
(18, 'Girls Dress', 'Cute floral frock for girls aged 5-8.', 4200.00, 30, 3, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327567/product_images/riepp64otbfbnshdeusv.jpg', 'Pink', 'S'),
(19, 'Pajama Set', 'Soft cotton pajama set with cute animal print.', 2800.00, 40, 3, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327583/product_images/dmlg5addkwps7qhcwtss.jpg', 'Sky Blue', 'S'),
(20, 'Leggings', 'Stretchable leggings ideal for casual wear and playtime.', 2000.00, 35, 3, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327601/product_images/jht5rcrvoy88djil1yys.jpg', 'Purple', 'M'),
(21, 'Casual Checked Shirt', 'Cotton casual shirt with a classic red and black check pattern.', 4000.00, 35, 1, 'https://res.cloudinary.com/clothing-web/image/upload/v1762327620/product_images/akguyry6d9eddjf1nilz.webp', 'Red', 'M');


INSERT INTO user (UserID, FirstName, LastName, Email, Password, Address, Phone, ProfilePicture, Role)
VALUES
(1, 'John', 'Doe', 'SpongeBob@gmail.com', '$2b$10$Kwkz/T1Th88qDChdpLtXEux4lNtGvIEYQ1Ygn/DjW4s7T9Fk.klcq', '123 Palm Grove Avenue, Colombo 05, Western Province', '0771234567', 'https://res.cloudinary.com/clothing-web/image/upload/v1762325754/product_images/v88f5bw3aidtbugn9mmr.webp', 'User'),
(2, 'John', 'Doe', 'SpongeBob1@gmail.com', '$2b$10$clO3TqfFJPFJ0Gg6tiHkY.uvh/ouifn.fjt/2MRLsrOvgoUHRq9T6', '45 Lake View Road, Kandy, Central Province', '0712345678', 'https://res.cloudinary.com/clothing-web/image/upload/v1762328800/product_images/jp9behzdnwoo3iyhxzid.jpg', 'User'),
(3, 'John', 'Doe', 'JohnDoe1@gmail.com', '$2b$10$0CAviFeNeIBVTtM/fTopQO46k5ILvG3frXb20BFrVhF3tdySRbIGC', '10 Rose Park Street, Galle, Southern Province', '0759876543', 'https://res.cloudinary.com/clothing-web/image/upload/v1762328850/product_images/wygiy88dj1co86s0xivv.jpg', 'User'),
(4, 'Sponge', 'Bob', 'JohnDoe2@gmail.com', '$2b$10$n/531rva9Y4Z3u98JRTsXuytFXJU/g60X83HcjM73FYj0BLcMYzBi', '78 Hilltop Lane, Nuwara Eliya, Central Province', '0765432198', 'https://res.cloudinary.com/clothing-web/image/upload/v1762328850/product_images/wygiy88dj1co86s0xivv.jpg', 'User'),
(5, 'Aiden', 'Fernando', 'aidenfernando@gmail.com', '$2b$10$IpZFf/VVddIYEmx76x8/ZuqHYhIpgyyrgTdMH.QQ72Z5t7MuJJQZ6', '250 Ocean Breeze Avenue, Negombo, Western Province', '0784561239', 'https://res.cloudinary.com/clothing-web/image/upload/v1762329022/product_images/iqw5ljm4gcdkvbzpcllc.webp', 'User'),
(6, 'Samantha', 'Perera', 'samanthaperera@example.com', '$2b$10$NkW4jpIGJ2Njk0er5Ai22u1QdZNgh74WDtghqVX0NF4r1kiP3iRV.', '90 Lotus Street, Matara, Southern Province', '0701122334', 'https://res.cloudinary.com/clothing-web/image/upload/v1762329124/product_images/y4fqmy3yhgzzia2msc4k.jpg', 'User');
