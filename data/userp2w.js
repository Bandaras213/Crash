module.exports = `
query ($userId: Int, $type: MediaType, $userName: String, $MediaListStatus: MediaListStatus) {
  MediaListCollection (userId: $userId, type: $type, userName: $userName, status: $MediaListStatus ,sort: [STATUS]) {
    user {
      name
    }
    lists {
      status
      entries {
        mediaId
        media {
          title {
            romaji
            english
          }
        format
        status
        description(asHtml: false)
          startDate {
			      day
			      month
			      year
		      }
		      endDate {
			      day
			      month
			      year
          }
          nextAiringEpisode {
            id
            airingAt
            timeUntilAiring
            episode
          }
        season
        siteUrl
        episodes
        duration
        chapters
        volumes
        source
          trailer {
			      id
			      site
			    }
          coverImage {
            large
          }
        bannerImage
        genres
        synonyms
        averageScore
        popularity
        isAdult
        }
      }
    }
  }
}`