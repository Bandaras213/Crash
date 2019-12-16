module.exports = `
query($userId: Int){
  Page(perPage: 6) {
    activities(userId: $userId, sort: ID_DESC, type: ANIME_LIST) {
      ... on ListActivity {
        id
        type
        replyCount
        status
        progress
        isLocked
        likeCount
        createdAt
        user {
          id
          name
          avatar {
            large
          }
        }
        media {
          id
          type
          title {
            romaji
          }
          episodes
          siteUrl
          coverImage {
            large
          }
          bannerImage
        }
      }
    }
  }
}`