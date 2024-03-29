import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../DIspatchContext"
import StateContext from "../StateContext"
import { Tooltip as ReactTooltip } from "react-tooltip"

function HeaderLoggedIn(props) {
    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)


    function handleLoggedOut() {
        appDispatch({ type: "logout" })
        appDispatch({ type: "flashMessage", value: "Log Out Successful" })
    }

    function handleSearchIcon(e) {
        e.preventDefault()

        appDispatch({ type: "openSearch" })
        
    }

    return (
        <div className="flex-row my-3 my-md-0">
            <a data-tooltip-id="search" data-tooltip-content="Search" onClick={handleSearchIcon} href="#" className="text-white mr-2 header-search-icon">
                <i className="fas fa-search"></i>
            </a>

            <ReactTooltip place="bottom" id="search" className="custom-tooltip" />

            {" "}<span onClick={() => appDispatch({ type: "toggleChat" })} data-tooltip-id="chat" data-tooltip-content="Chat" className={"mr-2 header-chat-icon " + (appState.unReadChatCount ? "text-danger" : "text-white")}>
                <i className="fas fa-comment"></i>
                {appState.unReadChatCount ? <span className="chat-count-badge text-white">{appState.unReadChatCount < 10 ? appState.unReadChatCount : "9+"} </span> : ""}
            </span>

            <ReactTooltip place="bottom" id="chat" className="custom-tooltip" />

            {" "}<Link data-tooltip-id="profile" data-tooltip-content="My Profile" to={`/profile/${appState.user.username}`} className="mr-2">
                <img className="small-header-avatar" src={appState.user.avatar} />
            </Link>

            <ReactTooltip place="bottom" id="profile" className="custom-tooltip" />


            {" "}<Link className="btn btn-sm btn-success mr-2" to="/create-post">
                Create Post
            </Link>{" "}
            <button onClick={handleLoggedOut} className="btn btn-sm btn-secondary">
                Sign Out
            </button>
        </div>
    )
}

export default HeaderLoggedIn