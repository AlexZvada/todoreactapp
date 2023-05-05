-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 02 2023 г., 13:14
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34
USE sql9616144;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `notes_project`
--

-- --------------------------------------------------------

--
-- Структура таблицы `notes`
--

CREATE TABLE `notes` (
  `id` int NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `text` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `notes`
--

INSERT INTO `notes` (`id`, `title`, `text`, `status`, `user_id`) VALUES
(106, 'note', 'some new note', 1, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `user_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `User`
--

INSERT INTO `User` (`user_id`, `name`, `password`, `email`) VALUES
(1, 'Ivan', '$2b$07$U2fDDVmJ975NXNTfJVbiUeqjmBm0ZZG.HcYV16fiJiOHahUksxT0y', 'asda@asd'),
(2, 'ad', '$2b$07$Br/.agRtuKdQBv2mvP9cRO.uH9IxCNxfVYHKQ7DUNOICIMTZ9mp4a', 'asd@12'),
(3, 'test', '$2b$07$aZy2E4jnSCkWzSeHqckMVeogVs58ZyioqFcN2fp8v7SoMZXDCurn2', 'test@aaa'),
(4, 'AlexZV25', '$2b$07$lU3BQB5iK8mjeTF1hSrfyupDl0xx4XE0xYYqTl/X6FiVL2RtKXbDK', 'asd'),
(5, '', '$2b$07$sC64WKthTGJIN16FSrEpsOjLbyEcDmxEbRt80WPquZDjDNRXmwUF2', 'asd'),
(6, 'aaaa', '$2b$07$cibx/pjA8etC2ERUXW0DsusOGZvgRhStKNxIrtC.IZrzznkYvCWay', 'asd'),
(7, 'qwe', '$2b$07$.hoBba.uOWvT/yZYnYVrh.7CvEU5XNuNVSz9RzrxO.dHyxCo9q9Sm', 'asd'),
(8, 'q', '$2b$07$LGpHANaAP.fKVQqhRaUObePdmcQSVg6KzoirQTO5gcNf5NcN3UZ7i', 'asd'),
(9, 'Олександр', '$2b$07$GZAdWP8DgYcZ2PfDaXU2RuJ2ZSjjjQ7fiP1IC3Ha1NWz7H6l5RG2a', 'asd'),
(10, '2234', '$2b$07$FE.G2sYHMgOE2PF.xeAEyuTCz3ej8eV6/ViSUKT8u5VCrPzrSp6km', 'asd'),
(11, 's', '$2b$07$bb7Q8A7RtBfZGEGYK9NF/eqnQ3TguNcyGI6z9wj3mVCAlgXjS/MzW', 'asd@asd'),
(12, 'asd', '$2b$07$z.npOWfnA37SUozq3VY6C.8B/O3/y6YeOrU.O5Ijub3mnJR5N0sKa', 'asd@asd'),
(13, 'alex', '$2b$07$5H7wPR6wB6KtzLIAwCmJWOKUZbaf/SlvX4.0BCqSMM3IDONHFbeNq', 'example123000@gmail.com');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT для таблицы `User`
--
ALTER TABLE `User`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
