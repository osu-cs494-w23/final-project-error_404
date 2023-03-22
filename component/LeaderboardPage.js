import { useState, useEffect } from 'react'
import { Spinner, ButtonToolbar, DropdownButton, Button, Dropdown, InputGroup, Form, FormControl, Container, ListGroup } from 'react-bootstrap'
import { useRouter } from 'next/router'
import classes from './LeaderboardPage.module.css'

import useLeaderboard from './Hooks/useLeaderboard'

const LeaderboardToolbar = (props) => {
    const { inputRegion, setInputRegion, inputPerPage, setInputPerPage, inputQuery, setInputQuery } = props

    const router = useRouter()

    console.log(props)

    const handleRegionChange = (region) => {
        setInputRegion(region)
        router.push(`/leaderboard/${region}`)
    }

    return (
        <div className={classes.leaderboardToolbar}>
            <DropdownButton id="region-dropdown" title={`Region: ${inputRegion}`} variant='light'>
                <Dropdown.Item onClick={() => handleRegionChange('na')}>na</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRegionChange('eu')}>eu</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRegionChange('ap')}>ap</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRegionChange('kr')}>kr</Dropdown.Item>
            </DropdownButton>
            <FormControl    placeholder='Search Player' 
                            type='text' 
                            value={inputQuery} 
                            onChange={e => setInputQuery(e.target.value)}
                            className={classes.searchInput}
                            variant='plaintext'
            />
            <DropdownButton id="page-size-dropdown" title={`Visible Players: ${inputPerPage}`} variant='light'>
                <Dropdown.Item onClick={() => setInputPerPage(10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => setInputPerPage(25)}>25</Dropdown.Item>
                <Dropdown.Item onClick={() => setInputPerPage(50)}>50</Dropdown.Item>
                <Dropdown.Item onClick={() => setInputPerPage(100)}>100</Dropdown.Item>
            </DropdownButton>
        </div> 
    )
}

const Leaderboard = (props) => {
    const { players, loading, error, inputPerPage, inputQuery, page } = props

    // calculate the current players to display based on the page and the number of players per page
    const indexOfLastPlayer = page * inputPerPage
    const indexOfFirstPlayer = indexOfLastPlayer - inputPerPage
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer)

    // calculate the current queried players to display based on the page and the number of players per page
    const allQueriedPlayers = players.filter(player => player.gameName.toLowerCase().includes(inputQuery.toLowerCase()))
    const currentQueriedPlayers = allQueriedPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer)

    if (loading) {
        return (
            <div className='d-flex justify-content-center mt-5'>
                <Spinner animation='border' variant='light' role='status' />
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
        <ListGroup className={classes.leaderboardList}>
            <ListGroup.Item className={classes.leaderboardTitleRow}>
                <div>
                    <strong>Rank - Username</strong>
                </div>
                <div>
                    <strong>Ranked Rating</strong>
                </div>
            </ListGroup.Item>
            {inputQuery === '' ? ( // if there is no query, show the current players
                currentPlayers.map((player, index) => (
                    <ListGroup.Item key={index} className={classes.leaderboardPlayerRow}>
                        <div>
                            <p>{player.leaderboardRank} - {player.gameName}</p>
                        </div>
                        <div>
                            <p>{player.rankedRating}</p>
                        </div>
                    </ListGroup.Item>
                ))
            ) : ( // if there is a query, show the current queried players
                currentQueriedPlayers.map((player, index) => (
                    <ListGroup.Item key={index} className={classes.leaderboardPlayerRow}>
                        <div>
                            <p>{player.leaderboardRank} - {player.gameName}</p>
                        </div>
                        <div>
                            <p>{player.rankedRating}</p>
                        </div>
                    </ListGroup.Item>
                ))
            )}
            {inputQuery !== '' & currentQueriedPlayers.length === 0 ? ( // if there is a query and no players match it, show a message
                <ListGroup.Item className={classes.leaderboardPlayerRow}>
                    <div>
                        <p>No players found</p>
                    </div>
                </ListGroup.Item>
            ) : ( <></> )}
        </ListGroup>
    )
}

const LeaderboardPage = ({ region }) => {
    const router = useRouter()

    // set state for query params
    const [ inputRegion, setInputRegion ] = useState(region)
    const [ inputPerPage, setInputPerPage ] = useState(10)
    const [ inputQuery, setInputQuery ] = useState('')
    const [ page, setPage ] = useState(1) // pagination

    // fetch data
    const [ players, loading, error ] = useLeaderboard(inputRegion)

    const leaderboardToolbarProps = {
        inputRegion,
        setInputRegion,
        inputPerPage,
        setInputPerPage,
        inputQuery,
        setInputQuery
    }

    const leaderboardProps = {
        players,
        loading,
        error,
        inputPerPage,
        inputQuery,
        page
    }

    return (
        <Container>
            <LeaderboardToolbar {...leaderboardToolbarProps} />
            <Leaderboard {...leaderboardProps} />
        </Container>
    )
}

export default LeaderboardPage