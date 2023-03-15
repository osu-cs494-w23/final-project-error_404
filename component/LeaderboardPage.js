import { useEffect, useState } from 'react'
import { Spinner, Table, ButtonToolbar, DropdownButton, Dropdown, InputGroup, FormControl } from 'react-bootstrap'

function useLeaderboard(region) {
    const [ players, setPlayers ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        let ignore = false
        const controller = new AbortController()
        async function fetchPlayers() {
            setLoading(true)
            let responseBody = {}
            try {
                const response = await fetch(
                    'https://api.henrikdev.xyz/valorant/v1/leaderboard/' + region,
                    { signal: controller.signal }
                )
                if (response.status !== 200) {
                    setError(true)
                } else {
                    setError(false)
                    responseBody = await response.json()
                }
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log('HTTP request aborted')
                } else {
                    setError(true)
                    console.error("Error:", e)
                    throw e
                }
            }

            if (!ignore) {
                setPlayers(responseBody || [])
                setLoading(false)
            }
        }
        if (region) {
            fetchPlayers()
        }
        return () => {
            controller.abort()
            ignore = true
        }
    }, [ region ])
    
    return [ players, loading, error ]
}

const LeaderboardToolbar = (props) => {
    const { region, onRegionChange, perPage, onPerPageChange, query, onQueryChange } = props

    return (
        <ButtonToolbar className='d-flex justify-content-around' style={{ marginTop: '1rem' }}>
            <DropdownButton id="region-dropdown" title={region}>
                <Dropdown.Item onClick={() => onRegionChange('na')}>na</Dropdown.Item>
                <Dropdown.Item onClick={() => onRegionChange('eu')}>eu</Dropdown.Item>
                <Dropdown.Item onClick={() => onRegionChange('ap')}>ap</Dropdown.Item>
                <Dropdown.Item onClick={() => onRegionChange('kr')}>kr</Dropdown.Item>
            </DropdownButton>

            <InputGroup>
                <FormControl placeholder='Search Player' onChange={onQueryChange} />
            </InputGroup>

            <DropdownButton id="page-size-dropdown" title={`${perPage} per page`}>
                <Dropdown.Item onClick={() => onPerPageChange(10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => onPerPageChange(25)}>25</Dropdown.Item>
                <Dropdown.Item onClick={() => onPerPageChange(50)}>50</Dropdown.Item>
                <Dropdown.Item onClick={() => onPerPageChange(100)}>100</Dropdown.Item>
            </DropdownButton>
        </ButtonToolbar>        
    )
}

const Leaderboard = (props) => {
    const { players, loading, error, page, perPage, query } = props

    const indexOfLastPlayer = page * perPage
    const indexOfFirstPlayer = indexOfLastPlayer - perPage
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer)

    if (loading) {
        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )
    }

    if (error) {
        return (
            <div className='d-flex justify-content-center'>
                <h1>Something went wrong</h1>
            </div>
        )
    }

    return (
        <Table striped bordered hover responsive style={{ marginTop: '1rem' }}>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                {console.log(currentPlayers)}
                {currentPlayers.map((player, index) => (
                    <tr key={index}>
                        <td>{player.leaderboardRank}</td>
                        <td>{player.gameName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const LeaderboardPage = () => {
    const [ region, setRegion ] = useState('na')
    const [ perPage, setPerPage ] = useState(10)
    const [ query, setQuery ] = useState('')
    const [ page, setPage ] = useState(1)

    const [ players, loading, error ] = useLeaderboard(region)

    const onQueryChange = (e) => {
        setQuery(e.target.value)
        setPage(1)
    }

    const onRegionChange = (e) => {
        setRegion(e)
        setPage(1)
    }

    const onPerPageChange = (e) => {
        setPerPage(e)
        setPage(1)
    }

    const leaderboardProps = {
        players,
        loading,
        error,
        page,
        perPage,
        query
    }

    const leaderboardToolbarProps = {
        region,
        onRegionChange,
        perPage,
        onPerPageChange,
        query,
        onQueryChange
    }

    return (
        <>
            <LeaderboardToolbar {...leaderboardToolbarProps} />
            <Leaderboard {...leaderboardProps} />
        </>
    )
}

export default LeaderboardPage