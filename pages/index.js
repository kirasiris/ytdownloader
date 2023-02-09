import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import axios from "axios";
// HELPERS
import Layout from "@/layout/Layout";
import FormJumbotron from "@/layout/FormJumbotron";
import SplitView from "@/layout/SplitView";

export const getServerSideProps = async (context) => {
	const params = ``;

	const videos = await axios?.get(`/extras/youtube${params}`);
	const totalPages = videos?.data.pagination?.totalpages || 0;
	const totalResults = videos?.data.count || 0;
	const page = videos?.data.pagination?.current || 1;
	const next = videos?.data.pagination?.next?.page || 0;
	const prev = videos?.data.pagination?.prev?.page || 0;
	const paramsObject = context.query;

	return {
		props: {
			params: params,
			serverVideos: videos?.data?.data || [],
			totalDocuments: videos?.data?.countAll || 0,
			totalPages: totalPages,
			totalResults: totalResults,
			page: page,
			next: next,
			prev: prev,
			paramsObject: paramsObject,
		},
	};
};

const Home = ({ params, serverVideos, router }) => {
	const [myVideo, setMyVideo] = useState(null);
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		setVideos(serverVideos);
	}, [params]);

	return (
		<Layout title={`Get Started`}>
			<FormJumbotron
				setObject={setMyVideo}
				setObjects={setVideos}
				objects={videos}
			/>
			<SplitView
				myVideo={myVideo !== null && myVideo !== undefined && myVideo}
				video={myVideo !== null && myVideo !== undefined && myVideo}
				objects={videos}
				setObjects={setVideos}
				router={router}
			/>
		</Layout>
	);
};

export default withRouter(Home);
