import { useContext } from 'react'
import './RightPanel.scss'
import { SelectedChannelContext } from '../../contexts/SelectedChannelContext'

export default function RightPanel() {
    const { selectedChannel } = useContext(SelectedChannelContext)

    const members = selectedChannel?.users.map((user) => {
                        const currentUser = {}
                        selectedChannel.userKeys.forEach((key, index) => {
                            currentUser[key] = user[index]
                        })
                        return currentUser;
                    }) || []

    return(
        <div id="rightPanelContainer">
            <div id="rightPanelHeader">Members</div>
            {
                members.map((member, index) => {
                    return(
                        <div className="rightPanelItem" key={index}>
                            <i className="fa-solid fa-signal"></i>
                            <span>{member?.uname}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}