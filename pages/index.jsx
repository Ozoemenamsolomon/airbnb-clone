import Head from 'next/head';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';

export default function Home({ exploreData, cardsData }) {
	return (
		<div className="">
			<Head>
				<title>Airbnb Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* Header */}
			<Header />

			<Banner />
			<main className="max-w-7xl mx-auto px-8 sm:px-16">
				<section className="pt-6">
					<h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

					{/* pull in some data */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{exploreData?.map(({ img, distance, location }) => (
							<SmallCard
								img={img}
								key={img}
								distance={distance}
								location={location}
							/>
						))}
					</div>
				</section>
				<section>
					<h2 className="text-4xl font-semibold pb-8">Live Anywhere</h2>
					<div className="flex space-x-3 overflow-y-auto overflow-x-scroll hide-scroll p-3 -ml-3">
						{cardsData?.map(({ img, title }) => (
							<MediumCard key={img} img={img} title={title} />
						))}
					</div>
				</section>
				<LargeCard
					img="https://links.papareact.com/4cj"
					title="The Greatest Ouutdoors"
					description="Wishlists curated by Airbnb"
					buttontext="Get Inspired"
				/>
			</main>
			<Footer />
		</div>
	);
}

export async function getStaticProps() {
	const exploreData = await fetch('https://links.papareact.com/pyp').then(
		(res) => res.json()
	);

	const cardsData = await fetch('https://links.papareact.com/zp1').then((res) =>
		res.json()
	);

	return {
		props: {
			exploreData,
			cardsData,
		},
	};
}