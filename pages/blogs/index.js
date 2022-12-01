import Link from "next/link";
import { withRouter } from "next/router";
// ACTIONS
import { getWordPressPosts } from "@/actions/wordpress";
// HELPERS
import Layout from "@/layout/Layout";
import NothingFoundAlert from "@/layout/NothingFoundAlert";
import UseImage from "@/layout/UseImage";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import BreadCrumbs from "@/layout/BreadCrumbs";
import axios from "axios";
import { toast } from "react-toastify";

export const getServerSideProps = async (context) => {
	const params = `?categories=723328056&page=1&per_page=10`;
	const wordPressPostListing = (await getWordPressPosts(params)()) || [];

	// const wordPressPostListing = async () => {
	// 	try {
	// 		const res = await axios.get(
	// 			`${process.env.NEXT_PUBLIC_KEVINFONSECA_API_URL}/posts${params}`,
	// 			{
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 			}
	// 		);

	// 		return res.data;
	// 	} catch (err) {
	// 		// const error = err.response.data.message;
	// 		const error = err?.response?.data?.error?.errors;
	// 		const errors = err?.response?.data?.errors;

	// 		if (error) {
	// 			// dispatch(setAlert(error, 'danger'));
	// 			error &&
	// 				Object.entries(error).map(([, value]) => toast.error(value.message));
	// 		}

	// 		if (errors) {
	// 			errors.forEach((error) => toast.error(error.msg));
	// 		}

	// 		toast.error(err?.response?.statusText);
	// 		return { msg: err?.response?.statusText, status: err?.response?.status };
	// 	}
	// };

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
				<BreadCrumbs router={router} />
				<Row>
					<div className="container">
						{serverWordPressListingPosts?.length > 0 ? (
							serverWordPressListingPosts?.map((wp, index) => (
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
