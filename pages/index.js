import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import ip from "ip";
// ACTIONS
import { getYouTubes } from "@/actions/youtube";
// HELPERS
import Layout from "@/layout/Layout";
import FormJumbotron from "@/layout/FormJumbotron";
import SplitView from "@/layout/SplitView";

export const getServerSideProps = async (context) => {
	const params = ``;
	const videos = (await getYouTubes(params)()) || [];
	const totalPages = videos?.pagination?.totalpages || 0;
	const totalResults = videos?.count || 0;
	const page = videos?.pagination?.current || 1;
	const next = videos?.pagination?.next?.page || 0;
	const prev = videos?.pagination?.prev?.page || 0;
	const paramsObject = context.query;

	return {
		props: {
			params: params,
			serverVideos: videos?.data || [],
			totalDocuments: videos?.countAll || 0,
			totalPages: totalPages,
			totalResults: totalResults,
			page: page,
			next: next,
			prev: prev,
			paramsObject: paramsObject,
		},
	};
};

const Home = ({
	params,
	serverVideos,
	totalDocuments,
	totalPages,
	totalResults,
	page,
	next,
	prev,
	paramsObject,
	router,
}) => {
	const [video_url, setVideoUrl] = useState(
		`https://www.youtube.com/embed/mK7lDooAGJw`
	);
	const [videos, setVideos] = useState(serverVideos);

	useEffect(() => {
		setVideos(serverVideos);
	}, [params]);

	return (
		<Layout title={`Get Started`}>
			<FormJumbotron
				videoUrl={video_url}
				setUrl={setVideoUrl}
				setObjects={setVideos}
			/>
			<SplitView videoUrl={video_url} objects={videos} />
		</Layout>
	);
};

export default withRouter(Home);
