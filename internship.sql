-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 04, 2022 lúc 03:57 AM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `internship2`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `assessment`
--

CREATE TABLE `assessment` (
  `idAssessment` int(15) NOT NULL,
  `idInternshipCourse` int(15) DEFAULT NULL,
  `idInternship` int(15) DEFAULT NULL,
  `idMentor` int(15) DEFAULT NULL,
  `idDG` int(15) DEFAULT NULL,
  `idCandidate` int(15) DEFAULT NULL,
  `evaluationDate` date DEFAULT NULL,
  `report1` int(11) DEFAULT NULL,
  `report2` int(11) DEFAULT NULL,
  `report3` int(11) DEFAULT NULL,
  `report4` int(11) DEFAULT NULL,
  `finalReport` int(11) DEFAULT NULL,
  `technicalSkill` varchar(255) DEFAULT NULL,
  `FinalPresentationDate` date DEFAULT NULL,
  `FinalevaluationfromMentor` varchar(255) DEFAULT NULL,
  `AspectsToBePraised` varchar(255) DEFAULT NULL,
  `SoftSkills` varchar(255) DEFAULT NULL,
  `AspectsToBeImproved` varchar(255) DEFAULT NULL,
  `AdjustedbyTrainingDept` varchar(255) DEFAULT NULL,
  `FinalScore` varchar(255) DEFAULT NULL,
  `EnglishTestResult` varchar(255) DEFAULT NULL,
  `EnglishLevel` varchar(255) DEFAULT NULL,
  `IndustryInternshipManager` varchar(255) DEFAULT NULL,
  `ProjectLeader` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `candidates`
--

CREATE TABLE `candidates` (
  `idCandidate` int(15) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `tel` varchar(10) DEFAULT NULL,
  `emailCandidate` varchar(255) DEFAULT NULL,
  `idDG` int(15) DEFAULT NULL,
  `interviewTime` time DEFAULT NULL,
  `interviewDate` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `idMentor` int(15) DEFAULT NULL,
  `technicalComments` varchar(255) DEFAULT NULL,
  `technicalScore` varchar(255) DEFAULT NULL,
  `attitude` varchar(255) DEFAULT NULL,
  `englishCommunication` varchar(255) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `internshipDomain` varchar(255) DEFAULT NULL,
  `preferredSkills` varchar(255) DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `faculty` varchar(255) DEFAULT NULL,
  `currentYearofStudy` varchar(255) DEFAULT NULL,
  `studentID` varchar(255) DEFAULT NULL,
  `preferredInternshipStartDate` date DEFAULT NULL,
  `preferredInternshipDuration` varchar(255) DEFAULT NULL,
  `internshipSchedule` varchar(255) DEFAULT NULL,
  `GPA` float DEFAULT NULL,
  `idInternshipCourse` int(15) DEFAULT NULL,
  `graduationYear` varchar(255) DEFAULT NULL,
  `projectExperience` varchar(255) DEFAULT NULL,
  `expectedGraduationSchedule` varchar(255) DEFAULT NULL,
  `remainingSubjects` varchar(255) DEFAULT NULL,
  `covidVaccinationiInformation` varchar(255) DEFAULT NULL,
  `certificationDate` date DEFAULT NULL,
  `covidVaccinationCertificate` varchar(255) DEFAULT NULL,
  `interviewLink` varchar(255) DEFAULT NULL,
  `interviewer` varchar(255) DEFAULT NULL,
  `emailInterviewer` varchar(255) DEFAULT NULL,
  `pcType` varchar(255) DEFAULT NULL,
  `updateInsert` varchar(255) DEFAULT NULL,
  `deleteAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dg`
--

CREATE TABLE `dg` (
  `idDG` int(15) NOT NULL,
  `nameDG` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `email`
--

CREATE TABLE `email` (
  `idEmail` int(15) NOT NULL,
  `idInternship` int(15) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `internship`
--

CREATE TABLE `internship` (
  `idInternship` int(15) NOT NULL,
  `fullNameInternship` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `idMentor` int(15) DEFAULT NULL,
  `internshipProject` varchar(255) DEFAULT NULL,
  `telInternship` varchar(10) DEFAULT NULL,
  `securityTest` varchar(255) DEFAULT NULL,
  `idInternshipCourse` int(15) DEFAULT NULL,
  `idDG` int(15) DEFAULT NULL,
  `idCandidate` int(15) DEFAULT NULL,
  `internshipAgreementPolicy` varchar(255) DEFAULT NULL,
  `toeicScore` int(15) DEFAULT NULL,
  `testDate` date DEFAULT NULL,
  `securityAwareness` varchar(255) DEFAULT NULL,
  `pmtoolsAgileMethodology` varchar(255) DEFAULT NULL,
  `workEtiquetteProfessionalCommunication` varchar(255) DEFAULT NULL,
  `presentationSkills` varchar(255) DEFAULT NULL,
  `trainingAttendance` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `pcType` varchar(255) DEFAULT NULL,
  `internshipSchedule` varchar(255) DEFAULT NULL,
  `covidVaccinationiInformation` varchar(255) DEFAULT NULL,
  `certificationDate` date DEFAULT NULL,
  `internshipDomain` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `internshipcourse`
--

CREATE TABLE `internshipcourse` (
  `idInternshipCourse` int(15) NOT NULL,
  `nameCoure` varchar(255) DEFAULT NULL,
  `dateStart` date DEFAULT NULL,
  `dateEnd` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `kindOfInternship` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mentor`
--

CREATE TABLE `mentor` (
  `idMentor` int(15) NOT NULL,
  `fullNameMentor` varchar(255) DEFAULT NULL,
  `dayOfBirth` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `workplace` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `idDG` int(15) DEFAULT NULL,
  `idInternshipCourse` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `name`, `run_on`) VALUES
(56, '/20220324063746-internshipcourse', '2022-04-28 22:11:10'),
(57, '/20220324071915-dg', '2022-04-28 22:11:10'),
(58, '/20220324072145-mentor', '2022-04-28 22:11:11'),
(59, '/20220324073202-candidate', '2022-04-28 22:11:11'),
(60, '/20220324074539-internship', '2022-04-28 22:11:11'),
(61, '/20220324075734-email', '2022-04-28 22:11:11'),
(62, '/20220324080506-assessment', '2022-04-28 22:11:11');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `assessment`
--
ALTER TABLE `assessment`
  ADD PRIMARY KEY (`idAssessment`),
  ADD KEY `pk_assesssment_candidate` (`idCandidate`),
  ADD KEY `pk_assesssment_dg` (`idDG`),
  ADD KEY `pk_assessment_mentor` (`idMentor`),
  ADD KEY `pk_assessment_internship` (`idInternship`),
  ADD KEY `pk_assessment_internshipcourse` (`idInternshipCourse`);

--
-- Chỉ mục cho bảng `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`idCandidate`),
  ADD KEY `pk_candidate_internshipcouse` (`idInternshipCourse`),
  ADD KEY `pk_candidate_mentor` (`idMentor`),
  ADD KEY `pk_candidate_dg` (`idDG`);

--
-- Chỉ mục cho bảng `dg`
--
ALTER TABLE `dg`
  ADD PRIMARY KEY (`idDG`);

--
-- Chỉ mục cho bảng `email`
--
ALTER TABLE `email`
  ADD PRIMARY KEY (`idEmail`),
  ADD KEY `pk_eamil_internship` (`idInternship`);

--
-- Chỉ mục cho bảng `internship`
--
ALTER TABLE `internship`
  ADD PRIMARY KEY (`idInternship`),
  ADD KEY `pk_internship_candidate` (`idCandidate`),
  ADD KEY `pk_internship_dg` (`idDG`),
  ADD KEY `pk_internship_internshipcourse` (`idInternshipCourse`),
  ADD KEY `pk_internship_mentor` (`idMentor`);

--
-- Chỉ mục cho bảng `internshipcourse`
--
ALTER TABLE `internshipcourse`
  ADD PRIMARY KEY (`idInternshipCourse`);

--
-- Chỉ mục cho bảng `mentor`
--
ALTER TABLE `mentor`
  ADD PRIMARY KEY (`idMentor`),
  ADD KEY `pk_mentor_internshipcourse` (`idInternshipCourse`),
  ADD KEY `pk_mentor_dg` (`idDG`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `assessment`
--
ALTER TABLE `assessment`
  MODIFY `idAssessment` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `candidates`
--
ALTER TABLE `candidates`
  MODIFY `idCandidate` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `dg`
--
ALTER TABLE `dg`
  MODIFY `idDG` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `email`
--
ALTER TABLE `email`
  MODIFY `idEmail` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `internship`
--
ALTER TABLE `internship`
  MODIFY `idInternship` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `internshipcourse`
--
ALTER TABLE `internshipcourse`
  MODIFY `idInternshipCourse` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `mentor`
--
ALTER TABLE `mentor`
  MODIFY `idMentor` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `assessment`
--
ALTER TABLE `assessment`
  ADD CONSTRAINT `pk_assessment_internship` FOREIGN KEY (`idInternship`) REFERENCES `internship` (`idInternship`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_assessment_internshipcourse` FOREIGN KEY (`idInternshipCourse`) REFERENCES `internshipcourse` (`idInternshipCourse`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_assessment_mentor` FOREIGN KEY (`idMentor`) REFERENCES `mentor` (`idMentor`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_assesssment_candidate` FOREIGN KEY (`idCandidate`) REFERENCES `candidates` (`idCandidate`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_assesssment_dg` FOREIGN KEY (`idDG`) REFERENCES `dg` (`idDG`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `candidates`
--
ALTER TABLE `candidates`
  ADD CONSTRAINT `pk_candidate_dg` FOREIGN KEY (`idDG`) REFERENCES `dg` (`idDG`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_candidate_internshipcouse` FOREIGN KEY (`idInternshipCourse`) REFERENCES `internshipcourse` (`idInternshipCourse`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_candidate_mentor` FOREIGN KEY (`idMentor`) REFERENCES `mentor` (`idMentor`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `email`
--
ALTER TABLE `email`
  ADD CONSTRAINT `pk_eamil_internship` FOREIGN KEY (`idInternship`) REFERENCES `internship` (`idInternship`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `internship`
--
ALTER TABLE `internship`
  ADD CONSTRAINT `pk_internship_candidate` FOREIGN KEY (`idCandidate`) REFERENCES `candidates` (`idCandidate`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_internship_dg` FOREIGN KEY (`idDG`) REFERENCES `dg` (`idDG`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_internship_internshipcourse` FOREIGN KEY (`idInternshipCourse`) REFERENCES `internshipcourse` (`idInternshipCourse`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_internship_mentor` FOREIGN KEY (`idMentor`) REFERENCES `mentor` (`idMentor`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `mentor`
--
ALTER TABLE `mentor`
  ADD CONSTRAINT `pk_mentor_dg` FOREIGN KEY (`idDG`) REFERENCES `dg` (`idDG`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_mentor_internshipcourse` FOREIGN KEY (`idInternshipCourse`) REFERENCES `internshipcourse` (`idInternshipCourse`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
