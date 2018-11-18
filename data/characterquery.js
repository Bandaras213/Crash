module.exports = `
query ($search: String, $page: Int, $perPage: Int) {
	Page (page: $page, perPage: $perPage) {
		pageInfo {
		total
		currentPage
		lastPage
		hasNextPage
		perPage
	}
	characters(search: $search) {
		id
		siteUrl
		name {
			first
			last
			alternative
		}
		image {
		large
		}
		description(asHtml: false)
		media(page: 1, perPage: 7) {
			nodes {
				title {
					romaji
					english
				}
			siteUrl
			format
			}
		}
	}
}
}`;