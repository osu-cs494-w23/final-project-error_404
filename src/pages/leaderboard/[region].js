import { useRouter } from 'next/router'
import LeaderboardPage from '../../../component/LeaderboardPage'

const Leaderboard = () => {
    const router = useRouter()
    const { region } = router.query

    // if the region is not valid, default to na and update the url
    if (region != 'na' && region != 'eu' && region != 'ap' && region != 'kr') {
        return <LeaderboardPage region="na" />
    }

    return <LeaderboardPage region={region} />
}

export default Leaderboard