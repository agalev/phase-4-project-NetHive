import { useSelector } from 'react-redux'
export default function MessageBlob({ message }) {
	const loggedUser = useSelector((state) => state.user)

	return (
		<article
			className={
				message.sender_id === loggedUser.user.id
					? `px-2 py-1 bg-sky-600 text-white border border-slate rounded-lg`
					: `px-2 py-1 bg-slate-100 border border-slate rounded-lg`
			}
			key={message.id}
		>
			<span className='font-semibold text-lg'>
				{message.sender.first_name} {message.sender.last_name} ·{' '}
				{message.created_at}
			</span>
			<p>{message.message}</p>
		</article>
	)
}
