import 'bulma/css/bulma.css'
import ProfileCard from "./ProfileCard";
import AlexaImage from './images/alexa.png'
import CortanaImage from './images/cortana.png'
import SiriImage from './images/siri.png'


function App() {
    return (
        <div className="App">
            <section className="hero is-primary">
                <div className="hero-body">
                    <p className="title">
                        Personal Digital Assistants
                    </p>
                </div>
            </section>

            <div className="container">
                <section className="section">
                    <div className="columns">
                        <div className="column is-3">
                            <ProfileCard title = "Alexa" handle="@alexa99" imgSrc={AlexaImage} description="Alexa is awesome" />
                        </div>
                        <div className="column is-3">
                            <ProfileCard title = "Cortana" handle="@cortana" imgSrc={CortanaImage} description="Cortana is awesome" />
                        </div>
                        <div className="column is-3">
                            <ProfileCard title = "Siri" handle="@siri" imgSrc={SiriImage} description="Siri is awesome" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default App;