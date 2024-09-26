import Title from '../Layout/Title'
import {SalesChart} from './chart/SalesChart'
export default function Dashboard() {
    return (
        <>
        <Title title={"Dashboard Pages"}/>
            <div className="mt-24 flex  justify-center items-center  bg-gray-300">Hello this is allowed only for ADMINS</div>
          <SalesChart/>
        </>
    )
}