# Database Schema (Prisma) — Dania College

## Overview

This is a **school information website** with two parts:

1. **Public informative routes** (home, about, admission, facilities, contact, etc.) — readable by anyone.
2. **Protected dashboards** — `ADMIN`, `TEACHER`, `STUDENT` (auth handled by the existing `User` model).

### Design decision: `User` vs `Student` / `Teacher`

The `User` model is your **auth + identity** table (login, password, role, status).
`Student` and `Teacher` should be **profile/domain tables** linked **one-to-one** to `User`.

Reasons:

- A single `User` powers login for all three roles (admin has no profile table).
- Profile data (DOB, guardian, salary, department…) stays out of the auth table.
- Easy to add fields per role without touching auth logic.

Relationship pattern:

```
User (1) ──< (1) Student
User (1) ──< (1) Teacher
```

`Student.userId` and `Teacher.userId` are unique foreign keys → one profile per account.

---

## Existing `User` model (reference)

```prisma
model User {
  id                 String     @id @default(uuid())
  name               String
  email              String     @unique
  password           String
  emailVerified      Boolean    @default(false)
  role               Role       @default(STUDENT)
  status             UserStatus @default(ACTIVE)
  needPasswordChange Boolean    @default(false)
  isDeleted          Boolean    @default(false)
  deletedAt          DateTime?
  createAt           DateTime   @default(now())
  updatedAt          DateTime   @updatedAt

  @@map("users")
}
```

> Small note: `createAt` is likely a typo of `createdAt`. Optional to rename.

---

## `Student` model (suggested)

Stores everything about a student **except login**. One row per `User` with `role = STUDENT`.

```prisma
model Student {
  id            String   @id @default(uuid())

  // Link to auth account (1-to-1)
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Identity / academic
  studentId     String   @unique          // college roll / registration no. (e.g. "DC-2024-001")
  admissionDate DateTime @default(now())
  academicYear  String                      // "2024-2025"
  class         String                      // grade / year (e.g. "11", "B.Sc 2nd")
  section       String?                     // "A", "B"
  shift         Shift?                      // MORNING / DAY / EVENING

  // Personal
  dateOfBirth   DateTime?
  gender        Gender?
  bloodGroup    String?
  religion      String?
  nationality   String?  @default("Bangladeshi")
  phone         String?
  avatar        String?                     // profile image URL

  // Address (flattened; move to Address model if many locations needed)
  presentAddress  String?
  permanentAddress String?

  // Guardian / parent info
  fatherName      String?
  fatherPhone     String?
  motherName      String?
  motherPhone     String?
  guardianName    String?
  guardianPhone   String?
  guardianRelation String?                  // "Father" / "Uncle" / etc.
  emergencyContact String?

  // Background
  previousSchool  String?

  // Status (soft flags specific to student lifecycle)
  isActive        Boolean  @default(true)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("students")
}
```

### What we store and why

| Group | Fields | Why |
|-------|--------|-----|
| Link | `userId` | Connects to login account |
| Academic | `studentId`, `admissionDate`, `academicYear`, `class`, `section`, `shift` | Core school records, attendance, exam grouping |
| Personal | `dateOfBirth`, `gender`, `bloodGroup`, `religion`, `nationality`, `phone`, `avatar` | Identity & medical/emergency use |
| Address | `presentAddress`, `permanentAddress` | Contact & verification |
| Guardian | `father/mother/guardian` name + phone, `emergencyContact` | Parent communication, safety |
| Background | `previousSchool` | Transfer records |
| Status | `isActive` | Withdrawn vs active without deleting |

---

## `Teacher` model (suggested)

Stores everything about a teacher **except login**. One row per `User` with `role = TEACHER`.

```prisma
model Teacher {
  id          String   @id @default(uuid())

  // Link to auth account (1-to-1)
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Employment
  employeeId  String   @unique             // staff ID (e.g. "T-102")
  designation String                          // "Professor", "Lecturer", "Instructor"
  departmentId String?                        // FK to Department (see below)
  department  Department? @relation(fields: [departmentId], references: [id])
  joiningDate DateTime @default(now())
  employmentType EmploymentType @default(FULL_TIME)  // FULL_TIME / PART_TIME / CONTRACT
  salary      Float?                           // confidential — restrict in API

  // Personal
  dateOfBirth DateTime?
  gender      Gender?
  bloodGroup  String?
  religion    String?
  nationality String?  @default("Bangladeshi")
  phone       String?
  avatar      String?

  // Address
  presentAddress   String?
  permanentAddress String?

  // Qualification
  highestDegree  String?                       // "M.Sc", "Ph.D"
  specialization String?
  experienceYears Int?     @default(0)

  // Bank (optional, confidential)
  bankName       String?
  bankAccount    String?

  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("teachers")
}
```

### What we store and why

| Group | Fields | Why |
|-------|--------|-----|
| Link | `userId` | Connects to login account |
| Employment | `employeeId`, `designation`, `departmentId`, `joiningDate`, `employmentType`, `salary` | HR / payroll / teaching assignment |
| Personal | same block as student | Identity & emergency |
| Address | `presentAddress`, `permanentAddress` | Contact |
| Qualification | `highestDegree`, `specialization`, `experienceYears` | Public "faculty" page + assignment |
| Bank | `bankName`, `bankAccount` | Payroll (keep server-side only, never send to client) |
| Status | `isActive` | Left vs active |

---

## Shared enums

```prisma
enum Role {
  ADMIN
  TEACHER
  STUDENT
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  BANNED
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum Shift {
  MORNING
  DAY
  EVENING
}

enum EmploymentType {
  FULL_TIME
  PART_TIME
  CONTRACT
}
```

---

## Suggested supporting models (to make dashboards useful)

These are **not required** for auth but make the admin/teacher/student areas real:

- `Department` — id, name, code, headTeacherId?
- `Subject` / `Course` — id, name, code, departmentId, teacherId?
- `Class` / `Section` — id, name, class, section, classTeacherId?
- `Enrollment` — studentId, classId, academicYear (many-to-many student↔class)
- `Attendance` — studentId/classId, date, status
- `Notice` — title, body, authorId (admin/teacher), audience (ALL/STUDENT/TEACHER)
- `Result` / `Exam` — exam name, studentId, subjectId, marks, grade

---

## Security notes

1. `salary` and `bankAccount` are **confidential** — never expose them in student/public API responses (use Prisma `select` or DTOs).
2. Use `onDelete: Cascade` on `userId` so deleting a `User` also removes the profile.
3. Always guard dashboard routes by `req.user.role` on the backend, not just the frontend.
4. Use soft-delete (`isDeleted`) on `User` already; mirror with `isActive` on profiles.
