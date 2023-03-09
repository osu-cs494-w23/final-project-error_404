import Link from "next/link"
import classes from "./MainNavigation.module.css"

const HomePage = () => {
    return (
        <div className={classes.menu}>
            <div className = {classes.menu_item_list}>
                <Link className = {classes.menu_item_1} href="/">Home</Link>
                <Link className = {classes.menu_item_2} href="/">Item 1</Link>
                <Link className = {classes.menu_item_3} href="/">Item 2</Link>
                <Link className = {classes.menu_item} href="/">Item 3</Link>
                <Link className = {classes.menu_item} href="/about">About Us</Link>
            </div>

            <div className={classes.background_Menu}></div>
        </div>
    )
}

export default HomePage