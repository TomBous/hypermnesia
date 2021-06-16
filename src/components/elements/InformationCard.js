import React from 'react'
import PropTypes from 'prop-types'

function InformationCard(props) {
    if (typeof props.information !== 'undefined') { // vérification appel API
    var {title, counter_vote: votes, content, id} = props.information
    }
    return (
        <div className="small_card">
            <div className="small_card_content">
                <h2>{title}</h2>
                <p>{content}</p>
            </div>
            <div className="small_card_footer">
                <div>
                    <i className="fas fa-trash" onClick={() => props.delete(id)}></i>
                </div>
                <div className="vote">
                    <span>{Math.sign(votes) === 1 ? `+${votes}` : votes /* si votes négatifs */}</span>
                    <i className="fas fa-thumbs-up"></i>
                    <i className="fas fa-thumbs-down"></i>
                </div>
            </div>
        </div>
    )
}

InformationCard.propTypes = {
    title: PropTypes.object.isRequired,
}

export default InformationCard

