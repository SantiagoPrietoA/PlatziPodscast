import {Link} from '../routes'
import slug from '../helpers/slug';

const PodcastList = ({ podcasts, onClickPodcast }) => {

    return (
        <div >
            { podcasts.map((podcast) => (
                <Link 
                    
                    route="podcast"
                    params={{
                            slugChannel: slug(podcast.channel.title),
                            idChannel: podcast.channel.id,
                            slug: slug(podcast.title),
                            id: podcast.id
                    }}  
                    key={podcast.id}
                >
                <a className='podcast' onClick={event => onClickPodcast(event, podcast)}>
                    <h3>{ podcast.title }</h3>
                    <div className='meta'>
                    { Math.ceil(podcast.duration / 60) } minutes
                    </div>
                </a>
                </Link>
            )) }

            <style jsx>{`
                .podcast {
                display: block;
                text-decoration: none;
                color: #333;
                padding: 15px;
                border-bottom: 1px solid rgba(0,0,0,0.2);
                cursor: pointer;
                }
                .podcast:hover {
                color: #000;
                }
                .podcast h3 {
                margin: 0;
                }
                .podcast .meta {
                color: #666;
                margin-top: 0.5em;
                font-size: 0.8em;
                }
            `}</style>
        </div>
            

    )
}

export default PodcastList;