import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { AssessmentWithDetails } from './student-dashboard'

interface ELEDashboard {
  assessment: AssessmentWithDetails
}

const ELEDashboard = ({ assessment }: ELEDashboard) => {
  return (
    <Card className="border border-slate-300 rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-center">
          Escala de Avaliação ELE (Leitura e Escrita)
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default ELEDashboard
