export class AmazonResults {

DisplayName: string;
review: string;
rating: string;
publishedAt: string;
constructor(obj?: any) {
    this.DisplayName = obj&& obj.DisplayName || null;
    this.review = obj && obj.review || null;
    this.rating = obj && obj.rating || null;
    this.publishedAt = obj && obj.publishedAt || null;
    
}
}
