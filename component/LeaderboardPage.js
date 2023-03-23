import { useState } from 'react'
import { ButtonToolbar, Spinner, DropdownButton, Dropdown, FormControl, Container, ListGroup, Pagination } from 'react-bootstrap'
import { useRouter } from 'next/router'
import classes from './LeaderboardPage.module.css'

import useLeaderboard from './Hooks/useLeaderboard'

const LeaderboardToolbar = (props) => {
    const { inputRegion, setInputRegion, inputPerPage, setInputPerPage, inputQuery, setInputQuery, page, setPage, handlePageChange } = props

    const router = useRouter()

    // if the region is changed in the url, update the input region
    if (router.query.region !== undefined) {
        setInputRegion(router.query.region)
    }

    // if the region is not valid, default to na and update the url
    if (inputRegion != 'na' && inputRegion != 'eu' && inputRegion != 'ap' && inputRegion != 'kr') {
        setInputRegion('na')
        router.push(`/leaderboard/na`)
    }

    // if the region is changed in the dropdown, update the url
    const handleRegionChange = (region) => {
        setPage(1)
        setInputRegion(region)
        router.push(`/leaderboard/${region}`)
    }

    return (
        <ButtonToolbar className={classes.leaderboardToolbar}>
            <div className={classes.leaderboardToolbarButtonGroup}>
                <DropdownButton id="region-dropdown" title={`Region: ${inputRegion}`} variant='light'>
                    <Dropdown.Item onClick={() => handleRegionChange('na')}>na</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRegionChange('eu')}>eu</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRegionChange('ap')}>ap</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRegionChange('kr')}>kr</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="page-size-dropdown" title={`Visible Players: ${inputPerPage}`} variant='light'>
                    <Dropdown.Item onClick={() => setInputPerPage(10)}>10</Dropdown.Item>
                    <Dropdown.Item onClick={() => setInputPerPage(25)}>25</Dropdown.Item>
                    <Dropdown.Item onClick={() => setInputPerPage(50)}>50</Dropdown.Item>
                    <Dropdown.Item onClick={() => setInputPerPage(100)}>100</Dropdown.Item>
                </DropdownButton>
            </div>
            <div>
                <Pagination className={classes.leaderboardPagination}>
                    <Pagination.Prev onClick={() => handlePageChange(page - 1)} />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                </Pagination>
            </div>
            <FormControl    placeholder='Search for a Player' 
                            type='text' 
                            value={inputQuery} 
                            onChange={e => setInputQuery(e.target.value)}
                            className={classes.searchInput}
                            variant='plaintext'
            />
        </ButtonToolbar> 
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
        <ListGroup className={classes.leaderboard}>
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
                            <p className={classes.leaderboardParagraph}>
                                {player.leaderboardRank} - {player.gameName}
                            </p>
                        </div>
                        <div>
                            <p className={classes.leaderboardParagraph}>
                                {player.rankedRating}
                            </p>
                        </div>
                    </ListGroup.Item>
                ))
            ) : ( // if there is a query, show the current queried players
                currentQueriedPlayers.map((player, index) => (
                    <ListGroup.Item key={index} className={classes.leaderboardPlayerRow}>
                        <div>
                            <p className={classes.leaderboardParagraph}>
                                {player.leaderboardRank} - {player.gameName}
                            </p>
                        </div>
                        <div>
                            <p className={classes.leaderboardParagraph}>
                                {player.rankedRating}
                            </p>
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
    // state
    const [ inputRegion, setInputRegion ] = useState(region)
    const [ inputPerPage, setInputPerPage ] = useState(10)
    const [ inputQuery, setInputQuery ] = useState('')
    const [ page, setPage ] = useState(1)

    // fetch data
    const [ players, loading, error ] = useLeaderboard(inputRegion)

    // handle page change by first making sure that the page is valid
    const handlePageChange = (page) => {
        if (page < 1) {
            setPage(1)
        } else if (page > Math.ceil(players.length / inputPerPage)) {
            setPage(Math.ceil(players.length / inputPerPage))
        } else {
            setPage(page)
        }
    }

    const leaderboardToolbarProps = {
        inputRegion,
        setInputRegion,
        inputPerPage,
        setInputPerPage,
        inputQuery,
        setInputQuery,
        page,
        setPage,
        handlePageChange
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