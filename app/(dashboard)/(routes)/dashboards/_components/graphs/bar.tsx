/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts'

interface BarChatComponentProps {
  data: any
  dataKeyX: string
  dataKeyY: string
}

const BarChatComponent = ({
  data,
  dataKeyX,
  dataKeyY,
}: BarChatComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={dataKeyY}
          label="pontos"
          fill="rgb(14 116 144 / 0.8)"
          legendType="circle"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChatComponent
