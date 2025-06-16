import Navbar from "../components/Navbar";

function Dashboard(){

    return(
        <>
        <Navbar />
        <div style={{minHeight:'100vh' , display:"flex", margin: '2rem' , justifyContent: 'center', fontSize: "24px"}}>
            It is a Dashboared Page.
        </div>
        </>
    )
}

export default Dashboard;