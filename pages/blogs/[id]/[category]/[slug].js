import { withRouter } from "next/router";
// HELPERS
import Layout from "@/layout/Layout";
import Row from "react-bootstrap/Row";
import UseImage from "@/layout/UseImage";
import Sidebar from "@/layout/Sidebar";
import BreadCrumbs from "@/layout/BreadCrumbs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const SingleBlog = ({ router }) => {
	const [serverWordPressPost, setServerWordPressPost] = useState(null);
	const [serverWordPressComments, setServerWordPressComments] = useState([]);

	const getWordPressPost = async (id) => {
		try {
			const res = await axios.get(
				`https://kevinurielfonseca.me/wp-json/wp/v2/posts/${id}`,
				{
					headers: {
						"Content-Type": `application/json`,
					},
				}
			);

			return res.data;
		} catch (err) {
			// const error = err.response.data.message;
			const error = err?.response?.data?.error?.errors;
			const errors = err?.response?.data?.errors;

			if (error) {
				// dispatch(setAlert(error, 'danger'));
				error &&
					Object.entries(error).map(([, value]) => toast.error(value.message));
			}

			if (errors) {
				errors.forEach((error) => toast.error(error.msg));
			}

			toast.error(err?.response?.statusText);
			return { msg: err?.response?.statusText, status: err?.response?.status };
		}
	};

	useEffect(() => {
		const id = window?.location.pathname.split("/");

		getWordPressPost(id[2])
			.then((res) => {
				setServerWordPressPost(res);
			})
			.catch((err) => console.log(err));
	}, []);

	/*
	 *
	 * COMMENTS
	 *
	 */
	const getWordPressComments = async (id) => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_KEVINFONSECA_API_URL}/comments?post=${id}`,
				{
					headers: {
						"Content-Type": `application/json`,
					},
				}
			);

			return res.data;
		} catch (err) {
			// const error = err.response.data.message;
			const error = err?.response?.data?.error?.errors;
			const errors = err?.response?.data?.errors;

			if (error) {
				// dispatch(setAlert(error, 'danger'));
				error &&
					Object.entries(error).map(([, value]) => toast.error(value.message));
			}

			if (errors) {
				errors.forEach((error) => toast.error(error.msg));
			}

			toast.error(err?.response?.statusText);
			return { msg: err?.response?.statusText, status: err?.response?.status };
		}
	};

	useEffect(() => {
		const id = window?.location.pathname.split("/");

		getWordPressComments(id[2])
			.then((res) => {
				setServerWordPressComments(res);
			})
			.catch((err) => console.log(err));
	}, []);

	const fetchComments = () => {
		return (
			serverWordPressComments?.length > 0 && (
				<>
					<h1>COMMENTS</h1>
					{serverWordPressComments?.map((comment, index) => (
						<div className="d-flex mb-3" key={comment?.id}>
							<div className="flex-shrink-0">
								<a
									href={`${comment?.author_url}`}
									target="_blank"
									rel="noreferrer noopener nofollow"
								>
									<UseImage src={`${comment?.author_avatar_urls["48"]}`} />
								</a>
							</div>
							<div className="flex-grow-1 ml-3">
								<a
									href={`${comment?.author_url}`}
									target="_blank"
									rel="noreferrer noopener nofollow"
								>
									{comment?.author_name}
								</a>
								<div
									dangerouslySetInnerHTML={{
										__html: comment?.content.rendered,
									}}
								/>
							</div>
						</div>
					))}
				</>
			)
		);
	};
	return (
		<Layout
			title={`${serverWordPressPost?.title.rendered}`}
			description={`${serverWordPressPost?.excerpt.rendered}`}
			author={`Kevin Fonseca`}
			sectionClass={`mb-3`}
			containerClass={`container`}
			canonical={process.env.NEXT_PUBLIC_FRONTEND_URL}
			url={`blogs/${
				serverWordPressPost?.id
			}/${serverWordPressPost?.category_name.toLowerCase()}/${
				serverWordPressPost?.slug
			}`}
			posType={`page`}
			cssInline={`
		    img {
		        width: 100%;
		        height: auto;
		    }
		    iframe.youtube-player {
		        width: 100%;
		        height: 480px;
		    }
		  `}
			postImage={serverWordPressPost?.fimg_url}
			jumbotronHeading={false}
		>
			<div className={`container mt-3`}>
				<Row>
					{serverWordPressPost?.template === `template-full-width.php` ? (
						<div className="container-fluid">
							<BreadCrumbs router={router} />
							<a
								href={`${serverWordPressPost?.link}`}
								target="_blank"
								rel="noreferrer noopener"
								className="btn btn-sm btn-danger btn-block"
							>
								Read original post
							</a>
							<hr />
							<div
								dangerouslySetInnerHTML={{
									__html: serverWordPressPost?.content.rendered,
								}}
							/>
							{fetchComments()}
						</div>
					) : (
						<>
							<div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
								<BreadCrumbs router={router} />
								<a
									href={`${serverWordPressPost?.link}`}
									target="_blank"
									rel="noreferrer noopener"
									className="btn btn-sm btn-danger btn-block"
								>
									Read original post
								</a>
								<hr />
								<div
									dangerouslySetInnerHTML={{
										__html: serverWordPressPost?.content.rendered,
									}}
								/>
								{fetchComments()}
							</div>
							<Sidebar>SIDEBAR</Sidebar>
						</>
					)}
				</Row>
			</div>
		</Layout>
	);
};

export default withRouter(SingleBlog);
