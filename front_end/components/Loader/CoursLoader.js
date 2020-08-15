import ContentLoader from 'react-content-loader';
import Container from '../Container';

const CoursSkeleton = () => (
	<ContentLoader
		speed={3}
		width={784}
		height={769}
		viewBox='0 0 784 769'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'>
		<rect width='540' height='24' />
		<rect y='62' width='338' height='24' />
		<rect x='48' y='140' width='737' height='12' rx='2' ry='2' />
		<rect x='48' y='708' width='737' height='12' rx='2' ry='2' />
		<rect x='48' y='733' width='737' height='12' rx='2' ry='2' />
		<rect x='48' y='757' width='497' height='12' rx='2' ry='2' />
		<rect x='48' y='171' width='737' height='490' rx='2' ry='2' />
	</ContentLoader>
);

const CoursLoader = () => {
	return (
		<Container size='small'>
			<div className='cours'>
				<div className='svg'>
					<CoursSkeleton />
				</div>
			</div>
			<style jsx>{`
				.cours {
					display: block;
					background: #fff;
					border-radius: 8px;
					padding: 48px 0;
				}
				.svg {
					margin-left: -16px;
				}
			`}</style>
		</Container>
	);
};
export default CoursLoader;
