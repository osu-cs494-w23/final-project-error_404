import { useRouter } from 'next/router'
import LeaderboardPage from '../../../component/LeaderboardPage'

const Leaderboard = () => {
    const router = useRouter()
    const { region } = router.query

    return <LeaderboardPage region={region} />
}

export default Leaderboard