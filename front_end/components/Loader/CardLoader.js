import ContentLoader from 'react-content-loader';

const CardSkeleton = () => (
	<ContentLoader
		speed={3}
		width={357}
		height={410}
		viewBox='0 0 357 410'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'>
		<rect width='356' height='233' rx='8' ry='2' />
		<rect x='25' y='269' width='306' height='12' rx='2' ry='2' />
		<rect x='25' y='296' width='210' height='12' rx='2' ry='2' />
		<rect x='25' y='337' width='306' height='8' rx='2' ry='2' />
		<rect x='25' y='356' width='306' height='8' rx='2' ry='2' />
		<rect x='25' y='373' width='210' height='8' rx='2' ry='2' />
	</ContentLoader>
);

const CardLoader = ({ n = 3 }) => {
	return (
		<div>
			<div className='cards'>
				{Array(n)
					.fill()
					.map((item, i) => (
						<CardSkeleton key={i} />
					))}
			</div>
			<style jsx>{`
				.cards {
					display: grid;
					height: auto;
					grid-auto-flow: row;
					grid-auto-rows: minmax(20px, auto);
					grid-template-columns: 1fr 1fr 1fr;
					grid-gap: 64px;
				}
			`}</style>
		</div>
	);
};

export default CardLoader;
