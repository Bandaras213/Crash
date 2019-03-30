export default `
query ($userId: Int, $type: MediaType, $userName: String) {
  MediaListCollection (userId: $userId, type: $type, userName: $userName, sort: [STATUS]) {
    lists {
      status
      entries {
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