import { 
    YoutubeserviceService, 
    YOUTUBE_API_KEY, 
    YOUTUBE_API_URL 
} from '../services/youtubeservice.service'

export  const youTubeSearchInjectables: Array<any> = [
    {provide: YoutubeserviceService, useClass: YoutubeserviceService},
    {provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY},
    {provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL},
]