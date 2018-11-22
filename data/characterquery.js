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
	characters(id: $id, search: $search) {
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
		media(page: $page, perPage: $perPage) {
			edges {
				node {
					title {
						romaji
						english
					}
				siteUrl
				format
			}
			characterRole
			}
		}
	}
}
}`;