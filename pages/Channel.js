import 'isomorphic-fetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'

const Channel = ({ channel, audioClips, series }) => {
    return (
        <Layout title={channel.title}>
          <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
          
          <h1>{ channel.title }</h1>

          { series.length > 0 &&
            <div>
              <h2>Series</h2>
              <ChannelGrid channels={ series } />
            </div>
          }

          <h2>Ultimos Podcasts</h2>
          <PodcastList podcasts={ audioClips } />

          <style jsx>{`
            .banner {
              width: 100%;
              padding-bottom: 25%;
              background-position: 50% 50%;
              background-size: cover;
              background-color: #aaa;
            }
            h1 {
              font-weight: 600;
              padding: 15px;
            }
            h2 {
              padding: 15px;
              font-size: 1.2em;
              font-weight: 600;
              margin: 0;
            }
          `}</style>
        </Layout>
    )
}

Channel.getInitialProps = async ({ query }) => {
    const idChannel = query.id;

    const [reqChannel, reqAudio, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${query.id}`),
      fetch(`https://api.audioboom.com/channels/${query.id}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${query.id}/child_channels`)
    ]);

    const dataChannel = await reqChannel.json();
    const channel = dataChannel.body.channel;

    const dataAudio = await reqAudio.json();
    const audioClips = dataAudio.body.audio_clips;

    const dataSeries = await reqSeries.json();
    const series = dataSeries.body.channels;
    return { channel, audioClips, series };
}

export default Channel;