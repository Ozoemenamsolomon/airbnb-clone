import Image from 'next/image';
import { useState } from 'react';
import {
	SearchIcon,
	GlobeAltIcon,
	MenuIcon,
	UserCircleIcon,
	UsersIcon,
} from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';
import Search from '../pages/search';

const Header = ({ placeholder }) => {
	const [searchInput, setSearchInput] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [noOfGuest, setNoOfGuest] = useState(1);
	const router = useRouter();
	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: 'selection',
	};
	const handleSelect = (ranges) => {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};

	const resetInput = () => {
		setSearchInput('');
	};

	const search = () => {
		router.push({
			pathname: '/search',
			query: {
				location: searchInput,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				noOfGuest: noOfGuest,
			},
		});
	};

	return (
		<header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md md:px-10 p-5">
			{/* left */}
			<div
				onClick={() => {
					router.push('/');
				}}
				className="relative flex items-center h-10 cursor-pointer my-auto"
			>
				<Image
					src="https://links.papareact.com/qd3"
					objectFit="contain"
					objectPosition="left"
					layout="fill"
				/>
			</div>
			{/* middle */}
			<div className="flex items-center md:border-2 rounded-full md:shadow-sm py-2">
				<input
					value={searchInput}
					onChange={(e) => {
						setSearchInput(e.target.value);
					}}
					type="text"
					className="pl-5 text-sm text-gray-600 bg-transparent outline-none placeholder-gray-600 flex-grow"
					placeholder={placeholder || 'Start your search'}
				/>
				<SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer mx-auto md:mx-2" />
			</div>
			{/* right */}
			<div className="flex items-center space-x-4 justify-end text-gray-500">
				<p className="hidden md:inline cursor-pointer">Become a host</p>
				<GlobeAltIcon className="h-6 cursor-pointer" />
				<div className="flex items-center space-x-2 border-2 p-2 rounded-full">
					<MenuIcon className="h-6" />
					<UserCircleIcon className="h-6" />
				</div>
			</div>
			{searchInput && (
				<div className="flex flex-col col-span-3 mx-auto">
					<DateRangePicker
						ranges={[selectionRange]}
						minDate={new Date()}
						rangeColors={['#FD5B61']}
						onChange={handleSelect}
					/>
					<div className="flex items-center border-b mb-4">
						<h2 className=" text-2xl flex-grow font-semibold">
							Number of Guests
						</h2>
						<UsersIcon className="h-5" />
						<input
							value={noOfGuest}
							onChange={(e) => {
								setNoOfGuest(e.target.value);
							}}
							min={1}
							type="number"
							className="w-12 pl-2 text-lg outline-none text-red-400"
						/>
					</div>
					<div className="flex">
						<button onClick={resetInput} className="flex-grow text-gray-500">
							Cancel
						</button>
						<button onClick={search} className="flex-grow text-gray-400">
							Search
						</button>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
