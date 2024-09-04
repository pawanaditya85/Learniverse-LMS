### **Student APIs**

- **GET /students/:studentId/courses**
    - Get a list of courses enrolled by a student.
- **GET /students/:studentId/courses/:courseId**
    - Get details of a specific course enrolled by a student.
- **GET /students/:studentId/courses/:courseId/assignments**
    - Get a list of assignments for a specific course enrolled by a student.
- **GET /students/:studentId/courses/:courseId/quizzes**
    - Get a list of quizzes for a specific course enrolled by a student.
- **GET /students/:studentId/courses/:courseId/grades**
    - Get the grade for a specific course enrolled by a student.
- **GET /students/:studentId/profile**
    - Get the profile details of a student.
- **PUT /students/:studentId/profile**
    - Update the profile details of a student.
        
        ```json
        {
          "bio": "Computer Science student at XYZ University.",
          "major": "Computer Science",
          "minor": "Mathematics",
          "interests": ["Machine Learning", "Web Development"],
          "skills": ["Python", "JavaScript"],
          "projects": ["Project 1", "Project 2", "Project 3"]
        }
        ```
        
- **GET /students/:studentId/courses/:courseId/grades**
    - Get the grade for a specific course enrolled by a student.

### **Admin APIs**

- **POST /admin/student**
    - Create a new student.
        
        ```json
        {
            "name": "Firstname Lastname",
            "email": "firstname.lastname@email.com",
            "notifications": true
        }
        ```
        
- **GET /admin/students**
    - Get a list of all students.
- **POST /admin/faculty**
    - Create a new faculty member.
        
        ```json
        {
          "name": "Professor A",
          "email": "professora@example.com",
          "department": "Computer Science"
        }
        ```
        
- **GET /admin/faculties**
    - Get a list of all faculty members.
- **POST /admin/course**
    - Create a new course.
    
    ```json
    {
        "code": "CS101",
        "name": "Introduction to Computer Science",
        "description": "Introduction to Computer Science and Basic Programming",
        "semester": "fall2024",
        "isPublished": false,
        "syllabus": "Course Syllabus (downloadable PDF link)"
    }
    ```
    
- **GET /admin/courses**
    - Get a list of all courses.
- **POST /admin/course/:courseID/faculty/:facultyID**
    - Assign a faculty member to a course.
        
        ```json
        {
          "name": "Divyam Test",
          "email": "divyam@test.com",
          "notifications": false
        }
        ```
        
- **POST /admin/enroll**
    - Enroll students in courses.
        
        ```json
        {
          "studentIds": ["66330beec6d21c0a90db017d"],
          "courseIds": ["663306e4c6d21c0a90db0168"]
        }
        ```
        

### **Course APIs**

- **GET /course/:courseID**
    - Get details of a specific course.
- **POST /course/:courseID/announcement**
    - Post an announcement for a specific course.
        
        ```json
        {
            "title": "Welcome to CS101",
            "description": "Welcome to Inroductory class of CS101..."
        }
        ```
        
- **GET /course/:courseID/announcements**
    - Get a list of announcements for a specific course.
- **GET /course/:courseID/students**
    - Get a list of students enrolled in a specific course.
- **PUT /course/:courseID/isPublished**
    - Update the published status of a course.
        
        ```json
        {
            "isPublished":"false"
        }
        ```
        
- **POST /course/:courseID/assignment**
    - Create an assignment for a specific course.
        
        ```json
        {
          "title": "Assignment 1",
          "description": "This is the first assignment.",
          "dueDate": "2022-12-31T00:00:00.000Z",
          "totalGrade": 100
        }
        ```
        
- **POST /course/:courseID/quiz**
    - Create or update a quiz for a specific course.
        
        ```json
        {
          "title": "Quiz 1",
          "description": "This is the first quiz.",
          "dueDate": "2022-12-31T00:00:00.000Z",
          "totalGrade": 100
        }
        ```
        
- **GET /course/:courseID/assignments**
    - Get a list of assignments for a specific course.
- **GET /course/:courseID/quizzes**
    - Get a list of quizzes for a specific course.
- **PUT /course/grades/:studentID/assignment/:assignmentID**
    - Update the grade for a specific assignment of a student.
        
        ```json
        {
            "grade":80
        }
        ```
        
- **PUT /course/grades/:studentID/quiz/:quizID**
    - Update the grade for a specific quiz of a student.
        
        ```json
        {
            "grade":80
        }
        ```
        
- **PUT /course/:courseID/syllabus**
    - Update the syllabus for a specific course.
        
        ```json
        {
            "syllabus":"Course Syllabus updated (downloadable PDF link)"
        }
        ```
        

### **Faculty APIs**

- **GET /faculty/:facultyID/courses**
    - Get a list of courses taught by a specific faculty member.
- **GET /faculty/:facultyID**
    - Get details of a specific faculty member.
- **PUT /faculty/:facultyID/department**
    - Update the department of a specific faculty member
        
        ```json
        {
            "department": "Computer Engineering Deapartment"
        }
        ```