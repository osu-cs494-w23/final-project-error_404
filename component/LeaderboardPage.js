import { useState, useEffect } from 'react'
import { Spinner, ButtonToolbar, DropdownButton, Button, Dropdown, InputGroup, Form, FormControl, Container, ListGroup } from 'react-bootstrap'
import { useRouter } from 'next/router'
import classes from './LeaderboardPage.module.css'

import useLeaderboard from './Hooks/useLeaderboard'

const LeaderboardToolbar = (props) => {
    const { region, onRegionChange, perPage, onPerPageChange, query, onQueryChange } = props

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (

            <ButtonToolbar className='d-flex justify-content-around'>
                <DropdownButton id="region-dropdown" title={region}>
                    <Dropdown.Item onClick={() => onRegionChange('na')}>na</Dropdown.Item>
                    <Dropdown.Item onClick={() => onRegionChange('eu')}>eu</Dropdown.Item>
                    <Dropdown.Item onClick={() => onRegionChange('ap')}>ap</Dropdown.Item>
                    <Dropdown.Item onClick={() => onRegionChange('kr')}>kr</Dropdown.Item>
                </DropdownButton>
                <Form onSubmit={handleSubmit} className={classes.searchForm}>
                    <FormControl placeholder='Search Player' 
                                 type='text' 
                                 value={query} 
                                 onChange={onQueryChange}
                                 className={classes.searchInput}
                    />
                    <Button type="submit" variant="primary">Search</Button>
                </Form>
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
            <div className='d-flex justify-content-center mt-5'>
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
        <ListGroup className={classes.leaderboardList}>
            <ListGroup.Item className={classes.leaderboardTitleRow}>
                <div>
                    <strong>Rank - Username</strong>
                </div>
                <div>
                    <strong>Ranked Rating</strong>
                </div>
            </ListGroup.Item>
            {currentPlayers.map((player, index) => (
                <ListGroup.Item key={index} className={classes.leaderboardPlayerRow}>
                    <div>
                        <p>{player.leaderboardRank} - {player.gameName}</p>
                    </div>
                    <div>
                        <p>{player.rankedRating}</p>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

const LeaderboardPage = () => {
    const [ region, setRegion ] = useState('na')
    const [ perPage, setPerPage ] = useState(10)
    const [ query, setQuery ] = useState('')
    const [ page, setPage ] = useState(1)

    const [ players, loading, error ] = useLeaderboard(region)
    const router = useRouter()

    useEffect(() => {
        router.push({
            pathname: '/leaderboard',
            query: {
                region,
                perPage,
                query
            }
        })
    }, [region, perPage, query])

    const onRegionChange = (e) => {
        setRegion(e)
        setPage(1)
    }

    const onPerPageChange = (e) => {
        setPerPage(e)
        setPage(1)
    }

    const onQueryChange = (e) => {
        setQuery(e.target.value)
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
        <Container>
            <LeaderboardToolbar {...leaderboardToolbarProps} />
            <Leaderboard {...leaderboardProps} />
        </Container>
    )
}

export default LeaderboardPage