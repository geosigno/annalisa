import ContentLoader from 'react-content-loader';

const CommentSkeleton = () => (
	<ContentLoader
		speed={3}
		width={674}
		height={201}
		viewBox='0 0 674 201'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'>
		<circle cx='32' cy='32' r='32' />
		<rect x='81' y='17' width='115' height='14' rx='2' ry='2' />
		<rect x='81' y='39' width='180' height='14' rx='2' ry='2' />
		<rect y='94' width='677' height='12' rx='2' ry='2' />
		<rect y='119' width='677' height='12' rx='2' ry='2' />
		<rect y='143' width='494' height='12' rx='2' ry='2' />
		<rect y='189' width='72' height='12' rx='2' ry='2' />
	</ContentLoader>
);

const CommentLoader = ({ n = 3 }) => {
	return (
		<section className='commentaires'>
			<div className='commentaires__title'>
				<h2>Commentaires</h2>
			</div>
			<ul className='comments'>
				{Array(n)
					.fill()
					.map((item, i) => (
						<li key={'CommentLoader'+i} className='comment'>
							<CommentSkeleton key={i} />
						</li>
					))}
			</ul>
			<style jsx>{`
				ul,
				li {
					list-style-type: none;
					margin: 0;
					padding: 0;
				}
				li ul {
					padding-left: 64px;
				}
				.commentaires {
					display: block;
					max-width: 800px;
					background: #fff;
					border-radius: 8px;
					margin: 64px auto;
				}
				.commentaires__title {
					display: flex;
					justify-content: flex-end;
				}
				.commentaires__title h2 {
					font-size: 32px;
					background: #9cc5e1;
					padding: 8px;
					margin: -32px -64px 32px 0;
				}
				.commentaires > ul > li {
					padding: 32px 64px;
				}
				.commentaires ul ul li + li {
					border-top: 1px solid #ddd;
				}
				.commentaires > ul > li:nth-child(even) {
					background: #f7f7f7;
				}
			`}</style>
		</section>
	);
};

export default CommentLoader;
