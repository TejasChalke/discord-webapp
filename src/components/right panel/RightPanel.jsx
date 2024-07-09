import './RightPanel.scss'

export default function RightPanel() {
    const members = ["tejas", "tanmay", "pranav"]
    return(
        <div id="rightPanelContainer">
            <div id="rightPanelHeader">Members</div>
            {
                members.map((member, index) => {
                    return(
                        <div className="rightPanelItem" key={index}>
                            <i className="fa-solid fa-signal"></i>
                            <span>{member}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}