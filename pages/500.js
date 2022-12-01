import { withRouter } from "next/router";
import Link from "next/link";

const my500 = ({ statusCode, router }) => {
	const handlePrev = async (e) => {
		e.preventDefault();
		router.back();
	};
	return (
		<section className={`mb-3`}>
			<div className={`container-fluid m-0 text-center error404`}>
				<h1 className={`display-3`}>404</h1>
				<p className={`lead`}>Page Not Found</p>
				<p className={`lead`}>
					{statusCode
						? `An error ${statusCode} occurred on server`
						: "An error occurred on client"}
				</p>
				<Link href={`/`} className={`btn btn-sm btn-dark mr-1`}>
					Go Home!
				</Link>
				<Link
					href={`#!`}
					onClick={handlePrev}
					className={`btn btn-sm btn-dark`}
				>
					Go Back!
				</Link>
			</div>
		</section>
	);
};
my500.getStaticProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default withRouter(my500);
