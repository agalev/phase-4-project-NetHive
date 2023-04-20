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
		>
			<li class='text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer list-none' key={user.id}>
             {user.first_name} {user.last_name}
           </li>
		</article>
	)
}
