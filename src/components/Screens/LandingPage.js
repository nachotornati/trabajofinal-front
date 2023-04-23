//import "../assets/scss/constants.scss"
//import "../assets/scss/landingPage.scss"
//import "bootstrap/dist/css/bootstrap.min.css"
import { Navigator } from "../Helpers/Navigator"
import { Home } from "./LandingPageFront"
import { LandingPageFront } from "./LandingPageFront"


const LandingPage = () => {

    return (
        <>
            <div>
                <Navigator />
                {/* <LandingPageFront style={{backgroundColor:"black"}} /> */}
            </div>
        </>
    );

}

export default LandingPage