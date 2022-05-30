import Link from "next/link";
import { withRouter } from "next/router";
// ACTIONS
import { getWordPressPosts } from "@/actions/wordpress";
// HELPERS
import Layout from "@/layout/Layout";
import NothingFoundAlert from "@/layout/NothingFoundAlert";
import UseImage from "@/layout/UseImage";
// REACTBOOTSTRAP
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
// NESTED COMPONENTS

export const getServerSideProps = async (context) => {
	const params = `?categories=723328056&page=1&per_page=10`;
	const wordPressPostListing = (await getWordPressPosts(params)()) || [];

	return {
		props: {
			params: params,
			serverWordPressListingPosts: wordPressPostListing,
		},
	};
};

const Blogs = ({ params, serverWordPressListingPosts, router }) => {
	return (
		<Layout
			title={`Blog`}
			description={`The latest blogs`}
			author={`Kevin Fonseca`}
			sectionClass={`mb-3`}
			containerClass={`container`}
			url={`blog${params}`}
			posType={`page`}
			jumbotronHeading={false}
		>
			<div className={`container mt-3`}>
				<Row>
					<div className="container">
						{serverWordPressListingPosts?.length > 0 ? (
							serverWordPressListingPosts.map((wp, index) => (
								<article key={wp.id} className={`${wp.id} mb-3`}>
									<Card>
										<UseImage
											src={`${wp.fimg_url}`}
											alt={`post-${wp.id}-image`}
											idGiven={`${wp.id}`}
											classGiven="card-img"
										/>
										<Card.Header>
											<Link
												href={`/blogs/${
													wp.id
												}/${wp.category_name.toLowerCase()}/${wp.slug}`}
												passHref
											>
												{wp.title.rendered}
											</Link>
										</Card.Header>
										<Card.Body>
											<div
												dangerouslySetInnerHTML={{
													__html: wp.excerpt.rendered,
												}}
											/>
										</Card.Body>
										<Card.Footer>
											<Link
												href={`/blogs/${
													wp.id
												}/${wp.category_name.toLowerCase()}/${wp.slug}`}
												passHref
											>
												Read more
											</Link>
										</Card.Footer>
									</Card>
								</article>
							))
						) : (
							<NothingFoundAlert />
						)}
					</div>
				</Row>
			</div>
		</Layout>
	);
};

export default withRouter(Blogs);
