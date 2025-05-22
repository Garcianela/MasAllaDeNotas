export const getNumberCourses = (course: string) => {
  const formatCourse = course.toLowerCase().trim()
  switch (formatCourse) {
    case 'matematicas':
      return 1
    case 'historia':
      return 2
    case 'ciencias':
      return 3
    case 'lengua':
      return 4
    case 'arte':
      return 5
    case 'musica':
      return 6
    case 'geografia':
      return 7
    case 'tecnologia':
      return 8
    case 'filosofia':
      return 9
    case 'fisica':
      return 10
    default:
      return 0
  }
}