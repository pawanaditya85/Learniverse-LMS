const SEMESTER_FORMAT_PATTERN = /^(spring|summer|fall|winter)\d{4}$/i; // e.g., 'spring2024', 'fall2024'
const COURSE_CODE_PATTERN = /^[A-Z]{2,4}\d{3}$/; // Subject code followed by a 3-digit number

export { SEMESTER_FORMAT_PATTERN, COURSE_CODE_PATTERN };
