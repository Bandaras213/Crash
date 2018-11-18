module.exports = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
	Page (page: $page, perPage: $perPage) {
		pageInfo {
		total
		currentPage
		lastPage
		hasNextPage
		perPage
	}
	media (id: $id, search: $search, type: ANIME) {
		id
		siteUrl
		format
		title {
			romaji
			english
		}
		coverImage {
			large
		}
		bannerImage
		status
		description
		averageScore
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
		nextAiringEpisode{
			id
			airingAt
			timeUntilAiring
			episode
		}
		season
		episodes
		duration
		countryOfOrigin
		isLicensed
		source
		trailer {
			id
			site
		}
		genres
		meanScore
		popularity
		isAdult
		characters(page: 1, role: MAIN) {
		nodes {
		id
		name {
			first
			last
		}
		siteUrl
		}
		}
		staff(page: 1) {
		edges {
			node {
				id
				name {
					first
					last
				}
				siteUrl
			}
			role
		}
		}
		studios {
			nodes {
				id
				name
			}
		}
	}
}
}`;