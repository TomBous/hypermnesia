import React from 'react'
import PropTypes from 'prop-types'

function SmallCard(props) {
    let content;
    if (props.type === "solution") {
        content = (
            <ol className="custom-counter">
            {props.content.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
        )
    } else {
        content = <p>{props.content}</p>
    }
    return (
        <div className="small_card" onClick={props.onclick}>
            <div className="small_card_content">
                <h2>{props.title}</h2>
                {content}
            </div>
            <div className="small_card_footer">
                <div>
                    <i className="fas fa-edit"></i>
                </div>
            {props.type === "information" &&
                <div className="vote">
                    <span>{Math.sign(props.votes) === 1 ? `+${props.votes}` : props.votes}</span>
                    <i className="fas fa-thumbs-up"></i>
                    <i className="fas fa-thumbs-down"></i>
                </div>
            }
            {props.type === "solution" &&
                <div className="vote">
                    <span>+{props.votes}</span>
                    <i className="fas fa-check-circle"></i>
                </div>
            }
            </div>
        </div>
    )
}

SmallCard.propTypes = {
    title: PropTypes.string,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    type: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
}

export default SmallCard

