export const getNumberGender = (gen: string) => {
  const formatGen = gen.toLowerCase().trim()
  switch (formatGen) {
    case 'masculino':
      return 1
    case 'femenino':
      return 2
    default:
      return 0
  }
}