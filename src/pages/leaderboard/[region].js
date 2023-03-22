import { useRouter } from 'next/router'
import LeaderboardPage from '../../../component/LeaderboardPage'

const Leaderboard = () => {
    const router = useRouter()
    const { region } = router.query
    console.log(region)

    return <LeaderboardPage region={region || 'na'} />
}

export default Leaderboard