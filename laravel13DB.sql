-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 23, 2026 at 03:40 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel13DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-a927878e2ba05efd437ca320bd3cf4a5', 'i:1;', 1776901898),
('laravel-cache-a927878e2ba05efd437ca320bd3cf4a5:timer', 'i:1776901898;', 1776901898);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `is_vip` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `phone`, `notes`, `is_vip`, `created_at`, `updated_at`) VALUES
(1, 'James', 'Thompson', 'james.thompson@email.com', '+1 (212) 555-0101', 'Prefers corner table. Allergic to shellfish.', 1, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(2, 'Sophia', 'Chen', 'sophia.chen@email.com', '+1 (212) 555-0102', '_regular VIP guest. Celebrating anniversary.', 1, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(3, 'Michael', 'Rodriguez', 'michael.r@email.com', '+1 (212) 555-0103', NULL, 0, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(4, 'Emily', 'Wang', 'emily.wang@email.com', '+1 (212) 555-0104', 'Vegetarian preferences.', 0, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(5, 'David', 'Kim', 'david.kim@email.com', '+1 (212) 555-0105', 'Business dinners frequently.', 1, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(6, 'Lisa', 'Anderson', 'lisa.anderson@email.com', '+1 (212) 555-0106', NULL, 0, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(7, 'Robert', 'Foster', 'robert.foster@email.com', '+1 (212) 555-0107', 'First time visitor.', 0, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(8, 'Jennifer', 'Nakamura', 'jennifer.n@email.com', '+1 (212) 555-0108', 'Regular weekend guest.', 1, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(9, 'William', 'Harris', 'william.harris@email.com', '+1 (212) 555-0109', NULL, 0, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(10, 'Amanda', 'Lee', 'amanda.lee@email.com', '+1 (212) 555-0110', 'Food blogger - may post photos.', 0, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(12, 'Clydey', 'Ednalan', 'clydey@gmail.com', '234578', 'bday party updated', 1, '2026-04-22 04:53:27', '2026-04-22 04:53:47'),
(13, 'John', 'Doe', 'john@example.com', '+1234567890', NULL, 0, '2026-04-22 05:07:45', '2026-04-22 05:07:45'),
(14, 'Caitlin', 'Ednalan', 'caitlin@gmail.com', '45345345345', NULL, 0, '2026-04-22 05:11:16', '2026-04-22 05:11:16'),
(15, 'Tin', 'Ednalan', 'tin@gmail.com', '4234234234', NULL, 1, '2026-04-22 05:14:26', '2026-04-22 05:15:19'),
(16, 'Cairocoders', 'Ednalan', 'cairo@test.com', '435345345', NULL, 1, '2026-04-22 05:35:08', '2026-04-22 05:35:55');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int(11) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `image_url`, `caption`, `alt_text`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', 'Test', NULL, 1, 1, '2026-04-22 04:14:14', '2026-04-22 04:14:14'),
(2, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', 'Elegant restaurant interior', 'Restaurant interior', 1, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(3, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', 'Sushi platter', 'Sushi', 2, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(4, 'https://images.unsplash.com/photo-1571896349842-6e53ce41e887?w=800&q=80', 'Chef at work', 'Chef', 3, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(5, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', 'Gourmet dish', 'Dish', 4, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(6, 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80', 'Romantic setting', 'Dinner', 5, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(7, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80', 'Fresh ingredients', 'Ingredients', 6, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(8, 'https://images.unsplash.com/photo-1540189549336-e6e2c4a3a234?w=800&q=80', 'Seasonal menu', 'Menu', 7, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(9, 'https://images.unsplash.com/photo-1563245372-f21724e3856e?w=800&q=80', 'Exquisite plating', 'Plating', 8, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(10, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80', 'Master chef', 'Chef', 9, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(11, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80', 'Dining atmosphere', 'Ambiance', 10, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(12, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', 'Signature wagyu', 'Wagyu', 11, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25'),
(13, 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80', 'Fresh seafood', 'Seafood', 12, 1, '2026-04-22 04:14:25', '2026-04-22 04:14:25');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `display_order` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `name`, `description`, `price`, `category`, `image_url`, `is_featured`, `is_available`, `display_order`, `created_at`, `updated_at`) VALUES
(1, 'Wagyu Tataki', 'Seared Kagoshima A5 wagyu beef with truffle ponzu, microgreens, and crispy garlic', '38.00', 'Appetizers', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', 1, 1, 1, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(2, 'Fresh Uni Selection', 'Premium Hokkaido uni served traditional style with pickled ginger and wasabi', '42.00', 'Appetizers', 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80', 1, 1, 2, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(3, 'Chef\'s Omakase', '12-piece chef\'s selection of seasonal nigiri, prepared at the teppanyaki table', '85.00', 'Chef\'s Special', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80', 1, 1, 1, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(4, 'Black Cod Saikyo', 'Miso-marinated black cod with sweet onion puree and seasonal vegetables', '48.00', 'Main Course', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80', 1, 1, 2, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(5, 'A5 Wagyu Ribeye', 'Grade A5 Kagoshima wagyu with wasabi stem, ponzu, and Himalayan salt', '120.00', 'Main Course', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', 1, 1, 3, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(6, 'Golden Lobster', 'Butter-poached Maine lobster with gold flake, yuzu kosho, and herb oil', '75.00', 'Main Course', 'https://images.unsplash.com/photo-1553247407-23251b9c19e0?w=600&q=80', 0, 1, 4, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(7, 'Tuna Tartare', 'Fresh bluefin tuna with avocado, sesame, and wonton crisps', '32.00', 'Appetizers', 'https://images.unsplash.com/photo-1534604973900-c43aa9972157?w=600&q=80', 0, 1, 3, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(8, 'Duck Breast', 'Five-spice duck breast with cherry gastrique and bok choy', '52.00', 'Main Course', 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=600&q=80', 0, 1, 5, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(9, 'Miso Ramen', 'Rich tonkotsu broth with chashu, soft egg, and fresh noodles', '24.00', 'Noodles', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80', 0, 1, 1, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(10, 'Udon with Tempura', 'Fresh udon in dashi broth with crispy shrimp tempura', '22.00', 'Noodles', 'https://images.unsplash.com/photo-1617093729463-2b85e536494b?w=600&q=80', 0, 1, 2, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(11, 'Salmon Teriyaki', 'Glazed Norwegian salmon with teriyaki sauce and steamed rice', '36.00', 'Main Course', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', 0, 1, 6, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(12, 'Gyoza (6 pcs)', 'Pan-fried pork and vegetable dumplings with ponzu', '14.00', 'Appetizers', 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80', 0, 1, 4, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(13, 'Edamame', 'Steamed soybeans with sea salt', '8.00', 'Appetizers', 'https://images.unsplash.com/photo-1564894809611-1742fc40ed80?w=600&q=80', 0, 1, 5, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(14, 'Mochi Ice Cream', 'Choice of green tea, mango, or red bean ice cream (3 pcs)', '12.00', 'Desserts', 'https://images.unsplash.com/photo-1582037928768-2da72c190d18?w=600&q=80', 0, 1, 1, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(15, 'Matcha Fondant', 'Warm matcha cake with vanilla bean ice cream', '16.00', 'Desserts', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80', 1, 1, 2, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(16, 'Sake Flight', 'Curated selection of three premium sakes', '28.00', 'Beverages', 'https://images.unsplash.com/photo-1510049521901-99f4f21bc5a8?w=600&q=80', 0, 1, 1, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(17, 'Sakura Martini', 'Cherry blossom vodka, elderflower, and lemon', '18.00', 'Beverages', 'https://images.unsplash.com/photo-1575023782549-62ca2d5b4b37?w=600&q=80', 0, 1, 2, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(18, 'Green Tea', 'Premium Japanese green tea', '6.00', 'Beverages', 'https://images.unsplash.com/photo-1564890368878-9f2204efc3ac?w=600&q=80', 0, 1, 3, '2026-04-22 04:13:32', '2026-04-22 04:13:32');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_14_170933_add_two_factor_columns_to_users_table', 1),
(5, '2026_04_22_000001_create_customers_table', 2),
(6, '2026_04_22_000002_create_tables_table', 2),
(7, '2026_04_22_000003_create_reservations_table', 2),
(8, '2026_04_22_000004_create_reservation_tables_table', 2),
(9, '2026_04_22_000005_create_menu_items_table', 2),
(10, '2026_04_22_000006_create_gallery_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `reservation_date` date NOT NULL,
  `reservation_time` time NOT NULL,
  `guest_count` tinyint(4) NOT NULL,
  `status` enum('pending','confirmed','cancelled','completed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `special_requests` text COLLATE utf8mb4_unicode_ci,
  `confirmed_at` timestamp NULL DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `customer_id`, `reservation_date`, `reservation_time`, `guest_count`, `status`, `special_requests`, `confirmed_at`, `cancelled_at`, `created_at`, `updated_at`) VALUES
(1, 1, '2026-04-22', '19:00:00', 2, 'confirmed', 'Birthday celebration - please prepare a small cake', '2026-04-22 04:13:32', NULL, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(2, 2, '2026-04-22', '20:00:00', 4, 'confirmed', 'Anniversary dinner - quiet table preferred', '2026-04-21 04:13:32', NULL, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(3, 3, '2026-04-23', '18:30:00', 2, 'pending', NULL, NULL, NULL, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(4, 4, '2026-04-27', '19:30:00', 4, 'confirmed', 'Vegetarian menu options needed', '2026-04-22 04:13:32', NULL, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(5, 5, '2026-04-29', '19:00:00', 6, 'confirmed', 'Business dinner - private room if available', '2026-04-20 04:13:32', NULL, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(6, 6, '2026-04-24', '12:30:00', 2, 'confirmed', 'Brunch reservation', '2026-04-22 04:13:32', NULL, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(7, 7, '2026-04-21', '19:00:00', 4, 'completed', 'First time visiting', '2026-04-20 04:13:32', NULL, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(8, 8, '2026-04-19', '20:00:00', 2, 'completed', NULL, '2026-04-18 04:13:32', NULL, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(9, 9, '2026-05-02', '18:00:00', 8, 'pending', 'Large party - need multiple tables', NULL, NULL, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(10, 10, '2026-04-26', '19:30:00', 2, 'cancelled', 'Food blogger - interested in chef table', NULL, '2026-04-21 04:13:32', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(11, 12, '2026-04-22', '22:57:00', 9, 'confirmed', 'no request', '2026-04-22 04:54:54', NULL, '2026-04-22 04:54:54', '2026-04-22 04:54:54'),
(12, 13, '2026-04-25', '19:00:00', 2, 'pending', NULL, NULL, NULL, '2026-04-22 05:07:45', '2026-04-22 05:07:45'),
(13, 14, '2026-04-22', '18:30:00', 4, 'confirmed', 'bday party', '2026-04-22 05:13:21', NULL, '2026-04-22 05:11:16', '2026-04-22 05:13:21'),
(14, 15, '2026-04-22', '19:00:00', 9, 'confirmed', 'bday party', '2026-04-22 05:14:54', NULL, '2026-04-22 05:14:26', '2026-04-22 05:14:54'),
(15, 16, '2026-04-22', '20:30:00', 9, 'confirmed', 'meeding', '2026-04-22 05:36:10', NULL, '2026-04-22 05:35:08', '2026-04-22 05:36:10');

-- --------------------------------------------------------

--
-- Table structure for table `reservation_tables`
--

CREATE TABLE `reservation_tables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reservation_id` bigint(20) UNSIGNED NOT NULL,
  `table_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservation_tables`
--

INSERT INTO `reservation_tables` (`id`, `reservation_id`, `table_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(2, 2, 13, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(3, 3, 2, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(4, 4, 3, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(5, 5, 14, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(6, 5, 15, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(7, 6, 10, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(8, 7, 4, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(9, 8, 5, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(10, 9, 8, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(11, 9, 7, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(12, 10, 6, '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(13, 11, 18, '2026-04-22 04:54:54', '2026-04-22 04:54:54'),
(14, 12, 1, '2026-04-22 05:07:45', '2026-04-22 05:07:45'),
(15, 13, 3, '2026-04-22 05:11:16', '2026-04-22 05:11:16'),
(16, 14, 20, '2026-04-22 05:14:26', '2026-04-22 05:14:26'),
(17, 15, 20, '2026-04-22 05:35:08', '2026-04-22 05:35:08');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('bvaCOMA8pKfs2TqBTs10O8Qwuwq85pHXLvMcHmRt', 1, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJnWjJlZDdCTEpJelUySWZKcUo0aEtEVkJMT3RpUXdCQWtJcWRsZmVpIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJfcHJldmlvdXMiOnsidXJsIjoiaHR0cDpcL1wvMTI3LjAuMC4xOjgwMDBcL2Rhc2hib2FyZCIsInJvdXRlIjoiZGFzaGJvYXJkIn0sImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjoxfQ==', 1776864981),
('DyLq8Pp99AXC5J1KI6KSTiXbwve7fwKBHPe2MwAl', 1, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJERGROaXhXemJlU1hyUU93SE5vZkliYmZhSXg5ZG02QVg2ZkpBRDBhIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9sb2dpbiIsInJvdXRlIjoibG9naW4ifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI6MX0=', 1776901849),
('Udhb643qqVx21uQHmelX8FGyBQ8yknlG4u44gitB', NULL, '127.0.0.1', 'curl/8.7.1', 'eyJfdG9rZW4iOiJVSW5HZ1VndGNIWDI1SFhsd2NWbmhRd094SENHMXZQWWZFMG54emcwIiwidXJsIjp7ImludGVuZGVkIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwMDBcL2Rhc2hib2FyZCJ9LCJfcHJldmlvdXMiOnsidXJsIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwMDBcL2Rhc2hib2FyZCIsInJvdXRlIjoiZGFzaGJvYXJkIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1776861367);

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `table_number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` tinyint(4) NOT NULL,
  `location` enum('indoor','outdoor','vip','bar','private') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'indoor',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`id`, `table_number`, `capacity`, `location`, `is_active`, `description`, `created_at`, `updated_at`) VALUES
(1, 'T1', 2, 'indoor', 1, 'Intimate table for couples', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(2, 'T2', 2, 'indoor', 1, 'Window side table', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(3, 'T3', 4, 'indoor', 1, 'Main dining area', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(4, 'T4', 4, 'indoor', 1, 'Center table', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(5, 'T5', 4, 'indoor', 1, 'Near kitchen', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(6, 'T6', 6, 'indoor', 1, 'Family style table', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(7, 'T7', 6, 'indoor', 1, 'Group dining', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(8, 'T8', 8, 'indoor', 1, 'Large party table', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(9, 'O1', 2, 'outdoor', 1, 'Patio seating', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(10, 'O2', 4, 'outdoor', 1, 'Garden view', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(11, 'O3', 4, 'outdoor', 1, 'Covered patio', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(12, 'O4', 6, 'outdoor', 1, 'Large patio table', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(13, 'VIP1', 4, 'vip', 1, 'Private VIP booth', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(14, 'VIP2', 6, 'vip', 1, 'Premium VIP seating', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(15, 'VIP3', 8, 'vip', 1, 'VIP private room', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(16, 'B1', 2, 'bar', 1, 'Bar counter seating', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(17, 'B2', 2, 'bar', 1, 'Bar counter seating', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(18, 'B3', 2, 'bar', 1, 'Bar counter seating', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(19, 'B4', 2, 'bar', 1, 'Bar counter seating', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(20, 'P1', 12, 'private', 1, 'Private dining room', '2026-04-22 04:13:32', '2026-04-22 04:13:32'),
(21, 'C5', 15, 'private', 1, 'private', '2026-04-22 05:26:13', '2026-04-22 05:26:13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Cairocoders Ednalan', 'cairocoders@gmail.com', NULL, '$2y$12$2l6sFnCgKYXgvitIVSOLPO/iZgCwuTr9A5j9TViKtFlUbskNP0hiS', NULL, NULL, NULL, NULL, '2026-04-22 03:39:40', '2026-04-22 03:39:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`),
  ADD KEY `customers_email_index` (`email`),
  ADD KEY `customers_last_name_first_name_index` (`last_name`,`first_name`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gallery_is_active_index` (`is_active`),
  ADD KEY `gallery_display_order_index` (`display_order`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_items_category_index` (`category`),
  ADD KEY `menu_items_is_featured_index` (`is_featured`),
  ADD KEY `menu_items_display_order_index` (`display_order`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_reservation_date_index` (`reservation_date`),
  ADD KEY `reservations_reservation_date_reservation_time_index` (`reservation_date`,`reservation_time`),
  ADD KEY `reservations_status_index` (`status`),
  ADD KEY `reservations_customer_id_index` (`customer_id`);

--
-- Indexes for table `reservation_tables`
--
ALTER TABLE `reservation_tables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reservation_tables_reservation_id_table_id_unique` (`reservation_id`,`table_id`),
  ADD KEY `reservation_tables_table_id_index` (`table_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tables_table_number_unique` (`table_number`),
  ADD KEY `tables_location_index` (`location`),
  ADD KEY `tables_capacity_index` (`capacity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `reservation_tables`
--
ALTER TABLE `reservation_tables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reservation_tables`
--
ALTER TABLE `reservation_tables`
  ADD CONSTRAINT `reservation_tables_reservation_id_foreign` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservation_tables_table_id_foreign` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
