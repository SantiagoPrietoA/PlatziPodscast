import 'isomorphic-fetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import Error from 'next/error'


const Index = ({channels, statusCode}) => { 

    

    if( statusCode !== 200 ) {
      return <Error statusCode={ statusCode } />
    }

    return (
        <Layout title="Podcasts">
        <ChannelGrid channels={ channels } />
        </Layout>
    )
  }

Index.getInitialProps = async ({res}) => {
    try {
      let req = await fetch('https://api.audioboom.com/channels/recommended')
      let { body: channels } = await req.json()
      if( req.status >= 400 ) {
        res.statusCode = req.status
        return { channels: null, statusCode: req.status }
      }
      return { channels, statusCode: req.status }
    } catch(e) {
      res.statusCode = 503
      return { channels: null, statusCode: 503}
    }
}

export default Index;