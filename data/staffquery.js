module.exports = `
query ($search: String) {
  Staff(search: $search) {
    id
    name {
      first
      last
      native
    }
    language
    image {
      large
    }
    description(asHtml: false)
    siteUrl
    staffMedia(sort: [POPULARITY_DESC], page:1, perPage: 8) {
      edges {
        id
        relationType
        characters {
        id
        name {
          first
          last
          alternative
        }
        siteUrl
        }
        staffRole
          node {
            id
            title {
              romaji
            }
          type
          format
          siteUrl
        }
      }
   }
   characters(page:1, perPage: 20) {
     edges {
       id
       role
       media {
         id
         title {
           romaji
         }
       siteUrl
       }
       node {
         id
         name {
           first
           last
         }
         siteUrl
       }
     }
   }
 }
}`