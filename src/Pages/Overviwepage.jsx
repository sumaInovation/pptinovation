import React, { useEffect, useState } from 'react'
import { BarChart2, ShoppingBag, Fuel, Target } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from '../Components/Common/StatCard'
import RealTimeLineChart from '../Components/Overviwe/RealTimeLineChart'
import Disributepiechar from '../Components/Overviwe/Disributepiechar'
import { useWebSocket } from '../Components/Common/WebSocketContext';
import { useGoogleContext } from '../Components/Common/GoogleAuthContext';

const Overviwepage = () => {
const{userData}=useGoogleContext();

	
	const [IsMachineRun, setIsMachineRun] = useState(false);
	const [todatproduction, setTodayproduction] = useState(0);
	const { messages } = useWebSocket();
	const [length, setLength] = useState(0);
	const [LastRecordedLenght, setLastRecordedLenght] = useState(0);
	const [ThisMonthLenght, setThisMonthLenght] = useState(0);






	const HTTPReq = () => {
		fetch("https://googlesheet-yuetcisb.b4a.run/userdata")
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();  // Read the response body as JSON
			})
			.then(data => {

				const TodatToTRunTime = data.reduce((acc, item) => {

					if (new Date(item[0]).getMonth() == new Date().getMonth() && item[4] == "RUNNING") acc[1] += parseInt(item[3], 10);
					if (item[4] == "RUNNING" && new Date(item[0]).toLocaleDateString() == new Date().toLocaleDateString()) acc[0] += parseInt(item[3], 10);



					return acc;

				}, [0, 0]);
				setLastRecordedLenght(TodatToTRunTime[0]);
				setThisMonthLenght(TodatToTRunTime[1]);
				


			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});




	}
	useEffect(() => {
		HTTPReq();


	}, [])

	useEffect(() => {
		try {
			const { state, Length } = JSON.parse(messages);
			if (state == 1 && IsMachineRun == 0) HTTPReq();

			setIsMachineRun(state);
			setLength(Length)

		} catch (error) {
			console.error(error);
		}


	}, [messages])

	if (!userData) {
		return <div className="mt-[100px] text-8xl">Please log in to see  Report.</div>;
	  }

	return (

		<div className='flex-1 overflow-y-auto  p-4 z-0 mt-[50px] '>

			<main className=' mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Machine State' icon={Fuel} value={IsMachineRun == true ? "Running" : "Stop"} color={IsMachineRun == true ? "#3f8f29" : "#de1a24"} />
					<StatCard name='Today Production' icon={Target} value={
						((parseInt(length, 10) + parseInt(LastRecordedLenght, 10) / 1000) * 0.5) + "M"

					} color='#8B5CF6' />
					<StatCard name='This Month Production' icon={Target} value={
						((parseInt(length, 10) + parseInt(ThisMonthLenght, 10) / 1000) * 0.5) + "M"

					} color='#8B5CF6' />
					<StatCard name='Efficency of Machine' icon={BarChart2} value='62.2%' color='#10B981' />
				</motion.div>

				{/* CHARTS */}


				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<RealTimeLineChart />
					<Disributepiechar />




				</div>

			</main>
		</div>
	)
}

export default Overviwepage
