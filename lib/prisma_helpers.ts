import { db } from './db'

export async function updateStudents() {
  try {
    await db.student.updateMany({
      data: {
        individualMonitoring: false,
      },
    })
    console.log(
      'Todos os registros de estudantes foram atualizados com sucesso.',
    )
  } catch (error) {
    console.error('Erro ao atualizar os registros de estudantes:', error)
  } finally {
    await db.$disconnect()
  }
}
