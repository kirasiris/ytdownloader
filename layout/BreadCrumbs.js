import { useEffect, useState } from "react";
import Link from "next/link";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const BreadCrumbs = ({ router }) => {
	const convertBreadcrumb = (string) => {
		return string
			.replace(/-/g, " ")
			.replace(/oe/g, "ö")
			.replace(/ae/g, "ä")
			.replace(/ue/g, "ü")
			.toUpperCase();
	};

	const [breadcrumbs, setBreadcrumbs] = useState(null);
	useEffect(() => {
		const routePath = router.asPath.split("/");
		routePath.shift();

		const pathArray = routePath.map((path, i) => {
			return {
				breadcrumb: path,
				href: "/" + routePath.slice(0, i + 1).join("/"),
			};
		});
		setBreadcrumbs(pathArray);
	}, [router]);

	if (!breadcrumbs) {
		return null;
	}
	return (
		<Breadcrumb>
			{breadcrumbs.map((breadcrumb, index) => {
				return (
					<Link key={index} href={breadcrumb.href} passHref>
						<Breadcrumb.Item>
							{convertBreadcrumb(breadcrumb.breadcrumb)}
						</Breadcrumb.Item>
					</Link>
				);
			})}
		</Breadcrumb>
	);
};

export default BreadCrumbs;
