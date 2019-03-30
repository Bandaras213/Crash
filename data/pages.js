module.exports = `
query ($page: Int, $perPage: Int, $genre: String) {
	Page (page: $page, perPage: $perPage) {
		pageInfo {
		total
		currentPage
		lastPage
		hasNextPage
		perPage
	}
	media (genre: $genre, type: ANIME) {
    id
  }
}
}`