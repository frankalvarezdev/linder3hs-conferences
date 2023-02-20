import { useMemo } from "react";
import github from "../../assets/github-mark.svg";

const TicketCard = ({ user = null, ticket = null }) => {
	// Esto se utiliza para determinar si se muestra una animacion de carga o los datos reales
	const isLoading = useMemo(() => {
		return !user || !ticket
	}, [user, ticket])

	// retorna un objeto con las clases que se utilizarán para mostrar la animacion de carga
	const loadingClassNames = useMemo(() => {
		return {
			name: isLoading ? 'animate-pulse bg-gray-300 text-transparent min-w-[170px] md:min-w-[250px] rounded' : '',
			username: isLoading ? 'animate-pulse bg-gray-300 text-transparent rounded' : '',
			eventTitle: isLoading ? 'animate-pulse bg-gray-300 text-transparent rounded' : '',
			date: isLoading ? 'animate-pulse bg-gray-300 rounded text-transparent max-w-[240px] md:max-w-[320px]' : '',
		}
	}, [isLoading])

	return (
		<div className="mt-10 bg-ticket">
			<div className="ticket-content">
				<div className="flex gap-5 mt-10">
					<div>
						{user ? (
							<img
								width={52}
								height={52}
								className="rounded-full"
								src={user.user_metadata.avatar_url}
								alt=""
							/>
						) : (
							<div
								className="animate-pulse bg-gray-300 rounded-full w-[52px] aspect-square"
							/>
						)}
					</div>
					<div>
						<p className={`font-extrabold ${loadingClassNames.name}`}>
							{user ? user.user_metadata.name : 'name'}
						</p>
						<p className="text-gray-500 flex mt-3 items-center gap-3">
							<img className="w-5 h-5" src={github} alt="" />
							<span className={`inline-block ${loadingClassNames.username}`}>
								{user ? user.user_metadata.user_name : 'username'}
							</span>
						</p>
					</div>
				</div>
				<h3 className="mt-5 font-extrabold lg:text-2xl sm:text-sm">
					⭐️
					<span className={`inline-block ${loadingClassNames.eventTitle}`}>
						{ticket ? ticket.events.title : 'title'}
					</span>
				</h3>
				<div className="mt-5 flex gap-5 mb-5">
					<div className="flex-1">
						<p className={loadingClassNames.date}>
							{ticket ? ticket.events.date : 'date'}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TicketCard;