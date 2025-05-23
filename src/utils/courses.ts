export const transformCourses = (course: string) => {
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
    case 'ingles':
      return 11
    default:
      return 0
  }
}

export const getCourseName = (course: number) => {
  switch (course) {
    case 1:
      return 'Matemáticas'
    case 2:
      return 'Historia'
    case 3:
      return 'Ciencias'
    case 4:
      return 'Lengua'
    case 5:
      return 'Arte'
    case 6:
      return 'Música'
    case 7:
      return 'Geografía'
    case 8:
      return 'Tecnología'
    case 9:
      return 'Filosofía'
    case 10:
      return 'Física'
    case 11:
      return 'Inglés'
    default:
      return ''
  }
}