import React,{ Component } from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
	constructor(props){
		super(props);
		this.state={videos:null,selectedVideo:null}
		this.onVideoSelect=this.onVideoSelect.bind(this);
	}
	onVideoSelect(video){
		console.log(video);
		this.setState({ selectedVideo: video });
	  }
	componentDidMount() {
		//fetch("https://jsonplaceholder.typicode.com/posts")
		fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&&maxResults=10&key=AIzaSyAYuHjvSBvmWKw0B-GB_-1msKc7H-qMxlk")
		  .then(response => {
			return response.json();
		  })
		  .then(result => {
			this.setState({
			  videos: result.items
			});
			this.setState({
			  selectedVideo: result.items[0]
			});
		  });
	  }
	render(){
		const {videos,selectedVideo}=this.state;
		console.log(videos);
		return (
		<Container>
			<MainVideo video={selectedVideo}/>
			<TrendingVideo videos={videos} onVideoSelect={this.onVideoSelect}/>
		</Container>
		);
	}
}

function Container(props){
	const styles={
		display:"flex"
	}
	return <div style={styles}>{props.children}</div>

}

function MainVideoCard({video}){
	const src='http://youtube.com/embed/'+video.id;
	return (
	<div style={{width:"100%"}}>
		<iframe frameBorder='0' height='500px'  width='100%' src={src} />
		<h3>{video.snippet.title}</h3>
		<h3>{video.snippet.channelTitle}</h3>
		<span>{video.snippet.description}</span>
	</div>
	);
}

function TVideoCard({video, onVideoSelect}){
	const imgsrc=video.snippet.thumbnails.medium.url;
	return (
	<div style={{cursor:"pointer"}} onClick={()=>onVideoSelect(video)}>
		<img src={imgsrc} />
		<h3>{video.snippet.title}</h3>
	</div>
	);
}


function MainVideo({video}){
	const styles={flex:"3 1",padding:"20px"}
	if(video){
	return (
		<>
		<div style={styles}>
			<h1>MainVideo</h1>
			<MainVideoCard video={video} />
		</div>
		</>
	);
	}else{
		return null;
	}
}


function TrendingVideo({videos,onVideoSelect}){

	const styles={flex:"1 1",padding:"20px"};
	if(videos){
		const listOfVideos = videos.map((video, id) => <TVideoCard key={id} video={video} onVideoSelect={onVideoSelect} />)
		return (
			<>
			<div style={styles}>
				<h1>TrendingVideo (IN)</h1>
				<div style={{}}>
					{listOfVideos}
				</div>
			</div>
			</>
		);
	}
	return null;
}

const rootElement= document.getElementById("root");
ReactDOM.render(<App/>,rootElement);