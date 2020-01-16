import 'isomorphic-fetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'


const Index = (props) => { 

    const { channels } = props

    return (
        <Layout title="Podcasts">
        <ChannelGrid channels={ channels } />
        </Layout>
    )
  }

Index.getInitialProps = async () => {
    const req = await fetch('https://api.audioboom.com/channels/recommended')
    const { body: channels } = await req.json()
    return { channels }
}

export default Index;