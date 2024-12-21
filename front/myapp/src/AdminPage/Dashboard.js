import Title from '../Layout/Title'
import {SalesChart} from './chart/SalesChart'
export default function Dashboard() {
    return (
        <>
        <Title title={"Dashboard Pages"}/>
            <h1 className="text-3xl font-bold  mt-7 text-green-500 text-center">Admin Summary</h1>
          <SalesChart/>
        </>
    )
}