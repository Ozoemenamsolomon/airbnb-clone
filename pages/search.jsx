import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';

const Search = ({ searchResults }) => {
	const router = useRouter();
	const { location, startDate, endDate, noOfGuest } = router.query;
	const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
	const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
	const range = `${formattedStartDate} - ${formattedEndDate}`;

	return (
		<div>
			<Header placeholder={`${location} | ${range} | ${noOfGuest} Guest`} />
			<h1>I am the search page</h1>
			<main className="flex">
				<section className="flex-grow pt-14 px-6">
					<p className="text-xs">
						300+ Stays - {range} - for {noOfGuest} guests
					</p>
					<h1 className="text-3xl font-semibold mt-2 mb-6">
						Stay in {location}
					</h1>
					<div className="hidden lg:inline-flex text-gray-800 whitespace-nowrap mb-5 space-x-3">
						<p className="button">Cancellation Flexibility</p>
						<p className="button">Type of Place</p>
						<p className="button">Price</p>
						<p className="button">Rooms and Beds</p>
						<p className="button">More Filter</p>
					</div>

					{searchResults.map(
						({ img, location, title, description, star, price, total }) => (
							<InfoCard
								key={img}
								img={img}
								location={location}
								title={title}
								description={description}
								star={star}
								price={price}
								total={total}
							/>
						)
					)}
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Search;

export async function getServerSideProps() {
	const searchResults = await fetch('https://links.papareact.com/isz').then(
		(res) => res.json()
	);
	return {
		props: {
			searchResults,
		},
	};
}
