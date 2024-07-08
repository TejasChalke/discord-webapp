import './ServerList.scss'

export default function ServerList() {
    const servers = []
    return(
        <div id="serverListContainer">
            <div id="serverList">
                {
                    servers.map((server, index) => {
                        return(
                            <div className="serverListItem">
                                {server.name}
                            </div>
                        )
                    })
                }
            </div>
            <div id="serverListButtons">
                <div className="serverListButton">
                    <i className="fa-solid fa-plus"></i>
                </div>
                <div className="serverListButton">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
        </div>
    )
}