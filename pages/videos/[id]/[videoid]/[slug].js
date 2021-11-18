import { useEffect, useState } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
// ACTIONS
import { getYouTubes, getYouTube } from "@/actions/youtube";
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
	const video =
		(await getYouTube(context.params.id, context.params.videoid)()) || null;
	if (!video.data) {
		return { notFound: true };
	}

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
			video: video?.data || null,
		},
	};
};

const Video = ({
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
	video,
}) => {
	const [video_url, setVideoUrl] = useState(
		`https://www.youtube.com/embed/mK7lDooAGJw`
	);

	const [videos, setVideos] = useState(serverVideos);

	useEffect(() => {
		setVideos(serverVideos);
	}, [params]);

	return (
		<Layout
			title={`${video.title}`}
			description={`${video.text}`}
			author={`${video.author.name}`}
			sectionClass={`mb-3`}
			containerClass={`container`}
			url={`videos/${video._id}/${video.videoId}/${video.slug}`}
			posType={`post`}
			createdAt={`${video.createdAt}`}
			updatedAt={`${video.updatedAt}`}
			// postImage={`${job.producer.avatar}`}
		>
			<FormJumbotron
				videoUrl={video_url}
				setUrl={setVideoUrl}
				setObjects={setVideos}
			/>
			<SplitView
				videoUrl={video.videoEmbedUrl ? video.videoEmbedUrl : video_url}
				thumbnails={video.thumbnails}
				objects={videos}
			/>
		</Layout>
	);
};

export default withRouter(Video);
