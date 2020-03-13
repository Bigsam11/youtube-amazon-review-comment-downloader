export class SearchResult {
    /**
 * A data-structure that holds an individual record from a YouTube video search
 */

authorDisplayName: string;
authorChannelUrl: string;
textDisplay: string;
viewerRating: string;
publishedAt: Date;

    constructor(obj?: any) {
        this.authorDisplayName = obj&& obj.authorDisplayName || null;
        this.authorChannelUrl = obj && obj.authorChannelUrl || null;
        this.textDisplay = obj && obj.textDisplay || null;
        this.viewerRating = obj && obj.viewerRating || null;
        this.publishedAt = obj && obj.publishedAt || null
    }
}


