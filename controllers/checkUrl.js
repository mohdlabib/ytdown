class YoutubeUrl {
    static validateUrl(url) {
        let data;
        if (url.includes("www.youtube.com")) {
            let params = new URLSearchParams(new URL(url).search);
            let videoId = params.get("v");

            if (videoId) {
                data = videoId;
            } else {
                data = false;
            }
        } else if (url.includes("youtu.be")) {
            if (url.split("/")[3]) {
                data = url.split("/")[3];
            } else if (url.split("/")[1]) {
                data = url.split("/")[1];
            } else {
                data = false;
            }
        } else {
            data = false;
        }

        return data;
    }
}

module.exports = YoutubeUrl;

// CheckUrl.validateUrl(url)