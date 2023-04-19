export default function UserPill(user) {
	const displayMessages = () => {
		console.log(user.id)
		fetch(`/messages/${user.id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
			})
	}

	return (
		<article
			onClick={() => displayMessages()}
			className='flex items-center justify-between p-4 border-b border-gray-400'
		>
			<span className='text-gray-800 font-semibold'>
				{user.first_name} {user.last_name}
			</span>
		</article>
	)
}
