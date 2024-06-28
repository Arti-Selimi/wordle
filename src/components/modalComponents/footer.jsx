export const Footer = (props) => {
    return (
        <>
            <div className="footer">
                <p>
                    Definition:
                </p>
                <p>
                    {props.definition}
                </p>
            </div>
        </>
    )
}

export default Footer;