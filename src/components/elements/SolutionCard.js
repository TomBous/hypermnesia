import React from 'react'
import PropTypes from 'prop-types'

function SolutionCard(props) {
    var content = (
            <ol className="custom-counter">
            {props.content.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
        )

    return (
        <div className="small_card" onClick={props.onclick}>
            <div className="small_card_header">
                <div><span>#</span>{props.index + 1}</div>
            </div>
            <div className="small_card_content">
                {content}
            </div>
            <div className="small_card_footer">
                <div>
                    <i className="fas fa-edit"></i>
                </div>
                <div className="vote">
                    <span>+{props.votes}</span>
                    <i className="fas fa-check-circle"></i>
                </div>
            </div>
        </div>
    )
}

SolutionCard.propTypes = {
    title: PropTypes.string,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    type: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
}

export default SolutionCard

