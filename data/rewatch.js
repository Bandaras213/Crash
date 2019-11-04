module.exports = `
query ($userId: Int, $type: MediaType, $userName: String, $MediaListStatus: MediaListStatus) {
  MediaListCollection (userId: $userId, type: $type, userName: $userName, status: $MediaListStatus ,sort: [SCORE]) {
      user {
        name
      }
      lists {
        status
        entries {
          mediaId
          score(format: POINT_10)
          media {
            title {
              romaji
              english
            }
            tags {
              name
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