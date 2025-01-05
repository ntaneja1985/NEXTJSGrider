

function ProfileCard({title, handle,imgSrc, description}) {
    return (<>
        <div className="card">
            <div className="card-image">
                <figure className="image is-1by1">
                    <img src={imgSrc} alt={title}/>
                </figure>
            </div>
            <div className="card-content">
                <div className="media-content">
                <p className="title is-4">
                    Profile Card!!!! {title} with handle {handle}
                </p>
                </div>
                <div className="content">
                    {description}
                </div>
            </div>
        </div>
    </>)
}

export default ProfileCard;