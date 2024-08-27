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
  color: string
}

const BarChatComponent = ({
  data,
  dataKeyX,
  dataKeyY,
  color,
}: BarChatComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyX} />
        <YAxis minTickGap={1000} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={dataKeyY}
          label="pontos"
          fill={color}
          legendType="circle"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChatComponent
