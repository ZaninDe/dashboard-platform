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
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={dataKeyX} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKeyY} fill="rgb(14 116 144 / 0.8)" />
    </BarChart>
  )
}

export default BarChatComponent
